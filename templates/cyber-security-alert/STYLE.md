# Cyber Security Alert — Style Specification v3.0

Template dọc cho cảnh báo lừa đảo, kiến thức an ninh mạng, tin tức về tội phạm số và hướng dẫn tự bảo vệ. Hệ thống lấy cảm hứng từ ngôn ngữ đồ họa của video tham chiếu, nhưng nội dung, dữ kiện, nhân vật, hình ảnh và câu chuyện của tham chiếu không được dùng làm nội dung cho video mới.

## 1. Phân tích video tham chiếu

- **Tệp:** `references/current-affairs-light/current-affairs-light.mp4`
- **Thông số đã đo bằng ffprobe:** 1080×1920, 30 fps, dài 54.36 giây, video AV1 và âm thanh AAC.
- **Cách lấy mẫu:** 11 khung hình cách nhau khoảng 5 giây, từ 0 đến 50 giây. Mốc cảnh dưới đây là ước lượng từ ảnh mẫu; chưa phân tích chính xác từng frame chuyển cảnh.

### Danh mục nhịp hình ảnh

| Khoảng ước lượng | Dạng trình bày | Đặc điểm quan sát |
| --- | --- | --- |
| 0–10 giây | Mở đầu / mục lục | Masthead mảnh ở trên, nhãn chủ đề, các mục đánh số lệch trái, tiêu đề lớn và nhiều khoảng giấy trống. |
| 10–20 giây | Thẻ bài viết + ảnh | Kicker nhỏ, tiêu đề đậm có cụm màu đỏ, mô tả ngắn, ảnh ngang đặt trong khung trắng có nhãn ảnh và dòng ghi nguồn. |
| 20–30 giây | Thẻ dữ kiện | Cùng masthead và tiêu đề biên tập; một con số/điểm dữ kiện nằm trong thẻ màu giấy, nhấn bằng vạch đỏ. Nhiều khoảng âm quanh thẻ. |
| 30–40 giây | Bài viết + postcard tiếp theo | Lặp bố cục tiêu đề, mô tả, ảnh và chú thích; ảnh thay đổi trong khi lưới, header và caption giữ ổn định. |
| 40–54 giây | Tổng kết / CTA | Trang tóm tắt, danh sách đánh số, thẻ kêu gọi hành động và khoảng trống lớn để duy trì nhịp đọc. |

Các mốc cảnh là gần đúng vì video chỉ được lấy mẫu định kỳ. Nội dung chủ đề trong ảnh được cố ý mô tả chung ở đây, không chép lại lời dẫn, tiêu đề hay dữ kiện của video.

## 2. Hệ thống thị giác

### Bố cục

- Khung 9:16, 1080×1920, 30 fps.
- Một masthead cố định ở đầu trang, đường kẻ mảnh, nhãn cảnh nhỏ và số trang dạng biên tập.
- Nội dung chính bắt đầu khoảng 160 px từ mép trên; cột số trang hẹp ở bên trái tạo cảm giác mục lục/hồ sơ.
- Lề nội dung tối thiểu 72 px; cột chính được lùi thêm để nhường chỗ cho rail. Giữ nội dung quan trọng xa mép phải để tránh vùng nút của nền tảng video.
- Chừa vùng dưới cho phụ đề và thanh giao diện mạng xã hội. Tránh đặt dữ kiện cốt lõi ở chân trang.
- Dùng khoảng trắng để phân nhịp; không lấp mọi vùng trống bằng họa tiết hoặc hiệu ứng.

### Màu sắc

Các giá trị là ước lượng thị giác từ video nén, không phải mã màu gốc được trích từ project nguồn.

| Vai trò | Token | Màu |
| --- | --- | --- |
| Giấy nền ngà | `paper` | `#F3F0E6` |
| Bề mặt sáng | `paperLight` | `#FBF9F2` |
| Chữ chính | `ink` | `#252321` |
| Chữ phụ | `inkSoft` | `#625E58` |
| Đỏ gạch biên tập / cảnh báo | `brick` | `#AC3031` |
| Viền giấy | `rule` | `#D8D1C4` |
| Hướng dẫn an toàn | `safety` | `#526B55` |

Đỏ dùng cho dấu hiệu cảnh báo, số thứ tự và cụm cần chú ý; xanh sage dịu dùng cho hành động phòng vệ. Màu không thay thế kiểm chứng: một màu xanh không chứng minh website hoặc tổ chức là thật. Không dùng nền tối toàn màn hình, glow neon, lưới HUD dày hoặc nhấp nháy.

### Typography

- Tiêu đề là sans-serif đậm, nét gọn, khoảng cách chữ hơi khít; stack triển khai là Arial/Inter/system sans. Font chính xác của video tham chiếu không thể xác định từ các frame đã nén.
- Cụm cuối của tiêu đề được nhấn đỏ gạch để tạo điểm nhìn giống cách tham chiếu tô màu từ khóa; câu chữ không bị đổi.
- Tiêu đề scene khoảng 54–70 px tùy độ dài; thân bài 21–30 px; mã/URL dùng monospace 24–30 px.
- Nhãn phân mục viết hoa, giãn chữ, màu đỏ hoặc xám; chỉ dùng cỡ nhỏ cho metadata, không dùng cỡ nhỏ cho cảnh báo, số tiền, hotline hay URL.
- Giữ nguyên dấu tiếng Việt, không ép toàn bộ nội dung thành chữ hoa. Tiêu đề dài được xuống dòng, không co chữ đến mức khó đọc.

## 3. Ảnh kiểu postcard

- Ảnh đặt trong matte trắng có mép đều, viền giấy mảnh, bóng đổ nhẹ, một nhãn tư liệu ở mép trên và nguồn ở dải chân ảnh khi project cung cấp.
- Độ nghiêng tối đa rất nhỏ để tạo cảm giác thẻ ảnh được đặt trên giấy; không dùng hiệu ứng lật, xé giấy hoặc rung.
- Crop ảnh sao cho giữ chủ thể và không che chi tiết thiết yếu. Nếu ảnh có text, kiểm tra nó còn đọc được sau khi thu nhỏ.
- Chỉ hiển thị media của project được chọn. Không tự dùng keyframe của video tham chiếu làm tài sản sản xuất.
- Không gắn nhãn “ảnh thật”, “bằng chứng” hoặc tên nguồn nếu project không khai báo. Hình mô phỏng phải có nhãn mô phỏng rõ ràng.

## 4. Chuyển động và nhịp dựng

- Chuyển cảnh theo beat nội dung, không theo từng cue SRT. Một scene có thể bao trùm nhiều cue.
- Dùng fade/slide lên nhẹ khoảng 10–16 px, xuất hiện lần lượt giữa tiêu đề và thẻ. Spring có giảm chấn cao để không nảy mạnh.
- Ảnh và thẻ gần như đứng yên; nếu có chuyển động máy thì chỉ dùng zoom/pan rất nhẹ. Không flash đỏ, glitch, shake, pulse liên tục hoặc chuyển động HUD làm người xem mất tập trung.
- Giữ khung đồ họa ổn định qua các scene, thay đổi tiêu đề, ảnh, số liệu và nhãn để tạo nhịp.

## 5. Phụ đề

- Phụ đề căn giữa ở vùng thấp phía trên footer, chữ sans đậm màu mực tối, có viền sáng mềm để dễ đọc trên nền ảnh và giấy.
- Cỡ chữ thay đổi theo độ dài cue; không thu nhỏ quá mức khi câu dài.
- Chỉ tô từ đang đọc màu đỏ khi caption có `wordTimings` thật. SRT thông thường giữ nguyên cue và thời gian câu; không tự chia từ hoặc giả lập karaoke.
- Caption timing lấy từ SRT. Không kéo giãn hoặc sửa giọng đọc để khớp trang trí hình ảnh.

## 6. Thư viện scene của template

| Scene type | Bố cục dùng lại | Dữ liệu và giới hạn |
| --- | --- | --- |
| `cyber-hook` | Tiêu đề mở đầu, nhãn cảnh báo, tình huống/trích dẫn mô phỏng hoặc postcard tùy chọn. | Nội dung lấy từ project; câu giả lập phải có nhãn mô phỏng. Không tự thêm số liệu hay mức độ nguy hiểm. |
| `cyber-fake-chat` | Thẻ hội thoại dạng điện thoại trên nền giấy, sender, bubble, URL mẫu và nhãn mô phỏng. | Dùng người gửi/link giả lập; ưu tiên miền `.invalid`/`.example`; không tạo QR hoặc link hoạt động. |
| `cyber-anatomy` | Các bước đánh số theo thứ tự dọc, tiêu đề ngắn và mô tả. | Chỉ trình bày bước có trong project; không ép mọi vụ lừa đảo thành cùng một chuỗi. |
| `cyber-red-flags` | Danh sách thẻ cảnh báo, số thứ tự đỏ và nội dung dễ quét. | Dấu hiệu giúp kiểm tra thêm, không được trình bày như bằng chứng chắc chắn nếu thiếu căn cứ. |
| `cyber-compare` | Hai thẻ ví dụ xếp dọc, nhãn rõ, domain monospace, ghi chú kiểm chứng. | Không gọi domain là “chính chủ” nếu chưa có nguồn xác minh. Giá trị mặc định chỉ là miền ví dụ. |
| `cyber-loss-stat` | Thẻ con số lớn, nhãn phạm vi, mô tả và nguồn. | Không có thống kê mặc định; thiếu số liệu thì chỉ giữ tiêu đề và không dựng con số. |
| `cyber-shield-defense` | Checklist thẻ xanh sage, số thứ tự, việc làm cụ thể. | Lấy khuyến nghị từ project và nguồn của project; tránh cam kết bảo vệ tuyệt đối. |
| `cyber-hotline` | Thẻ liên hệ và CTA cuối. | Chỉ hiện hotline/website khi project cung cấp. Không điền số liên hệ mặc định. |

Mỗi loại scene có thể nhận một `scene.images[0]` để thêm postcard sau phần nội dung. Ảnh vẫn là tùy chọn; template phải dùng được với nội dung chỉ có chữ. `scene.imageLabel` cho phép thay nhãn mặc định, ví dụ `MINH HỌA AI`, để phân biệt hình tạo sinh với ảnh tư liệu hoặc ảnh chụp giao diện.

## 7. Ràng buộc nội dung và kiểm tra

- SRT quyết định thời điểm thoại và phụ đề. Ghép nhiều cue thành nhịp nghĩa phù hợp; không coi một cue là một scene.
- Giữ nguyên media đầu vào; dùng nguồn được cấp phép hoặc do người dùng cung cấp và ghi manifest nguồn/license.
- Không suy diễn tính thật của tài khoản, website, thống kê, tổ chức hoặc đường dây nóng từ màu sắc hay nhãn trình bày.
- Bản triển khai cố ý diễn giải phong cách thay vì dựng lại từng pixel; nhịp chuyển cảnh chính xác của nguồn chưa được đo frame-by-frame.
- Các keyframe phân tích được giữ trong `references/cyber-security-alert/keyframes/`; video gốc nằm nguyên trong `references/current-affairs-light/`.

## 8. Thành phần

- Tokens: `src/templates/cyber-security-alert/theme.ts`
- Thành phần dùng chung của template: `src/templates/cyber-security-alert/EditorialPrimitives.tsx`
- Scene components và router: `src/templates/cyber-security-alert/Scene.tsx`
- Registry và caption theme: `src/templates/registry.tsx`
- Caption overlay dùng chung: `src/core/CaptionOverlay.tsx`
