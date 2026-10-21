# Illustrated Paper-Textured — Style Specification v1.0

Tài liệu đặc tả phong cách thiết kế được nghiên cứu, trích xuất và chuẩn hóa trực tiếp từ video tham chiếu `references/illustrated-paper-textured/vetay-reference.mp4`.

---

## 1. Ngôn ngữ thiết kế tổng quan (Design Language)

- **Định dạng:** 1080 x 1920 (9:16 Portrait), 30 fps.
- **Phong cách:** Whiteboard / Hand-Drawn Paper-Textured Explainer — phong cách giải thích trực quan vẽ tay trên nền giấy nhăn mộc mạc, gần gũi, cuốn hút và dễ tiếp nhận thông tin.
- **Triết lý hiển thị:** 
  - Toàn bộ nội dung như được một bàn tay họa sĩ cầm bút dạ phác họa trực tiếp lên trang giấy vẽ.
  - Sử dụng khoảng trắng (negative space) rộng rãi, bố cục thoáng đãng, phân cấp thông tin rõ ràng.
- **Không gian an toàn (Safe Areas):**
  - **Trục ngang:** Lề trái/phải 80px (nội dung hiển thị tối đa 920px, chống tràn viền trên các thiết bị di động).
  - **Trục dọc - Đỉnh (Top safe):** >= 90px (dành cho logo/watermark kênh hoặc kicker chủ đề).
  - **Trục dọc - Đáy (Bottom safe):** >= 200px (vùng dành cho phụ đề nổi và thanh điều hướng TikTok/Reels/Shorts).

---

## 2. Bảng màu & Chất liệu (Color Palette & Texture)

### Màu sắc chủ đạo (Marker Ink Palette)
- **Nền giấy nhăn (Crinkled Paper Canvas):** `#FAF8F5` kết hợp vân giấy nhăn thực tế (`paper-background.jpg`). Sắc kem xám sáng ấm áp, có độ gập và bóng sáng tự nhiên.
- **Mực bút lông than (Graphite Marker Ink):** `#1E232A` — Sắc than đen đậm nhưng không gắt như `#000000`, dùng cho tiêu đề chính, đường kẻ viền (border), trục biểu đồ và nét vẽ V-shape.
- **Mực Xanh dương điện tử (Electric Blue Marker):** `#3B82F6` (hoặc `#2563EB`) — Điểm nhấn cốt lõi của phong cách: dùng cho số liệu mở màn (hook), thanh tiến độ hoàn thành, chữ phụ đề active (karaoke), và nhánh lựa chọn tích cực.
- **Mực Đỏ thẫm / San hô cảnh báo (Crimson Red Marker):** `#BA3D4D` (hoặc `#C24141`) — Dùng cho câu hỏi tình huống khó xử (dilemma), cột chi phí tăng cao, mũi tên cảnh báo rủi ro, và từ khóa kết luận punchline.
- **Mực Vàng đất / Hoàng thổ (Ochre Amber Marker):** `#D49A36` — Dùng cho thanh tiến độ giai đoạn đầu, nhánh lựa chọn phụ, và đường gạch chân cong kết bài.
- **Mực xám trung tính (Muted Slate):** `#64748B` — Dùng cho chú thích bổ trợ, điều kiện đi kèm và ghi chú rủi ro.
- **Trắng Postcard (Matte Pure White):** `#FFFFFF` — Dùng làm viền thẻ bưu thiếp Polaroid, nền thẻ lựa chọn và nền thanh tiến độ.

### Nét vẽ & Texture
1. **Bàn tay vẽ (Drawing Hand):** Hình ảnh bàn tay hoạt họa cầm bút dạ trắng đầu đen (`drawing-hand.png`). Đầu ngòi bút được canh tọa độ chính xác `(-25px, -45px)` để di chuyển theo nét chữ hoặc hình vẽ.
2. **Nền giấy nhăn (Paper Canvas Texture):** Vân nếp gấp nhăn tự nhiên phủ toàn bộ khung hình, tạo chiều sâu thị giác như một trang sổ phác thảo thực tế.
3. **Viền đen nét vẽ tay (Marker Outline):** Các khối hộp, thanh tiến độ, thẻ postcard đều có đường viền đậm `3px - 4px solid #1E232A`.
4. **Băng keo Washi (Washi Tape):** Dải băng keo giấy mờ bán trong suốt `rgba(245, 240, 225, 0.85)` dán ở cạnh trên thẻ ảnh, hơi nghiêng nhẹ `-1.5°` tạo cảm giác dán thủ công.

---

## 3. Hệ thống Typography

- **Phông tiêu đề lớn & Số liệu (Headline Display):**
  - Font stack: `'Nunito', 'Baloo 2', 'Plus Jakarta Sans', system-ui, sans-serif`.
  - Đặc tính: Sans-serif nét tròn (rounded terminals), thân thiện, nét bút dày dặn (weight 800 - 900), hỗ trợ tiếng Việt hoàn chỉnh.
  - Kích thước:
    - Số liệu Hook / Verdict lớn: 88px – 96px, line-height 1.15, letter-spacing 1px - 2px, in hoa toàn bộ.
    - Tiêu đề câu hỏi / Đề mục cảnh: 64px – 68px, line-height 1.25, font-weight 900.
- **Phông thân bài, Nhãn & Chú thích (Body & UI):**
  - Font stack: `'Plus Jakarta Sans', 'Nunito', system-ui, sans-serif`.
  - Kích thước:
    - Nhãn lựa chọn / Tên nhánh: 34px – 44px, font-weight 800 - 900.
    - Câu hỏi tình huống / Cảnh báo: 36px – 38px, font-weight 800, màu `#BA3D4D` (Crimson).
    - Đoạn giải thích / Ghi chú: 28px – 32px, font-weight 700, màu `#64748B` (Slate) hoặc `#1E232A`.
- **Phông phụ đề Karaoke (Subtitles):**
  - Font: `'Plus Jakarta Sans', 'Nunito', sans-serif`, font-weight 800.
  - Vị trí: Căn giữa, cách đáy 140px.
  - Kích thước: 38px – 42px (tùy độ dài câu).
  - Quy tắc màu: Chữ bình thường màu than xám `#334155`, chữ đang đọc nhảy sáng màu Xanh dương rực rỡ `#3B82F6`. Không dùng khung viền hộp gò bó, giữ phong cách thoáng trên mặt giấy.

---

## 4. Đặc tả 8 kiểu Scene (Component Anatomy)

### 1. `illustrated-hook` (Tiêu đề số lớn & Thế tiến thoái lưỡng nan)
- **Mục đích:** Giữ chân người xem trong 3 giây đầu bằng một con số hoặc chủ đề gây tò mò cực đại.
- **Cấu trúc:**
  - Tiêu đề/con số khổng lồ (e.g. `500 TRIỆU`, `100 NĂM`, `1511`) màu Xanh `#3B82F6` vẽ tay bởi Drawing Hand.
  - 2 thẻ Postcard/hình minh họa đặt song song đối chiếu (nghiêng nhẹ -2° và +2°).
  - Nhãn phân loại dưới mỗi hình (font-size 34px, bold 900).
  - Câu hỏi tình huống màu Đỏ (`#BA3D4D`) ở đáy: e.g. "Bạn cần giải quyết điều gì nhất?".

### 2. `illustrated-progress` (So sánh thanh tiến độ / Năng lực)
- **Mục đích:** So sánh trực quan khả năng chi trả, tiến độ thực hiện hoặc mức độ đáp ứng giữa 2 phương án.
- **Cấu trúc:**
  - Tiêu đề câu hỏi ở đỉnh (`Ở thời điểm này`, `Khả năng hiện tại`).
  - 2 thanh tiến độ bo tròn dạng pill (`border: 3.5px solid #1E232A`):
    - Thanh A: Màu Xanh dương `#3B82F6`, đầy 100% (hoặc mức cao).
    - Thanh B: Màu Vàng đất `#D49A36`, đầy ~25% (hoặc mức khởi điểm).
  - Dòng ghi chú màu Đỏ đặt dưới thanh B (e.g. "Phần còn lại: vay nhiều năm").
  - Đúc kết cốt lõi ở đáy (e.g. "Dễ mua trước ≠ phù hợp hơn").

### 3. `illustrated-compare` (Dự phóng dài hạn / Đối chứng 2 cột)
- **Mục đích:** So sánh kết quả trong tương lai (5-10 năm) hoặc đối chiếu ưu/nhược điểm.
- **Cấu trúc:**
  - Tiêu đề: "Sau 10 năm thì sao?", "Xưa và Nay".
  - Cột trái: Thẻ Postcard/Icon kèm dòng kết quả cảnh báo màu Đỏ `#BA3D4D` ("Xe mất giá + chi phí sở hữu").
  - Cột phải: Thẻ Postcard/Icon kèm dòng kết quả tích cực màu Xanh `#3B82F6` ("Nhà tăng phần quyền sở hữu").
  - Chú thích thực tế (reality check footnote) ở đáy với sắc xám slate `#64748B`.

### 4. `illustrated-features` (Phân tích công năng / Điểm cộng)
- **Mục đích:** Liệt kê các lợi ích hoặc ứng dụng thực tế của một chủ thể trung tâm.
- **Cấu trúc:**
  - Tiêu đề: "Khi ô tô là công cụ", "Giá trị kiến trúc".
  - Thẻ Postcard khổ lớn trung tâm (width 720px) có dán băng keo Washi.
  - 3-4 nhãn pill bo tròn nhiều màu nổi bật bên dưới: Xanh dương, Vàng đất, Đỏ crimson (e.g. "Đi xa mỗi ngày", "Đưa đón con", "Kiếm thêm tiền").

### 5. `illustrated-arrow-flow` (Mũi tên dòng chảy / Mục tiêu bị đẩy lùi)
- **Mục đích:** Mô tả hệ quả dây chuyền hoặc cảnh báo mục tiêu dài hạn bị trôi xa.
- **Cấu trúc:**
  - Tiêu đề và diễn giải ngữ cảnh ở đỉnh.
  - Hình minh họa/postcard chủ thể trung tâm.
  - Mũi tên cong vẽ tay bằng SVG nét đứt/nét liền (`stroke: #BA3D4D`, `strokeWidth: 5`) trượt dài từ trái sang phải, bàn tay di chuyển theo ngòi vẽ.
  - Dòng cảnh báo màu Đỏ ở dưới: "Mua xe có thể kéo xa mục tiêu mua nhà".

### 6. `illustrated-bar-chart` (Biểu đồ cột chi phí / Gánh nặng định kỳ)
- **Mục đích:** So sánh số liệu định lượng hàng tháng hoặc mức độ tiêu hao tài chính.
- **Cấu trúc:**
  - Tiêu đề: "Chi phí mỗi tháng", "Gánh nặng định kỳ".
  - 2 cột biểu đồ vẽ đứng trên một đường chân trời (baseline) màu than:
    - Cột 1 (Đỏ `#BA3D4D`): Viền đen dày, mọc từ chân lên cao kèm nhãn "Chi phí tăng".
    - Cột 2 (Xanh `#3B82F6`): Viền đen dày, mọc từ chân lên cao kèm nhãn "Tích lũy tài sản".
  - Lời nhắc nhở tính toán màu Đỏ ở đáy: "Vay thêm 3–4 tỷ? Hãy kiểm tra sức trả nợ.".

### 7. `illustrated-decision-fork` (Cán cân quyết định / Phân nhánh V-Shape)
- **Mục đích:** Cung cấp mô hình ra quyết định rõ ràng cho người xem.
- **Cấu trúc:**
  - Tiêu đề: "Mình cần gì nhất lúc này?".
  - Nét vẽ chữ V (V-shape fork) vẽ tay phân tách 2 ngả đường.
  - Nhánh trái: Tiêu đề in hoa màu Xanh `#3B82F6` kèm điều kiện áp dụng.
  - Nhánh phải: Tiêu đề in hoa màu Vàng đất `#D49A36` kèm điều kiện áp dụng.

### 8. `illustrated-verdict` (Kết luận / Nguyên tắc vàng)
- **Mục đích:** Đúc kết toàn bộ video bằng một thông điệp mạnh mẽ, dứt khoát.
- **Cấu trúc:**
  - Câu hỏi dẫn nhập ở đỉnh (màu xám slate).
  - Tuyên ngôn kết luận khổng lồ (Verdict): e.g. "CHƯA MUA CẢ HAI", "QUY TẮC CỐT LÕI" màu Đỏ `#BA3D4D`, cỡ chữ 92px in hoa đậm nét được bàn tay vẽ tay trực tiếp.
  - Đường gạch chân cong lượn sóng màu Vàng đất `#D49A36`.
  - Nguyên tắc vàng ở đáy (font-size 44px, bold 800, than đậm).

---

## 5. Động lực học chuyển động & Nhịp dựng (Motion Dynamics & Pacing)

1. **Chu kỳ chuyển động của Bàn tay vẽ (3 giai đoạn):**
   - **Giai đoạn 1 - Tiếp cận (0 - 6 frames):** Bàn tay trượt êm từ góc dưới bên phải vào vị trí ngòi bút bắt đầu vẽ (`interpolate` với ease-out).
   - **Giai đoạn 2 - Vẽ nét (6 - 20 frames):** Ngòi bút di chuyển từ `(startX, startY)` đến `(endX, endY)` kết hợp rung nhẹ tự nhiên (`Math.sin(frame * 1.6) * 2px`). Nét vẽ hoặc chữ bên dưới hiện ra đồng thời.
   - **Giai đoạn 3 - Rút lui (20 - 28 frames):** Bàn tay trượt nhẹ ra ngoài khung hình hướng về phía góc dưới bên phải, để lại nội dung rõ ràng cho người xem đọc.
2. **Vật lý lò xo (Spring Physics):**
   - Tiêu đề và thẻ Postcard sử dụng cấu hình lò xo đàn hồi nhẹ: `damping: 13 - 15, stiffness: 85 - 100, mass: 0.8`.
   - Giúp hình ảnh rơi xuống trang giấy có độ nẩy tự nhiên, êm ái, không giật lag.
3. **Chuyển cảnh (Scene Transitions):**
   - Chuyển cảnh dứt khoát (clean cut / page clear) sau khi kết thúc một ý trọn vẹn trong kịch bản thoại (thường từ 4s đến 10s một cảnh).
   - Trang giấy nền vẫn giữ nguyên sự nhất quán xuyên suốt, chỉ có nét vẽ và nội dung mới được bàn tay vẽ tiếp lên.

---

## 6. Hiệu ứng Postcard (Postcard Effect)

Khi hiển thị ảnh tư liệu hoặc ảnh minh họa do người dùng cung cấp:
- **Khung viền Polaroid / Postcard:**
  - Nền giấy trắng `#FFFFFF`, padding `14px 14px 28px 14px`, bo góc `14px`.
  - Bóng đổ mềm sâu xuống mặt giấy nhăn: `box-shadow: 0 16px 36px rgba(0, 0, 0, 0.12), 0 3px 10px rgba(0, 0, 0, 0.05)`.
  - Nghiêng hữu cơ nhẹ: từ `-2°` đến `+2°`.
- **Dải băng keo Washi:**
  - Băng dính màu be mờ dán đè lên mép trên ảnh, tạo cảm giác người tạo video đính ảnh vào sổ ghi chép.
- **Nguồn ảnh & Chú thích:**
  - Ghi chú ngắn gọn, thanh lịch ngay dưới chân ảnh bên trong viền trắng (`font-size: 22px`, màu `#64748B`).

---

## 7. Phụ đề Karaoke (Caption Behavior)

- Vị trí: Cách đáy 140px, nằm trong vùng an toàn tuyệt đối của định dạng video ngắn dọc.
- Phông chữ: `Plus Jakarta Sans`, đậm (weight 800), kích cỡ 38px - 42px.
- Cơ chế Active:
  - Chỉ đổi riêng từ sang màu Xanh dương `#3B82F6` khi project có timestamp từng từ.
  - Với SRT thông thường, hiển thị cả câu theo timing của cue; không nội suy karaoke từng từ.
  - Giữ nét chữ sắc cạnh, thanh thoát, không dùng hộp nền che khuất tranh vẽ bên dưới.

---

## 8. Kiến trúc kỹ thuật & Độc lập Component

- Runtime code của template nằm trong `src/templates/illustrated-paper-textured/`.
- Runtime registry đặt tại `src/templates/registry.tsx`; danh sách ID và scene kinds đặt tại `src/templates/manifest.json`.
- Template `vintage-editorial` được cô lập trong `src/templates/vintage-editorial/`.
- Composition dùng chung tại `src/core/VideoComposition.tsx`, lấy scene renderer, màu nền và caption theme từ registry.
- Mọi nội dung dữ liệu đều được truyền động qua JSON (`src/generated/current-project.json`), hoàn toàn độc lập với câu chuyện gốc và tái sử dụng cho bất kỳ chủ đề video nào.
