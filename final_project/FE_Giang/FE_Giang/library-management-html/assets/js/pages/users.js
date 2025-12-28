// ========================================
// USERS PAGE
// Handle users management (Admin only)
// ========================================

// Protect page - require ADMIN role (only admin can manage users)
if (!protectPage('ADMIN')) {
  throw new Error('Unauthorized');
}

// State
let allUsers = [];

// Pagination state
let currentPage = 0;
let pageSize = 10;
let pageData = null;

// Initialize page
async function initUsers() {
  try {
    // Insert sidebar and header
    const sidebarHTML = Components.getSidebarHTML();
    const headerHTML = Components.getHeaderHTML('Quản Lý Người Dùng', [
      { text: 'Trang chủ', href: '/dashboard.html' },
      { text: 'Người dùng' }
    ]);

    document.querySelector('.layout').insertAdjacentHTML('afterbegin', sidebarHTML);
    document.getElementById('layoutContent').insertAdjacentHTML('afterbegin', headerHTML);

    // Initialize components
    Components.initSidebar();
    Components.initHeader();
    Auth.init();
    Auth.setupLogoutButtons();

    // Load users from backend
    await loadUsers();

  } catch (error) {
    console.error('Users init error:', error);
    Toast.error('Không thể tải dữ liệu');
  }
}

// Load users from backend
async function loadUsers(page = currentPage, size = pageSize) {
  try {
    Loading.show();
    const response = await AdminAPI.getAllUsers(page, size);
    
    // Store page data
    pageData = response;
    currentPage = response.pageNumber;
    pageSize = response.pageSize;
    
    // Extract users from content
    allUsers = response.content || [];
    
    // Render users and pagination
    renderUsers();
    renderPagination();
    
    Loading.hide();
  } catch (error) {
    Loading.hide();
    console.error('Load users error:', error);
    Toast.error(error.message);
  }
}

// Render users table
function renderUsers() {
  const container = document.getElementById('usersTable');

  if (!allUsers || allUsers.length === 0) {
    container.innerHTML = `
      <div class="alert alert-info">
        <i class="fas fa-info-circle"></i>
        Chưa có người dùng nào trong hệ thống.
      </div>
    `;
    return;
  }

  const getRoleBadge = (role) => {
    // Remove ROLE_ prefix if exists
    const cleanRole = role.startsWith('ROLE_') ? role.substring(5) : role;
    
    const badges = {
      'ADMIN': '<span class="badge badge-danger">Admin</span>',
      'LIBRARIAN': '<span class="badge badge-primary">Librarian</span>',
      'USER': '<span class="badge badge-info">User</span>',
      'GUEST': '<span class="badge">Guest</span>'
    };
    return badges[cleanRole] || badges['GUEST'];
  };

  const getStatusBadge = (isDeleted) => {
    return !isDeleted
      ? '<span class="badge badge-success">Hoạt động</span>'
      : '<span class="badge badge-warning">Đã xóa</span>';
  };

  const tableHTML = `
    <div class="table-container">
      <table class="table">
        <thead>
          <tr>
            <th>Họ tên</th>
            <th>Email</th>
            <th>Vai trò</th>
            <th>Ngày tạo</th>
            <th>Trạng thái</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          ${allUsers.map(user => `
            <tr>
              <td>
                <div style="display: flex; align-items: center; gap: 10px;">
                  <div class="user-avatar" style="width: 2rem; height: 2rem; font-size: 0.875rem;">
                    ${Utils.getInitials(user.fullName || user.email)}
                  </div>
                  <strong>${Utils.escapeHtml(user.fullName || 'N/A')}</strong>
                </div>
              </td>
              <td>${Utils.escapeHtml(user.email)}</td>
              <td>${getRoleBadge(user.role?.roleName || 'USER')}</td>
              <td>${Utils.formatDateSimple(user.createAt)}</td>
              <td>${getStatusBadge(user.isDeleted)}</td>
              <td>
                <div class="table-actions">
                  <button class="btn btn-sm btn-outline" onclick="changeRole(${user.id})" title="Đổi vai trò" ${user.isDeleted ? 'disabled' : ''}>
                    <i class="fas fa-user-tag"></i>
                  </button>
                  <button class="btn btn-sm btn-outline" onclick="deleteUser(${user.id})" title="Xóa người dùng" ${user.isDeleted ? 'disabled' : ''}>
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
              </td>
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
  
  const container = document.getElementById('usersTable');
  const paginationHTML = Components.getPaginationHTML(pageData);
  
  // Append pagination after table
  container.insertAdjacentHTML('beforeend', paginationHTML);
  
  // Setup pagination event listeners
  setupPaginationListeners();
}

// Setup pagination event listeners
function setupPaginationListeners() {
  // Page buttons
  document.querySelectorAll('.pagination-controls button[data-page]').forEach(btn => {
    btn.addEventListener('click', () => {
      const page = parseInt(btn.getAttribute('data-page'));
      if (page >= 0 && page < pageData.totalPages) {
        loadUsers(page, pageSize);
      }
    });
  });
  
  // Page size selector
  const sizeSelector = document.getElementById('pageSizeSelector');
  if (sizeSelector) {
    sizeSelector.addEventListener('change', () => {
      pageSize = parseInt(sizeSelector.value);
      loadUsers(0, pageSize); // Reset to first page
    });
  }
}

// Change user role
async function changeRole(userId) {
  const user = allUsers.find(u => u.id === userId);
  if (!user) return;

  const currentRole = user.role?.roleName || 'ROLE_USER';
  const cleanRole = currentRole.startsWith('ROLE_') ? currentRole.substring(5) : currentRole;

  // Show modal to select new role
  const newRole = prompt(`Đổi vai trò cho ${user.fullName || user.email}\n\nVai trò hiện tại: ${cleanRole}\n\nNhập vai trò mới (USER, LIBRARIAN, ADMIN):`);
  
  if (!newRole) return;

  const roleUpper = newRole.toUpperCase();
  if (!['USER', 'LIBRARIAN', 'ADMIN'].includes(roleUpper)) {
    Toast.error('Vai trò không hợp lệ! Chỉ chấp nhận: USER, LIBRARIAN, ADMIN');
    return;
  }

  // Backend expects ROLE_ prefix
  const roleWithPrefix = `ROLE_${roleUpper}`;

  try {
    Loading.show();
    await AdminAPI.updateUserRole(userId, roleWithPrefix);
    Toast.success('Đã cập nhật vai trò thành công!');
    await loadUsers(); // Reload users
    Loading.hide();
  } catch (error) {
    Loading.hide();
    Toast.error(error.message);
  }
}

// Delete user
async function deleteUser(userId) {
  const user = allUsers.find(u => u.id === userId);
  if (!user) return;

  const confirmed = confirm(`Bạn có chắc chắn muốn xóa người dùng: ${user.fullName || user.email}?`);
  if (!confirmed) return;

  try {
    Loading.show();
    await AdminAPI.deleteUser(userId);
    Toast.success('Đã xóa người dùng thành công!');
    await loadUsers(); // Reload users
    Loading.hide();
  } catch (error) {
    Loading.hide();
    Toast.error(error.message);
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initUsers);
