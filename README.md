# Hệ Thống Quản Lý Lịch Trình & Thông Báo Lịch Nội Bộ

Trang web tĩnh hoàn chỉnh viết bằng **HTML5, CSS3, JavaScript (ES6)** dùng để quản lý lịch trình, phân công công việc và gửi thông báo lịch cho từng nhân viên nội bộ mà không cần cài đặt backend phức tạp.

---

## 🌟 Các Chức Năng Nổi Bật

1. **Quản lý Nhân Sự Nội Bộ**:
   - Thêm, xóa và quản lý thông tin nhân sự (Họ tên, bộ phận, email, số điện thoại, avatar màu sắc riêng).
   - Lọc nhanh lịch trình theo từng người: Chọn nhân viên A sẽ hiển thị lịch trình riêng của nhân viên A kèm số lượng sự kiện đang phụ trách.

2. **Quản lý Lịch Trình Đa Dạng**:
   - Tạo lịch với đầy đủ thuộc tính: Tiêu đề, phân loại (Họp, Công tác, Deadline, Ca trực, Sự kiện chung), mức độ ưu tiên (Bình thường, Quan trọng, Khẩn cấp), ngày giờ bắt đầu/kết thúc, địa điểm/link online, người phụ trách và ghi chú chi tiết.
   - Hỗ trợ gán một lịch trình cho một hoặc nhiều nhân sự cùng lúc.
   - Sửa, xóa hoặc tìm kiếm nhanh lịch trình theo từ khóa.

3. **Chế Độ Xem Linh Hoạt**:
   - **Chế độ Lịch Tháng (Calendar View)**: Giao diện trực quan dạng lưới lịch tháng, highlight ngày hiện tại, hiển thị tóm tắt sự kiện theo màu sắc danh mục, bấm trực tiếp vào ô ngày để tạo nhanh sự kiện.
   - **Chế độ Danh Sách (Agenda View)**: Nhóm sự kiện theo từng ngày chi tiết, hiển thị giờ giấc, địa điểm, thành viên phụ trách và các nút tương tác nhanh.

4. **Trung Tâm Thông Báo & Gửi Lịch Tức Thì**:
   - Chuông thông báo hiển thị số lượng sự kiện sắp tới.
   - Tự động sinh mẫu thông báo chuẩn chỉnh chuyên nghiệp cho từng lịch trình để **1-click Copy** gửi nhanh vào nhóm **Zalo / Skype / Telegram / Email** nội bộ.
   - Tích hợp **Web Notification API** của trình duyệt để nhắc nhở trực tiếp trên màn hình máy tính.

5. **Lưu Trữ & An Toàn Dữ Liệu**:
   - Dữ liệu được lưu trữ tự động trên `localStorage` của trình duyệt.
   - Có sẵn tính năng **Xuất dữ liệu (Export JSON)** và **Nhập dữ liệu (Import JSON)** để dễ dàng sao lưu hoặc chia sẻ file cho đồng nghiệp khác.

---

## 🚀 Hướng Dẫn Sử Dụng

1. **Khởi chạy trực tiếp**:
   - Chỉ cần nhấp đúp chuột vào tệp `index.html` để mở trên bất kỳ trình duyệt nào (Chrome, Edge, Firefox, Safari,...).
   - Không cần cài đặt Node.js hay web server.

2. **Cấu trúc thư mục**:
   ```
   NOIBO/
   ├── index.html         # Giao diện chính và các modal popup
   ├── css/
   │   └── style.css      # Toàn bộ định dạng giao diện, responsive
   ├── js/
   │   ├── store.js       # Quản lý dữ liệu LocalStorage, CRUD, Mock Data
   │   └── app.js         # Logic giao diện, lịch tháng, lọc người, thông báo
   └── README.md          # Tài liệu hướng dẫn
   ```
