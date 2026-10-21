# Vintage Editorial Documentary — Style Specification v1.0

Tài liệu đặc tả phong cách thiết kế được nghiên cứu và chuẩn hóa trực tiếp từ video tham chiếu `references/vintage-editorial/sapa-reference.mp4`.

---

## 1. Ngôn ngữ thiết kế tổng quan (Design Language)
- **Định dạng:** 1080 x 1920 (9:16 Portrait), 30 fps.
- **Phong cách:** Editorial / Vintage Journalistic Documentary — phong cách tài liệu báo chí hoài niệm nhưng hiện đại, sang trọng, tinh tế.
- **Không gian an toàn (Safe Areas):**
  - Trục ngang: Padding trái/phải 90px (nội dung hiển thị tối đa 900px).
  - Trục dọc: Đỉnh (Top safe) >= 80px (dành cho thanh Header), Đáy (Bottom safe) >= 160px (dành cho phụ đề nổi và hashtags).

---

## 2. Bảng màu & Chất liệu (Color Palette & Texture)

### Màu sắc chủ đạo
- **Nền giấy mộc (Paper Canvas):** `#F7F5EE` — Sắc kem ngà ấm áp, tạo cảm giác trang tạp chí/nhật ký lữ hành xưa.
- **Mực rừng sâu (Forest Ink):** `#1A3930` — Sắc xanh đen thẫm của rừng già Tây Bắc, dùng cho tiêu đề chính và các chi tiết tương phản mạnh.
- **Điểm nhấn San hô / Gạch nung (Coral / Brick Accent):** `#DE5138` — Sắc đỏ san hô cổ điển, tràn đầy năng lượng hoài niệm. Dùng cho con dấu (stamp), từ khóa nổi bật trong tiêu đề, tag địa danh và chữ karaoke active.
- **Mực nhạt (Muted Slate / Olive):** `#4A635A` — Xanh rêu xám, dùng cho đoạn tóm tắt (sub-headline), mô tả dòng thời gian và nguồn ảnh.
- **Trắng Postcard (Mat White):** `#FFFFFF` — Dùng làm viền thẻ bưu thiếp, nền pill tags và khung thẻ thống kê.
- **Xanh lục thẫm (CTA Deep Green):** `#1C4D43` — Dùng cho nút kêu gọi hành động ở cảnh kết thúc.

### Chi tiết nền & Texture
1. **Dải màu đỉnh (Top Border Stripe):** Vạch mảnh 6px nằm sát đỉnh khung hình: `linear-gradient(90deg, #1A4D42 0%, #3D8274 50%, #DE5138 100%)`.
2. **Lưới giấy vẽ (Grid Pattern):** Lưới ô vuông mờ 48px x 48px `rgba(26, 57, 48, 0.035)` tạo cảm giác giấy vẽ kiến trúc / bản thảo ghi chép.
3. **Ánh sáng tản (Ambient Glow):**
   - Góc trên bên phải: Vùng tỏa sáng ấm áp `radial-gradient(circle at 92% 8%, rgba(222, 81, 56, 0.08) 0%, transparent 55%)`.
   - Góc dưới bên trái: Vùng tỏa sáng dịu mát `radial-gradient(circle at 8% 92%, rgba(26, 77, 66, 0.07) 0%, transparent 55%)`.

---

## 3. Hệ thống Typography

- **Phông tiêu đề lớn (Headline Serif):**
  - Font stack: `'Playfair Display', 'Merriweather', Georgia, 'Times New Roman', serif`.
  - Đặc tính: Serif tương phản nét thanh nét đậm cao (high-contrast modern serif), đường nét quý phái.
  - Kích thước: 76px – 86px, line-height: 1.12, letter-spacing: -1.5px, font-weight: 800-900.
  - **Quy tắc phối 2 màu (Two-tone Headline):** Điểm nhấn cốt lõi của phong cách là phối màu giữa `#DE5138` (từ khóa chính) và `#1A3930` (các từ ngữ cảnh).
- **Phông thân bài & Phụ đề (Body & UI Sans):**
  - Font stack: `'Plus Jakarta Sans', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`.
  - Đặc tính: Sans-serif hình học hiện đại, hỗ trợ toàn vẹn dấu tiếng Việt.
  - Kích thước:
    - Kicker / Tag góc: 22px, font-weight 700-800, uppercase, letter-spacing 2px.
    - Con dấu (Stamp): 22px, font-weight 800, uppercase, letter-spacing 2px.
    - Đoạn tóm tắt (Sub-headline): 32px – 34px, font-weight 600, line-height 1.45, màu `#4A635A`.
    - Pill tags: 19px, font-weight 700, uppercase, padding 6px 18px, nền trắng viền mờ.

---

## 4. Đặc tả 7 kiểu Scene (Component Anatomy)

### 1. `cover` (Cảnh bìa / Mở màn)
- **Cấu trúc:**
  - Header: Thể loại bên trái (`HỒ SƠ DU LỊCH · 1992`), Địa danh bên phải (`SA PA`).
  - Stamp: Con dấu nghiêng -3 độ với viền đỏ (`KÝ ỨC TÂY BẮC`).
  - Headline 2 màu nổi bật.
  - Đoạn tóm tắt mở đề.
  - Dải Pill tags (ví dụ: `SA PA`, `KÝ ỨC`, `1992`).
  - Postcard lớn trung tâm: Bo góc viền trắng, ảnh trượt nhẹ từ dưới lên và zoom chậm, chân thẻ có nguồn (`Nguồn: VnExpress`) và chữ `POSTCARD`.

### 2. `photo-story` (Câu chuyện ảnh)
- **Cấu trúc:**
  - Header + Stamp + Headline 2 màu + Tóm tắt + Tags.
  - Thẻ Postcard tiêu điểm khổ rộng (chiều cao ~580px).
  - Dòng trích dẫn / Ký ức (Quote) đặt ngay dưới thẻ ảnh (màu mực `#2F4840`, font-size 24px, in nghiêng nhẹ hoặc nét vừa).

### 3. `photo-stack` (Cặp ảnh xếp lớp)
- **Cấu trúc:**
  - Header + Stamp + Headline + Tóm tắt + Tags.
  - 2 thẻ Postcard xếp dọc so le (chiều cao mỗi thẻ ~340px - 360px).
  - Thẻ trên nghiêng nhẹ -1.2 độ, thẻ dưới nghiêng 1.2 độ, xuất hiện so le (staggered delay +10 frames).
  - Cả hai đều có viền bo tròn trắng và chân thẻ ghi nguồn + nhãn `POSTCARD`.

### 4. `timeline` (Hành trình / Cột mốc)
- **Cấu trúc:**
  - Header + Stamp + Headline + Tóm tắt + Tags.
  - Cột mốc nối dọc (Vertical Milestone Tracker):
    - Trục đường kẻ mờ kết nối các điểm.
    - Nốt đầu tiên: Chấm tròn màu Đỏ san hô (`#DE5138`), các nốt tiếp theo: Màu Xanh mực (`#1A3930`).
    - Mỗi chặng gồm: Tên địa điểm/hành động (bold sans), mô tả ngắn, và mốc thời gian căn phải (`0H`, `5H`, `10H`).
    - Đường phân cách ngang nhẹ giữa các chặng.

### 5. `comparison` (So sánh / Tương phản)
- **Cấu trúc:**
  - Header + Stamp + Headline + Tóm tắt + Tags.
  - Các khối hàng so sánh ngang:
    - Nhãn phân loại bên trái: Chữ in hoa đỏ san hô (`BAN NGÀY`, `BAN ĐÊM` hoặc `XƯA`, `NAY`).
    - Nội dung đối chứng bên phải: Chữ đậm màu mực `#1A3930`.
    - Đường kẻ chia tách tối giản, thanh lịch.

### 6. `statistic` (Con số ấn tượng)
- **Cấu trúc:**
  - Header + Stamp + Headline + Tóm tắt + Tags.
  - Khung thẻ thống kê đặc trưng:
    - Nền trắng bo tròn (border-radius 22px), đổ bóng êm ái.
    - **Viền nét đứt màu xanh mực (Dashed Border):** `2px dashed #3D6E62`.
    - Tiêu đề khung: Chữ in hoa nhỏ (`SỨC CHỨA LƯU TRÚ KHI ĐÓ`).
    - Con số khổng lồ: Font Serif cổ điển (`Playfair`), màu Đỏ san hô `#DE5138` (size ~115px), đi kèm đơn vị tính (`khách`) bằng chữ sans đậm.
    - Chú giải ngữ cảnh đầy đủ bên dưới con số.

### 7. `ending` (Cảnh kết thúc)
- **Cấu trúc:**
  - Header + Stamp + Headline 2 màu đầy lắng đọng.
  - Đoạn kết luận cảm xúc.
  - Nút kêu gọi hành động (Call To Action): Nút bo tròn màu Xanh lục thẫm (`#1C4D43`), chữ trắng đậm (`Lưu lại câu chuyện Sa Pa xưa`).
  - Dòng Hashtags bên dưới: `#SaPa #DuLichVietNam #KyUc1992` đặt trên vùng phụ đề đáy.

---

## 5. Hiệu ứng Postcard (Postcard Visual Anatomy)
- **Khung thẻ:** Thẻ trắng bo góc ngoài `20px`, viền lề trên và hai bên `12px`, lề dưới `16px`.
- **Đổ bóng:** `0 20px 45px rgba(26, 57, 48, 0.12)`.
- **Góc bo ảnh bên trong:** `12px`.
- **Thanh chân thẻ (Footer bar):**
  - Trái: Thông tin nguồn (`Nguồn: ...`) màu `#667C74`.
  - Phải: Dòng chữ `POSTCARD` màu `#DE5138` in hoa đậm sắc nét.
- **Ken Burns Motion:** Tỷ lệ scale ảnh dịch chuyển từ `1.00` đến `1.05` trong suốt trường đoạn.

---

## 6. Phong cách Phụ đề & Karaoke (Subtitles & Dynamic Karaoke)
- **Vị trí:** Cách đáy khung hình 120px, canh giữa, không viền hộp đen cồng kềnh.
- **Hiển thị:** Chữ nổi trực tiếp trên nền giấy mộc ấm áp, có bóng đổ cực mịn (`0 2px 8px rgba(0,0,0,0.06)`).
- **Typography:** Sans-serif đậm (`font-weight: 700`, `font-size: 38px`, `line-height: 1.35`).
- **Cơ chế Highlight Karaoke:**
  - Chỉ highlight riêng từ đang đọc màu **Đỏ San Hô** (`#DE5138`) khi project có timestamp từng từ. Với SRT thông thường, hiển thị cả câu theo thời gian cue.
  - Các từ còn lại hiển thị màu xám rêu mờ (`#7E938B`).
  - Chuyển từ nhịp nhàng theo tiến trình thời gian câu thoại (tính theo frame/ms).

---

## 7. Chuyển động và Nhịp dựng (Motion & Pacing)
- **Entrance Staggering:**
  1. `Frame 0-5`: Nền giấy và thanh Header xuất hiện.
  2. `Frame 6-16`: Con dấu (Stamp) dập xuống với độ nảy đàn hồi (spring bounce).
  3. `Frame 8-22`: Tiêu đề chính lướt nhẹ từ dưới lên kèm hiệu ứng mờ dần (opacity + translateY).
  4. `Frame 14-26`: Đoạn tóm tắt và các Pill tags xuất hiện.
  5. `Frame 16+`: Postcard hoặc các khối dữ liệu trượt vào với lò xo mượt (`damping: 180, stiffness: 90`).
- **Nhịp thở (Pacing):** Mỗi scene duy trì từ 4.5 đến 8 giây tùy theo trường đoạn SRT, không có chuyển động giật cục.
