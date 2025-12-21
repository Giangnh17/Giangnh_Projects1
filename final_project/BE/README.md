# 📚 Library Management System - Backend API

## 📋 Mục lục
- [Tổng quan dự án](#tổng-quan-dự-án)
- [Công nghệ sử dụng](#công-nghệ-sử-dụng)
- [Cấu trúc dự án](#cấu-trúc-dự-án)
- [Chi tiết các thành phần](#chi-tiết-các-thành-phần)
- [Flow hoạt động](#flow-hoạt-động)
- [Cấu hình và cài đặt](#cấu-hình-và-cài-đặt)
- [API Endpoints](#api-endpoints)
- [Bảo mật](#bảo-mật)
- [Hướng dẫn chạy dự án](#hướng-dẫn-chạy-dự-án)

---

## 🎯 Tổng quan dự án

Đây là một **RESTful API Backend** cho hệ thống quản lý thư viện (Library Management System) được xây dựng bằng **Spring Boot**. Hệ thống cung cấp các chức năng:

- ✅ **Xác thực và phân quyền** (Authentication & Authorization) với JWT
- ✅ **Quản lý sách** (Books Management) - CRUD operations với phân quyền theo role
- ✅ **Quản lý người dùng** (User Management) với role-based access control
- ✅ **Admin Dashboard** - Quản lý users, update role, soft delete
- ✅ **User Profile Management** - Update password và full name
- ✅ **Soft delete** cho các entity
- ✅ **Automatic timestamp tracking** (createdAt, updatedAt)
- ✅ **Global Exception Handler** - Error responses chuẩn và dễ hiểu
- ✅ **Lazy Loading Fix** - JOIN FETCH để tối ưu performance

---

## 🛠 Công nghệ sử dụng

### Core Framework
- **Spring Boot 4.0.0** - Framework chính
- **Java 17** - Ngôn ngữ lập trình

### Dependencies chính
- **Spring Data JPA** - ORM và database operations
- **Spring Security** - Authentication & Authorization
- **Spring Web MVC** - RESTful API
- **JWT (JSON Web Token)** - Token-based authentication
  - `jjwt-api:0.13.0`
  - `jjwt-impl:0.13.0`
  - `jjwt-jackson:0.13.0`
- **MS SQL Server** - Database
- **BCrypt** - Password encryption

---

## 📁 Cấu trúc dự án

```
src/main/java/com/example/demo/
│
├── config/                          # ⚙️ Configuration & Security
│   ├── CustomUserDetailsService.java    - Load user từ database với JOIN FETCH
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

---

## 👨‍💻 Tác giả

**Giangnh** - Final Project Backend

---

## 📄 License

This project is for educational purposes.

---

**Happy Coding! 🚀**

