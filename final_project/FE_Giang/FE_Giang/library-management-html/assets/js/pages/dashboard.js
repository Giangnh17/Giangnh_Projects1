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

// Load dashboard data
// NOTE: Current implementation uses paginated book data for stats
// This is NOT ACCURATE for large datasets
// TODO: Backend should provide dedicated /api/stats/dashboard endpoint
async function loadDashboardData() {
  try {
    Loading.show();

    // ⚠️ WARNING: Fetching only first page for stats is not accurate
    // Backend should provide dedicated stats endpoint that returns:
    // - Total books count
    // - Available/Borrowed/Unavailable counts  
    // - Category counts
    // - Recent books
    // Example: GET /api/stats/dashboard
    
    // Temporary solution: Fetch first page of books
    // This will show stats for first 10 books only, not entire database
    const response = await BooksAPI.getAll(0, 10);
    
    // For dashboard stats, we might need all books
    // If backend provides a /stats endpoint, use that instead
    // For now, use the first page data
    booksData = response.content || [];

    // Render statistics
    renderStats();

    // Render charts
    renderCharts();

    // Render recent books
    renderRecentBooks();

    Loading.hide();
  } catch (error) {
    Loading.hide();
    console.error('Load data error:', error);
    Toast.error(error.message);
  }
}

// Render statistics cards
function renderStats() {
  const stats = StatsAPI.calculateStats(booksData);

  const statsHTML = `
    ${Components.getStatCardHTML({
      icon: 'fas fa-book',
      value: Utils.formatNumber(stats.totalBooks),
      label: 'Tổng số đầu sách',
      color: 'linear-gradient(135deg, #8b4513 0%, #5c2e0a 100%)'
    })}
    ${Components.getStatCardHTML({
      icon: 'fas fa-check-circle',
      value: Utils.formatNumber(stats.availableBooks),
      label: 'Sách có sẵn',
      color: 'linear-gradient(135deg, #2c5f2d 0%, #1a3d1b 100%)'
    })}
    ${Components.getStatCardHTML({
      icon: 'fas fa-hand-holding',
      value: Utils.formatNumber(stats.borrowedBooks),
      label: 'Sách đang mượn',
      color: 'linear-gradient(135deg, #f39c12 0%, #e67e22 100%)'
    })}
    ${Components.getStatCardHTML({
      icon: 'fas fa-tags',
      value: Utils.formatNumber(stats.categories),
      label: 'Danh mục',
      color: 'linear-gradient(135deg, #9b59b6 0%, #8e44ad 100%)'
    })}
  `;

  document.getElementById('statsGrid').innerHTML = statsHTML;
}

// Render charts
function renderCharts() {
  renderCategoryChart();
  renderStatusChart();
}

// Render category chart
function renderCategoryChart() {
  const categoryStats = StatsAPI.getCategoryStats(booksData);
  
  const ctx = document.getElementById('categoryChart');
  if (!ctx) return;

  // Destroy existing chart
  if (categoryChart) {
    categoryChart.destroy();
  }

  categoryChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: categoryStats.map(c => c.name),
      datasets: [{
        label: 'Số lượng sách',
        data: categoryStats.map(c => c.count),
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

// Render status chart (Doughnut)
function renderStatusChart() {
  const stats = StatsAPI.calculateStats(booksData);
  
  const ctx = document.getElementById('statusChart');
  if (!ctx) return;

  // Destroy existing chart
  if (statusChart) {
    statusChart.destroy();
  }

  statusChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Có sẵn', 'Đang mượn'],
      datasets: [{
        data: [stats.availableBooks, stats.borrowedBooks],
        backgroundColor: [
          'rgba(44, 95, 45, 0.8)',
          'rgba(243, 156, 18, 0.8)'
        ],
        borderColor: [
          'rgba(44, 95, 45, 1)',
          'rgba(243, 156, 18, 1)'
        ],
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: 'bottom'
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
