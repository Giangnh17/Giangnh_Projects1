# 📚 Library Management System - Backend API

## 📋 Mục lục
- [Tổng quan dự án](#tổng-quan-dự-án)
- [Công nghệ sử dụng](#công-nghệ-sử-dụng)
- [Tính năng chính](#tính-năng-chính)
- [Cấu trúc dự án](#cấu-trúc-dự-án)
- [Database Schema](#database-schema)
- [API Endpoints](#api-endpoints)
- [Dashboard Statistics](#dashboard-statistics)
- [Phân trang, Sắp xếp và Tìm kiếm](#phân-trang-sắp-xếp-và-tìm-kiếm)
- [Authentication & Authorization](#authentication--authorization)
- [Hướng dẫn cài đặt](#hướng-dẫn-cài-đặt)
- [Tích hợp Frontend](#tích-hợp-frontend)

---

## 🎯 Tổng quan dự án

**Library Management System Backend** là một RESTful API được xây dựng bằng **Spring Boot** để quản lý hệ thống thư viện. Dự án cung cấp đầy đủ các chức năng quản lý sách, người dùng với hệ thống phân quyền Role-Based Access Control (RBAC).

### Các role trong hệ thống:
- **ADMIN** - Quản trị viên hệ thống
- **LIBRARIAN** - Thủ thư, quản lý sách
- **USER** - Người dùng thông thường

---

## 🛠 Công nghệ sử dụng

### Backend Framework
- **Spring Boot 3.x** - Framework chính
- **Java 17** - Ngôn ngữ lập trình
- **Maven** - Build tool và dependency management

### Spring Modules
- **Spring Data JPA** - ORM và database operations
- **Spring Security** - Authentication & Authorization
- **Spring Web** - RESTful API
- **Spring Validation** - Request validation

### Security & Authentication
- **JWT (JSON Web Token)** - Token-based authentication
  - `io.jsonwebtoken:jjwt-api:0.13.0`
  - `io.jsonwebtoken:jjwt-impl:0.13.0`
  - `io.jsonwebtoken:jjwt-jackson:0.13.0`
- **BCrypt** - Password encryption

### Database
- **MS SQL Server** - Relational Database
- **Hibernate** - ORM implementation

---

## ✨ Tính năng chính

### 1. Authentication & Authorization
- ✅ Đăng ký tài khoản (Register)
- ✅ Đăng nhập với JWT (Login)
- ✅ Xác thực token (JWT validation)
- ✅ Role-based access control (ADMIN, LIBRARIAN, USER)
- ✅ Profile management

### 2. Quản lý Sách (Books Management)
- ✅ CRUD operations (Create, Read, Update, Delete)
- ✅ Phân trang (Pagination)
- ✅ Sắp xếp (Sorting) theo các field
- ✅ Tìm kiếm (Search) theo title, author, category
- ✅ Phân quyền: Public xem, ADMIN/LIBRARIAN quản lý

### 3. Quản lý Người dùng (User Management)
- ✅ Xem danh sách users với phân trang, sắp xếp, tìm kiếm
- ✅ Update role user (chỉ ADMIN)
- ✅ Soft delete user (chỉ ADMIN)
- ✅ Update password (USER, LIBRARIAN)
- ✅ Update full name (USER, LIBRARIAN)
- ✅ Bảo vệ: Không thể xóa hoặc thay đổi ADMIN

### 4. Dashboard & Statistics (ADMIN, LIBRARIAN)
- ✅ Tổng số sách trong hệ thống
- ✅ Số sách có sẵn (AVAILABLE)
- ✅ Số sách đang được mượn (BORROWED)
- ✅ Thống kê số sách theo danh mục (category) - cho biểu đồ cột
- ✅ Thống kê số sách theo trạng thái (status) - cho pie chart
- ✅ Real-time data, không cache
- ✅ Phân quyền: Chỉ ADMIN và LIBRARIAN truy cập

### 5. Tính năng kỹ thuật
- ✅ Soft delete pattern (isDeleted flag)
- ✅ Automatic timestamps (createdAt, updatedAt)
- ✅ Global Exception Handler
- ✅ CORS configuration
- ✅ Input validation với Jakarta Validation
- ✅ JOIN FETCH để tránh N+1 query problem

---

## 📁 Cấu trúc dự án

```
src/main/java/com/example/demo/
├── config/                          # Cấu hình
│   ├── SecurityConfig.java          # Spring Security configuration
│   ├── JwtService.java              # JWT token service
│   ├── JwtAuthFilter.java           # JWT authentication filter
│   ├── CustomUserDetailsService.java # Custom UserDetails service
│   ├── DataInitializer.java         # Khởi tạo dữ liệu ban đầu
│   └── GlobalExceptionHandler.java  # Xử lý exception toàn cục
│
├── controller/                      # REST Controllers
│   ├── AuthController.java          # Auth endpoints (login, register, profile)
│   ├── BookController.java          # Book management endpoints
│   ├── AdminController.java         # Admin management endpoints
│   ├── DashboardController.java     # Dashboard statistics endpoints (ADMIN, LIBRARIAN)
│   └── UserController.java          # User profile endpoints
│
├── service/                         # Service Interfaces
│   ├── AuthService.java
│   ├── BookService.java
│   ├── AdminService.java
│   ├── DashboardService.java        # Dashboard statistics service
│   ├── UserService.java
│   └── impl/                        # Service Implementations
│       ├── AuthServiceImpl.java
│       ├── BookServiceImpl.java
│       ├── AdminServiceImpl.java
│       ├── DashboardServiceImpl.java
│       └── UserServiceImpl.java
│
├── repository/                      # JPA Repositories
│   ├── UserRepository.java
│   ├── BookRepository.java
│   └── RoleRepository.java
│
├── entity/                          # JPA Entities
│   ├── BaseEntity.java              # Base class với id, timestamps, isDeleted
│   ├── User.java
│   ├── Book.java
│   └── Role.java
│
├── dto/                             # Data Transfer Objects
│   ├── request/
│   │   ├── LoginRequest.java
│   │   ├── RegisterRequest.java
│   │   ├── CreateBookRequest.java
│   │   ├── UpdateUserRoleRequest.java
│   │   ├── UpdatePasswordRequest.java
│   │   ├── UpdateFullNameRequest.java
│   │   └── PageRequest.java         # DTO cho pagination, sorting, search
│   └── response/
│       ├── UserProfileResponse.java
│       ├── PageResponse.java        # Generic response cho pagination
│       └── DashboardStatsResponse.java  # Response cho dashboard statistics
│
└── FinalProjectApplication.java     # Main application class

src/main/resources/
├── application.properties           # Configuration
├── data-init.sql                    # SQL khởi tạo dữ liệu
└── verify-data.sql                  # SQL kiểm tra dữ liệu
```

---

## 🗄 Database Schema

### Table: `users`
```sql
CREATE TABLE users (
    id BIGINT PRIMARY KEY IDENTITY(1,1),
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    role_id BIGINT,
    create_at DATETIME2,
    update_at DATETIME2,
    is_deleted BIT DEFAULT 0,
    FOREIGN KEY (role_id) REFERENCES roles(id)
);
```

### Table: `books`
```sql
CREATE TABLE books (
    id BIGINT PRIMARY KEY IDENTITY(1,1),
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    status VARCHAR(50),
    create_at DATETIME2,
    update_at DATETIME2,
    is_deleted BIT DEFAULT 0
);
```

### Table: `roles`
```sql
CREATE TABLE roles (
    id BIGINT PRIMARY KEY IDENTITY(1,1),
    role_name VARCHAR(50) NOT NULL UNIQUE
);
```

### Dữ liệu mặc định
```sql
-- Roles
INSERT INTO roles (role_name) VALUES ('ROLE_ADMIN'), ('ROLE_LIBRARIAN'), ('ROLE_USER');

-- Admin account (password: admin123)
INSERT INTO users (email, password, full_name, role_id, create_at, update_at, is_deleted)
VALUES ('admin@library.com', '$2a$10$...', 'System Admin', 1, GETDATE(), GETDATE(), 0);
```

---

## 🌐 API Endpoints

### 🔐 Authentication APIs (`/auth`)

#### 1. Register
```http
POST /auth/register
Content-Type: application/json

{
    "email": "user@example.com",
    "name": "Nguyen Van A",
    "password": "password123"
}

Response: 200 OK
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "role": "ROLE_USER"
}
```

#### 2. Login
```http
POST /auth/login
Content-Type: application/json

{
    "email": "admin@library.com",
    "password": "admin123"
}

Response: 200 OK
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "role": "ROLE_ADMIN"
}
```

#### 3. Get Profile
```http
GET /auth/profile
Authorization: Bearer <token>

Response: 200 OK
{
    "id": 1,
    "email": "admin@library.com",
    "fullName": "System Admin",
    "role": "ROLE_ADMIN"
}
```

---

### 📚 Book APIs (`/api/books`)

#### 1. Get All Books (Public + Pagination + Sorting + Search)
```http
GET /api/books?page=0&size=10&sortBy=title&sortDirection=ASC&search=java

Query Parameters:
- page: Số trang (default: 0)
- size: Số items mỗi trang (default: 10, max: 100)
- sortBy: Field để sắp xếp (id, title, author, category, status)
- sortDirection: ASC hoặc DESC (default: ASC)
- search: Từ khóa tìm kiếm (tìm trong title, author, category)

Response: 200 OK
{
    "content": [
        {
            "id": 1,
            "title": "Java Programming",
            "author": "John Doe",
            "category": "Programming",
            "status": "AVAILABLE",
            "createAt": "2024-01-01T10:00:00",
            "updateAt": "2024-01-01T10:00:00"
        }
    ],
    "pageNumber": 0,
    "pageSize": 10,
    "totalElements": 50,
    "totalPages": 5,
    "last": false,
    "first": true
}
```

#### 2. Get Book By ID (Public)
```http
GET /api/books/{id}

Response: 200 OK
{
    "id": 1,
    "title": "Java Programming",
    "author": "John Doe",
    "category": "Programming",
    "status": "AVAILABLE"
}
```

#### 3. Create Book (ADMIN, LIBRARIAN only)
```http
POST /api/books
Authorization: Bearer <token>
Content-Type: application/json

{
    "title": "Spring Boot Guide",
    "author": "Jane Smith",
    "category": "Framework",
    "status": "AVAILABLE"
}

Response: 201 Created
{
    "id": 2,
    "title": "Spring Boot Guide",
    "author": "Jane Smith",
    "category": "Framework",
    "status": "AVAILABLE"
}
```

#### 4. Update Book (ADMIN, LIBRARIAN only)
```http
PUT /api/books/{id}
Authorization: Bearer <token>
Content-Type: application/json

{
    "title": "Spring Boot Guide - Updated",
    "author": "Jane Smith",
    "category": "Framework",
    "status": "BORROWED"
}

Response: 200 OK
```

#### 5. Delete Book (ADMIN, LIBRARIAN only)
```http
DELETE /api/books/{id}
Authorization: Bearer <token>

Response: 200 OK
"Book deleted successfully"
```

---

### 👥 Admin APIs (`/admin`) - ADMIN Only

#### 1. Get All Users (Pagination + Sorting + Search)
```http
GET /admin/users?page=0&size=10&sortBy=email&sortDirection=ASC&search=nguyen

Query Parameters:
- page: Số trang (default: 0)
- size: Số items mỗi trang (default: 10)
- sortBy: Field để sắp xếp (id, email, fullName, createAt)
- sortDirection: ASC hoặc DESC (default: ASC)
- search: Từ khóa tìm kiếm (tìm trong email, fullName)

Response: 200 OK
{
    "content": [
        {
            "id": 2,
            "email": "user@example.com",
            "fullName": "Nguyen Van A",
            "role": {
                "id": 3,
                "roleName": "ROLE_USER"
            },
            "deleted": false
        }
    ],
    "pageNumber": 0,
    "pageSize": 10,
    "totalElements": 15,
    "totalPages": 2,
    "last": false,
    "first": true
}
```

#### 2. Update User Role
```http
PUT /admin/users/{userId}/role
Authorization: Bearer <token>
Content-Type: application/json

{
    "roleName": "ROLE_LIBRARIAN"
}

Response: 200 OK
"Cập nhật role thành công"
```

#### 3. Soft Delete User
```http
DELETE /admin/users/{userId}
Authorization: Bearer <token>

Response: 200 OK
"Xóa user thành công"

Note: Không thể xóa ADMIN
```

---

### 👤 User Profile APIs (`/api/user`) - USER, LIBRARIAN

#### 1. Update Password
```http
PUT /api/user/password
Authorization: Bearer <token>
Content-Type: application/json

{
    "oldPassword": "oldpass123",
    "newPassword": "newpass456"
}

Response: 200 OK
"Cập nhật mật khẩu thành công"

Note: ADMIN không được phép dùng API này
```

#### 2. Update Full Name
```http
PUT /api/user/fullname
Authorization: Bearer <token>
Content-Type: application/json

{
    "fullName": "Nguyen Van B"
}

Response: 200 OK
"Cập nhật tên thành công"

Note: ADMIN không được phép dùng API này
```

---

### 📊 Dashboard APIs (`/api/dashboard`) - ADMIN, LIBRARIAN Only

#### Get Dashboard Statistics
```http
GET /api/dashboard/stats
Authorization: Bearer <token>

Response: 200 OK
{
    "totalBooks": 10,
    "availableBooks": 6,
    "borrowedBooks": 3,
    "categoryStats": {
        "Children": 4,
        "Romance": 2,
        "Fantasy": 1,
        "Classics": 1,
        "Young Adult": 1,
        "Self-help": 1
    },
    "statusStats": {
        "AVAILABLE": 6,
        "BORROWED": 3,
        "DAMAGED": 1
    }
}

Description:
- totalBooks: Tổng số sách trong hệ thống (không bao gồm sách đã xóa)
- availableBooks: Số sách có sẵn để mượn (status = "AVAILABLE")
- borrowedBooks: Số sách đang được mượn (status = "BORROWED")
- categoryStats: Object chứa số lượng sách theo từng danh mục (cho biểu đồ cột)
- statusStats: Object chứa số lượng sách theo trạng thái (cho pie chart)

Note: 
- Chỉ ADMIN và LIBRARIAN có quyền truy cập endpoint này
- Dữ liệu chỉ bao gồm sách chưa bị xóa (isDeleted = false)
```

---

## 📄 Phân trang, Sắp xếp và Tìm kiếm

### PageRequest DTO
```java
public class PageRequest {
    private int page = 0;              // Trang hiện tại (bắt đầu từ 0)
    private int size = 10;             // Số items mỗi trang (max: 100)
    private String sortBy;             // Field để sort (vd: "title", "email")
    private String sortDirection = "ASC"; // "ASC" hoặc "DESC"
    private String search;             // Từ khóa tìm kiếm
}
```

### PageResponse<T> - Generic Response
```java
public class PageResponse<T> {
    private List<T> content;          // Danh sách items
    private int pageNumber;           // Trang hiện tại
    private int pageSize;             // Số items mỗi trang
    private long totalElements;       // Tổng số items
    private int totalPages;           // Tổng số trang
    private boolean last;             // Có phải trang cuối không
    private boolean first;            // Có phải trang đầu không
}
```

### Cách sử dụng

#### Backend - Repository Layer
```java
@Query("SELECT b FROM Book b WHERE " +
       "LOWER(b.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
       "LOWER(b.author) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
       "LOWER(b.category) LIKE LOWER(CONCAT('%', :keyword, '%'))")
Page<Book> searchBooks(@Param("keyword") String keyword, Pageable pageable);
```

#### Backend - Service Layer
```java
// Tạo Pageable với sorting
Pageable pageable;
if (pageRequest.getSortBy() != null && !pageRequest.getSortBy().isEmpty()) {
    Sort sort = Sort.by(
        "DESC".equalsIgnoreCase(pageRequest.getSortDirection()) 
            ? Sort.Direction.DESC 
            : Sort.Direction.ASC,
        pageRequest.getSortBy()
    );
    pageable = PageRequest.of(pageRequest.getPage(), pageRequest.getSize(), sort);
} else {
    pageable = PageRequest.of(pageRequest.getPage(), pageRequest.getSize());
}

// Tìm kiếm hoặc lấy tất cả
Page<Book> bookPage;
if (pageRequest.getSearch() != null && !pageRequest.getSearch().trim().isEmpty()) {
    bookPage = bookRepository.searchBooks(pageRequest.getSearch().trim(), pageable);
} else {
    bookPage = bookRepository.findAll(pageable);
}
```

#### Frontend - HTTP Request
```javascript
// Example với Fetch API
const fetchBooks = async (page = 0, size = 10, sortBy = 'title', sortDirection = 'ASC', search = '') => {
    const params = new URLSearchParams({
        page: page,
        size: size,
        sortBy: sortBy,
        sortDirection: sortDirection,
        search: search
    });
    
    const response = await fetch(`/api/books?${params}`);
    const data = await response.json();
    return data;
};

// Sử dụng
fetchBooks(0, 10, 'title', 'ASC', 'java')
    .then(data => {
        console.log('Books:', data.content);
        console.log('Total pages:', data.totalPages);
    });
```

---

## 🔒 Authentication & Authorization

### JWT Token
- **Thuật toán**: HS256 (HMAC with SHA-256)
- **Secret Key**: Được config trong `application.properties`
- **Expiration**: 5 hours (cấu hình được)
- **Header**: `Authorization: Bearer <token>`

### Token Structure
```json
{
    "sub": "user@example.com",    // Username (email)
    "role": "ROLE_USER",           // User role
    "iat": 1234567890,             // Issued at
    "exp": 1234585890              // Expiration
}
```

### Security Configuration

#### Public Endpoints (không cần token)
- `POST /auth/login`
- `POST /auth/register`
- `GET /api/books` (xem danh sách sách)
- `GET /api/books/{id}` (xem chi tiết sách)

#### Protected Endpoints

**ADMIN only:**
- `GET /admin/users`
- `PUT /admin/users/{userId}/role`
- `DELETE /admin/users/{userId}`

**ADMIN + LIBRARIAN:**
- `GET /api/dashboard/stats` (Dashboard statistics)
- `POST /api/books`
- `PUT /api/books/{id}`
- `DELETE /api/books/{id}`

**USER + LIBRARIAN:**
- `PUT /api/user/password`
- `PUT /api/user/fullname`

**All authenticated:**
- `GET /auth/profile`

### Password Encryption
- Sử dụng **BCrypt** với strength 10
- Password được hash trước khi lưu database
- Không thể reverse engineer từ hash

---

## 🚀 Hướng dẫn cài đặt

### 1. Prerequisites
- Java JDK 17 trở lên
- MS SQL Server
- Maven 3.6+
- IDE (IntelliJ IDEA, Eclipse, hoặc VS Code)

### 2. Clone project
```bash
git clone <repository-url>
cd final_project/BE
```

### 3. Cấu hình Database

#### Tạo database
```sql
CREATE DATABASE FINAL_PROJECT;
```

#### Cập nhật `application.properties`
```properties
spring.datasource.url=jdbc:sqlserver://localhost:1433;databaseName=FINAL_PROJECT;encrypt=false;trustServerCertificate=true
spring.datasource.username=sa
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
```

### 4. Build và Run

#### Sử dụng Maven
```bash
# Build project
./mvnw clean install

# Run application
./mvnw spring-boot:run
```

#### Hoặc chạy từ IDE
- Import project as Maven project
- Run `FinalProjectApplication.java`

### 5. Khởi tạo dữ liệu mẫu

Chạy script SQL:
```bash
# Windows PowerShell
.\load-data.ps1

# Linux/Mac
./load-data.sh

# Windows Command Prompt
load-data.bat
```

Hoặc chạy thủ công file `src/main/resources/data-init.sql`

### 6. Verify Installation

Server sẽ chạy tại: `http://localhost:8086`

Test với curl:
```bash
# Test login
curl -X POST http://localhost:8086/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@library.com","password":"admin123"}'

# Test get books
curl http://localhost:8086/api/books?page=0&size=10
```

---

## 🌍 Tích hợp Frontend

### React Example
│   ├── DataInitializer.java             - Khởi tạo dữ liệu mặc định (Admin, Librarian, User)
│   ├── GlobalExceptionHandler.java      - ✨ NEW: Xử lý validation errors
│   ├── JwtAuthFilter.java               - Filter xác thực JWT
│   ├── JwtService.java                  - Service xử lý JWT
│   └── SecurityConfig.java              - Cấu hình Spring Security với method security
│
├── controller/                      # 🎮 REST Controllers
│   ├── AuthController.java              - Endpoint đăng ký/đăng nhập
│   ├── BookController.java              - Endpoint quản lý sách (CRUD với phân quyền)
│   ├── AdminBookController.java         - Endpoint quản lý sách (admin)
│   ├── AdminController.java             - ✨ NEW: Endpoint quản lý users (admin only)
│   └── UserController.java              - ✨ NEW: Endpoint cho user/librarian
│
├── dto/                             # 📦 Data Transfer Objects
│   ├── request/
│   │   ├── CreateBookRequest.java       - Request tạo/update sách (category là String)
│   │   ├── LoginRequest.java
│   │   ├── RegisterRequest.java
│   │   ├── UpdateFullNameRequest.java   - ✨ NEW: Request update tên
│   │   ├── UpdatePasswordRequest.java   - ✨ NEW: Request đổi mật khẩu
│   │   └── UpdateUserRoleRequest.java   - ✨ NEW: Request update role
│   └── response/
│       └── UserProfileResponse.java
│
├── entity/                          # 🗂 Database Entities
│   ├── BaseEntity.java                  - Abstract entity với các field chung
│   ├── Book.java                        - Entity sách (category là String)
│   ├── Role.java                        - Entity vai trò (đã fix @OneToMany)
│   └── User.java                        - Entity người dùng
│
├── repository/                      # 💾 Data Access Layer
│   ├── BookRepository.java
│   ├── RoleRepository.java
│   └── UserRepository.java              - JOIN FETCH role để tránh lazy loading
│
├── service/                         # 🔧 Business Logic Layer
│   ├── AuthService.java                 - Interface
│   ├── BookService.java                 - Interface
│   ├── UserService.java                 - ✨ NEW: Interface cho user management
│   ├── AdminService.java                - ✨ NEW: Interface cho admin operations
│   └── impl/
│       ├── AuthServiceImpl.java         - Implementation
│       ├── BookServiceImpl.java         - Implementation (xử lý String category)
│       ├── UserServiceImpl.java         - ✨ NEW: Implementation update password/name
│       └── AdminServiceImpl.java        - ✨ NEW: Implementation quản lý users
│
└── FinalProjectApplication.java     # 🚀 Main Application
```

---

## 🔍 Chi tiết các thành phần

### 1️⃣ **Entity Layer** - Lớp dữ liệu

#### BaseEntity (Abstract Class)
```java
@MappedSuperclass
public abstract class BaseEntity {
    - id: Long (Auto-generated)
    - createAt: LocalDateTime (Auto-set khi tạo)
    - updateAt: LocalDateTime (Auto-update khi sửa)
    - isDeleted: boolean (Soft delete flag)
}
```
**Pattern**: Sử dụng **inheritance** để tránh code trùng lặp, tất cả entity đều kế thừa BaseEntity.

#### User Entity
```java
@Entity
@Table(name = "users")
public class User extends BaseEntity {
    - email: String
    - password: String (Encrypted với BCrypt)
    - fullName: String
    - role: Role (ManyToOne relationship)
}
```

#### Book Entity
```java
@Entity
@Table(name = "books")
public class Book extends BaseEntity {
    - title: String
    - author: String
    - category: String (đã đổi từ ManyToOne Category thành String)
    - status: String (AVAILABLE/BORROWED)
}
```

**Lưu ý**: Category đã được đơn giản hóa từ relationship entity thành String field để dễ quản lý.

#### Role Entity
```java
@Entity
@Table(name = "roles")
public class Role extends BaseEntity {
    - roleName: String (ROLE_USER, ROLE_ADMIN, ROLE_LIBRARIAN)
}
```

---

### 2️⃣ **Repository Layer** - Truy xuất dữ liệu

**Pattern**: Sử dụng **Spring Data JPA Repository Pattern**

```java
public interface UserRepository extends JpaRepository<User, Long> {
    @Query("SELECT u FROM User u JOIN FETCH u.role WHERE u.email = :email")
    User findByEmail(@Param("email") String email);
}
```

**Lợi ích**:
- Tự động generate SQL queries
- Không cần viết boilerplate code
- Type-safe queries
- **JOIN FETCH** tránh LazyInitializationException khi load user với role

---

### 3️⃣ **Service Layer** - Business Logic

**Pattern**: **Service Interface + Implementation**

#### Interface (Contract)
```java
public interface AuthService {
    ResponseEntity<?> register(RegisterRequest request);
    ResponseEntity<?> login(LoginRequest request);
    ResponseEntity<?> profile();
}
```

#### Implementation
```java
@Service
public class AuthServiceImpl implements AuthService {
    // Business logic implementation
}
```

**Lợi ích**:
- Tách biệt contract và implementation
- Dễ dàng test và mock
- Tuân thủ SOLID principles

---

### 4️⃣ **Controller Layer** - REST API Endpoints

**Pattern**: **RESTful Controller**

```java
@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        return authService.login(request);
    }
}
```

**Best Practices**:
- Sử dụng HTTP methods đúng (GET, POST, PUT, DELETE)
- ResponseEntity cho flexible response
- DTO pattern cho request/response

---

### 5️⃣ **Security & Authentication**

#### JWT Authentication Flow

```
┌─────────────┐
│   Client    │
└──────┬──────┘
       │ 1. POST /auth/login (email, password)
       ▼
┌─────────────────────┐
│  AuthController     │
└──────┬──────────────┘
       │ 2. Authenticate
       ▼
┌─────────────────────┐
│  AuthService        │
└──────┬──────────────┘
       │ 3. Check credentials
       ▼
┌─────────────────────┐
│  UserRepository     │
└──────┬──────────────┘
       │ 4. User found
       ▼
┌─────────────────────┐
│  JwtService         │
└──────┬──────────────┘
       │ 5. Generate JWT Token
       ▼
┌─────────────┐
│   Client    │ (Lưu token)
└─────────────┘
```

#### JwtAuthFilter - Security Filter
```java
@Component
public class JwtAuthFilter extends OncePerRequestFilter {
    // 1. Lấy token từ Authorization header
    // 2. Validate token
    // 3. Load user từ database
    // 4. Set authentication vào SecurityContext
}
```

#### SecurityConfig - Phân quyền
```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    // Cấu hình:
    // - /auth/** → Public (permitAll)
    // - /admin/** → Chỉ ADMIN
    // - /user/** → USER và ADMIN
    // - /books/** → USER, ADMIN, LIBRARIAN
}
```

---

### 6️⃣ **DTO Pattern** - Data Transfer Objects

**Tại sao sử dụng DTO?**
- ✅ Tách biệt data layer và presentation layer
- ✅ Bảo mật: không expose toàn bộ entity
- ✅ Flexibility: có thể customize response

#### Request DTOs
```java
public class LoginRequest {
    private String email;
    private String password;
}

public class CreateBookRequest {
    private String title;
    private String author;
    private String category;
    private String status;
}
```

#### Response DTOs
```java
public class UserProfileResponse {
    private Long id;
    private String email;
    private String fullName;
    private String role;
    // Không trả về password
}
```

---

## 🔄 Flow hoạt động

### 1. User Registration Flow
```
Client → POST /auth/register
    ↓
AuthController → AuthService.register()
    ↓
1. Check email tồn tại chưa
2. Mã hóa password (BCrypt)
3. Set role mặc định = ROLE_USER
4. Save user vào database
5. Generate JWT token
    ↓
Return token cho client
```

### 2. User Login Flow
```
Client → POST /auth/login
    ↓
AuthController → AuthService.login()
    ↓
1. AuthenticationManager authenticate credentials
2. Load UserDetails từ database
3. Generate JWT token
    ↓
Return token cho client
```

### 3. Protected Endpoint Access Flow
```
Client → GET /auth/profile (with Bearer Token)
    ↓
JwtAuthFilter intercept request
    ↓
1. Extract token từ Authorization header
2. Validate token (signature, expiration)
3. Extract username từ token
4. Load UserDetails từ database
5. Set Authentication vào SecurityContext
    ↓
SecurityConfig check permissions
    ↓
Controller → Service → Repository
    ↓
Return response
```

### 4. CRUD Operations Flow (Books Example)
```
Create Book:
Client → POST /api/books (with token)
    ↓
JwtAuthFilter → Verify JWT
    ↓
SecurityConfig → Check role (LIBRARIAN/ADMIN)
    ↓
BookController → BookService.createBook()
    ↓
1. Map DTO → Entity
2. Set default status = "AVAILABLE"
3. Save to database (triggers @PrePersist)
4. Return saved book
```

---

## ⚙️ Cấu hình và cài đặt

### application.properties
```properties
# Server Configuration
server.port=8086

# SQL Server Database
spring.datasource.url=jdbc:sqlserver://localhost:1433;databaseName=FINAL_PROJECT
spring.datasource.username=sa
spring.datasource.password=anhan123!
spring.datasource.driver-class-name=com.microsoft.sqlserver.jdbc.SQLServerDriver

# JPA/Hibernate
spring.jpa.show-sql=true                    # Show SQL queries trong console
spring.jpa.hibernate.ddl-auto=update        # Auto update database schema
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.SQLServerDialect

# JWT Security
jwt.secret=ac1c4e8f-5ac7-4714-bbd4-1573336eff04
jwt.expiration=1m                           # Token hết hạn sau 1 phút (demo)
```

### Data Initialization
`DataInitializer.java` tự động chạy khi application start:
- Tạo 3 roles: ROLE_USER, ROLE_ADMIN, ROLE_LIBRARIAN
- Tạo 3 tài khoản mặc định:
  - **Admin**: `admin@gmail.com` / `admin`
  - **Librarian**: `librarian@gmail.com` / `librarian`
  - **User**: `user@gmail.com` / `user`

---

## 📄 Phân trang, Sắp xếp và Tìm kiếm

### Overview
Dự án hỗ trợ đầy đủ các tính năng:
- **Pagination** (Phân trang) - Chia dữ liệu thành nhiều trang
- **Sorting** (Sắp xếp) - Sắp xếp theo field bất kỳ
- **Search** (Tìm kiếm) - Tìm kiếm full-text

### PageRequest DTO
```java
public class PageRequest {
    private int page = 0;              // Trang hiện tại (bắt đầu từ 0)
    private int size = 10;             // Số items mỗi trang (1-100)
    private String sortBy;             // Field để sort (ví dụ: "title", "email")
    private String sortDirection = "ASC"; // "ASC" hoặc "DESC"
    private String search;             // Từ khóa tìm kiếm
    
    // Getters, Setters với validation
    // - page: không âm
    // - size: 1-100
    // - sortDirection: chỉ ASC/DESC
}
```

### PageResponse<T> - Generic Response
```java
public class PageResponse<T> {
    private List<T> content;          // Danh sách items của trang hiện tại
    private int pageNumber;           // Trang hiện tại (0-based)
    private int pageSize;             // Số items mỗi trang
    private long totalElements;       // Tổng số items trong database
    private int totalPages;           // Tổng số trang
    private boolean last;             // Có phải trang cuối không
    private boolean first;            // Có phải trang đầu không
}
```

### Repository Layer - Search Queries

#### BookRepository - Tìm kiếm sách
```java
@Query("SELECT b FROM Book b WHERE " +
       "LOWER(b.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
       "LOWER(b.author) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
       "LOWER(b.category) LIKE LOWER(CONCAT('%', :keyword, '%'))")
Page<Book> searchBooks(@Param("keyword") String keyword, Pageable pageable);
```
**Giải thích:**
- `LOWER()` - Không phân biệt hoa thường
- `CONCAT('%', :keyword, '%')` - Tìm kiếm có chứa keyword
- Tìm trong 3 fields: title, author, category

#### UserRepository - Tìm kiếm user
```java
@Query("SELECT u FROM User u WHERE " +
       "LOWER(u.email) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
       "LOWER(u.fullName) LIKE LOWER(CONCAT('%', :keyword, '%'))")
Page<User> searchUsers(@Param("keyword") String keyword, Pageable pageable);
```
**Giải thích:**
- Tìm trong email và fullName
- Case-insensitive search

### Service Layer - Logic xử lý

```java
@Override
public ResponseEntity<?> getAllBooks(PageRequest pageRequest) {
    try {
        Pageable pageable;
        
        // Tạo Pageable với sorting nếu có sortBy
        if (pageRequest.getSortBy() != null && !pageRequest.getSortBy().isEmpty()) {
            Sort sort = Sort.by(
                "DESC".equalsIgnoreCase(pageRequest.getSortDirection()) 
                    ? Sort.Direction.DESC 
                    : Sort.Direction.ASC,
                pageRequest.getSortBy()
            );
            pageable = PageRequest.of(pageRequest.getPage(), pageRequest.getSize(), sort);
        } else {
            pageable = PageRequest.of(pageRequest.getPage(), pageRequest.getSize());
        }
        
        Page<Book> bookPage;
        
        // Kiểm tra có search keyword không
        if (pageRequest.getSearch() != null && !pageRequest.getSearch().trim().isEmpty()) {
            // Có search -> dùng searchBooks
            bookPage = bookRepository.searchBooks(pageRequest.getSearch().trim(), pageable);
        } else {
            // Không search -> lấy tất cả
            bookPage = bookRepository.findAll(pageable);
        }
        
        // Map sang PageResponse
        PageResponse<Book> response = new PageResponse<>(
            bookPage.getContent(),
            bookPage.getNumber(),
            bookPage.getSize(),
            bookPage.getTotalElements(),
            bookPage.getTotalPages(),
            bookPage.isLast(),
            bookPage.isFirst()
        );
        
        return ResponseEntity.ok(response);
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body("Error: " + e.getMessage());
    }
}
```

### Controller Layer - Nhận parameters

```java
@GetMapping
public ResponseEntity<?> getAllBooks(@ModelAttribute PageRequest pageRequest) {
    return bookService.getAllBooks(pageRequest);
}
```
**Giải thích:**
- `@ModelAttribute` - Tự động bind query parameters vào PageRequest object
- Không cần Lombok, chỉ cần có getter/setter và no-arg constructor

### API Request Examples

#### 1. Lấy trang đầu tiên (mặc định)
```http
GET /api/books
```
Response:
```json
{
    "content": [...],
    "pageNumber": 0,
    "pageSize": 10,
    "totalElements": 50,
    "totalPages": 5,
    "first": true,
    "last": false
}
```

#### 2. Lấy trang thứ 2, mỗi trang 20 items
```http
GET /api/books?page=1&size=20
```

#### 3. Sắp xếp theo title, tăng dần
```http
GET /api/books?sortBy=title&sortDirection=ASC
```

#### 4. Sắp xếp theo author, giảm dần
```http
GET /api/books?sortBy=author&sortDirection=DESC
```

#### 5. Tìm kiếm sách có chứa "java"
```http
GET /api/books?search=java
```

#### 6. Kết hợp tất cả: Tìm "java", sắp xếp theo title, trang 2, 15 items/trang
```http
GET /api/books?search=java&sortBy=title&sortDirection=ASC&page=1&size=15
```

### Frontend Integration

#### JavaScript (Vanilla)
```javascript
async function fetchBooks(page = 0, size = 10, sortBy = '', sortDirection = 'ASC', search = '') {
    const params = new URLSearchParams({
        page: page,
        size: size,
        ...(sortBy && { sortBy: sortBy }),
        ...(sortDirection && { sortDirection: sortDirection }),
        ...(search && { search: search })
    });
    
    const response = await fetch(`http://localhost:8086/api/books?${params}`);
    const data = await response.json();
    
    console.log('Books:', data.content);
    console.log('Total pages:', data.totalPages);
    console.log('Total items:', data.totalElements);
    
    return data;
}

// Sử dụng
fetchBooks(0, 10, 'title', 'ASC', 'java');
```

#### React Example
```jsx
import React, { useState, useEffect } from 'react';

function BookList() {
    const [books, setBooks] = useState([]);
    const [pagination, setPagination] = useState({
        pageNumber: 0,
        pageSize: 10,
        totalPages: 0,
        totalElements: 0
    });
    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState('title');
    const [sortDirection, setSortDirection] = useState('ASC');

    useEffect(() => {
        fetchBooks();
    }, [pagination.pageNumber, sortBy, sortDirection, search]);

    const fetchBooks = async () => {
        const params = new URLSearchParams({
            page: pagination.pageNumber,
            size: pagination.pageSize,
            sortBy: sortBy,
            sortDirection: sortDirection,
            search: search
        });

        const response = await fetch(`http://localhost:8086/api/books?${params}`);
        const data = await response.json();
        
        setBooks(data.content);
        setPagination({
            pageNumber: data.pageNumber,
            pageSize: data.pageSize,
            totalPages: data.totalPages,
            totalElements: data.totalElements
        });
    };

    return (
        <div>
            {/* Search box */}
            <input 
                type="text"
                placeholder="Tìm kiếm sách..."
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                    setPagination(prev => ({ ...prev, pageNumber: 0 })); // Reset về trang đầu
                }}
            />
            
            {/* Sort controls */}
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="title">Tiêu đề</option>
                <option value="author">Tác giả</option>
                <option value="category">Thể loại</option>
            </select>
            
            <button onClick={() => setSortDirection(sortDirection === 'ASC' ? 'DESC' : 'ASC')}>
                {sortDirection === 'ASC' ? '↑' : '↓'}
            </button>
            
            {/* Book list */}
            <div className="book-list">
                {books.map(book => (
                    <div key={book.id} className="book-item">
                        <h3>{book.title}</h3>
                        <p>Tác giả: {book.author}</p>
                        <p>Thể loại: {book.category}</p>
                        <p>Trạng thái: {book.status}</p>
                    </div>
                ))}
            </div>
            
            {/* Pagination controls */}
            <div className="pagination">
                <button 
                    disabled={pagination.pageNumber === 0}
                    onClick={() => setPagination(prev => ({ 
                        ...prev, 
                        pageNumber: prev.pageNumber - 1 
                    }))}
                >
                    ← Trang trước
                </button>
                
                <span>
                    Trang {pagination.pageNumber + 1} / {pagination.totalPages}
                    ({pagination.totalElements} sách)
                </span>
                
                <button 
                    disabled={pagination.pageNumber >= pagination.totalPages - 1}
                    onClick={() => setPagination(prev => ({ 
                        ...prev, 
                        pageNumber: prev.pageNumber + 1 
                    }))}
                >
                    Trang sau →
                </button>
            </div>
        </div>
    );
}

export default BookList;
```

#### Angular Example
```typescript
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

interface PageResponse<T> {
  content: T[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
}

@Component({
  selector: 'app-book-list',
  template: `
    <div>
      <input [(ngModel)]="search" (ngModelChange)="onSearchChange()" 
             placeholder="Tìm kiếm...">
      
      <select [(ngModel)]="sortBy" (ngModelChange)="loadBooks()">
        <option value="title">Tiêu đề</option>
        <option value="author">Tác giả</option>
      </select>
      
      <button (click)="toggleSort()">
        {{ sortDirection === 'ASC' ? '↑' : '↓' }}
      </button>
      
      <div *ngFor="let book of books">
        <h3>{{ book.title }}</h3>
        <p>{{ book.author }}</p>
      </div>
      
      <button [disabled]="pageNumber === 0" (click)="previousPage()">
        Trước
      </button>
      <span>Trang {{ pageNumber + 1 }} / {{ totalPages }}</span>
      <button [disabled]="pageNumber >= totalPages - 1" (click)="nextPage()">
        Sau
      </button>
    </div>
  `
})
export class BookListComponent implements OnInit {
  books: any[] = [];
  pageNumber = 0;
  pageSize = 10;
  totalPages = 0;
  totalElements = 0;
  search = '';
  sortBy = 'title';
  sortDirection = 'ASC';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadBooks();
  }

  loadBooks() {
    let params = new HttpParams()
      .set('page', this.pageNumber.toString())
      .set('size', this.pageSize.toString())
      .set('sortBy', this.sortBy)
      .set('sortDirection', this.sortDirection);
    
    if (this.search) {
      params = params.set('search', this.search);
    }

    this.http.get<PageResponse<any>>('http://localhost:8086/api/books', { params })
      .subscribe(data => {
        this.books = data.content;
        this.pageNumber = data.pageNumber;
        this.totalPages = data.totalPages;
        this.totalElements = data.totalElements;
      });
  }

  onSearchChange() {
    this.pageNumber = 0; // Reset về trang đầu khi search
    this.loadBooks();
  }

  toggleSort() {
    this.sortDirection = this.sortDirection === 'ASC' ? 'DESC' : 'ASC';
    this.loadBooks();
  }

  previousPage() {
    if (this.pageNumber > 0) {
      this.pageNumber--;
      this.loadBooks();
    }
  }

  nextPage() {
    if (this.pageNumber < this.totalPages - 1) {
      this.pageNumber++;
      this.loadBooks();
    }
  }
}
```

### Sortable Fields

#### Books
- `id` - ID sách
- `title` - Tiêu đề
- `author` - Tác giả
- `category` - Thể loại
- `status` - Trạng thái
- `createAt` - Ngày tạo
- `updateAt` - Ngày cập nhật

#### Users
- `id` - ID user
- `email` - Email
- `fullName` - Tên đầy đủ
- `createAt` - Ngày tạo
- `updateAt` - Ngày cập nhật

### Tips & Best Practices

1. **Luôn validate input:**
   - page >= 0
   - size: 1-100
   - sortDirection: chỉ ASC/DESC

2. **Reset page về 0 khi search:**
   - Tránh trường hợp search có 2 trang nhưng đang ở trang 3

3. **Debounce search input:**
   - Tránh gọi API quá nhiều khi user đang gõ
   ```javascript
   const debounce = (func, delay) => {
       let timeoutId;
       return (...args) => {
           clearTimeout(timeoutId);
           timeoutId = setTimeout(() => func(...args), delay);
       };
   };
   
   const debouncedSearch = debounce(fetchBooks, 500);
   ```

4. **Cache results:**
   - Cache trang đã load để tăng performance
   - Invalidate cache khi có thay đổi

---

### 📊 Dashboard Integration (ADMIN/LIBRARIAN Only)

Dashboard API cung cấp thống kê tổng quan về sách trong hệ thống, bao gồm:
- Tổng số sách, sách có sẵn, sách đang mượn
- Thống kê theo danh mục (cho biểu đồ cột)
- Thống kê theo trạng thái (cho pie chart)

#### React Example - Dashboard Component

```javascript
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function Dashboard() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    
    // Colors cho pie chart
    const COLORS = ['#4CAF50', '#FF9800', '#F44336', '#2196F3'];

    useEffect(() => {
        fetchDashboardStats();
    }, []);

    const fetchDashboardStats = async () => {
        try {
            const token = localStorage.getItem('token'); // Lấy JWT token
            const response = await fetch('http://localhost:8086/api/dashboard/stats', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            
            if (response.ok) {
                const data = await response.json();
                setStats(data);
            } else {
                console.error('Failed to fetch dashboard stats');
            }
        } catch (error) {
            console.error('Error fetching dashboard stats:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Đang tải...</div>;
    if (!stats) return <div>Không có dữ liệu</div>;

    // Chuyển đổi categoryStats object thành array cho biểu đồ cột
    const categoryData = Object.entries(stats.categoryStats).map(([name, value]) => ({
        name,
        count: value
    }));

    // Chuyển đổi statusStats object thành array cho pie chart
    const statusData = Object.entries(stats.statusStats).map(([name, value]) => ({
        name,
        value
    }));

    return (
        <div className="dashboard">
            <h1>Dashboard - Thống kê thư viện</h1>
            
            {/* Summary Cards */}
            <div className="stats-cards">
                <div className="card">
                    <h3>Tổng số sách</h3>
                    <p className="number">{stats.totalBooks}</p>
                </div>
                
                <div className="card available">
                    <h3>Sách có sẵn</h3>
                    <p className="number">{stats.availableBooks}</p>
                </div>
                
                <div className="card borrowed">
                    <h3>Sách đang mượn</h3>
                    <p className="number">{stats.borrowedBooks}</p>
                </div>
            </div>

            {/* Bar Chart - Thống kê theo danh mục */}
            <div className="chart-container">
                <h2>Thống kê theo danh mục</h2>
                <BarChart width={600} height={300} data={categoryData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#8884d8" name="Số lượng sách" />
                </BarChart>
            </div>

            {/* Pie Chart - Tình trạng sách */}
            <div className="chart-container">
                <h2>Tình trạng sách</h2>
                <PieChart width={400} height={400}>
                    <Pie
                        data={statusData}
                        cx={200}
                        cy={200}
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {statusData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </div>
        </div>
    );
}

export default Dashboard;
```

#### CSS cho Dashboard

```css
.dashboard {
    padding: 20px;
}

.stats-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    margin-bottom: 40px;
}

.card {
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    text-align: center;
}

.card h3 {
    margin: 0 0 10px 0;
    color: #666;
    font-size: 14px;
    text-transform: uppercase;
}

.card .number {
    font-size: 36px;
    font-weight: bold;
    margin: 0;
    color: #333;
}

.card.available .number {
    color: #4CAF50;
}

.card.borrowed .number {
    color: #FF9800;
}

.chart-container {
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    margin-bottom: 20px;
}

.chart-container h2 {
    margin-top: 0;
    color: #333;
}
```

#### Vanilla JavaScript Example (Không dùng library charts)

```javascript
// Fetch dashboard stats
async function loadDashboard() {
    const token = localStorage.getItem('token');
    
    try {
        const response = await fetch('http://localhost:8086/api/dashboard/stats', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        
        const stats = await response.json();
        
        // Update summary cards
        document.getElementById('total-books').textContent = stats.totalBooks;
        document.getElementById('available-books').textContent = stats.availableBooks;
        document.getElementById('borrowed-books').textContent = stats.borrowedBooks;
        
        // Render category chart
        renderCategoryChart(stats.categoryStats);
        
        // Render status chart
        renderStatusChart(stats.statusStats);
        
    } catch (error) {
        console.error('Error loading dashboard:', error);
    }
}

// Render simple bar chart
function renderCategoryChart(categoryStats) {
    const chartContainer = document.getElementById('category-chart');
    chartContainer.innerHTML = ''; // Clear previous content
    
    const maxValue = Math.max(...Object.values(categoryStats));
    
    Object.entries(categoryStats).forEach(([category, count]) => {
        const bar = document.createElement('div');
        bar.className = 'chart-bar';
        
        const barFill = document.createElement('div');
        barFill.className = 'bar-fill';
        barFill.style.width = `${(count / maxValue) * 100}%`;
        barFill.textContent = count;
        
        const barLabel = document.createElement('div');
        barLabel.className = 'bar-label';
        barLabel.textContent = category;
        
        bar.appendChild(barLabel);
        bar.appendChild(barFill);
        chartContainer.appendChild(bar);
    });
}

// Render simple pie chart (table format)
function renderStatusChart(statusStats) {
    const chartContainer = document.getElementById('status-chart');
    chartContainer.innerHTML = '';
    
    const total = Object.values(statusStats).reduce((a, b) => a + b, 0);
    
    Object.entries(statusStats).forEach(([status, count]) => {
        const percentage = ((count / total) * 100).toFixed(1);
        
        const row = document.createElement('div');
        row.className = 'status-row';
        row.innerHTML = `
            <span class="status-name">${status}</span>
            <span class="status-count">${count} (${percentage}%)</span>
            <div class="status-bar" style="width: ${percentage}%"></div>
        `;
        
        chartContainer.appendChild(row);
    });
}

// Call on page load
document.addEventListener('DOMContentLoaded', loadDashboard);
```

#### HTML cho Vanilla JS

```html
<div class="dashboard">
    <h1>Dashboard</h1>
    
    <!-- Summary Cards -->
    <div class="stats-cards">
        <div class="card">
            <h3>Tổng số sách</h3>
            <p class="number" id="total-books">0</p>
        </div>
        <div class="card available">
            <h3>Sách có sẵn</h3>
            <p class="number" id="available-books">0</p>
        </div>
        <div class="card borrowed">
            <h3>Sách đang mượn</h3>
            <p class="number" id="borrowed-books">0</p>
        </div>
    </div>
    
    <!-- Category Chart -->
    <div class="chart-container">
        <h2>Thống kê theo danh mục</h2>
        <div id="category-chart"></div>
    </div>
    
    <!-- Status Chart -->
    <div class="chart-container">
        <h2>Tình trạng sách</h2>
        <div id="status-chart"></div>
    </div>
</div>
```

#### Important Notes cho Dashboard:

1. **Authentication Required:**
   - Phải gửi JWT token trong header `Authorization: Bearer <token>`
   - Chỉ ADMIN và LIBRARIAN có quyền truy cập
   - Nếu token hết hạn hoặc không đủ quyền → trả về 403 Forbidden

2. **Response Structure:**
   ```javascript
   {
       totalBooks: 10,           // Number - tổng số sách
       availableBooks: 6,        // Number - sách có sẵn
       borrowedBooks: 3,         // Number - sách đang mượn
       categoryStats: {          // Object - key: category name, value: count
           "Children": 4,
           "Romance": 2,
           "Fantasy": 1
       },
       statusStats: {            // Object - key: status, value: count
           "AVAILABLE": 6,
           "BORROWED": 3,
           "DAMAGED": 1
       }
   }
   ```

3. **Libraries gợi ý cho Charts:**
   - **Recharts** (React) - Dễ sử dụng, responsive
   - **Chart.js** (Vanilla JS) - Popular, nhiều loại chart
   - **ApexCharts** - Modern, đẹp, interactive
   - **D3.js** - Mạnh mẽ nhưng phức tạp

4. **Auto-refresh Dashboard:**
   ```javascript
   // Refresh mỗi 30 giây
   useEffect(() => {
       const interval = setInterval(fetchDashboardStats, 30000);
       return () => clearInterval(interval);
   }, []);
   ```

5. **Error Handling:**
   ```javascript
   if (response.status === 403) {
       // Không đủ quyền
       alert('Bạn không có quyền truy cập dashboard');
       router.push('/login');
   } else if (response.status === 401) {
       // Token hết hạn
       alert('Phiên đăng nhập đã hết hạn');
       router.push('/login');
   }
   ```

5. **Show loading state:**
   - Hiển thị loading indicator khi đang fetch data
   - Improve user experience

6. **Handle errors gracefully:**
   ```javascript
   try {
       const data = await fetchBooks();
   } catch (error) {
       console.error('Error fetching books:', error);
       // Show error message to user
   }
   ```

---

## 🌐 API Endpoints

### Authentication Endpoints
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/auth/register` | Đăng ký tài khoản mới | Public |
| POST | `/auth/login` | Đăng nhập | Public |
| GET | `/auth/profile` | Lấy thông tin user | Authenticated |

#### Example Requests:

**Register:**
```json
POST /auth/register
{
  "email": "user@example.com",
  "name": "John Doe",
  "password": "password123"
}
```

**Login:**
```json
POST /auth/login
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Book Management Endpoints
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/books` | Lấy danh sách tất cả sách | Public |
| GET | `/api/books/{id}` | Lấy thông tin sách theo ID | Public |
| POST | `/api/books` | Tạo sách mới | LIBRARIAN, ADMIN |
| PUT | `/api/books/{id}` | Cập nhật thông tin sách | LIBRARIAN, ADMIN |
| DELETE | `/api/books/{id}` | Xóa sách | LIBRARIAN, ADMIN |

#### Example Request:

**Create Book:**
```json
POST /api/books
Headers: Authorization: Bearer <token>
{
  "title": "Clean Code",
  "author": "Robert C. Martin",
  "category": "Programming",
  "status": "AVAILABLE"
}
```

### User Management Endpoints
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| PUT | `/api/user/password` | Đổi mật khẩu | USER, LIBRARIAN |
| PUT | `/api/user/fullname` | Cập nhật tên hiển thị | USER, LIBRARIAN |

#### Example Requests:

**Update Password:**
```json
PUT /api/user/password
Headers: Authorization: Bearer <token>
{
  "oldPassword": "oldpass123",
  "newPassword": "newpass123"
}
```

**Update Full Name:**
```json
PUT /api/user/fullname
Headers: Authorization: Bearer <token>
{
  "fullName": "John Doe Updated"
}
```

### Admin Endpoints
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/admin/users` | Lấy danh sách tất cả users | ADMIN |
| PUT | `/admin/users/{id}/role` | Cập nhật role của user | ADMIN |
| DELETE | `/admin/users/{id}` | Soft delete user | ADMIN |

#### Example Requests:

**Get All Users:**
```json
GET /admin/users
Headers: Authorization: Bearer <admin-token>
```

**Update User Role:**
```json
PUT /admin/users/3/role
Headers: Authorization: Bearer <admin-token>
{
  "roleName": "ROLE_LIBRARIAN"
}
```

**Soft Delete User:**
```json
DELETE /admin/users/3
Headers: Authorization: Bearer <admin-token>
```

### Test Endpoints
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/test/public` | Test server hoạt động | Public |
| POST | `/api/test/echo` | Test JSON format | Public |

---

## 🔒 Bảo mật

### 1. Password Encryption
- Sử dụng **BCryptPasswordEncoder**
- Password không bao giờ lưu dạng plain text
- One-way hashing algorithm

### 2. JWT Token
- **Secret Key**: Defined trong application.properties
- **Expiration**: 5 giờ (configurable)
- **Algorithm**: HS256 (HMAC with SHA-256)

### 3. CORS Configuration
```java
configuration.addAllowedOrigin("http://127.0.0.1:5500");
configuration.addAllowedMethod("*");
configuration.addAllowedHeader("*");
configuration.setAllowCredentials(true);
```

### 4. Role-Based Access Control (RBAC)
```java
.requestMatchers("/auth/**").permitAll()
.requestMatchers("/api/test/**").permitAll()
.requestMatchers("/api/books").permitAll()  // GET books - public
.requestMatchers("/api/books/{id}").permitAll()  // GET book by id - public
.requestMatchers("/api/books/**").hasAnyRole("ADMIN", "LIBRARIAN")
.requestMatchers("/admin/**").hasRole("ADMIN")
.requestMatchers("/api/user/**").hasAnyRole("USER", "LIBRARIAN")
```

**Phân quyền theo role:**
- **USER**: Xem sách, update profile (password, fullname)
- **LIBRARIAN**: USER permissions + CRUD sách
- **ADMIN**: LIBRARIAN permissions + quản lý users (update role, soft delete)

### 5. Stateless Session
```java
.sessionManagement(session ->
    session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
```
- Không sử dụng server-side session
- Mỗi request độc lập, xác thực qua JWT

---

## 🚀 Hướng dẫn chạy dự án

### Yêu cầu
- ☕ Java 17 trở lên
- 🗄 SQL Server 2019 trở lên
- 🔧 Gradle
- 💻 IDE: IntelliJ IDEA / Eclipse

### Bước 1: Clone project
```bash
git clone <repository-url>
cd BE
```

### Bước 2: Cấu hình Database
1. Tạo database trong SQL Server:
```sql
CREATE DATABASE FINAL_PROJECT;
```

2. Cập nhật thông tin database trong `application.properties`:
```properties
spring.datasource.username=<your-username>
spring.datasource.password=<your-password>
```

### Bước 3: Build project
```bash
./gradlew build
```

### Bước 4: Run application
```bash
./gradlew bootRun
```

Application sẽ chạy tại: `http://localhost:8086`

### Bước 5: Test API
Sử dụng Postman hoặc curl để test:

```bash
# Login với admin account
curl -X POST http://localhost:8086/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@gmail.com","password":"admin"}'

# Lấy danh sách sách (cần token)
curl -X GET http://localhost:8086/api/books \
  -H "Authorization: Bearer <your-token>"
```

---

## 🎨 Design Patterns sử dụng

### 1. **Layered Architecture Pattern**
```
Controller Layer (Presentation)
    ↓
Service Layer (Business Logic)
    ↓
Repository Layer (Data Access)
    ↓
Database
```

### 2. **Repository Pattern**
- Abstraction cho data access
- JpaRepository interface

### 3. **DTO Pattern**
- Tách biệt domain models và API contracts
- Request/Response DTOs

### 4. **Dependency Injection**
- Constructor injection
- `@Autowired` annotation
- IoC Container (Spring)

### 5. **Template Method Pattern**
- `OncePerRequestFilter` trong JwtAuthFilter
- `@PrePersist`, `@PreUpdate` callbacks

### 6. **Strategy Pattern**
- `PasswordEncoder` interface
- Có thể thay đổi encryption strategy

### 7. **Chain of Responsibility**
- Security Filter Chain
- Request đi qua nhiều filters

---

## 📊 Database Schema

### Users Table
```sql
CREATE TABLE users (
    id BIGINT PRIMARY KEY IDENTITY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    role_id BIGINT NOT NULL,
    create_at DATETIME DEFAULT GETDATE(),
    update_at DATETIME DEFAULT GETDATE(),
    is_deleted BIT DEFAULT 0,
    FOREIGN KEY (role_id) REFERENCES roles(id)
);
```

### Books Table
```sql
CREATE TABLE books (
    id BIGINT PRIMARY KEY IDENTITY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,
    status VARCHAR(50) DEFAULT 'AVAILABLE',
    create_at DATETIME DEFAULT GETDATE(),
    update_at DATETIME DEFAULT GETDATE(),
    is_deleted BIT DEFAULT 0
);
```

### Roles Table
```sql
CREATE TABLE roles (
    id BIGINT PRIMARY KEY IDENTITY,
    role_name VARCHAR(50) UNIQUE NOT NULL,
    create_at DATETIME DEFAULT GETDATE(),
    update_at DATETIME DEFAULT GETDATE(),
    is_deleted BIT DEFAULT 0
);
```

**Lưu ý**: Category đã được đơn giản hóa từ bảng riêng thành VARCHAR field trong books table.

---

## 🔧 Tính năng nổi bật

### 1. Soft Delete
- Không xóa vật lý record
- Đánh dấu `isDeleted = true`
- Có thể restore data

### 2. Automatic Timestamps
- `@PrePersist`: Set createAt, updateAt khi tạo mới
- `@PreUpdate`: Update updateAt khi sửa

### 3. JWT Token Security
- Stateless authentication
- No server-side session needed
- Scalable architecture

### 4. Role-Based Authorization
- Phân quyền chi tiết theo endpoint
- Support multiple roles per user
- 3 roles: USER, LIBRARIAN, ADMIN

### 5. CORS Support
- Allow cross-origin requests
- Configured for specific origins

### 6. Global Exception Handler
- Validation errors trả về format chuẩn
- Dễ dàng debug và xử lý lỗi
- Custom error messages

### 7. Lazy Loading Fix
- JOIN FETCH để tránh LazyInitializationException
- Tối ưu performance với single query
- Load user và role cùng lúc

### 8. User Management
- User/Librarian tự update password
- User/Librarian tự update full name
- Admin quản lý users (update role, soft delete)

### 9. Simplified Category Management
- Category là String thay vì entity
- Dễ dàng thêm/sửa category
- Giảm complexity của database

---

## 📝 Best Practices được áp dụng

1. ✅ **Separation of Concerns**: Mỗi layer có trách nhiệm riêng
2. ✅ **DRY Principle**: BaseEntity để tránh code trùng lặp
3. ✅ **SOLID Principles**:
   - Single Responsibility
   - Open/Closed
   - Dependency Inversion (DI)
4. ✅ **RESTful API Design**: HTTP methods đúng chuẩn
5. ✅ **Security First**: Password encryption, JWT, RBAC
6. ✅ **Configuration Externalization**: Properties file
7. ✅ **Exception Handling**: Try-catch trong service layer
8. ✅ **Code Documentation**: Comments bằng tiếng Việt

---

## 🐛 Troubleshooting

### Lỗi kết nối database
```
Error: Connection refused
```
**Giải pháp**: Kiểm tra SQL Server đã chạy chưa, port 1433 có mở không

### Lỗi JWT token expired
```
Error: Token đã hết hạn
```
**Giải pháp**: Login lại để lấy token mới, hoặc tăng `jwt.expiration`

### Lỗi 403 Forbidden
```
Error: Access Denied
```
**Giải pháp**: Kiểm tra role của user có đủ quyền truy cập endpoint không

### Lỗi LazyInitializationException
```
Error: Could not initialize proxy - no session
```
**Giải pháp**: Đã fix bằng JOIN FETCH trong UserRepository

### Lỗi Content-Type not supported
```
Error: Content-Type 'text/plain' is not supported
```
**Giải pháp**: Trong Postman, chọn Body → raw → JSON (không phải Text)

### Lỗi Validation Failed
```
Error: Field 'roleName': rejected value [null]
```
**Giải pháp**: Kiểm tra request body có đủ các field bắt buộc không, đúng format JSON

### Lỗi Token không đúng format
```
Error: Token không bắt đầu với Bearer String
```
**Giải pháp**: 
- Không dùng Basic Auth, chỉ dùng Bearer Token
- Header phải là: `Authorization: Bearer {token}`
- Có khoảng trắng giữa "Bearer" và token

---

## 📚 Tài liệu bổ sung

Các file hướng dẫn chi tiết đã được tạo trong thư mục gốc:

### Quick Guides:
- `POSTMAN_GUIDE.md` - Hướng dẫn sử dụng Postman chi tiết
- `QUICK_FIX_UPDATE_ROLE.md` - Fix lỗi update user role nhanh
- `SOLUTION_SUMMARY.md` - Tóm tắt giải pháp tổng thể

### Detailed Fixes:
- `FIX_API_ERRORS.md` - Fix lỗi Content-Type và Authorization
- `FIX_BASIC_AUTH_ERROR.md` - Fix lỗi dùng Basic Auth thay vì Bearer Token
- `FIX_LAZY_INITIALIZATION_ERROR.md` - Fix lỗi lazy loading
- `FIX_UPDATE_USER_ROLE_ERROR.md` - Fix lỗi validation khi update role

### API Documentation:
- `API_CHANGES_SUMMARY.md` - Tổng quan tất cả API endpoints và thay đổi
- `API_RESPONSE_EXAMPLES.md` - Ví dụ responses cho mọi trường hợp
- `FINAL_SUMMARY.md` - Tổng kết hoàn chỉnh dự án

### Testing:
- `Postman_Collection.json` - Import vào Postman để test ngay
- `test-update-role.http` - Test file cho VS Code REST Client / IntelliJ HTTP Client

---

## 📚 Tài liệu tham khảo

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [Spring Security](https://spring.io/projects/spring-security)
- [JWT.io](https://jwt.io/)
- [Spring Data JPA](https://spring.io/projects/spring-data-jpa)



