# VIDEO BRIEF — Quà tặng 20/10 biến thành bẫy lừa đảo trên mạng

## A. Thông tin chính
- **Chủ đề:** Cảnh báo lừa đảo trực tuyến núp bóng quà tặng và khuyến mãi nhân Ngày Phụ nữ Việt Nam 20/10.
- **Bài gợi ý:** https://tapchianninhmang.vn/qua-tang-20-10-bien-thanh-bay-lua-dao-tren-mang
- **Trạng thái nguồn:** Bài của Tạp chí An ninh mạng Việt Nam có kết quả tìm kiếm ghi ngày 19/10/2026 và tóm tắt về giả mạo thương hiệu, khuyến mãi ảo, đường link độc hại. Trang gốc chặn đọc tự động toàn văn (403). Kịch bản này được biên soạn độc lập từ chủ đề + nguồn Công an, KHÔNG tự nhận là trích nguyên văn/đầy đủ bài báo.
- **Người xem:** Người dùng Facebook, Zalo, TikTok, người mua hàng online, đặc biệt dịp 20/10.
- **Nền tảng:** Facebook Reels / TikTok / Shorts.
- **Template vận hành có sẵn:** `vintage-editorial` (starter trước đó). **Hướng thẩm mỹ:** `cybersecurity-editorial` theo `templates/cybersecurity-editorial/STYLE.md` — nếu chưa tồn tại trong engine, Agent phải triển khai theme/components trước; không được chỉ đổi tên chuỗi JSON rồi báo đã hoàn thành.
- **Định dạng:** 1080×1920, 30 FPS, H.264, MP4.
- **Thời lượng:** SRT dự thảo 90 giây; khi có SRT/MP3 thật, timeline theo file thật, không ép thời lượng cố định.
- **Giọng kể:** Cảnh báo rõ ràng, bình tĩnh, nghiêm túc nhưng không giật gân; TTS do người dùng tự tạo.
- **Nhạc:** Không lời điện tử tối giản, căng thẳng nhẹ; thấp hơn giọng đọc. Chỉ dùng nhạc có quyền sử dụng phù hợp.

## B. Thông điệp
**Một lời mời nhận quà miễn phí có thể là cách dụ người dùng bấm link giả, cung cấp thông tin, chuyển phí hoặc tham gia nhiệm vụ chuyển tiền.** Cần kiểm tra nguồn, tránh bấm link lạ, không đưa mật khẩu/OTP, giữ bằng chứng và báo ngân hàng/Công an nếu nghi ngờ bị lừa.

## C. Các nhóm thông tin đã đối chiếu
1. Giả mạo nhãn hàng, fanpage, thông báo trúng thưởng/tặng quà 20/10; lôi kéo sang nhóm chat và "làm nhiệm vụ" nhận hoa hồng — Công an Gia Lai (2024).
2. Quà 0 đồng, mã QR và liên kết dẫn tới web giả hoặc ứng dụng rủi ro — Công an Phú Thọ (02/06/2026) và Công an An Giang (30/03/2026).
3. Không cung cấp mật khẩu, OTP; không quét QR lạ; không cài ứng dụng từ người lạ; báo Công an gần nhất — Bộ Công an (08/09/2026).
4. Bài báo gốc năm 2026 xác thực được tít, chủ đề và đoạn mô tả ngắn từ chỉ mục tìm kiếm; KHÔNG khẳng định đã đọc đủ bài.

## D. Hạn chế bắt buộc
- **SRT chỉ là bản demo** để xem bố cục; thay bằng SRT thật từ TTS trước render phát hành. Khớp SRT với MP3 bằng ffprobe / căn chỉnh lại nếu lệch; không thay đổi tốc độ MP3.
- Không bịa tên nhãn hàng bị giả mạo; sử dụng logo/brand trung tính như `SHOP ABC (minh họa)` hoặc không cần logo.
- Mọi điện thoại, web giả, QR trên màn hình phải là **mô phỏng không hoạt động**: không chứa địa chỉ độc hại, không có mã QR quét được, không hiển thị OTP/thông tin ngân hàng thật.
- Gắn nhãn **"Tình huống minh họa"** cho UI giả lập, không biến hình giả thành bằng chứng vụ án thật.
- Không bịa số vụ việc, số tiền thiệt hại, tên nạn nhân hoặc phát biểu của cơ quan chức năng.
- Thể hiện "có thể" với hình thức thủ đoạn; không khiến người xem hiểu rằng mọi chương trình tặng quà 20/10 đều lừa đảo.
- Không nhập liệu/cài ứng dụng từ link không rõ nguồn gốc để quay màn hình. Có thể dựng mockup bằng HTML/Remotion.
- Không thay lời thoại SRT của người dùng; xử lý những câu dài bằng typography cô đọng ở layer hình ảnh, không tự rút ngắn phụ đề.

## E. Lệnh dùng với Antigravity
Dùng `/create-video`; đọc `input/brief.md`, `input/media-plan.md`, `input/production.json`, `input/sources.md` và `templates/cybersecurity-editorial/STYLE.md`.
Hãy lập lại storyboard theo cue thật, ưu tiên UI minh họa dựng từ Remotion (không cần ảnh web khi không có ảnh có quyền sử dụng). Chỉ dùng số liệu khi có nguồn kiểm chứng. Render preview các phân cảnh tiêu biểu và rà soát vấn đề an toàn trước khi xuất MP4.

## F. Sản phẩm cần xuất
- Video `output/qua-tang-20-10-bay-lua-dao.mp4`.
- Storyboard và project JSON có thời lượng dựa trên SRT thật.
- `output/asset-manifest.json`: mỗi media kèm nguồn, tác giả/giấy phép hoặc nhãn tự tạo.
- Preview frames + kết quả kiểm tra chất lượng.
