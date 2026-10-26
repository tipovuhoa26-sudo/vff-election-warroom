# Báo cáo Phân tích & Theo dõi Dư luận Đa nền tảng — Đại hội VFF Khóa X (Nhiệm kỳ 2026–2030)

Hệ thống **Báo cáo Phân tích & Theo dõi Dư luận Đa nền tảng** phục vụ tổng hợp, đối sánh và truy xuất nguồn dữ liệu công khai xung quanh kỳ **Đại hội Liên đoàn Bóng đá Việt Nam (VFF) Khóa X (Nhiệm kỳ 2026–2030)** giai đoạn `01/10/2026 – 25/10/2026`, được thiết kế theo chuẩn **Editorial & Executive (30 giây nắm tình hình · 2 phút phân tích xu hướng · 2 cú bấm truy xuất nguồn gốc)**, tích hợp toàn bộ **26.743 bản ghi có đường dẫn nguồn bấm mở trực tiếp**.

---

## Kiến trúc Kép (Dual-Mode Architecture): HTML Độc lập + Node.js Server

Hệ thống hỗ trợ đồng thời **2 chế độ vận hành** tùy theo nhu cầu sử dụng:

### Chế độ 1: Standalone HTML Zero-Install (Mở trực tiếp không cần cài đặt)
Toàn bộ cơ sở dữ liệu (`window.__WARROOM_DB__`) đã được nhúng trực tiếp vào file HTML độc lập.
- **Không cần cài đặt** Node.js, Python hay máy chủ web.
- **Mở trực tiếp (Double-click)** trên mọi máy tính Mac/Windows hoặc gửi qua Zalo/Email để xem ngay trên trình duyệt.
- **Đường dẫn file HTML độc lập**:
  - `index.html` / `public/index.html`
  - `/Users/hungnpv/Downloads/Sunext/VFF/WARROOM_DASHBOARD_BAU_CU_VFF_2026.html`
  - `/Users/hungnpv/Downloads/Sunext/VFF/2410/WARROOM_DASHBOARD_BAU_CU_VFF_24_10_2026.html`

### Chế độ 2: Node.js + REST API Live Server
Khi chạy qua máy chủ **Node.js (`server.js`)**, giao diện kết nối trực tiếp với REST API backend, cho phép:
- Truy vấn REST API tốc độ cao và tìm kiếm toàn cục xuyên suốt toàn bộ tập dữ liệu.
- Tải trực tiếp bộ báo cáo tổng hợp định dạng Excel, PowerPoint và PDF.

---

## Hướng dẫn Khởi chạy Máy chủ Node.js

```bash
cd /Users/hungnpv/Downloads/Sunext/VFF/warroom-dashboard

# 1. Khởi chạy máy chủ tại cổng 3088
npm start
# Hoặc: node server.js

# 2. Mở trình duyệt tại địa chỉ:
# http://localhost:3088
```

---

## Cấu trúc 5 Mục Điều hướng Theo Câu hỏi Quản trị

1. **01 · Tổng quan (`tab-overview`)**:
   - Trả lời trong 30 giây 4 câu hỏi cốt lõi: **Tình hình** (Tín hiệu bình luận công khai và độ phủ truyền thông đang nghiêng về đâu?), **Diễn biến** (Xu hướng biến động theo 24 ngày gắn với 4 mốc sự kiện lớn), **Điểm nóng** (Ma trận 6 chủ đề thảo luận trọng tâm) và **Kiểm chứng** (Bảng đối chiếu các kênh tiêu biểu và truy xuất nguồn).
2. **02 · Diễn biến dư luận (`tab-timeline`)**:
   - Biểu đồ tương tác theo dõi mật độ bài viết hàng ngày, đường cong độ phủ lũy kế 24 ngày và điểm tín nhiệm ròng tích lũy qua 5 giai đoạn từ `01/10` đến `24/10/2026`.
   - Bảng số liệu chi tiết từng ngày và đối sánh thái độ 3 tầng: Báo chí — Bài đăng mạng xã hội — Bình luận độc giả.
3. **03 · Kênh & truyền thông (`tab-media-hub`)**:
   - Tích hợp bộ lọc nền tảng ngay trong một không gian thống nhất: **Tổng quan 36 cụm kênh**, **Báo chí (81 bài)**, **Facebook (706 bài / 334+ trang)**, **YouTube (354 video kèm nội dung lời thoại)**, **TikTok (268 video kèm nội dung lời thoại)** và **Bình luận (20.767 bình luận công khai)**.
4. **04 · Đại biểu chính thức (`tab-strategy`)**:
   - Phân tích cấu trúc 57 Tổ chức thành viên có quyền biểu quyết tại Đại hội VFF Khóa X (25 CLB chuyên nghiệp và 32 tổ chức thành viên), các kịch bản Đại hội và khuyến nghị truyền thông cho từng ứng viên.
5. **05 · Nguồn & phương pháp (`tab-sources-ledger`)**:
   - Danh mục toàn diện **26.743 bản ghi & liên kết nguồn** hỗ trợ tìm kiếm, lọc theo nền tảng/nhãn quan điểm, mở đường dẫn gốc và xuất CSV/Excel phục vụ kiểm chứng độc lập, cùng thuyết minh quy trình thu thập và lọc trùng dữ liệu.

---

## Danh mục Cổng REST API (`server.js`)

| Phương thức | Endpoint | Mô tả |
|---|---|---|
| `GET` | `/api/meta` | Thông tin phiên bản, chỉ số tổng hợp và hồ sơ các ứng viên |
| `GET` | `/api/db` | Trả về toàn bộ cơ sở dữ liệu JSON (`warroom_db.json`) |
| `GET` | `/api/sheet/:name` | Trả về dữ liệu của 1 bảng cụ thể (hỗ trợ `?q=`, `?limit=`, `?offset=`) |
| `GET` | `/api/search?q=1.000` | Tìm kiếm toàn cục xuyên suốt các bảng (Kênh, Bài đăng, Video, Bình luận, Báo chí) |
| `POST` | `/api/sync` | Đồng bộ lại dữ liệu từ file Excel và cập nhật các bản HTML |
| `GET` | `/download/excel` | Tải xuống bộ báo cáo Excel tổng hợp |
| `GET` | `/download/pptx` | Tải xuống bản trình bày PowerPoint |
| `GET` | `/download/pdf` | Tải xuống báo cáo định dạng PDF |
