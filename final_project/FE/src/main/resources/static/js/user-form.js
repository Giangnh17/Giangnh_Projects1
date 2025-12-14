// ============================================
// HỆ THỐNG QUẢN LÝ THƯ VIỆN - FORM NGƯỜI DÙNG
// LIBRARY MANAGEMENT SYSTEM - USER FORM
// ============================================

function initializeUserForm() {
  console.log('Initializing User Form');
  
  // Check if we're editing an existing user
  const urlParams = new URLSearchParams(window.location.search);
  const editId = urlParams.get('edit');
  
  if (editId) {
    populateFormForEdit(parseInt(editId));
  }
  
  // Set up form submission
  const userForm = document.getElementById('userForm');
  if (userForm) {
    userForm.addEventListener('submit', handleUserFormSubmit);
  }
  
  // Set up cancel buttons
  setupCancelButtons();
  
  // Set up form validation
  setupUserFormValidation();
  
  // Set up username availability check
  const username = document.getElementById('username');
  if (username) {
    username.addEventListener('input', checkUsernameAvailability);
  }
  
  // Set up password confirmation validation
  const confirmPassword = document.getElementById('confirmPassword');
  if (confirmPassword) {
    confirmPassword.addEventListener('input', validatePasswordMatch);
  }
}

function populateFormForEdit(userId) {
  // Mock user data - in real app this would come from API
  const mockUser = {
    id: userId,
    firstName: 'Nguyễn Văn',
    lastName: 'An',
    email: 'nguyenvanan@email.com',
    phone: '0912345678',
    address: '123 Đường ABC, Quận 1, TP.HCM',
    username: 'nguyenvanan',
    role: 'VIEWER',
    isActive: true
  };
  
  // Populate form fields
  document.getElementById('firstName').value = mockUser.firstName;
  document.getElementById('lastName').value = mockUser.lastName;
  document.getElementById('email').value = mockUser.email;
  document.getElementById('phone').value = mockUser.phone;
  document.getElementById('address').value = mockUser.address;
  document.getElementById('username').value = mockUser.username;
  document.getElementById('role').value = mockUser.role;
  document.getElementById('isActive').checked = mockUser.isActive;
  
  // Update form title and submit button
  const pageTitle = document.querySelector('.page-title');
  if (pageTitle) {
    pageTitle.textContent = 'Cập nhật thông tin Người dùng';
  }
  
  const submitBtn = document.querySelector('button[type="submit"]');
  if (submitBtn) {
    submitBtn.innerHTML = 'Cập nhật người dùng';
  }
  
  // Store the user ID for updating
  document.getElementById('userForm').dataset.editId = userId;
  
  // Hide password fields when editing
  const passwordSection = document.querySelectorAll('#password, #confirmPassword');
  passwordSection.forEach(field => {
    field.parentElement.style.display = 'none';
  });
}

function handleUserFormSubmit(event) {
  event.preventDefault();
  
  // Get form data
  const formData = new FormData(event.target);
  const userData = {};
  
  formData.forEach((value, key) => {
    userData[key] = value;
  });
  
  // Validate required fields
  if (!validateUserForm(userData)) {
    return;
  }
  
  const editId = event.target.dataset.editId;
  
  if (editId) {
    // Update existing user
    updateUser(parseInt(editId), userData);
  } else {
    // Create new user
    createUser(userData);
  }
}

function validateUserForm(userData) {
  clearAllErrors();
  
  let isValid = true;
  
  // Required field validation
  const requiredFields = ['firstName', 'lastName', 'email', 'username', 'role'];
  
  requiredFields.forEach(field => {
    if (!userData[field] || userData[field].trim() === '') {
      showFieldError(field, `${getFieldLabel(field)} là bắt buộc`);
      isValid = false;
    }
  });
  
  // Email format validation
  if (userData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) {
    showFieldError('email', 'Email không đúng định dạng');
    isValid = false;
  }
  
  // Phone format validation (Vietnamese format)
  if (userData.phone && !/^(0|\+84)[0-9]{9,10}$/.test(userData.phone)) {
    showFieldError('phone', 'Số điện thoại không đúng định dạng');
    isValid = false;
  }
  
  // Password validation (only for new users)
  const isNewUser = !document.getElementById('userForm').dataset.editId;
  if (isNewUser) {
    if (!userData.password || userData.password.length < 6) {
      showFieldError('password', 'Mật khẩu phải có ít nhất 6 ký tự');
      isValid = false;
    }
    
    if (userData.password !== userData.confirmPassword) {
      showFieldError('confirmPassword', 'Mật khẩu xác nhận không khớp');
      isValid = false;
    }
  }
  
  return isValid;
}

function getFieldLabel(fieldName) {
  const labels = {
    firstName: 'Họ và tên đệm',
    lastName: 'Tên',
    email: 'Email',
    username: 'Tên đăng nhập',
    role: 'Vai trò',
    password: 'Mật khẩu',
    confirmPassword: 'Xác nhận mật khẩu'
  };
  
  return labels[fieldName] || fieldName;
}

function createUser(userData) {
  // Mock API call - in real app this would be an actual API call
  console.log('Creating user:', userData);
  
  // Simulate API delay
  setTimeout(() => {
    showSuccess('Tạo người dùng thành công!');
    setTimeout(() => {
      window.location.href = '/src/main/resources/templates/index.html';
    }, 1500);
  }, 1000);
}

function updateUser(userId, userData) {
  // Mock API call - in real app this would be an actual API call
  console.log('Updating user:', userId, userData);
  
  // Simulate API delay
  setTimeout(() => {
    showSuccess('Cập nhật người dùng thành công!');
    setTimeout(() => {
      window.location.href = '/src/main/resources/templates/index.html';
    }, 1500);
  }, 1000);
}

function setupCancelButtons() {
  const cancelButtons = document.querySelectorAll('#cancelBtn, #cancelFormBtn');
  
  cancelButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      if (confirm('Bạn có chắc chắn muốn hủy bỏ? Mọi thay đổi chưa lưu sẽ bị mất.')) {
        window.location.href = '/src/main/resources/templates/index.html';
      }
    });
  });
}

function setupUserFormValidation() {
  // Real-time validation
  const form = document.getElementById('userForm');
  if (!form) return;
  
  const inputs = form.querySelectorAll('input, textarea, select');
  
  inputs.forEach(input => {
    input.addEventListener('blur', function() {
      validateUserField(this);
    });
    
    input.addEventListener('input', function() {
      clearFieldError(this.name || this.id);
    });
  });
}

function validateUserField(field) {
  const fieldName = field.name || field.id;
  const value = field.value.trim();
  
  // Clear previous error
  clearFieldError(fieldName);
  
  // Required field check
  if (field.hasAttribute('required') && !value) {
    showFieldError(fieldName, `${getFieldLabel(fieldName)} là bắt buộc`);
    return false;
  }
  
  // Email specific validation
  if (fieldName === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    showFieldError(fieldName, 'Email không đúng định dạng');
    return false;
  }
  
  // Phone specific validation
  if (fieldName === 'phone' && value && !/^(0|\+84)[0-9]{9,10}$/.test(value)) {
    showFieldError(fieldName, 'Số điện thoại không đúng định dạng (VD: 0912345678)');
    return false;
  }
  
  return true;
}

function checkUsernameAvailability() {
  const username = document.getElementById('username').value;
  const indicator = document.getElementById('usernameIndicator');
  
  if (username.length < 3) {
    indicator.textContent = 'Tên đăng nhập phải có ít nhất 3 ký tự';
    indicator.style.color = 'var(--color-borrowed)';
    return;
  }
  
  // Mock availability check
  const unavailableUsernames = ['admin', 'librarian', 'test', 'user', 'nguyenvanan'];
  const isAvailable = !unavailableUsernames.includes(username.toLowerCase());
  
  setTimeout(() => {
    indicator.textContent = isAvailable ? 'Tên đăng nhập có thể sử dụng' : 'Tên đăng nhập đã tồn tại';
    indicator.style.color = isAvailable ? 'var(--color-available)' : 'var(--color-borrowed)';
  }, 500);
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
    indicator.textContent = 'Mật khẩu khớp';
    indicator.style.color = 'var(--color-available)';
  } else {
    indicator.textContent = 'Mật khẩu không khớp';
    indicator.style.color = 'var(--color-borrowed)';
  }
}

// Navigation functions for sidebar
function showReports() {
  showInfo('Tính năng báo cáo đang được phát triển');
}

function showSettings() {
  showInfo('Tính năng cài đặt đang được phát triển');
}