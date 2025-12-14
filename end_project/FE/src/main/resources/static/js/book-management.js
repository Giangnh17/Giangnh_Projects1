// ============================================
// HỆ THỐNG QUẢN LÝ THƯ VIỆN - BOOK MANAGEMENT
// LIBRARY MANAGEMENT SYSTEM - BOOK MANAGEMENT
// ============================================

// Initialize book management functionality
function initializeBookManagement() {
    console.log('Initializing Book Management');
    
    // Check authentication
    if (!apiService.isAuthenticated()) {
        window.location.href = '/src/main/resources/templates/auth-login.html';
        return;
    }
    
    // Initialize role-based UI
    initializeRoleBasedUI();
    
    // Load books on page load
    loadBooks();
    
    // Initialize form if present
    const bookForm = document.getElementById('bookForm');
    if (bookForm) {
        bookForm.addEventListener('submit', handleBookSubmit);
        
        // Load book data if editing
        const urlParams = new URLSearchParams(window.location.search);
        const bookId = urlParams.get('id');
        if (bookId) {
            loadBookForEdit(bookId);
        }
    }
    
    // Initialize search functionality
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(handleSearch, 300));
    }
    
    // Initialize filter functionality
    const categoryFilter = document.getElementById('categoryFilter');
    const statusFilter = document.getElementById('statusFilter');
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', handleFilter);
    }
    
    if (statusFilter) {
        statusFilter.addEventListener('change', handleFilter);
    }
}

// Load all books
async function loadBooks() {
    try {
        const books = await apiService.getAllBooks();
        if (Array.isArray(books)) {
            displayBooks(books);
            updateBookStats(books);
        }
    } catch (error) {
        console.error('Error loading books:', error);
        showError('Có lỗi xảy ra khi tải danh sách sách');
    }
}

// Display books in the UI
function displayBooks(books) {
    const booksContainer = document.getElementById('booksContainer');
    const booksList = document.getElementById('booksList');
    const tableBody = document.querySelector('#booksTable tbody');
    
    if (booksContainer) {
        // Grid view
        booksContainer.innerHTML = '';
        books.forEach(book => {
            const bookCard = createBookCard(book);
            booksContainer.appendChild(bookCard);
        });
    }
    
    if (booksList) {
        // List view
        booksList.innerHTML = '';
        books.forEach(book => {
            const listItem = createBookListItem(book);
            booksList.appendChild(listItem);
        });
    }
    
    if (tableBody) {
        // Table view
        tableBody.innerHTML = '';
        books.forEach(book => {
            const row = createBookTableRow(book);
            tableBody.appendChild(row);
        });
    }
}

// Create book card element
function createBookCard(book) {
    const card = document.createElement('div');
    card.className = 'book-card card';
    card.innerHTML = `
        <div class="book-header">
            <h3 class="book-title">${book.title}</h3>
            <span class="book-status status-${book.status.toLowerCase()}">${getStatusText(book.status)}</span>
        </div>
        <div class="book-info">
            <p class="book-author"><strong>Tác giả:</strong> ${book.author}</p>
            <p class="book-category"><strong>Thể loại:</strong> ${book.category}</p>
            <p class="book-id"><strong>ID:</strong> #${book.id}</p>
        </div>
        <div class="book-actions">
            <button class="btn btn-sm btn-outline" onclick="viewBook(${book.id})">Xem</button>
            ${hasRole('LIBRARIAN') || hasRole('ADMIN') ? `
                <button class="btn btn-sm btn-outline" onclick="editBook(${book.id})">Sửa</button>
            ` : ''}
            ${hasRole('ADMIN') ? `
                <button class="btn btn-sm btn-danger" onclick="deleteBook(${book.id})">Xóa</button>
            ` : ''}
        </div>
    `;
    return card;
}

// Create book list item
function createBookListItem(book) {
    const item = document.createElement('div');
    item.className = 'book-item';
    item.innerHTML = `
        <div class="book-item-content">
            <div class="book-main-info">
                <h4 class="book-title">${book.title}</h4>
                <p class="book-author">của ${book.author}</p>
            </div>
            <div class="book-meta">
                <span class="book-category">${book.category}</span>
                <span class="book-status status-${book.status.toLowerCase()}">${getStatusText(book.status)}</span>
            </div>
            <div class="book-actions">
                <button class="btn btn-sm" onclick="viewBook(${book.id})">Xem chi tiết</button>
            </div>
        </div>
    `;
    return item;
}

// Create book table row
function createBookTableRow(book) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>#${book.id}</td>
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.category}</td>
        <td><span class="status-badge status-${book.status.toLowerCase()}">${getStatusText(book.status)}</span></td>
        <td>
            <div class="action-buttons">
                <button class="btn btn-sm btn-outline" onclick="viewBook(${book.id})">Xem</button>
                ${hasRole('LIBRARIAN') || hasRole('ADMIN') ? `
                    <button class="btn btn-sm btn-outline" onclick="editBook(${book.id})">Sửa</button>
                ` : ''}
                ${hasRole('ADMIN') ? `
                    <button class="btn btn-sm btn-danger" onclick="deleteBook(${book.id})">Xóa</button>
                ` : ''}
            </div>
        </td>
    `;
    return row;
}

// Handle book form submission
async function handleBookSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const bookData = {
        title: formData.get('title'),
        author: formData.get('author'),
        category: formData.get('category'),
        status: formData.get('status') || 'AVAILABLE'
    };
    
    const submitButton = event.target.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.innerHTML;
    
    // Clear previous messages
    const errorDiv = document.getElementById('errorMessage');
    const successDiv = document.getElementById('successMessage');
    if (errorDiv) errorDiv.style.display = 'none';
    if (successDiv) successDiv.style.display = 'none';
    
    // Validation
    if (!bookData.title || !bookData.author || !bookData.category) {
        showError('Vui lòng điền đầy đủ thông tin sách');
        return;
    }
    
    try {
        showLoading(submitButton);
        
        const bookId = document.getElementById('bookId')?.value;
        let response;
        
        if (bookId) {
            // Update existing book
            response = await apiService.updateBook(bookId, bookData);
        } else {
            // Create new book
            response = await apiService.createBook(bookData);
        }
        
        if (response && response.id) {
            const action = bookId ? 'cập nhật' : 'thêm';
            showSuccess(`${action} sách thành công!`);
            
            setTimeout(() => {
                window.location.href = '/src/main/resources/templates/index.html';
            }, 1500);
        } else {
            showError(`Có lỗi xảy ra khi ${bookId ? 'cập nhật' : 'thêm'} sách`);
        }
    } catch (error) {
        console.error('Book submission error:', error);
        showError('Có lỗi xảy ra. Vui lòng thử lại.');
    } finally {
        hideLoading(submitButton, originalButtonText);
    }
}

// Load book for editing
async function loadBookForEdit(bookId) {
    try {
        const book = await apiService.getBookById(bookId);
        if (book) {
            // Fill form with book data
            document.getElementById('bookId').value = book.id;
            document.getElementById('title').value = book.title;
            document.getElementById('author').value = book.author;
            document.getElementById('category').value = book.category;
            document.getElementById('status').value = book.status;
            
            // Update form title
            const formTitle = document.querySelector('.form-title');
            if (formTitle) {
                formTitle.textContent = 'Cập nhật thông tin sách';
            }
            
            const submitButton = document.querySelector('button[type="submit"]');
            if (submitButton) {
                submitButton.textContent = 'Cập nhật sách';
            }
        }
    } catch (error) {
        console.error('Error loading book for edit:', error);
        showError('Không thể tải thông tin sách');
    }
}

// View book details
function viewBook(bookId) {
    window.location.href = `/src/main/resources/templates/book-detail.html?id=${bookId}`;
}

// Edit book
function editBook(bookId) {
    window.location.href = `/src/main/resources/templates/book-form.html?id=${bookId}`;
}

// Delete book
async function deleteBook(bookId) {
    if (!hasRole('ADMIN')) {
        showError('Bạn không có quyền xóa sách');
        return;
    }
    
    if (!confirm('Bạn có chắc chắn muốn xóa cuốn sách này?')) {
        return;
    }
    
    try {
        const response = await apiService.deleteBook(bookId);
        if (response) {
            showSuccess('Xóa sách thành công');
            await loadBooks(); // Refresh the list
        }
    } catch (error) {
        console.error('Delete book error:', error);
        showError('Có lỗi xảy ra khi xóa sách');
    }
}

// Handle search
function handleSearch(event) {
    const query = event.target.value.toLowerCase();
    const bookCards = document.querySelectorAll('.book-card, .book-item, #booksTable tbody tr');
    
    bookCards.forEach(card => {
        const title = card.querySelector('.book-title')?.textContent.toLowerCase() || '';
        const author = card.querySelector('.book-author')?.textContent.toLowerCase() || '';
        const category = card.querySelector('.book-category')?.textContent.toLowerCase() || '';
        
        if (title.includes(query) || author.includes(query) || category.includes(query)) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
}

// Handle filter
function handleFilter() {
    const categoryFilter = document.getElementById('categoryFilter')?.value;
    const statusFilter = document.getElementById('statusFilter')?.value;
    const bookCards = document.querySelectorAll('.book-card, .book-item, #booksTable tbody tr');
    
    bookCards.forEach(card => {
        let show = true;
        
        if (categoryFilter && categoryFilter !== 'all') {
            const cardCategory = card.querySelector('.book-category')?.textContent || '';
            if (!cardCategory.includes(categoryFilter)) {
                show = false;
            }
        }
        
        if (statusFilter && statusFilter !== 'all') {
            const cardStatus = card.querySelector('.book-status')?.className || '';
            if (!cardStatus.includes(statusFilter.toLowerCase())) {
                show = false;
            }
        }
        
        card.style.display = show ? '' : 'none';
    });
}

// Update book statistics
function updateBookStats(books) {
    const totalBooks = books.length;
    const availableBooks = books.filter(book => book.status === 'AVAILABLE').length;
    const borrowedBooks = books.filter(book => book.status === 'BORROWED').length;
    const maintenanceBooks = books.filter(book => book.status === 'MAINTENANCE').length;
    
    // Update stats if elements exist
    const totalElement = document.getElementById('totalBooks');
    const availableElement = document.getElementById('availableBooks');
    const borrowedElement = document.getElementById('borrowedBooks');
    const maintenanceElement = document.getElementById('maintenanceBooks');
    
    if (totalElement) totalElement.textContent = totalBooks;
    if (availableElement) availableElement.textContent = availableBooks;
    if (borrowedElement) borrowedElement.textContent = borrowedBooks;
    if (maintenanceElement) maintenanceElement.textContent = maintenanceBooks;
}

// Utility function to get status text in Vietnamese
function getStatusText(status) {
    const statusMap = {
        'AVAILABLE': 'Có sẵn',
        'BORROWED': 'Đã mượn',
        'MAINTENANCE': 'Bảo trì',
        'RESERVED': 'Đã đặt trước'
    };
    return statusMap[status] || status;
}

// Cancel book form
function cancelBookForm() {
    if (confirm('Bạn có chắc chắn muốn hủy? Mọi thay đổi sẽ bị mất.')) {
        window.location.href = '/src/main/resources/templates/index.html';
    }
}