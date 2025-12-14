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
  
  // Add demo role buttons for testing
  addDemoRoleButtons();
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

function handleLogin(event) {
  event.preventDefault();
  
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  
  // Simple validation
  if (!username || !password) {
    showError('Please fill in all fields');
    return;
  }
  
  // Mock authentication
  if (username === 'admin' && password === 'admin') {
    showSuccess('Login successful! Redirecting...');
    setTimeout(() => {
      // Redirect to dashboard
      window.location.href = '/src/main/resources/templates/index.html';
    }, 1500);
  } else if (username === 'librarian' && password === 'lib123') {
    showSuccess('Librarian login successful!');
    setTimeout(() => {
      window.location.href = '/src/main/resources/templates/index.html';
    }, 1500);
  } else {
    showError('Invalid credentials. Try: admin/admin or librarian/lib123');
  }
}

function handleRegister(event) {
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
  
  // Mock registration
  showSuccess('Registration successful! Please check your email for confirmation.');
  setTimeout(() => {
    window.location.href = '/src/main/resources/templates/auth-login.html';
  }, 2000);
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

function addDemoRoleButtons() {
  const loginCard = document.querySelector('.auth-card');
  if (!loginCard) return;
  
  const demoSection = document.createElement('div');
  demoSection.innerHTML = `
    <div style="margin-top: var(--spacing-lg); padding-top: var(--spacing-lg); border-top: 1px solid var(--color-accent);">
      <h4 style="text-align: center; margin-bottom: var(--spacing-md); color: var(--color-accent);">Demo Accounts</h4>
      <div style="display: flex; gap: var(--spacing-sm); justify-content: center;">
        <button type="button" class="btn btn-outline" onclick="fillDemoCredentials('admin', 'admin')">Admin</button>
        <button type="button" class="btn btn-outline" onclick="fillDemoCredentials('librarian', 'lib123')">Librarian</button>
      </div>
    </div>
  `;
  
  loginCard.appendChild(demoSection);
}

function fillDemoCredentials(username, password) {
  document.getElementById('username').value = username;
  document.getElementById('password').value = password;
}