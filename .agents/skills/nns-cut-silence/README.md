# nns-cut-silence — Codex-ready Safe Edition v2

## Tích hợp trong AI Video Studio

Skill được cài tại .agents/skills/nns-cut-silence/. Đây là tiện ích chỉnh video độc lập, không phải bước mặc định của create-video. Không dùng trên input/projects/, file giọng đọc hoặc SRT của project, hay video Remotion đã render. Chỉ dùng khi có yêu cầu riêng để tạo bản cắt mới từ video độc lập nằm trong workspace; giữ nguyên nguồn và lưu kết quả mới dưới output/<slug>/. Đọc AGENTS.md và SKILL.md trước khi chạy. Không tự cài Python, NumPy, FFmpeg hoặc FFprobe.

Bộ skill Python + FFmpeg để cắt khoảng lặng trong **video có tiếng**. Đã gia cố bảo vệ file gốc, nhận diện nhầm nguồn bằng SHA-256, xác minh tiếng/hình, tránh dùng WAV cũ và chạy pipeline trong thư mục tạm trước khi công bố kết quả.

## Cài đặt trong project

Skill đã được tích hợp tại .agents/skills/nns-cut-silence/. Không giải nén lại ZIP vào thư mục skill toàn cục và không cài dependency trong bước tích hợp. Khi được yêu cầu dùng skill, Python 3.10+, NumPy, FFmpeg và FFprobe phải sẵn có; nếu thiếu, dừng và báo lại thay vì tự cài.

## Cách dùng

```powershell
$script = '.agents\skills\nns-cut-silence\scripts\cut_silence.py'
python $script --video 'input\standalone-video.mp4' --out 'output\standalone\standalone-video-cut.mp4' --dry-run
python $script --video 'input\standalone-video.mp4' --out 'output\standalone\standalone-video-cut.mp4'
```

Nếu muốn nhịp thở dài hơn: `--keep 0.16`; bảo vệ vùng đặc biệt: `--protect '12.5-19,44-50'`.

Kết quả mặc định:

- `raw-cut.mp4`: video cắt đã kiểm tra.
- `raw-cut.wav`: PCM không mất dữ liệu (từ tín hiệu nguồn sau giải mã).
- `raw-cut.plan.json`: thông số, SHA-256 nguồn, đoạn giữ/đoạn bỏ.
- `raw-cut.plan.timemap.json`: ánh xạ thời gian cho SRT, hiệu ứng, overlay.

Thêm `--out` với **tên chưa từng tồn tại**. Pipeline không chấp nhận ghi đè video, WAV, plan hay timemap cũ.

## Kiểm thử

Trong thư mục skill:

```powershell
python -m unittest discover -s tests -v
```

Kiểm thử bao gồm cả FFmpeg/NumPy (nếu có) và các ca bảo vệ đường dẫn, xung đột file, mã SHA-256, kiểm tra WAV và quy trình đầu-cuối.

## Cần biết

- Các file `plan.json` phiên bản v1 không dùng được với v2 vì không có SHA-256. Tạo plan mới từ video gốc.
- Video VFR, âm thanh nhiều nhạc nền hoặc cảnh tĩnh có thể cần can thiệp thủ công. Việc cắt khoảng lặng không tương đương nhận dạng lời nói (VAD).
- Strict mode không chấp nhận xác minh thiếu WAV hay không phân biệt được frame hình. Chỉ sử dụng `--allow-inconclusive` khi biết chính xác kiểm chứng nào thiếu.
- Cắt khoảng lặng có thể làm thay đổi nhịp kể chuyện và ảnh hưởng mốc đồng bộ B-roll/phụ đề; hãy xem lại toàn bộ video sau cắt.
- Đường dẫn nguồn là file cục bộ; không có chức năng tải media lên mạng. Những thư viện/FFmpeg được cài trong máy vẫn thuộc chuỗi tin cậy riêng.
- Giấy phép của mã nguồn ban đầu **chưa được cung cấp** trong ZIP; bản chỉnh sửa này không tự ý cấp lại giấy phép mã nguồn của bên thứ ba.

## Thay đổi so với bản được chia sẻ

Xem `CHANGELOG.md` và `SECURITY.md`.
