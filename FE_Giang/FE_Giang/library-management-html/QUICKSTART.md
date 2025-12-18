# 🚀 QUICK START GUIDE

## Chạy nhanh trong 3 bước:

### 1️⃣ Chạy Backend
```bash
# Đảm bảo backend Spring Boot đang chạy ở http://localhost:8086
cd your-backend-folder
./mvnw spring-boot:run
```

### 2️⃣ Chạy Frontend

**Cách 1: VS Code Live Server (Khuyến nghị)**
- Mở folder `library-management-html` trong VS Code
- Install extension "Live Server"
- Right-click `index.html` → Open with Live Server
- Browser tự động mở

**Cách 2: Python HTTP Server**
```bash
cd library-management-html
python -m http.server 8000
# Mở browser: http://localhost:8000
```

**Cách 3: Node.js http-server**
```bash
npm install -g http-server
cd library-management-html
http-server -p 8000
# Mở browser: http://localhost:8000
```

### 3️⃣ Đăng nhập

Dùng một trong các tài khoản sau:

| Email | Password | Role |
|-------|----------|------|
| admin@library.com | admin123 | Admin |
| librarian@library.com | lib123 | Librarian |
| user@library.com | user123 | User |

---

## 📋 Checklist trước khi chạy:

- [ ] Backend đang chạy ở `http://localhost:8086`
- [ ] Browser hỗ trợ ES6+ (Chrome, Firefox, Safari, Edge)
- [ ] Không có CORS error (backend phải enable CORS)

---

## 🎯 Các tính năng chính:

✅ **Login/Logout** - JWT Authentication  
✅ **Dashboard** - Statistics & Charts (Chart.js)  
✅ **Books Management** - Full CRUD operations  
✅ **Search & Filter** - Real-time search  
✅ **Role-based Access** - Admin, Librarian, User  
✅ **Responsive Design** - Mobile friendly  

---

## 🐛 Troubleshooting:

**CORS Error?**
→ Backend cần enable CORS: `@CrossOrigin(origins = "*")`

**401 Unauthorized?**
→ Token expired, đăng nhập lại

**Connection failed?**
→ Check backend có chạy không: http://localhost:8086

---

## 📁 Cấu trúc files:

```
library-management-html/
├── index.html          # Login page
├── dashboard.html      # Dashboard
├── books.html         # Quản lý sách
├── users.html         # Quản lý người dùng
├── settings.html      # Cài đặt
├── assets/
│   ├── css/          # All CSS files
│   ├── js/           # All JavaScript files
│   └── images/       # Images (nếu có)
└── README.md         # Full documentation
```

---

## 🎨 Tech Stack:

- **HTML5** - Semantic markup
- **CSS3** - Pure CSS, no framework
- **JavaScript (ES6+)** - Vanilla JS
- **Chart.js** - Charts & graphs
- **Font Awesome** - Icons

---

**Xem README.md để biết thêm chi tiết!** 📚
