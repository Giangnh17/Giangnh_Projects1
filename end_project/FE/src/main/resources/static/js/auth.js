// ============================================
// HỆ THỐNG QUẢN LÝ THƯ VIỆN - XÁC THỰC
// LIBRARY MANAGEMENT SYSTEM - AUTHENTICATION
// ============================================

/*
 * DEMO ADMIN ACCOUNT:
 * Email: admin@gmail.com
 * Password: admin
 * Role: ROLE_ADMIN
 */

function initializeLoginPage() {
  console.log('Initializing Login Page');
  
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
  }
  
  // Check if already authenticated
  if (apiService.isAuthenticated()) {
    window.location.href = '/src/main/resources/templates/index.html';
    return;
  }
}

function initializeRegisterPage() {
  console.log('Initializing Register Page');
  
  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', handleRegister);
  }
  
  // Password confirmation validation
  const password = document.getElementById('password');
  const confirmPassword = document.getElementById('confirmPassword');
  
  if (confirmPassword) {
    confirmPassword.addEventListener('input', validatePasswordMatch);
  }
  
  // Email availability check
  const email = document.getElementById('email');
  if (email) {
    email.addEventListener('input', debounce(checkEmailAvailability, 500));
  }
}

async function handleLogin(event) {
  event.preventDefault();
  
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const submitButton = event.target.querySelector('button[type="submit"]');
  const originalButtonText = submitButton.innerHTML;
  
  // Clear previous error messages
  const errorDiv = document.getElementById('errorMessage');
  if (errorDiv) errorDiv.style.display = 'none';
  
  // Simple validation
  if (!email || !password) {
    showError('Vui lòng điền đầy đủ thông tin');
    return;
  }
  
  // Validate email format
  if (!isValidEmail(email)) {
    showError('Email không hợp lệ');
    return;
  }
  
  try {
    showLoading(submitButton);
    
    const response = await apiService.login(email, password);
    
    if (typeof response === 'string' && response.length > 0) {
      // JWT token received
      apiService.setToken(response);
      
      // Get user profile
      const profile = await apiService.getProfile();
      if (profile) {
        apiService.setUserProfile(profile);
      }
      
      showSuccess('Đăng nhập thành công! Đang chuyển hướng...');
      setTimeout(() => {
        window.location.href = '/src/main/resources/templates/index.html';
      }, 1500);
    } else {
      showError('Đăng nhập thất bại. Vui lòng kiểm tra lại email và mật khẩu.');
    }
  } catch (error) {
    console.error('Login error:', error);
    showError('Có lỗi xảy ra khi đăng nhập. Vui lòng thử lại sau.');
  } finally {
    hideLoading(submitButton, originalButtonText);
  }
}

async function handleRegister(event) {
  event.preventDefault();
  
  const formData = new FormData(event.target);
  const email = formData.get('email');
  const name = formData.get('fullName');
  const password = formData.get('password');
  const confirmPassword = formData.get('confirmPassword');
  const submitButton = event.target.querySelector('button[type="submit"]');
  const originalButtonText = submitButton.innerHTML;
  
  // Clear previous error messages
  const errorDiv = document.getElementById('errorMessage');
  if (errorDiv) errorDiv.style.display = 'none';
  
  // Basic validation
  if (!email || !name || !password || !confirmPassword) {
    showError('Vui lòng điền đầy đủ thông tin');
    return;
  }
  
  if (password !== confirmPassword) {
    showError('Mật khẩu xác nhận không khớp');
    return;
  }
  
  if (password.length < 6) {
    showError('Mật khẩu phải có ít nhất 6 ký tự');
    return;
  }
  
  if (!isValidEmail(email)) {
    showError('Email không hợp lệ');
    return;
  }
  
  try {
    showLoading(submitButton);
    
    const response = await apiService.register(email, name, password);
    
    if (typeof response === 'string' && response.length > 0) {
      // Registration successful, JWT token received
      apiService.setToken(response);
      
      // Get user profile
      const profile = await apiService.getProfile();
      if (profile) {
        apiService.setUserProfile(profile);
      }
      
      showSuccess('Đăng ký thành công! Đang chuyển hướng...');
      setTimeout(() => {
        window.location.href = '/src/main/resources/templates/index.html';
      }, 2000);
    } else if (response === 'Email already exists') {
      showError('Email đã được sử dụng. Vui lòng chọn email khác.');
    } else {
      showError('Đăng ký thất bại. Vui lòng thử lại.');
    }
  } catch (error) {
    console.error('Registration error:', error);
    showError('Có lỗi xảy ra khi đăng ký. Vui lòng thử lại sau.');
  } finally {
    hideLoading(submitButton, originalButtonText);
  }
}

function validatePasswordMatch() {
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const indicator = document.getElementById('passwordMatchIndicator');
  
  if (confirmPassword.length === 0) {
    if (indicator) indicator.textContent = '';
    return;
  }
  
  if (password === confirmPassword) {
    if (indicator) {
      indicator.textContent = 'Mật khẩu khớp';
      indicator.style.color = 'var(--color-available)';
    }
  } else {
    if (indicator) {
      indicator.textContent = 'Mật khẩu không khớp';
      indicator.style.color = 'var(--color-borrowed)';
    }
  }
}

async function checkEmailAvailability() {
  const email = document.getElementById('email').value;
  const indicator = document.getElementById('emailIndicator');
  
  if (!email || !isValidEmail(email)) {
    if (indicator) {
      indicator.textContent = 'Email không hợp lệ';
      indicator.style.color = 'var(--color-borrowed)';
    }
    return;
  }
  
  // Note: In real implementation, you might want to add an API endpoint to check email availability
  if (indicator) {
    indicator.textContent = 'Đang kiểm tra...';
    indicator.style.color = 'var(--color-accent)';
    
    // Mock check - in real app you'd call an API
    setTimeout(() => {
      indicator.textContent = 'Email hợp lệ';
      indicator.style.color = 'var(--color-available)';
    }, 500);
  }
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Logout function
function logout() {
  apiService.removeToken();
  showSuccess('Đã đăng xuất thành công');
  setTimeout(() => {
    window.location.href = '/src/main/resources/templates/auth-login.html';
  }, 1000);
}

// Check if user has specific role
function hasRole(requiredRole) {
  const userRole = apiService.getUserRole();
  if (!userRole) return false;
  
  const role = userRole.replace('ROLE_', '');
  return role === requiredRole || role === 'ADMIN';
}

// Show/hide elements based on user role
function initializeRoleBasedUI() {
  const userRole = apiService.getUserRole();
  if (!userRole) return;
  
  const role = userRole.replace('ROLE_', '');
  
  // Hide admin-only elements for non-admin users
  const adminElements = document.querySelectorAll('[data-role="admin"]');
  adminElements.forEach(element => {
    if (role !== 'ADMIN') {
      element.style.display = 'none';
    }
  });
  
  // Hide librarian-only elements for regular users
  const librarianElements = document.querySelectorAll('[data-role="librarian"]');
  librarianElements.forEach(element => {
    if (role !== 'ADMIN' && role !== 'LIBRARIAN') {
      element.style.display = 'none';
    }
  });
}