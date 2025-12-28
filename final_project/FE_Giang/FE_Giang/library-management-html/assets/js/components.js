// ========================================
// REUSABLE COMPONENTS
// Sidebar, Header, and other UI components
// ========================================

const Components = {
  /**
   * Generate Sidebar HTML
   * @returns {string} Sidebar HTML
   */
  getSidebarHTML() {
    return `
      <!-- Sidebar -->
      <aside class="sidebar" id="sidebar">
        <div class="sidebar-header">
          <a href="./dashboard.html" class="sidebar-logo">
            <img src="./assets/images/Library_logo.png" alt="Sarly" class="sidebar-logo-icon">
            <span class="sidebar-logo-text">Sarly</span>
          </a>
          <button class="sidebar-toggle hide-md" id="sidebarToggle">
            <i class="fas fa-bars"></i>
          </button>
        </div>

        <nav class="sidebar-nav">
          <div class="sidebar-section">
            <div class="sidebar-section-title">Menu Chính</div>
            <ul>
              <li class="nav-item">
                <a href="./dashboard.html" class="nav-link">
                  <i class="fas fa-home nav-icon"></i>
                  <span class="nav-text">Trang chủ</span>
                </a>
              </li>
              <li class="nav-item">
                <a href="./books.html" class="nav-link">
                  <i class="fas fa-book nav-icon"></i>
                  <span class="nav-text">Quản lý sách</span>
                </a>
              </li>
              <li class="nav-item" data-role-required="ADMIN">
                <a href="./users.html" class="nav-link">
                  <i class="fas fa-users nav-icon"></i>
                  <span class="nav-text">Người dùng</span>
                </a>
              </li>
            </ul>
          </div>

          <div class="sidebar-section">
            <div class="sidebar-section-title">Cài đặt</div>
            <ul>
              <li class="nav-item">
                <a href="./settings.html" class="nav-link">
                  <i class="fas fa-cog nav-icon"></i>
                  <span class="nav-text">Cài đặt</span>
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </aside>

      <!-- Sidebar Overlay for Mobile -->
      <div class="sidebar-overlay" id="sidebarOverlay"></div>
    `;
  },

  /**
   * Generate Header HTML
   * @param {string} pageTitle - Page title
   * @param {Array} breadcrumbs - Breadcrumb items [{text, href}]
   * @returns {string} Header HTML
   */
  getHeaderHTML(pageTitle = 'Dashboard', breadcrumbs = []) {
    return `
      <header class="header">
        <div class="header-left">
          <button class="mobile-menu-toggle" id="mobileMenuToggle">
            <i class="fas fa-bars"></i>
          </button>
          <div>
            <h1 class="page-title">${pageTitle}</h1>
          </div>
        </div>

        <div class="header-right">
          <div class="user-menu" id="userMenu">
            <button class="user-menu-toggle" id="userMenuToggle">
              <div class="user-avatar"></div>
              <span class="user-name"></span>
              <i class="fas fa-chevron-down"></i>
            </button>
            <div class="user-menu-dropdown">
              <a href="./settings.html" class="dropdown-item">
                <i class="fas fa-user"></i>
                Thông tin cá nhân
              </a>
              <a href="./settings.html" class="dropdown-item">
                <i class="fas fa-cog"></i>
                Cài đặt
              </a>
              <div class="dropdown-divider"></div>
              <button class="dropdown-item" data-action="logout">
                <i class="fas fa-sign-out-alt"></i>
                Đăng xuất
              </button>
            </div>
          </div>
        </div>
      </header>
    `;
  },

  /**
   * Initialize sidebar functionality
   */
  initSidebar() {
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const sidebarToggle = document.getElementById('sidebarToggle');

    // Mobile menu toggle
    if (mobileMenuToggle) {
      mobileMenuToggle.addEventListener('click', () => {
        sidebar?.classList.toggle('mobile-open');
        sidebarOverlay?.classList.toggle('active');
      });
    }

    // Sidebar overlay click
    if (sidebarOverlay) {
      sidebarOverlay.addEventListener('click', () => {
        sidebar?.classList.remove('mobile-open');
        sidebarOverlay.classList.remove('active');
      });
    }

    // Desktop sidebar toggle
    if (sidebarToggle) {
      sidebarToggle.addEventListener('click', () => {
        sidebar?.classList.toggle('collapsed');
        document.querySelector('.layout-content')?.classList.toggle('sidebar-collapsed');
      });
    }
  },

  /**
   * Initialize header functionality
   */
  initHeader() {
    const userMenu = document.getElementById('userMenu');
    const userMenuToggle = document.getElementById('userMenuToggle');

    if (userMenuToggle) {
      userMenuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        userMenu?.classList.toggle('active');
      });
    }

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (userMenu && !userMenu.contains(e.target)) {
        userMenu.classList.remove('active');
      }
    });
  },

  /**
   * Render full layout
   * @param {Object} options - Layout options
   */
  renderLayout(options = {}) {
    const {
      pageTitle = 'Dashboard',
      breadcrumbs = [],
      contentHTML = ''
    } = options;

    document.body.innerHTML = `
      <div class="layout">
        ${this.getSidebarHTML()}
        
        <div class="layout-content" id="layoutContent">
          ${this.getHeaderHTML(pageTitle, breadcrumbs)}
          
          <main class="main-content">
            ${contentHTML}
          </main>
        </div>
      </div>
    `;

    // Initialize components
    this.initSidebar();
    this.initHeader();
  },

  /**
   * Generate Empty State HTML
   * @param {Object} options - Empty state options
   * @returns {string}
   */
  getEmptyStateHTML(options = {}) {
    const {
      icon = 'fas fa-inbox',
      title = 'Không có dữ liệu',
      message = 'Chưa có dữ liệu để hiển thị',
      actionText = null,
      actionOnClick = null
    } = options;

    return `
      <div class="empty-state">
        <div class="empty-state-icon">
          <i class="${icon}"></i>
        </div>
        <h3 class="empty-state-title">${title}</h3>
        <p class="empty-state-text">${message}</p>
        ${actionText ? `<button class="btn btn-primary" onclick="${actionOnClick}">${actionText}</button>` : ''}
      </div>
    `;
  },

  /**
   * Generate Loading State HTML
   * @returns {string}
   */
  getLoadingHTML() {
    return `
      <div style="text-align: center; padding: 3rem;">
        <div class="spinner spinner-lg"></div>
        <p style="margin-top: 1rem; color: var(--text-light);">Đang tải...</p>
      </div>
    `;
  },

  /**
   * Generate Stats Card HTML
   * @param {Object} stat - Stat data {icon, value, label, color}
   * @returns {string}
   */
  getStatCardHTML(stat) {
    const style = stat.color ? `background: ${stat.color};` : '';
    return `
      <div class="stat-card" style="${style}">
        <div class="stat-card-icon">
          <i class="${stat.icon}"></i>
        </div>
        <div class="stat-card-value">${stat.value}</div>
        <div class="stat-card-label">${stat.label}</div>
      </div>
    `;
  },

  /**
   * Generate Pagination HTML
   * @param {Object} pageData - { pageNumber, pageSize, totalElements, totalPages, first, last }
   * @param {Function} onPageChange - Callback function(page)
   * @param {Function} onSizeChange - Callback function(size)
   * @returns {string}
   */
  getPaginationHTML(pageData) {
    const { pageNumber, pageSize, totalElements, totalPages, first, last } = pageData;
    
    // Calculate page range to show (max 5 pages)
    let startPage = Math.max(0, pageNumber - 2);
    let endPage = Math.min(totalPages - 1, pageNumber + 2);
    
    // Adjust if near boundaries
    if (pageNumber < 2) {
      endPage = Math.min(4, totalPages - 1);
    }
    if (pageNumber > totalPages - 3) {
      startPage = Math.max(0, totalPages - 5);
    }
    
    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return `
      <div class="pagination-container">
        <div class="pagination-info">
          <span>Hiển thị ${pageNumber * pageSize + 1}-${Math.min((pageNumber + 1) * pageSize, totalElements)} / ${totalElements}</span>
        </div>
        
        <div class="pagination-controls">
          <button class="btn btn-sm btn-secondary" 
                  data-page="0" 
                  ${first ? 'disabled' : ''}>
            <i class="fas fa-angle-double-left"></i>
          </button>
          
          <button class="btn btn-sm btn-secondary" 
                  data-page="${pageNumber - 1}" 
                  ${first ? 'disabled' : ''}>
            <i class="fas fa-angle-left"></i>
          </button>
          
          ${pages.map(p => `
            <button class="btn btn-sm ${p === pageNumber ? 'btn-primary' : 'btn-secondary'}" 
                    data-page="${p}">
              ${p + 1}
            </button>
          `).join('')}
          
          <button class="btn btn-sm btn-secondary" 
                  data-page="${pageNumber + 1}" 
                  ${last ? 'disabled' : ''}>
            <i class="fas fa-angle-right"></i>
          </button>
          
          <button class="btn btn-sm btn-secondary" 
                  data-page="${totalPages - 1}" 
                  ${last ? 'disabled' : ''}>
            <i class="fas fa-angle-double-right"></i>
          </button>
        </div>
        
        <div class="pagination-size">
          <select class="form-control form-control-sm" id="pageSizeSelector">
            <option value="5" ${pageSize === 5 ? 'selected' : ''}>5 / trang</option>
            <option value="10" ${pageSize === 10 ? 'selected' : ''}>10 / trang</option>
            <option value="20" ${pageSize === 20 ? 'selected' : ''}>20 / trang</option>
            <option value="50" ${pageSize === 50 ? 'selected' : ''}>50 / trang</option>
          </select>
        </div>
      </div>
    `;
  }
};

// Export to window
window.Components = Components;
