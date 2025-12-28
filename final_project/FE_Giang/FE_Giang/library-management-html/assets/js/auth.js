// ========================================
// AUTHENTICATION SYSTEM
// ========================================

const Auth = {
  /**
   * Check if user is authenticated
   * @returns {boolean}
   */
  isAuthenticated() {
    const token = Storage.get('token');
    const user = Storage.get('currentUser');
    return !!(token && user);
  },

  /**
   * Get current logged in user
   * @returns {Object|null} User object or null
   */
  getCurrentUser() {
    return Storage.get('currentUser');
  },

  /**
   * Get user's role
   * @returns {string} User role (USER, LIBRARIAN, ADMIN, GUEST)
   */
  getUserRole() {
    const user = this.getCurrentUser();
    let role = user?.role || 'GUEST';
    
    // Backend returns roles with ROLE_ prefix, remove it
    if (role.startsWith('ROLE_')) {
      role = role.substring(5); // Remove 'ROLE_' prefix
    }
    
    return role;
  },

  /**
   * Get token
   * @returns {string|null}
   */
  getToken() {
    return Storage.get('token');
  },

  /**
   * Check if user has required role
   * Role hierarchy: GUEST < USER < LIBRARIAN < ADMIN
   * @param {string} requiredRole - Required role
   * @returns {boolean}
   */
  hasRole(requiredRole) {
    const roleHierarchy = {
      'GUEST': 0,
      'USER': 1,
      'LIBRARIAN': 2,
      'ADMIN': 3
    };

    const userRole = this.getUserRole();
    const userLevel = roleHierarchy[userRole] || 0;
    const requiredLevel = roleHierarchy[requiredRole] || 0;

    return userLevel >= requiredLevel;
  },

  /**
   * Check if user is admin
   * @returns {boolean}
   */
  isAdmin() {
    return this.getUserRole() === 'ADMIN';
  },

  /**
   * Check if user is librarian or above
   * @returns {boolean}
   */
  isLibrarian() {
    return this.hasRole('LIBRARIAN');
  },

  /**
   * Login user
   * @param {string} email
   * @param {string} password
   * @returns {Promise<Object>} User and token
   */
  async login(email, password) {
    try {
      Loading.show();
      
      const response = await AuthAPI.login({ email, password });
      
      Loading.hide();
      Toast.success('Đăng nhập thành công!');
      
      return response;
    } catch (error) {
      Loading.hide();
      Toast.error(error.message);
      throw error;
    }
  },

  /**
   * Register new user
   * @param {Object} userData - { email, password, name }
   * @returns {Promise<Object>} Created user
   */
  async register(userData) {
    try {
      Loading.show();
      
      const response = await AuthAPI.register(userData);
      
      Loading.hide();
      Toast.success('Đăng ký thành công! Vui lòng đăng nhập.');
      
      return response;
    } catch (error) {
      Loading.hide();
      Toast.error(error.message);
      throw error;
    }
  },

  /**
   * Logout user
   */
  logout() {
    Storage.remove('token');
    Storage.remove('currentUser');
    Toast.info('Đã đăng xuất');
    window.location.href = './index.html';
  },

  /**
   * Refresh user profile from server
   * @returns {Promise<Object>} Updated user profile
   */
  async refreshProfile() {
    try {
      const profile = await AuthAPI.getProfile();
      return profile;
    } catch (error) {
      console.error('Failed to refresh profile:', error);
      throw error;
    }
  },

  /**
   * Protect page - redirect to login if not authenticated
   * @param {string} requiredRole - Optional required role
   */
  requireAuth(requiredRole = null) {
    if (!this.isAuthenticated()) {
      Toast.warning('Vui lòng đăng nhập để tiếp tục');
      window.location.href = './index.html';
      return false;
    }

    if (requiredRole && !this.hasRole(requiredRole)) {
      Toast.error('Bạn không có quyền truy cập trang này');
      window.location.href = './dashboard.html';
      return false;
    }

    return true;
  },

  /**
   * Initialize auth on page load
   * Updates UI based on user state
   */
  init() {
    const user = this.getCurrentUser();
    
    // Update user display in sidebar
    const userNameElements = document.querySelectorAll('.sidebar-user-name');
    const userRoleElements = document.querySelectorAll('.sidebar-user-role');
    const userAvatarElements = document.querySelectorAll('.sidebar-user-avatar, .user-avatar');
    
    if (user) {
      userNameElements.forEach(el => {
        el.textContent = user.fullName || user.email;
      });
      
      userRoleElements.forEach(el => {
        el.textContent = user.role || 'USER';
      });
      
      userAvatarElements.forEach(el => {
        el.textContent = Utils.getInitials(user.fullName || user.email);
      });
    }

    // Update nav links based on role
    this.updateNavLinks();
  },

  /**
   * Update navigation links based on user role
   */
  updateNavLinks() {
    const role = this.getUserRole();
    
    // Hide admin/librarian links if user doesn't have access
    if (!this.hasRole('LIBRARIAN')) {
      document.querySelectorAll('[data-role-required="LIBRARIAN"]').forEach(el => {
        el.style.display = 'none';
      });
    }
    
    if (!this.hasRole('ADMIN')) {
      document.querySelectorAll('[data-role-required="ADMIN"]').forEach(el => {
        el.style.display = 'none';
      });
    }

    // Set active link based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'dashboard.html';
    document.querySelectorAll('.nav-link').forEach(link => {
      const href = link.getAttribute('href');
      if (href && href.includes(currentPage)) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  },

  /**
   * Setup logout buttons
   */
  setupLogoutButtons() {
    document.querySelectorAll('[data-action="logout"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        Modal.confirm(
          'Xác nhận đăng xuất',
          'Bạn có chắc chắn muốn đăng xuất?',
          () => this.logout()
        );
      });
    });
  }
};

// ========================================
// PAGE PROTECTION
// ========================================

/**
 * Protect page with authentication and role check
 * Usage: Add to top of page scripts
 * @param {string} requiredRole - Optional required role
 */
function protectPage(requiredRole = null) {
  if (!Auth.requireAuth(requiredRole)) {
    return false;
  }
  
  // Initialize auth UI
  Auth.init();
  Auth.setupLogoutButtons();
  
  return true;
}

// ========================================
// AUTO-REDIRECT IF ALREADY LOGGED IN
// (For login page)
// ========================================

function redirectIfAuthenticated() {
  if (Auth.isAuthenticated()) {
    window.location.href = './dashboard.html';
  }
}

// Export to window
window.Auth = Auth;
window.protectPage = protectPage;
window.redirectIfAuthenticated = redirectIfAuthenticated;
