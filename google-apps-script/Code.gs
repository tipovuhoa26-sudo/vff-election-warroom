/**
 * ============================================================================
 * GOOGLE APPS SCRIPT: HỆ THỐNG KHÓA MẬT KHẨU & QUẢN LÝ PHIÊN BẢO MẬT TỪ SHEET
 * ============================================================================
 * Spreadsheet: https://docs.google.com/spreadsheets/d/1HJ8jEIBDQIyBob5rWE1c1gJb6V7GGpo12HIsxS3cmG8/edit?gid=0#gid=0
 * Sheet Name : "id"
 * Cấu trúc cột (A -> D):
 *   - Cột A: time     (Thời gian bảo mật: số phút như 15, 30, 60; hoặc mốc ngày giờ hết hạn / tạo mã)
 *   - Cột B: id       (Mã người dùng / ID định danh)
 *   - Cột C: email    (Email người dùng)
 *   - Cột D: password (Mật khẩu truy cập xem số liệu)
 * ============================================================================
 */

const CONFIG = {
  SPREADSHEET_ID: '1HJ8jEIBDQIyBob5rWE1c1gJb6V7GGpo12HIsxS3cmG8',
  SHEET_NAME: 'id',
  // Thời gian bảo mật mặc định (phút) nếu cột A (time) là ngày tạo trong quá khứ hoặc để trống:
  DEFAULT_TIMEOUT_MINUTES: 30,
  // Nếu đặt = true: khi cột A (time) là mốc ngày giờ trong quá khứ, mật khẩu sẽ hết hạn sau DEFAULT_TIMEOUT_MINUTES tính từ mốc cột A
  EXPIRE_FROM_PAST_SHEET_TIME: false
};

/**
 * Tạo menu tiện ích ngay trên Google Sheet để quản lý nhanh
 */
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Bảo mật Dashboard')
    .addItem('1. Chuẩn hóa tiêu đề Sheet "id" (A:D)', 'setupSheetHeaders')
    .addItem('2. Thêm nhanh 1 dòng mật khẩu mẫu', 'addSamplePasswordRow')
    .addToUi();
}

/**
 * Khởi tạo/kiểm tra Sheet "id" với 4 cột chuẩn A:D = time, id, email, password
 */
function setupSheetHeaders() {
  const ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
  let sheet = ss.getSheetByName(CONFIG.SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(CONFIG.SHEET_NAME);
  }
  const firstRow = sheet.getRange(1, 1, 1, 4).getValues()[0];
  const isHeaderEmpty = firstRow.every(cell => String(cell || '').trim() === '');
  if (isHeaderEmpty) {
    sheet.getRange(1, 1, 1, 4).setValues([['time', 'id', 'email', 'password']]);
    sheet.getRange(1, 1, 1, 4).setFontWeight('bold').setBackground('#141923').setFontColor('#FFFFFF');
  }
}

/**
 * Thêm nhanh 1 dòng mật khẩu mẫu vào Sheet "id"
 */
function addSamplePasswordRow() {
  setupSheetHeaders();
  const ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
  const sheet = ss.getSheetByName(CONFIG.SHEET_NAME);
  const nowStr = Utilities.formatDate(new Date(), Session.getScriptTimeZone() || 'Asia/Ho_Chi_Minh', 'yyyy-MM-dd HH:mm:ss');
  sheet.appendRow([nowStr, 'VFF-01', 'admin@sunext.vn', 'VFF2026']);
}

/**
 * Xử lý yêu cầu GET (hỗ trợ cả Fetch JSON, JSONP ?callback=..., và trang kiểm tra trực tiếp)
 */
function doGet(e) {
  const params = (e && e.parameter) ? e.parameter : {};
  const action = String(params.action || '').trim().toLowerCase();

  if (action === 'verify' || params.password !== undefined) {
    const result = verifyCredentials({
      password: params.password || '',
      id: params.id || '',
      email: params.email || '',
      clientTimeoutMinutes: params.timeout || ''
    });
    return buildResponse(result, params.callback);
  }

  if (action === 'ping') {
    return buildResponse({
      ok: true,
      service: 'VFF Dashboard Google Sheet Auth Gate',
      spreadsheetId: CONFIG.SPREADSHEET_ID,
      sheetName: CONFIG.SHEET_NAME,
      defaultTimeoutMinutes: CONFIG.DEFAULT_TIMEOUT_MINUTES,
      serverTime: new Date().toISOString()
    }, params.callback);
  }

  // Mặc định khi mở URL Web App trên trình duyệt: trả về JSON trạng thái hoạt động
  return buildResponse({
    ok: true,
    message: 'Google Apps Script Auth API đang hoạt động. Sử dụng ?action=verify&password=... hoặc phương thức POST để xác thực.',
    sheet: CONFIG.SHEET_NAME,
    columns: ['time (A)', 'id (B)', 'email (C)', 'password (D)'],
    defaultTimeoutMinutes: CONFIG.DEFAULT_TIMEOUT_MINUTES
  }, params.callback);
}

/**
 * Xử lý yêu cầu POST (nhận body text/plain chứa JSON để không bị chặn bởi CORS preflight)
 */
function doPost(e) {
  let payload = {};
  try {
    if (e && e.postData && e.postData.contents) {
      payload = JSON.parse(e.postData.contents);
    } else if (e && e.parameter) {
      payload = e.parameter;
    }
  } catch (err) {
    return buildResponse({
      ok: false,
      valid: false,
      error: 'INVALID_JSON',
      message: 'Dữ liệu gửi lên không đúng định dạng JSON.'
    });
  }

  const result = verifyCredentials({
    password: payload.password || '',
    id: payload.id || '',
    email: payload.email || '',
    clientTimeoutMinutes: payload.timeout || ''
  });

  return buildResponse(result);
}

/**
 * Hàm cốt lõi: Đọc Sheet "id" (cột A -> D: time, id, email, password) và kiểm tra mật khẩu + thời gian bảo mật
 */
function verifyCredentials(input) {
  const rawInputPass = String(input.password || '').trim();
  const rawInputId = String(input.id || '').trim().toLowerCase();
  const rawInputEmail = String(input.email || '').trim().toLowerCase();

  if (!rawInputPass) {
    return {
      ok: true,
      valid: false,
      reason: 'EMPTY_PASSWORD',
      message: 'Vui lòng nhập mật khẩu.'
    };
  }

  let ss, sheet;
  try {
    ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
    sheet = ss.getSheetByName(CONFIG.SHEET_NAME);
  } catch (err) {
    return {
      ok: false,
      valid: false,
      reason: 'SHEET_OPEN_ERROR',
      message: 'Không thể mở Google Sheet: ' + err.message
    };
  }

  if (!sheet) {
    return {
      ok: false,
      valid: false,
      reason: 'SHEET_NOT_FOUND',
      message: 'Không tìm thấy sheet có tên "' + CONFIG.SHEET_NAME + '" trong Google Spreadsheet.'
    };
  }

  const lastRow = sheet.getLastRow();
  if (lastRow < 1) {
    return {
      ok: true,
      valid: false,
      reason: 'EMPTY_SHEET',
      message: 'Sheet "id" hiện chưa có dữ liệu mật khẩu.'
    };
  }

  // Đọc toàn bộ từ cột A đến cột D (1 -> 4)
  const values = sheet.getRange(1, 1, lastRow, 4).getValues();
  const now = new Date();
  const nowMs = now.getTime();

  // Kiểm tra xem dòng 1 có phải dòng tiêu đề (time, id, email, password) hay không
  let startRowIndex = 0;
  if (values.length > 0) {
    const cA = String(values[0][0] || '').trim().toLowerCase();
    const cB = String(values[0][1] || '').trim().toLowerCase();
    const cC = String(values[0][2] || '').trim().toLowerCase();
    const cD = String(values[0][3] || '').trim().toLowerCase();
    if (cA === 'time' || cB === 'id' || cC === 'email' || cD === 'password') {
      startRowIndex = 1;
    }
  }

  let matchedExpiredRow = null;

  // Duyệt từ dòng mới nhất lên trên (để ưu tiên mật khẩu mới nhất nếu trùng ID/Email)
  for (let i = values.length - 1; i >= startRowIndex; i--) {
    const row = values[i];
    const colTime = row[0];                                     // Cột A: time
    const colId = String(row[1] || '').trim();                  // Cột B: id
    const colEmail = String(row[2] || '').trim();               // Cột C: email
    const colPass = String(row[3] !== undefined && row[3] !== null ? row[3] : '').trim(); // Cột D: password

    if (!colPass) continue;

    // 1. Kiểm tra mật khẩu (cột D)
    if (colPass !== rawInputPass) continue;

    // 2. Nếu người dùng có nhập thêm ID hoặc Email thì kiểm tra khớp cột B hoặc cột C
    if (rawInputId && colId.toLowerCase() !== rawInputId && colEmail.toLowerCase() !== rawInputId) {
      continue;
    }
    if (rawInputEmail && colEmail.toLowerCase() !== rawInputEmail) {
      continue;
    }

    // 3. Phân tích thời gian bảo mật từ Cột A (time)
    const timePolicy = evaluateRowTimePolicy(colTime, nowMs, input.clientTimeoutMinutes);

    if (timePolicy.isExpiredOnSheet) {
      matchedExpiredRow = {
        rowNumber: i + 1,
        id: colId,
        email: colEmail,
        expiredReason: timePolicy.expiredMessage
      };
      continue;
    }

    // Tạo dấu vân tay phiên (sessionSignature) để nếu mật khẩu hoặc cột time trên Sheet thay đổi, phiên sẽ tự khóa
    const sessionSignature = Utilities.base64EncodeWebSafe(
      Utilities.computeDigest(
        Utilities.DigestAlgorithm.SHA_256,
        `${i + 1}|${String(colTime)}|${colId}|${colEmail}|${colPass}`
      )
    ).slice(0, 24);

    return {
      ok: true,
      valid: true,
      rowNumber: i + 1,
      user: {
        id: colId || ('USER-' + (i + 1)),
        email: colEmail || ''
      },
      security: {
        sheetTimeRaw: formatCellTime(colTime),
        timeoutMinutes: timePolicy.timeoutMinutes,
        timeoutMs: timePolicy.timeoutMs,
        verifiedAtMs: nowMs,
        expiresAtMs: timePolicy.expiresAtMs,
        expiresAtIso: new Date(timePolicy.expiresAtMs).toISOString(),
        sessionSignature: sessionSignature
      },
      message: 'Xác thực mật khẩu thành công.'
    };
  }

  if (matchedExpiredRow) {
    return {
      ok: true,
      valid: false,
      reason: 'PASSWORD_EXPIRED_ON_SHEET',
      message: matchedExpiredRow.expiredReason || 'Mật khẩu này đã quá thời gian bảo mật trên Google Sheet. Vui lòng cập nhật hoặc nhập mật khẩu mới.'
    };
  }

  return {
    ok: true,
    valid: false,
    reason: 'INVALID_CREDENTIALS',
    message: 'Mật khẩu (hoặc ID/Email) không chính xác. Vui lòng kiểm tra lại trên Google Sheet "id".'
  };
}

/**
 * Giải mã thông minh Cột A ("time") trên Sheet "id":
 * Hỗ trợ 3 cách ghi trong cột A:
 *   1. Ghi số phút (ví dụ: 15, 30, 60) hoặc chuỗi thời lượng ("30p", "30m", "2h", "1d")
 *      -> Phiên xem dữ liệu sẽ tự động khóa sau ngần ấy phút.
 *   2. Ghi mốc Ngày/Giờ tương lai (ví dụ: "2026-10-26 18:00:00")
 *      -> Coi đó là thời điểm hết hạn (Deadline). Nếu hiện tại > mốc đó -> Báo hết hạn.
 *   3. Ghi mốc Ngày/Giờ tạo mật khẩu trong quá khứ (Timestamp) hoặc để trống:
 *      -> Nếu CONFIG.EXPIRE_FROM_PAST_SHEET_TIME = true: hết hạn sau DEFAULT_TIMEOUT_MINUTES kể từ Timestamp cột A.
 *      -> Mặc định (false): mỗi lần đăng nhập đúng mật khẩu sẽ được cấp phiên xem trong DEFAULT_TIMEOUT_MINUTES phút; hết giờ phải nhập lại mật khẩu.
 */
function evaluateRowTimePolicy(colTime, nowMs, clientOverrideMinutes) {
  let defaultMins = Number(CONFIG.DEFAULT_TIMEOUT_MINUTES) || 30;
  if (clientOverrideMinutes && !isNaN(Number(clientOverrideMinutes)) && Number(clientOverrideMinutes) > 0) {
    defaultMins = Number(clientOverrideMinutes);
  }

  // Trường hợp 1: Ô cột A là kiểu Date của Google Sheets
  if (Object.prototype.toString.call(colTime) === '[object Date]' && !isNaN(colTime.getTime())) {
    const cellMs = colTime.getTime();
    if (cellMs > nowMs) {
      // Mốc thời gian trong tương lai -> Hết hạn đúng vào mốc đó
      const remainMs = cellMs - nowMs;
      return {
        isExpiredOnSheet: false,
        timeoutMinutes: Math.max(1, Math.round(remainMs / 60000)),
        timeoutMs: remainMs,
        expiresAtMs: cellMs
      };
    } else if (CONFIG.EXPIRE_FROM_PAST_SHEET_TIME) {
      const expMs = cellMs + defaultMins * 60000;
      if (nowMs >= expMs) {
        return {
          isExpiredOnSheet: true,
          expiredMessage: 'Mật khẩu đã quá thời hạn bảo mật (' + defaultMins + ' phút kể từ mốc time trên Sheet).'
        };
      }
      return {
        isExpiredOnSheet: false,
        timeoutMinutes: Math.max(1, Math.round((expMs - nowMs) / 60000)),
        timeoutMs: expMs - nowMs,
        expiresAtMs: expMs
      };
    }
  }

  // Trường hợp 2: Ô cột A là số (ví dụ: 15, 30, 60 phút)
  if (typeof colTime === 'number' && !isNaN(colTime) && colTime > 0) {
    const mins = colTime;
    const ms = Math.round(mins * 60000);
    return {
      isExpiredOnSheet: false,
      timeoutMinutes: mins,
      timeoutMs: ms,
      expiresAtMs: nowMs + ms
    };
  }

  // Trường hợp 3: Ô cột A là chuỗi ký tự
  const rawStr = String(colTime || '').trim();
  if (rawStr) {
    // 3a. Chuỗi chỉ gồm số (VD: "30") hoặc kèm đơn vị thời lượng ("30m", "30p", "30 phút", "2h", "1d")
    const durMatch = rawStr.match(/^(\d+(?:\.\d+)?)\s*(s|sec|giây|m|min|p|phút|phut|h|hr|giờ|gio|d|day|ngày|ngay)?$/i);
    if (durMatch) {
      const val = parseFloat(durMatch[1]);
      const unit = (durMatch[2] || 'm').toLowerCase();
      let mins = val;
      if (unit.startsWith('s') || unit.startsWith('g')) mins = Math.max(0.5, val / 60);
      else if (unit.startsWith('h') || unit === 'giờ' || unit === 'gio') mins = val * 60;
      else if (unit.startsWith('d') || unit.startsWith('n')) mins = val * 1440;
      const ms = Math.round(mins * 60000);
      return {
        isExpiredOnSheet: false,
        timeoutMinutes: mins,
        timeoutMs: ms,
        expiresAtMs: nowMs + ms
      };
    }

    // 3b. Chuỗi ngày giờ (VD: "25/10/2026 14:30" hoặc "2026-10-25 14:30:00")
    const parsedMs = parseFlexibleDateString(rawStr);
    if (parsedMs !== null) {
      if (parsedMs > nowMs) {
        const remainMs = parsedMs - nowMs;
        return {
          isExpiredOnSheet: false,
          timeoutMinutes: Math.max(1, Math.round(remainMs / 60000)),
          timeoutMs: remainMs,
          expiresAtMs: parsedMs
        };
      } else if (CONFIG.EXPIRE_FROM_PAST_SHEET_TIME) {
        const expMs = parsedMs + defaultMins * 60000;
        if (nowMs >= expMs) {
          return {
            isExpiredOnSheet: true,
            expiredMessage: 'Mật khẩu đã quá thời gian bảo mật (' + defaultMins + ' phút kể từ mốc ' + rawStr + ').'
          };
        }
        return {
          isExpiredOnSheet: false,
          timeoutMinutes: Math.max(1, Math.round((expMs - nowMs) / 60000)),
          timeoutMs: expMs - nowMs,
          expiresAtMs: expMs
        };
      }
    }
  }

  // Mặc định: Áp dụng thời gian phiên bảo mật defaultMins tính từ lúc đăng nhập thành công
  const fallbackMs = Math.round(defaultMins * 60000);
  return {
    isExpiredOnSheet: false,
    timeoutMinutes: defaultMins,
    timeoutMs: fallbackMs,
    expiresAtMs: nowMs + fallbackMs
  };
}

/**
 * Hỗ trợ đọc chuỗi ngày giờ định dạng Việt Nam (dd/MM/yyyy HH:mm:ss) hoặc ISO
 */
function parseFlexibleDateString(str) {
  const vnMatch = str.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})(?:\s+(\d{1,2}):(\d{1,2})(?::(\d{1,2}))?)?$/);
  if (vnMatch) {
    const day = parseInt(vnMatch[1], 10);
    const month = parseInt(vnMatch[2], 10) - 1;
    const year = parseInt(vnMatch[3], 10);
    const hour = parseInt(vnMatch[4] || '0', 10);
    const min = parseInt(vnMatch[5] || '0', 10);
    const sec = parseInt(vnMatch[6] || '0', 10);
    const d = new Date(year, month, day, hour, min, sec);
    if (!isNaN(d.getTime())) return d.getTime();
  }
  const isoDate = new Date(str);
  if (!isNaN(isoDate.getTime())) return isoDate.getTime();
  return null;
}

function formatCellTime(val) {
  if (Object.prototype.toString.call(val) === '[object Date]' && !isNaN(val.getTime())) {
    return Utilities.formatDate(val, Session.getScriptTimeZone() || 'Asia/Ho_Chi_Minh', 'dd/MM/yyyy HH:mm:ss');
  }
  return String(val !== undefined && val !== null ? val : '');
}

/**
 * Xuất kết quả dạng JSON hoặc JSONP (hỗ trợ gọi từ cả localhost và file://)
 */
function buildResponse(data, callbackName) {
  const jsonStr = JSON.stringify(data);
  if (callbackName && /^[a-zA-Z0-9_$.]+$/.test(callbackName)) {
    return ContentService
      .createTextOutput(`${callbackName}(${jsonStr});`)
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  return ContentService
    .createTextOutput(jsonStr)
    .setMimeType(ContentService.MimeType.JSON);
}

