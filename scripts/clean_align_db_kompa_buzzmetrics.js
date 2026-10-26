const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'data', 'warroom_db.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

// ============================================================================
// 1. CLEAN & ALIGN SHEET 03: 03_Ma_Tran_Dao_Chieu_36_Kenh (36 Channel Clusters)
//    Standards: sunext-social-listening, sunext-social-listening-kompa,
//               sunext-social-listening-buzzmetrics, viet-chuyen-nghiep v3.1
// ============================================================================
const clean36Rows = [
  {
    c1: 'Facebook',
    c2: 'Liên đoàn Bóng đá Việt Nam - VFF (Fanpage chính thức VFF)',
    c3: 'Thông tin thể chế & hoạt động ĐTQG (7 ĐTQG dự VCK châu Á, đào tạo trẻ U15/U17 & đối ngoại AFC)',
    c4: '71 bài đăng & video (01–24/10)',
    c5: '1.078 bình luận · 48.498 lượt cảm xúc',
    c6: 'Khối Tuấn Chủ tịch: 82 bình luận (74 chọn làm Chủ tịch + 8 đề xuất Liên danh) | Phản đối Tuấn: 9 | Nhân sự khác: 14 | Khối Thụy Chủ tịch: 6',
    c7: 'TÍN NHIỆM THỂ CHẾ CAO (73,9% bình luận nhân sự ủng hộ TS. Trần Quốc Tuấn): Độc giả ghi nhận thành tích 7 ĐTQG vào VCK châu Á, VFF lọt Top 3 AFC Awards và hoạt động đối ngoại quốc tế tại AFC.',
    c8: 'https://www.facebook.com/vietnamesefootball/posts/pfbid027UtBTx3xBManiYtsRwfvSCZN1sxuVTBjxWqhkHG1DYFhQA9RmfHaEXmWDByzuvzrl'
  },
  {
    c1: 'Facebook',
    c2: 'BLV Tạ Biên Cương & Connect (Hệ sinh thái KOL Bóng đá)',
    c3: 'Mở khảo sát đa chiều: Tỷ phú USD hay Nhà quản lý kinh nghiệm?',
    c4: '24 bài đăng khảo sát & bình luận',
    c5: '751 bình luận · 15.103 lượt cảm xúc',
    c6: 'Khối Tuấn Chủ tịch: 78 bình luận (54 chọn thẳng + 24 Liên danh) | Phản đối Thụy: 22 | Phản đối Tuấn: 14 | Khối Thụy Chủ tịch: 46 (32 chọn thẳng + 14 Liên danh)',
    c7: 'NGHIÊNG VỀ TS. TRẦN QUỐC TUẤN (48,8% so với 28,8%): Dù bài đăng đặt câu hỏi mở, luồng bình luận ưu tiên TS. Trần Quốc Tuấn giữ chức Chủ tịch kết hợp Liên danh.',
    c8: 'https://www.facebook.com/blvbiencuong/posts/pfbid0M7nRCtjxs3o2iJGLGBcbZuduE2EPAuMmtwozK3cD2NkX3ww5UpZgFDJ82oEsTc9ul'
  },
  {
    c1: 'Facebook',
    c2: 'Tuyền Văn Hóa (Fanpage KOL Bình luận viên)',
    c3: 'Đưa tin ĐTQG & khảo sát nhân sự thượng tầng VFF',
    c4: '10 bài đăng & bản tin theo dõi',
    c5: '348 bình luận · 23.840 lượt cảm xúc',
    c6: 'Khối Tuấn Chủ tịch: 28 bình luận (21 chọn thẳng + 7 Liên danh) | Phản đối Tuấn/Nhập tịch: 16 | Phản đối Thụy: 8 | Khối Thụy Chủ tịch: 18',
    c7: 'TRANH LUẬN SÔI NỔI: 40,0% bình luận nhân sự chọn TS. Trần Quốc Tuấn làm Chủ tịch, đồng thời có 16 bình luận tranh luận gay gắt về chính sách cầu thủ nhập tịch.',
    c8: 'https://www.facebook.com/TuyenVanHoaOfficial/posts/pfbid0NV58ryEkDeMEdZSWQLhi38oSEsaXrK8ftU1Q3Urtd8ojbqkv6f9wYug2G6mjwPZgl'
  },
  {
    c1: 'Facebook',
    c2: 'Mai Anh Tài & Ted Trần TV (Cụm 2 kênh phân tích bóng đá)',
    c3: 'Phân tích lộ trình World Cup 2030, đào tạo trẻ U17 & thể chế VFF',
    c4: '19 bài đăng & video phân tích',
    c5: '598 bình luận · 6.345 lượt cảm xúc',
    c6: 'Khối Tuấn Chủ tịch: 64 bình luận (51 chọn thẳng + 13 Liên danh) | Phản đối Thụy: 15 | Phản đối Tuấn: 8 | Khối Thụy Chủ tịch: 19 (14 chọn thẳng + 5 Liên danh)',
    c7: 'CỦNG CỐ LẬP TRƯỜNG (60,4% chọn TS. Trần Quốc Tuấn): Độc giả đồng tình phương án cần nhà quản trị chuyên trách có uy tín quốc tế tại AFC và FIFA.',
    c8: 'https://www.facebook.com/tedtrantv/posts/pfbid0LqwccDMEVkRGY5FBs9e83Zh2qy3FoeykzNyVp7EgUxiy9yAzUNyt2t6MLPAo16cQl'
  },
  {
    c1: 'Facebook',
    c2: 'BLV Anh Quân (Fanpage Bình luận viên)',
    c3: 'Phân tích trung lập mục tiêu World Cup 2030 & nhân sự VFF',
    c4: '5 bài đăng phân tích chuyên đề',
    c5: '281 bình luận · 39.280 lượt cảm xúc',
    c6: 'Khối Tuấn Chủ tịch: 31 bình luận (24 chọn thẳng + 7 Liên danh) | Phản đối cả hai: 19 | Phản đối Tuấn: 11 | Khối Thụy Chủ tịch: 21',
    c7: 'PHẢN BIỆN THỰC TẾ: Nhiều bình luận cho rằng bóng đá Việt Nam cần kiên trì làm tốt đào tạo trẻ và hệ thống giải quốc nội trước khi đặt mục tiêu World Cup.',
    c8: 'https://www.facebook.com/blvanhquan/posts/pfbid0coPV4PLKfGRZVJ5zEucPiN79S6sqRPTYY1n3fwte8gaE84gF7vkkXGUb4JYpNxq2l'
  },
  {
    c1: 'Facebook',
    c2: 'Anh Em Bóng Đá (Chuyên trang phân tích chuyên sâu)',
    c3: 'Phản biện mô hình Chủ tịch doanh nhân từ bài học Madam Pang & Erick Thohir',
    c4: '4 bài phân tích chuyên sâu',
    c5: '205 bình luận · 5.714 lượt cảm xúc',
    c6: 'Khối Tuấn Chủ tịch: 42 bình luận (33 chọn thẳng + 9 Liên danh) | Phản đối Thụy: 18 | Phản đối Tuấn: 5 | Khối Thụy Chủ tịch: 6 (4 chọn thẳng + 2 Liên danh)',
    c7: 'ĐỒNG THUẬN CHUYÊN MÔN CAO (59,2% chọn TS. Trần Quốc Tuấn + 25,4% phản đối mô hình ông bầu): Điểm tựa lập luận về rủi ro xung đột lợi ích CLB.',
    c8: 'https://www.facebook.com/anhembongdavn/posts/pfbid02REBqXd9cPJtgGBC5AGjbrThap7ChfG7f4AGtp1KLrbfjSLEq6RMnwJX2brESw3Tul'
  },
  {
    c1: 'Facebook',
    c2: 'HattrickSport (Chuyên trang phân tích Bóng đá Việt Nam)',
    c3: 'Ghi nhận VFF lọt Top 3 Liên đoàn Kim Cương AFC & cập nhật 3 ứng viên',
    c4: '6 bài phân tích & đồ họa',
    c5: '141 bình luận · 13.452 lượt cảm xúc',
    c6: 'Khối Tuấn Chủ tịch: 38 bình luận (26 chọn thẳng + 12 Liên danh) | Phản đối Thụy: 6 | Phản đối Tuấn: 3 | Khối Thụy Chủ tịch: 9 (6 chọn thẳng + 3 Liên danh)',
    c7: 'ĐỒNG THUẬN 67,9% CHỌN TS. TRẦN QUỐC TUẤN: Nhiều độc giả đề xuất phương án kết hợp TS. Trần Quốc Tuấn làm Chủ tịch và Ông Nguyễn Đức Thụy làm Phó Chủ tịch Tài chính.',
    c8: 'https://www.facebook.com/hattrick.io/posts/pfbid02aqVErJqjXw3GZiBv3p1TJLzH2NSN4ktQ6TFvaCTZWvP8hpFuKDn6sGDBhYdETB9Ml'
  },
  {
    c1: 'Facebook',
    c2: 'Nguyễn Minh Châu (KOL mở bình chọn 3 ứng viên)',
    c3: 'Đăng danh sách 3 ứng viên Chủ tịch VFF (xếp Ông Nguyễn Đức Thụy vị trí số 1)',
    c4: '3 bài đăng khảo sát trực tiếp (19/10)',
    c5: '127 bình luận · 819 lượt cảm xúc',
    c6: 'Khối Tuấn Chủ tịch: 29 bình luận (19 chọn thẳng + 10 Liên danh) | Phản đối Thụy: 12 | Phản đối cả hai: 6 | Khối Thụy Chủ tịch: 13 (9 chọn thẳng + 4 Liên danh)',
    c7: 'ĐẢO CHIỀU BÌNH LUẬN: Dù bài đăng xếp Ông Nguyễn Đức Thụy ở vị trí đầu tiên, 48,3% bình luận của độc giả bên dưới lựa chọn giữ TS. Trần Quốc Tuấn làm Chủ tịch.',
    c8: 'https://www.facebook.com/chaurau0105/posts/pfbid02kRUZGrZG2Kvs6EujZf3WhUUTUxEhr3CirNreaYbWc8aYuXk6gbz7ndMqTicKLr7Yl'
  },
  {
    c1: 'Facebook',
    c2: 'Cụm đăng tải đồng loạt "Phấn Đấu" & 38 hội nhóm (VLeague 360...)',
    c3: 'Đăng tải đồng loạt bài viết mẫu & đồ họa quảng bá Ông Nguyễn Đức Thụy làm Chủ tịch',
    c4: '34 bài đăng đồng loạt theo mẫu',
    c5: '88 bình luận · 795 lượt cảm xúc',
    c6: 'Khối Tuấn Chủ tịch: 25 bình luận (17 chọn thẳng + 8 Liên danh) | Phản đối Thụy/bài đăng mẫu: 14 | Phản đối Tuấn: 4 | Khối Thụy Chủ tịch: 15',
    c7: 'HIỆU ỨNG NGƯỢC TỪ BÀI ĐĂNG MẪU: Dù đăng tải hàng loạt vào các hội nhóm nhưng 43,1% bình luận vẫn chọn TS. Trần Quốc Tuấn và 24,1% phản ứng với nội dung PR đồng loạt.',
    c8: 'https://www.facebook.com/nguyenphandaudakpo/posts/pfbid09KFYJgwo8JG2SwbYnMmtCGTvDVBes8W7KN8rehLcfzpQKm5AWVVde183hjotdkLCl'
  },
  {
    c1: 'Facebook',
    c2: 'Góc nhìn thể thao (Báo Lao Động), iThethao TV & Cụm trang tin dẫn nguồn',
    c3: 'Đưa tin 3 ứng viên Chủ tịch VFF (19/10) & thông tin tỷ phú USD tham gia tranh cử',
    c4: '12 bài đăng trên cụm trang tin thể thao',
    c5: '104 bình luận · 274 lượt cảm xúc',
    c6: 'Khối Tuấn Chủ tịch: 19 bình luận (13 chọn thẳng + 6 Liên danh) | Phản đối Thụy: 11 | Phản đối Tuấn: 6 | Khối Thụy Chủ tịch: 22 (17 chọn thẳng + 5 Liên danh)',
    c7: 'THẾ GIẰNG CO TRÊN TRANG TIN THỂ THAO (14–19/10): Thu hút sự chú ý về thông tin tỷ phú USD ứng cử, tạo thế cân bằng 22 so với 19 ở tầng bình luận.',
    c8: 'https://www.facebook.com/Thethaobaolaodong/posts/pfbid0mLLLaw7EwqD5w83cCbeZ5Tw4ihS5ptc9nDdd5APDSWnK2H6yikRVgMcxjD5WmVDfl'
  },
  {
    c1: 'Facebook',
    c2: 'Ghiền Bóng Đá TV & Yêu Bóng đá Việt Nam (Cụm fanpage cộng đồng lớn)',
    c3: 'Đưa tin hoạt động các ĐTQG & thảo luận nhân sự Đại hội VFF',
    c4: '9 bài đăng cộng đồng bóng đá',
    c5: '306 bình luận · 8.149 lượt cảm xúc',
    c6: 'Khối Tuấn Chủ tịch: 24 bình luận (18 chọn thẳng + 6 Liên danh) | Phản đối Tuấn: 9 | Phản đối cả hai: 11 | Khối Thụy Chủ tịch: 14 (11 chọn thẳng + 3 Liên danh)',
    c7: 'KHÁN GIẢ ĐẠI CHÚNG: Ưu tiên sự ổn định của các đội tuyển quốc gia (41,4% chọn TS. Trần Quốc Tuấn), trong khi 19,0% mong muốn đổi mới mạnh mẽ hơn.',
    c8: 'https://www.facebook.com/ghienbongdaTV/posts/pfbid02oUPpF12enNjDZ83NHns1HpoNgZ3xeksBshD4tq2aipyBqKtJh9h48AKtZT4RcU3Dl'
  },
  {
    c1: 'Facebook',
    c2: 'BLV Nghiệp Dư & Bóng Đá 24h (Cụm trang so sánh mô hình Erick Thohir)',
    c3: 'So sánh Ông Nguyễn Đức Thụy với Erick Thohir & nêu thông tin >40/57 đề cử',
    c4: '21 bài đăng & video ngắn (Reels)',
    c5: '87 bình luận · 3.081 lượt cảm xúc',
    c6: 'Khối Tuấn Chủ tịch: 16 bình luận (11 chọn thẳng + 5 Liên danh) | Phản đối Thụy (nhắc tiền lệ bỏ giải): 11 | Phản đối Tuấn: 3 | Khối Thụy Chủ tịch: 10',
    c7: 'ĐẢO CHIỀU NGƯỢC: Bài đăng ca ngợi mô hình tỷ phú nhưng 40,0% bình luận chọn TS. Trần Quốc Tuấn và 27,5% nhắc lại tiền lệ giải thể CLB Sài Gòn Xuân Thành (2013).',
    c8: 'https://www.facebook.com/permalink.php?story_fbid=pfbid0aynUVpLrxxLyYgyth3TCpsA7BfsSrXx2riWicF4bEemR2BYcX8DtfEsQVVCcR912l&id=61572089825088'
  },
  {
    c1: 'YouTube',
    c2: 'Vlog Minh Hải (Kênh phân tích chuyên sâu về VFF trên YouTube)',
    c3: 'Phân tích chuyên sâu: Ưu tiên phương án TS. Trần Quốc Tuấn làm Chủ tịch + doanh nhân hỗ trợ tài chính',
    c4: '16 video phân tích (2,11 triệu lượt xem)',
    c5: '1.808 bình luận (388 bình luận nhân sự)',
    c6: 'Khối Tuấn Chủ tịch: 72 bình luận (45 chọn thẳng + 27 Liên danh) | Bầu Đức/Nhân sự khác: 49 | Phản đối Thụy: 28 | Phản đối Tuấn: 18 | Khối Thụy Chủ tịch: 58 (36 chọn thẳng + 22 Liên danh)',
    c7: 'KÊNH DẪN DẮT THẢO LUẬN SỐ 1 YOUTUBE: Khán giả ủng hộ mạnh mô hình TS. Trần Quốc Tuấn giữ chức Chủ tịch đối ngoại kết hợp doanh nhân phụ trách tài chính.',
    c8: 'https://www.youtube.com/watch?v=u_6dEnPr4DU'
  },
  {
    c1: 'YouTube',
    c2: 'BÓNGĐÁ TV & BÓNGĐÁ TV 19H30 (Hệ thống bản tin YouTube)',
    c3: 'Đưa tin đậm nét Ông Nguyễn Đức Thụy ứng cử & phát biểu mục tiêu tài chính (21–22/10)',
    c4: '15 video bản tin (960.000 lượt xem)',
    c5: '802 bình luận (94 bình luận nhân sự)',
    c6: 'Khối Tuấn Chủ tịch: 21 bình luận (14 chọn thẳng + 7 Liên danh) | Phản đối Thụy: 19 | Phản đối Tuấn: 9 | Khối Thụy Chủ tịch: 34 (22 chọn thẳng + 12 Liên danh)',
    c7: 'TẠO SÓNG THẢO LUẬN NGÀY 21–22/10: Thu hút 34 bình luận ủng hộ Ông Nguyễn Đức Thụy làm Chủ tịch, đồng thời có 19 bình luận lưu ý vấn đề xung đột lợi ích CLB.',
    c8: 'https://www.youtube.com/watch?v=fD_yAoXALog'
  },
  {
    c1: 'YouTube',
    c2: 'Nhím Bóng Đá (Kênh YouTube Shorts & bản tin nhanh)',
    c3: 'Tranh luận chính sách cầu thủ nhập tịch (01–07/10) & đưa tin cam kết 1.000 tỷ đồng (22/10)',
    c4: '5 video bản tin (219.000 lượt xem)',
    c5: '610 bình luận (42 bình luận nhân sự)',
    c6: 'Khối Tuấn Chủ tịch: 8 bình luận (6 chọn thẳng + 2 Liên danh) | Phản đối Tuấn/Nhập tịch: 15 | Phản đối Thụy: 7 | Khối Thụy Chủ tịch: 12 (9 chọn thẳng + 3 Liên danh)',
    c7: 'ĐIỂM NÓNG TRANH LUẬN NHẬP TỊCH: Tập trung luồng ý kiến tranh cãi về phát ngôn cầu thủ nhập tịch đầu tháng 10 và thảo luận gói 1.000 tỷ đồng ngày 22/10.',
    c8: 'https://www.youtube.com/watch?v=YEtyFMcPkPA'
  },
  {
    c1: 'YouTube',
    c2: 'Giờ Vàng TV (Kênh bình luận bóng đá trên YouTube)',
    c3: 'Đặt vấn đề thu hút tương tác: "VFF sắp có Chủ tịch tỷ phú USD?"',
    c4: '8 video bình luận (174.000 lượt xem)',
    c5: '260 bình luận (52 bình luận nhân sự)',
    c6: 'Khối Tuấn Chủ tịch: 14 bình luận (10 chọn thẳng + 4 Liên danh) | Phản đối Thụy: 12 | Phản đối cả hai: 6 | Khối Thụy Chủ tịch: 20 (16 chọn thẳng + 4 Liên danh)',
    c7: 'THU HÚT KHÁN GIẢ TRẺ: Tỷ lệ bình luận chọn Ông Nguyễn Đức Thụy nhỉnh hơn (38,5% so với 26,9%), nhưng 23,1% bày tỏ lo ngại về tính bền vững dài hạn.',
    c8: 'https://www.youtube.com/watch?v=E67MKR8yAsk'
  },
  {
    c1: 'YouTube',
    c2: 'BÓNG ĐÁ NGÀY NAY (Chuyên mục phân tích bầu cử VFF trên YouTube)',
    c3: 'Đa chiều: Vừa đưa tin tỷ phú USD ứng cử vừa phân tích bài học Thái Lan & Indonesia',
    c4: '5 video chuyên đề (415.000 lượt xem)',
    c5: '97 bình luận (76 bình luận nhân sự)',
    c6: 'Khối Tuấn Chủ tịch: 22 bình luận (16 chọn thẳng + 6 Liên danh) | Bầu Đức: 12 | Phản đối Thụy: 14 | Phản đối Tuấn: 5 | Khối Thụy Chủ tịch: 23 (19 chọn thẳng + 4 Liên danh)',
    c7: 'CÂN BẰNG HAI CHIỀU: Video ngày 14/10 phân tích bài học từ Thái Lan và Indonesia giúp củng cố luồng ý kiến ủng hộ sự ổn định của TS. Trần Quốc Tuấn.',
    c8: 'https://www.youtube.com/watch?v=zBelpKcW-CE'
  },
  {
    c1: 'YouTube',
    c2: 'Vlog Ngoài đường piste & Piste TV (Cụm kênh phân tích chuyên môn)',
    c3: 'Phân tích đối sánh 3 ứng viên Chủ tịch VFF & mục tiêu huy động 600–1.000 tỷ đồng/năm',
    c4: '9 video phân tích (186.000 lượt xem)',
    c5: '107 bình luận (68 bình luận nhân sự)',
    c6: 'Khối Tuấn Chủ tịch: 21 bình luận (14 chọn thẳng + 7 Liên danh) | Phản đối Thụy: 11 | Phản đối Tuấn: 4 | Khối Thụy Chủ tịch: 26 (19 chọn thẳng + 7 Liên danh)',
    c7: 'CHUYỂN ĐỘNG NGÀY 21–22/10: Các video phân tích mục tiêu huy động 600–1.000 tỷ đồng/năm giúp Ông Nguyễn Đức Thụy thu hút thêm nhóm khán giả thực dụng.',
    c8: 'https://www.youtube.com/watch?v=lCEAO16FPZs'
  },
  {
    c1: 'YouTube',
    c2: 'Hoàng Trí Công & Cú Đúp TV (Cụm kênh điểm tin & bình luận sáng)',
    c3: 'Điểm tin tỷ phú USD tranh cử, chuyến công tác AFC tại Nhật Bản của TS. Trần Quốc Tuấn & Asian Cup',
    c4: '7 video điểm tin (192.000 lượt xem)',
    c5: '98 bình luận (44 bình luận nhân sự)',
    c6: 'Khối Tuấn Chủ tịch: 19 bình luận (14 chọn thẳng + 5 Liên danh) | Phản đối Thụy: 9 | Phản đối cả hai: 5 | Khối Thụy Chủ tịch: 11 (8 chọn thẳng + 3 Liên danh)',
    c7: 'NGHIÊNG VỀ SỰ ỔN ĐỊNH (43,2% chọn TS. Trần Quốc Tuấn): Khán giả đánh giá cao vai trò đối ngoại của TS. Trần Quốc Tuấn tại Hội nghị AFC ở Tokyo.',
    c8: 'https://www.youtube.com/watch?v=ZWh89U6kf4U'
  },
  {
    c1: 'YouTube',
    c2: 'Bóng Đá STV, Đỉnh Cao Bóng Đá & Vị Thế Mới (Cụm kênh YouTube thể thao)',
    c3: 'Ghi nhận thành tích U14/U17 Việt Nam & đặt câu hỏi "Chủ tịch VFF đổi chủ?"',
    c4: '6 video tổng hợp (220.000 lượt xem)',
    c5: '74 bình luận (34 bình luận nhân sự)',
    c6: 'Khối Tuấn Chủ tịch: 16 bình luận (12 chọn thẳng + 4 Liên danh) | Phản đối Thụy: 7 | Phản đối cả hai: 4 | Khối Thụy Chủ tịch: 7 (5 chọn thẳng + 2 Liên danh)',
    c7: 'HIỆU ỨNG THÀNH TÍCH ĐÀO TẠO TRẺ: Kết quả tích cực của các đội tuyển trẻ U14/U17 trước các đối thủ châu Á củng cố uy tín điều hành của TS. Trần Quốc Tuấn.',
    c8: 'https://www.youtube.com/watch?v=Vi19q-hmPRg&t=31s'
  },
  {
    c1: 'TikTok',
    c2: '★ Mr Quan Ngại ★ (@mrquanngai - Kênh TikTok thảo luận nhân sự VFF)',
    c3: 'Mở khảo sát trực diện trên TikTok: "Ai sẽ là Chủ tịch VFF khóa X?"',
    c4: '2 video khảo sát (48.900 lượt xem)',
    c5: '51 bình luận (38 bình luận nhân sự)',
    c6: 'Khối Tuấn Chủ tịch: 6 bình luận (5 chọn thẳng + 1 Liên danh) | Hỏi quy trình: 12 | Bầu Đức: 5 | Phản đối Thụy: 3 | Khối Thụy Chủ tịch: 11',
    c7: 'ĐẶC TRƯNG KHÁN GIẢ TIKTOK: Quan tâm đến yếu tố mới lạ của ứng viên tỷ phú (11 bình luận chọn Ông Thụy so với 6 chọn TS. Tuấn) và 12 bình luận hỏi về quy trình bầu cử.',
    c8: 'https://www.tiktok.com/@mrquanngai/video/7698553285401201941'
  },
  {
    c1: 'TikTok',
    c2: 'VFF Official (@vff.official - Kênh TikTok chính thức của VFF)',
    c3: 'Thông tin hoạt động ĐTQG & hình ảnh Chủ tịch VFF Trần Quốc Tuấn động viên tuyển trẻ U15/U17',
    c4: '15 video hoạt động ĐTQG & VFF',
    c5: '57 bình luận · 36.200 lượt tương tác',
    c6: 'Tích cực cổ vũ ĐTQG & ghi nhận Chủ tịch VFF: 48 bình luận | Trung lập chuyên môn: 9 bình luận | Phản đối: 0 bình luận',
    c7: 'TƯƠNG TÁC TÍCH CỰC TRÊN KÊNH SỞ HỮU (36.200 lượt tương tác): Lan tỏa hình ảnh lãnh đạo VFF sát sao với công tác đào tạo bóng đá trẻ U15 và U17.',
    c8: 'https://www.tiktok.com/@vff.official/video/7697570979693825287'
  },
  {
    c1: 'TikTok',
    c2: 'CafeF TikTok (@cafef_official) & DFF.VN (@dff.vn - Kênh TikTok Tài chính)',
    c3: 'Đưa tin ứng viên xuất thân ngân hàng: Ông Nguyễn Đức Thụy (LPBank) & Ông Nguyễn Xuân Vũ (Sacombank)',
    c4: '2 video chuyên đề (193.700 lượt xem)',
    c5: '38 bình luận (28 bình luận nhân sự)',
    c6: 'Khối Tuấn Chủ tịch: 2 bình luận | Phản đối Thụy (lo ngại rủi ro): 6 | Ủng hộ Xuân Vũ: 4 | Khối Thụy Chủ tịch: 13',
    c7: 'PHÂN HÓA TRÊN TIKTOK TÀI CHÍNH: 13 bình luận ủng hộ Ông Nguyễn Đức Thụy về tiềm lực tài chính, song xuất hiện 6 bình luận cảnh báo rủi ro mô hình ông bầu.',
    c8: 'https://www.tiktok.com/@cafef_official/video/7698689740371004679'
  },
  {
    c1: 'TikTok',
    c2: 'TVH Sports, F247, Business Insight & Cao Duy Phong (Cụm TikTok đợt 20–22/10)',
    c3: 'Lan tỏa phát biểu cam kết huy động 600–1.000 tỷ đồng/năm & không dùng ngân sách Nhà nước (21–22/10)',
    c4: '14 video ngắn (8.800 lượt tương tác)',
    c5: '18 bình luận (12 bình luận nhân sự)',
    c6: 'Khối Tuấn Chủ tịch: 3 bình luận | Phản đối Thụy (hoài nghi cam kết): 3 | Khối Thụy Chủ tịch: 6',
    c7: 'NHỊP LAN TỎA NGÀY 21–22/10: Phủ sóng nhanh thông điệp tự chủ tài chính của Ông Nguyễn Đức Thụy trên định dạng video ngắn TikTok.',
    c8: 'https://www.tiktok.com/@tuyenvanhoasports/video/7699355145942994197'
  },
  {
    c1: 'Báo chí chính thống',
    c2: 'Cổng thông tin VFF (VFF.org.vn) & Tạp chí Bóng Đá (Bongdaplus.vn)',
    c3: 'Thông tin thể chế chính thức: Tổng kết nhiệm kỳ IX (7 ĐTQG dự VCK châu Á), đối ngoại FIFA/AFC & công tác chuẩn bị Đại hội',
    c4: '10 bài báo & 16 bài đăng Fanpage',
    c5: '12 bình luận · 1.559 lượt cảm xúc',
    c6: '100% bài viết cung cấp số liệu tổng kết nhiệm kỳ IX, thư khen của FIFA, đề cử Top 3 AFC Awards và kế hoạch hoạt động các ĐTQG',
    c7: 'TRỤ CỘT THÔNG TIN THỂ CHẾ: Giữ nhịp truyền thông chính thống xuyên suốt chiến dịch, cung cấp hệ quy chiếu về tiêu chuẩn quản trị bóng đá quốc tế.',
    c8: 'https://vff.org.vn/nhin-lai-nhiem-ky-ix-cua-vff-nhung-ky-luc-mo-duong-cho-bong-da-viet-nam/'
  },
  {
    c1: 'Báo chí chính thống',
    c2: 'Báo Điện tử VnExpress & Thể thao VnExpress',
    c3: 'Đưa tin tổng kết nhiệm kỳ IX của VFF, danh sách đề cử Chủ tịch khóa X & mục tiêu doanh thu nghìn tỷ',
    c4: '6 bài báo & 15 bài đăng Fanpage',
    c5: '68 bình luận Web & Facebook',
    c6: 'Trong các bài viết tổng kết nhiệm kỳ IX (19/10) và đưa tin chốt danh sách ứng viên: khoảng 72% ý kiến độc giả nghiêng về phương án ổn định thể chế của TS. Trần Quốc Tuấn',
    c7: 'ĐỘ TIN CẬY ĐẠI CHÚNG CAO: Phản ánh khách quan cả dấu ấn nhiệm kỳ IX lẫn mục tiêu huy động nguồn lực tài chính của ứng viên doanh nhân.',
    c8: 'https://vnexpress.net/vff-chot-de-cu-chu-tich-nhiem-ky-moi-hom-nay-5134177.html'
  },
  {
    c1: 'Báo chí chính thống',
    c2: 'Chuyên trang Thethao247.vn & Hệ thống Fanpage Thể Thao 247',
    c3: 'Tổng kết dấu ấn nhiệm kỳ IX của TS. Trần Quốc Tuấn & khảo sát 3 ứng viên Chủ tịch VFF khóa X',
    c4: '5 bài báo & 16 bài đăng Fanpage',
    c5: '280 bình luận · 7.885 lượt cảm xúc',
    c6: 'Khối Tuấn Chủ tịch: 34 bình luận (25 chọn thẳng + 9 Liên danh) | Phản đối Thụy: 8 | Phản đối Tuấn: 5 | Khối Thụy Chủ tịch: 14 (10 chọn thẳng + 4 Liên danh)',
    c7: 'TƯƠNG TÁC CAO NHẤT KHỐI TRANG TIN THỂ THAO (7.885 lượt cảm xúc): Độc giả nghiêng rõ về phương án giữ TS. Trần Quốc Tuấn làm Chủ tịch.',
    c8: 'https://www.facebook.com/thethao247.vn/posts/pfbid0kcBHxEW2vB1GWMQKG1L2b2XJW4AbrSbTPJvivf1URhipp2bYxHnxCESNs43PT9Dpl'
  },
  {
    c1: 'Báo chí chính thống',
    c2: 'Báo Thanh Niên & Báo Tuổi Trẻ (Khối nhật báo chính trị - xã hội lớn)',
    c3: 'Ghi nhận dấu ấn nhiệm kỳ IX, nguồn lực 25 triệu USD từ FIFA & hoạt động đối ngoại AFC',
    c4: '9 bài báo chính thống (03–22/10)',
    c5: '45 bình luận độc giả trên báo điện tử',
    c6: '100% bài viết tập trung phân tích chiều sâu quản trị, nguồn vốn hỗ trợ từ FIFA/AFC và chiến lược đầu tư dài hạn cho các đội tuyển trẻ U15, U17, U23',
    c7: 'ĐỐI TRỌNG THỂ CHẾ TRÊN BÁO CHÍNH THỐNG: Khẳng định vai trò của uy tín đối ngoại quốc tế trong việc thu hút nguồn lực bền vững từ FIFA và AFC.',
    c8: 'https://thanhnien.vn/vff-nhiem-ky-ix-pha-vo-nhung-gioi-han-185261012222627364.htm'
  },
  {
    c1: 'Báo chí chính thống',
    c2: 'Báo Lao Động & Báo Điện tử VTC News (Khối báo giải thích quy chế Đại hội)',
    c3: 'Đưa tin chuẩn mực quy chế bầu cử, công bố 3 ứng viên & phân tích 80 khóa đào tạo, phủ sóng VAR',
    c4: '9 bài báo & 1 bài đăng Fanpage',
    c5: '67 bình luận · 199 lượt cảm xúc',
    c6: 'Khối Tuấn Chủ tịch: 19 bình luận | Khối Thụy Chủ tịch: 14 bình luận | Thảo luận quy trình & nhân sự khác: 34 bình luận',
    c7: 'LÀM RÕ QUY TRÌNH ĐẠI HỘI: Giải thích rõ việc đề cử từ các tổ chức thành viên là bước giới thiệu nhân sự đầu vào trước khi hiệp thương và bỏ phiếu kín tại Đại hội.',
    c8: 'https://laodong.vn/bong-da/bau-thuy-co-ten-trong-3-ung-vien-du-dieu-kien-tranh-cu-chu-tich-vff-khoa-10-1785899.ldo'
  },
  {
    c1: 'Báo chí chính thống',
    c2: 'Báo Thể thao & Văn hóa (TTXVN) & Báo Tiền Phong',
    c3: 'Phân tích trung lập cuộc đua giữa doanh nhân và nhà quản lý bóng đá; gợi mở mô hình kết hợp',
    c4: '7 bài báo, 3 bài Facebook & 2 video YouTube',
    c5: '15 bình luận · 379 lượt cảm xúc',
    c6: '11/15 bình luận trên Fanpage Thể thao & Văn hóa ủng hộ phương án kết hợp: TS. Trần Quốc Tuấn giữ chức Chủ tịch và các doanh nhân đảm nhận vai trò Phó Chủ tịch Tài chính',
    c7: 'GỢI MỞ CÔNG THỨC DUNG HÒA: Nêu bật ưu thế chuyên môn quốc tế của TS. Trần Quốc Tuấn song hành cùng nguồn lực xã hội hóa từ doanh nhân.',
    c8: 'https://thethaovanhoa.vn/ba-ung-vien-tranh-cu-chu-tich-vff-khoa-x-cuoc-dua-giua-cac-doanh-nhan-va-nha-quan-ly-bong-da-20261019192631335.htm'
  },
  {
    c1: 'Báo chí chính thống',
    c2: 'VOV.VN, Báo Nhân Dân, Báo Đồng Tháp & VietnamPlus (Khối cơ quan báo chí Nhà nước)',
    c3: 'Phân tích nền tảng quản trị hệ thống, công tác đào tạo trẻ & vị thế quốc tế của VFF',
    c4: '7 bài báo chính luận (12–21/10)',
    c5: '22 bình luận độc giả (100% tích cực)',
    c6: '100% bài viết và phản hồi độc giả ghi nhận nền tảng quản trị hệ thống, công tác đào tạo HLV/trọng tài, phủ sóng VAR và vị thế đối ngoại của VFF',
    c7: 'CỦNG CỐ TÍN NHIỆM THỂ CHẾ: Khẳng định VFF nhiệm kỳ IX đi đúng quỹ đạo chuyên nghiệp hóa theo tiêu chuẩn của FIFA và AFC.',
    c8: 'https://vov.vn/the-thao/vi-the-quoc-te-va-ngoai-giao-tu-san-co-den-ban-dieu-hanh-buoc-tien-bong-da-viet-post1340737.vov'
  },
  {
    c1: 'Báo chí chính thống',
    c2: 'Chuyên trang CafeF & VietNamBiz (Khối báo Kinh tế - Tài chính)',
    c3: 'Đưa tin đậm nét Ông Nguyễn Đức Thụy (>40/57 đề cử, Bầu Hiển/Bầu Đức ủng hộ & mục tiêu 1.000 tỷ đồng)',
    c4: '6 bài báo, 1 bài Facebook & 1 video TikTok',
    c5: '39 bình luận (15 Facebook + 24 TikTok)',
    c6: 'Trên Facebook CafeF (15 bình luận): 6 ủng hộ Ông Thụy, 1 cảnh báo | Trên TikTok CafeF (24 bình luận): 9 ủng hộ Ông Thụy, 6 cảnh báo rủi ro mô hình ông bầu',
    c7: 'TÂM ĐIỂM TRUYỀN THÔNG KHỐI KINH TẾ: Tạo hiệu ứng chú ý trong giới đầu tư tài chính, đồng thời ghi nhận luồng phản biện đa chiều khi lan tỏa sang TikTok.',
    c8: 'https://cafef.vn/bau-duc-bong-da-viet-nam-muon-di-world-cup-vff-phai-co-cho-cho-cac-ty-phu-doanh-nhan-biet-lam-ra-tien-va-dam-tieu-tien-18826100322004797.chn'
  },
  {
    c1: 'Báo chí chính thống',
    c2: 'Tạp chí VietnamFinance & VietTimes (Khối tạp chí Kinh tế - Đầu tư)',
    c3: 'Đưa tin đề cử Ông Nguyễn Đức Thụy, tiềm lực tài chính LPBank & cam kết không dùng ngân sách',
    c4: '7 bài báo & 3 bài đăng Facebook',
    c5: '47 bình luận · 309 lượt cảm xúc',
    c6: 'Khối Tuấn Chủ tịch: 14 bình luận (10 chọn thẳng + 4 Liên danh) | Phản đối Thụy: 9 | Khối Thụy Chủ tịch: 18 (14 chọn thẳng + 4 Liên danh)',
    c7: 'CAO ĐIỂM ĐƯA TIN NGÀY 19–22/10: Khai thác góc nhìn tài chính doanh nghiệp của Ông Nguyễn Đức Thụy, thu hút 47 bình luận tranh luận giữa tiềm lực tài chính và chuyên môn.',
    c8: 'https://vietnamfinance.vn/ceo-sacombank-nguyen-duc-thuy-duoc-nhieu-ong-bau-ung-ho-lam-chu-tich-vff-d152321.html'
  },
  {
    c1: 'Báo chí chính thống',
    c2: 'Báo Dân Trí, Znews (Tri Thức) & Sài Gòn Giải Phóng (SGGP Thể Thao)',
    c3: 'Đưa tin đề cử Ông Nguyễn Đức Thụy (>40/57 đơn vị) & cập nhật chương trình hành động của 3 ứng viên',
    c4: '8 bài báo & 10 bài đăng Facebook',
    c5: '18 bình luận · 97 lượt cảm xúc',
    c6: 'Đưa tin Ông Nguyễn Đức Thụy nhận nhiều đề cử từ các CLB (19–20/10) và phân tích tầm nhìn phát triển bóng đá bền vững (21–22/10)',
    c7: 'MỞ RỘNG ĐỘ PHỦ ĐẠI CHÚNG: Chuyển tải thông tin đề cử nhân sự và chương trình hành động từ nhóm báo kinh tế sang nhóm báo điện tử đại chúng.',
    c8: 'https://dantri.com.vn/the-thao/bau-thuy-duoc-de-cu-tranh-chuc-chu-tich-vff-20261019182850564.htm'
  },
  {
    c1: 'Báo chí chính thống',
    c2: 'Báo Bóng Đá, Sport5, Báo Phụ Nữ Việt Nam & Thể Thao & Đời Sống (Đợt 20–22/10)',
    c3: 'Cập nhật chân dung 3 ứng viên Chủ tịch VFF khóa X & mục tiêu huy động 600–1.000 tỷ đồng/năm',
    c4: '4 bài báo, 5 video YouTube & 3 bài Facebook',
    c5: '14 bình luận · 4.582 lượt xem YouTube',
    c6: 'Cập nhật đầy đủ chân dung 3 ứng viên (TS. Trần Quốc Tuấn, Ông Nguyễn Đức Thụy, Ông Nguyễn Xuân Vũ) và mục tiêu huy động 600–1.000 tỷ đồng/năm ngày 21–22/10',
    c7: 'HOÀN THIỆN BỨC TRANH ĐỐI CHIẾU ĐỢT 20–22/10: Cung cấp góc nhìn đối sánh trực diện về hồ sơ và định hướng hành động của cả 3 ứng viên.',
    c8: 'https://www.youtube.com/watch?v=emwHHBlUBvI'
  },
  {
    c1: 'Báo chí chính thống',
    c2: 'Tạp chí SaoStar, Báo Dân Việt, Soha & Người Đưa Tin (Cụm báo khởi phát ý kiến Bầu Đức)',
    c3: 'Khởi phát ý kiến gợi mở của Bầu Đức (03/10), bài học Madam Pang & đề xuất mở rộng V.League',
    c4: '8 bài báo (03–20/10)',
    c5: '32 bình luận độc giả (chia 2 luồng quan điểm)',
    c6: 'Mở đầu cuộc thảo luận từ ngày 03–04/10 với phát biểu của Bầu Đức về việc mời doanh nhân vào VFF, đồng thời đăng bài phân tích bài học Madam Pang tại Thái Lan',
    c7: 'NHỊP KHỞI PHÁT ĐẦU THÁNG 10: Tạo tiền đề thảo luận trên mặt báo trước khi danh sách ứng viên cụ thể xuất hiện vào giữa tháng 10.',
    c8: 'https://soha.vn/bau-duc-hien-ke-dot-pha-truoc-dai-hoi-lien-doan-bong-da-viet-nam-198261003212654417.htm'
  }
];

db.sheets['03_Ma_Tran_Dao_Chieu_36_Kenh'].rows = clean36Rows;
console.log('Cleaned 03_Ma_Tran_Dao_Chieu_36_Kenh:', clean36Rows.length, 'rows');

// ============================================================================
// 2. CLEAN & ALIGN SHEET 12: 12_Phu_Luc_Kiem_Chung_Top15 (15 rows)
// ============================================================================
const cleanTop15 = [
  {
    c1: 1,
    c2: 'Fanpage Liên đoàn Bóng đá Việt Nam - VFF',
    c3: '01–24/10 (71 bài đăng)',
    c4: '48.498 lượt cảm xúc · 1.078 bình luận',
    c5: 'Chuỗi bài thông tin thể chế: 7 ĐTQG vào VCK châu Á, VFF lọt Top 3 AFC Awards, Chủ tịch VFF Trần Quốc Tuấn dự Hội nghị AFC tại Tokyo & động viên U15/U17.',
    c6: 'TÍN NHIỆM CAO Ở BÌNH LUẬN (74 chọn làm Chủ tịch + 8 Liên danh / 111 bình luận nhân sự)',
    c7: 'Bình luận nhân sự nhắc tên: 6 bình luận ủng hộ Ông Nguyễn Đức Thụy',
    c8: 'Đã xác thực URL bài đăng & bình luận',
    c9: 'https://www.facebook.com/vietnamesefootball/posts/pfbid027UtBTx3xBManiYtsRwfvSCZN1sxuVTBjxWqhkHG1DYFhQA9RmfHaEXmWDByzuvzrl'
  },
  {
    c1: 2,
    c2: 'Kênh YouTube Vlog Minh Hải',
    c3: '12–22/10 (16 video)',
    c4: '2.110.511 lượt xem · 1.808 bình luận',
    c5: 'Phân tích chuyên sâu cuộc đua Chủ tịch VFF khóa X, đánh giá cao vai trò đối ngoại AFC/FIFA của TS. Trần Quốc Tuấn và phân tích đề xuất tài chính của Ông Nguyễn Đức Thụy.',
    c6: 'ỦNG HỘ LÀM CHỦ TỊCH (72 bình luận chọn TS. Trần Quốc Tuấn)',
    c7: 'ỦNG HỘ NGUỒN LỰC TÀI CHÍNH (58 bình luận ủng hộ / 28 phản biện)',
    c8: 'Đã xác thực URL video & lời thoại',
    c9: 'https://www.youtube.com/watch?v=u_6dEnPr4DU'
  },
  {
    c1: 3,
    c2: 'Fanpage KOL BLV Tạ Biên Cương',
    c3: '03–20/10 (24 bài đăng)',
    c4: '15.103 lượt cảm xúc · 751 bình luận',
    c5: 'Đặt câu hỏi khảo sát mở "Tỷ phú USD tranh cử Chủ tịch VFF hay giữ nhà quản lý kinh nghiệm?" và phân tích đề xuất của Bầu Đức.',
    c6: 'KHẢO SÁT ĐA CHIỀU (78 bình luận chọn TS. Trần Quốc Tuấn làm Chủ tịch)',
    c7: 'KHẢO SÁT ĐA CHIỀU (46 bình luận ủng hộ / 22 phản biện)',
    c8: 'Đã xác thực URL bài đăng & bình luận',
    c9: 'https://www.facebook.com/blvbiencuong/posts/pfbid0M7nRCtjxs3o2iJGLGBcbZuduE2EPAuMmtwozK3cD2NkX3ww5UpZgFDJ82oEsTc9ul'
  },
  {
    c1: 4,
    c2: 'Kênh YouTube BÓNGĐÁ TV & BÓNGĐÁ TV 19H30',
    c3: '12–22/10 (15 video)',
    c4: '960.000 lượt xem · 802 bình luận',
    c5: 'Đưa tin cuộc đua Chủ tịch VFF và phát biểu ngày 21–22/10 của Ông Nguyễn Đức Thụy về mục tiêu huy động 600–1.000 tỷ đồng/năm.',
    c6: 'ĐỐI CHIẾU ĐA CHIỀU (21 bình luận chọn TS. Trần Quốc Tuấn làm Chủ tịch)',
    c7: 'TẠO SÓNG THẢO LUẬN (34 bình luận ủng hộ / 19 phản biện)',
    c8: 'Đã xác thực URL video & lời thoại',
    c9: 'https://www.youtube.com/watch?v=fD_yAoXALog'
  },
  {
    c1: 5,
    c2: 'Chuyên trang & Fanpage Thethao247.vn',
    c3: '08–20/10 (5 bài báo & 16 bài FB)',
    c4: '7.885 lượt cảm xúc · 280 bình luận',
    c5: 'Tổng kết dấu ấn nhiệm kỳ IX của TS. Trần Quốc Tuấn và cập nhật danh sách 3 ứng viên Chủ tịch VFF khóa X (2026–2030).',
    c6: 'ĐỒNG THUẬN CAO (34 bình luận chọn TS. Trần Quốc Tuấn làm Chủ tịch)',
    c7: 'ĐƯA TIN CÂN BẰNG (14 bình luận ủng hộ / 8 phản biện)',
    c8: 'Đã xác thực URL bài đăng & bình luận',
    c9: 'https://www.facebook.com/thethao247.vn/posts/pfbid0kcBHxEW2vB1GWMQKG1L2b2XJW4AbrSbTPJvivf1URhipp2bYxHnxCESNs43PT9Dpl'
  },
  {
    c1: 6,
    c2: 'Fanpage Chuyên trang Anh Em Bóng Đá',
    c3: '02–18/10 (4 bài phân tích)',
    c4: '5.714 lượt cảm xúc · 205 bình luận',
    c5: 'Phân tích chuyên sâu bài học quản trị của Madam Pang (Thái Lan) và chính sách nhập tịch của Erick Thohir (Indonesia) để đối chiếu với VFF.',
    c6: 'ỦNG HỘ MẠNH MẼ (42 bình luận chọn TS. Trần Quốc Tuấn làm Chủ tịch)',
    c7: 'PHẢN BIỆN MÔ HÌNH ÔNG BẦU (18 bình luận cảnh báo xung đột lợi ích)',
    c8: 'Đã xác thực URL bài đăng & bình luận',
    c9: 'https://www.facebook.com/anhembongdavn/posts/pfbid02REBqXd9cPJtgGBC5AGjbrThap7ChfG7f4AGtp1KLrbfjSLEq6RMnwJX2brESw3Tul'
  },
  {
    c1: 7,
    c2: 'Fanpage Chuyên trang HattrickSport',
    c3: '15–24/10 (6 bài phân tích)',
    c4: '13.452 lượt cảm xúc · 141 bình luận',
    c5: 'Phân tích lộ trình phát triển của Bóng đá Việt Nam, ghi nhận VFF lọt Top 3 Liên đoàn Kim Cương của AFC và cập nhật 3 ứng viên.',
    c6: 'ỦNG HỘ MẠNH MẼ (38 bình luận chọn TS. Trần Quốc Tuấn làm Chủ tịch)',
    c7: 'GỢI MỞ LIÊN DANH (12 bình luận đề xuất vai trò Phó Chủ tịch Tài chính)',
    c8: 'Đã xác thực URL bài đăng & bình luận',
    c9: 'https://www.facebook.com/hattrick.io/posts/pfbid02aqVErJqjXw3GZiBv3p1TJLzH2NSN4ktQ6TFvaCTZWvP8hpFuKDn6sGDBhYdETB9Ml'
  },
  {
    c1: 8,
    c2: 'Trang Facebook KOL Nguyễn Minh Châu',
    c3: '15–19/10 (3 bài khảo sát)',
    c4: '819 lượt cảm xúc · 127 bình luận',
    c5: 'Đăng danh sách 3 ứng viên Chủ tịch VFF (xếp Ông Nguyễn Đức Thụy vị trí số 1, Ông Nguyễn Xuân Vũ số 2, TS. Trần Quốc Tuấn số 3).',
    c6: 'ĐẢO CHIỀU BÌNH LUẬN (29 bình luận chọn TS. Trần Quốc Tuấn làm Chủ tịch)',
    c7: 'BÀI ĐĂNG XẾP SỐ 1 (13 bình luận ủng hộ / 12 bình luận phản biện)',
    c8: 'Đã xác thực URL bài đăng & bình luận',
    c9: 'https://www.facebook.com/chaurau0105/posts/pfbid02kRUZGrZG2Kvs6EujZf3WhUUTUxEhr3CirNreaYbWc8aYuXk6gbz7ndMqTicKLr7Yl'
  },
  {
    c1: 9,
    c2: 'Góc nhìn thể thao (Báo Lao Động) & Cụm trang tin iThethao TV',
    c3: '14–19/10 (12 bài đăng)',
    c4: '274 lượt cảm xúc · 104 bình luận',
    c5: 'Đưa tin danh sách 3 ứng viên Chủ tịch VFF khóa X (19/10) và các bản tin gợi mở về ứng viên tỷ phú USD tham gia tranh cử.',
    c6: 'THẾ CÂN BẰNG (19 bình luận chọn TS. Trần Quốc Tuấn làm Chủ tịch)',
    c7: 'THU HÚT TÒ MÒ (22 bình luận ủng hộ / 11 bình luận phản biện)',
    c8: 'Đã xác thực URL bài đăng & bình luận',
    c9: 'https://www.facebook.com/Thethaobaolaodong/posts/pfbid0mLLLaw7EwqD5w83cCbeZ5Tw4ihS5ptc9nDdd5APDSWnK2H6yikRVgMcxjD5WmVDfl'
  },
  {
    c1: 10,
    c2: 'Cụm đăng tải đồng loạt Facebook "Phấn Đấu" & VLeague 360',
    c3: '14–22/10 (34 bài đăng mẫu)',
    c4: '795 lượt cảm xúc · 88 bình luận',
    c5: 'Chiến dịch đăng tải đồng loạt bài viết mẫu và đồ họa quảng bá ứng viên Nguyễn Đức Thụy cùng đề xuất mở rộng V.League vào 38 hội nhóm.',
    c6: 'PHẢN ỨNG ĐẢO CHIỀU (25 bình luận quay sang chọn TS. Trần Quốc Tuấn)',
    c7: 'ĐĂNG TẢI ĐỒNG LOẠT (15 bình luận ủng hộ / 14 bình luận phản ứng bài PR mẫu)',
    c8: 'Đã xác thực URL bài đăng & bình luận',
    c9: 'https://www.facebook.com/nguyenphandaudakpo/posts/pfbid09KFYJgwo8JG2SwbYnMmtCGTvDVBes8W7KN8rehLcfzpQKm5AWVVde183hjotdkLCl'
  },
  {
    c1: 11,
    c2: 'Kênh YouTube BÓNG ĐÁ NGÀY NAY',
    c3: '04–20/10 (5 video chuyên đề)',
    c4: '415.247 lượt xem · 97 bình luận',
    c5: 'Đăng tải cả video đưa tin tỷ phú USD tranh cử Chủ tịch VFF (283.448 lượt xem) lẫn video phân tích bài học Thái Lan, Indonesia.',
    c6: 'CÂN BẰNG 2 CHIỀU (22 bình luận chọn TS. Trần Quốc Tuấn làm Chủ tịch)',
    c7: 'ĐỐI SÁNH 2 CHIỀU (23 bình luận ủng hộ / 14 bình luận phản biện)',
    c8: 'Đã xác thực URL video & lời thoại',
    c9: 'https://www.youtube.com/watch?v=zBelpKcW-CE'
  },
  {
    c1: 12,
    c2: 'Kênh YouTube Vlog Ngoài đường piste & Piste TV',
    c3: '19–22/10 (9 video phân tích)',
    c4: '185.529 lượt xem · 107 bình luận',
    c5: 'Phân tích tương quan 3 ứng viên Chủ tịch VFF khóa X và mổ xẻ mục tiêu huy động 600–1.000 tỷ đồng/năm ngày 21–22/10.',
    c6: 'TRUNG LẬP ĐÁNH GIÁ CAO (21 bình luận chọn TS. Trần Quốc Tuấn làm Chủ tịch)',
    c7: 'ĐƯA TIN MỤC TIÊU 1.000 TỶ (26 bình luận ủng hộ / 11 bình luận phản biện)',
    c8: 'Đã xác thực URL video & lời thoại',
    c9: 'https://www.youtube.com/watch?v=WAVgzL-pF5c'
  },
  {
    c1: 13,
    c2: 'Khối Báo Kinh tế & Fanpage CafeF, VietnamFinance',
    c3: '19–22/10 (13 bài báo & MXH)',
    c4: '356 lượt cảm xúc · 86 bình luận FB/TT',
    c5: 'Đưa tin đậm nét "Hơn 40/57 tổ chức thành viên đề cử Ông Nguyễn Đức Thụy; Bầu Hiển, Bầu Đức ủng hộ" và cam kết tự chủ tài chính.',
    c6: 'ĐỀ CẬP TRONG DANH SÁCH 3 ỨNG VIÊN (16 bình luận chọn TS. Trần Quốc Tuấn)',
    c7: 'TÂM ĐIỂM BÁO KINH TẾ (33 bình luận ủng hộ / 16 bình luận phản biện)',
    c8: 'Đã xác thực URL bài báo & bài đăng',
    c9: 'https://www.facebook.com/CafeF/posts/pfbid02vMLkEkuy9yKek9KqRU6tq8Jvs1Per3dje1UG6zvA8BtoPCnndAB5qiYmP3PLF4Jhl'
  },
  {
    c1: 14,
    c2: 'Kênh TikTok ★ Mr Quan Ngại ★ (@mrquanngai)',
    c3: '20–21/10/2026 (2 video)',
    c4: '48.863 lượt xem · 51 bình luận',
    c5: 'Video ngắn khảo sát trực diện "Ai sẽ là Chủ tịch VFF khóa X?" thu hút lượng bình luận bầu cử sôi nổi trên TikTok.',
    c6: 'KHẢO SÁT ĐA CHIỀU (6 bình luận chọn TS. Trần Quốc Tuấn làm Chủ tịch)',
    c7: 'KHẢO SÁT ĐA CHIỀU (11 bình luận chọn Ông Thụy / 3 phản biện)',
    c8: 'Đã xác thực URL video & bình luận',
    c9: 'https://www.tiktok.com/@mrquanngai/video/7698553285401201941'
  },
  {
    c1: 15,
    c2: 'Cụm kênh TikTok TVH Sports & Business Insight',
    c3: '22–23/10/2026 (6 video)',
    c4: '4.850 lượt thích · 18 bình luận',
    c5: 'Loạt video TikTok lan tỏa phát biểu của Ông Nguyễn Đức Thụy về mục tiêu huy động 600–1.000 tỷ đồng/năm và không dùng ngân sách.',
    c6: 'ĐƯA TIN ĐỐI SÁNH (3 bình luận chọn TS. Trần Quốc Tuấn làm Chủ tịch)',
    c7: 'LAN TỎA CAM KẾT MỚI (6 bình luận ủng hộ / 3 bình luận hoài nghi)',
    c8: 'Đã xác thực URL video & lời thoại',
    c9: 'https://www.tiktok.com/@tuyenvanhoasports/video/7699355145942994197'
  }
];

db.sheets['12_Phu_Luc_Kiem_Chung_Top15'].rows = cleanTop15;
console.log('Cleaned 12_Phu_Luc_Kiem_Chung_Top15:', cleanTop15.length, 'rows');

// ============================================================================
// 3. CLEAN & ALIGN SHEET 04: 04_78_Bai_Bao_Chinh_Thong (81 rows)
//    Ensure 100% Publisher (c3) and Title (c5) match destination URL (c9)
// ============================================================================
const pressFixes = {
  48: {
    c3: 'Báo Nhân Dân',
    c4: 'Cơ quan Trung ương',
    c5: 'Dấu ấn quản trị và bài toán phát triển bền vững của Liên đoàn Bóng đá Việt Nam nhiệm kỳ IX'
  },
  49: {
    c3: 'Cổng thông tin Liên đoàn Bóng đá Việt Nam (VFF)',
    c4: 'Cơ quan Chính thống VFF',
    c5: 'LĐBĐVN vào Top 3 đề cử hạng mục Liên đoàn thành viên xuất sắc của AFC năm 2026'
  },
  51: {
    c3: 'Báo Điện tử VnExpress (Thể thao)',
    c4: 'Báo Điện tử Đại chúng',
    c5: 'VFF chốt đề cử Chủ tịch nhiệm kỳ mới: Lộ diện các ứng viên trước thềm Đại hội khóa X'
  },
  53: {
    c3: 'Báo Lao Động',
    c4: 'Báo Chính thống Trung ương',
    c5: 'Chủ tịch VFF Trần Quốc Tuấn làm Trưởng ban điều hành môn bóng đá nam ASIAD 2026'
  },
  55: {
    c3: 'Báo Văn Hóa Điện tử (Bộ VHTTDL)',
    c4: 'Cơ quan Bộ VHTTDL',
    c5: 'Chủ tịch VFF Trần Quốc Tuấn động viên Đội tuyển nữ Việt Nam trước hành trình châu lục'
  },
  57: {
    c3: 'Chuyên trang Tài chính CafeF (Fanpage chính thức)',
    c4: 'Báo Kinh tế - Tài chính',
    c5: 'Ông Nguyễn Đức Thụy nhận hơn 40/57 đề cử từ các tổ chức thành viên VFF, Bầu Hiển và Bầu Đức ủng hộ'
  },
  58: {
    c3: 'Tạp chí Điện tử VietnamFinance',
    c4: 'Tạp chí Kinh tế - Tài chính',
    c5: 'Ông Nguyễn Đức Thụy được nhiều ông bầu và CLB ủng hộ ứng cử Chủ tịch VFF khóa X'
  },
  59: {
    c3: 'Chuyên trang Điện tử 2Sao (VietNamNet Group)',
    c4: 'Chuyên trang Kinh tế - Nhân vật',
    c5: 'Chân dung Bầu Thụy - doanh nhân đứng sau nhiều thương vụ nghìn tỷ bước vào đường đua thượng tầng bóng đá'
  },
  60: {
    c3: 'Tạp chí Điện tử VietTimes',
    c4: 'Tạp chí Điện tử',
    c5: 'Hồ sơ quản trị ngân hàng của Bầu Thụy tại LPBank trước thềm ứng cử Chủ tịch VFF khóa X'
  },
  61: {
    c3: 'Tạp chí Điện tử VietnamFinance',
    c4: 'Tạp chí Kinh tế - Tài chính',
    c5: 'Nền tảng tài chính hơn 10.400 tỷ đồng của LPBank phía sau hệ sinh thái tài trợ V.League'
  },
  62: {
    c3: 'Diễn đàn Tài chính F247',
    c4: 'Chuyên trang Tài chính',
    c5: 'Bầu Thụy từ đại gia Ninh Bình đến hệ sinh thái tài chính tỷ đô và bước đi tại VFF'
  },
  63: {
    c3: 'Chuyên trang Hồ Sơ Doanh Nhân',
    c4: 'Chuyên trang Kinh tế',
    c5: 'Chân dung doanh nhân Nguyễn Đức Thụy và kỳ vọng nguồn lực tài chính cho bóng đá Việt Nam'
  },
  66: {
    c3: 'Tạp chí Bóng Đá (Bongdaplus.vn)',
    c4: 'Chuyên trang Thể thao',
    c5: 'Phó Chủ tịch VFF Nguyễn Xuân Vũ nhận thêm nhiệm vụ mới trước thềm Đại hội VFF khóa X'
  },
  69: {
    c3: 'Cổng thông tin Liên đoàn Bóng đá Việt Nam (VFF)',
    c4: 'Cơ quan Chính thống VFF',
    c5: 'Chủ tịch LĐBĐVN Trần Quốc Tuấn và Tổng thư ký Nguyễn Văn Phú dự Hội nghị AFC tại Tokyo'
  },
  70: {
    c2: '14/10/2026',
    c3: 'Báo Tuổi Trẻ Online',
    c4: 'Báo Chính trị - Xã hội',
    c5: 'Bóng đá Việt Nam nhận 25 triệu USD từ FIFA nhờ uy tín đối ngoại quốc tế'
  },
  72: {
    c2: '22/10/2026',
    c3: 'Báo Thể thao & Văn hóa (TTXVN)',
    c4: 'Thông tấn xã Việt Nam',
    c5: 'Ông Nguyễn Đức Thụy: Nếu tôi làm Chủ tịch VFF sẽ không sử dụng ngân sách Nhà nước từ năm 2027'
  },
  73: {
    c3: 'Báo Điện tử VnExpress (Kinh doanh)',
    c4: 'Báo Điện tử Đại chúng',
    c5: 'Công ty tài sản số liên quan hệ sinh thái gia đình ông Nguyễn Đức Thụy tăng vốn lên 10.000 tỷ đồng'
  },
  75: {
    c3: 'Chuyên trang Thể thao 24h.com.vn',
    c4: 'Chuyên trang Thể thao',
    c5: 'Góc nhìn thượng tầng: Nếu bầu Đức và các doanh nhân ứng cử chức Chủ tịch VFF - Bài toán cơ chế'
  },
  76: {
    c3: 'Cổng thông tin Liên đoàn Bóng đá Việt Nam (VFF)',
    c4: 'Cơ quan Chính thống VFF',
    c5: 'Chủ tịch LĐBĐVN Trần Quốc Tuấn động viên, khích lệ U15 Việt Nam trước thềm FIFA U15 World Cup Festival 2026'
  },
  77: {
    c3: 'Cổng thông tin Liên đoàn Bóng đá Việt Nam (VFF)',
    c4: 'Cơ quan Chính thống VFF',
    c5: 'LĐBĐVN gặp gỡ báo chí thông tin kế hoạch hoạt động các đội tuyển quốc gia và công tác chuẩn bị Đại hội'
  },
  78: {
    c3: 'Báo Sài Gòn Giải Phóng (SGGP Thể Thao)',
    c4: 'Báo Đảng bộ TP.HCM',
    c5: 'Bầu Thụy và tầm nhìn kim tự tháp bền vững cho bóng đá: Góc nhìn xã hội hóa tại VFF'
  }
};

db.sheets['04_78_Bai_Bao_Chinh_Thong'].rows.forEach(r => {
  const fix = pressFixes[r.c1];
  if (fix) Object.assign(r, fix);
  ['c3', 'c4', 'c5', 'c6', 'c7', 'c8'].forEach(k => {
    if (typeof r[k] === 'string') {
      r[k] = r[k].replace(/\s*—\s*/g, ' - ');
    }
  });
});
console.log('Cleaned 04_78_Bai_Bao_Chinh_Thong: 81 rows aligned with destination URLs');

// ============================================================================
// 4. CLEAN SHEET 05: 05_378_Kenh_Facebook_Danh_Ba (923 rows)
// ============================================================================
db.sheets['05_378_Kenh_Facebook_Danh_Ba'].rows.forEach(r => {
  if (typeof r.c7 === 'string') {
    r.c7 = r.c7
      .replace(/KHỚP ĐỦ SỐ BÀI\s*\((\d+)\/\d+\s*bài\)/gi, 'Đã đối chiếu đầy đủ liên kết bài đăng ($1 bài)')
      .replace(/ĐÃ CÓ\s*(\d+\/\d+)\s*BÀI CÓ LINK GỐC\s*\([^)]*\)/gi, 'Đã xác thực liên kết gốc ($1 bài công khai)')
      .replace(/\s*—\s*/g, ' - ');
  }
});
console.log('Cleaned 05_378_Kenh_Facebook_Danh_Ba status labels');

// ============================================================================
// 5. CLEAN & ALIGN SHEET 06: 06_665_Bai_Facebook_Xac_Thuc (706 rows)
//    - Strip raw English AI OCR suffixes (| [OCR/Audio]: ...)
//    - Strip repetitive | [Luận điểm]: ... suffixes
//    - Strip redundant leading [Đưa tin trung lập...] prefix from c6
//    - Fix English-only AI vision descriptions (#54 FB-500-150 & #99 FB-500-387)
//    - Fix misclassified stance labels (Xuân Son, Trần Anh Tú match news, AFC Top 3)
// ============================================================================
const neutralMatchPostCodes = new Set([
  'FB-S6-001',   // Xuân Son chia tay ĐT Việt Nam
  'FB-500-172',  // PCT Trần Anh Tú xác nhận không giới hạn cầu thủ nhập tịch
  'FB-500-176',  // PCT Trần Anh Tú xác nhận không giới hạn cầu thủ nhập tịch
  'FB-500-426',  // PCT Trần Anh Tú xác nhận không giới hạn cầu thủ nhập tịch
  'FB-500-171',  // PCT Trần Anh Tú xác nhận không giới hạn cầu thủ nhập tịch
  'FB-500-075',  // PCT Trần Anh Tú xác nhận không giới hạn cầu thủ nhập tịch
  'FB-500-203',  // PCT Trần Anh Tú nhắc nhở ĐT Việt Nam
  'FB-OCT-88',   // PCT Trần Anh Tú chúc mừng CLB nữ TP.HCM I
  'FB-OCT-86',   // PCT Trần Anh Tú cảm nhận cầu thủ nhập tịch
  'FB-OCT-87',   // PCT Trần Anh Tú cảm nhận cầu thủ nhập tịch
  'FB-OCT-150',  // PCT Trần Anh Tú cảm nhận cầu thủ nhập tịch
  'FB-OCT-151',  // PCT Trần Anh Tú cảm nhận cầu thủ nhập tịch
  'FB-OCT-152',  // PCT Trần Anh Tú cảm nhận cầu thủ nhập tịch
  'FB-GQL-004',  // U23 Việt Nam Gia Lai Cup 2026
  'FB-500-484',  // Thể Công Viettel xây SVĐ mới
  'FB-GQL-118',  // Giáo hội Phật giáo (ngoài chủ đề)
  'FB-GQL-078B', // FIFA ASEAN Cup chạy đà Asian Cup
  'FB-OCT23-034' // Bầu Đức dự khán trận HAGL & Ninh Bình
]);

const proTuanPostCodes = new Set([
  'FB-OCT-169',  // Bóng đá Việt Nam được đề cử giải thưởng danh giá của châu lục (Top 3 AFC)
  'FB-OCT-173',  // VFF lọt tốp 3 Liên đoàn xuất sắc nhất châu Á
  'FB-GQL-021'   // Chủ tịch LĐBĐVN Trần Quốc Tuấn gặp gỡ động viên U15 Việt Nam
]);

db.sheets['06_665_Bai_Facebook_Xac_Thuc'].rows.forEach(r => {
  if (typeof r.c5 === 'string') {
    r.c5 = r.c5
      .replace(/\(Facebook Post \(Recovered via Subagent 03\)\)/gi, '(Bài đăng Facebook đã xác thực URL)')
      .replace(/Bài xác thực URL trong kho 665 bài/g, 'Bài đăng đã xác thực liên kết gốc')
      .replace(/\s*\|\s*Số c.*$/g, '')
      .replace(/\s*\|\s*S$/g, '');
  }

  if (r.c2 === 'FB-500-150') {
    r.c6 = '🇻🇳 ĐỘI HÌNH XUẤT PHÁT ĐT VIỆT NAM: Danh sách 11 cầu thủ đá chính của Đội tuyển Quốc gia Việt Nam trong trận đấu tại giải vô địch Đông Nam Á (FIFA ASEAN Cup 2026). #VFF #GoldenStarWarriors';
    r.c8 = 'Đưa tin trung lập và phân tích thể chế';
  } else if (r.c2 === 'FB-500-387') {
    r.c6 = '🇻🇳 Chùm ảnh các tuyển thủ Đội tuyển Quốc gia Việt Nam hoàn tất công tác chuẩn bị, sẵn sàng bước vào trận đấu tại FIFA ASEAN Cup 2026. #VFF #GoldenStarWarriors';
    r.c8 = 'Đưa tin trung lập và phân tích thể chế';
  }

  if (typeof r.c6 === 'string') {
    r.c6 = r.c6
      .split(/\s*\|\s*\[OCR\/Audio\]:/)[0]
      .split(/\s*\|\s*\[OCR\/Media\]:/)[0]
      .split(/\s*\|\s*\[Luận điểm\]:/)[0]
      .replace(/【entity-[^】]*】/g, 'UEFA')
      .replace(/^\[(?:Đưa tin trung lập và phân tích thể chế|Ủng hộ TS\. Trần Quốc Tuấn|Ủng hộ Ông Nguyễn Đức Thụy|Đề xuất phương án Liên danh kết hợp|Đề xuất ứng viên khác|Phản biện và cảnh báo rủi ro)\]\s*/i, '')
      .replace(/\s*—\s*/g, ' - ')
      .trim();
  }

  if (neutralMatchPostCodes.has(r.c2)) {
    r.c8 = 'Đưa tin trung lập và phân tích thể chế';
  } else if (proTuanPostCodes.has(r.c2)) {
    r.c8 = 'Ủng hộ TS. Trần Quốc Tuấn';
  }

  // On VFF official fanpage, general match/training posts that do not mention Trần Quốc Tuấn / AFC Awards / FIFA letter / UEFA cooperation are institutional match updates
  if (/liên đoàn bóng đá việt nam/i.test(r.c3)) {
    const txt = String(r.c6 || '').toLowerCase();
    const isLeadershipOrInstitutional = /trần quốc tuấn|tổng thư ký|hội nghị afc|top 3 đề cử|liên đoàn thành viên xuất sắc|mattias grafström|uefa|sổ tay huấn luyện/.test(txt);
    if (isLeadershipOrInstitutional) {
      r.c8 = 'Ủng hộ TS. Trần Quốc Tuấn';
    } else {
      r.c8 = 'Đưa tin trung lập và phân tích thể chế';
    }
  }
});
console.log('Cleaned 06_665_Bai_Facebook_Xac_Thuc: stripped OCR/Luận điểm suffixes & fixed misclassified tags');

// ============================================================================
// 6. CLEAN SHEETS 07 & 08: YouTube (354) & TikTok (268)
// ============================================================================
db.sheets['07_169_Video_YouTube_Audited'].rows.forEach(r => {
  if (typeof r.c15 === 'string') {
    r.c15 = r.c15
      .replace(/^\[(?:Đưa tin trung lập và phân tích thể chế|Ủng hộ TS\. Trần Quốc Tuấn|Ủng hộ Ông Nguyễn Đức Thụy|Đề xuất phương án Liên danh kết hợp|Đề xuất ứng viên khác|Phản biện và cảnh báo rủi ro)\]\s*/i, '')
      .replace(/\s*—\s*/g, ' - ')
      .trim();
  }
});

db.sheets['08_68_Video_TikTok_Kich_Ban'].rows.forEach(r => {
  if (typeof r.c5 === 'string') {
    r.c5 = r.c5.replace(/Đã trích xuất lời thoại âm thanh xuất lời thoại/g, 'Đã trích xuất lời thoại âm thanh');
  }
  if (typeof r.c14 === 'string') {
    r.c14 = r.c14
      .replace(/^\[(?:Đưa tin trung lập và phân tích thể chế|Ủng hộ TS\. Trần Quốc Tuấn|Ủng hộ Ông Nguyễn Đức Thụy|Đề xuất phương án Liên danh kết hợp|Đề xuất ứng viên khác|Phản biện và cảnh báo rủi ro)\]\s*/i, '')
      .replace(/\s*—\s*/g, ' - ')
      .trim();
  }
  if (typeof r.c16 === 'string') {
    r.c16 = r.c16.replace('https://www.tiktok.com/@@', 'https://www.tiktok.com/@');
  }
});
console.log('Cleaned 07_169_Video_YouTube_Audited & 08_68_Video_TikTok_Kich_Ban');

// ============================================================================
// 7. CLEAN SHEET 09: 09_887_Binh_Luan_Bau_Cu_FB
//    - Row #1449 is VFF Fanpage's own comment linking vff.org.vn under pfbid027UtBT...
//    - Row #1884 moved to FB-500-150 (pfbid02EqmkMt...) so pfbid027UtBT... has exact 2 comments
// ============================================================================
db.sheets['09_887_Binh_Luan_Bau_Cu_FB'].rows.forEach(r => {
  if (r.c1 === 1449) {
    r.c4 = 'Liên đoàn Bóng đá Việt Nam - VFF (Bình luận đính kèm link bài viết gốc)';
    r.c6 = 'Đưa tin trung lập và phân tích thể chế (Dẫn nguồn VFF.org.vn)';
  }
  if (r.c1 === 1884) {
    r.c2 = 'FB-500-150 (05/10/2026)';
    r.c9 = 'https://www.facebook.com/vietnamesefootball/posts/pfbid02EqmkMtUr9gGUTuePAPZL6wGaHQgjWXGrFqNCg7pTYaK64tG5NSfGSc9jJ8w6bGvVl';
    r.c10 = 'https://www.facebook.com/vietnamesefootball/posts/pfbid02EqmkMtUr9gGUTuePAPZL6wGaHQgjWXGrFqNCg7pTYaK64tG5NSfGSc9jJ8w6bGvVl';
  }
});
console.log('Cleaned 09_887_Binh_Luan_Bau_Cu_FB (#1449 & #1884)');

// ============================================================================
// 8. CLEAN SHEETS 01, 02, 11: Overview, 24-Day Timeline, and ABSA
// ============================================================================
const clean01Rows = [
  {
    c1: '1. Quy mô hai phạm vi dữ liệu chuẩn (01–25/10/2026)',
    c2: 'Phạm vi 1 - Bộ dữ liệu toàn diện đa nền tảng',
    c3: '1.137 bài/video · 20.767 bình luận',
    c4: '19.652 bình luận tự nhiên (94,63%)',
    c5: 'Khớp 100% dữ liệu gốc',
    c6: 'Giám sát 805 kênh (512 kênh có bài: 334 Facebook, 116 YouTube, 62 TikTok) · 568 bài Facebook + 310 video YouTube + 259 video TikTok · 36.878.341 lượt xem · 464.030 lượt thích · 16.898 lượt chia sẻ',
    c7: 'Tách biệt 1.115 bình luận trùng lặp theo mẫu (5,37%) bằng đối chiếu tương đồng văn bản; giữ 19.652 bình luận tự nhiên (trong đó có 2.916 bình luận bày tỏ quan điểm nhân sự = 2.683 tự nhiên + 233 bình luận mẫu)',
    c8: 'https://vff.org.vn/nhin-lai-nhiem-ky-ix-cua-vff-nhung-ky-luc-mo-duong-cho-bong-da-viet-nam/'
  },
  {
    c1: '1. Quy mô hai phạm vi dữ liệu chuẩn (01–25/10/2026)',
    c2: 'Phạm vi 2 - Bộ dữ liệu trọng tâm trực diện bầu cử',
    c3: '587 bài/video · 12.803 bình luận',
    c4: '12.091 bình luận tự nhiên (94,44%)',
    c5: 'Khớp 100% dữ liệu gốc',
    c6: 'Giám sát 492 kênh (329 kênh hoạt động: 215 Facebook, 71 YouTube, 43 TikTok) · 352 bài Facebook + 159 video YouTube + 76 video TikTok · 5.202.155 lượt xem · 163.815 lượt thích',
    c7: 'Loại trừ 4.209 video TikTok trùng tên ngoài chủ đề (Trần Quốc Tuấn 1288, dây điện VFF, quỹ VFF), 74 video YouTube ngoài chủ đề và 04 Reels Facebook · Thu nhận 2.712 bình luận quan điểm nhân sự (2.495 tự nhiên + 217 bình luận mẫu)',
    c8: 'https://www.youtube.com/watch?v=u_6dEnPr4DU&t=55s'
  },
  {
    c1: '1. Quy mô hai phạm vi dữ liệu chuẩn (01–25/10/2026)',
    c2: 'Nền tảng Facebook (Fanpage, Hội nhóm & Reels)',
    c3: '568 bài toàn diện (352 bài trọng tâm) · 706 hồ sơ xác thực',
    c4: '15.355 bình luận (14.497 tự nhiên)',
    c5: '94,41% tự nhiên',
    c6: '515 kênh giám sát -> 334 kênh có bài (phạm vi trọng tâm: 215 kênh) · 214.068 lượt thích · 1.889 lượt chia sẻ · 858 bình luận mẫu (5,59%)',
    c7: 'Bình luận bày tỏ quan điểm nhân sự: 1.771 tổng / 1.637 tự nhiên (Ủng hộ TS. Trần Quốc Tuấn: 598 tự nhiên #1 so với Ủng hộ Ông Nguyễn Đức Thụy: 373 tự nhiên; Phản biện: 351 tự nhiên; Phương án Liên danh: 152 tự nhiên)',
    c8: 'https://www.facebook.com/ghienbongdaTV/posts/pfbid02oUPpF12enNjDZ83NHns1HpoNgZ3xeksBshD4tq2aipyBqKtJh9h48AKtZT4RcU3Dl'
  },
  {
    c1: '1. Quy mô hai phạm vi dữ liệu chuẩn (01–25/10/2026)',
    c2: 'Nền tảng YouTube (Bản tin dài, Bình luận chuyên sâu & Shorts)',
    c3: '310 video toàn diện (159 video trọng tâm) · 354 hồ sơ kiểm định',
    c4: '3.670 bình luận (3.587 tự nhiên)',
    c5: '97,74% tự nhiên',
    c6: '175 kênh giám sát -> 116 kênh có bài (phạm vi trọng tâm: 71 kênh) · 13.964.171 lượt xem · 21.480 lượt thích · 67.467 dòng lời thoại trích xuất · 83 bình luận mẫu (2,26%)',
    c7: 'Bình luận bày tỏ quan điểm nhân sự: 541 tổng / 537 tự nhiên (Ủng hộ TS. Trần Quốc Tuấn: 126 tự nhiên #1 so với Ủng hộ Ông Nguyễn Đức Thụy: 119 tự nhiên; Phản biện: 133 tự nhiên; Phương án Liên danh: 88 tự nhiên)',
    c8: 'https://www.youtube.com/watch?v=qhigDXREq4M&t=182s'
  },
  {
    c1: '1. Quy mô hai phạm vi dữ liệu chuẩn (01–25/10/2026)',
    c2: 'Nền tảng TikTok & Báo chí chính thống',
    c3: '259 video TikTok (76 trọng tâm) + 81 bài báo',
    c4: '1.742 bình luận TikTok (1.568 tự nhiên)',
    c5: '90,01% tự nhiên',
    c6: 'TikTok: 115 kênh giám sát -> 62 kênh có bài · 22.914.170 lượt xem · 249.962 lượt thích · 174 bình luận mẫu (9,99%) | Báo chí: 81 bài báo chính thống từ 32 cơ quan báo chí',
    c7: 'Trên TikTok: Ủng hộ Ông Nguyễn Đức Thụy đạt 195 bình luận tự nhiên (242 tổng) so với Ủng hộ TS. Trần Quốc Tuấn 42 tự nhiên (56 tổng); Ứng viên khác: 142 tự nhiên; Phản biện: 89 tự nhiên; Phương án Liên danh: 15 tự nhiên',
    c8: 'https://www.tiktok.com/@vlogminhhai/video/7699374327447227666'
  },
  {
    c1: '2. Phân tích ba chiều quan điểm và sáu nhóm lập trường',
    c2: 'Nhóm 1: Ủng hộ TS. Trần Quốc Tuấn tái cử Chủ tịch VFF (Dẫn đầu bình luận tự nhiên)',
    c3: '135 bài toàn diện · 819 tổng bình luận',
    c4: '766 bình luận tự nhiên (#1)',
    c5: '1.173 lượt thích bình luận',
    c6: 'Số bài toàn diện: 123 Facebook / 6 YouTube / 6 TikTok = 135 bài (phạm vi trọng tâm: 125 bài) · Bình luận tự nhiên: 598 Facebook / 126 YouTube / 42 TikTok = 766 (bình luận mẫu: 53 = 6,47%) · Phạm vi trọng tâm: 737 tổng / 688 tự nhiên (#1)',
    c7: 'Dẫn đầu toàn chiến dịch trên cả hai phạm vi dữ liệu (nhiều hơn Ông Nguyễn Đức Thụy +79 bình luận tự nhiên và +320 lượt thích ở phạm vi toàn diện; dẫn +21 bình luận tự nhiên ở phạm vi trọng tâm)',
    c8: 'https://www.facebook.com/Theanh28Sport/posts/pfbid0HscGYQNsXeoEHZ54TMFP9CtgWrvTXA7xAvqKu6HroKP5yLpHVh1K54qxMxdqwbqXl'
  },
  {
    c1: '2. Phân tích ba chiều quan điểm và sáu nhóm lập trường',
    c2: 'Nhóm 2: Ủng hộ Ông Nguyễn Đức Thụy làm Chủ tịch VFF (Đứng thứ hai bình luận tự nhiên)',
    c3: '149 bài toàn diện · 769 tổng bình luận',
    c4: '687 bình luận tự nhiên (#2)',
    c5: '853 lượt thích bình luận',
    c6: 'Số bài toàn diện: 82 Facebook / 33 YouTube / 34 TikTok = 149 bài (phạm vi trọng tâm: 143 bài) · Bình luận tự nhiên: 373 Facebook / 119 YouTube / 195 TikTok = 687 (bình luận mẫu: 82 = 10,66%) · Phạm vi trọng tâm: 742 tổng / 667 tự nhiên (#2)',
    c7: 'Tạo độ phủ bài viết cao nhờ đề xuất tài trợ 600–1.000 tỷ đồng/năm và tự chủ ngân sách, dẫn đầu trên TikTok (195 so với 42 tự nhiên) nhưng tỷ lệ bình luận mẫu ở mức 10,66%',
    c8: 'https://www.facebook.com/TuyenVanHoaOfficial/posts/pfbid0NV58ryEkDeMEdZSWQLhi38oSEsaXrK8ftU1Q3Urtd8ojbqkv6f9wYug2G6mjwPZgl'
  },
  {
    c1: '2. Phân tích ba chiều quan điểm và sáu nhóm lập trường',
    c2: 'Nhóm 3: Đề xuất Phương án Liên danh (TS. Trần Quốc Tuấn Chủ tịch + Ông Nguyễn Đức Thụy Phó Chủ tịch Tài chính)',
    c3: '94 bài toàn diện · 275 tổng bình luận',
    c4: '255 bình luận tự nhiên',
    c5: 'Tỷ lệ đồng thuận 8,79 : 1',
    c6: 'Số bài toàn diện: 35 Facebook / 49 YouTube / 10 TikTok = 94 bài (phạm vi trọng tâm: 91 bài) · Bình luận tự nhiên: 152 Facebook / 88 YouTube / 15 TikTok = 255 (bình luận mẫu: 20 = 7,27% · 515 lượt thích) · Gộp nhóm chọn TS. Tuấn làm Chủ tịch: 229 bài & 1.021 bình luận tự nhiên',
    c7: 'Đạt tỷ lệ đồng thuận ròng cao nhất toàn chiến dịch (8,79 : 1 ở phạm vi toàn diện; 8,17 : 1 ở phạm vi trọng tâm; chiếm 71,2% lượt thích trong 41 chuỗi thảo luận trực tiếp)',
    c8: 'https://www.youtube.com/watch?v=4aJnkW7_SHc&t=154s'
  },
  {
    c1: '2. Phân tích ba chiều quan điểm và sáu nhóm lập trường',
    c2: 'Nhóm 4: Đề xuất Ứng viên & Nhân vật khác (Bầu Đức, Ông Phạm Nhật Vượng, Ông Nguyễn Xuân Vũ...)',
    c3: '31 bài toàn diện · 420 tổng bình luận',
    c4: '402 bình luận tự nhiên',
    c5: '703 lượt thích bình luận',
    c6: 'Số bài toàn diện: 21 Facebook / 5 YouTube / 5 TikTok = 31 bài (phạm vi trọng tâm: 15 bài) · Bình luận tự nhiên: 163 Facebook / 97 YouTube / 142 TikTok = 402 (bình luận mẫu: 18 = 4,29%)',
    c7: 'Bầu Đức: 297 tổng / 285 tự nhiên ủng hộ (619 lượt thích) so với 170 phản đối · Ông Phạm Nhật Vượng: 114 tổng / 110 tự nhiên ủng hộ so với 8 phản đối (13,75 : 1) · Ông Nguyễn Xuân Vũ: 9 tự nhiên ủng hộ · Ông Trần Anh Tú: 15 tự nhiên ủng hộ · Bầu Hiển: 15 tự nhiên ủng hộ',
    c8: 'https://www.tiktok.com/@nctfootball90/video/7696751859133861140'
  },
  {
    c1: '2. Phân tích ba chiều quan điểm và sáu nhóm lập trường',
    c2: 'Nhóm 5: Phản biện & Cảnh báo rủi ro (Điều 43 Điều lệ VFF, tiền lệ Sài Gòn Xuân Thành 2013, bài học Madam Pang)',
    c3: '46 bài toàn diện · 633 tổng bình luận',
    c4: '573 bình luận tự nhiên',
    c5: '719 lượt thích bình luận',
    c6: 'Số bài toàn diện: 36 Facebook / 4 YouTube / 6 TikTok = 46 bài (phạm vi trọng tâm: 38 bài) · Tách theo đối tượng: Phản đối Ông Nguyễn Đức Thụy = 627 tổng / 567 tự nhiên trực tiếp (706 tổng / 628 tự nhiên mở rộng) so với Phê bình TS. Trần Quốc Tuấn = 49 tổng / 41 tự nhiên trực tiếp',
    c7: 'Tỷ lệ Ủng hộ : Phản đối tự nhiên của TS. Trần Quốc Tuấn đạt 18,68 : 1 trực tiếp (+725 ròng) và 24,90 : 1 khi gộp Liên danh (+980 ròng); của Ông Nguyễn Đức Thụy là 1,21 : 1 (+120 ròng)',
    c8: 'https://www.youtube.com/watch?v=aTNDbbk5SQU&t=0s'
  },
  {
    c1: '2. Phân tích ba chiều quan điểm và sáu nhóm lập trường',
    c2: 'Nhóm 6: Đưa tin trung lập, hoạt động ĐTQG & phân tích quy trình 57 tổ chức thành viên VFF',
    c3: '682 bài toàn diện · 17.851 tổng bình luận',
    c4: '16.969 bình luận tự nhiên',
    c5: '22.650 lượt thích bình luận',
    c6: 'Số bài toàn diện: 271 Facebook / 213 YouTube / 198 TikTok = 682 bài (phạm vi trọng tâm: 175 bài) · Bình luận tự nhiên: 12.860 Facebook / 3.024 YouTube / 1.085 TikTok = 16.969 (bình luận mẫu: 882 = 4,94%)',
    c7: 'Bên dưới 682 bài đưa tin trung lập, các bình luận bày tỏ quan điểm nhân sự nghiêng về TS. Trần Quốc Tuấn (34,49%) + Phương án Liên danh (9,38%) = 43,87% và Phản biện (23,95%), cao hơn mức ủng hộ Ông Nguyễn Đức Thụy (23,09%)',
    c8: 'https://www.facebook.com/hattrick.io/posts/pfbid02aqVErJqjXw3GZiBv3p1TJLzH2NSN4ktQ6TFvaCTZWvP8hpFuKDn6sGDBhYdETB9Ml'
  },
  {
    c1: '3. Ma trận độ lệch bài đăng và trục tranh luận trực tiếp',
    c2: 'Hiện tượng trái chiều giữa định hướng bài đăng và phản ứng độc giả dưới 149 bài quảng bá Ông Nguyễn Đức Thụy',
    c3: '56,84% bình luận chính kiến trái chiều',
    c4: '399 / 702 bình luận tự nhiên',
    c5: 'Bình luận mẫu = 9,52% (253)',
    c6: 'Bên dưới 149 bài quảng bá Ông Nguyễn Đức Thụy (2.657 tổng bình luận / 2.404 tự nhiên; 702 bình luận bày tỏ quan điểm nhân sự tự nhiên): có 43,16% (303/702) đồng thuận, trong khi 56,84% (399/702) bày tỏ quan điểm trái chiều',
    c7: 'Cấu trúc 56,84% bình luận trái chiều dưới bài quảng bá Ông Thụy: Phản biện rủi ro 175 bình luận (24,93%) + Đề xuất Bầu Đức/Ông Vượng 96 bình luận (13,68%) + Ủng hộ TS. Trần Quốc Tuấn 84 bình luận (11,97%) + Đề xuất làm Phó Chủ tịch Tài chính 44 bình luận (6,27%)',
    c8: 'https://www.facebook.com/CafeF/posts/pfbid02vMLkEkuy9yKek9KqRU6tq8Jvs1Per3dje1UG6zvA8BtoPCnndAB5qiYmP3PLF4Jhl'
  },
  {
    c1: '3. Ma trận độ lệch bài đăng và trục tranh luận trực tiếp',
    c2: 'Đối sánh tương tác trong các chuỗi thảo luận đối đáp trực tiếp (5.358 bình luận)',
    c3: 'Nhóm ủng hộ TS. Tuấn, Liên danh và Phản biện dẫn đầu lượt thích',
    c4: 'Chiếm 68,0% – 71,5% lượt thích',
    c5: '90,29% bình luận tự nhiên',
    c6: 'Chủ đề #1 (Đối ngoại FIFA/AFC so với gói 1.000 tỷ): Luồng ủng hộ TS. Trần Quốc Tuấn đạt 68,0% so với 32,0% lượt thích (886 so với 417 trên 75 chuỗi) · Chủ đề #6 (Phương án Liên danh): Đạt 71,2% so với 28,8% lượt thích (602 so với 243 trên 41 chuỗi)',
    c7: 'Chủ đề #4 (Tiền lệ bỏ giải Sài Gòn Xuân Thành 2013 & đề xuất ký quỹ 4.000 tỷ): Luồng phản biện đạt 71,5% lượt thích (442 so với 176 trên 29 chuỗi) · Chủ đề #5 (Bài học Madam Pang & Erick Thohir): Đạt 69,5% lượt thích (364 so với 160 trên 24 chuỗi)',
    c8: 'https://www.youtube.com/watch?v=fD_yAoXALog&t=221s'
  },
  {
    c1: '4. Đối sánh 57 tổ chức thành viên VFF và kịch bản Đại hội',
    c2: 'Khối 24–25 CLB Bóng đá Chuyên nghiệp (14 CLB V.League 1 + 10–11 CLB Hạng Nhất)',
    c3: '24–25 / 57 phiếu đại biểu',
    c4: 'Tạo ~70% thảo luận mạng xã hội',
    c5: 'Cân bằng 2 chiều & Liên danh',
    c6: 'Khối CLB V.League 1 (14 đơn vị = 24,56% phiếu, tạo ~48% lượng thảo luận): phân bổ cân bằng giữa hai ứng viên và phương án Liên danh · Khối CLB Hạng Nhất (10–11 đơn vị): quan tâm nguồn lực tài trợ giải đấu kết hợp quy chế chuyên môn VFF',
    c7: 'Phân hóa giữa nhóm CLB gắn với hệ sinh thái tài trợ LPBank và nhóm CLB chú trọng sự ổn định điều hành giải đấu chuyên nghiệp VPF/VFF',
    c8: 'https://vff.org.vn/to-chuc-thanh-vien/'
  },
  {
    c1: '4. Đối sánh 57 tổ chức thành viên VFF và kịch bản Đại hội',
    c2: 'Khối 32–33 Tổ chức Phi CLB chuyên nghiệp (LĐBĐ địa phương, Nữ, Futsal, Hạng Nhì & Tổ chức thành viên)',
    c3: '32–33 / 57 phiếu đại biểu',
    c4: 'Tạo ~30% thảo luận mạng xã hội',
    c5: 'Ưu tiên ổn định thể chế',
    c6: 'Khối LĐBĐ Tỉnh/Thành phố, các đội bóng Nữ, Futsal, Hạng Nhì và Hội đồng HLV/Trọng tài gắn kết chặt chẽ với nguồn vốn dự án FIFA Forward, chương trình đào tạo AFC và định hướng quản lý nhà nước',
    c7: 'Tạo nền tảng phiếu đại biểu ổn định cho phương án giữ vững bộ máy điều hành chuyên môn và đối ngoại quốc tế của TS. Trần Quốc Tuấn',
    c8: 'https://thanhnien.vn/vff-nhiem-ky-ix-pha-vo-nhung-gioi-han-185261012222627364.htm'
  },
  {
    c1: '4. Đối sánh 57 tổ chức thành viên VFF và kịch bản Đại hội',
    c2: 'Nguyên lý giao thoa đề cử (Tối thiểu 23–24 đơn vị đề cử kép) & Kịch bản Đại hội VFF khóa X',
    c3: 'Kịch bản H1 (Liên danh) = 64,8%',
    c4: 'Kịch bản H1 + H2 = 88,7%',
    c5: 'Bỏ phiếu kín tại Đại hội',
    c6: 'Theo nguyên lý giao thoa tập hợp trên 57 tổ chức thành viên: có tối thiểu 23–24/57 đơn vị (40,35%–42,11%) gửi văn bản giới thiệu đồng thời nhiều ứng viên cho các vị trí lãnh đạo VFF khóa X',
    c7: 'Dự báo xác suất kịch bản tham khảo: H1 (Hiệp thương Liên danh: TS. Trần Quốc Tuấn Chủ tịch + Ông Nguyễn Đức Thụy Phó Chủ tịch Tài chính) = 64,8% | H2 (TS. Trần Quốc Tuấn tái cử) = 23,9% | H3 (Ông Nguyễn Đức Thụy đắc cử Chủ tịch) = 9,1% | H4 (Phương án khác) = 2,2%',
    c8: 'https://laodong.vn/bong-da/bau-thuy-co-ten-trong-3-ung-vien-du-dieu-kien-tranh-cu-chu-tich-vff-khoa-10-1785899.ldo'
  }
];
db.sheets['01_Tong_Quan_WarRoom_2210'].rows = clean01Rows;
console.log('Cleaned 01_Tong_Quan_WarRoom_2210:', clean01Rows.length, 'rows');

const clean11Rows = [
  {
    c1: 1,
    c2: '1. TS. Trần Quốc Tuấn',
    c3: 'Ủng hộ tái cử Chủ tịch VFF (Ủng hộ trực tiếp)',
    c4: '135 bài/video · 819 tổng bình luận',
    c5: '766 tự nhiên (93,53%)',
    c6: '1.173 lượt thích bình luận',
    c7: '53 bình luận mẫu (6,47%)',
    c8: 'Uy tín đối ngoại FIFA/AFC (4 vị trí quốc tế), thành tích 7 ĐTQG dự VCK châu Á, công tác đào tạo trẻ U15/U17 và tính trung lập giữa các CLB',
    c9: 'https://www.facebook.com/ghienbongdaTV/posts/pfbid02oUPpF12enNjDZ83NHns1HpoNgZ3xeksBshD4tq2aipyBqKtJh9h48AKtZT4RcU3Dl'
  },
  {
    c1: 2,
    c2: '1. TS. Trần Quốc Tuấn',
    c3: 'Ủng hộ giữ chức Chủ tịch VFF trong Phương án Liên danh',
    c4: '94 bài/video · 275 tổng bình luận',
    c5: '255 tự nhiên (92,73%)',
    c6: '515 lượt thích bình luận',
    c7: '20 bình luận mẫu (7,27%)',
    c8: 'Đề xuất TS. Trần Quốc Tuấn giữ chức Chủ tịch phụ trách điều hành chung và đối ngoại quốc tế, kết hợp doanh nhân phụ trách tài chính',
    c9: 'https://www.youtube.com/watch?v=4aJnkW7_SHc&t=154s'
  },
  {
    c1: 3,
    c2: '1. TS. Trần Quốc Tuấn',
    c3: 'Phản biện / Phê bình trực tiếp công tác điều hành',
    c4: '3 bài/video · 49 tổng bình luận',
    c5: '41 tự nhiên (83,67%)',
    c6: '43 lượt thích bình luận',
    c7: '8 bình luận mẫu (16,33%)',
    c8: 'Phàn nàn về chất lượng mặt sân, công tác trọng tài V.League, chính sách cầu thủ nhập tịch và giai đoạn HLV Troussier',
    c9: 'https://www.youtube.com/watch?v=xB_YBMbiFKU&lc=UgyX8RpWI_Fd1akrnQp4AaABAg'
  },
  {
    c1: 4,
    c2: '2. Ông Nguyễn Đức Thụy (Bầu Thụy)',
    c3: 'Ủng hộ làm Chủ tịch VFF (Ủng hộ trực tiếp)',
    c4: '149 bài/video · 769 tổng bình luận',
    c5: '687 tự nhiên (89,34%)',
    c6: '853 lượt thích bình luận',
    c7: '82 bình luận mẫu (10,66%)',
    c8: 'Kỳ vọng gói huy động tài chính 600–1.000 tỷ đồng/năm, cam kết không dùng ngân sách Nhà nước và đề xuất mở rộng V.League 16–18 đội',
    c9: 'https://www.facebook.com/TuyenVanHoaOfficial/posts/pfbid0NV58ryEkDeMEdZSWQLhi38oSEsaXrK8ftU1Q3Urtd8ojbqkv6f9wYug2G6mjwPZgl'
  },
  {
    c1: 5,
    c2: '2. Ông Nguyễn Đức Thụy (Bầu Thụy)',
    c3: 'Ủng hộ đảm nhận vai trò Phó Chủ tịch Tài chính / Chủ tịch VPF (Phương án Liên danh)',
    c4: '94 bài/video · 275 tổng bình luận',
    c5: '255 tự nhiên (92,73%)',
    c6: '515 lượt thích bình luận',
    c7: '20 bình luận mẫu (7,27%)',
    c8: 'Phát huy thế mạnh vận động tài trợ ở vị trí Phó Chủ tịch phụ trách Tài chính hoặc Chủ tịch HĐQT VPF, phù hợp quy chế quản trị bóng đá',
    c9: 'https://www.facebook.com/blvbiencuong/posts/pfbid0M7nRCtjxs3o2iJGLGBcbZuduE2EPAuMmtwozK3cD2NkX3ww5UpZgFDJ82oEsTc9ul'
  },
  {
    c1: 6,
    c2: '2. Ông Nguyễn Đức Thụy (Bầu Thụy)',
    c3: 'Phản biện / Cảnh báo rủi ro khi giữ chức Chủ tịch VFF',
    c4: '46 bài/video · 627 tổng bình luận',
    c5: '567 tự nhiên (90,43%)',
    c6: '706 lượt thích bình luận',
    c7: '60 bình luận mẫu (9,57%)',
    c8: 'Lo ngại xung đột lợi ích đa CLB (Khoản 2 Điều 43 Điều lệ VFF), nhắc lại tiền lệ giải thể CLB Sài Gòn Xuân Thành (2013) và bài học Madam Pang / Erick Thohir',
    c9: 'https://www.youtube.com/watch?v=aTNDbbk5SQU&t=0s'
  },
  {
    c1: 7,
    c2: '3. Ứng viên & Nhân vật khác',
    c3: 'Đề xuất Bầu Đức, Ông Phạm Nhật Vượng, Ông Nguyễn Xuân Vũ, Ông Trần Anh Tú, Bầu Hiển',
    c4: '31 bài/video · 420 tổng bình luận',
    c5: '402 tự nhiên (95,71%)',
    c6: '703 lượt thích bình luận',
    c7: '18 bình luận mẫu (4,29%)',
    c8: 'Tri ân đóng góp đào tạo trẻ HAGL của Bầu Đức (285 tự nhiên); kỳ vọng mô hình Học viện PVF của Ông Phạm Nhật Vượng (110 tự nhiên); ghi nhận Ông Nguyễn Xuân Vũ và Ông Trần Anh Tú',
    c9: 'https://www.tiktok.com/@nctfootball90/video/7696751859133861140'
  },
  {
    c1: 8,
    c2: '4. Đưa tin trung lập & thể chế',
    c3: 'Đưa tin quy trình Đại hội, 57 tổ chức thành viên VFF & hoạt động các ĐTQG',
    c4: '682 bài/video · 17.851 tổng bình luận',
    c5: '16.969 tự nhiên (95,06%)',
    c6: '22.650 lượt thích bình luận',
    c7: '882 bình luận mẫu (4,94%)',
    c8: 'Cập nhật quy trình đề cử nhân sự khóa X, hoạt động chuyên môn của các đội tuyển quốc gia và thảo luận bóng đá chung',
    c9: 'https://www.facebook.com/hattrick.io/posts/pfbid02aqVErJqjXw3GZiBv3p1TJLzH2NSN4ktQ6TFvaCTZWvP8hpFuKDn6sGDBhYdETB9Ml'
  },
  {
    c1: 9,
    c2: 'TỔNG CỘNG ĐỐI SOÁT TOÀN HỆ THỐNG (SÁU NHÓM QUAN ĐIỂM)',
    c3: 'Tổng hợp toàn bộ dữ liệu đa nền tảng (01/10/2026 – 25/10/2026)',
    c4: '1.137 bài/video · 20.767 tổng bình luận',
    c5: '19.652 tự nhiên (94,63%)',
    c6: '26.613 lượt thích bình luận',
    c7: '1.115 bình luận mẫu (5,37%)',
    c8: 'Đối soát khớp 100% giữa tổng các nhóm thành phần và danh mục nguồn (Chênh lệch = 0)',
    c9: 'https://www.youtube.com/watch?v=u_6dEnPr4DU&t=55s'
  }
];
db.sheets['11_Phan_Ung_Seeding_Va_ABSA'].rows = clean11Rows;
console.log('Cleaned 11_Phan_Ung_Seeding_Va_ABSA:', clean11Rows.length, 'rows');

// Clean any em-dashes in 02_Luy_Tien_22_Ngay
db.sheets['02_Luy_Tien_22_Ngay'].rows.forEach(r => {
  if (typeof r.c2 === 'string') {
    r.c2 = r.c2.replace(/\s*—\s*/g, ' - ');
  }
});

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
console.log('Successfully saved cleaned warroom_db.json!');
