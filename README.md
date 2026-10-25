# War-Room Command Center Dashboard — Bầu cử Chủ tịch VFF Khóa X (Nhiệm kỳ 2026–2030)

Hệ thống **Trung tâm Chỉ huy Dư luận Đa nền tảng (War-Room Command Center Dashboard)** phục vụ theo dõi cuộc đua **Bầu cử Chủ tịch Liên đoàn Bóng đá Việt Nam (VFF) Khóa X (Nhiệm kỳ 2026–2030)** giai đoạn `01/10/2026 – 22/10/2026`, được thiết kế theo chuẩn **US Election Broadcast War-Room (CNN / Bloomberg Terminal Style)**, tích hợp **100% cơ sở dữ liệu kiểm toán 12 Sheets (`2.951` bản ghi có liên kết gốc bấm trực tiếp)**.

---

## Kiến trúc Kép (Dual-Mode Architecture): HTML Độc lập + Node.js Full-Stack

Hệ thống hỗ trợ đồng thời **2 chế độ vận hành** tùy theo nhu cầu sử dụng:

### Chế độ 1: Standalone HTML Zero-Install (Mở trực tiếp không cần cài đặt)
Toàn bộ `2.951` bản ghi từ 12 Sheets của Master Workbook Excel đã được nhúng trực tiếp (`window.__WARROOM_DB__`) vào một file HTML duy nhất (`~1.58 MB`).
- **Không cần cài đặt** Node.js, Python hay máy chủ web.
- **Mở trực tiếp (Double-click)** trên mọi máy tính Mac/Windows hoặc gửi qua Zalo/Email để xem ngay trên trình duyệt.
- **Đường dẫn file HTML độc lập**:
  - `/Users/hungnpv/Downloads/Sunext/VFF/2210/WARROOM_DASHBOARD_BAU_CU_VFF_2026.html`
  - `/Users/hungnpv/Downloads/Sunext/VFF/WARROOM_DASHBOARD_BAU_CU_VFF_2026.html`

### Chế độ 2: Node.js + REST API Live Server (Đồng bộ trực tiếp từ file Excel 12 Sheets)
Khi chạy qua máy chủ **Node.js (`server.js`)**, Dashboard kết nối trực tiếp với REST API backend, cho phép:
- Bấm nút **"⚡ Đồng bộ Excel"** ngay trên thanh công cụ để tự động đọc lại file Excel Master (`/Users/hungnpv/Downloads/Sunext/VFF/2210/BAO_CAO_TONG_HOP_WARROOM_BAU_CU_VFF_22_10_2026.xlsx`), cập nhật JSON Database và biên dịch lại bản HTML mới nhất.
- Tải trực tiếp bộ ấn phẩm gốc (**Master Excel 12 Sheets**, **Slide Deck PPTX 14 Slides**, **Báo cáo PDF 14 Trang**).
- Truy vấn REST API tốc độ cao phục vụ kết nối mở rộng.

---

## Hướng dẫn Khởi chạy Máy chủ Node.js

```bash
cd /Users/hungnpv/Downloads/Sunext/VFF/warroom-dashboard

# 1. Khởi chạy máy chủ War-Room Dashboard tại cổng 3088
npm start
# Hoặc: node server.js

# 2. Mở trình duyệt tại địa chỉ:
# http://localhost:3088
```

### Đồng bộ lại dữ liệu khi cập nhật file Excel Master (`2210`)
Mỗi khi chỉnh sửa hoặc thêm dữ liệu vào file `/Users/hungnpv/Downloads/Sunext/VFF/2210/BAO_CAO_TONG_HOP_WARROOM_BAU_CU_VFF_22_10_2026.xlsx`, bạn có thể:
1. Bấm nút **"⚡ Đồng bộ Excel"** trên thanh công cụ trên cùng của Dashboard (khi đang chạy `npm start`), hoặc
2. Chạy lệnh trong Terminal:
```bash
npm run sync
```
Lệnh này sẽ tự động trích xuất lại toàn bộ 12 Sheets sang `data/warroom_db.json` và xuất lại cả 3 file HTML.

---

## 7 Phân khu Chức năng trên Dashboard

1. **🏛️ 1. Tổng Quan & Đối Đầu Ứng Viên (`tab-overview`)**:
   - 6 Thẻ chỉ số KPI chuẩn kiểm toán (`974/1.197` bài đăng & video xác thực, `7,89 triệu` lượt xem, `85.374` câu thoại ASR, `14.469` bình luận thu thập, `1.414` lá phiếu bầu cử trực diện, Điểm tín nhiệm ròng NSI `+794` vs `+368`).
   - Bảng đối đầu trực diện **TS. Trần Quốc Tuấn** (`41,4%` tổng phiếu | `59,1%` đối đầu trực tiếp | NSI `+63,8%`) vs **Ông Nguyễn Đức Thụy (Bầu Thụy)** (`28,6%` tổng phiếu | `40,9%` đối đầu trực tiếp | NSI `+34,3%`) & Giải phẫu 2 Kịch bản Liên danh (`214` phiếu) + 3 Nhóm Phản đối (`423` phiếu).
   - **3 Thước đo Tín nhiệm Đa tầng (Interactive Thermometers)**: Bấm vào từng phân đoạn để nhảy thẳng tới hồ sơ bằng chứng.
2. **📈 2. Diễn Biến Lũy Tiến 22 Ngày & Cảm Xúc (`tab-timeline`)**:
   - Biểu đồ SVG tương tác theo dõi đường cong độ phủ truyền thông và lá phiếu bình luận lũy tiến từ `01/10` đến `22/10/2026` qua 3 giai đoạn chiến dịch.
   - Bảng số liệu chi tiết từng ngày (Sheet 02) và Ma trận đối chiếu Cảm xúc 3 tầng Báo chí — Bài đăng MXH — Bình luận Độc giả (Sheet 03).
3. **🔄 3. Ma Trận Đảo Chiều & Bản Đồ Định Danh (`tab-matrix`)**:
   - Phân tích **Ma trận Đảo chiều Chiến thuật (14–18/10 vs 19–22/10)** và **Bản đồ Định danh 36 Cụm Kênh & Tệp Khán giả Đặc thù** (Sheet 04).
4. **📰 4. Báo Chí (78) & Facebook (378 Kênh / 665 Bài) (`tab-press-fb`)**:
   - Tra cứu toàn văn **78 Bài Báo Chính Thống** (Sheet 05), **Danh bạ Kiểm toán 378 Kênh Facebook** (Sheet 06) và **665 Bài đăng Facebook Xác thực URL** (Sheet 07) với bộ lọc thông minh và liên kết gốc.
5. **🎬 5. Kho Video & Kịch Bản YouTube (169) & TikTok (68) (`tab-video`)**:
   - Tra cứu **169 Video YouTube** (`5,07M` views, `82.549` câu thoại VTT — Sheet 08) và **68 Video TikTok** (`2,83M` views, `2.825` dòng kịch bản — Sheet 09), tích hợp cửa sổ đọc tóm tắt kịch bản bóc băng giọng nói (ASR Modal).
6. **💬 6. Sổ Cái Bình Luận Bầu Cử (FB & YT/TikTok) (`tab-comments`)**:
   - Sổ cái kiểm toán **887 Bình luận Bầu cử Facebook** (Sheet 10) và **604 Bình luận Bầu cử YouTube & TikTok** (Sheet 11) phân loại theo 7 kịch bản lá phiếu, cho phép lọc nhanh và bấm mở trực tiếp từng bình luận gốc.
7. **🎯 7. Tư Vấn Ứng Viên & Phụ Lục Kiểm Chứng (`tab-strategy`)**:
   - **Khuyến nghị Chiến lược Truyền thông Hành động** dành riêng cho từng ứng viên, **Top 15 Hồ sơ Bằng chứng Trọng tâm** và **Sơ đồ Kiến trúc Dữ liệu 12 Sheets** (Sheet 12).

---

## Danh mục Cổng REST API (`server.js`)

| Phương thức | Endpoint | Mô tả |
|---|---|---|
| `GET` | `/api/meta` | Thông tin phiên bản, KPI tổng hợp và hồ sơ đối đầu 3 ứng viên |
| `GET` | `/api/db` | Trả về toàn bộ cơ sở dữ liệu JSON của 12 Sheets (`warroom_db.json`) |
| `GET` | `/api/sheet/:name` | Trả về dữ liệu của 1 Sheet cụ thể (hỗ trợ `?q=`, `?limit=`, `?offset=`) |
| `GET` | `/api/search?q=1.000` | Tìm kiếm toàn cục xuyên suốt 12 Sheets (Kênh, Bài đăng, Video, Bình luận, Báo chí) |
| `POST` | `/api/sync` | Chạy lại bộ trích xuất từ file Excel Master 12 Sheets và cập nhật HTML |
| `GET` | `/download/excel` | Tải xuống file Excel Master 12 Sheets (`BAO_CAO_TONG_HOP_WARROOM_BAU_CU_VFF_22_10_2026.xlsx`) |
| `GET` | `/download/pptx` | Tải xuống Slide Deck 14 trang (`BAO_CAO_WARROOM_BAU_CU_VFF_2026_US_ELECTION_STYLE.pptx`) |
| `GET` | `/download/pdf` | Tải xuống Báo cáo PDF 14 trang (`BAO_CAO_WARROOM_BAU_CU_VFF_2026_US_ELECTION_STYLE.pdf`) |

