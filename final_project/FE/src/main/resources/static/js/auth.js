// ============================================
// HỆ THỐNG QUẢN LÝ THƯ VIỆN - XÁC THỰC
// LIBRARY MANAGEMENT SYSTEM - AUTHENTICATION
// ============================================

function initializeLoginPage() {
  console.log('Initializing Login Page');
  
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
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
  
  // Username availability check
  const username = document.getElementById('username');
  if (username) {
    username.addEventListener('input', checkUsernameAvailability);
  }
}

async function handleLogin(event) {
  event.preventDefault();
  
  const email = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  
  // Simple validation
  if (!email || !password) {
    showError('Vui lòng điền đầy đủ thông tin');
    return;
  }

  // Email format validation  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showError('Vui lòng nhập đúng định dạng email');
    return;
  }
  
  // Disable submit button to prevent double submission
  const submitBtn = event.target.querySelector('button[type="submit"]');
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.textContent = 'Đang đăng nhập...';
  }
  
  try {
    const result = await login({ email, password });
    
    if (result.success) {
      showSuccess('Đăng nhập thành công! Đang chuyển trang...');
      
      // Redirect to dashboard
      setTimeout(() => {
        window.location.href = '/src/main/resources/templates/index.html';
      }, 1500);
    } else {
      showError(result.error || 'Đăng nhập thất bại');
    }
  } catch (error) {
    console.error('Login error:', error);
    showError('Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại.');
  } finally {
    // Re-enable submit button
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Đăng nhập vào Thư viện';
    }
  }
}

async function handleRegister(event) {
  event.preventDefault();
  
  const formData = new FormData(event.target);
  const userData = {};
  
  formData.forEach((value, key) => {
    userData[key] = value;
  });
  
  // Basic validation
  if (userData.password !== userData.confirmPassword) {
    showError('Passwords do not match');
    return;
  }
  
  // Remove confirmPassword from API request
  delete userData.confirmPassword;
  
  // Disable submit button to prevent double submission
  const submitBtn = event.target.querySelector('button[type="submit"]');
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.textContent = 'Creating Account...';
  }
  
  try {
    const result = await register(userData);
    
    if (result.success) {
      showSuccess('Registration successful! Redirecting to login...');
      setTimeout(() => {
        window.location.href = '/src/main/resources/templates/auth-login.html';
      }, 2000);
    } else {
      showError(result.error || 'Registration failed');
    }
  } catch (error) {
    console.error('Register error:', error);
    showError('An error occurred during registration. Please try again.');
  } finally {
    // Re-enable submit button
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Create Account';
    }
  }
}

function validatePasswordMatch() {
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const indicator = document.getElementById('passwordMatchIndicator');
  
  if (confirmPassword.length === 0) {
    indicator.textContent = '';
    return;
  }
  
  if (password === confirmPassword) {
    indicator.textContent = 'Passwords match';
    indicator.style.color = 'var(--color-available)';
  } else {
    indicator.textContent = 'Passwords do not match';
    indicator.style.color = 'var(--color-borrowed)';
  }
}

function checkUsernameAvailability() {
  const username = document.getElementById('username').value;
  const indicator = document.getElementById('usernameIndicator');
  
  if (username.length < 3) {
    indicator.textContent = 'Username must be at least 3 characters';
    indicator.style.color = 'var(--color-borrowed)';
    return;
  }
  
  // Mock availability check
  const unavailableUsernames = ['admin', 'librarian', 'test', 'user'];
  const isAvailable = !unavailableUsernames.includes(username.toLowerCase());
  
  setTimeout(() => {
    indicator.textContent = isAvailable ? 'Username is available' : 'Username is already taken';
    indicator.style.color = isAvailable ? 'var(--color-available)' : 'var(--color-borrowed)';
  }, 500);
}