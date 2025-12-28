// ========================================
// REGISTER PAGE
// Handle registration form
// ========================================

// Redirect if already authenticated
redirectIfAuthenticated();

// Get form elements
const registerForm = document.getElementById('registerForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const togglePasswordBtn = document.getElementById('togglePassword');
const toggleConfirmPasswordBtn = document.getElementById('toggleConfirmPassword');
const passwordStrengthBar = document.getElementById('passwordStrengthBar');
const termsCheckbox = document.getElementById('terms');

// Toggle password visibility
togglePasswordBtn.addEventListener('click', () => {
  const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
  passwordInput.setAttribute('type', type);
  
  const icon = togglePasswordBtn.querySelector('i');
  icon.classList.toggle('fa-eye');
  icon.classList.toggle('fa-eye-slash');
});

toggleConfirmPasswordBtn.addEventListener('click', () => {
  const type = confirmPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
  confirmPasswordInput.setAttribute('type', type);
  
  const icon = toggleConfirmPasswordBtn.querySelector('i');
  icon.classList.toggle('fa-eye');
  icon.classList.toggle('fa-eye-slash');
});

// Password strength indicator
passwordInput.addEventListener('input', () => {
  const password = passwordInput.value;
  let strength = 'weak';

  if (password.length >= 6) {
    if (password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password)) {
      strength = 'strong';
    } else if (password.length >= 6) {
      strength = 'medium';
    }
  }

  passwordStrengthBar.className = 'password-strength-bar';
  if (password.length > 0) {
    passwordStrengthBar.classList.add(strength);
  }
});

// Handle register form submission
registerForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Clear previous errors
  Validator.clearAllErrors(registerForm);
  
  // Validate form
  let isValid = true;

  // Validate name
  if (!Validator.validateMinLength(nameInput, 2, 'Họ và tên')) {
    isValid = false;
  }

  // Validate email
  if (!Validator.validateEmail(emailInput)) {
    isValid = false;
  }

  // Validate password
  if (!Validator.validateMinLength(passwordInput, 6, 'Mật khẩu')) {
    isValid = false;
  }

  // Validate confirm password
  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;
  
  if (!confirmPassword) {
    Validator.showError(confirmPasswordInput, 'Vui lòng xác nhận mật khẩu');
    isValid = false;
  } else if (password !== confirmPassword) {
    Validator.showError(confirmPasswordInput, 'Mật khẩu xác nhận không khớp');
    isValid = false;
  }

  // Validate terms checkbox
  if (!termsCheckbox.checked) {
    Toast.error('Vui lòng đồng ý với điều khoản dịch vụ');
    isValid = false;
  }

  if (!isValid) return;

  // Get form data
  const formData = {
    fullName: nameInput.value.trim(),
    email: emailInput.value.trim(),
    password: password,
    confirmPassword: confirmPassword
  };

  try {
    Loading.show();

    // Call register API
    const response = await AuthAPI.register(formData);

    Loading.hide();
    Toast.success('Đăng ký thành công! Đang chuyển đến trang đăng nhập...');

    // Redirect to login page after 1.5s
    setTimeout(() => {
      window.location.href = './index.html';
    }, 1500);

  } catch (error) {
    Loading.hide();
    console.error('Register failed:', error);
    Toast.error(error.message || 'Đăng ký thất bại. Vui lòng thử lại!');
  }
});
