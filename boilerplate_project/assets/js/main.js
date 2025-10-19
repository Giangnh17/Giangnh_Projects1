// Main JavaScript Application
class App {
    constructor() {
        this.init();
    }
    
    init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.setupApp();
            });
        } else {
            this.setupApp();
        }
    }
    
    setupApp() {
        console.log('App initialized!');
        
        // Setup components
        this.setupMobileMenu();
        this.setupSmoothScroll();
        this.setupFormValidation();
        this.setupScrollToTop();
        
        // Example: Load saved preferences
        this.loadUserPreferences();
    }
    
    // Mobile Menu Toggle
    setupMobileMenu() {
        const mobileToggle = Utils.select('.header__mobile-toggle');
        const nav = Utils.select('.header__nav');
        
        if (mobileToggle && nav) {
            Utils.addEvent(mobileToggle, 'click', () => {
                Utils.toggleClass(nav, 'active');
                Utils.toggleClass(mobileToggle, 'active');
            });
            
            // Close menu when clicking outside
            Utils.addEvent(document, 'click', (e) => {
                if (!mobileToggle.contains(e.target) && !nav.contains(e.target)) {
                    Utils.removeClass(nav, 'active');
                    Utils.removeClass(mobileToggle, 'active');
                }
            });
        }
    }
    
    // Smooth Scrolling for anchor links
    setupSmoothScroll() {
        const links = Utils.selectAll('a[href^="#"]');
        
        links.forEach(link => {
            Utils.addEvent(link, 'click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = Utils.select(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
    
    // Form Validation
    setupFormValidation() {
        const forms = Utils.selectAll('form');
        
        forms.forEach(form => {
            Utils.addEvent(form, 'submit', (e) => {
                if (!this.validateForm(form)) {
                    e.preventDefault();
                }
            });
        });
    }
    
    validateForm(form) {
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');
        
        // Remove existing error messages
        form.querySelectorAll('.error-message').forEach(el => el.remove());
        
        requiredFields.forEach(field => {
            Utils.removeClass(field, 'error');
            
            if (!field.value.trim()) {
                this.showFieldError(field, 'Trường này là bắt buộc');
                isValid = false;
            } else if (field.type === 'email' && !Utils.validateEmail(field.value)) {
                this.showFieldError(field, 'Email không hợp lệ');
                isValid = false;
            } else if (field.type === 'tel' && !Utils.validatePhone(field.value)) {
                this.showFieldError(field, 'Số điện thoại không hợp lệ');
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    showFieldError(field, message) {
        Utils.addClass(field, 'error');
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.color = 'var(--danger-color)';
        errorDiv.style.fontSize = 'var(--font-size-small)';
        errorDiv.style.marginTop = '0.4rem';
        
        field.parentNode.insertBefore(errorDiv, field.nextSibling);
    }
    
    // Scroll to Top Button
    setupScrollToTop() {
        // Create scroll to top button
        const scrollBtn = document.createElement('button');
        scrollBtn.innerHTML = '↑';
        scrollBtn.className = 'scroll-to-top';
        scrollBtn.style.cssText = `
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            width: 5rem;
            height: 5rem;
            border-radius: 50%;
            background: var(--primary-color);
            color: var(--white);
            border: none;
            font-size: 2rem;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all var(--transition-normal);
            z-index: 1000;
            box-shadow: var(--shadow-md);
        `;
        
        document.body.appendChild(scrollBtn);
        
        // Show/hide button based on scroll position
        const toggleScrollBtn = Utils.throttle(() => {
            if (window.pageYOffset > 300) {
                scrollBtn.style.opacity = '1';
                scrollBtn.style.visibility = 'visible';
            } else {
                scrollBtn.style.opacity = '0';
                scrollBtn.style.visibility = 'hidden';
            }
        }, 100);
        
        Utils.addEvent(window, 'scroll', toggleScrollBtn);
        
        // Scroll to top when clicked
        Utils.addEvent(scrollBtn, 'click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Load User Preferences
    loadUserPreferences() {
        const preferences = Utils.getStorage('userPreferences');
        
        if (preferences) {
            // Apply saved theme, language, etc.
            if (preferences.theme) {
                document.body.setAttribute('data-theme', preferences.theme);
            }
        }
    }
    
    // Save User Preferences
    saveUserPreferences(preferences) {
        const currentPrefs = Utils.getStorage('userPreferences') || {};
        const newPrefs = { ...currentPrefs, ...preferences };
        Utils.setStorage('userPreferences', newPrefs);
    }
    
    // Utility method to show notifications
    showNotification(message, type = 'info', duration = 3000) {
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 2rem;
            right: 2rem;
            padding: var(--spacing-sm) var(--spacing-md);
            background: var(--${type === 'error' ? 'danger' : type === 'success' ? 'success' : 'info'}-color);
            color: var(--white);
            border-radius: var(--border-radius-md);
            box-shadow: var(--shadow-lg);
            z-index: 10000;
            opacity: 0;
            transform: translateX(100%);
            transition: all var(--transition-normal);
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 10);
        
        // Auto remove
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, duration);
    }
}

// Initialize the app
const app = new App();

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = App;
}