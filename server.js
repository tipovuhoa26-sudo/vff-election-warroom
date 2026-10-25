// -*- coding: utf-8 -*-
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const { execFile } = require('child_process');

const PORT = process.env.PORT || 3088;
const DATA_PATH = path.join(__dirname, 'data', 'warroom_db.json');
const PUBLIC_DIR = path.join(__dirname, 'public');
const EXCEL_PATH = path.resolve(__dirname, '../2210/BAO_CAO_TONG_HOP_WARROOM_BAU_CU_VFF_22_10_2026.xlsx');
const AUDIT_EXCEL_PATH = path.resolve(__dirname, '../2210/DANH_MUC_NGUON_DOI_CHIEU_VFF_24_10_2026.xlsx');
const PPTX_PATH = path.resolve(__dirname, '../2210/BAO_CAO_WARROOM_BAU_CU_VFF_2026_US_ELECTION_STYLE.pptx');
const PDF_PATH = path.resolve(__dirname, '../2210/BAO_CAO_WARROOM_BAU_CU_VFF_2026_US_ELECTION_STYLE.pdf');

let cachedDb = null;
let lastDbMtime = 0;

function loadDb() {
  try {
    const stat = fs.statSync(DATA_PATH);
    if (!cachedDb || stat.mtimeMs !== lastDbMtime) {
      const raw = fs.readFileSync(DATA_PATH, 'utf-8');
      cachedDb = JSON.parse(raw);
      lastDbMtime = stat.mtimeMs;
      console.log(`[War-Room Server] Loaded warroom_db.json (${(raw.length / 1024).toFixed(1)} KB)`);
    }
  } catch (err) {
    console.error('[War-Room Server] Error loading DB:', err.message);
  }
}

loadDb();

function sendJson(res, status, payload) {
  const body = JSON.stringify(payload);
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Cache-Control': 'no-store'
  });
  res.end(body);
}

function sendFile(res, filePath, contentType, downloadName = null) {
  if (!fs.existsSync(filePath)) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('404 Not Found: ' + filePath);
    return;
  }
  const stat = fs.statSync(filePath);
  const headers = {
    'Content-Type': contentType,
    'Content-Length': stat.size,
    'Access-Control-Allow-Origin': '*'
  };
  if (downloadName) {
    headers['Content-Disposition'] = `attachment; filename="${downloadName}"`;
  }
  res.writeHead(200, headers);
  fs.createReadStream(filePath).pipe(res);
}

const server = http.createServer((req, res) => {
  const parsed = url.parse(req.url, true);
  const pathname = parsed.pathname;

  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
    res.end();
    return;
  }

  // API: Health & Snapshot Metadata
  if (pathname === '/api/health' && req.method === 'GET') {
    loadDb();
    let excelMtime = null;
    if (fs.existsSync(EXCEL_PATH)) {
      excelMtime = fs.statSync(EXCEL_PATH).mtime.toISOString();
    }
    return sendJson(res, 200, {
      status: 'online',
      server_time: new Date().toISOString(),
      data_mode: (cachedDb && cachedDb.meta && cachedDb.meta.data_mode) || 'SNAPSHOT_FROZEN',
      snapshot_cutoff: (cachedDb && cachedDb.meta && cachedDb.meta.snapshot_cutoff) || '22/10/2026 23:59 GMT+7',
      last_synced_at: (cachedDb && cachedDb.meta && cachedDb.meta.last_synced_at) || null,
      excel_file_mtime: (cachedDb && cachedDb.meta && cachedDb.meta.excel_file_mtime) || excelMtime
    });
  }

  // API: Full DB
  if (pathname === '/api/db' && req.method === 'GET') {
    loadDb();
    return sendJson(res, 200, cachedDb || {});
  }

  // API: Meta & KPIs
  if (pathname === '/api/meta' && req.method === 'GET') {
    loadDb();
    return sendJson(res, 200, cachedDb ? cachedDb.meta : {});
  }

  // API: Specific sheet with search & pagination
  if (pathname.startsWith('/api/sheet/') && req.method === 'GET') {
    loadDb();
    const sheetName = decodeURIComponent(pathname.replace('/api/sheet/', ''));
    const sheet = cachedDb && cachedDb.sheets ? cachedDb.sheets[sheetName] : null;
    if (!sheet) {
      return sendJson(res, 404, { error: 'Sheet not found', sheetName });
    }
    const q = (parsed.query.q || '').toString().trim().toLowerCase();
    let rows = sheet.rows || [];
    if (q) {
      rows = rows.filter(r => Object.values(r).some(v => String(v).toLowerCase().includes(q)));
    }
    const offset = parseInt(parsed.query.offset || '0', 10);
    const limit = parseInt(parsed.query.limit || '5000', 10);
    return sendJson(res, 200, {
      title: sheet.title,
      subtitle: sheet.subtitle,
      headers: sheet.headers,
      total: rows.length,
      rows: rows.slice(offset, offset + limit)
    });
  }

  // API: Global search across all 12 sheets (2,951 records)
  if (pathname === '/api/search' && req.method === 'GET') {
    loadDb();
    const q = (parsed.query.q || '').toString().trim().toLowerCase();
    if (!q) return sendJson(res, 200, { query: '', count: 0, results: [] });
    const results = [];
    for (const [sn, sheet] of Object.entries(cachedDb.sheets || {})) {
      for (const r of sheet.rows || []) {
        if (Object.values(r).some(v => String(v).toLowerCase().includes(q))) {
          results.push({ sheet: sn, headers: sheet.headers, row: r });
          if (results.length >= 250) break;
        }
      }
      if (results.length >= 250) break;
    }
    return sendJson(res, 200, { query: q, count: results.length, results });
  }

  // API: Live sync from Master Excel
  if (pathname === '/api/sync' && req.method === 'POST') {
    if (!fs.existsSync(EXCEL_PATH)) {
      return sendJson(res, 404, {
        status: 'error',
        message: 'Không tìm thấy file Master Excel tại đường dẫn: ' + EXCEL_PATH
      });
    }
    const syncScript = path.join(__dirname, 'scripts', 'sync_from_excel.py');
    const buildScript = path.join(__dirname, 'scripts', 'build_standalone_html.py');
    execFile('python3', [syncScript], (err, stdout, stderr) => {
      if (err) {
        return sendJson(res, 500, {
          status: 'error',
          message: 'Lỗi khi thực thi sync_from_excel.py: ' + err.message,
          stderr
        });
      }
      execFile('python3', [buildScript], (err2, stdout2, stderr2) => {
        loadDb();
        return sendJson(res, 200, {
          status: 'ok',
          message: 'Đã đồng bộ dữ liệu thực tế từ Master Excel 12 Sheets thành công!',
          timestamp: new Date().toISOString(),
          snapshot_cutoff: (cachedDb && cachedDb.meta && cachedDb.meta.snapshot_cutoff) || '22/10/2026 23:59 GMT+7',
          last_synced_at: (cachedDb && cachedDb.meta && cachedDb.meta.last_synced_at) || new Date().toISOString(),
          excel_file_mtime: (cachedDb && cachedDb.meta && cachedDb.meta.excel_file_mtime) || null,
          html_rebuilt: !err2,
          stdout: stdout + '\n' + (stdout2 || '')
        });
      });
    });
    return;
  }

  // Downloads
  if (pathname === '/download/excel') {
    return sendFile(res, EXCEL_PATH, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'BAO_CAO_TONG_HOP_WARROOM_BAU_CU_VFF_24_10_2026.xlsx');
  }
  if (pathname === '/download/audit-excel') {
    return sendFile(res, AUDIT_EXCEL_PATH, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'DANH_MUC_NGUON_DOI_CHIEU_VFF_24_10_2026.xlsx');
  }
  if (pathname === '/download/pptx') {
    return sendFile(res, PPTX_PATH, 'application/vnd.openxmlformats-officedocument.presentationml.presentation', 'BAO_CAO_WARROOM_BAU_CU_VFF_2026_US_ELECTION_STYLE.pptx');
  }
  if (pathname === '/download/pdf') {
    return sendFile(res, PDF_PATH, 'application/pdf', 'BAO_CAO_WARROOM_BAU_CU_VFF_2026_US_ELECTION_STYLE.pdf');
  }

  // Default: Serve index.html
  if (pathname === '/' || pathname === '/index.html') {
    return sendFile(res, path.join(PUBLIC_DIR, 'index.html'), 'text/html; charset=utf-8');
  }

  // Static files in public/
  const safePath = path.normalize(pathname).replace(/^(\.\.[\/\\])+/, '');
  const fullStaticPath = path.join(PUBLIC_DIR, safePath);
  if (fs.existsSync(fullStaticPath) && fs.statSync(fullStaticPath).isFile()) {
    const ext = path.extname(fullStaticPath).toLowerCase();
    const mimeMap = {
      '.html': 'text/html; charset=utf-8',
      '.js': 'application/javascript; charset=utf-8',
      '.css': 'text/css; charset=utf-8',
      '.json': 'application/json; charset=utf-8',
      '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      '.png': 'image/png',
      '.svg': 'image/svg+xml'
    };
    return sendFile(res, fullStaticPath, mimeMap[ext] || 'application/octet-stream');
  }

  res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('404 Not Found');
});

server.listen(PORT, () => {
  console.log(`================================================================================`);
  console.log(`  VFF ELECTION WAR-ROOM COMMAND CENTER (NODE.JS + REACT)`);
  console.log(`  URL: http://localhost:${PORT}`);
  console.log(`  API: http://localhost:${PORT}/api/db | POST http://localhost:${PORT}/api/sync`);
  console.log(`================================================================================`);
});

