# Frontend Integration với Backend API

## 📋 Tổng Quan

Frontend đã được cập nhật để tích hợp với Backend API chạy ở `localhost:8086`. Tất cả các fetch operations đã được implement để kết nối với các controller.

## 🔗 API Endpoints Đã Tích Hợp

### Authentication Controller (`/auth`)
- **POST** `/auth/login` - Đăng nhập
- **POST** `/auth/register` - Đăng ký
- **GET** `/auth/profile` - Lấy thông tin profile

### Book Controller (`/api/books`) 
- **GET** `/api/books` - Lấy danh sách tất cả sách
- **GET** `/api/books/{id}` - Lấy thông tin sách theo ID
- **POST** `/api/books` - Tạo sách mới
- **PUT** `/api/books/{id}` - Cập nhật thông tin sách
- **DELETE** `/api/books/{id}` - Xóa sách

### Admin Book Controller (`/admin/books`)
- **POST** `/admin/books` - Tạo sách (Admin only)

## 📂 Files Đã Được Cập Nhật

### 1. **api-service.js** (NEW)
- Service layer để handle tất cả API calls
- Authentication management với JWT tokens
- Error handling và fallback logic
- Utility functions để check user roles và permissions

### 2. **auth.js**
- `handleLogin()` - Gọi API login thật
- `handleRegister()` - Gọi API register thật  
- Error handling và UI feedback

### 3. **dashboard.js**
- `loadBooksFromAPI()` - Load sách từ API thay vì mock data
- `initializeDashboard()` - Check authentication trước khi load

### 4. **book-form.js**
- `createBookRecord()` - Tạo sách mới qua API
- `updateBookRecord()` - Cập nhật sách qua API
- `populateFormForEdit()` - Load dữ liệu sách từ API để edit

### 5. **book-detail.js** 
- `renderBookDetail()` - Load chi tiết sách từ API
- Fallback logic khi API không available

### 6. **utils.js**
- `deleteBookRecord()` - Xóa sách qua API
- User management functions
- `handleLogout()` - Logout functionality

### 7. **HTML Templates**
- Thêm `api-service.js` script vào tất cả templates cần thiết

## 🚀 Cách Sử Dụng

### 1. Khởi Động Backend
```bash
# Đảm bảo backend Spring Boot chạy ở localhost:8086
mvn spring-boot:run
# hoặc
gradle bootRun
```

### 2. Khởi Động Frontend
- Mở file HTML bằng Live Server hoặc serve qua web server
- Frontend sẽ tự động connect đến backend API

### 3. Authentication Flow
1. User đăng nhập qua form login
2. JWT token được lưu vào localStorage
3. Tất cả subsequent API calls sẽ include token trong header
4. Nếu token hết hạn, user sẽ được redirect về login page

## 🔧 Configuration

### API Base URL
```javascript
const API_BASE_URL = 'http://localhost:8086';
```

### Request Headers
```javascript
function getAuthHeaders() {
  const token = localStorage.getItem('authToken');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
}
```

## 🛡️ Error Handling

### API Request Wrapper
```javascript
async function apiRequest(url, options = {}) {
  try {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      headers: getAuthHeaders(),
      ...options,
      body: options.body ? JSON.stringify(options.body) : options.body
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || `HTTP error! status: ${response.status}`);
    }

    return {
      success: true,
      data: responseData
    };
  } catch (error) {
    console.error('API Request Error:', error);
    return {
      success: false,
      error: error.message || 'An error occurred while making the request'
    };
  }
}
```

### Fallback Logic
- Khi API không available, app sẽ sử dụng mock data
- User sẽ được thông báo khi có lỗi API
- Graceful degradation để đảm bảo UX không bị ảnh hưởng

## 🔄 Data Flow

1. **Login Process:**
   ```
   User Input → validateForm() → login() API → Store JWT → Redirect to Dashboard
   ```

2. **Book Management:**
   ```
   Dashboard → getAllBooks() API → Render Table
   Create Book → createBook() API → Success Message → Redirect
   Edit Book → getBookById() API → Populate Form → updateBook() API
   Delete Book → deleteBook() API → Refresh Dashboard
   ```

## 📝 Notes

- JWT tokens được store trong localStorage
- CORS đã được enable ở backend cho `origins = "*"`
- Error messages được hiển thị thông qua notification system
- Fallback đến mock data khi API không available
- Authentication check ở mỗi protected page

## 🐛 Debugging

### Check API Calls
```javascript
// Enable console logging to see API requests
console.log('API Request:', url, options);
console.log('API Response:', result);
```

### Common Issues
1. **CORS Error:** Đảm bảo backend có `@CrossOrigin(origins = "*")`
2. **401 Unauthorized:** Check JWT token trong localStorage
3. **Network Error:** Verify backend đang chạy ở localhost:8086
4. **JSON Parse Error:** Check response format từ backend

## 🎯 Next Steps

- Implement real-time updates với WebSocket
- Add caching mechanism cho better performance  
- Implement offline mode
- Add proper error tracking và monitoring