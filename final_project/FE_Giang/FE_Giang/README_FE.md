# 📚 SARLY LIBRARY MANAGEMENT SYSTEM - FRONTEND DOCUMENTATION

## 🎨 Tổng Quan Hệ Thống

**Sarly Library Management System** là một ứng dụng quản lý thư viện với giao diện người dùng được xây dựng bằng **HTML, CSS thuần, và Vanilla JavaScript**. Hệ thống có thiết kế vintage, elegant với tông màu bronze/brown, mang đến trải nghiệm thư viện cổ điển nhưng hiện đại.

### 🌟 Đặc Điểm Nổi Bật

- ✅ **Pure Frontend**: Không sử dụng framework (React, Vue, Angular)
- 🎨 **Thiết kế Vintage**: Giao diện thanh lịch với màu sắc ấm áp
- 🔐 **Phân quyền 3 cấp**: USER, LIBRARIAN, ADMIN
- 📱 **Responsive Design**: Tương thích mọi thiết bị
- 🚀 **REST API Integration**: Kết nối với Spring Boot backend
- 🎯 **JWT Authentication**: Xác thực an toàn với JSON Web Token

---

## 📁 Cấu Trúc Dự Án

```
library-management-html/
│
├── index.html              # Trang đăng nhập
├── register.html           # Trang đăng ký
├── dashboard.html          # Dashboard - Tổng quan (LIBRARIAN/ADMIN)
├── books.html             # Thư viện sách
├── users.html             # Quản lý người dùng (chỉ ADMIN)
├── settings.html          # Cài đặt cá nhân
│
└── assets/
    ├── css/
    │   ├── variables.css       # CSS Variables (Design tokens)
    │   ├── global.css          # Global styles & Reset
    │   ├── components.css      # Component styles
    │   ├── layout.css          # Layout styles (sidebar, header)
    │   ├── responsive.css      # Responsive styles
    │   └── pages/              # Page-specific styles
    │       ├── login.css
    │       ├── register.css
    │       ├── dashboard.css
    │       ├── books.css
    │       ├── users.css
    │       └── settings.css
    │
    ├── js/
    │   ├── api.js             # API Service Layer
    │   ├── auth.js            # Authentication System
    │   ├── utils.js           # Utility Functions
    │   ├── components.js      # Reusable UI Components
    │   └── pages/             # Page-specific logic
    │       ├── login.js
    │       ├── register.js
    │       ├── dashboard.js
    │       ├── books.js
    │       ├── users.js
    │       └── settings.js
    │
    └── images/
        └── Library_logo.png
```

---

## 📂 Chi Tiết Các File CSS & JavaScript

### 🎨 CSS Files

#### **1. `variables.css` - Design Tokens & CSS Variables**
```css
/* Định nghĩa tất cả biến CSS toàn cục */
:root {
  --primary-color: #6d5346;
  --font-size-base: 1rem;
  --space-md: 1rem;
  /* ...và nhiều biến khác */
}
```
**Mục đích:**
- ✅ Tập trung quản lý colors, fonts, spacing, shadows, transitions
- ✅ Dễ thay đổi theme (chỉ sửa 1 chỗ, ảnh hưởng toàn bộ)
- ✅ Consistency design system
- ✅ Hỗ trợ dark mode (optional)

**Nội dung:**
- Colors: Primary, secondary, accent, status colors
- Typography: Font families, sizes, weights, line heights
- Spacing: xs, sm, md, lg, xl (4px → 64px)
- Border radius: sm, md, lg, xl, full
- Shadows: sm, md, lg, xl, 2xl
- Transitions: fast, base, slow
- Z-index scale: dropdown, modal, tooltip...
- Layout constants: sidebar width, header height

---

#### **2. `global.css` - Global Styles & CSS Reset**
```css
/* Reset & base styles cho toàn bộ website */
*, *::before, *::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
```
**Mục đích:**
- ✅ CSS Reset - Xóa default styles của browser
- ✅ Typography base (h1-h6, p, a)
- ✅ Form elements base styles
- ✅ Scrollbar custom styling
- ✅ Utility classes (text-center, d-flex, m-0...)

**Nội dung:**
- Box-sizing reset
- HTML/Body base styles
- Typography (headings, paragraphs, links)
- Lists, images, form elements
- Focus styles, selection colors
- Scrollbar theming (Webkit)
- Utility classes: display, text-align, font-weight, margins, paddings

---

#### **3. `components.css` - Reusable UI Components**
```css
/* Buttons, cards, badges, forms, tables, modals... */
.btn-primary { /* ... */ }
.card { /* ... */ }
.badge { /* ... */ }
```
**Mục đích:**
- ✅ Component styles tái sử dụng
- ✅ Buttons (primary, secondary, outline, danger...)
- ✅ Cards, Badges, Tables, Forms
- ✅ Modals, Alerts, Spinners
- ✅ Pagination

**Nội dung:**
- **Buttons**: `.btn`, `.btn-primary`, `.btn-secondary`, `.btn-outline`, `.btn-danger`, `.btn-sm`, `.btn-lg`
- **Cards**: `.card`, `.card-header`, `.card-body`, `.card-footer`
- **Badges**: `.badge`, `.badge-primary`, `.badge-success`, `.badge-warning`, `.badge-danger`
- **Forms**: `.form-group`, `.form-label`, `.form-control`, `.form-text`, `.form-error`
- **Tables**: `.table`, `.table-responsive`, `.table-striped`, `.table-hover`
- **Alerts**: `.alert`, `.alert-info`, `.alert-success`, `.alert-warning`, `.alert-danger`
- **Modals**: `.modal`, `.modal-backdrop`, `.modal-header`, `.modal-body`, `.modal-footer`
- **Spinners**: `.spinner`, `.spinner-lg`
- **Pagination**: `.pagination-container`, `.pagination-controls`
- **Empty States**: `.empty-state`
- **Avatar**: `.user-avatar`

---

#### **4. `layout.css` - Page Layout Structure**
```css
/* Sidebar, Header, Main Content layout */
.sidebar { /* Fixed sidebar */ }
.header { /* Top header */ }
.main-content { /* Main content area */ }
```
**Mục đích:**
- ✅ Layout chính của application (Sidebar + Content)
- ✅ Sidebar: Fixed, collapsible, mobile overlay
- ✅ Header: User menu, breadcrumbs
- ✅ Main content area structure

**Nội dung:**
- **Layout Container**: `.layout`, `.layout-content`
- **Sidebar**: 
  - `.sidebar` - Fixed sidebar với gradient background
  - `.sidebar-header` - Logo và toggle button
  - `.sidebar-nav` - Navigation menu
  - `.sidebar-section` - Menu sections
  - `.nav-item`, `.nav-link` - Menu items
  - `.sidebar-collapsed` - Collapsed state
  - `.sidebar-overlay` - Mobile overlay
- **Header**: 
  - `.header` - Top header bar
  - `.header-left`, `.header-right`
  - `.user-menu` - User dropdown menu
  - `.mobile-menu-toggle` - Mobile hamburger button
- **Main Content**:
  - `.main-content` - Content wrapper
  - `.content-header` - Page header
  - `.content-title`, `.content-description`
  - `.content-actions` - Action buttons

---

#### **5. `responsive.css` - Mobile & Tablet Responsive**
```css
/* Media queries cho mobile, tablet, desktop */
@media (max-width: 992px) {
  .sidebar { transform: translateX(-100%); }
}
```
**Mục đích:**
- ✅ Responsive design cho tất cả breakpoints
- ✅ Mobile-first approach
- ✅ Sidebar mobile behavior
- ✅ Table horizontal scroll on mobile

**Breakpoints:**
- **≤1400px**: Extra large desktop adjustments
- **≤1200px**: Large desktop - sidebar width giảm
- **≤992px**: Tablet - sidebar thành overlay, table scroll
- **≤768px**: Large mobile - 2 columns, form full width
- **≤576px**: Mobile - 1 column, compact spacing

**Adjustments:**
- Sidebar: Fixed → Overlay → Hidden with toggle
- Tables: Full width → Horizontal scroll
- Cards grid: 4 columns → 2 columns → 1 column
- Forms: 2 columns → 1 column
- Stats cards: 4 → 2 → 1
- Font sizes: Slightly smaller
- Spacing: More compact

---

#### **6. Page-Specific CSS Files**

##### **`pages/login.css`**
- Login container với gradient background
- Login card styling
- Logo circular style
- Password toggle button
- Responsive login form

##### **`pages/register.css`**
- Register container layout
- Password strength indicator
- Confirm password validation UI
- Back to login link
- Similar styling với login page

##### **`pages/dashboard.css`**
- Stats cards grid layout
- Chart containers
- Recent books table
- Card hover effects
- Dashboard-specific spacing

##### **`pages/books.css`**
- Books table styling
- Book modal form
- Search and filter bar
- Status badges colors
- Table actions buttons

##### **`pages/users.css`**
- Users table layout
- Role badges styling
- User avatar in table
- Action buttons (edit role, delete)
- Status indicators

##### **`pages/settings.css`**
- Settings form layout
- Two-column layout (profile + password)
- Form sections styling
- Disabled input styling
- Settings-specific cards

---

### 💻 JavaScript Files

#### **1. `api.js` - API Service Layer** (~575 lines)
```javascript
// HttpClient + All API endpoints
const http = new HttpClient(API_BASE_URL);
const AuthAPI = { login, register, getProfile };
```
**Mục đích:**
- ✅ Tập trung tất cả API calls
- ✅ HttpClient class với GET/POST/PUT/DELETE
- ✅ Auto handle JWT token
- ✅ Error handling & 401 auto-logout

**Nội dung:**
- **HttpClient Class**: 
  - `get(endpoint, params)` - GET request
  - `post(endpoint, data)` - POST request
  - `put(endpoint, data)` - PUT request
  - `delete(endpoint)` - DELETE request
  - `getAuthHeader()` - Auto attach JWT token
  - `handleResponse()` - Handle success/error
  
- **AuthAPI**: Login, Register, Get Profile
- **BooksAPI**: CRUD sách, Search, Sort, Pagination
- **UserAPI**: Update password, Update fullName
- **AdminAPI**: Get all users, Update role, Delete user
- **DashboardAPI**: Get stats (totalBooks, categoryStats, statusStats)

**Base URL**: `http://localhost:8086`

---

#### **2. `auth.js` - Authentication System** (~288 lines)
```javascript
// Auth state management & role-based access
Auth.isAuthenticated();
Auth.hasRole('LIBRARIAN');
Auth.logout();
```
**Mục đích:**
- ✅ Quản lý authentication state
- ✅ JWT token management
- ✅ Role-based access control
- ✅ Page protection & redirects

**Nội dung:**
- **Auth State**:
  - `isAuthenticated()` - Check if logged in
  - `getCurrentUser()` - Get current user object
  - `getUserRole()` - Get user role (USER/LIBRARIAN/ADMIN)
  - `getToken()` - Get JWT token
  
- **Role Checking**:
  - `hasRole(requiredRole)` - Check role hierarchy
  - `isAdmin()` - Is current user admin?
  - `isLibrarian()` - Is librarian or above?
  
- **Auth Actions**:
  - `login(email, password)` - Login user
  - `register(userData)` - Register new user
  - `logout()` - Clear token & redirect
  - `refreshProfile()` - Reload user data
  
- **Page Protection**:
  - `requireAuth(requiredRole)` - Protect page, redirect if not auth
  - `init()` - Initialize auth, update UI based on role
  - `setupLogoutButtons()` - Setup logout event listeners

**Storage**: localStorage (`token`, `currentUser`)

---

#### **3. `utils.js` - Utility Functions** (~528 lines)
```javascript
// Helper functions: format, validate, debounce...
Utils.formatDate(date);
Toast.success('Message');
Loading.show();
```
**Mục đích:**
- ✅ Tổng hợp utility functions tái sử dụng
- ✅ Formatting, Validation, Performance
- ✅ Toast notifications, Loading indicator
- ✅ Local storage wrapper

**Nội dung:**

**Utils Object:**
- **Formatting**:
  - `formatDate(dateString)` - Format: '28/12/2025, 10:30'
  - `formatDateSimple(dateString)` - Format: '28/12/2025'
  - `formatNumber(number)` - Format: '1.234.567'
  
- **String Utilities**:
  - `getInitials(name)` - 'Nguyen Van A' → 'NVA'
  - `truncate(text, length)` - 'Lorem ipsum...'
  - `escapeHtml(text)` - Prevent XSS attacks
  
- **Validation**:
  - `isValidEmail(email)` - Email regex validation
  - `isValidISBN(isbn)` - ISBN format validation
  
- **Performance**:
  - `debounce(func, wait)` - Debounce function calls
  - `throttle(func, limit)` - Throttle function calls
  
- **Helpers**:
  - `buildQueryString(params)` - Object → URL query string
  - `parseQueryString(query)` - URL query → Object
  - `copyToClipboard(text)` - Copy to clipboard
  - `downloadFile(content, filename)` - Download file
  - `generateId()` - Random unique ID
  - `getRandomColor()` - Random color from palette
  - `sleep(ms)` - Async sleep

**Toast Notifications:**
```javascript
Toast.success('Thành công!');
Toast.error('Có lỗi!');
Toast.warning('Cảnh báo!');
Toast.info('Thông tin');
```
- Auto-hide sau 3 giây
- Positioned top-right
- Icon + message
- Color-coded by type

**Loading Indicator:**
```javascript
Loading.show(); // Hiển thị spinner
Loading.hide(); // Ẩn spinner
```
- Full-screen overlay
- Centered spinner
- Prevent user interaction

**Form Validator:**
```javascript
Validator.validateRequired(input, 'Email');
Validator.validateEmail(input);
Validator.validateMinLength(input, 6);
Validator.showError(input, 'Error message');
Validator.clearError(input);
```
- Inline error messages
- Field highlighting
- Vietnamese error messages

**Storage Wrapper:**
```javascript
Storage.set('key', value); // Auto JSON.stringify
Storage.get('key');        // Auto JSON.parse
Storage.remove('key');
Storage.clear();
```
- localStorage wrapper
- Auto JSON handling
- Type-safe

---

#### **4. `components.js` - Reusable UI Components** (~339 lines)
```javascript
// Generate HTML for sidebar, header, pagination...
Components.getSidebarHTML();
Components.getHeaderHTML(title);
```
**Mục đích:**
- ✅ Generate HTML components động
- ✅ Sidebar, Header, Pagination, Empty states
- ✅ Initialize component events
- ✅ DRY principle - không lặp code HTML

**Nội dung:**
- **HTML Generators**:
  - `getSidebarHTML()` - Generate sidebar với navigation
  - `getHeaderHTML(title, breadcrumbs)` - Generate header
  - `getEmptyStateHTML(options)` - Empty state placeholder
  - `getLoadingHTML()` - Loading spinner HTML
  - `getStatCardHTML(stat)` - Dashboard stat card
  - `getPaginationHTML(pageData)` - Pagination controls
  
- **Component Initializers**:
  - `initSidebar()` - Setup sidebar toggle, overlay clicks
  - `initHeader()` - Setup user menu dropdown
  - `renderLayout(options)` - Render full layout
  
**Features**:
- Sidebar menu với role-based visibility (`data-role-required`)
- Mobile responsive (hamburger menu)
- User dropdown menu
- Breadcrumb navigation
- Pagination với first/prev/next/last buttons

---

#### **5. Page-Specific JavaScript Files**

##### **`pages/login.js`** (~87 lines)
- Form submission handler
- Email/password validation
- Call `Auth.login()`
- Redirect to dashboard on success
- Show/hide password toggle
- Demo credentials shortcuts (Alt+A/L/U)

##### **`pages/register.js`** (~115 lines)
- Registration form handler
- Password strength indicator
- Confirm password matching
- Email validation
- Call `AuthAPI.register()`
- Redirect to login after success
- Password visibility toggle

##### **`pages/dashboard.js`** (~273 lines)
- Load dashboard stats from `DashboardAPI.getStats()`
- Render statistics cards
- Render category bar chart (Chart.js)
- Render status doughnut chart (Chart.js)
- Render recent books table
- Handle empty states
- Chart tooltips with formatted data

##### **`pages/books.js`** (~341 lines)
- Load books với pagination/search/sort
- Render books table
- CRUD operations:
  - Add book modal
  - Edit book (pre-fill form)
  - Delete book (confirm dialog)
- Search input với debounce
- Sort by dropdown
- Pagination navigation
- Role-based buttons (LIBRARIAN/ADMIN)
- Form validation

##### **`pages/users.js`** (~246 lines)
- Load users với pagination (ADMIN only)
- Render users table với:
  - Email, fullName, role, createdAt
  - Status badge (active/deleted)
- Change user role (prompt dialog)
- Delete user (soft delete)
- Pagination controls
- Role hierarchy checking

##### **`pages/settings.js`** (~150 lines)
- Load current user profile
- Update profile form:
  - Change fullName
  - Call `UserAPI.updateFullName()`
- Change password form:
  - Validate current password
  - Match new password & confirm
  - Call `UserAPI.updatePassword()`
- Display user role (read-only)
- Email field (disabled)
- Form validation before submit

---

### 📊 File Size Summary

**CSS Files** (~2,500 lines total):
- `variables.css`: ~140 lines
- `global.css`: ~204 lines
- `components.css`: ~747 lines
- `layout.css`: ~439 lines
- `responsive.css`: ~393 lines
- Page CSS: ~600 lines

**JavaScript Files** (~2,400 lines total):
- `api.js`: ~575 lines
- `auth.js`: ~288 lines
- `utils.js`: ~528 lines
- `components.js`: ~339 lines
- Page JS: ~700 lines

---

### 🔗 File Dependencies

```
index.html (Login)
├── variables.css
├── global.css
├── components.css
├── responsive.css
├── pages/login.css
├── utils.js
├── api.js
├── auth.js
└── pages/login.js

books.html
├── variables.css
├── global.css
├── components.css
├── layout.css
├── responsive.css
├── pages/books.css
├── utils.js
├── api.js
├── auth.js
├── components.js
└── pages/books.js

dashboard.html
├── All CSS files
├── All JS files
└── Chart.js (external library)
```

---

### 💡 Best Practices Được Áp Dụng

1. **Separation of Concerns**:
   - CSS: Variables → Global → Components → Layout → Responsive → Pages
   - JS: Utils → API → Auth → Components → Pages

2. **DRY (Don't Repeat Yourself)**:
   - Reusable components
   - Utility functions
   - CSS variables

3. **Progressive Enhancement**:
   - Mobile-first CSS
   - Graceful degradation

4. **Performance**:
   - Debounce search
   - Lazy loading
   - Minimal repaints

5. **Security**:
   - XSS prevention (escapeHtml)
   - JWT token in headers
   - Client-side validation

6. **Maintainability**:
   - Clear file structure
   - Consistent naming
   - Code comments

---

## 🎯 Chức Năng Chi Tiết

### 0. 📑 Cấu Trúc Menu & Phân Quyền

**Sidebar Navigation:**
- 🏠 **Trang chủ** (Dashboard) - `data-role-required="LIBRARIAN"`
  - Chỉ hiển thị cho LIBRARIAN và ADMIN
  - Thống kê tổng quan, biểu đồ
- 📚 **Thư viện sách** - Tất cả user
  - Xem danh sách sách
  - LIBRARIAN/ADMIN: Thêm/sửa/xóa sách
- 👥 **Quản lý người dùng** - `data-role-required="ADMIN"`
  - Chỉ ADMIN
  - Xem/sửa role/xóa users
- ⚙️ **Cài đặt** - Tất cả user
  - Đổi tên, đổi mật khẩu

### 1. 🔐 Hệ Thống Xác Thực (Authentication)

#### **Trang Đăng Nhập** (`index.html`)
- Form đăng nhập với email và password
- Hiển thị/ẩn mật khẩu
- Validate dữ liệu đầu vào
- Xử lý lỗi đăng nhập
- Chuyển hướng đến Dashboard sau khi đăng nhập thành công
- **Demo credentials**:
  - Admin: `admin@gmail.com` / `admin123` (Alt+A)
  - Librarian: `librarian@gmail.com` / `librarian` (Alt+L)
  - User: `user@gmail.com` / `user123` (Alt+U)

#### **Trang Đăng Ký** (`register.html`)
- Form đăng ký tài khoản mới
- Validate email, password, confirm password
- Password strength indicator
- Hiển thị/ẩn mật khẩu
- Tự động chuyển đến trang đăng nhập sau khi đăng ký thành công

#### **JWT Token Management**
```javascript
// Token được lưu trong localStorage
localStorage.setItem('token', 'eyJhbGc...')
localStorage.setItem('currentUser', JSON.stringify(user))

// Decode JWT để lấy thông tin user
const payload = JSON.parse(atob(token.split('.')[1]))
```

### 2. 📊 Dashboard (Trang Tổng Quan)

**⚠️ Chỉ dành cho LIBRARIAN và ADMIN**

#### **Thống Kê Tổng Quan**
- 📚 Tổng số đầu sách (từ toàn bộ database)
- ✅ Sách có sẵn (status = AVAILABLE)
- 📖 Sách đang mượn (status = BORROWED)
- 🏷️ Số danh mục

#### **Biểu Đồ Trực Quan**
- **Bar Chart**: Thống kê sách theo danh mục (từ backend)
- **Doughnut Chart**: Phân bố sách theo trạng thái (AVAILABLE, BORROWED, DAMAGED, UNAVAILABLE)
- Sử dụng **Chart.js** để vẽ biểu đồ
- Tooltip hiển thị số lượng và phần trăm

#### **Sách Mới Nhất**
- Hiển thị danh sách 10 sách được thêm gần đây
- Quick view thông tin sách

#### **Backend API Integration**
```javascript
// Dashboard gọi backend API
const stats = await DashboardAPI.getStats();
// Returns: { totalBooks, availableBooks, borrowedBooks, categoryStats, statusStats }
```

✅ **Ưu điểm**: Dữ liệu chính xác từ toàn bộ database, không phải tính toán client-side.

### 3. 📚 Thư Viện Sách (`books.html`)

#### **Tính Năng**
- ✅ Xem danh sách sách (có phân trang)
- ➕ Thêm sách mới (LIBRARIAN/ADMIN)
- ✏️ Chỉnh sửa sách (LIBRARIAN/ADMIN)
- 🗑️ Xóa sách (LIBRARIAN/ADMIN)
- 🔍 Tìm kiếm sách (theo tên, tác giả, thể loại)
- 🔄 Sắp xếp (theo tên, tác giả, thể loại, trạng thái)

#### **Book Model**
```javascript
{
  id: number,
  title: string,
  author: string,
  category: string,
  status: 'AVAILABLE' | 'BORROWED' | 'UNAVAILABLE',
  createAt: timestamp,
  updateAt: timestamp,
  isDeleted: boolean
}
```

#### **Trạng Thái Sách**
- 🟢 **AVAILABLE**: Sẵn sàng cho mượn
- 🟡 **BORROWED**: Đang được mượn
- 🔴 **UNAVAILABLE**: Không khả dụng

#### **Modal Form**
- Form thêm/sửa sách với validation
- Các trường: Tên sách, Tác giả, Thể loại, Trạng thái
- Auto-close sau khi thành công

#### **Phân Trang**
```javascript
// Backend trả về PageResponse
{
  content: [...books],
  pageNumber: 0,
  pageSize: 10,
  totalElements: 100,
  totalPages: 10,
  first: true,
  last: false
}
```

### 4. 👥 Quản Lý Người Dùng (`users.html`)

**⚠️ Chỉ dành cho ADMIN**

#### **Tính Năng**
- Xem danh sách tất cả người dùng
- Hiển thị thông tin: Email, Tên, Vai trò
- Phân trang dữ liệu người dùng

#### **Vai Trò (Roles)**
```
GUEST (0) < USER (1) < LIBRARIAN (2) < ADMIN (3)
```

- **USER**: Người dùng thông thường (xem sách)
- **LIBRARIAN**: Thủ thư (quản lý sách)
- **ADMIN**: Quản trị viên (toàn quyền)

### 5. ⚙️ Cài Đặt Cá Nhân (`settings.html`)

#### **Thông Tin Cá Nhân**
- Cập nhật họ và tên
- Hiển thị email (không thể thay đổi)
- Hiển thị vai trò hiện tại

#### **Đổi Mật Khẩu**
- Nhập mật khẩu hiện tại
- Nhập mật khẩu mới (tối thiểu 6 ký tự)
- Xác nhận mật khẩu mới
- Validate trước khi gửi

---

## 🔧 Kiến Trúc Frontend

### 1. **API Service Layer** (`api.js`)

#### **HttpClient Class**
```javascript
const http = new HttpClient(API_BASE_URL)

// Methods
http.get(endpoint, params)
http.post(endpoint, data)
http.put(endpoint, data)
http.delete(endpoint)
```

#### **API Modules**

##### **AuthAPI**
```javascript
AuthAPI.login({ email, password })           // POST /auth/login
AuthAPI.register({ email, password, fullName }) // POST /auth/register
AuthAPI.getProfile()                        // GET /auth/profile
```

##### **BooksAPI**
```javascript
BooksAPI.getAll(page, size)                 // GET /api/books?page=0&size=10
BooksAPI.getAllWithParams({                 // GET /api/books (with search/sort)
  page, size, sortBy, sortDirection, search
})
BooksAPI.getById(id)                        // GET /api/books/{id}
BooksAPI.create(bookData)                   // POST /api/books
BooksAPI.update(id, bookData)               // PUT /api/books/{id}
BooksAPI.delete(id)                         // DELETE /api/books/{id}
```

##### **UserAPI**
```javascript
UserAPI.updatePassword({ oldPassword, newPassword }) // PUT /api/user/password
UserAPI.updateFullName({ fullName })                // PUT /api/user/fullname
```

##### **AdminAPI** (ADMIN only)
```javascript
AdminAPI.getAllUsers(page, size)            // GET /admin/users
AdminAPI.updateUserRole(userId, roleName)   // PUT /admin/users/{id}/role
AdminAPI.deleteUser(userId)                 // DELETE /admin/users/{id}
```

##### **DashboardAPI** (LIBRARIAN/ADMIN only)
```javascript
DashboardAPI.getStats()                     // GET /api/dashboard/stats
// Returns:
// {
//   totalBooks: number,
//   availableBooks: number,
//   borrowedBooks: number,
//   categoryStats: { [category: string]: number },
//   statusStats: { [status: string]: number }
// }
```

✅ **Backend Integration**: Dashboard sử dụng API từ backend, đảm bảo thống kê chính xác từ toàn bộ database.

### 2. **Authentication System** (`auth.js`)

```javascript
// Check authentication
Auth.isAuthenticated()              // boolean
Auth.getCurrentUser()               // Object | null
Auth.getUserRole()                  // 'USER' | 'LIBRARIAN' | 'ADMIN' | 'GUEST'
Auth.getToken()                     // string | null

// Role checking
Auth.hasRole(requiredRole)          // boolean
Auth.isAdmin()                      // boolean
Auth.isLibrarian()                  // boolean

// Auth actions
Auth.login(email, password)         // Promise
Auth.register(userData)             // Promise
Auth.logout()                       // void
Auth.refreshProfile()               // Promise

// Page protection
Auth.requireAuth(requiredRole)      // Redirect if not authenticated
Auth.init()                         // Initialize auth on page load
Auth.setupLogoutButtons()           // Setup logout button handlers
```

### 3. **Utilities** (`utils.js`)

#### **Formatting**
```javascript
Utils.formatDate(dateString)        // '28/12/2025, 10:30'
Utils.formatDateSimple(dateString)  // '28/12/2025'
Utils.formatNumber(number)          // '1.234.567'
```

#### **String Utilities**
```javascript
Utils.getInitials(name)             // 'NVA' from 'Nguyen Van A'
Utils.truncate(text, length)        // 'Lorem ipsum...'
Utils.escapeHtml(text)              // Prevent XSS
```

#### **Validation**
```javascript
Utils.isValidEmail(email)           // boolean
Utils.isValidISBN(isbn)            // boolean
```

#### **Performance**
```javascript
Utils.debounce(func, wait)          // Debounce function
Utils.throttle(func, limit)         // Throttle function
```

#### **Helpers**
```javascript
Utils.buildQueryString(params)      // 'key1=val1&key2=val2'
Utils.parseQueryString(query)       // { key1: 'val1', key2: 'val2' }
Utils.copyToClipboard(text)         // Copy to clipboard
Utils.downloadFile(content, filename) // Download file
Utils.generateId()                  // Generate random ID
Utils.getRandomColor()              // Get random color
Utils.sleep(ms)                     // Async sleep
```

### 4. **Toast Notifications** (`utils.js`)

```javascript
Toast.success('Thao tác thành công')
Toast.error('Có lỗi xảy ra')
Toast.warning('Cảnh báo')
Toast.info('Thông tin')
```

Tự động ẩn sau 3 giây.

### 5. **Loading Indicator** (`utils.js`)

```javascript
Loading.show()      // Hiển thị spinner
Loading.hide()      // Ẩn spinner
```

### 6. **Form Validation** (`utils.js`)

```javascript
Validator.validateRequired(input, fieldName)
Validator.validateEmail(input)
Validator.validateMinLength(input, minLength, fieldName)
Validator.validateMaxLength(input, maxLength, fieldName)
Validator.validateMatch(input1, input2, fieldName)
Validator.showError(input, message)
Validator.clearError(input)
Validator.clearAllErrors(form)
```

### 7. **Local Storage Management** (`utils.js`)

```javascript
Storage.set(key, value)             // Save to localStorage (auto JSON.stringify)
Storage.get(key)                    // Get from localStorage (auto JSON.parse)
Storage.remove(key)                 // Remove from localStorage
Storage.clear()                     // Clear all localStorage
```

### 8. **Reusable Components** (`components.js`)

```javascript
// Generate HTML
Components.getSidebarHTML()
Components.getHeaderHTML(pageTitle, breadcrumbs)
Components.getEmptyStateHTML(options)
Components.getLoadingHTML()
Components.getStatCardHTML(stat)
Components.getPaginationHTML(pageData)

// Initialize components
Components.initSidebar()
Components.initHeader()
Components.renderLayout(options)
```

---

## 🎨 Design System

### 1. **Color Palette** (Vintage Bronze Theme)

```css
/* Primary Colors */
--primary-color: #6d5346;        /* Bronze Brown */
--primary-dark: #5c4a3f;
--primary-light: #8b7e70;

--secondary-color: #7a6250;      /* Warm Bronze */
--accent-color: #a68968;         /* Bronze Gold */

/* Neutral Colors */
--background: #f5f1ea;           /* Cream Beige */
--surface: #faf8f5;
--text-primary: #2c231a;
--text-secondary: #5c5047;

/* Status Colors */
--success: #2c5f2d;              /* Green */
--warning: #ffc107;              /* Yellow */
--error: #c0392b;                /* Red */
--info: #3498db;                 /* Blue */
```

### 2. **Typography**

```css
/* Font Families */
--font-family-primary: 'Merriweather', 'Noto Serif', serif;
--font-family-secondary: 'Noto Serif', serif;

/* Font Sizes */
--font-size-xs: 0.75rem;    /* 12px */
--font-size-sm: 0.875rem;   /* 14px */
--font-size-base: 1rem;     /* 16px */
--font-size-lg: 1.125rem;   /* 18px */
--font-size-xl: 1.25rem;    /* 20px */
--font-size-2xl: 1.5rem;    /* 24px */
--font-size-3xl: 2rem;      /* 32px */
--font-size-4xl: 2.5rem;    /* 40px */

/* Font Weights */
--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
```

### 3. **Spacing System**

```css
--space-xs: 0.25rem;    /* 4px */
--space-sm: 0.5rem;     /* 8px */
--space-md: 1rem;       /* 16px */
--space-lg: 1.5rem;     /* 24px */
--space-xl: 2rem;       /* 32px */
--space-2xl: 3rem;      /* 48px */
--space-3xl: 4rem;      /* 64px */
```

### 4. **Border Radius**

```css
--radius-sm: 0.25rem;   /* 4px */
--radius-md: 0.5rem;    /* 8px */
--radius-lg: 0.75rem;   /* 12px */
--radius-xl: 1rem;      /* 16px */
--radius-full: 9999px;
```

### 5. **Shadows**

```css
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.15);
--shadow-2xl: 0 25px 50px rgba(0, 0, 0, 0.25);
```

### 6. **Responsive Breakpoints**

```css
/* Small devices (≥576px) */
@media (min-width: 576px) { }

/* Medium devices (≥768px) - Tablets */
@media (min-width: 768px) { }

/* Large devices (≥992px) - Desktops */
@media (min-width: 992px) { }

/* Extra large devices (≥1200px) */
@media (min-width: 1200px) { }

/* Extra extra large devices (≥1400px) */
@media (min-width: 1400px) { }
```

### 7. **Layout Constants**

```css
--sidebar-width: 260px;
--sidebar-collapsed-width: 70px;
--header-height: 70px;
--max-content-width: 1400px;
```

---

## 🔐 Phân Quyền & Bảo Mật

### 1. **Role Hierarchy**

```
GUEST (0) → USER (1) → LIBRARIAN (2) → ADMIN (3)
```

- **GUEST**: Chưa đăng nhập (chỉ truy cập login/register)
- **USER**: Người dùng thông thường
  - Xem thư viện sách
  - Cài đặt cá nhân
  - ❌ Không thấy Dashboard trong menu
- **LIBRARIAN**: Thủ thư
  - Tất cả quyền của USER
  - ✅ Xem Dashboard (thống kê)
  - Thêm/sửa/xóa sách
- **ADMIN**: Quản trị viên
  - Tất cả quyền của LIBRARIAN
  - ✅ Xem Dashboard (thống kê)
  - Quản lý người dùng
  - Thay đổi vai trò người dùng

### 2. **Protected Routes**

```javascript
// Protect page - redirect if not authenticated
function protectPage(requiredRole = null) {
  if (!Auth.isAuthenticated()) {
    window.location.href = './index.html';
    return false;
  }
  
  if (requiredRole && !Auth.hasRole(requiredRole)) {
    Toast.error('Bạn không có quyền truy cập');
    window.location.href = './dashboard.html';
    return false;
  }
  
  return true;
}

// Redirect if already authenticated
function redirectIfAuthenticated() {
  if (Auth.isAuthenticated()) {
    window.location.href = './dashboard.html';
  }
}
```

### 3. **UI Element Permissions**

```html
<!-- Ẩn menu items dựa trên role -->
<li data-role-required="LIBRARIAN">
  <a href="./dashboard.html">Trang chủ</a> <!-- Chỉ LIBRARIAN/ADMIN -->
</li>

<li data-role-required="ADMIN">
  <a href="./users.html">Quản lý người dùng</a> <!-- Chỉ ADMIN -->
</li>

<button data-role-required="LIBRARIAN" onclick="addBook()">
  Thêm sách <!-- Chỉ LIBRARIAN/ADMIN -->
</button>
```

```javascript
// Hide elements based on role
Auth.init() {
  document.querySelectorAll('[data-role-required]').forEach(el => {
    const requiredRole = el.getAttribute('data-role-required');
    if (!Auth.hasRole(requiredRole)) {
      el.style.display = 'none';
    }
  });
}
```

### 4. **JWT Token Security**

```javascript
// Token stored in localStorage
localStorage.setItem('token', jwtToken)

// Sent with every API request
headers: {
  'Authorization': `Bearer ${token}`
}

// Auto logout on 401 Unauthorized
if (response.status === 401) {
  Auth.logout();
  window.location.href = './index.html';
}
```

⚠️ **Bảo mật quan trọng**:
- Token được lưu trong `localStorage` (có thể bị XSS)
- Nên validate CSRF token cho các form quan trọng
- Backend phải validate token và role cho mọi request
- Không tin tưởng hoàn toàn client-side authorization

---

## 📱 Responsive Design

### Mobile-First Approach

```css
/* Mobile first (default) */
.sidebar {
  position: fixed;
  left: -100%;
  transition: left 0.3s;
}

/* Show on mobile when toggled */
.sidebar.mobile-open {
  left: 0;
}

/* Desktop */
@media (min-width: 992px) {
  .sidebar {
    left: 0;
    position: static;
  }
}
```

### Breakpoint Strategy

- **< 576px**: Mobile phones (1 column)
- **576px - 768px**: Large phones (2 columns)
- **768px - 992px**: Tablets (2-3 columns)
- **992px+**: Desktops (full layout)

### Responsive Components

- **Sidebar**: Collapsible on mobile, overlay on tablet, fixed on desktop
  - Menu items ẩn theo role với `data-role-required`
- **Tables**: Horizontal scroll on mobile, full table on desktop
- **Cards**: Stack on mobile, grid on desktop
- **Forms**: Full width on mobile, 2-column on desktop
- **Dashboard Stats Cards**: 1 column on mobile, 2 columns on tablet, 4 columns on desktop
- **Charts**: Responsive với maintainAspectRatio=true

---

## 🚀 Cách Chạy Dự Án

### 1. **Yêu Cầu**

- Backend Spring Boot đang chạy tại `http://localhost:8086`
- Trình duyệt web hiện đại (Chrome, Firefox, Edge, Safari)
- Optional: Live Server extension cho VS Code

### 2. **Cách 1: Sử dụng Live Server (VS Code)**

```bash
# Cài đặt extension Live Server trong VS Code
# Click chuột phải vào index.html
# Chọn "Open with Live Server"
```

### 3. **Cách 2: Sử dụng Python HTTP Server**

```bash
cd library-management-html
python -m http.server 5500
# Truy cập http://localhost:5500
```

### 4. **Cách 3: Mở trực tiếp file HTML**

```bash
# Double-click vào index.html
# Hoặc kéo thả vào trình duyệt
```

⚠️ **Lưu ý**: Một số tính năng có thể không hoạt động khi mở trực tiếp file HTML do CORS policy. Khuyến nghị sử dụng Live Server hoặc HTTP Server.

### 5. **Cấu Hình Backend URL**

Mặc định frontend gọi API tại `http://localhost:8086`. Để thay đổi:

```javascript
// Sửa trong assets/js/api.js
const API_BASE_URL = 'http://localhost:8086';  // Thay đổi URL này
```

---

## 🧪 Testing

### 1. **Test Accounts**

```
Admin:
  Email: admin@gmail.com
  Password: admin123

Librarian:
  Email: librarian@gmail.com
  Password: librarian

User:
  Email: user@gmail.com
  Password: user123
```

### 2. **Keyboard Shortcuts (Dev Mode)**

```
Alt + A: Auto-fill Admin credentials
Alt + L: Auto-fill Librarian credentials
Alt + U: Auto-fill User credentials
```

### 3. **Console Debug**

Mở Developer Tools (F12) để xem:
- API requests/responses
- Authentication state
- Error messages
- JWT token payload

---

## 🐛 Troubleshooting

### 1. **Không Đăng Nhập Được**

```javascript
// Check trong Console
console.log('Token:', localStorage.getItem('token'))
console.log('User:', localStorage.getItem('currentUser'))
console.log('Is Authenticated:', Auth.isAuthenticated())

// Clear localStorage và thử lại
localStorage.clear()
```

### 2. **CORS Error**

```
Access to fetch at 'http://localhost:8086/auth/login' from origin 
'http://localhost:5500' has been blocked by CORS policy
```

**Giải pháp**: Backend phải enable CORS cho frontend origin:

```java
@Configuration
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:5500")
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
```

### 3. **401 Unauthorized**

- Token hết hạn hoặc không hợp lệ
- Đăng xuất và đăng nhập lại
- Kiểm tra JWT expiration time trong backend

### 4. **404 Not Found**

- Backend không chạy hoặc sai URL
- Kiểm tra `API_BASE_URL` trong `api.js`
- Kiểm tra backend có endpoint đó không

### 5. **Dữ Liệu Không Hiển Thị**

```javascript
// Check API response trong Console
// Đảm bảo backend trả về đúng định dạng PageResponse:
{
  content: [...],
  pageNumber: 0,
  pageSize: 10,
  totalElements: 100,
  totalPages: 10,
  first: true,
  last: false
}
```

---

## 📝 TODO & Improvements

### 🔴 Critical (Cần làm ngay)

- [x] ✅ Backend cung cấp endpoint `/api/dashboard/stats` cho thống kê chính xác
- [ ] Implement proper error handling cho network failures
- [ ] Add loading states cho tất cả API calls
- [ ] Implement refresh token mechanism
- [ ] Backend implement soft delete cho users (filter isDeleted=false)

### 🟡 Important (Nên làm)

- [ ] Add client-side caching để giảm API calls
- [ ] Implement optimistic UI updates
- [ ] Add offline support với Service Worker
- [ ] Improve search với debounce và highlighting
- [ ] Add export to CSV/Excel functionality
- [ ] Implement drag & drop file upload cho book covers

### 🟢 Nice to Have (Có thể làm)

- [ ] Add dark mode support
- [ ] Implement advanced filters (multi-select, date range)
- [ ] Add keyboard shortcuts cho power users
- [ ] Implement virtual scrolling cho large lists
- [ ] Add animation transitions
- [ ] Implement print-friendly views
- [ ] Add accessibility (ARIA labels, keyboard navigation)
- [ ] Internationalization (i18n) - Multi-language support

### 🔧 Technical Debt

- [ ] Migrate to TypeScript cho type safety
- [ ] Implement proper module bundler (Webpack/Vite)
- [ ] Add unit tests với Jest
- [ ] Add E2E tests với Cypress/Playwright
- [ ] Setup CI/CD pipeline
- [ ] Implement proper logging system
- [ ] Add performance monitoring

---

## 📚 Best Practices

### 1. **Code Style**

```javascript
// Use descriptive variable names
const userRole = Auth.getUserRole();

// Use async/await instead of .then()
async function loadBooks() {
  try {
    const books = await BooksAPI.getAll();
    renderBooks(books);
  } catch (error) {
    Toast.error(error.message);
  }
}

// Always handle errors
try {
  await someOperation();
} catch (error) {
  console.error('Operation failed:', error);
  Toast.error('Something went wrong');
}
```

### 2. **Performance**

```javascript
// Debounce search input
searchInput.addEventListener('input', Utils.debounce(() => {
  performSearch();
}, 500));

// Throttle scroll events
window.addEventListener('scroll', Utils.throttle(() => {
  handleScroll();
}, 100));

// Lazy load images
<img data-src="image.jpg" loading="lazy">
```

### 3. **Security**

```javascript
// Always escape user input
const safeHTML = Utils.escapeHtml(userInput);

// Validate on client AND server
if (!Validator.validateEmail(email)) {
  return; // Don't send to server
}

// Use HTTPS in production
const API_BASE_URL = 'https://api.example.com';
```

### 4. **Accessibility**

```html
<!-- Use semantic HTML -->
<main>
  <nav aria-label="Main navigation">
    <button aria-label="Close modal">×</button>
  </nav>
</main>

<!-- Add alt text to images -->
<img src="logo.png" alt="Sarly Library Logo">

<!-- Make forms accessible -->
<label for="email">Email</label>
<input id="email" type="email" required>
```

---

## 🤝 Contributing

### Quy Trình Đóng Góp

1. Fork repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

### Code Review Checklist

- [ ] Code tuân thủ style guide
- [ ] Đã test trên nhiều trình duyệt
- [ ] Đã test responsive trên mobile/tablet
- [ ] Không có console errors
- [ ] Đã validate tất cả forms
- [ ] Đã handle tất cả error cases
- [ ] Đã update documentation

---

## 📄 License

MIT License - Free to use for educational purposes.

---

## 👨‍💻 Author

**Giang NH**
- GitHub: [@giangnh]
- Email: giang@example.com

---

## 📞 Support

Nếu gặp vấn đề, vui lòng:
1. Kiểm tra phần [Troubleshooting](#-troubleshooting)
2. Xem [Backend Documentation]
3. Tạo issue trên GitHub
4. Liên hệ qua email

---

**⭐ Nếu project hữu ích, đừng quên cho một star trên GitHub!**

*Last updated: December 28, 2025*
