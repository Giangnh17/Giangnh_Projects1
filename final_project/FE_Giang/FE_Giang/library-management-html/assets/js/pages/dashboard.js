// ========================================
// DASHBOARD PAGE
// Handle dashboard statistics and charts
// ========================================

// Debug authentication
console.log('Dashboard loaded');
console.log('Token exists:', localStorage.getItem('token'));
console.log('User exists:', localStorage.getItem('currentUser'));
console.log('Is authenticated:', Auth.isAuthenticated());

// Protect page - require authentication
if (!protectPage()) {
  throw new Error('Unauthorized');
}

// State
let booksData = [];
let categoryChart = null;
let statusChart = null;

// Initialize page
async function initDashboard() {
  try {
    // Insert sidebar and header
    const sidebarHTML = Components.getSidebarHTML();
    const headerHTML = Components.getHeaderHTML('Dashboard', [
      { text: 'Trang chủ', href: '/dashboard.html' },
      { text: 'Dashboard' }
    ]);

    document.querySelector('.layout').insertAdjacentHTML('afterbegin', sidebarHTML);
    document.getElementById('layoutContent').insertAdjacentHTML('afterbegin', headerHTML);

    // Initialize components
    Components.initSidebar();
    Components.initHeader();
    Auth.init();
    Auth.setupLogoutButtons();

    // Load data
    await loadDashboardData();

  } catch (error) {
    console.error('Dashboard init error:', error);
    Toast.error('Không thể tải dữ liệu dashboard');
  }
}

// Load dashboard data from backend API
async function loadDashboardData() {
  try {
    Loading.show();

    // Call backend dashboard API for accurate statistics
    const dashboardStats = await DashboardAPI.getStats();
    
    console.log('📊 Dashboard stats from backend:', dashboardStats);

    // Also fetch recent books for the table
    const recentBooksResponse = await BooksAPI.getAll(0, 10);
    booksData = recentBooksResponse.content || [];

    // Render statistics with backend data
    renderStats(dashboardStats);

    // Render charts with backend data
    renderCharts(dashboardStats);

    // Render recent books table
    renderRecentBooks();

    Loading.hide();
  } catch (error) {
    Loading.hide();
    console.error('Load data error:', error);
    Toast.error(error.message);
    
    // If 403 Forbidden, show specific message
    if (error.message.includes('403') || error.message.includes('Forbidden')) {
      Toast.error('Bạn không có quyền truy cập Dashboard. Chỉ Admin và Librarian được phép.');
    }
  }
}

// Render statistics cards with backend data
function renderStats(dashboardStats) {
  // dashboardStats từ backend: { totalBooks, availableBooks, borrowedBooks, categoryStats, statusStats }
  const totalCategories = Object.keys(dashboardStats.categoryStats || {}).length;

  const statsHTML = `
    ${Components.getStatCardHTML({
      icon: 'fas fa-book',
      value: Utils.formatNumber(dashboardStats.totalBooks || 0),
      label: 'Tổng số đầu sách',
      color: 'linear-gradient(135deg, #8b4513 0%, #5c2e0a 100%)'
    })}
    ${Components.getStatCardHTML({
      icon: 'fas fa-check-circle',
      value: Utils.formatNumber(dashboardStats.availableBooks || 0),
      label: 'Sách có sẵn',
      color: 'linear-gradient(135deg, #2c5f2d 0%, #1a3d1b 100%)'
    })}
    ${Components.getStatCardHTML({
      icon: 'fas fa-hand-holding',
      value: Utils.formatNumber(dashboardStats.borrowedBooks || 0),
      label: 'Sách đang mượn',
      color: 'linear-gradient(135deg, #f39c12 0%, #e67e22 100%)'
    })}
    ${Components.getStatCardHTML({
      icon: 'fas fa-tags',
      value: Utils.formatNumber(totalCategories),
      label: 'Danh mục',
      color: 'linear-gradient(135deg, #9b59b6 0%, #8e44ad 100%)'
    })}
  `;

  document.getElementById('statsGrid').innerHTML = statsHTML;
}

// Render charts with backend data
function renderCharts(dashboardStats) {
  renderCategoryChart(dashboardStats.categoryStats);
  renderStatusChart(dashboardStats.statusStats);
}

// Render category chart with backend data
function renderCategoryChart(categoryStats) {
  const ctx = document.getElementById('categoryChart');
  if (!ctx) return;

  // Destroy existing chart
  if (categoryChart) {
    categoryChart.destroy();
  }

  // Convert categoryStats object to arrays
  // categoryStats = { "Children": 4, "Romance": 2, ... }
  const categories = Object.keys(categoryStats || {});
  const counts = Object.values(categoryStats || {});

  // Handle empty data
  if (categories.length === 0) {
    ctx.parentElement.innerHTML = '<p style="text-align: center; padding: 2rem; color: var(--text-light);">Chưa có dữ liệu danh mục</p>';
    return;
  }

  categoryChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: categories,
      datasets: [{
        label: 'Số lượng sách',
        data: counts,
        backgroundColor: 'rgba(139, 69, 19, 0.7)',
        borderColor: 'rgba(139, 69, 19, 1)',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return context.parsed.y + ' cuốn sách';
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            precision: 0
          }
        }
      }
    }
  });
}

// Render status chart (Doughnut) with backend data
function renderStatusChart(statusStats) {
  const ctx = document.getElementById('statusChart');
  if (!ctx) return;

  // Destroy existing chart
  if (statusChart) {
    statusChart.destroy();
  }

  // Convert statusStats object to arrays
  // statusStats = { "AVAILABLE": 6, "BORROWED": 3, "DAMAGED": 1 }
  const statusLabels = {
    'AVAILABLE': 'Có sẵn',
    'BORROWED': 'Đang mượn',
    'UNAVAILABLE': 'Không có sẵn',
    'DAMAGED': 'Hư hỏng'
  };

  const statusColors = {
    'AVAILABLE': 'rgba(44, 95, 45, 0.8)',
    'BORROWED': 'rgba(243, 156, 18, 0.8)',
    'UNAVAILABLE': 'rgba(231, 76, 60, 0.8)',
    'DAMAGED': 'rgba(149, 165, 166, 0.8)'
  };

  const labels = [];
  const data = [];
  const backgroundColors = [];
  const borderColors = [];

  // Process statusStats
  Object.entries(statusStats || {}).forEach(([status, count]) => {
    if (count > 0) { // Only show statuses with books
      labels.push(statusLabels[status] || status);
      data.push(count);
      const bgColor = statusColors[status] || 'rgba(52, 152, 219, 0.8)';
      backgroundColors.push(bgColor);
      borderColors.push(bgColor.replace('0.8', '1'));
    }
  });

  // Handle empty data
  if (data.length === 0) {
    ctx.parentElement.innerHTML = '<p style="text-align: center; padding: 2rem; color: var(--text-light);">Chưa có dữ liệu trạng thái</p>';
    return;
  }

  statusChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: 'bottom'
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              const label = context.label || '';
              const value = context.parsed || 0;
              const total = context.dataset.data.reduce((a, b) => a + b, 0);
              const percentage = ((value / total) * 100).toFixed(1);
              return `${label}: ${value} cuốn (${percentage}%)`;
            }
          }
        }
      }
    }
  });
}

// Render recent books table
function renderRecentBooks() {
  const recentBooks = booksData.slice(0, 10); // Get first 10 books

  if (recentBooks.length === 0) {
    document.getElementById('recentBooksTable').innerHTML = Components.getEmptyStateHTML({
      icon: 'fas fa-book',
      title: 'Chưa có sách',
      message: 'Thư viện chưa có sách nào. Hãy thêm sách mới!'
    });
    return;
  }

  const getStatusBadge = (status) => {
    const statusMap = {
      'AVAILABLE': { label: 'Có sẵn', class: 'success' },
      'BORROWED': { label: 'Đang mượn', class: 'warning' },
      'UNAVAILABLE': { label: 'Không có sẵn', class: 'danger' }
    };
    
    const statusInfo = statusMap[status] || { label: status, class: 'info' };
    return `<span class="badge badge-${statusInfo.class}">${statusInfo.label}</span>`;
  };

  const tableHTML = `
    <div class="table-container">
      <table class="table">
        <thead>
          <tr>
            <th>Tên sách</th>
            <th>Tác giả</th>
            <th>Thể loại</th>
            <th>Trạng thái</th>
            <th>Ngày tạo</th>
          </tr>
        </thead>
        <tbody>
          ${recentBooks.map(book => `
            <tr>
              <td><strong>${Utils.escapeHtml(book.title)}</strong></td>
              <td>${Utils.escapeHtml(book.author)}</td>
              <td><span class="badge badge-primary">${Utils.escapeHtml(book.category)}</span></td>
              <td>${getStatusBadge(book.status)}</td>
              <td>${Utils.formatDateSimple(book.createAt)}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;

  document.getElementById('recentBooksTable').innerHTML = tableHTML;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initDashboard);
