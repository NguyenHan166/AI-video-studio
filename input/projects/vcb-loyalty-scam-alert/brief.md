# Brief: Điểm thưởng VCB Loyalty và đường link giả mạo

## Mục tiêu

Tạo video dọc khoảng 96 giây cho nhiều lứa tuổi, giúp người xem nhận ra tin nhắn giả mạo thông báo điểm thưởng, biết kênh thông báo Vietcombank đã công bố và biết phải làm gì nếu lỡ mở link hoặc nhập dữ liệu. Dùng template `cyber-security-alert` theo phong cách biên tập sáng, giấy ngà, chữ sans đậm, đỏ gạch cho cảnh báo và xanh sage cho thao tác an toàn.

## Người xem và giọng kể

- Khán giả phổ thông, gồm người ít kinh nghiệm công nghệ.
- Dẫn chuyện nhanh vừa phải, bình tĩnh, dễ hiểu; tạo căng thẳng bằng tình huống và nhịp dựng, không dùng hình ảnh kinh dị hay nhấp nháy.
- Không quy kết một tin nhắn cụ thể nếu chưa xác minh; không mô phỏng giao diện hoặc đường dẫn có thể bị hiểu là kênh ngân hàng thật.

## Góc kể

Mở bằng mâu thuẫn: chương trình điểm và thời hạn có thể là thông tin thật, nhưng link gửi kèm vẫn có thể là giả. Sau đó đi qua ba bước thường gặp: dụ bấm link, thu thập dữ liệu, tạo áp lực thời gian. Kết bằng các bước tự bảo vệ và xử lý sau sự cố.

## Dữ kiện cần giữ chính xác

- Vietcombank đăng cảnh báo về kênh thông báo điểm thưởng ngày 13/10/2026.
- Theo thông báo chính thức ngày 14/10/2026, điểm tích lũy trong năm 2025 hết hạn ngày 31/10/2026.
- Kênh thông báo điểm thưởng được công bố: OTT trong VCB Digibank và email từ miền `@info.vietcombank.com.vn`.
- Vietcombank nêu rõ không thông báo điểm thưởng qua SMS, cuộc gọi, ứng dụng nhắn tin/mạng xã hội; không gửi SMS hoặc email có chứa đường link.
- Đường link trông hợp lý hoặc thông tin chương trình trùng khớp không xác minh được người gửi.

## Giới hạn sản xuất

- Chỉ dùng minh họa do AI tạo trong package này; không dùng ảnh bài báo vì chưa xác định quyền sử dụng.
- Các hình là minh họa khái niệm, không phải ảnh chụp, bằng chứng, người thật hay giao diện Vietcombank.
- `voice.mp3` do người dùng cung cấp được dùng nguyên bản; không tự tạo, chỉnh sửa hoặc time-stretch voice.
- SRT kết thúc ở 96,40 giây; MP3 dài 98,90 giây (lệch 2,50 giây). Dùng chính sách `srt-authoritative`: timeline video theo SRT, phần audio sau mốc 96,40 giây nằm ngoài video xuất.
- Giữ nguyên nội dung và timestamp của `voice.srt` do người dùng cung cấp.
