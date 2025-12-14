// ============================================
// HỆ THỐNG QUẢN LÝ THƯ VIỆN - MAIN CONTROLLER
// LIBRARY MANAGEMENT SYSTEM - MAIN CONTROLLER
// ============================================

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('🏛️ Trang web Quản lý thư viện sách Sarly - Initializing...');
  
  // Initialize the appropriate page
  initializePage();
  
  // Set up global event listeners
  setupGlobalEventListeners();
});

function initializePage() {
  const path = window.location.pathname;
  
  if (path.includes('auth-login') || path.endsWith('login.html')) {
    initializeLoginPage();
  } else if (path.includes('auth-register') || path.endsWith('register.html')) {
    initializeRegisterPage();
  } else if (path.includes('index') || path === '/' || path.endsWith('index.html')) {
    initializeDashboard();
  } else if (path.includes('book-detail') || path.endsWith('detail.html')) {
    initializeBookDetail();
  } else if (path.includes('book-form') || path.endsWith('form.html')) {
    initializeBookForm();
  } else if (path.includes('user-form') || path.endsWith('user-form.html')) {
    initializeUserForm();
  }
}

// ============================================
// VISIBILITY TOGGLE FUNCTIONS
// ============================================

function toggleDashboardVisibility() {
  const dashboard = document.getElementById('libraryDashboard');
  if (!dashboard) return;
  
  const isVisible = dashboard.style.display !== 'none';
  
  if (isVisible) {
    dashboard.style.display = 'none';
    console.log('Library dashboard is now hidden');
  } else {
    dashboard.style.display = 'block';
    console.log('Library dashboard is now active');
  }
}

// ============================================
// INITIALIZATION COMPLETE
// ============================================

console.log('🏛️ Trang web Quản lý thư viện sách Sarly JavaScript Loaded Successfully!');