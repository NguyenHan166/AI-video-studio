# Security review / boundaries (v2)

## Đã tăng cường

- **Không ghi đè**: từ chối mọi đầu ra có sẵn, alias path, input/output trùng nhau, cả kế hoạch/SRT; FFmpeg dùng `-n` (no-overwrite) thay vì `-y`.
- **Chống nhầm video**: `plan_version=2`, lưu SHA-256 và kích thước nguồn; `apply.py`, `verify.py`, wrapper kiểm lại hash. Đầu vào đổi 1 byte -> dừng.
- **Staged pipeline**: wrapper dựng và xác minh trong thư mục tạm riêng ở cùng ổ với đích, sau đó mới công bố toàn bộ tệp. Nếu bước dựng/verify lỗi, thư mục tạm được dọn, file kết quả chính không xuất hiện.
- **Publish chống ghi đè**: ưu tiên hard link độc quyền (atomic trên filesystem tương thích); fallback sang copy với `O_EXCL` khi filesystem không hỗ trợ. Không tuyên bố giao dịch nhiều file hoàn toàn atomic; rollback chỉ best effort nếu lỗi giữa lần công bố nhiều file.
- **Không dùng WAV cũ**: verifier yêu cầu `--wav` chính xác hoặc `--no-wav`, không đoán tên; wrapper luôn chỉ định file WAV duy nhất được sinh trong thư mục tạm.
- **Strict verify**: wrapper mặc định nghiêm ngặt. Nếu WAV không có hoặc không lấy được bằng chứng frame chuyển động thì dừng, trừ khi người dùng chủ động bật `--allow-inconclusive`.
- **Giới hạn giao thức media**: dùng FFmpeg whitelist `file,pipe,crypto,data` khi đọc media, tránh tự động gọi HTTP/TCP qua manifest/playlist. Không có mã tải package tự động hay telemetry trong skill.
- **Quyền ZIP**: phân quyền file 0644, thư mục 0755 (thay quyền quá rộng 0666/0777 trong bản nguồn).

## Còn giới hạn

- Skill là mã Python/FFmpeg thực thi cục bộ, **không** phải sandbox độc lập. Có thể đọc file được cấp quyền bởi tài khoản chạy Codex. Giữ cơ chế approvals/sandbox của Codex và hạn chế thư mục làm việc.
- File media cố ý gây lỗi có thể khai thác lỗ hổng của bản FFmpeg/Python/NumPy cũ: cần cập nhật các ứng dụng từ nguồn đáng tin. Skill không kiểm định chữ ký bộ cài.
- SHA-256 xác minh **tính nhất quán của nguồn với plan**, không chứng minh nguồn hoặc chính ZIP do nhà phát hành đáng tin ký số.
- Không chống được đối thủ có quyền sửa chính mã skill/trình FFmpeg hoặc quyền sửa dữ liệu sau khi công bố. Không nên cài skill vào thư mục cho người lạ ghi.
- Kiểm tra hình lấy mẫu các frame, **không** so toàn bộ từng frame; với footage gần như tĩnh có thể không đủ bằng chứng. Audio WAV được kiểm tra tại các biên đoạn và một số cửa sổ, không phải hash toàn bộ PCM gốc và PCM đầu ra.
- VFR được phát hiện bằng heuristic `r_frame_rate` so `avg_frame_rate`, không phải kiểm tra từng PTS. `--allow-vfr` là ngoại lệ nguy hiểm; nên chuyển bản sao nguồn sang CFR trước.
- Âm thanh nền, nhạc, tiếng ồn hoặc phụ âm nhỏ có thể đánh lừa phát hiện khoảng lặng dựa trên mức năng lượng. Luôn nghe/xem thử video cuối trước khi đăng.
- Chạy nhiều tiến trình cùng đích có thể xảy ra va chạm tên. Không ghi đè; công bố nhiều tệp và rollback không bảo đảm atomic toàn bộ tập tệp.

## Hướng dẫn vận hành

1. Trước khi sử dụng mã từ cộng đồng, kiểm tra `SKILL.md`, thư mục `scripts`, và dependency. Từ chối mọi yêu cầu xin Administrator, tải PowerShell, mở network hoặc tắt sandbox.
2. Dry-run trước để xem số đoạn bị xóa; dùng `--protect` để khóa vùng không được chạm.
3. Dùng `cut_silence.py` mặc định có strict verification và staged publishing.
4. Nếu strict fail, giữ nguyên file gốc và đọc báo lỗi; không bật `--allow-inconclusive` chỉ để ép được trạng thái thành công.
5. Kiểm tra nội dung nghe/nhìn bằng trình phát trước khi dùng để đăng công khai.
