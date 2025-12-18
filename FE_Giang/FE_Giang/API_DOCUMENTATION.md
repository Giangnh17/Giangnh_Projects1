# 📚 API Documentation - Library Management System
*Tài liệu kết nối API cho Hệ Thống Quản Lý Thư Viện*

---

## 🌐 Thông Tin Cơ Bản

### Base URL
```
http://localhost:8086
```

### Authentication Method
- **Phương thức:** JWT (JSON Web Token)
- **Header:** `Authorization: Bearer {token}`
- **Storage:** Token được lưu trong `localStorage` với key `token`

### Content Type
```
Content-Type: application/json
```

---

## 🔐 Authentication APIs

### 1. Đăng Nhập (Login)

**Endpoint:** `POST /auth/login`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response Success (200 OK):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe",
    "role": "USER"
  }
}
```

**Response Error (401 Unauthorized):**
```json
{
  "message": "Invalid credentials"
}
```

**Cách sử dụng:**
```javascript
const loginData = {
  email: "user@example.com",
  password: "password123"
};

const response = await fetch("http://localhost:8086/auth/login", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(loginData)
});

const data = await response.json();
if (response.ok) {
  localStorage.setItem('token', data.token);
  localStorage.setItem('currentUser', JSON.stringify(data.user));
}
```

---

### 2. Đăng Ký (Register)

**Endpoint:** `POST /auth/register`

**Request Body:**
```json
{
  "email": "newuser@example.com",
  "password": "password123",
  "name": "Jane Doe",
  "confirmPassword": "password123"
}
```

**Response Success (201 Created):**
```json
{
  "id": 2,
  "email": "newuser@example.com",
  "name": "Jane Doe",
  "role": "USER"
}
```

**Response Error (400 Bad Request):**
```json
{
  "message": "Email already exists"
}
```

**Cách sử dụng:**
```javascript
const registerData = {
  email: "newuser@example.com",
  password: "password123",
  name: "Jane Doe"
};

const response = await fetch("http://localhost:8086/auth/register", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(registerData)
});

const data = await response.json();
```

---

### 3. Lấy Thông Tin Profile

**Endpoint:** `GET /auth/profile`

**Headers Required:**
```
Authorization: Bearer {token}
```

**Response Success (200 OK):**
```json
{
  "id": 1,
  "email": "user@example.com",
  "name": "John Doe",
  "role": "USER"
}
```

**Cách sử dụng:**
```javascript
const token = localStorage.getItem("token");

const response = await fetch("http://localhost:8086/auth/profile", {
  method: "GET",
  headers: {
    "Authorization": `Bearer ${token}`
  }
});

const profile = await response.json();
```

---

## 📖 Book Management APIs

### 1. Lấy Danh Sách Tất Cả Sách

**Endpoint:** `GET /api/books`

**Headers Required:**
```
Authorization: Bearer {token}
```

**Response Success (200 OK):**
```json
[
  {
    "id": 1,
    "title": "Clean Code",
    "author": "Robert C. Martin",
    "isbn": "978-0132350884",
    "publisher": "Prentice Hall",
    "publishedYear": 2008,
    "category": "Programming",
    "quantity": 5,
    "available": 3,
    "description": "A handbook of agile software craftsmanship"
  },
  {
    "id": 2,
    "title": "Design Patterns",
    "author": "Gang of Four",
    "isbn": "978-0201633610",
    "publisher": "Addison-Wesley",
    "publishedYear": 1994,
    "category": "Software Engineering",
    "quantity": 3,
    "available": 2,
    "description": "Elements of Reusable Object-Oriented Software"
  }
]
```

**Cách sử dụng:**
```javascript
const token = localStorage.getItem("token");

const response = await fetch("http://localhost:8086/api/books", {
  method: "GET",
  headers: {
    "Authorization": `Bearer ${token}`
  }
});

const books = await response.json();
```

---

### 2. Lấy Thông Tin Sách Theo ID

**Endpoint:** `GET /api/books/{id}`

**Headers Required:**
```
Authorization: Bearer {token}
```

**URL Parameters:**
- `id` (integer): ID của sách cần lấy

**Response Success (200 OK):**
```json
{
  "id": 1,
  "title": "Clean Code",
  "author": "Robert C. Martin",
  "isbn": "978-0132350884",
  "publisher": "Prentice Hall",
  "publishedYear": 2008,
  "category": "Programming",
  "quantity": 5,
  "available": 3,
  "description": "A handbook of agile software craftsmanship"
}
```

**Response Error (404 Not Found):**
```json
{
  "message": "Book not found"
}
```

**Cách sử dụng:**
```javascript
const token = localStorage.getItem("token");
const bookId = 1;

const response = await fetch(`http://localhost:8086/api/books/${bookId}`, {
  method: "GET",
  headers: {
    "Authorization": `Bearer ${token}`
  }
});

const book = await response.json();
```

---

### 3. Tạo Sách Mới

**Endpoint:** `POST /api/books`

**Headers Required:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Effective Java",
  "author": "Joshua Bloch",
  "isbn": "978-0134685991",
  "publisher": "Addison-Wesley",
  "publishedYear": 2018,
  "category": "Programming",
  "quantity": 10,
  "available": 10,
  "description": "Best practices for the Java platform"
}
```

**Response Success (201 Created):**
```json
{
  "id": 3,
  "title": "Effective Java",
  "author": "Joshua Bloch",
  "isbn": "978-0134685991",
  "publisher": "Addison-Wesley",
  "publishedYear": 2018,
  "category": "Programming",
  "quantity": 10,
  "available": 10,
  "description": "Best practices for the Java platform"
}
```

**Response Error (400 Bad Request):**
```json
{
  "message": "ISBN already exists"
}
```

**Cách sử dụng:**
```javascript
const token = localStorage.getItem("token");
const bookData = {
  title: "Effective Java",
  author: "Joshua Bloch",
  isbn: "978-0134685991",
  publisher: "Addison-Wesley",
  publishedYear: 2018,
  category: "Programming",
  quantity: 10,
  available: 10,
  description: "Best practices for the Java platform"
};

const response = await fetch("http://localhost:8086/api/books", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  },
  body: JSON.stringify(bookData)
});

const newBook = await response.json();
```

---

### 4. Cập Nhật Thông Tin Sách

**Endpoint:** `PUT /api/books/{id}`

**Headers Required:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**URL Parameters:**
- `id` (integer): ID của sách cần cập nhật

**Request Body:**
```json
{
  "title": "Clean Code - Updated Edition",
  "author": "Robert C. Martin",
  "isbn": "978-0132350884",
  "publisher": "Prentice Hall",
  "publishedYear": 2008,
  "category": "Programming",
  "quantity": 7,
  "available": 5,
  "description": "Updated handbook of agile software craftsmanship"
}
```

**Response Success (200 OK):**
```json
{
  "id": 1,
  "title": "Clean Code - Updated Edition",
  "author": "Robert C. Martin",
  "isbn": "978-0132350884",
  "publisher": "Prentice Hall",
  "publishedYear": 2008,
  "category": "Programming",
  "quantity": 7,
  "available": 5,
  "description": "Updated handbook of agile software craftsmanship"
}
```

**Response Error (404 Not Found):**
```json
{
  "message": "Book not found"
}
```

**Cách sử dụng:**
```javascript
const token = localStorage.getItem("token");
const bookId = 1;
const updatedData = {
  title: "Clean Code - Updated Edition",
  author: "Robert C. Martin",
  isbn: "978-0132350884",
  publisher: "Prentice Hall",
  publishedYear: 2008,
  category: "Programming",
  quantity: 7,
  available: 5,
  description: "Updated handbook of agile software craftsmanship"
};

const response = await fetch(`http://localhost:8086/api/books/${bookId}`, {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  },
  body: JSON.stringify(updatedData)
});

const updatedBook = await response.json();
```

---

### 5. Xóa Sách

**Endpoint:** `DELETE /api/books/{id}`

**Headers Required:**
```
Authorization: Bearer {token}
```

**URL Parameters:**
- `id` (integer): ID của sách cần xóa

**Response Success (200 OK):**
```json
{
  "message": "Book deleted successfully"
}
```

**Response Error (404 Not Found):**
```json
{
  "message": "Book not found"
}
```

**Cách sử dụng:**
```javascript
const token = localStorage.getItem("token");
const bookId = 1;

const response = await fetch(`http://localhost:8086/api/books/${bookId}`, {
  method: "DELETE",
  headers: {
    "Authorization": `Bearer ${token}`
  }
});

if (response.ok) {
  console.log("Book deleted successfully");
}
```

---

## 🔒 Admin APIs

### Tạo Sách (Admin Only)

**Endpoint:** `POST /admin/books`

**Headers Required:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Role Required:** `ADMIN`

**Request Body:**
```json
{
  "title": "Advanced Programming Concepts",
  "author": "Expert Author",
  "isbn": "978-1234567890",
  "publisher": "Tech Publishers",
  "publishedYear": 2024,
  "category": "Advanced Programming",
  "quantity": 15,
  "available": 15,
  "description": "Advanced concepts for experienced programmers"
}
```

**Response Success (201 Created):**
```json
{
  "id": 4,
  "title": "Advanced Programming Concepts",
  "author": "Expert Author",
  "isbn": "978-1234567890",
  "publisher": "Tech Publishers",
  "publishedYear": 2024,
  "category": "Advanced Programming",
  "quantity": 15,
  "available": 15,
  "description": "Advanced concepts for experienced programmers"
}
```

**Response Error (403 Forbidden):**
```json
{
  "message": "Access denied. Admin role required."
}
```

**Cách sử dụng:**
```javascript
const token = localStorage.getItem("token");
const bookData = {
  title: "Advanced Programming Concepts",
  author: "Expert Author",
  isbn: "978-1234567890",
  publisher: "Tech Publishers",
  publishedYear: 2024,
  category: "Advanced Programming",
  quantity: 15,
  available: 15,
  description: "Advanced concepts for experienced programmers"
};

const response = await fetch("http://localhost:8086/admin/books", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  },
  body: JSON.stringify(bookData)
});

const newBook = await response.json();
```

---

## 🛠️ Helper Functions (JavaScript)

### Authentication Helper Functions

```javascript
// Kiểm tra user có đăng nhập không
function isAuthenticated() {
  return localStorage.getItem('token') !== null;
}

// Lấy thông tin user hiện tại
function getCurrentUser() {
  const userStr = localStorage.getItem('currentUser');
  return userStr ? JSON.parse(userStr) : null;
}

// Lấy role của user
function getUserRole() {
  const user = getCurrentUser();
  return user ? user.role : 'GUEST';
}

// Kiểm tra user có role yêu cầu không
function hasRole(requiredRole) {
  const userRole = getUserRole();
  const roleHierarchy = {
    'GUEST': 0,
    'VIEWER': 1,
    'LIBRARIAN': 2,
    'ADMIN': 3
  };
  
  return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
}

// Đăng xuất
function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('currentUser');
  window.location.href = '/src/main/resources/templates/auth-login.html';
}
```

### Universal API Request Wrapper

```javascript
async function apiRequest(endpoint, method = 'GET', body = null) {
  const token = localStorage.getItem('token');
  
  const options = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  };
  
  if (body && method !== 'GET') {
    options.body = JSON.stringify(body);
  }
  
  try {
    const response = await fetch(`http://localhost:8086${endpoint}`, options);
    const data = await response.json();
    
    if (response.ok) {
      return { success: true, data: data };
    } else {
      return { success: false, error: data.message || 'Request failed' };
    }
  } catch (error) {
    console.error('API Request Error:', error);
    return { success: false, error: 'Network error. Please check your connection.' };
  }
}
```

---

## 📋 Data Models

### User Model
```typescript
interface User {
  id: number;
  email: string;
  name: string;
  role: 'GUEST' | 'VIEWER' | 'LIBRARIAN' | 'ADMIN';
}
```

### Book Model
```typescript
interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  publisher: string;
  publishedYear: number;
  category: string;
  quantity: number;
  available: number;
  description: string;
}
```

### Login Request
```typescript
interface LoginRequest {
  email: string;
  password: string;
}
```

### Register Request
```typescript
interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  confirmPassword?: string; // frontend only
}
```

---

## 🚨 Error Handling

### Common HTTP Status Codes

| Status Code | Meaning | Handling |
|------------|---------|----------|
| 200 | OK | Request thành công |
| 201 | Created | Resource được tạo thành công |
| 400 | Bad Request | Dữ liệu request không hợp lệ |
| 401 | Unauthorized | Token không hợp lệ hoặc hết hạn |
| 403 | Forbidden | Không có quyền truy cập |
| 404 | Not Found | Resource không tồn tại |
| 500 | Internal Server Error | Lỗi server |

### Error Response Format
```json
{
  "message": "Error description",
  "timestamp": "2024-12-14T10:30:00",
  "status": 400
}
```

### Error Handling Example
```javascript
async function makeApiCall() {
  try {
    const response = await fetch('http://localhost:8086/api/books', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    
    if (!response.ok) {
      // Handle HTTP errors
      if (response.status === 401) {
        // Token expired, redirect to login
        logout();
        return;
      }
      
      const errorData = await response.json();
      throw new Error(errorData.message || 'Request failed');
    }
    
    const data = await response.json();
    return { success: true, data: data };
    
  } catch (error) {
    console.error('API Error:', error);
    return { success: false, error: error.message };
  }
}
```

---

## 🔑 Role-Based Access Control

### Role Hierarchy
```
GUEST (0) < VIEWER (1) < LIBRARIAN (2) < ADMIN (3)
```

### Permission Matrix

| Endpoint | GUEST | VIEWER | LIBRARIAN | ADMIN |
|----------|-------|--------|-----------|-------|
| POST /auth/login | ✅ | ✅ | ✅ | ✅ |
| POST /auth/register | ✅ | ✅ | ✅ | ✅ |
| GET /auth/profile | ❌ | ✅ | ✅ | ✅ |
| GET /api/books | ❌ | ✅ | ✅ | ✅ |
| GET /api/books/{id} | ❌ | ✅ | ✅ | ✅ |
| POST /api/books | ❌ | ❌ | ✅ | ✅ |
| PUT /api/books/{id} | ❌ | ❌ | ✅ | ✅ |
| DELETE /api/books/{id} | ❌ | ❌ | ✅ | ✅ |
| POST /admin/books | ❌ | ❌ | ❌ | ✅ |

---

## 🔄 Authentication Flow

```
┌─────────────┐
│   User      │
│  Input      │
│ Credentials │
└──────┬──────┘
       │
       ▼
┌──────────────────┐
│ POST /auth/login │
└──────┬───────────┘
       │
       ▼
┌──────────────────┐      Success     ┌─────────────────┐
│  Backend Server  │ ───────────────► │  Return Token   │
│   Validates      │                  │  + User Info    │
└──────┬───────────┘                  └────────┬────────┘
       │                                       │
       │ Failure                               ▼
       ▼                              ┌─────────────────┐
┌──────────────────┐                 │  Store Token    │
│  Return Error    │                 │  in localStorage│
│    Message       │                 └────────┬────────┘
└──────────────────┘                          │
                                              ▼
                                     ┌─────────────────┐
                                     │  Redirect to    │
                                     │   Dashboard     │
                                     └─────────────────┘
```

---

## 📊 Data Flow Example

### Creating a Book

```
┌──────────────┐
│ User fills   │
│  book form   │
└──────┬───────┘
       │
       ▼
┌──────────────────────┐
│  Frontend validates  │
│      form data       │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────────┐
│ POST /api/books          │
│ Headers:                 │
│   Authorization: Bearer  │
│   Content-Type: JSON     │
│ Body: book data          │
└──────┬───────────────────┘
       │
       ▼
┌──────────────────────────┐
│  Backend validates       │
│  - Token                 │
│  - User role             │
│  - Book data             │
│  - ISBN uniqueness       │
└──────┬───────────────────┘
       │
       ├─── Success ───────►┌─────────────────┐
       │                    │  Save to DB     │
       │                    │  Return book    │
       │                    └────────┬────────┘
       │                             │
       │                             ▼
       │                    ┌─────────────────┐
       │                    │ Show success    │
       │                    │    message      │
       │                    │ Redirect to     │
       │                    │   dashboard     │
       │                    └─────────────────┘
       │
       └─── Failure ───────►┌─────────────────┐
                            │  Return error   │
                            │    message      │
                            │  Show to user   │
                            └─────────────────┘
```

---

## 🧪 Testing Examples

### cURL Commands

#### Login
```bash
curl -X POST http://localhost:8086/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'
```

#### Get All Books
```bash
curl -X GET http://localhost:8086/api/books \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

#### Create Book
```bash
curl -X POST http://localhost:8086/api/books \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "title":"Test Book",
    "author":"Test Author",
    "isbn":"978-1234567890",
    "publisher":"Test Publisher",
    "publishedYear":2024,
    "category":"Test",
    "quantity":10,
    "available":10,
    "description":"Test description"
  }'
```

### Postman Collection

```json
{
  "info": {
    "name": "Library Management API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Auth",
      "item": [
        {
          "name": "Login",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"email\": \"user@example.com\",\n  \"password\": \"password123\"\n}"
            },
            "url": {
              "raw": "http://localhost:8086/auth/login",
              "protocol": "http",
              "host": ["localhost"],
              "port": "8086",
              "path": ["auth", "login"]
            }
          }
        }
      ]
    },
    {
      "name": "Books",
      "item": [
        {
          "name": "Get All Books",
          "request": {
            "method": "GET",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{token}}"
              }
            ],
            "url": {
              "raw": "http://localhost:8086/api/books",
              "protocol": "http",
              "host": ["localhost"],
              "port": "8086",
              "path": ["api", "books"]
            }
          }
        }
      ]
    }
  ]
}
```

---

## ⚙️ Configuration

### CORS Configuration
Backend phải enable CORS để frontend có thể kết nối:

```java
@CrossOrigin(origins = "*")
@RestController
public class BookController {
    // ...
}
```

### Environment Variables
```bash
# Backend
SERVER_PORT=8086
JWT_SECRET=your-secret-key
JWT_EXPIRATION=86400000

# Frontend
API_BASE_URL=http://localhost:8086
```

---

## 🐛 Troubleshooting

### Common Issues

#### 1. CORS Error
**Triệu chứng:**
```
Access to fetch at 'http://localhost:8086/api/books' from origin 'http://localhost:3000' 
has been blocked by CORS policy
```

**Giải pháp:**
- Đảm bảo backend có `@CrossOrigin(origins = "*")` annotation
- Hoặc configure CORS globally trong Spring Boot

#### 2. 401 Unauthorized
**Triệu chứng:**
```json
{
  "message": "Unauthorized",
  "status": 401
}
```

**Giải pháp:**
- Kiểm tra token trong localStorage
- Kiểm tra format header: `Authorization: Bearer {token}`
- Token có thể đã hết hạn, cần login lại

#### 3. Network Error
**Triệu chứng:**
```
Failed to fetch
TypeError: NetworkError when attempting to fetch resource
```

**Giải pháp:**
- Kiểm tra backend có đang chạy không
- Kiểm tra URL có đúng không
- Kiểm tra firewall/antivirus

#### 4. 404 Not Found
**Triệu chứng:**
```json
{
  "message": "Book not found",
  "status": 404
}
```

**Giải pháp:**
- Kiểm tra ID có tồn tại không
- Kiểm tra endpoint URL có đúng không

---

## 📱 Integration Examples

### React Integration

```javascript
// api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8086',
});

// Add token to all requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token expiration
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const login = (credentials) => API.post('/auth/login', credentials);
export const getBooks = () => API.get('/api/books');
export const createBook = (bookData) => API.post('/api/books', bookData);
```

### Angular Integration

```typescript
// api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseURL = 'http://localhost:8086';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    });
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.baseURL}/auth/login`, credentials);
  }

  getBooks(): Observable<any> {
    return this.http.get(`${this.baseURL}/api/books`, {
      headers: this.getHeaders()
    });
  }

  createBook(bookData: any): Observable<any> {
    return this.http.post(`${this.baseURL}/api/books`, bookData, {
      headers: this.getHeaders()
    });
  }
}
```

### Vue.js Integration

```javascript
// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8086',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  getBooks: () => api.get('/api/books'),
  getBook: (id) => api.get(`/api/books/${id}`),
  createBook: (bookData) => api.post('/api/books', bookData),
  updateBook: (id, bookData) => api.put(`/api/books/${id}`, bookData),
  deleteBook: (id) => api.delete(`/api/books/${id}`)
};
```

---

## 📝 Notes

1. **Token Storage:** Token được lưu trong `localStorage`, có thể xem xét sử dụng `httpOnly cookies` cho security tốt hơn.

2. **Token Expiration:** Backend cần implement token expiration và refresh token mechanism.

3. **Error Messages:** Tất cả error messages nên được localized theo ngôn ngữ của user.

4. **Rate Limiting:** Nên implement rate limiting ở backend để tránh abuse.

5. **API Versioning:** Xem xét thêm version vào URL (e.g., `/api/v1/books`) cho future compatibility.

6. **Pagination:** Với danh sách dài, nên implement pagination cho `GET /api/books`.

7. **Search & Filter:** Có thể thêm query parameters cho search và filter:
   ```
   GET /api/books?search=clean&category=programming&page=1&limit=10
   ```

8. **File Upload:** Nếu cần upload ảnh bìa sách, cần thêm endpoint:
   ```
   POST /api/books/{id}/cover
   Content-Type: multipart/form-data
   ```

---

## 📞 Contact & Support

- **Backend Repository:** [Link to backend repo]
- **Frontend Repository:** [Link to frontend repo]
- **Issue Tracker:** [Link to issue tracker]
- **Documentation:** [Link to full documentation]

---

*Last Updated: December 14, 2024*
*Version: 1.0.0*
