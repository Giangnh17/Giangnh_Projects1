// ========================================
// UTILITY FUNCTIONS
// ========================================

const Utils = {
  // Format date to readable string
  formatDate(dateString) {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  },

  // Format date to simple date string
  formatDateSimple(dateString) {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).format(date);
  },

  // Format number with thousand separators
  formatNumber(number) {
    if (number === null || number === undefined) return '0';
    return new Intl.NumberFormat('vi-VN').format(number);
  },

  // Debounce function
  debounce(func, wait = 300) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Throttle function
  throttle(func, limit = 300) {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },

  // Get initials from name
  getInitials(name) {
    if (!name) return '?';
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  },

  // Truncate text
  truncate(text, length = 50) {
    if (!text) return '';
    if (text.length <= length) return text;
    return text.slice(0, length) + '...';
  },

  // Escape HTML to prevent XSS
  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  },

  // Parse query string
  parseQueryString(queryString) {
    const params = {};
    const searchParams = new URLSearchParams(queryString);
    for (const [key, value] of searchParams) {
      params[key] = value;
    }
    return params;
  },

  // Build query string
  buildQueryString(params) {
    return Object.keys(params)
      .filter(key => params[key] !== null && params[key] !== undefined)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
      .join('&');
  },

  // Copy to clipboard
  async copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
      Toast.success('Đã sao chép vào clipboard');
      return true;
    } catch (err) {
      console.error('Failed to copy:', err);
      Toast.error('Không thể sao chép');
      return false;
    }
  },

  // Download file
  downloadFile(content, filename, mimeType = 'text/plain') {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  },

  // Generate random ID
  generateId() {
    return `id-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  },

  // Validate email
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  // Validate ISBN
  isValidISBN(isbn) {
    const isbnRegex = /^(?:ISBN(?:-1[03])?:? )?(?=[0-9X]{10}$|(?=(?:[0-9]+[- ]){3})[- 0-9X]{13}$|97[89][0-9]{10}$|(?=(?:[0-9]+[- ]){4})[- 0-9]{17}$)(?:97[89][- ]?)?[0-9]{1,5}[- ]?[0-9]+[- ]?[0-9]+[- ]?[0-9X]$/;
    return isbnRegex.test(isbn.replace(/[- ]/g, ''));
  },

  // Get random color
  getRandomColor() {
    const colors = [
      '#8b4513', '#2c5f2d', '#d4af37', '#3498db', 
      '#e74c3c', '#9b59b6', '#1abc9c', '#f39c12'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  },

  // Sleep function
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
};

// ========================================
// TOAST NOTIFICATIONS
// ========================================

const Toast = {
  container: null,

  init() {
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.id = 'toast-container';
      this.container.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
        display: flex;
        flex-direction: column;
        gap: 10px;
      `;
      document.body.appendChild(this.container);
    }
  },

  show(message, type = 'info', duration = 3000) {
    this.init();

    const toast = document.createElement('div');
    toast.className = 'toast';
    
    const icons = {
      success: '✓',
      error: '✕',
      warning: '⚠',
      info: 'ℹ'
    };

    const colors = {
      success: '#2c5f2d',
      error: '#c0392b',
      warning: '#ffc107',
      info: '#3498db'
    };

    toast.innerHTML = `
      <div class="toast-header">
        <span class="toast-icon" style="color: ${colors[type]}; font-size: 1.25rem; font-weight: bold;">
          ${icons[type] || icons.info}
        </span>
        <span class="toast-title" style="flex: 1; margin-left: 10px;">${message}</span>
        <button class="toast-close" onclick="this.closest('.toast').remove()">&times;</button>
      </div>
    `;

    toast.style.cssText = `
      min-width: 300px;
      max-width: 400px;
      background: white;
      border: 1px solid ${colors[type]};
      border-left: 4px solid ${colors[type]};
      border-radius: 8px;
      padding: 15px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      animation: slideInRight 0.3s ease-out;
    `;

    this.container.appendChild(toast);

    if (duration > 0) {
      setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => toast.remove(), 300);
      }, duration);
    }
  },

  success(message, duration) {
    this.show(message, 'success', duration);
  },

  error(message, duration) {
    this.show(message, 'error', duration);
  },

  warning(message, duration) {
    this.show(message, 'warning', duration);
  },

  info(message, duration) {
    this.show(message, 'info', duration);
  }
};

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  @keyframes slideOutRight {
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

// ========================================
// MODAL UTILITIES
// ========================================

const Modal = {
  show(modalId) {
    const modal = document.getElementById(modalId);
    const backdrop = document.getElementById(`${modalId}-backdrop`);
    
    if (modal) {
      modal.classList.add('active');
      if (backdrop) backdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  },

  hide(modalId) {
    const modal = document.getElementById(modalId);
    const backdrop = document.getElementById(`${modalId}-backdrop`);
    
    if (modal) {
      modal.classList.remove('active');
      if (backdrop) backdrop.classList.remove('active');
      document.body.style.overflow = '';
    }
  },

  confirm(title, message, onConfirm) {
    const modalId = 'confirm-modal';
    let modal = document.getElementById(modalId);
    
    if (!modal) {
      // Create confirm modal
      const backdrop = document.createElement('div');
      backdrop.id = `${modalId}-backdrop`;
      backdrop.className = 'modal-backdrop';
      backdrop.onclick = () => this.hide(modalId);
      
      modal = document.createElement('div');
      modal.id = modalId;
      modal.className = 'modal';
      modal.innerHTML = `
        <div class="modal-header">
          <h3 class="modal-title" id="${modalId}-title">${title}</h3>
          <button class="modal-close" onclick="Modal.hide('${modalId}')">&times;</button>
        </div>
        <div class="modal-body">
          <p id="${modalId}-message">${message}</p>
        </div>
        <div class="modal-footer">
          <button class="btn btn-outline" onclick="Modal.hide('${modalId}')">Hủy</button>
          <button class="btn btn-danger" id="${modalId}-confirm">Xác nhận</button>
        </div>
      `;
      
      document.body.appendChild(backdrop);
      document.body.appendChild(modal);
      
      document.getElementById(`${modalId}-confirm`).onclick = () => {
        this.hide(modalId);
        if (onConfirm) onConfirm();
      };
    } else {
      document.getElementById(`${modalId}-title`).textContent = title;
      document.getElementById(`${modalId}-message`).textContent = message;
      document.getElementById(`${modalId}-confirm`).onclick = () => {
        this.hide(modalId);
        if (onConfirm) onConfirm();
      };
    }
    
    this.show(modalId);
  }
};

// ========================================
// LOADING UTILITIES
// ========================================

const Loading = {
  overlay: null,

  init() {
    if (!this.overlay) {
      this.overlay = document.createElement('div');
      this.overlay.className = 'loading-overlay';
      this.overlay.innerHTML = '<div class="spinner spinner-lg"></div>';
      document.body.appendChild(this.overlay);
    }
  },

  show() {
    this.init();
    this.overlay.classList.add('active');
  },

  hide() {
    if (this.overlay) {
      this.overlay.classList.remove('active');
    }
  }
};

// ========================================
// FORM VALIDATION
// ========================================

const Validator = {
  // UI helpers for showing/hiding errors
  showError(input, message) {
    input.classList.add('is-invalid');
    
    // Remove existing error
    const existingError = input.parentElement.querySelector('.form-error');
    if (existingError) existingError.remove();
    
    // Add new error
    const error = document.createElement('span');
    error.className = 'form-error';
    error.textContent = message;
    input.parentElement.appendChild(error);
  },

  clearError(input) {
    input.classList.remove('is-invalid');
    const error = input.parentElement.querySelector('.form-error');
    if (error) error.remove();
  },

  clearAllErrors(form) {
    const inputs = form.querySelectorAll('.is-invalid');
    inputs.forEach(input => this.clearError(input));
  },

  // Basic UI validations - help users before submitting
  
  validateRequired(input, fieldName = 'Trường này') {
    const value = input.value.trim();
    if (!value) {
      this.showError(input, `${fieldName} không được để trống`);
      return false;
    }
    this.clearError(input);
    return true;
  },

  validateEmail(input) {
    const value = input.value.trim();
    if (!value) {
      this.showError(input, 'Email không được để trống');
      return false;
    }
    if (!Utils.isValidEmail(value)) {
      this.showError(input, 'Email không hợp lệ');
      return false;
    }
    this.clearError(input);
    return true;
  },

  validateMinLength(input, minLength, fieldName = 'Trường này') {
    const value = input.value.trim();
    if (value.length < minLength) {
      this.showError(input, `${fieldName} phải có ít nhất ${minLength} ký tự`);
      return false;
    }
    this.clearError(input);
    return true;
  },

  validateMatch(input1, input2, fieldName = 'Mật khẩu') {
    if (input1.value !== input2.value) {
      this.showError(input2, `${fieldName} không khớp`);
      return false;
    }
    this.clearError(input2);
    return true;
  },

  validateNumber(input, fieldName = 'Trường này') {
    const value = input.value.trim();
    if (!value) {
      this.showError(input, `${fieldName} không được để trống`);
      return false;
    }
    if (isNaN(value) || Number(value) < 0) {
      this.showError(input, `${fieldName} phải là số dương`);
      return false;
    }
    this.clearError(input);
    return true;
  }
};

// ========================================
// LOCAL STORAGE HELPERS
// ========================================

const Storage = {
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('Error saving to localStorage:', error);
      return false;
    }
  },

  get(key) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return null;
    }
  },

  remove(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Error removing from localStorage:', error);
      return false;
    }
  },

  clear() {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing localStorage:', error);
      return false;
    }
  }
};

// Export for use in other files
window.Utils = Utils;
window.Toast = Toast;
window.Modal = Modal;
window.Loading = Loading;
window.Validator = Validator;
window.Storage = Storage;
