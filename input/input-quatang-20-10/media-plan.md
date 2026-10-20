# MEDIA PLAN — Cảnh báo quà tặng 20/10

**Ưu tiên:** Dùng thành phần UI/vector dựng bằng Remotion hơn là tìm ảnh thật trên web. Tạo giao diện minh họa của điện thoại, thông báo, fanpage, chat, QR giả không thể quét, biểu tượng quà tặng, khóa, khiên. Điều này vừa đúng chủ đề vừa giúp tránh vấn đề bản quyền.

## Phân cảnh đề xuất (mapping theo SRT dự thảo, thời gian cuối phải căn MP3 thật)

### 1. Bạn vừa nhận QUÀ TẶNG? — cue 1–2 (00:00:00,000–00:00:13,500 bản nháp)
- Kiểu: `hero-hook`.
- Nội dung hiển thị: Hộp quà 3D tối giản / notification "Quà đặc biệt" bị phủ lớp cảnh báo.
- Overlay: `Tình huống minh họa` nếu có mockup tin nhắn, QR, mạng xã hội.
- Animation: stagger nhẹ (0,15–0,35s); pan/scale rất hạn chế; card hiện theo lời đọc.

### 2. FANPAGE GIẢ MẠO — cue 3–3 (00:00:13,500–00:00:21,900 bản nháp)
- Kiểu: `comparison`.
- Nội dung hiển thị: Hai thẻ fanpage trung tính: chính thức vs giả mạo, không logo thật.
- Overlay: `Tình huống minh họa` nếu có mockup tin nhắn, QR, mạng xã hội.
- Animation: stagger nhẹ (0,15–0,35s); pan/scale rất hạn chế; card hiện theo lời đọc.

### 3. TỪ QUÀ TẶNG ĐẾN CÁI BẪY — cue 4–5 (00:00:21,900–00:00:36,200 bản nháp)
- Kiểu: `timeline`.
- Nội dung hiển thị: Sơ đồ: Quà 0đ → Nhóm chat → QR/link → Phí/nhiệm vụ.
- Overlay: `Tình huống minh họa` nếu có mockup tin nhắn, QR, mạng xã hội.
- Animation: stagger nhẹ (0,15–0,35s); pan/scale rất hạn chế; card hiện theo lời đọc.

### 4. NHỮNG THÔNG TIN KHÔNG ĐƯỢC CHIA SẺ — cue 6–7 (00:00:36,200–00:00:49,400 bản nháp)
- Kiểu: `statistic-no-numbers`.
- Nội dung hiển thị: Thẻ UI: chuyển khoản, mật khẩu, OTP; khóa bảo vệ xuất hiện.
- Overlay: `Tình huống minh họa` nếu có mockup tin nhắn, QR, mạng xã hội.
- Animation: stagger nhẹ (0,15–0,35s); pan/scale rất hạn chế; card hiện theo lời đọc.

### 5. 3 ĐIỀU PHẢI NHỚ — cue 8–10 (00:00:49,400–00:01:09,200 bản nháp)
- Kiểu: `checklist`.
- Nội dung hiển thị: Card 1: Xác minh; Card 2: Không OTP; Card 3: Không QR/link lạ.
- Overlay: `Tình huống minh họa` nếu có mockup tin nhắn, QR, mạng xã hội.
- Animation: stagger nhẹ (0,15–0,35s); pan/scale rất hạn chế; card hiện theo lời đọc.

### 6. NẾU ĐÃ LỠ THAO TÁC... — cue 11–12 (00:01:09,200–00:01:22,700 bản nháp)
- Kiểu: `action-steps`.
- Nội dung hiển thị: Callout: ngân hàng chính thức, đổi mật khẩu, lưu bằng chứng, trình báo.
- Overlay: `Tình huống minh họa` nếu có mockup tin nhắn, QR, mạng xã hội.
- Animation: stagger nhẹ (0,15–0,35s); pan/scale rất hạn chế; card hiện theo lời đọc.

### 7. ĐỪNG ĐỂ QUÀ ẢO THÀNH THIỆT HẠI THẬT — cue 13–13 (00:01:22,700–00:01:30,000 bản nháp)
- Kiểu: `ending`.
- Nội dung hiển thị: Hộp quà đóng lại; biểu tượng khiên; thông điệp chia sẻ cảnh báo.
- Overlay: `Tình huống minh họa` nếu có mockup tin nhắn, QR, mạng xã hội.
- Animation: stagger nhẹ (0,15–0,35s); pan/scale rất hạn chế; card hiện theo lời đọc.

## Nhóm media bổ sung (tùy chọn)
- Ảnh người cầm điện thoại xem ưu đãi, biểu cảm lưỡng lự (stock có bản quyền hợp lệ).
- Ảnh hộp quà/hoa dịp 20/10 và điện thoại trên bàn (nên tự tạo bằng shape/ảnh tự sở hữu).
- Ảnh màn hình điện thoại **đã được ẩn dữ liệu cá nhân** hoặc thiết kế giả lập 100% bằng component.

## Không được làm
- Không tải/sử dụng ảnh logo nhãn hàng cụ thể để mô phỏng đang lừa đảo.
- Không hiển thị link lừa đảo thật hoặc mã QR có khả năng quét.
- Không tự mô phỏng chứng cứ giả gắn vào vụ án có thật.
- Không cho AI tự tạo hình ảnh hoảng loạn, người phạm tội bị còng tay như thể đã có vụ việc cụ thể.
- Không dùng hình ảnh bản quyền của bài báo gốc nếu chưa có quyền.

## Cấu trúc đề xuất
`input/assets/` chứa ảnh thật do người dùng cấp và có giấy phép. Các mockup UI tự dựng bằng code, lưu nội bộ hoặc trong `public/illustrations/` với manifest ghi nguồn `self-generated`.
