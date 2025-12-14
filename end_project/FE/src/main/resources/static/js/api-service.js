// ============================================
// HỆ THỐNG QUẢN LÝ THƯ VIỆN - API SERVICE
// LIBRARY MANAGEMENT SYSTEM - API SERVICE
// ============================================

// Backend API Configuration
// Default Spring Boot port: 8080
// Change this URL to match your backend server
const API_BASE_URL = 'http://localhost:8086';

class APIService {
    constructor() {
        this.baseURL = API_BASE_URL;
    }

    // Get JWT token from localStorage
    getToken() {
        return localStorage.getItem('jwt_token');
    }

    // Set JWT token to localStorage
    setToken(token) {
        localStorage.setItem('jwt_token', token);
    }

    // Remove JWT token from localStorage
    removeToken() {
        localStorage.removeItem('jwt_token');
        localStorage.removeItem('user_profile');
    }

    // Get auth headers with JWT token
    getAuthHeaders() {
        const token = this.getToken();
        return {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` })
        };
    }

    // Generic API call method
    async apiCall(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const config = {
            headers: this.getAuthHeaders(),
            ...options
        };

        try {
            const response = await fetch(url, config);
            
            // Handle different response types
            if (response.status === 401) {
                this.removeToken();
                window.location.href = '/src/main/resources/templates/auth-login.html';
                return null;
            }

            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                return await response.json();
            } else {
                return await response.text();
            }
        } catch (error) {
            console.error('API call failed:', error);
            throw error;
        }
    }

    // Authentication APIs
    async login(email, password) {
        return await this.apiCall('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password })
        });
    }

    async register(email, name, password) {
        return await this.apiCall('/auth/register', {
            method: 'POST',
            body: JSON.stringify({ email, name, password })
        });
    }

    async getProfile() {
        return await this.apiCall('/auth/profile', {
            method: 'GET'
        });
    }

    // Book APIs
    async getAllBooks() {
        return await this.apiCall('/api/books', {
            method: 'GET'
        });
    }

    async getBookById(id) {
        return await this.apiCall(`/api/books/${id}`, {
            method: 'GET'
        });
    }

    async createBook(bookData) {
        return await this.apiCall('/api/books', {
            method: 'POST',
            body: JSON.stringify(bookData)
        });
    }

    async updateBook(id, bookData) {
        return await this.apiCall(`/api/books/${id}`, {
            method: 'PUT',
            body: JSON.stringify(bookData)
        });
    }

    async deleteBook(id) {
        return await this.apiCall(`/api/books/${id}`, {
            method: 'DELETE'
        });
    }

    // Check if user is authenticated
    isAuthenticated() {
        const token = this.getToken();
        if (!token) return false;

        try {
            // Basic JWT token validation (check if not expired)
            const payload = JSON.parse(atob(token.split('.')[1]));
            const now = Math.floor(Date.now() / 1000);
            return payload.exp > now;
        } catch (error) {
            console.error('Token validation error:', error);
            return false;
        }
    }

    // Get user role from stored profile
    getUserRole() {
        const profile = localStorage.getItem('user_profile');
        if (profile) {
            return JSON.parse(profile).role;
        }
        return null;
    }

    // Store user profile
    setUserProfile(profile) {
        localStorage.setItem('user_profile', JSON.stringify(profile));
    }

    // Get user profile from storage
    getUserProfile() {
        const profile = localStorage.getItem('user_profile');
        return profile ? JSON.parse(profile) : null;
    }
}

// Create global API service instance
window.apiService = new APIService();

// Utility function to show loading state
function showLoading(element) {
    if (element) {
        element.disabled = true;
        element.innerHTML = '<span>Loading...</span>';
    }
}

// Utility function to hide loading state
function hideLoading(element, originalText) {
    if (element) {
        element.disabled = false;
        element.innerHTML = originalText;
    }
}

// Utility function to display error messages
function showError(message, container = null) {
    const errorDiv = container || document.getElementById('errorMessage');
    if (errorDiv) {
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
        errorDiv.style.color = '#d32f2f';
        errorDiv.style.padding = '10px';
        errorDiv.style.marginBottom = '15px';
        errorDiv.style.border = '1px solid #d32f2f';
        errorDiv.style.borderRadius = '4px';
        errorDiv.style.backgroundColor = '#ffeaea';
    } else {
        alert(message);
    }
}

// Utility function to display success messages
function showSuccess(message, container = null) {
    const successDiv = container || document.getElementById('successMessage');
    if (successDiv) {
        successDiv.textContent = message;
        successDiv.style.display = 'block';
        successDiv.style.color = '#2e7d32';
        successDiv.style.padding = '10px';
        successDiv.style.marginBottom = '15px';
        successDiv.style.border = '1px solid #2e7d32';
        successDiv.style.borderRadius = '4px';
        successDiv.style.backgroundColor = '#e8f5e8';
    } else {
        alert(message);
    }
}

// Check authentication on page load
document.addEventListener('DOMContentLoaded', function() {
    // Skip auth check for login and register pages
    const currentPath = window.location.pathname;
    const publicPages = ['auth-login.html', 'auth-register.html'];
    const isPublicPage = publicPages.some(page => currentPath.includes(page));

    if (!isPublicPage && !apiService.isAuthenticated()) {
        // Redirect to login if not authenticated
        window.location.href = '/src/main/resources/templates/auth-login.html';
    }
});