# Cyber Security & Scam Alert — Style Specification v1.0

Tài liệu đặc tả phong cách thiết kế video chuyên biệt cho chủ đề **An ninh mạng, Cảnh báo lừa đảo công nghệ cao, Tin tức tội phạm mạng và Phòng chống lừa đảo trực tuyến**.

---

## 1. Ngôn ngữ thiết kế tổng quan (Design Language)

- **Định dạng:** 1080 x 1920 (9:16 Portrait), 30 fps.
- **Phong cách:** Cyber Threat Investigation / Digital Crime HUD — phong cách giao diện an ninh mạng tối màu, khẩn cấp, sắc nét, mô phỏng phòng điều hành giám sát an ninh mạng quốc gia kết hợp tái hiện bẫy lừa thực tế.
- **Cảm xúc cốt lõi:** Kịp thời, báo động khẩn cấp, minh bạch, uy tín và bảo vệ người dùng.
- **Không gian an toàn (Safe Areas):**
  - **Trục ngang:** Lề trái/phải 75px (vùng an toàn 930px, chống che khuất bởi các nút tương tác Like/Share trên TikTok, Reels, Shorts).
  - **Trục dọc - Đỉnh (Top safe):** >= 100px (thanh thông tin trạng thái khẩn cấp HUD Ticker).
  - **Trục dọc - Đáy (Bottom safe):** >= 200px (phụ đề công nghệ neon và vùng thao tác ngón tay của người dùng).

---

## 2. Bảng màu & Ánh sáng Neon (Cyber Threat Palette)

### Màu nền & Không gian
- **Đen không gian mạng (Deep Void Black):** `#080B11` — Nền đen thẫm tuyệt đối, tạo độ sâu vô cực và tôn vinh các chi tiết phát sáng neon.
- **Thẻ giám sát mờ (Cyber Card Background):** `rgba(15, 23, 42, 0.85)` với hiệu ứng mờ kính (glassmorphism/blur), viền công nghệ mảnh.
- **Lưới tọa độ số (Digital Tech Grid):** Lưới ô vuông mờ 48px x 48px `rgba(0, 242, 254, 0.035)` gợi cảm giác ma trận giám sát dữ liệu.

### Bảng màu cảnh báo (Neon Threat Accents)
- **Đỏ cảnh báo nguy hại (Hazard Laser Red):** `#FF2E55` (hoặc `#DC2626`)
  - Ý nghĩa: Bẫy lừa đảo, thiệt hại tài chính, mã độc phishing, dấu hiệu lừa đảo, nút bấm khẩn cấp.
  - Hiệu ứng phát sáng: `box-shadow: 0 0 30px rgba(255, 46, 85, 0.45)`.
- **Xanh điện tử công nghệ (Cyber Cyan):** `#00F2FE`
  - Ý nghĩa: Giao diện HUD, mã vụ án, viền quét radar, các thông số kỹ thuật và hệ thống xác minh.
- **Xanh lục an toàn (Shield Emerald):** `#10B981`
  - Ý nghĩa: Tên miền chính phủ chính thức, lá chắn bảo mật, các biện pháp phòng ngừa thành công.
- **Vàng hổ phách cảnh giác (Warning Amber):** `#F59E0B`
  - Ý nghĩa: Dấu hiệu khả nghi, lỗ hổng tâm lý, lưu ý quan trọng.
- **Chữ trắng siêu tương phản (Pure High-Contrast White):** `#F8FAFC`.

---

## 3. Hệ thống Typography

- **Phông tiêu đề & Số liệu (Headline Sans):**
  - Font stack: `'Plus Jakarta Sans', 'Inter', system-ui, sans-serif`.
  - Đặc tính: Sans-serif hình học hiện đại, nét đậm (`font-weight: 800 - 900`), độ tương phản cao, hỗ trợ dấu tiếng Việt chuẩn xác.
  - Kích thước:
    - Tiêu đề số tiền thiệt hại: 100px – 110px, phát sáng đỏ laser neon.
    - Tiêu đề cảnh / Dòng cảnh báo: 60px – 72px.
- **Phông kỹ thuật & Mã vụ án (Terminal Monospace):**
  - Font stack: `'JetBrains Mono', 'Fira Code', Consolas, monospace`.
  - Dùng cho: Đường link URL lừa đảo, mã định danh vụ án `#CYBER-ALERT`, số điện thoại hotline, tên miền chính thức, nhãn phân loại kỹ thuật.
- **Phông phụ đề HUD (Cyber Subtitles):**
  - Nằm trong hộp đen kính mờ `rgba(8, 11, 17, 0.75)` có viền cyan mảnh chống chói.
  - Từ đang đọc (karaoke) nhảy sáng rực rỡ màu **Vàng dạ quang (Hazard Yellow) `#FDE047`** kèm hào quang neon (`text-shadow: 0 0 14px rgba(253, 224, 71, 0.8)`).

---

## 4. Đặc tả 8 kiểu Scene Chuyên biệt (Component Anatomy)

### 1. `cyber-hook` (Báo động đỏ khẩn cấp)
- **Mục đích:** Đập tan sự thờ ơ của người xem trong 2 giây đầu bằng mức độ thiệt hại nghiêm trọng.
- **Cấu trúc:**
  - Đèn tín hiệu khẩn cấp nhấp nháy đỏ (`● LIVE ALERT`).
  - Dải ruy-băng cảnh báo: `⚠️ CẢNH BÁO LỪA ĐẢO CÔNG NGHỆ CAO`.
  - Dòng giật tít số tiền thiệt hại hoặc thủ đoạn mới: e.g. `MẤT TRẮNG 2 TỶ ĐỒNG`.
  - Khung hình bằng chứng / đối tượng lừa đảo kèm dấu mộc đỏ `[CẢNH BÁO ĐỎ]`.

### 2. `cyber-fake-chat` (Tái hiện tin nhắn / SMS mạo danh)
- **Mục đích:** Tái hiện chân thực 100% tin nhắn SMS, Zalo, Telegram mà nạn nhân nhận được để khán giả nhận diện ngay khi gặp ngoài đời.
- **Cấu trúc:**
  - Giao diện giả lập điện thoại thông minh viền neon đỏ.
  - Tên người gửi Brandname giả mạo: `ACB_SMS_OTP`, `CÔNG AN TP HÀ NỘI`.
  - Nội dung tin nhắn đe dọa / dẫn dụ.
  - Hộp đường link độc hại nhấp nháy đỏ: `http://acb-xac-thuc-online.xyz/login`.
  - Thẻ nhắc nhở bên dưới: *"Ngân hàng không bao giờ gửi link đăng nhập qua tin nhắn"*.

### 3. `cyber-anatomy` (Bóc tách 4 bước thao túng)
- **Mục đích:** Giải mã cơ chế dẫn dụ từ lúc tiếp cận đến lúc tài khoản về 0 đồng.
- **Cấu trúc:**
  - Cột mốc số 01 $\rightarrow$ 04 nối với nhau bằng trục dây mạng phát sáng.
  - Bước 1: Tiếp cận mạo danh.
  - Bước 2: Thao túng tâm lý (đe dọa, cô lập).
  - Bước 3: Dẫn dụ cài app độc hại (file .apk).
  - Bước 4: Chiếm quyền và vét sạch tài khoản ngân hàng.

### 4. `cyber-red-flags` (Dấu hiệu đỏ nhận biết tức thì)
- **Mục đích:** Đưa ra bộ nhận diện nhanh: chỉ cần xuất hiện 1 trong các dấu hiệu này là lừa đảo 100%.
- **Cấu trúc:**
  - 3 thẻ đen viền đỏ phát sáng có biểu tượng chữ ✕ màu đỏ rực.
  - Nêu rõ 3 điều cấm: Đòi chuyển tiền vào tài khoản tạm giữ, ép cài app ngoài store, cấm dập máy/cấm kể cho người nhà.

### 5. `cyber-compare` (Đối chiếu Tên miền Thật vs Giả)
- **Mục đích:** Hướng dẫn trực quan cách nhận biết bẫy tên miền giả mạo bằng mắt thường.
- **Cấu trúc:**
  - Khung Xanh Lục (Thật): Cổng chính phủ `dichvucong.gov.vn` (đuôi `.gov.vn`, HTTPS an toàn).
  - Khung Đỏ (Giả): Bẫy lừa `dichvucong-gov-vn.xyz` (đuôi quốc tế lạ `.xyz, .top, .vip`).

### 6. `cyber-loss-stat` (Con số thiệt hại quy mô lớn)
- **Mục đích:** Đưa ra số liệu thống kê chấn động tạo tính thuyết phục và răn đe.
- **Cấu trúc:**
  - Số liệu khổng lồ: `16.000 TỶ` hoặc `85% NẠN NHÂN`.
  - Chú thích đơn vị và dữ liệu từ Cục An toàn thông tin (Bộ TT&TT).

### 7. `cyber-shield-defense` (Lá chắn bảo vệ: Quy tắc 3 KHÔNG)
- **Mục đích:** Trang bị giải pháp phòng thủ vững chắc cho khán giả.
- **Cấu trúc:**
  - 3 khối khiên bảo vệ màu Xanh Ngọc Emerald:
    - 1. KHÔNG chuyển tiền theo lời đe dọa qua điện thoại.
    - 2. KHÔNG cài đặt app ngoài kho CH Play / App Store.
    - 3. KHÔNG cung cấp mã OTP/mật khẩu cho bất kỳ ai.

### 8. `cyber-hotline` (Đường dây nóng & Kêu gọi chia sẻ)
- **Mục đích:** Cung cấp đầu mối trình báo chính thức và khuyến khích chia sẻ để lan tỏa cộng đồng.
- **Cấu trúc:**
  - Tổng đài 156 (tiếp nhận tin nhắn rác & cuộc gọi lừa đảo).
  - Cổng báo cáo trực tuyến: `canhbao.khonggianmang.vn`.
  - Nút bấm kêu gọi: `CHIA SẺ NGAY ĐỂ BẢO VỆ NGƯỜI THÂN!` màu đỏ neon rực lửa.

---

## 5. Danh mục file của Template

- Theme: [src/theme-cyber.ts](file:///d:/Apps/AI-Video-Studio/src/theme-cyber.ts)
- Components: [src/scenes-cyber.tsx](file:///d:/Apps/AI-Video-Studio/src/scenes-cyber.tsx)
- Master Video: [src/video.tsx](file:///d:/Apps/AI-Video-Studio/src/video.tsx)
- Types: [src/types.ts](file:///d:/Apps/AI-Video-Studio/src/types.ts)
- Verify Script: [scripts/verify-project.mjs](file:///d:/Apps/AI-Video-Studio/scripts/verify-project.mjs)
