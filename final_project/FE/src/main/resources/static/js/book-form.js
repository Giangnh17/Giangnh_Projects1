// ============================================
// HỆ THỐNG QUẢN LÝ THƯ VIỆN - FORM SÁCH
// LIBRARY MANAGEMENT SYSTEM - BOOK FORM
// ============================================

function initializeBookForm() {
  console.log('📝 Initializing Book Form...');
  
  // Update user info in navbar
  updateUserInfo();
  
  // Initialize dynamic sidebar
  renderSidebar();
  
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

async function populateFormForEdit(bookId) {
  try {
    const result = await getBookById(bookId);
    
    if (result.success && result.data) {
      const book = result.data;
      
      // Populate form fields
      document.getElementById('bookTitleInput').value = book.title || '';
      document.getElementById('bookAuthorInput').value = book.author || '';
      document.getElementById('bookISBNInput').value = book.isbn || '';
      document.getElementById('bookCategoryInput').value = book.category || '';
      document.getElementById('bookPublisherInput').value = book.publisher || '';
      document.getElementById('bookStatusSelect').value = book.status || 'available';
      document.getElementById('bookDescriptionInput').value = book.description || '';
      
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
    } else {
      showError(result.error || 'Book not found');
      // Fallback to mock data
      const book = BOOKS_DATA.find(b => b.id === bookId);
      if (book) {
        // Use mock data if API fails
        fillFormWithBook(book);
      }
    }
  } catch (error) {
    console.error('Error loading book data:', error);
    showError('Error loading book data. Please try again.');
    
    // Fallback to mock data
    const book = BOOKS_DATA.find(b => b.id === bookId);
    if (book) {
      fillFormWithBook(book);
    }
  }
}

function fillFormWithBook(book) {
  document.getElementById('bookTitleInput').value = book.title || '';
  document.getElementById('bookAuthorInput').value = book.author || '';
  document.getElementById('bookISBNInput').value = book.isbn || '';
  document.getElementById('bookCategoryInput').value = book.category || '';
  document.getElementById('bookPublisherInput').value = book.publisher || '';
  document.getElementById('bookStatusSelect').value = book.status || 'available';
  document.getElementById('bookDescriptionInput').value = book.description || '';
  
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
  document.getElementById('bookForm').dataset.editId = book.id;
}

function handleBookFormSubmit(event) {
  event.preventDefault();
  
  // Get form data using correct field names from HTML template
  const bookData = {
    title: document.getElementById('bookTitleInput').value.trim(),
    author: document.getElementById('bookAuthorInput').value.trim(), 
    isbn: document.getElementById('bookISBNInput').value.trim(),
    category: document.getElementById('bookCategoryInput').value,
    publisher: document.getElementById('bookPublisherInput').value.trim() || 'Unknown Publisher',
    description: document.getElementById('bookDescriptionInput').value.trim() || 'No description available',
    status: document.getElementById('bookStatusSelect').value
  };
  
  // Validate required fields
  if (!validateBookForm(bookData)) {
    return;
  }
  
  const editId = event.target.dataset.editId;
  
  if (editId) {
    // Update existing book
    updateBookRecord(parseInt(editId), bookData);
  } else {
    // Create new book
    createBookRecord(bookData);
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

async function createBookRecord(bookData) {
  try {
    const result = await createBook(bookData);
    
    if (result.success) {
      showSuccess('Book created successfully!');
      
      // Get the created book ID from response
      const newBookId = result.data?.id || result.data;
      
      setTimeout(() => {
        if (newBookId) {
          window.location.href = `/src/main/resources/templates/book-detail.html?id=${newBookId}`;
        } else {
          window.location.href = '/src/main/resources/templates/index.html';
        }
      }, 1500);
    } else {
      showError(result.error || 'Failed to create book');
    }
  } catch (error) {
    console.error('Create book error:', error);
    showError('An error occurred while creating the book. Please try again.');
  }
}

async function updateBookRecord(bookId, bookData) {
  try {
    const result = await updateBook(bookId, bookData);
    
    if (result.success) {
      showSuccess('Book updated successfully!');
      setTimeout(() => {
        window.location.href = `/src/main/resources/templates/book-detail.html?id=${bookId}`;
      }, 1500);
    } else {
      showError(result.error || 'Failed to update book');
    }
  } catch (error) {
    console.error('Update book error:', error);
    showError('An error occurred while updating the book. Please try again.');
  }
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