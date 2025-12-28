// ========================================
// BOOKS PAGE
// Handle books management (CRUD operations)
// ========================================

// Protect page - require authentication
if (!protectPage()) {
  throw new Error('Unauthorized');
}

// State
let allBooks = []; 
let currentEditingBook = null;

// Pagination & Filter state
let currentPage = 0;
let pageSize = 10;
let pageData = null;
let currentSearch = '';
let currentSortBy = 'title';
let currentSortDirection = 'ASC';

// Initialize page
async function initBooks() {
  try {
    // Insert sidebar and header
    const sidebarHTML = Components.getSidebarHTML();
    const headerHTML = Components.getHeaderHTML('Quản Lý Sách', [
      { text: 'Trang chủ', href: '/dashboard.html' },
      { text: 'Quản lý sách' }
    ]);

    document.querySelector('.layout').insertAdjacentHTML('afterbegin', sidebarHTML);
    document.getElementById('layoutContent').insertAdjacentHTML('afterbegin', headerHTML);

    // Initialize components
    Components.initSidebar();
    Components.initHeader();
    Auth.init();
    Auth.setupLogoutButtons();

    // Setup event listeners
    setupEventListeners();

    // Load books
    await loadBooks();

  } catch (error) {
    console.error('Books init error:', error);
    Toast.error('Không thể tải dữ liệu');
  }
}

// Setup event listeners
function setupEventListeners() {
  // Search - call backend API with search param
  const searchInput = document.getElementById('searchInput');
  searchInput.addEventListener('input', Utils.debounce(() => {
    currentSearch = searchInput.value.trim();
    currentPage = 0; // Reset to first page when searching
    loadBooks();
  }, 500)); // Increased debounce to reduce API calls

  // Sort - call backend API with sortBy param
  const sortBySelect = document.getElementById('sortBy');
  sortBySelect.addEventListener('change', () => {
    currentSortBy = sortBySelect.value;
    currentPage = 0; // Reset to first page when sorting
    loadBooks();
  });
}

// Load books from API with search/sort/pagination
async function loadBooks() {
  try {
    Loading.show();
    
    // Call backend API with all params
    const response = await BooksAPI.getAllWithParams({
      page: currentPage,
      size: pageSize,
      sortBy: currentSortBy,
      sortDirection: currentSortDirection,
      search: currentSearch
    });
    
    // Store page data
    pageData = response;
    currentPage = response.pageNumber;
    pageSize = response.pageSize;
    
    // Extract books from content
    allBooks = response.content || [];
    
    // Render books and pagination
    renderBooks();
    renderPagination();
    
    Loading.hide();
  } catch (error) {
    Loading.hide();
    console.error('Load books error:', error);
    Toast.error(error.message);
  }
}



// Render books table
// Data is already filtered/sorted by backend, just display it
function renderBooks() {
  const container = document.getElementById('booksTable');

  if (allBooks.length === 0) {
    container.innerHTML = Components.getEmptyStateHTML({
      icon: 'fas fa-book',
      title: 'Không tìm thấy sách',
      message: currentSearch ? 'Không có sách nào phù hợp với từ khóa tìm kiếm' : 'Chưa có sách nào trong hệ thống'
    });
    return;
  }

  const canEdit = Auth.hasRole('LIBRARIAN');

  const tableHTML = `
    <div class="table-container table-responsive">
      <table class="table">
        <thead>
          <tr>
            <th>Tên sách</th>
            <th>Tác giả</th>
            <th>Thể loại</th>
            <th>Trạng thái</th>
            ${canEdit ? '<th style="width: 150px;">Thao tác</th>' : ''}
          </tr>
        </thead>
        <tbody>
          ${allBooks.map(book => `
            <tr>
              <td>
                <strong>${Utils.escapeHtml(book.title)}</strong>
              </td>
              <td>${Utils.escapeHtml(book.author)}</td>
              <td><span class="badge badge-primary">${Utils.escapeHtml(book.category)}</span></td>
              <td>
                ${getStatusBadge(book.status)}
              </td>
              ${canEdit ? `
                <td>
                  <div class="table-actions">
                    <button class="btn btn-sm btn-primary" onclick="editBook(${book.id})" title="Sửa">
                      <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="deleteBook(${book.id})" title="Xóa">
                      <i class="fas fa-trash"></i>
                    </button>
                  </div>
                </td>
              ` : ''}
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;

  container.innerHTML = tableHTML;
}

// Render pagination
function renderPagination() {
  if (!pageData) return;
  
  const container = document.getElementById('booksTable');
  const paginationHTML = Components.getPaginationHTML(pageData);
  
  // Append pagination after table
  container.insertAdjacentHTML('beforeend', paginationHTML);
  
  // Setup pagination event listeners
  setupPaginationListeners();
}

// Setup pagination event listeners
function setupPaginationListeners() {
  // Page buttons - call backend API with page number
  document.querySelectorAll('.pagination-controls button[data-page]').forEach(btn => {
    btn.addEventListener('click', () => {
      const page = parseInt(btn.getAttribute('data-page'));
      if (page >= 0 && page < pageData.totalPages) {
        currentPage = page;
        loadBooks(); // Reload with new page
      }
    });
  });
  
  // Page size selector - call backend API with new page size
  const sizeSelector = document.getElementById('pageSizeSelector');
  if (sizeSelector) {
    sizeSelector.addEventListener('change', () => {
      pageSize = parseInt(sizeSelector.value);
      currentPage = 0; // Reset to first page
      loadBooks(); // Reload with new page size
    });
  }
}

// Get status badge HTML
function getStatusBadge(status) {
  const statusMap = {
    'AVAILABLE': { label: 'Có sẵn', class: 'success' },
    'BORROWED': { label: 'Đang mượn', class: 'warning' },
    'UNAVAILABLE': { label: 'Không có sẵn', class: 'danger' }
  };
  
  const statusInfo = statusMap[status] || { label: status, class: 'info' };
  return `<span class="badge badge-${statusInfo.class}">${statusInfo.label}</span>`;
}

// Open book modal (for create)
function openBookModal() {
  if (!Auth.hasRole('LIBRARIAN')) {
    Toast.error('Bạn không có quyền thêm sách');
    return;
  }

  currentEditingBook = null;
  document.getElementById('modalTitle').textContent = 'Thêm sách mới';
  document.getElementById('bookForm').reset();
  document.getElementById('bookId').value = '';
  Modal.show('bookModal');
}

// Close book modal
function closeBookModal() {
  Modal.hide('bookModal');
  currentEditingBook = null;
  Validator.clearAllErrors(document.getElementById('bookForm'));
}

// Edit book
function editBook(id) {
  if (!Auth.hasRole('LIBRARIAN')) {
    Toast.error('Bạn không có quyền sửa sách');
    return;
  }

  const book = allBooks.find(b => b.id === id);
  if (!book) return;

  currentEditingBook = book;
  document.getElementById('modalTitle').textContent = 'Chỉnh sửa sách';
  
  // Fill form
  document.getElementById('bookId').value = book.id;
  document.getElementById('title').value = book.title;
  document.getElementById('author').value = book.author;
  document.getElementById('category').value = book.category;
  document.getElementById('status').value = book.status;

  Modal.show('bookModal');
}

// Save book (create or update)
async function saveBook() {
  const form = document.getElementById('bookForm');
  Validator.clearAllErrors(form);

  // Validate
  let isValid = true;
  if (!Validator.validateRequired(document.getElementById('title'), 'Tên sách')) isValid = false;
  if (!Validator.validateRequired(document.getElementById('author'), 'Tác giả')) isValid = false;
  if (!Validator.validateRequired(document.getElementById('category'), 'Thể loại')) isValid = false;
  if (!Validator.validateRequired(document.getElementById('status'), 'Trạng thái')) isValid = false;

  if (!isValid) return;

  // Get form data
  const bookData = {
    title: document.getElementById('title').value.trim(),
    author: document.getElementById('author').value.trim(),
    category: document.getElementById('category').value.trim(),
    status: document.getElementById('status').value
  };

  try {
    Loading.show();

    if (currentEditingBook) {
      // Update
      await BooksAPI.update(currentEditingBook.id, bookData);
      Toast.success('Cập nhật sách thành công!');
    } else {
      // Create
      await BooksAPI.create(bookData);
      Toast.success('Thêm sách mới thành công!');
    }

    closeBookModal();
    await loadBooks();

    Loading.hide();
  } catch (error) {
    Loading.hide();
    console.error('Save book error:', error);
    Toast.error(error.message);
  }
}

// Delete book
function deleteBook(id) {
  if (!Auth.hasRole('LIBRARIAN')) {
    Toast.error('Bạn không có quyền xóa sách');
    return;
  }

  const book = allBooks.find(b => b.id === id);
  if (!book) return;

  Modal.confirm(
    'Xác nhận xóa',
    `Bạn có chắc chắn muốn xóa sách "${book.title}"?`,
    async () => {
      try {
        Loading.show();
        await BooksAPI.delete(id);
        Toast.success('Xóa sách thành công!');
        await loadBooks();
        Loading.hide();
      } catch (error) {
        Loading.hide();
        console.error('Delete book error:', error);
        Toast.error(error.message);
      }
    }
  );
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initBooks);
