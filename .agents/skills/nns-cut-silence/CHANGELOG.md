# Changelog

## 2.0.0 — Safe Codex edition (2026-10-21)

- Nâng plan version từ 1 -> 2, bổ sung SHA-256 và source-size; kiểm tra lại trước xử lý/xác minh.
- Chuyển khỏi `ffmpeg -y` sang `-n`; chống mọi xung đột đường dẫn và file đã tồn tại.
- Wrapper dựng ở thư mục tạm; chạy verify xong mới công bố kết quả theo chế độ no-replace.
- Không tự đoán WAV; `verify.py` bắt buộc `--wav` hoặc `--no-wav`, thêm `--strict`.
- `--no-wav`, `--no-video-check` yêu cầu `--allow-inconclusive` khi dùng wrapper.
- Sửa false negative của tương quan chéo đối với âm lặp chu kỳ bằng ưu tiên độ trễ 0 nếu tương đương thống kê.
- Ràng buộc giao thức đầu vào FFmpeg; remap không ghi đè file cũ.
- Thêm test regression (unittest), hướng dẫn Codex trên Windows và tài liệu giới hạn bảo mật.
- Giữ các tài liệu tham khảo kỹ thuật gốc, thay SKILL.md để không đưa ra khẳng định vượt bằng chứng và không để agent tự cài công cụ.

## Local AI Video Studio integration (2026-10-21)

- Added project-specific boundaries for the standalone utility.
- Kept the media-processing scripts and dependency list unchanged.
