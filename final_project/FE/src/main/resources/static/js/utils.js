// ============================================
// HỆ THỐNG QUẢN LÝ THƯ VIỆN - TIỆN ÍCH CHUNG & APP INITIALIZATION
// LIBRARY MANAGEMENT SYSTEM - UTILITIES & APP INIT
// ============================================

// ============================================
// APPLICATION INITIALIZATION
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
  }
}

function setupGlobalEventListeners() {
  // Global keyboard shortcuts
  document.addEventListener('keydown', function(event) {
    // Escape key to close modals/forms
    if (event.key === 'Escape') {
      const modals = document.querySelectorAll('.modal.show');
      modals.forEach(modal => modal.style.display = 'none');
    }
  });
}

// ============================================
// NAVIGATION FUNCTIONS
// ============================================

function viewBook(bookId) {
  window.location.href = `/src/main/resources/templates/book-detail.html?id=${bookId}`;
}

function editBook(bookId) {
  window.location.href = `/src/main/resources/templates/book-form.html?edit=${bookId}`;
}

async function deleteBookFromDashboard(bookId) {
  await deleteBookRecord(bookId);
}

async function deleteBookRecord(bookId) {
  try {
    // First get book details for confirmation
    const bookResult = await getBookById(bookId);
    
    let bookTitle = 'this book';
    let bookAuthor = '';
    
    if (bookResult.success && bookResult.data) {
      bookTitle = bookResult.data.title;
      bookAuthor = bookResult.data.author;
    } else {
      // Fallback to mock data
      const book = BOOKS_DATA.find(b => b.id === bookId);
      if (book) {
        bookTitle = book.title;
        bookAuthor = book.author;
      }
    }
    
    const confirmMessage = `Are you sure you want to delete "${bookTitle}"${bookAuthor ? ` by ${bookAuthor}` : ''}?\n\nThis action cannot be undone.`;
    
    if (confirm(confirmMessage)) {
      const result = await deleteBook(bookId);
      
      if (result.success) {
        showSuccess('Book deleted successfully');
        
        // Redirect to dashboard after deletion
        setTimeout(() => {
          window.location.href = '/src/main/resources/templates/index.html';
        }, 1500);
      } else {
        showError(result.error || 'Failed to delete book');
      }
    }
  } catch (error) {
    console.error('Delete book error:', error);
    showError('An error occurred while deleting the book. Please try again.');
  }
}

// ============================================
// USER MANAGEMENT FUNCTIONS
// ============================================

function getUserDisplayInfo() {
  const user = getCurrentUser();
  if (user) {
    return {
      name: user.name || user.username || 'Unknown User',
      role: user.role || 'GUEST',
      initial: (user.name || user.username || 'U').charAt(0).toUpperCase()
    };
  }
  
  return {
    name: 'Demo User',
    role: 'GUEST', 
    initial: 'U'
  };
}

async function handleLogout() {
  if (confirm('Are you sure you want to logout?')) {
    await logout();
  }
}

// ============================================
// NOTIFICATION FUNCTIONS
// ============================================

function showSuccess(message) {
  showNotification(message, 'success');
}

function showError(message) {
  showNotification(message, 'error');
}

function showInfo(message) {
  showNotification(message, 'info');
}

function showNotification(message, type = 'info') {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll('.notification');
  existingNotifications.forEach(notification => notification.remove());
  
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: var(--spacing-md) var(--spacing-lg);
    border-radius: var(--radius-sm);
    color: white;
    font-weight: 600;
    z-index: 1000;
    max-width: 400px;
    box-shadow: var(--shadow-heavy);
    animation: slideIn 0.3s ease-out;
  `;
  
  // Set background color based on type
  switch(type) {
    case 'success':
      notification.style.backgroundColor = 'var(--color-available)';
      break;
    case 'error':
      notification.style.backgroundColor = 'var(--color-borrowed)';
      break;
    case 'info':
    default:
      notification.style.backgroundColor = 'var(--color-accent)';
      break;
  }
  
  notification.textContent = message;
  document.body.appendChild(notification);
  
  // Auto remove after 4 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.animation = 'slideOut 0.3s ease-in forwards';
      setTimeout(() => notification.remove(), 300);
    }
  }, 4000);
  
  // Add CSS animations if not already present
  addNotificationStyles();
}

function addNotificationStyles() {
  if (document.getElementById('notification-styles')) return;
  
  const style = document.createElement('style');
  style.id = 'notification-styles';
  style.textContent = `
    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    
    @keyframes slideOut {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(100%);
        opacity: 0;
      }
    }
  `;
  
  document.head.appendChild(style);
}

// ============================================
// FORM VALIDATION FUNCTIONS
// ============================================

function showFieldError(fieldName, message) {
  clearFieldError(fieldName);
  
  const field = document.getElementById(fieldName) || document.querySelector(`[name="${fieldName}"]`);
  if (!field) return;
  
  // Add error class to field
  field.classList.add('field-error');
  
  // Create error message element
  const errorElement = document.createElement('div');
  errorElement.className = 'field-error-message';
  errorElement.textContent = message;
  errorElement.style.cssText = `
    color: var(--color-borrowed);
    font-size: 0.85rem;
    margin-top: var(--spacing-xs);
    font-weight: 500;
  `;
  
  // Insert error message after the field
  field.parentNode.insertBefore(errorElement, field.nextSibling);
}

function clearFieldError(fieldName) {
  const field = document.getElementById(fieldName) || document.querySelector(`[name="${fieldName}"]`);
  if (!field) return;
  
  // Remove error class
  field.classList.remove('field-error');
  
  // Remove error message
  const errorMessage = field.parentNode.querySelector('.field-error-message');
  if (errorMessage) {
    errorMessage.remove();
  }
}

function clearAllErrors() {
  // Remove all error classes
  const errorFields = document.querySelectorAll('.field-error');
  errorFields.forEach(field => field.classList.remove('field-error'));
  
  // Remove all error messages
  const errorMessages = document.querySelectorAll('.field-error-message');
  errorMessages.forEach(message => message.remove());
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function formatDate(dateString) {
  if (!dateString) return 'N/A';
  
  const date = new Date(dateString);
  return date.toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: '2-digit', 
    day: '2-digit'
  });
}

function formatCurrency(amount) {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(amount);
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

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// ============================================
// KEYBOARD SHORTCUTS
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

console.log('🏛️ Library Management System - Utils & App Init Loaded Successfully!');