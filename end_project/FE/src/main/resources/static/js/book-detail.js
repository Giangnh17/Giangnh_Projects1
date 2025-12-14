// ============================================
// HỆ THỐNG QUẢN LÝ THƯ VIỆN - CHI TIẾT SÁCH
// LIBRARY MANAGEMENT SYSTEM - BOOK DETAIL
// ============================================

function initializeBookDetail() {
  console.log('Initializing Book Detail Page');
  
  // Get book ID from URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const bookId = urlParams.get('id');
  
  if (bookId) {
    renderBookDetail(parseInt(bookId));
  } else {
    // If no ID provided, show error or redirect
    showError('Book ID not provided');
    setTimeout(() => {
      window.location.href = '/src/main/resources/templates/index.html';
    }, 2000);
  }
}

function renderBookDetail(bookId) {
  const book = BOOKS_DATA.find(b => b.id === bookId);
  
  if (!book) {
    showError('Book not found');
    setTimeout(() => {
      window.location.href = '/src/main/resources/templates/index.html';
    }, 2000);
    return;
  }
  
  // Update page title
  document.title = `${book.title} - Trang web Quản lý thư viện sách Sarly`;
  
  // Update book info sections
  updateBookInfo(book);
  
  // Render borrow history
  renderBorrowHistory(book.borrowHistory);
  
  // Set up action buttons
  setupBookActions(book);
}

function updateBookInfo(book) {
  // Update all book information fields
  updateElementText('bookTitle', book.title);
  updateElementText('bookAuthor', book.author);
  updateElementText('bookIsbn', book.isbn);
  updateElementText('bookCategory', book.category);
  updateElementText('bookPublisher', book.publisher);
  updateElementText('bookDescription', book.description);
  
  // Update status with styling
  const statusElement = document.getElementById('bookStatus');
  if (statusElement) {
    const statusInfo = BOOK_STATUSES[book.status];
    statusElement.innerHTML = `<span class="status-badge ${statusInfo.class}">${statusInfo.label}</span>`;
  }
  
  // Update other fields
  updateElementText('bookLocation', 'Section A, Shelf 12, Row 3');
  updateElementText('bookDateAdded', '2024-01-15');
  updateElementText('bookTotalBorrows', book.borrowHistory.length.toString());
}

function updateElementText(elementId, text) {
  const element = document.getElementById(elementId);
  if (element) {
    element.textContent = text;
  }
}

function renderBorrowHistory(history) {
  const historyBody = document.getElementById('borrowHistoryBody');
  if (!historyBody) return;
  
  if (history.length === 0) {
    historyBody.innerHTML = `
      <tr>
        <td colspan="3" style="text-align: center; padding: var(--spacing-lg); color: var(--color-accent);">
          No borrow history available
        </td>
      </tr>
    `;
    return;
  }
  
  historyBody.innerHTML = history.map(record => `
    <tr>
      <td>${record.borrower}</td>
      <td>${formatDate(record.date)}</td>
      <td>
        ${record.returned 
          ? `<span style="color: var(--color-available);">${formatDate(record.returned)}</span>`
          : `<span style="color: var(--color-borrowed);">Not returned</span>`
        }
      </td>
    </tr>
  `).join('');
}

function setupBookActions(book) {
  // Edit button
  const editBtn = document.getElementById('editBookBtn');
  if (editBtn) {
    editBtn.onclick = () => editBook(book.id);
  }
  
  // Delete button
  const deleteBtn = document.getElementById('deleteBookBtn');
  if (deleteBtn) {
    deleteBtn.onclick = () => deleteBook(book.id);
  }
  
  // Back button
  const backBtn = document.getElementById('backBtn');
  if (backBtn) {
    backBtn.onclick = () => window.location.href = '/src/main/resources/templates/index.html';
  }
  
  // Print button (if exists)
  const printBtn = document.getElementById('printBtn');
  if (printBtn) {
    printBtn.onclick = () => printBookDetails();
  }
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('vi-VN');
}

function printBookDetails() {
  window.print();
}

// Navigation functions for sidebar
function showReports() {
  showInfo('Tính năng báo cáo đang được phát triển');
}

function showSettings() {
  showInfo('Tính năng cài đặt đang được phát triển');
}