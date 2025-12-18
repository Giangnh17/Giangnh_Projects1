// ============================================
// HỆ THỐNG QUẢN LÝ THƯ VIỆN - API SERVICE  
// LIBRARY MANAGEMENT SYSTEM - API SERVICE
// ============================================

const API_BASE_URL = 'http://localhost:8086';

// ============================================
// AUTHENTICATION API FUNCTIONS
// ============================================

async function login(loginData) {
  try {
    const response = await fetch("http://localhost:8086/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(loginData)
    });

    // Check if response is successful
    if (response.ok) {
      // Try to get response as text first
      const responseText = await response.text();
      console.log('Response text:', responseText);
      
      // Check if response is JSON or plain text (token)
      let responseData;
      try {
        responseData = JSON.parse(responseText);
      } catch (parseError) {
        // If parsing fails, assume it's a plain token
        console.log('Response is not JSON, treating as token');
        responseData = { token: responseText.trim() };
      }
      
      if (responseData.token) {
        localStorage.setItem('token', responseData.token);
        
        // Create demo user with role based on email for testing
        let demoUser = responseData.user;
        if (!demoUser) {
          // Assign demo roles based on email for testing
          const email = loginData.email.toLowerCase();
          let role = 'USER'; // default
          
          if (email.includes('admin')) {
            role = 'ADMIN';
          } else if (email.includes('librarian')) {
            role = 'LIBRARIAN';
          }
          
          demoUser = {
            id: 1,
            email: loginData.email,
            name: loginData.email.split('@')[0],
            role: role
          };
        }
        
        localStorage.setItem('currentUser', JSON.stringify(demoUser));
        console.log('🎭 User logged in with role:', demoUser.role);
        
        return {
          success: true,
          data: responseData
        };
      } else {
        return {
          success: false,
          error: 'No token received'
        };
      }
    } else {
      // Handle error responses
      try {
        const errorData = await response.json();
        return {
          success: false,
          error: errorData.message || 'Đăng nhập thất bại'
        };
      } catch (parseError) {
        return {
          success: false,
          error: `HTTP ${response.status}: ${response.statusText}`
        };
      }
    }
  } catch (error) {
    console.error('Login error:', error);
    
    // More specific error messages
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      return {
        success: false,
        error: 'Không thể kết nối với server. Vui lòng kiểm tra backend có đang chạy không?'
      };
    }
    
    return {
      success: false,
      error: 'Lỗi mạng: ' + error.message
    };
  }
}

async function register(registerData) {
  try {
    const response = await fetch("http://localhost:8086/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(registerData)
    });

    const responseData = await response.json();

    if (response.ok) {
      return {
        success: true,
        data: responseData
      };
    } else {
      return {
        success: false,
        error: responseData.message || 'Registration failed'
      };
    }
  } catch (error) {
    console.error('Register error:', error);
    return {
      success: false,
      error: 'Network error. Please check your connection.'
    };
  }
}

async function getProfile() {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:8086/auth/profile", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    const responseData = await response.json();

    if (response.ok) {
      return {
        success: true,
        data: responseData
      };
    } else {
      return {
        success: false,
        error: responseData.message || 'Failed to get profile'
      };
    }
  } catch (error) {
    console.error('Get profile error:', error);
    return {
      success: false,
      error: 'Network error. Please check your connection.'
    };
  }
}

async function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('currentUser');
  window.location.href = '/src/main/resources/templates/auth-login.html';
}

// ============================================
// BOOK API FUNCTIONS
// ============================================

async function getAllBooks() {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:8086/api/books", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    const responseData = await response.json();

    if (response.ok) {
      return {
        success: true,
        data: responseData
      };
    } else {
      return {
        success: false,
        error: responseData.message || 'Failed to get books'
      };
    }
  } catch (error) {
    console.error('Get books error:', error);
    return {
      success: false,
      error: 'Network error. Please check your connection.'
    };
  }
}

async function getBookById(bookId) {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:8086/api/books/${bookId}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    const responseData = await response.json();

    if (response.ok) {
      return {
        success: true,
        data: responseData
      };
    } else {
      return {
        success: false,
        error: responseData.message || 'Failed to get book'
      };
    }
  } catch (error) {
    console.error('Get book error:', error);
    return {
      success: false,
      error: 'Network error. Please check your connection.'
    };
  }
}

async function createBook(bookData) {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:8086/api/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(bookData)
    });

    const responseData = await response.json();

    if (response.ok) {
      return {
        success: true,
        data: responseData
      };
    } else {
      return {
        success: false,
        error: responseData.message || 'Failed to create book'
      };
    }
  } catch (error) {
    console.error('Create book error:', error);
    return {
      success: false,
      error: 'Network error. Please check your connection.'
    };
  }
}

async function updateBook(bookId, bookData) {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:8086/api/books/${bookId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(bookData)
    });

    const responseData = await response.json();

    if (response.ok) {
      return {
        success: true,
        data: responseData
      };
    } else {
      return {
        success: false,
        error: responseData.message || 'Failed to update book'
      };
    }
  } catch (error) {
    console.error('Update book error:', error);
    return {
      success: false,
      error: 'Network error. Please check your connection.'
    };
  }
}

async function deleteBook(bookId) {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:8086/api/books/${bookId}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    if (response.ok) {
      return {
        success: true,
        data: 'Book deleted successfully'
      };
    } else {
      const responseData = await response.json();
      return {
        success: false,
        error: responseData.message || 'Failed to delete book'
      };
    }
  } catch (error) {
    console.error('Delete book error:', error);
    return {
      success: false,
      error: 'Network error. Please check your connection.'
    };
  }
}

// ============================================
// ADMIN BOOK API FUNCTIONS
// ============================================

async function adminCreateBook(bookData) {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:8086/admin/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(bookData)
    });

    const responseData = await response.json();

    if (response.ok) {
      return {
        success: true,
        data: responseData
      };
    } else {
      return {
        success: false,
        error: responseData.message || 'Failed to create book'
      };
    }
  } catch (error) {
    console.error('Admin create book error:', error);
    return {
      success: false,
      error: 'Network error. Please check your connection.'
    };
  }
}

// ============================================
// HELPER FUNCTIONS
// ============================================

function isAuthenticated() {
  return localStorage.getItem('token') !== null;
}

function getCurrentUser() {
  const userStr = localStorage.getItem('currentUser');
  return userStr ? JSON.parse(userStr) : null;
}

function getUserRole() {
  const user = getCurrentUser();
  return user ? user.role : 'GUEST';
}

// Check if user has required role
function hasRole(requiredRole) {
  const userRole = getUserRole();
  const roleHierarchy = {
    'GUEST': 0,
    'VIEWER': 1,
    'LIBRARIAN': 2,
    'ADMIN': 3
  };
  
  return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
}