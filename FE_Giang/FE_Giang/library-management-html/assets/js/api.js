// ========================================
// API SERVICE LAYER
// Backend API Documentation Implementation
// ========================================

const API_BASE_URL = 'http://localhost:8086';

// ========================================
// HTTP CLIENT
// ========================================

class HttpClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  // Get authorization header
  getAuthHeader() {
    const token = Storage.get('token');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  }

  // Handle response
  async handleResponse(response) {
    console.log('Response status:', response.status);
    console.log('Response ok:', response.ok);
    
    const contentType = response.headers.get('content-type');
    const isJson = contentType && contentType.includes('application/json');
    
    console.log('Content-Type:', contentType);
    console.log('Is JSON:', isJson);
    
    const data = isJson ? await response.json() : await response.text();
    
    console.log('Response data:', data);

    if (!response.ok) {
      // Handle unauthorized (token expired or invalid)
      if (response.status === 401) {
        Auth.logout();
        window.location.href = './index.html';
        throw new Error('Session expired. Please login again.');
      }

      // Handle other errors
      const errorMessage = data.message || data.error || data || 'Request failed';
      throw new Error(errorMessage);
    }

    return data;
  }

  // GET request
  async get(endpoint, params = {}) {
    try {
      const queryString = Object.keys(params).length 
        ? '?' + Utils.buildQueryString(params)
        : '';
      
      const response = await fetch(`${this.baseURL}${endpoint}${queryString}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...this.getAuthHeader()
        }
      });

      return await this.handleResponse(response);
    } catch (error) {
      console.error('GET Error:', error);
      throw error;
    }
  }

  // POST request
  async post(endpoint, data = {}) {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...this.getAuthHeader()
        },
        body: JSON.stringify(data)
      });

      return await this.handleResponse(response);
    } catch (error) {
      console.error('POST Error:', error);
      throw error;
    }
  }

  // PUT request
  async put(endpoint, data = {}) {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...this.getAuthHeader()
        },
        body: JSON.stringify(data)
      });

      return await this.handleResponse(response);
    } catch (error) {
      console.error('PUT Error:', error);
      throw error;
    }
  }

  // DELETE request
  async delete(endpoint) {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...this.getAuthHeader()
        }
      });

      return await this.handleResponse(response);
    } catch (error) {
      console.error('DELETE Error:', error);
      throw error;
    }
  }
}

// Create HTTP client instance
const http = new HttpClient(API_BASE_URL);

// ========================================
// AUTHENTICATION API
// ========================================

const AuthAPI = {
  /**
   * Login user
   * POST /auth/login
   * @param {Object} credentials - { email, password }
   * @returns {Promise<Object>} { token, user }
   */
  async login(credentials) {
    try {
      const response = await http.post('/auth/login', credentials);
      
      console.log('API Login response:', response);
      console.log('Response type:', typeof response);
      
      let token = null;
      let user = null;
      
      // Backend trả về JWT token dạng string thuần túy
      if (typeof response === 'string' && response.startsWith('eyJ')) {
        token = response;
        // Decode JWT để lấy thông tin user (payload)
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          user = {
            email: payload.sub || payload.email,
            name: payload.name || payload.sub || payload.email,
            role: payload.role || payload.authorities?.[0] || 'USER'
          };
          console.log('Decoded user from JWT:', user);
        } catch (e) {
          console.warn('Could not decode JWT:', e);
          user = { email: credentials.email };
        }
      } 
      // Backend trả về object với token và user
      else if (typeof response === 'object') {
        token = response?.token || response?.accessToken || response?.jwt || response?.access_token;
        user = response?.user || response?.data?.user;
      }
      
      console.log('Extracted token:', token ? token.substring(0, 20) + '...' : 'null');
      console.log('Extracted user:', user);
      
      // Save token and user to localStorage
      if (token) {
        Storage.set('token', token);
        Storage.set('currentUser', user);
        
        // Verify save
        const savedToken = Storage.get('token');
        console.log('Token saved successfully:', savedToken ? 'YES' : 'NO');
        
        if (!savedToken) {
          throw new Error('Không thể lưu token vào localStorage');
        }
      } else {
        throw new Error('Backend không trả về token hợp lệ');
      }
      
      return { token, user };
    } catch (error) {
      console.error('Login API error:', error);
      throw new Error(error.message || 'Đăng nhập thất bại');
    }
  },

  /**
   * Register new user
   * POST /auth/register
   * @param {Object} userData - { email, password, name }
   * @returns {Promise<Object>} User object
   */
  async register(userData) {
    try {
      const response = await http.post('/auth/register', userData);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Đăng ký thất bại');
    }
  },

  /**
   * Get user profile
   * GET /auth/profile
   * @returns {Promise<Object>} User profile
   */
  async getProfile() {
    try {
      const response = await http.get('/auth/profile');
      // Update stored user data
      Storage.set('currentUser', response);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Không thể lấy thông tin profile');
    }
  }
};

// ========================================
// BOOKS API
// ========================================

const BooksAPI = {
  /**
   * Get all books
   * GET /api/books
   * @returns {Promise<Array>} List of books
   */
  async getAll() {
    try {
      const response = await http.get('/api/books');
      return Array.isArray(response) ? response : [];
    } catch (error) {
      throw new Error(error.message || 'Không thể tải danh sách sách');
    }
  },

  /**
   * Get book by ID
   * GET /api/books/{id}
   * @param {number} id - Book ID
   * @returns {Promise<Object>} Book object
   */
  async getById(id) {
    try {
      const response = await http.get(`/api/books/${id}`);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Không thể tải thông tin sách');
    }
  },

  /**
   * Create new book
   * POST /api/books
   * @param {Object} bookData - Book data
   * @returns {Promise<Object>} Created book
   */
  async create(bookData) {
    try {
      const response = await http.post('/api/books', bookData);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Không thể tạo sách mới');
    }
  },

  /**
   * Update book
   * PUT /api/books/{id}
   * @param {number} id - Book ID
   * @param {Object} bookData - Updated book data
   * @returns {Promise<Object>} Updated book
   */
  async update(id, bookData) {
    try {
      const response = await http.put(`/api/books/${id}`, bookData);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Không thể cập nhật sách');
    }
  },

  /**
   * Delete book
   * DELETE /api/books/{id}
   * @param {number} id - Book ID
   * @returns {Promise<Object>} Success message
   */
  async delete(id) {
    try {
      const response = await http.delete(`/api/books/${id}`);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Không thể xóa sách');
    }
  },

  /**
   * Search books (client-side)
   * @param {Array} books - List of books
   * @param {string} query - Search query
   * @returns {Array} Filtered books
   */
  search(books, query) {
    if (!query || !query.trim()) return books;
    
    const searchTerm = query.toLowerCase().trim();
    
    return books.filter(book => {
      return (
        book.title?.toLowerCase().includes(searchTerm) ||
        book.author?.toLowerCase().includes(searchTerm) ||
        book.isbn?.toLowerCase().includes(searchTerm) ||
        book.category?.toLowerCase().includes(searchTerm) ||
        book.publisher?.toLowerCase().includes(searchTerm)
      );
    });
  },

  /**
   * Filter books by category (client-side)
   * @param {Array} books - List of books
   * @param {string} category - Category to filter
   * @returns {Array} Filtered books
   */
  filterByCategory(books, category) {
    if (!category || category === 'all') return books;
    return books.filter(book => book.category === category);
  },

  /**
   * Get unique categories from books
   * @param {Array} books - List of books
   * @returns {Array} List of unique categories
   */
  getCategories(books) {
    const categories = new Set();
    books.forEach(book => {
      if (book.category) categories.add(book.category);
    });
    return Array.from(categories).sort();
  }
};

// ========================================
// ADMIN API (if user is ADMIN)
// ========================================

const AdminAPI = {
  /**
   * Create book (Admin only)
   * POST /admin/books
   * @param {Object} bookData - Book data
   * @returns {Promise<Object>} Created book
   */
  async createBook(bookData) {
    try {
      const response = await http.post('/admin/books', bookData);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Không thể tạo sách (Admin)');
    }
  }
};

// ========================================
// STATISTICS (Client-side calculations)
// ========================================

const StatsAPI = {
  /**
   * Calculate statistics from books data
   * @param {Array} books - List of books
   * @returns {Object} Statistics object
   */
  calculateStats(books) {
    if (!books || books.length === 0) {
      return {
        totalBooks: 0,
        totalQuantity: 0,
        availableBooks: 0,
        borrowedBooks: 0,
        categories: 0
      };
    }

    const totalBooks = books.length;
    const totalQuantity = books.reduce((sum, book) => sum + (book.quantity || 0), 0);
    const availableBooks = books.reduce((sum, book) => sum + (book.available || 0), 0);
    const borrowedBooks = totalQuantity - availableBooks;
    const categories = BooksAPI.getCategories(books).length;

    return {
      totalBooks,
      totalQuantity,
      availableBooks,
      borrowedBooks,
      categories
    };
  },

  /**
   * Get books by category with counts
   * @param {Array} books - List of books
   * @returns {Array} Category statistics
   */
  getCategoryStats(books) {
    const categoryMap = {};
    
    books.forEach(book => {
      const category = book.category || 'Uncategorized';
      if (!categoryMap[category]) {
        categoryMap[category] = {
          name: category,
          count: 0,
          available: 0
        };
      }
      categoryMap[category].count += book.quantity || 0;
      categoryMap[category].available += book.available || 0;
    });

    return Object.values(categoryMap).sort((a, b) => b.count - a.count);
  },

  /**
   * Get top authors by book count
   * @param {Array} books - List of books
   * @param {number} limit - Number of top authors
   * @returns {Array} Top authors
   */
  getTopAuthors(books, limit = 5) {
    const authorMap = {};
    
    books.forEach(book => {
      const author = book.author || 'Unknown';
      if (!authorMap[author]) {
        authorMap[author] = {
          name: author,
          bookCount: 0,
          totalQuantity: 0
        };
      }
      authorMap[author].bookCount += 1;
      authorMap[author].totalQuantity += book.quantity || 0;
    });

    return Object.values(authorMap)
      .sort((a, b) => b.bookCount - a.bookCount)
      .slice(0, limit);
  }
};

// ========================================
// EXPORT API
// ========================================

window.API = {
  Auth: AuthAPI,
  Books: BooksAPI,
  Admin: AdminAPI,
  Stats: StatsAPI
};

// Also export individual APIs for convenience
window.AuthAPI = AuthAPI;
window.BooksAPI = BooksAPI;
window.AdminAPI = AdminAPI;
window.StatsAPI = StatsAPI;
