// ============================================
// HỆ THỐNG QUẢN LÝ THƯ VIỆN VINTAGE ACADEMIA
// VINTAGE ACADEMIA LIBRARY MANAGEMENT SYSTEM
// Bộ điều khiển JavaScript chính
// Main JavaScript Controller
// ============================================

// ============================================
// CONFIGURATION & CONSTANTS
// ============================================

// Current user role (simulated - in real app this would come from backend)
const CURRENT_ROLE = 'LIBRARIAN'; // Options: 'GUEST', 'VIEWER', 'LIBRARIAN'

// Mock data for books
let BOOKS_DATA = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    isbn: "978-0-7432-7356-5",
    category: "Classic Literature",
    publisher: "Scribner",
    status: "available",
    description: "A classic American novel set in the Jazz Age, exploring themes of wealth, love, and the American Dream.",
    borrowHistory: [
      { borrower: "John Smith", date: "2024-10-15", returned: "2024-11-01" },
      { borrower: "Sarah Johnson", date: "2024-09-20", returned: "2024-10-05" }
    ]
  },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    isbn: "978-0-06-112008-4",
    category: "Fiction",
    publisher: "J.B. Lippincott & Co.",
    status: "borrowed",
    description: "A gripping tale of racial injustice and childhood innocence in the American South.",
    borrowHistory: [
      { borrower: "Michael Brown", date: "2024-11-20", returned: null }
    ]
  },
  {
    id: 3,
    title: "1984",
    author: "George Orwell",
    isbn: "978-0-452-28423-4",
    category: "Dystopian Fiction",
    publisher: "Secker & Warburg",
    status: "available",
    description: "A dystopian social science fiction novel about totalitarian control and surveillance.",
    borrowHistory: [
      { borrower: "Emily Davis", date: "2024-08-10", returned: "2024-09-15" }
    ]
  },
  {
    id: 4,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    isbn: "978-0-14-143951-8",
    category: "Romance",
    publisher: "T. Egerton",
    status: "available",
    description: "A romantic novel that critiques the British landed gentry at the end of the 18th century.",
    borrowHistory: []
  },
  {
    id: 5,
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    isbn: "978-0-316-76948-0",
    category: "Coming of Age",
    publisher: "Little, Brown and Company",
    status: "lost",
    description: "A controversial novel about teenage rebellion and alienation.",
    borrowHistory: [
      { borrower: "Unknown", date: "2024-07-01", returned: null }
    ]
  }
];

// Current filter state
let currentFilter = 'all';
let currentSearchTerm = '';

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  console.log('🏛️ Vintage Academia Library System Initialized');
  console.log(`Current Role: ${CURRENT_ROLE}`);
  
  // Apply role-based styling to body
  document.body.classList.add(`role-${CURRENT_ROLE.toLowerCase()}`);
  
  // Initialize based on current page
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
  }
}

// ============================================
// AUTHENTICATION PAGES
// ============================================

function initializeLoginPage() {
  console.log('📝 Initializing Login Page');
  
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
  }
  
  // Add demo role buttons for testing
  addDemoRoleButtons();
}

function initializeRegisterPage() {
  console.log('📝 Initializing Register Page');
  
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
}

function handleLogin(event) {
  event.preventDefault();
  
  const formData = new FormData(event.target);
  const username = formData.get('username');
  const password = formData.get('password');
  
  if (!validateLoginForm(username, password)) {
    return;
  }
  
  // Simulate login process
  showLoadingState(event.target);
  
  setTimeout(() => {
    // In real app, this would be an API call
    sessionStorage.setItem('isLoggedIn', 'true');
    sessionStorage.setItem('username', username);
    
    // Determine role based on username (demo)
    let role = 'VIEWER';
    if (username.toLowerCase().includes('admin') || username.toLowerCase().includes('librarian')) {
      role = 'LIBRARIAN';
    }
    sessionStorage.setItem('userRole', role);
    
    showNotification('Đăng nhập thành công! Đang chuyển hướng...', 'success');
    
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 1500);
  }, 2000);
}

function handleRegister(event) {
  event.preventDefault();
  
  const formData = new FormData(event.target);
  const fullName = formData.get('fullName');
  const email = formData.get('email');
  const username = formData.get('username');
  const password = formData.get('password');
  const confirmPassword = formData.get('confirmPassword');
  
  if (!validateRegisterForm(fullName, email, username, password, confirmPassword)) {
    return;
  }
  
  showLoadingState(event.target);
  
  setTimeout(() => {
    showNotification('Đơn đăng ký thành viên đã được gửi! Vui lòng đăng nhập.', 'success');
    
    setTimeout(() => {
      window.location.href = 'auth-login.html';
    }, 2000);
  }, 2000);
}

// ============================================
// DASHBOARD PAGE
// ============================================

function initializeDashboard() {
  console.log('📚 Initializing Dashboard');
  
  // Apply role-based visibility
  applyRoleBasedVisibility();
  
  // Render books table
  renderBooksTable();
  
  // Set up search functionality
  setupSearch();
  
  // Set up filter functionality
  setupFilter();
  
  // Set up add book button
  setupAddBookButton();
  
  // Update user info in navbar
  updateNavbarUserInfo();
}

function renderBooksTable() {
  const tableBody = document.querySelector('.books-table tbody');
  if (!tableBody) return;
  
  // Filter books based on current filter and search
  const filteredBooks = filterBooks();
  
  tableBody.innerHTML = '';
  
  if (filteredBooks.length === 0) {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td colspan="6" class="text-center" style="padding: 40px; color: var(--color-accent); font-style: italic;">
        Không tìm thấy sách nào phù hợp với tiêu chí của bạn.
      </td>
    `;
    tableBody.appendChild(row);
    return;
  }
  
  filteredBooks.forEach(book => {
    const row = document.createElement('tr');
    row.className = 'fade-in';
    
    row.innerHTML = `
      <td><strong>#${book.id}</strong></td>
      <td><strong>${book.title}</strong></td>
      <td>${book.author}</td>
      <td>${book.category}</td>
      <td>
        <span class="status-badge status-${book.status}">
          ${book.status.charAt(0).toUpperCase() + book.status.slice(1)}
        </span>
      </td>
      <td>
        <div class="action-group">
          <button class="btn btn-icon btn-view" onclick="viewBook(${book.id})" title="View Details">
            👁️
          </button>
          <button class="btn btn-icon btn-edit librarian-only" onclick="editBook(${book.id})" title="Edit Book">
            ✏️
          </button>
          <button class="btn btn-icon btn-delete librarian-only" onclick="deleteBook(${book.id})" title="Delete Book">
            🗑️
          </button>
        </div>
      </td>
    `;
    
    tableBody.appendChild(row);
  });
  
  // Reapply role-based visibility after rendering
  applyRoleBasedVisibility();
}

function filterBooks() {
  return BOOKS_DATA.filter(book => {
    // Filter by status
    if (currentFilter !== 'all' && book.status !== currentFilter) {
      return false;
    }
    
    // Filter by search term
    if (currentSearchTerm) {
      const searchLower = currentSearchTerm.toLowerCase();
      return (
        book.title.toLowerCase().includes(searchLower) ||
        book.author.toLowerCase().includes(searchLower) ||
        book.category.toLowerCase().includes(searchLower) ||
        book.isbn.includes(searchLower)
      );
    }
    
    return true;
  });
}

function setupSearch() {
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', debounce((event) => {
      currentSearchTerm = event.target.value;
      renderBooksTable();
    }, 300));
  }
}

function setupFilter() {
  const filterSelect = document.getElementById('statusFilter');
  if (filterSelect) {
    filterSelect.addEventListener('change', (event) => {
      currentFilter = event.target.value;
      renderBooksTable();
    });
  }
}

function setupAddBookButton() {
  const addBookBtn = document.getElementById('addBookBtn');
  if (addBookBtn) {
    addBookBtn.addEventListener('click', () => {
      window.location.href = 'book-form.html?mode=add';
    });
  }
}

// ============================================
// BOOK DETAIL PAGE
// ============================================

function initializeBookDetail() {
  console.log('📖 Initializing Book Detail Page');
  
  const urlParams = new URLSearchParams(window.location.search);
  const bookId = parseInt(urlParams.get('id'));
  
  if (bookId) {
    renderBookDetail(bookId);
  } else {
    showNotification('Không tìm thấy sách!', 'error');
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 2000);
  }
  
  // Set up back button
  const backBtn = document.getElementById('backBtn');
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      window.location.href = 'index.html';
    });
  }
}

function renderBookDetail(bookId) {
  const book = BOOKS_DATA.find(b => b.id === bookId);
  if (!book) return;
  
  // Update page elements
  document.getElementById('bookTitle').textContent = book.title;
  document.getElementById('bookAuthor').textContent = book.author;
  document.getElementById('bookISBN').textContent = book.isbn;
  document.getElementById('bookCategory').textContent = book.category;
  document.getElementById('bookPublisher').textContent = book.publisher;
  document.getElementById('bookDescription').textContent = book.description;
  
  // Update status badge
  const statusBadge = document.getElementById('bookStatus');
  statusBadge.className = `status-badge status-${book.status}`;
  statusBadge.textContent = book.status.charAt(0).toUpperCase() + book.status.slice(1);
  
  // Render borrow history
  renderBorrowHistory(book.borrowHistory);
  
  // Apply role-based visibility
  applyRoleBasedVisibility();
}

function renderBorrowHistory(history) {
  const historyBody = document.querySelector('.history-table tbody');
  if (!historyBody) return;
  
  historyBody.innerHTML = '';
  
  if (history.length === 0) {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td colspan="3" class="text-center" style="padding: 20px; color: var(--color-accent); font-style: italic;">
        No borrowing history available.
      </td>
    `;
    historyBody.appendChild(row);
    return;
  }
  
  history.forEach(record => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${record.borrower}</td>
      <td>${record.date}</td>
      <td>${record.returned || 'Not returned'}</td>
    `;
    historyBody.appendChild(row);
  });
}

// ============================================
// BOOK FORM PAGE (ADD/EDIT)
// ============================================

function initializeBookForm() {
  console.log('📝 Initializing Book Form Page');
  
  const urlParams = new URLSearchParams(window.location.search);
  const mode = urlParams.get('mode');
  const bookId = parseInt(urlParams.get('id'));
  
  if (mode === 'edit' && bookId) {
    populateFormForEdit(bookId);
    document.getElementById('formTitle').textContent = 'Edit Book';
  } else {
    document.getElementById('formTitle').textContent = 'Add New Book';
  }
  
  // Set up form submission
  const bookForm = document.getElementById('bookForm');
  if (bookForm) {
    bookForm.addEventListener('submit', handleBookFormSubmit);
  }
  
  // Set up cancel button
  const cancelBtn = document.getElementById('cancelBtn');
  if (cancelBtn) {
    cancelBtn.addEventListener('click', () => {
      window.location.href = 'index.html';
    });
  }
  
  applyRoleBasedVisibility();
}

function populateFormForEdit(bookId) {
  const book = BOOKS_DATA.find(b => b.id === bookId);
  if (!book) return;
  
  document.getElementById('bookTitleInput').value = book.title;
  document.getElementById('bookAuthorInput').value = book.author;
  document.getElementById('bookISBNInput').value = book.isbn;
  document.getElementById('bookCategoryInput').value = book.category;
  document.getElementById('bookPublisherInput').value = book.publisher;
  document.getElementById('bookDescriptionInput').value = book.description;
  document.getElementById('bookStatusSelect').value = book.status;
}

function handleBookFormSubmit(event) {
  event.preventDefault();
  
  const formData = new FormData(event.target);
  const bookData = {
    title: formData.get('title'),
    author: formData.get('author'),
    isbn: formData.get('isbn'),
    category: formData.get('category'),
    publisher: formData.get('publisher'),
    description: formData.get('description'),
    status: formData.get('status')
  };
  
  if (!validateBookForm(bookData)) {
    return;
  }
  
  showLoadingState(event.target);
  
  setTimeout(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const mode = urlParams.get('mode');
    const bookId = parseInt(urlParams.get('id'));
    
    if (mode === 'edit' && bookId) {
      // Update existing book
      const bookIndex = BOOKS_DATA.findIndex(b => b.id === bookId);
      if (bookIndex !== -1) {
        BOOKS_DATA[bookIndex] = { ...BOOKS_DATA[bookIndex], ...bookData };
        showNotification('Cập nhật sách thành công!', 'success');
      }
    } else {
      // Add new book
      const newBook = {
        id: Math.max(...BOOKS_DATA.map(b => b.id)) + 1,
        ...bookData,
        borrowHistory: []
      };
      BOOKS_DATA.push(newBook);
      showNotification('Thêm sách thành công!', 'success');
    }
    
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 1500);
  }, 2000);
}

// ============================================
// BOOK ACTIONS
// ============================================

function viewBook(bookId) {
  window.location.href = `book-detail.html?id=${bookId}`;
}

function editBook(bookId) {
  if (CURRENT_ROLE !== 'LIBRARIAN') {
    showNotification('Bạn không có quyền chỉnh sửa sách.', 'error');
    return;
  }
  window.location.href = `book-form.html?mode=edit&id=${bookId}`;
}

function deleteBook(bookId) {
  if (CURRENT_ROLE !== 'LIBRARIAN') {
    showNotification('Bạn không có quyền xóa sách.', 'error');
    return;
  }
  
  const book = BOOKS_DATA.find(b => b.id === bookId);
  if (!book) return;
  
  const confirmed = confirm(
    `Are you sure you want to remove "${book.title}" from the library?\n\n` +
    `This action cannot be undone. The book record will be permanently deleted.`
  );
  
  if (confirmed) {
    BOOKS_DATA = BOOKS_DATA.filter(b => b.id !== bookId);
    renderBooksTable();
    showNotification(`"${book.title}" has been removed from the library.`, 'success');
  }
}

// ============================================
// ROLE-BASED FUNCTIONALITY
// ============================================

function applyRoleBasedVisibility() {
  const librarianElements = document.querySelectorAll('.librarian-only');
  const viewerElements = document.querySelectorAll('.viewer-only');
  
  librarianElements.forEach(element => {
    if (CURRENT_ROLE === 'LIBRARIAN') {
      element.classList.remove('hidden');
    } else {
      element.classList.add('hidden');
    }
  });
  
  viewerElements.forEach(element => {
    if (CURRENT_ROLE === 'VIEWER' || CURRENT_ROLE === 'LIBRARIAN') {
      element.classList.remove('hidden');
    } else {
      element.classList.add('hidden');
    }
  });
}

// ============================================
// VALIDATION FUNCTIONS
// ============================================

function validateLoginForm(username, password) {
  clearFormErrors();
  let isValid = true;
  
  if (!username || username.trim().length < 3) {
    showFieldError('username', 'Username must be at least 3 characters long');
    isValid = false;
  }
  
  if (!password || password.length < 4) {
    showFieldError('password', 'Password must be at least 4 characters long');
    isValid = false;
  }
  
  return isValid;
}

function validateRegisterForm(fullName, email, username, password, confirmPassword) {
  clearFormErrors();
  let isValid = true;
  
  if (!fullName || fullName.trim().length < 2) {
    showFieldError('fullName', 'Full name is required');
    isValid = false;
  }
  
  if (!email || !isValidEmail(email)) {
    showFieldError('email', 'Please enter a valid email address');
    isValid = false;
  }
  
  if (!username || username.trim().length < 3) {
    showFieldError('username', 'Username must be at least 3 characters long');
    isValid = false;
  }
  
  if (!password || password.length < 6) {
    showFieldError('password', 'Password must be at least 6 characters long');
    isValid = false;
  }
  
  if (password !== confirmPassword) {
    showFieldError('confirmPassword', 'Passwords do not match');
    isValid = false;
  }
  
  return isValid;
}

function validateBookForm(bookData) {
  clearFormErrors();
  let isValid = true;
  
  if (!bookData.title || bookData.title.trim().length < 2) {
    showFieldError('title', 'Book title is required');
    isValid = false;
  }
  
  if (!bookData.author || bookData.author.trim().length < 2) {
    showFieldError('author', 'Author name is required');
    isValid = false;
  }
  
  if (!bookData.isbn || !isValidISBN(bookData.isbn)) {
    showFieldError('isbn', 'Please enter a valid ISBN');
    isValid = false;
  }
  
  if (!bookData.category || bookData.category.trim().length < 2) {
    showFieldError('category', 'Category is required');
    isValid = false;
  }
  
  return isValid;
}

function validatePasswordMatch() {
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  
  if (confirmPassword && password !== confirmPassword) {
    showFieldError('confirmPassword', 'Passwords do not match');
  } else {
    clearFieldError('confirmPassword');
  }
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidISBN(isbn) {
  // Basic ISBN validation (10 or 13 digits with optional hyphens)
  const cleanISBN = isbn.replace(/[-\s]/g, '');
  return /^(\d{10}|\d{13})$/.test(cleanISBN);
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

function showNotification(message, type = 'info') {
  // Remove existing notification
  const existingNotification = document.querySelector('.notification');
  if (existingNotification) {
    existingNotification.remove();
  }
  
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  
  const colors = {
    success: 'var(--color-available)',
    error: 'var(--color-borrowed)',
    info: 'var(--color-accent)',
    warning: '#FF8F00'
  };
  
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${colors[type] || colors.info};
    color: var(--color-background);
    padding: var(--spacing-lg) var(--spacing-xl);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-heavy);
    z-index: 9999;
    max-width: 350px;
    font-weight: 500;
    animation: slideInRight 0.3s ease-out;
  `;
  
  notification.textContent = message;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.animation = 'fadeOut 0.3s ease-out';
      setTimeout(() => notification.remove(), 300);
    }
  }, 5000);
}

function showFieldError(fieldName, message) {
  const field = document.getElementById(fieldName) || document.querySelector(`[name="${fieldName}"]`);
  if (!field) return;
  
  field.style.borderColor = 'var(--color-borrowed)';
  
  // Remove existing error
  clearFieldError(fieldName);
  
  // Add error message
  const errorElement = document.createElement('div');
  errorElement.className = 'field-error';
  errorElement.style.cssText = `
    color: var(--color-borrowed);
    font-size: 0.85rem;
    margin-top: var(--spacing-xs);
    font-weight: 500;
  `;
  errorElement.textContent = message;
  
  field.parentElement.appendChild(errorElement);
}

function clearFieldError(fieldName) {
  const field = document.getElementById(fieldName) || document.querySelector(`[name="${fieldName}"]`);
  if (field) {
    field.style.borderColor = '';
    const existingError = field.parentElement.querySelector('.field-error');
    if (existingError) {
      existingError.remove();
    }
  }
}

function clearFormErrors() {
  document.querySelectorAll('.form-control').forEach(field => {
    field.style.borderColor = '';
  });
  
  document.querySelectorAll('.field-error').forEach(error => {
    error.remove();
  });
}

function showLoadingState(form) {
  const submitButton = form.querySelector('button[type="submit"]');
  if (submitButton) {
    submitButton.disabled = true;
    submitButton.innerHTML = '⏳ Processing...';
    form.style.opacity = '0.7';
  }
}

function updateNavbarUserInfo() {
  const username = sessionStorage.getItem('username') || 'Demo User';
  const userNameElement = document.querySelector('.user-name');
  const userAvatarElement = document.querySelector('.user-avatar');
  
  if (userNameElement) {
    userNameElement.textContent = username;
  }
  
  if (userAvatarElement) {
    userAvatarElement.textContent = username.charAt(0).toUpperCase();
  }
}

// ============================================
// DEMO & TESTING FUNCTIONS
// ============================================

function addDemoRoleButtons() {
  const authCard = document.querySelector('.auth-card');
  if (!authCard) return;
  
  const demoSection = document.createElement('div');
  demoSection.innerHTML = `
    <div style="margin-top: var(--spacing-xl); padding-top: var(--spacing-xl); border-top: 1px solid var(--color-accent);">
      <p style="text-align: center; margin-bottom: var(--spacing-md); color: var(--color-accent); font-style: italic;">
        🎭 Demo Access (Quick Login):
      </p>
      <div style="display: flex; gap: var(--spacing-sm); flex-wrap: wrap;">
        <button type="button" class="btn btn-outline" onclick="quickLogin('viewer')" style="flex: 1;">
          Viewer
        </button>
        <button type="button" class="btn btn-outline" onclick="quickLogin('librarian')" style="flex: 1;">
          Librarian
        </button>
      </div>
    </div>
  `;
  
  authCard.appendChild(demoSection);
}

function quickLogin(role) {
  sessionStorage.setItem('isLoggedIn', 'true');
  sessionStorage.setItem('username', `Demo ${role.charAt(0).toUpperCase() + role.slice(1)}`);
  sessionStorage.setItem('userRole', role.toUpperCase());
  
  showNotification(`Logged in as ${role}!`, 'success');
  
  setTimeout(() => {
    window.location.href = 'index.html';
  }, 1500);
}

// ============================================
// GLOBAL EVENT LISTENERS
// ============================================

function setupGlobalEventListeners() {
  // Keyboard shortcuts
  document.addEventListener('keydown', function(event) {
    // Ctrl/Cmd + K for search focus
    if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
      event.preventDefault();
      const searchInput = document.getElementById('searchInput');
      if (searchInput) {
        searchInput.focus();
        searchInput.select();
      }
    }
    
    // Escape to clear search
    if (event.key === 'Escape') {
      const searchInput = document.getElementById('searchInput');
      if (searchInput && searchInput === document.activeElement) {
        searchInput.value = '';
        searchInput.dispatchEvent(new Event('input'));
        searchInput.blur();
      }
    }
  });
  
  // Auto-clear form errors when user starts typing
  document.addEventListener('input', function(event) {
    if (event.target.classList.contains('form-control')) {
      clearFieldError(event.target.name || event.target.id);
    }
  });
}

// ============================================
// INITIALIZATION COMPLETE
// ============================================

console.log('🏛️ Vintage Academia Library System JavaScript Loaded Successfully!');