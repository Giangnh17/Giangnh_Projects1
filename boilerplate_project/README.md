# Web Development Boilerplate

Đây là boilerplate chuẩn cho các dự án web sử dụng HTML, CSS, và JavaScript.

## 📁 Cấu trúc thư mục

```
boilerplate_project/
├── README.md                 # File hướng dẫn này
├── index.html               # Trang chính
├── assets/                  # Thư mục chứa tài nguyên
│   ├── css/                # Thư mục CSS
│   │   ├── style.css       # CSS chính
│   │   ├── reset.css       # CSS reset/normalize
│   │   └── responsive.css  # CSS responsive
│   ├── js/                 # Thư mục JavaScript
│   │   ├── main.js         # JavaScript chính
│   │   └── utils.js        # Các hàm tiện ích
│   ├── images/             # Thư mục hình ảnh
│   │   └── favicon.ico     # Icon trang web
│   └── fonts/              # Thư mục font chữ (nếu có)
├── pages/                  # Các trang khác
│   ├── about.html         # Trang giới thiệu
│   └── contact.html       # Trang liên hệ
└── docs/                   # Tài liệu dự án
    └── design.md           # Tài liệu thiết kế

```

## 🚀 Hướng dẫn sử dụng

### 1. Khởi tạo dự án mới
1. Copy toàn bộ thư mục boilerplate này
2. Đổi tên thư mục thành tên dự án của bạn
3. Cập nhật file README.md với thông tin dự án

### 2. Phát triển
- **HTML**: Bắt đầu từ `index.html`, tạo các trang khác trong thư mục `pages/`
- **CSS**: 
  - `reset.css`: Reset CSS mặc định của trình duyệt
  - `style.css`: CSS chính cho dự án
  - `responsive.css`: CSS cho mobile/tablet
- **JavaScript**:
  - `main.js`: Logic chính của ứng dụng
  - `utils.js`: Các hàm tiện ích dùng chung

### 3. Tổ chức code
- Luôn đặt CSS trong thư mục `assets/css/`
- Luôn đặt JavaScript trong thư mục `assets/js/`
- Hình ảnh đặt trong `assets/images/`
- Tạo component riêng cho từng chức năng

### 4. Best Practices
- **HTML**: Sử dụng semantic HTML5 tags
- **CSS**: 
  - Sử dụng BEM methodology cho class naming
  - Mobile-first approach
  - Sử dụng CSS variables cho màu sắc, font
- **JavaScript**:
  - Sử dụng ES6+ syntax
  - Tách riêng logic và DOM manipulation
  - Comment code đầy đủ

## 📱 Responsive Design
Dự án được thiết kế responsive với breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px  
- Desktop: > 1024px

## 🛠️ Tools & Libraries khuyến nghị
- **CSS Framework**: Bootstrap, Tailwind CSS
- **JS Libraries**: jQuery (nếu cần), Vanilla JS
- **Icons**: Font Awesome, Feather Icons
- **Fonts**: Google Fonts

## 📝 Checklist trước khi deploy
- [ ] Kiểm tra responsive trên các device
- [ ] Optimize hình ảnh
- [ ] Minify CSS/JS  
- [ ] Kiểm tra accessibility
- [ ] Test trên nhiều trình duyệt
- [ ] Validate HTML/CSS

## 🎯 Mẹo cho người mới bắt đầu
1. **Học từ simple đến complex**: Bắt đầu với HTML thuần, sau đó CSS, cuối cùng JS
2. **Practice thường xuyên**: Làm nhiều project nhỏ
3. **Đọc code của người khác**: GitHub, CodePen
4. **Sử dụng Developer Tools**: F12 trên trình duyệt
5. **Mobile-first**: Thiết kế cho mobile trước

Happy coding! 🎉