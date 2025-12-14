# 📚 Cấu trúc CSS - Thư viện Vĩ Đại
## CSS Structure - The Grand Library

Hệ thống CSS được tổ chức theo từng trang cụ thể để tối ưu hiệu suất và dễ bảo trì.

## 🎨 Theme & Color Palette
**Vintage Academia Library Theme** với bảng màu cổ điển:
- 🎨 **Background**: #F5F1E6 (Màu kem/giấy cũ)
- 📝 **Primary Text**: #3E2723 (Cà phê đen)
- 🔶 **Accent**: #5D4037 (Viền da nâu)
- 🟫 **Primary Button**: #4E342E (Nút nâu đậm)
- 🟢 **Available**: #33691E (Xanh ô liu)
- 🔴 **Borrowed**: #BF360C (Cam cháy/gỉ)

## 📁 Cấu trúc Files

### 🌐 CSS Files
```
/static/css/
├── shared.css          # Component chung, utilities, biến CSS
├── auth-login.css      # Trang đăng nhập
├── auth-register.css   # Trang đăng ký
├── index.css           # Trang chủ/Dashboard
├── book-detail.css     # Trang chi tiết sách
├── book-form.css       # Form thêm/sửa sách
└── style.css           # CSS gốc (backup)
```

### 🎯 Chức năng từng file

#### **shared.css** - CSS Chung
- ✅ CSS Variables (Biến màu sắc, font, spacing)
- ✅ Notification System (Hệ thống thông báo)
- ✅ Modal System (Popup/Dialog)
- ✅ Loading Spinner (Biểu tượng tải)
- ✅ Tooltip System (Gợi ý công cụ)
- ✅ Breadcrumb (Đường dẫn điều hướng)
- ✅ Progress Bar (Thanh tiến trình)
- ✅ Accordion (Hệ thống gấp mở)
- ✅ Utility Classes (Lớp tiện ích)
- ✅ Animation Utilities (Hiệu ứng động)

#### **auth-login.css** - Đăng nhập
- 🔐 Layout đăng nhập centered
- 🎨 Auth card với gradient background
- 📝 Form styling với validation
- 💫 Animation effects (fadeInUp)
- 📱 Responsive design
- 🎯 Demo credentials section

#### **auth-register.css** - Đăng ký
- 📝 Multi-step form layout
- ✅ Real-time validation styling
- 🔒 Password strength indicator
- 📋 Checkbox và form controls
- 🎭 Loading states
- 📱 Mobile-optimized

#### **index.css** - Dashboard/Trang chủ
- 🏗️ Dashboard layout với navbar
- 🔍 Search & filter toolbar
- 📊 Books table styling
- 🏷️ Status badges (Available/Borrowed/Lost)
- 🔘 Action buttons (View/Edit/Delete)
- 👤 Role-based visibility
- 📈 Empty states
- ⬆️ Scroll to top button

#### **book-detail.css** - Chi tiết sách
- 📖 Book cover section với sticky positioning
- 📋 Metadata grid layout
- 📊 Status section với badges
- 🎬 Action buttons section
- 📝 Description section
- 📈 Borrow history table
- 🎞️ Animation stagger effects
- 📱 Mobile-responsive layout

#### **book-form.css** - Form sách
- 📝 Multi-section form layout
- 🎯 Form validation với visual feedback
- 📊 Character counter cho textarea
- 💾 Auto-save indicator
- 📋 Guidelines section
- 🔄 Loading states
- ✨ Focus management
- 🎭 Animation sequences

## 🔤 Typography
- **Heading Font**: `Playfair Display` (Serif cổ điển)
- **Body Font**: `Source Sans Pro` (Sans-serif hiện đại)
- **Hỗ trợ**: Tiếng Việt hoàn chỉnh với dấu

## 📱 Responsive Design
Tất cả CSS files đều có responsive breakpoints:
- 📱 **Mobile**: ≤ 480px
- 📱 **Tablet**: ≤ 768px
- 💻 **Desktop**: ≤ 1024px
- 🖥️ **Large**: > 1024px

## 🎭 Animation System
- **fadeIn**: Xuất hiện mờ dần
- **slideUp**: Trượt lên từ dưới
- **slideDown**: Trượt xuống từ trên
- **bounceIn**: Nảy vào với hiệu ứng đàn hồi
- **Stagger effects**: Hiệu ứng tuần tự

## 🎯 Utility Classes
- **Spacing**: `.mt-sm`, `.mb-lg`, `.p-md`
- **Text**: `.text-center`, `.font-bold`, `.text-muted`
- **Visibility**: `.hidden`, `.show-mobile`, `.hide-desktop`
- **Colors**: `.text-success`, `.text-error`

## 🚀 Performance
- ✅ **Modular**: Mỗi trang chỉ load CSS cần thiết
- ✅ **Optimized**: Giảm file size, tăng tốc độ tải
- ✅ **Maintainable**: Dễ bảo trì và cập nhật
- ✅ **Scalable**: Dễ mở rộng thêm trang mới

## 📝 Usage trong HTML
```html
<!-- Trang đăng nhập -->
<link rel="stylesheet" href="/css/auth-login.css">

<!-- Trang chủ -->
<link rel="stylesheet" href="/css/index.css">

<!-- Chi tiết sách -->
<link rel="stylesheet" href="/css/book-detail.css">

<!-- Form sách -->
<link rel="stylesheet" href="/css/book-form.css">

<!-- Đăng ký -->
<link rel="stylesheet" href="/css/auth-register.css">
```

## 🎨 Design System
Hệ thống tuân thủ **Vintage Academia** design language:
- 📚 Classic library aesthetics
- 🎨 Warm, earthy color palette
- 🔤 Elegant typography pairing
- 💫 Subtle animations và transitions
- 📱 Modern responsive approach

---
*Thiết kế bởi: Vintage Academia Design System*
*Font: Playfair Display + Source Sans Pro*
*Theme: Classic University Library* 📖