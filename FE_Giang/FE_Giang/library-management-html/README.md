# 📚 Bibliotheca - Vintage Library Management System

> **Frontend Application (HTML/CSS/JavaScript)**
> 
> Hệ thống quản lý thư viện với giao diện cổ điển, kết nối với Spring Boot Backend API

---

## 🎯 Tổng Quan

Bibliotheca là ứng dụng quản lý thư viện được xây dựng bằng **HTML, CSS, JavaScript thuần** (không sử dụng framework), kết nối với Backend API qua RESTful endpoints.

### ✨ Tính Năng Chính

- ✅ **Đăng nhập/Xác thực** - JWT Token Authentication
- ✅ **Dashboard** - Thống kê và biểu đồ (Chart.js)
- ✅ **Quản lý sách** - CRUD operations (Create, Read, Update, Delete)
- ✅ **Tìm kiếm & Lọc** - Search và filter books theo nhiều tiêu chí
- ✅ **Phân quyền** - Role-based access control (ADMIN, LIBRARIAN, VIEWER)
- ✅ **Responsive Design** - Hoạt động tốt trên mọi thiết bị
- ✅ **Toast Notifications** - Thông báo realtime
- ✅ **Modal Components** - Popup form cho CRUD operations

---

## 🏗️ Cấu Trúc Project

```
library-management-html/
├── index.html              # Login page
├── dashboard.html          # Dashboard with statistics & charts
├── books.html             # Books management (CRUD)
├── users.html             # Users management
├── settings.html          # User settings & preferences
├── assets/
│   ├── css/
│   │   ├── variables.css   # CSS Variables (colors, spacing, etc.)
│   │   ├── global.css      # Global styles & reset
│   │   ├── components.css  # Reusable components (buttons, cards, modals, etc.)
│   │   ├── layout.css      # Layout (sidebar, header, grid)
│   │   └── responsive.css  # Mobile responsive styles
│   ├── js/
│   │   ├── utils.js        # Utility functions (date format, validation, etc.)
│   │   ├── api.js          # API service layer (HTTP client)
│   │   ├── auth.js         # Authentication system
│   │   └── components.js   # Reusable UI components (sidebar, header, etc.)
│   └── images/            # Images and icons
└── README.md
```

---

## 🚀 Cài Đặt và Chạy

### Yêu Cầu

- **Backend API** chạy ở `http://localhost:8086`
- **Modern Web Browser** (Chrome, Firefox, Safari, Edge)
- **Live Server** hoặc HTTP server để serve static files

### Bước 1: Chạy Backend

Đảm bảo Spring Boot backend đang chạy:

```bash
# Trong thư mục backend
./mvnw spring-boot:run

# Hoặc
java -jar target/library-management.jar
```

Backend sẽ chạy ở: `http://localhost:8086`

### Bước 2: Chạy Frontend

#### Option 1: Sử dụng VS Code Live Server

1. Mở folder `library-management-html` trong VS Code
2. Install extension: **Live Server** by Ritwick Dey
3. Right-click vào `index.html` → **Open with Live Server**
4. Browser sẽ tự động mở ở `http://localhost:5500` hoặc `http://127.0.0.1:5500`

#### Option 2: Sử dụng Python HTTP Server

```bash
cd library-management-html

# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

Mở browser: `http://localhost:8000`

#### Option 3: Sử dụng Node.js http-server

```bash
# Install globally
npm install -g http-server

# Run server
cd library-management-html
http-server -p 8000
```

Mở browser: `http://localhost:8000`

---

## 🔑 Demo Accounts

Sử dụng các tài khoản sau để đăng nhập:

| Role | Email | Password | Quyền |
|------|-------|----------|-------|
| **Admin** | admin@library.com | admin123 | Full access |
| **Librarian** | librarian@library.com | lib123 | Manage books |
| **User** | user@library.com | user123 | View only |

---

## 📖 Sử Dụng

### 1. Đăng Nhập

- Truy cập `index.html` (hoặc root URL)
- Nhập email và password
- Click **Đăng nhập**
- Hệ thống sẽ redirect đến Dashboard

**Phím tắt (Dev mode):**
- `Alt + A` - Auto-fill Admin credentials
- `Alt + L` - Auto-fill Librarian credentials
- `Alt + U` - Auto-fill User credentials

### 2. Dashboard

- Xem thống kê tổng quan: Tổng số sách, số lượng, sách có sẵn, sách đang mượn
- Biểu đồ thống kê theo danh mục (Bar chart)
- Biểu đồ tình trạng sách (Doughnut chart)
- Danh sách sách mới nhất

### 3. Quản Lý Sách

**Xem danh sách:**
- Tất cả users có thể xem danh sách sách
- Tìm kiếm theo: Tên sách, tác giả, ISBN, thể loại
- Lọc theo: Thể loại
- Sắp xếp theo: Tên, tác giả, năm xuất bản, số lượng

**Thêm sách mới:** (Librarian/Admin only)
- Click nút **Thêm sách mới**
- Điền thông tin: Tên sách, tác giả, ISBN, thể loại, nhà xuất bản, năm xuất bản, số lượng, mô tả
- Click **Lưu**

**Sửa sách:** (Librarian/Admin only)
- Click icon **Edit** (✏️) ở hàng sách cần sửa
- Cập nhật thông tin
- Click **Lưu**

**Xóa sách:** (Librarian/Admin only)
- Click icon **Delete** (🗑️)
- Xác nhận xóa

### 4. Quản Lý Người Dùng

*(Chỉ dành cho Librarian/Admin)*

- Xem danh sách người dùng
- Xem thông tin chi tiết user
- **Note:** API quản lý user chưa được implement ở backend, hiện đang dùng mock data

### 5. Cài Đặt

- Cập nhật thông tin cá nhân
- Đổi mật khẩu (API chưa implement)
- Tùy chỉnh ngôn ngữ, giao diện
- Bật/tắt thông báo

### 6. Đăng Xuất

- Click vào **Avatar/User menu** ở header
- Chọn **Đăng xuất**
- Hoặc click nút **Logout** ở sidebar

---

## 🔧 Kỹ Thuật Sử Dụng

### Frontend Stack

- **HTML5** - Semantic markup
- **CSS3** - Custom CSS with CSS Variables
- **JavaScript (ES6+)** - Modern JavaScript
- **Chart.js 4.4.0** - Charts and graphs
- **Font Awesome 6.4.0** - Icons

### Architecture

```
┌─────────────┐
│    Pages    │ (HTML files)
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ Components  │ (components.js)
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Auth Layer │ (auth.js)
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  API Layer  │ (api.js)
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Backend    │ (Spring Boot)
└─────────────┘
```

### Key Features

1. **JWT Authentication**
   - Token stored in localStorage
   - Auto-include in all API requests
   - Auto-redirect on 401 Unauthorized

2. **API Service Layer**
   - Centralized HTTP client
   - Error handling
   - Token management
   - Response parsing

3. **Component-Based**
   - Reusable sidebar, header components
   - Modal system
   - Toast notifications
   - Loading overlay

4. **Client-Side Routing**
   - Multi-page application
   - Active link highlighting
   - Breadcrumb navigation

5. **Form Validation**
   - Real-time validation
   - Error messages
   - Required field checking

6. **Responsive Design**
   - Mobile-first approach
   - Breakpoints: 576px, 768px, 992px, 1200px
   - Collapsible sidebar on mobile

---

## 🎨 Customization

### Thay Đổi Màu Sắc

Edit `assets/css/variables.css`:

```css
:root {
  --primary-color: #8b4513;    /* Your primary color */
  --secondary-color: #2c5f2d;  /* Your secondary color */
  --accent-color: #d4af37;     /* Your accent color */
  /* ... */
}
```

### Thay Đổi Backend URL

Edit `assets/js/api.js`:

```javascript
const API_BASE_URL = 'http://your-backend-url:port';
```

---

## 🐛 Troubleshooting

### 1. CORS Error

**Triệu chứng:**
```
Access to fetch at 'http://localhost:8086/api/books' from origin 'http://localhost:5500' 
has been blocked by CORS policy
```

**Giải pháp:**
- Đảm bảo backend có CORS configuration:
```java
@CrossOrigin(origins = "*")
```

### 2. 401 Unauthorized

**Triệu chứng:** Tự động redirect về login page

**Giải pháp:**
- Token đã hết hạn → Đăng nhập lại
- Token không hợp lệ → Đăng nhập lại
- Backend không chạy → Start backend

### 3. API Connection Failed

**Triệu chứng:** "Network error" hoặc "Failed to fetch"

**Giải pháp:**
- Kiểm tra backend có đang chạy không: `http://localhost:8086`
- Kiểm tra URL trong `api.js`
- Kiểm tra firewall/antivirus

### 4. Charts Not Showing

**Giải pháp:**
- Kiểm tra Chart.js CDN có load thành công không
- Mở DevTools → Console → Check for errors
- Kiểm tra data có empty không

---

## 📱 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ❌ Internet Explorer (not supported)

---

## 🔐 Security

1. **XSS Prevention**
   - All user inputs are escaped using `Utils.escapeHtml()`
   - No inline JavaScript execution

2. **CSRF Protection**
   - Backend should implement CSRF tokens

3. **Token Security**
   - Token stored in localStorage (consider using httpOnly cookies for production)
   - Token included in Authorization header
   - Auto-logout on token expiration

---

## 📝 API Documentation

Xem chi tiết trong file `API_DOCUMENTATION.md`

### Quick Reference

| Endpoint | Method | Description | Auth Required |
|----------|--------|-------------|---------------|
| `/auth/login` | POST | Login | No |
| `/auth/register` | POST | Register | No |
| `/auth/profile` | GET | Get profile | Yes |
| `/api/books` | GET | Get all books | Yes |
| `/api/books/{id}` | GET | Get book by ID | Yes |
| `/api/books` | POST | Create book | Yes (LIBRARIAN+) |
| `/api/books/{id}` | PUT | Update book | Yes (LIBRARIAN+) |
| `/api/books/{id}` | DELETE | Delete book | Yes (LIBRARIAN+) |

---

## 🚧 Known Limitations

1. **No User Management API** - Users page uses mock data
2. **No Profile Update API** - Profile update not implemented
3. **No Password Change API** - Password change not implemented
4. **Client-Side Filtering** - Search/filter done on client side (should be server-side for large datasets)
5. **No Pagination** - All books loaded at once (should implement pagination for large datasets)

---

## 🔮 Future Enhancements

- [ ] Implement pagination for books list
- [ ] Add book borrowing/returning features
- [ ] Add book cover image upload
- [ ] Implement user management API
- [ ] Add profile update functionality
- [ ] Add password change functionality
- [ ] Implement dark mode theme
- [ ] Add export to CSV/Excel functionality
- [ ] Add advanced search with multiple filters
- [ ] Add book recommendations
- [ ] Add reading statistics

---

## 👨‍💻 Development

### Project Structure Philosophy

- **Separation of Concerns**: CSS, JS, and HTML are separated into logical files
- **Reusability**: Components can be reused across pages
- **Modularity**: Each JS file has a specific responsibility
- **Maintainability**: Code is well-commented and organized

### Adding a New Page

1. Create new HTML file (e.g., `new-page.html`)
2. Include CSS and JS files
3. Use `Components.getSidebarHTML()` and `Components.getHeaderHTML()`
4. Add `protectPage()` for authentication
5. Initialize with `Components.initSidebar()` and `Components.initHeader()`
6. Add link to sidebar in `components.js`

### Code Style

- **JavaScript**: ES6+ syntax, async/await for promises
- **CSS**: BEM-like naming convention
- **HTML**: Semantic HTML5 elements
- **Comments**: JSDoc style for functions

---

## 📞 Support

Nếu gặp vấn đề, vui lòng:

1. Check console for errors (F12 → Console)
2. Check network tab for failed requests (F12 → Network)
3. Verify backend is running and accessible
4. Check API documentation for correct endpoints

---

## 📄 License

This project is developed for educational purposes.

---

## 🙏 Credits

- **Icons**: Font Awesome
- **Charts**: Chart.js
- **Design Inspiration**: Vintage library aesthetic

---

**Happy Coding! 📚✨**
