// ============================================
// HỆ THỐNG QUẢN LÝ THƯ VIỆN - DASHBOARD
// LIBRARY MANAGEMENT SYSTEM - DASHBOARD
// ============================================

async function initializeDashboard() {
  console.log('📚 Initializing Dashboard...');
  
  // Check authentication
  if (!isAuthenticated()) {
    window.location.href = '/src/main/resources/templates/auth-login.html';
    return;
  }
  
  // Initialize dynamic sidebar if exists
  renderSidebar();
  
  // Load books from API
  await loadBooksFromAPI();
  
  // Render the books table
  renderBooksTable();
  
  // Set up search functionality
  setupSearch();
  
  // Set up filter functionality
  setupFilter();
  
  // Set up add book button with role check
  setupAddBookButton();
  
  // Apply role-based UI restrictions
  applyRoleBasedUI();
}

async function loadBooksFromAPI() {
  try {
    const result = await getAllBooks();
    
    if (result.success) {
      // Update BOOKS_DATA with data from API
      BOOKS_DATA = result.data || [];
      console.log('Books loaded from API:', BOOKS_DATA.length);
    } else {
      console.error('Failed to load books:', result.error);
      showError('Failed to load books: ' + result.error);
      // Keep using mock data as fallback
    }
  } catch (error) {
    console.error('Error loading books:', error);
    showError('Error loading books. Using offline data.');
    // Keep using mock data as fallback
  }
}

function renderBooksTable() {
  const tableBody = document.getElementById('booksTableBody');
  if (!tableBody) return;
  
  const filteredBooks = filterBooks();
  
  if (filteredBooks.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="6" style="text-align: center; padding: var(--spacing-xl); color: var(--color-accent);">
          No books found matching your criteria
        </td>
      </tr>
    `;
    return;
  }
  
  tableBody.innerHTML = filteredBooks.map(book => `
    <tr onclick="viewBook(${book.id})" style="cursor: pointer;" 
        onmouseover="this.style.backgroundColor='var(--color-surface)'" 
        onmouseout="this.style.backgroundColor='transparent'">
      <td>${book.id}</td>
      <td style="font-weight: 600;">${book.title}</td>
      <td>${book.author}</td>
      <td>${book.category}</td>
      <td>
        <span class="status-badge ${BOOK_STATUSES[book.status].class}">
          ${BOOK_STATUSES[book.status].label}
        </span>
      </td>
      <td>
        <div style="display: flex; gap: var(--spacing-sm);">
          <button onclick="event.stopPropagation(); viewBook(${book.id})" class="btn btn-sm btn-outline" style="padding: 4px 8px;">View</button>
          <button onclick="event.stopPropagation(); editBook(${book.id})" class="btn btn-sm btn-outline" style="padding: 4px 8px;">Edit</button>
        </div>
      </td>
    </tr>
  `).join('');
  
  // Update statistics
  updateDashboardStats(filteredBooks);
}

function filterBooks() {
  const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || '';
  const categoryFilter = document.getElementById('categoryFilter')?.value || '';
  const statusFilter = document.getElementById('statusFilter')?.value || '';
  
  return BOOKS_DATA.filter(book => {
    const matchesSearch = !searchTerm || 
      book.title.toLowerCase().includes(searchTerm) ||
      book.author.toLowerCase().includes(searchTerm) ||
      book.isbn.toLowerCase().includes(searchTerm);
    
    const matchesCategory = !categoryFilter || book.category === categoryFilter;
    const matchesStatus = !statusFilter || book.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });
}

function setupSearch() {
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', renderBooksTable);
  }
}

function setupFilter() {
  const categoryFilter = document.getElementById('categoryFilter');
  const statusFilter = document.getElementById('statusFilter');
  
  if (categoryFilter) {
    categoryFilter.addEventListener('change', renderBooksTable);
  }
  
  if (statusFilter) {
    statusFilter.addEventListener('change', renderBooksTable);
  }
}

function setupAddBookButton() {
  const addBookBtn = document.getElementById('addBookBtn');
  if (addBookBtn) {
    const userRole = getUserRole();
    
    // Check role permissions
    if (userRole === 'LIBRARIAN') {
      addBookBtn.style.display = 'none';
      return;
    }
    
    if (userRole === 'USER' || userRole === 'ADMIN') {
      addBookBtn.addEventListener('click', function() {
        window.location.href = '/src/main/resources/templates/book-form.html';
      });
    } else {
      addBookBtn.style.display = 'none';
    }
  }
}

function updateDashboardStats(books) {
  const totalBooks = books.length;
  const availableBooks = books.filter(book => book.status === 'available').length;
  const borrowedBooks = books.filter(book => book.status === 'borrowed').length;
  const lostBooks = books.filter(book => book.status === 'lost').length;
  
  // Update stats in UI if elements exist
  updateStatElement('totalBooksCount', totalBooks);
  updateStatElement('availableBooksCount', availableBooks);
  updateStatElement('borrowedBooksCount', borrowedBooks);
  updateStatElement('lostBooksCount', lostBooks);
}

function updateStatElement(elementId, value) {
  const element = document.getElementById(elementId);
  if (element) {
    element.textContent = value;
  }
}

// Apply role-based UI restrictions
function applyRoleBasedUI() {
  const userRole = getUserRole();
  
  // Handle Add Book button visibility
  const addBookBtn = document.querySelector('.add-book-btn, .btn-primary');
  if (addBookBtn) {
    if (userRole === 'LIBRARIAN') {
      // Hide add book button for librarian
      addBookBtn.style.display = 'none';
    } else if (userRole === 'USER' || userRole === 'ADMIN') {
      // Show for users and admins
      addBookBtn.style.display = 'inline-block';
    }
  }
  
  // Handle edit/delete permissions in book rows
  const editButtons = document.querySelectorAll('.btn-edit');
  const deleteButtons = document.querySelectorAll('.btn-delete');
  
  if (userRole === 'LIBRARIAN' || userRole === 'USER') {
    // Librarian and Users can only view, not edit/delete
    editButtons.forEach(btn => btn.style.display = 'none');
    deleteButtons.forEach(btn => btn.style.display = 'none');
  }
}

// Data refresh functionality
function refreshData() {
  const indicator = document.getElementById('refreshIndicator');
  if (indicator) {
    indicator.textContent = 'Data refreshed';
    indicator.style.opacity = '1';
    
    setTimeout(() => {
      indicator.style.opacity = '0';
    }, 2000);
  }
  
  renderBooksTable();
}