// ============================================
// HỆ THỐNG QUẢN LÝ THƯ VIỆN - FORM SÁCH
// LIBRARY MANAGEMENT SYSTEM - BOOK FORM
// ============================================

function initializeBookForm() {
  console.log('Initializing Book Form');
  
  // Check if we're editing an existing book
  const urlParams = new URLSearchParams(window.location.search);
  const editId = urlParams.get('edit');
  
  if (editId) {
    populateFormForEdit(parseInt(editId));
  }
  
  // Set up form submission
  const bookForm = document.getElementById('bookForm');
  if (bookForm) {
    bookForm.addEventListener('submit', handleBookFormSubmit);
  }
  
  // Set up cancel buttons
  setupCancelButtons();
  
  // Set up form validation
  setupFormValidation();
}

function populateFormForEdit(bookId) {
  const book = BOOKS_DATA.find(b => b.id === bookId);
  if (!book) {
    showError('Book not found');
    return;
  }
  
  // Populate form fields
  document.getElementById('title').value = book.title;
  document.getElementById('author').value = book.author;
  document.getElementById('isbn').value = book.isbn;
  document.getElementById('category').value = book.category;
  document.getElementById('publisher').value = book.publisher;
  document.getElementById('status').value = book.status;
  document.getElementById('description').value = book.description;
  
  // Update form title and submit button
  const formTitle = document.querySelector('.card-title');
  if (formTitle) {
    formTitle.textContent = 'Edit Book Information';
  }
  
  const submitBtn = document.querySelector('button[type="submit"]');
  if (submitBtn) {
    submitBtn.innerHTML = 'Update Record';
  }
  
  // Store the book ID for updating
  document.getElementById('bookForm').dataset.editId = bookId;
}

function handleBookFormSubmit(event) {
  event.preventDefault();
  
  // Get form data
  const formData = new FormData(event.target);
  const bookData = {};
  
  formData.forEach((value, key) => {
    bookData[key] = value;
  });
  
  // Validate required fields
  if (!validateBookForm(bookData)) {
    return;
  }
  
  const editId = event.target.dataset.editId;
  
  if (editId) {
    // Update existing book
    updateBook(parseInt(editId), bookData);
  } else {
    // Create new book
    createBook(bookData);
  }
}

function validateBookForm(bookData) {
  clearAllErrors();
  
  let isValid = true;
  
  // Required field validation
  const requiredFields = ['title', 'author', 'isbn', 'category', 'publisher'];
  
  requiredFields.forEach(field => {
    if (!bookData[field] || bookData[field].trim() === '') {
      showFieldError(field, `${field.charAt(0).toUpperCase() + field.slice(1)} is required`);
      isValid = false;
    }
  });
  
  // ISBN format validation (basic)
  if (bookData.isbn && !/^\d{3}-\d{1}-\d{3}-\d{5}-\d{1}$/.test(bookData.isbn)) {
    showFieldError('isbn', 'ISBN must be in format: 978-0-123-45678-9');
    isValid = false;
  }
  
  return isValid;
}

function createBook(bookData) {
  // Generate new ID
  const newId = Math.max(...BOOKS_DATA.map(b => b.id)) + 1;
  
  // Create new book object
  const newBook = {
    id: newId,
    ...bookData,
    borrowHistory: []
  };
  
  // Add to books array
  BOOKS_DATA.push(newBook);
  
  showSuccess('Book created successfully!');
  setTimeout(() => {
    window.location.href = `/src/main/resources/templates/book-detail.html?id=${newId}`;
  }, 1500);
}

function updateBook(bookId, bookData) {
  const bookIndex = BOOKS_DATA.findIndex(b => b.id === bookId);
  
  if (bookIndex === -1) {
    showError('Book not found');
    return;
  }
  
  // Update book data (preserve ID and borrow history)
  BOOKS_DATA[bookIndex] = {
    ...BOOKS_DATA[bookIndex],
    ...bookData
  };
  
  showSuccess('Book updated successfully!');
  setTimeout(() => {
    window.location.href = `/src/main/resources/templates/book-detail.html?id=${bookId}`;
  }, 1500);
}

function setupCancelButtons() {
  const cancelButtons = document.querySelectorAll('#cancelBtn, #cancelFormBtn');
  
  cancelButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      if (confirm('Are you sure you want to cancel? Any unsaved changes will be lost.')) {
        window.location.href = '/src/main/resources/templates/index.html';
      }
    });
  });
}

function setupFormValidation() {
  // Real-time validation
  const form = document.getElementById('bookForm');
  if (!form) return;
  
  const inputs = form.querySelectorAll('input, textarea, select');
  
  inputs.forEach(input => {
    input.addEventListener('blur', function() {
      validateField(this);
    });
    
    input.addEventListener('input', function() {
      clearFieldError(this.name || this.id);
    });
  });
}

function validateField(field) {
  const fieldName = field.name || field.id;
  const value = field.value.trim();
  
  // Clear previous error
  clearFieldError(fieldName);
  
  // Required field check
  if (field.hasAttribute('required') && !value) {
    showFieldError(fieldName, `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`);
    return false;
  }
  
  // ISBN specific validation
  if (fieldName === 'isbn' && value && !/^\d{3}-\d{1}-\d{3}-\d{5}-\d{1}$/.test(value)) {
    showFieldError(fieldName, 'ISBN must be in format: 978-0-123-45678-9');
    return false;
  }
  
  return true;
}

// Navigation functions for sidebar
function showReports() {
  showInfo('Tính năng báo cáo đang được phát triển');
}

function showSettings() {
  showInfo('Tính năng cài đặt đang được phát triển');
}