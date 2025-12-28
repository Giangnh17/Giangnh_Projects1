// ========================================
// LOGIN PAGE
// Handle login form and authentication
// ========================================

// Redirect if already authenticated
redirectIfAuthenticated();

// Get form elements
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const togglePasswordBtn = document.getElementById('togglePassword');
const registerBtn = document.getElementById('registerBtn');

// Toggle password visibility
togglePasswordBtn.addEventListener('click', () => {
  const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
  passwordInput.setAttribute('type', type);
  
  const icon = togglePasswordBtn.querySelector('i');
  icon.classList.toggle('fa-eye');
  icon.classList.toggle('fa-eye-slash');
});

// Handle login form submission
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Validate form
  Validator.clearAllErrors(loginForm);
  
  let isValid = true;
  if (!Validator.validateEmail(emailInput)) isValid = false;
  if (!Validator.validateMinLength(passwordInput, 6, 'Mật khẩu')) isValid = false;

  if (!isValid) return;

  // Get form data
  const email = emailInput.value.trim();
  const password = passwordInput.value;

  try {
    // Call login API
    const response = await Auth.login(email, password);
    
    console.log('Login response:', response);
    console.log('Token saved:', localStorage.getItem('token'));
    console.log('User saved:', localStorage.getItem('currentUser'));
    console.log('Is authenticated after login:', Auth.isAuthenticated());

    // Verify token was saved before redirecting
    if (!Auth.isAuthenticated()) {
      console.error('Authentication failed: Token not saved properly');
      Toast.error('Lỗi xác thực. Vui lòng thử lại!');
      return;
    }

    // Redirect to dashboard
    window.location.href = './dashboard.html';

  } catch (error) {
    console.error('Login failed:', error);
    Toast.error(error.message || 'Đăng nhập thất bại');
  }
});

// Register button
if (registerBtn) {
  registerBtn.addEventListener('click', () => {
    window.location.href = './register.html';
  });
}

// Auto-fill demo credentials (for testing - remove in production)
document.addEventListener('keydown', (e) => {
  if (e.altKey && e.key === 'a') {
    emailInput.value = 'admin@gmail.com';
    passwordInput.value = 'admin123';
    Toast.info('Đã điền thông tin Admin');
  }
  if (e.altKey && e.key === 'l') {
    emailInput.value = 'librarian@gmail.com';
    passwordInput.value = 'librarian';
    Toast.info('Đã điền thông tin Librarian');
  }
  if (e.altKey && e.key === 'u') {
    emailInput.value = 'user@gmail.com';
    passwordInput.value = 'user123';
    Toast.info('Đã điền thông tin User');
  }
});
