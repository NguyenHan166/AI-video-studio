# AI Video Studio — Starter cho Google Antigravity và Remotion

Đây là **starter hoạt động theo cấu trúc dự kiến**, không phải ứng dụng hoàn thiện. Có một template Vintage Editorial với 7 kiểu scene, SRT parser, render timeline và hai Antigravity Agent Skills.

## 1. Chuẩn bị Windows
Cài Antigravity: https://antigravity.google/download
Cài Node.js LTS: https://nodejs.org/en/download
Cài Git: https://git-scm.com/downloads/win
Cài FFmpeg: https://ffmpeg.org/download.html (thêm `ffmpeg`, `ffprobe` vào PATH)

Giải nén tệp ZIP vào `D:\` để có thư mục `D:\AI-Video-Studio`, sau đó mở PowerShell trong thư mục này:

```powershell
node -v
npm -v
ffmpeg -version
npm install
npm run prepare:demo
npm run check
npm run studio
```

Remotion Studio sẽ hiện địa chỉ localhost trong Terminal. Demo chạy **không có lời đọc** và dùng placeholders khi chưa có hình.

## 2. Tạo dự án có SRT và MP3 thật
- Đặt `input/voice.srt`, `input/voice.mp3`.
- Có thể viết mô tả nội dung vào `input/brief.md`; trong chat yêu cầu Agent đọc file này để chọn hình ảnh/scene.
- Đặt ảnh `*.jpg/png/webp` vào `input/assets` (nếu có).
- Đảm bảo audio và SRT gần như bằng thời lượng, lệch >0.5s cần kiểm tra.

```powershell
npm run prepare -- --topic "Sa Pa thập niên 1990" --srt input/voice.srt --audio input/voice.mp3 --assets input/assets --slug sapa-xua
npm run check
npm run studio
```

Khi hài lòng:

```powershell
npm run render
```

Xuất video: `output/<slug>.mp4` (ví dụ `output/sapa-xua.mp4`; tránh ghi đè video khác).

Nếu không có MP3, bỏ `--audio input/voice.mp3`; video xuất sẽ không có giọng đọc.

## 3. Mở dự án trong Antigravity
- Mở Antigravity > New Project > Add Folder > chọn `D:\AI-Video-Studio` > Create > Local Mode.
- Agent tự tìm hai skills trong `.agents/skills/`.
- Gõ `/create-video` và yêu cầu dùng `input/voice.srt`, `input/voice.mp3`, template `vintage-editorial`.
- Nếu muốn Agent phân tích video gốc để hoàn thiện template: `/learn-video-style` dùng `references/sapa-reference.mp4`.
- Đặt Terminal Command Auto Execution = Request Review trong giai đoạn đầu; chỉ cho phép các lệnh bạn xem xét.

## 4. Những phần chưa tự động hóa hoàn toàn trong starter
- `prepare-project.mjs` mới gom scene bằng quy tắc thời gian. AI Agent phải biên tập lại storyboard để đẹp và đúng nội dung.
- Chưa tự tải/tạo ảnh; Agent có thể tìm qua trình duyệt/công cụ theo quyền được cấp, và lưu giấy phép.
- Subtitle hiện theo câu. Karaoke tô màu **từng từ** cần timestamp theo từng từ, SRT đơn thuần không cung cấp điều này.
- Component đang hiển thị ảnh tĩnh; khi dùng video tư liệu, Agent cần bổ sung `OffthreadVideo`/`Video`.
- Chưa có bảo đảm tự động phát hiện tràn chữ bằng computer vision; Agent phải render/kiểm tra các khung hình.
- Chưa xác minh npm install/render trong môi trường tạo ZIP (không kết nối npm registry); cần chạy trên máy Windows của bạn.

## 5. Thông số
- Composition: `EditorialVideo`, 1080x1920, 30fps.
- Template: `templates/vintage-editorial/STYLE.md`
- Input timeline: `src/generated/current-project.json`
- Skills: `.agents/skills/create-video/SKILL.md`, `.agents/skills/learn-video-style/SKILL.md`
- Assets local: `public/media/<slug>/`

## 6. Lỗi thường gặp
- `node/npm not recognized`: cài Node.js, mở lại Terminal.
- `ffmpeg not recognized`: thêm thư mục chứa ffmpeg.exe vào PATH.
- `execution of scripts is disabled`: chuyển Terminal sang Command Prompt rồi chạy các lệnh npm như bình thường; tránh tùy tiện thay đổi policy toàn máy.
- `ERR_MODULE_NOT_FOUND`: chạy lại `npm install` sau khi đã kết nối mạng.
- Chrome/Chromium render lỗi: đọc log CLI; kiểm tra antivirus và để Agent cài browser/chromium được Remotion yêu cầu.
- Ảnh không hiển thị: dùng đường dẫn relative trong `public/media`, chạy `npm run check`.
