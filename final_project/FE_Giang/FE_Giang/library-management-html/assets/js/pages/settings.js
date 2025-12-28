// ========================================
// SETTINGS PAGE
// Handle user profile and password settings
// ========================================

// Protect page
if (!protectPage()) {
  throw new Error('Unauthorized');
}

// Initialize page
async function initSettings() {
  try {
    // Insert sidebar and header
    const sidebarHTML = Components.getSidebarHTML();
    const headerHTML = Components.getHeaderHTML('Cài Đặt', [
      { text: 'Trang chủ', href: '/dashboard.html' },
      { text: 'Cài đặt' }
    ]);

    document.querySelector('.layout').insertAdjacentHTML('afterbegin', sidebarHTML);
    document.getElementById('layoutContent').insertAdjacentHTML('afterbegin', headerHTML);

    // Initialize components
    Components.initSidebar();
    Components.initHeader();
    Auth.init();
    Auth.setupLogoutButtons();

    // Load user profile
    await loadProfile();

    // Setup forms
    setupForms();

  } catch (error) {
    console.error('Settings init error:', error);
    Toast.error('Không thể tải dữ liệu');
  }
}

// Load user profile
async function loadProfile() {
  try {
    // Get fresh data from API
    const user = await AuthAPI.getProfile();
    
    if (user) {
      document.getElementById('name').value = user.fullName || '';
      document.getElementById('email').value = user.email || '';
      document.getElementById('role').value = user.role?.roleName || user.role || 'GUEST';
    }

  } catch (error) {
    console.error('Load profile error:', error);
    // Fallback to localStorage if API fails
    const localUser = Auth.getCurrentUser();
    if (localUser) {
      document.getElementById('name').value = localUser.fullName || '';
      document.getElementById('email').value = localUser.email || '';
      document.getElementById('role').value = localUser.role?.roleName || localUser.role || 'GUEST';
    }
  }
}

// Setup forms
function setupForms() {
  // Profile form
  document.getElementById('profileForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const nameInput = document.getElementById('name');
    
    if (!Validator.validateRequired(nameInput, 'Họ và tên')) {
      return;
    }

    try {
      Loading.show();
      
      // Call API to update full name
      await UserAPI.updateFullName({ fullName: nameInput.value.trim() });
      
      // Update local storage
      const user = Auth.getCurrentUser();
      if (user) {
        user.fullName = nameInput.value.trim();
        Storage.set('currentUser', user);
      }
      
      // Refresh UI
      Auth.init();
      
      Toast.success('Cập nhật thông tin thành công!');
      Loading.hide();
    } catch (error) {
      Loading.hide();
      Toast.error(error.message);
    }
  });

  // Password form
  document.getElementById('passwordForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const currentPassword = document.getElementById('currentPassword');
    const newPassword = document.getElementById('newPassword');
    const confirmPassword = document.getElementById('confirmPassword');

    Validator.clearAllErrors(e.target);

    let isValid = true;
    if (!Validator.validateRequired(currentPassword, 'Mật khẩu hiện tại')) isValid = false;
    if (!Validator.validateMinLength(newPassword, 6, 'Mật khẩu mới')) isValid = false;
    if (!Validator.validateMatch(newPassword, confirmPassword, 'Mật khẩu')) isValid = false;

    if (!isValid) return;

    try {
      Loading.show();
      
      // Call API to change password
      await UserAPI.updatePassword({
        oldPassword: currentPassword.value,
        newPassword: newPassword.value
      });
      
      Toast.success('Đổi mật khẩu thành công!');
      e.target.reset();
      Loading.hide();
    } catch (error) {
      Loading.hide();
      Toast.error(error.message);
    }
  });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initSettings);
