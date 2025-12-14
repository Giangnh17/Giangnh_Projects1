# 📚 Trang web Quản lý thư viện sách Sarly

## 🎯 Tổng quan dự án
Hệ thống quản lý thư viện hiện đại với giao diện tiếng Việt, được xây dựng bằng Spring Boot và Thymeleaf với thiết kế Vintage Academia.

---

## 📁 Cấu trúc thư mục

```
FE/
├── src/main/resources/
│   ├── templates/                 # Thymeleaf HTML Templates
│   │   ├── auth-login.html           # Trang đăng nhập
│   │   ├── auth-login-preview.html   # Trang đăng nhập (xem trực tiếp)
│   │   ├── auth-register.html        # Trang đăng ký
│   │   ├── index.html                # Trang chủ - Dashboard
│   │   ├── book-detail.html          # Chi tiết sách
│   │   └── book-form.html            # Form thêm/sửa sách
│   │
│   └── static/
│       ├── css/                   # Style Sheets
│       │   ├── shared.css             # CSS chung cho tất cả trang
│       │   ├── auth-login.css         # CSS riêng cho trang đăng nhập
│       │   ├── auth-register.css      # CSS riêng cho trang đăng ký
│       │   ├── index.css              # CSS riêng cho trang chủ
│       │   ├── book-detail.css        # CSS riêng cho trang chi tiết sách
│       │   └── book-form.css          # CSS riêng cho trang form sách
│       │
│       └── js/                    # JavaScript Modules
│           ├── app.js                 # Controller chính - điều khiển ứng dụng
│           ├── data.js                # Dữ liệu mock và constants
│           ├── auth.js                # Xử lý đăng nhập/đăng ký
│           ├── dashboard.js           # Chức năng trang chủ
│           ├── book-detail.js         # Chức năng chi tiết sách
│           ├── book-form.js           # Chức năng form sách
│           ├── utils.js               # Tiện ích chung và helpers
│           └── main.js                # File cũ (có thể xóa)
│
└── README.md                      # File này
```

---

## 🎨 Hệ thống CSS

### **Kiến trúc CSS Modular**
- **shared.css**: CSS variables, reset, components chung
- **[page].css**: CSS riêng cho từng trang cụ thể

### **Màu sắc chính (Vintage Academia Theme)**
```css
--color-background: #F5F1E6    /* Nền chính - màu kem cổ điển */
--color-surface: #EFEBE9       /* Nền thẻ/card */
--color-primary-text: #3E2723  /* Chữ chính - nâu đậm */
--color-accent: #5D4037        /* Màu nhấn - nâu vừa */
--color-primary-btn: #4E342E   /* Nút chính */
--color-primary-hover: #6D4C41 /* Nút hover */
```

### **Typography**
- **Headings**: Century Schoolbook (font serif việt hóa)
- **Body**: Source Sans Pro (font sans-serif hiện đại)
- **Hỗ trợ đầy đủ**: Dấu tiếng Việt và ký tự đặc biệt

---

## ⚡ Hệ thống JavaScript

### **Kiến trúc Module**
Thay vì 1 file `main.js` lớn, giờ được chia thành 7 modules chuyên biệt:

| Module | Chức năng | Phụ thuộc |
|--------|-----------|-----------|
| **app.js** | Controller chính, khởi tạo ứng dụng | Tất cả modules khác |
| **data.js** | Dữ liệu mock, constants, config | Không |
| **auth.js** | Đăng nhập, đăng ký, validation | utils.js |
| **dashboard.js** | Trang chủ, bảng sách, tìm kiếm, lọc | data.js, utils.js |
| **book-detail.js** | Hiển thị chi tiết sách, history | data.js, utils.js |
| **book-form.js** | Form thêm/sửa sách, validation | data.js, utils.js |
| **utils.js** | Tiện ích chung, notifications, helpers | Không |

### **Cách import vào HTML**
```html
<!-- Thứ tự import quan trọng! -->
<script src="/src/main/resources/static/js/data.js"></script>
<script src="/js/utils.js"></script>
<script src="/js/auth.js"></script>
<script src="/js/dashboard.js"></script>
<script src="/js/book-detail.js"></script>
<script src="/js/book-form.js"></script>
<script src="/js/app.js"></script> <!-- Cuối cùng -->
```

---

## 🔧 Tính năng chính

### **🔐 Authentication**
- Đăng nhập với demo accounts
- Đăng ký với validation realtime
- Kiểm tra username availability

### **📊 Dashboard**
- Hiển thị danh sách sách dạng bảng
- Tìm kiếm realtime (title, author, ISBN)
- Lọc theo category và status
- Thống kê số lượng sách

### **📖 Book Management**
- Chi tiết sách đầy đủ thông tin
- Lịch sử mượn trả
- Thêm/sửa/xóa sách
- Form validation comprehensive

### **🎯 UX/UI Features**
- Responsive design (mobile-friendly)
- Animations và transitions mượt
- Notifications system
- Keyboard shortcuts (Ctrl+K search)
- Error handling user-friendly

---

## 🚀 Cách chạy dự án

### **1. Chạy qua Spring Boot Server (Khuyến nghị)**
```bash
# Di chuyển vào thư mục dự án
cd FE

# Chạy Spring Boot application
./mvnw spring-boot:run

# Hoặc với Maven đã cài đặt
mvn spring-boot:run

# Truy cập: http://localhost:8080
```

### **2. Xem trực tiếp file HTML**
```bash
# Mở file HTML trực tiếp từ thư mục
# File auth-login-preview.html có CSS inline để xem trực tiếp
# Các file khác cần server để load CSS external
```

---

## 🔄 Demo Accounts

| Username | Password | Role | Mô tả |
|----------|----------|------|--------|
| `admin` | `admin` | Admin | Quyền quản trị viên |
| `librarian` | `lib123` | Librarian | Nhân viên thư viện |

---

## 🎯 Kế hoạch phát triển

### **✅ Đã hoàn thành**
- [x] Thiết kế UI/UX hoàn chỉnh
- [x] Modular CSS architecture
- [x] Modular JavaScript architecture  
- [x] Vietnamese localization
- [x] Responsive design
- [x] Basic CRUD operations
- [x] Form validation
- [x] Search & filter functionality

### **🔄 Đang phát triển**
- [ ] Backend API integration
- [ ] Database persistence
- [ ] User role management
- [ ] Advanced search features

### **📋 Tương lai**
- [ ] PDF export functionality
- [ ] Email notifications
- [ ] Advanced reporting
- [ ] Multi-language support

---

## 🛠️ Technologies

| Category | Technology | Version | Purpose |
|----------|------------|---------|---------|
| **Backend** | Spring Boot | 3.x | Web framework |
| **Template** | Thymeleaf | 3.x | Server-side rendering |
| **Frontend** | HTML5, CSS3, JavaScript | ES6+ | Client-side |
| **Fonts** | Google Fonts | - | Typography |
| **Icons** | Text-based | - | Simple & fast |

---

## 📞 Liên hệ & Hỗ trợ

- **Developer**: Giangnh
- **Project**: End Project - FE
- **Framework**: Spring Boot + Thymeleaf
- **Theme**: Vintage Academia Library

---

## 📝 Ghi chú quan trọng

1. **CSS Loading**: File CSS external chỉ hoạt động qua server
2. **JavaScript Dependencies**: Thứ tự import JS modules rất quan trọng  
3. **Vietnamese Fonts**: Đã tối ưu cho dấu tiếng Việt
4. **Mobile Support**: Responsive design hoạt động tốt trên mọi thiết bị
5. **Browser Compatibility**: Tested trên Chrome, Firefox, Safari, Edge

---

*📅 Last Updated: December 11, 2025*
*🏷️ Version: 2.0.0 - Modular Architecture*