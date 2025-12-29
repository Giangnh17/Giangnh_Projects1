# 📊 Dashboard API - Hướng dẫn nhanh

## 🎯 Tổng quan

Dashboard API cung cấp thống kê tổng quan về sách trong hệ thống thư viện, bao gồm:
- **Summary Cards**: Tổng số sách, sách có sẵn, sách đang mượn
- **Bar Chart Data**: Thống kê số lượng sách theo danh mục (category)
- **Pie Chart Data**: Phân bố sách theo trạng thái (status)

## 🔐 Phân quyền

**Chỉ ADMIN và LIBRARIAN** có quyền truy cập endpoint này.

## 📡 API Endpoint

### GET `/api/dashboard/stats`

**Headers:**
```
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
```

**Response Success (200 OK):**
```json
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
```

**Response Fields:**
- `totalBooks` (long): Tổng số sách chưa bị xóa
- `availableBooks` (long): Số sách có sẵn để mượn (status = "AVAILABLE")
- `borrowedBooks` (long): Số sách đang được mượn (status = "BORROWED")
- `categoryStats` (Map<String, Long>): Object chứa [category name: count]
- `statusStats` (Map<String, Long>): Object chứa [status: count]

**Response Errors:**
- `401 Unauthorized`: Token không hợp lệ hoặc đã hết hạn
- `403 Forbidden`: User không có quyền (không phải ADMIN hoặc LIBRARIAN)
- `500 Internal Server Error`: Lỗi server

## 🖥️ Frontend Integration

### React Example (với Recharts)

#### 1. Cài đặt thư viện
```bash
npm install recharts
```

#### 2. Component Code

```jsx
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function Dashboard() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const COLORS = ['#4CAF50', '#FF9800', '#F44336', '#2196F3'];

    useEffect(() => {
        fetchDashboardStats();
    }, []);

    const fetchDashboardStats = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:8086/api/dashboard/stats', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            
            if (response.ok) {
                const data = await response.json();
                setStats(data);
            } else if (response.status === 403) {
                alert('Bạn không có quyền truy cập dashboard');
            } else if (response.status === 401) {
                alert('Phiên đăng nhập đã hết hạn');
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Đang tải...</div>;
    if (!stats) return <div>Không có dữ liệu</div>;

    // Convert objects to arrays for charts
    const categoryData = Object.entries(stats.categoryStats).map(([name, value]) => ({
        name,
        count: value
    }));

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

            {/* Bar Chart */}
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

            {/* Pie Chart */}
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

#### 3. CSS Styling

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
```

### Vanilla JavaScript Example

```javascript
async function loadDashboard() {
    const token = localStorage.getItem('token');
    
    try {
        const response = await fetch('http://localhost:8086/api/dashboard/stats', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            if (response.status === 403) {
                alert('Bạn không có quyền truy cập');
            }
            return;
        }
        
        const stats = await response.json();
        
        // Update summary cards
        document.getElementById('total-books').textContent = stats.totalBooks;
        document.getElementById('available-books').textContent = stats.availableBooks;
        document.getElementById('borrowed-books').textContent = stats.borrowedBooks;
        
        // Render charts (implement your preferred chart library)
        renderCategoryChart(stats.categoryStats);
        renderStatusChart(stats.statusStats);
        
    } catch (error) {
        console.error('Error loading dashboard:', error);
    }
}

// Call on page load
document.addEventListener('DOMContentLoaded', loadDashboard);
```

## 📚 Chart Libraries

### Recommended Libraries:

1. **Recharts** (React)
   - Pros: Dễ sử dụng, component-based, responsive
   - Install: `npm install recharts`
   - [Documentation](https://recharts.org/)

2. **Chart.js** (Vanilla JS, React, Vue, Angular)
   - Pros: Popular, nhiều loại chart, tùy biến cao
   - Install: `npm install chart.js react-chartjs-2`
   - [Documentation](https://www.chartjs.org/)

3. **ApexCharts** (Universal)
   - Pros: Modern UI, interactive, đẹp
   - Install: `npm install apexcharts react-apexcharts`
   - [Documentation](https://apexcharts.com/)

4. **D3.js** (Advanced)
   - Pros: Mạnh mẽ, tùy biến tối đa
   - Cons: Learning curve cao
   - [Documentation](https://d3js.org/)

## 🔄 Auto-refresh Dashboard

Để dashboard tự động cập nhật:

```javascript
useEffect(() => {
    fetchDashboardStats(); // Load lần đầu
    
    // Refresh mỗi 30 giây
    const interval = setInterval(fetchDashboardStats, 30000);
    
    // Cleanup khi unmount
    return () => clearInterval(interval);
}, []);
```

## 🛡️ Security & Error Handling

### Check Authentication

```javascript
const fetchDashboardStats = async () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
        // Redirect to login
        window.location.href = '/login';
        return;
    }
    
    try {
        const response = await fetch('http://localhost:8086/api/dashboard/stats', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        
        if (response.status === 401) {
            // Token expired
            localStorage.removeItem('token');
            window.location.href = '/login';
        } else if (response.status === 403) {
            // Insufficient permissions
            alert('Bạn không có quyền truy cập dashboard. Chỉ Admin và Librarian mới được phép.');
            window.location.href = '/';
        } else if (response.ok) {
            const data = await response.json();
            setStats(data);
        }
    } catch (error) {
        console.error('Error fetching dashboard:', error);
        alert('Không thể tải dữ liệu dashboard. Vui lòng thử lại.');
    }
};
```

## 🧪 Testing với cURL

```bash
# Test với admin token
curl -X GET http://localhost:8086/api/dashboard/stats \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Content-Type: application/json"

# Expected response
# {
#   "totalBooks": 10,
#   "availableBooks": 6,
#   "borrowedBooks": 3,
#   "categoryStats": {...},
#   "statusStats": {...}
# }
```

## 📝 Notes

1. **Data không bao gồm sách đã xóa**: Dashboard chỉ thống kê các sách có `isDeleted = false`
2. **Real-time**: Mỗi lần gọi API sẽ query database mới nhất, không có cache
3. **Performance**: Với database lớn (>10,000 sách), có thể cần optimize queries hoặc thêm caching layer
4. **Responsive Design**: Đảm bảo charts responsive cho mobile devices
5. **Loading State**: Luôn hiển thị loading indicator khi fetch data

## 🎨 UI/UX Tips

1. **Color coding có ý nghĩa:**
   - Xanh lá (#4CAF50): Available books
   - Cam (#FF9800): Borrowed books
   - Đỏ (#F44336): Damaged/Unavailable books

2. **Hiển thị percentage** trong pie chart
3. **Tooltip** cho mỗi bar/segment trong chart
4. **Animation** khi load data
5. **Empty state** khi không có dữ liệu

## 🐛 Common Issues

**Issue**: 403 Forbidden
**Solution**: Kiểm tra user có role ADMIN hoặc LIBRARIAN không

**Issue**: Token expired
**Solution**: Implement auto-refresh token hoặc redirect đến login

**Issue**: CORS error
**Solution**: Backend đã config CORS, kiểm tra frontend URL

**Issue**: Empty categoryStats/statusStats
**Solution**: Đảm bảo có sách trong database và không bị soft delete

---

**Created**: December 28, 2025  
**Version**: 1.0  
**Backend**: Spring Boot 3.x  
**Author**: Library Management System Team

