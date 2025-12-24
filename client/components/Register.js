class Register {
    constructor() {
        this.form = null;
    }

    init() {
        this.form = document.getElementById('registerForm');
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    }

    showError(fieldId, message) {
        const errorElement = document.getElementById(fieldId + 'Error');
        const inputElement = document.getElementById(fieldId);
        
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.remove('hidden');
        }
        
        if (inputElement) {
            inputElement.classList.add('border-red-500');
            inputElement.classList.remove('border-gray-300');
        }
    }

    clearError(fieldId) {
        const errorElement = document.getElementById(fieldId + 'Error');
        const inputElement = document.getElementById(fieldId);
        
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.classList.add('hidden');
        }
        
        if (inputElement) {
            inputElement.classList.remove('border-red-500');
            inputElement.classList.add('border-gray-300');
        }
    }

    clearAllErrors() {
        ['name', 'email', 'password', 'confirmPassword'].forEach(field => {
            this.clearError(field);
        });
    }

    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    validate() {
        this.clearAllErrors();
        
        const formData = new FormData(this.form);
        const name = formData.get('name')?.trim() || '';
        const email = formData.get('email')?.trim() || '';
        const password = formData.get('password') || '';
        const confirmPassword = formData.get('confirmPassword') || '';
        
        let isValid = true;

        // Validate name
        if (!name) {
            this.showError('name', 'Full name is required');
            isValid = false;
        } else if (name.length < 2) {
            this.showError('name', 'Full name must be at least 2 characters');
            isValid = false;
        }

        // Validate email
        if (!email) {
            this.showError('email', 'Email is required');
            isValid = false;
        } else if (!this.validateEmail(email)) {
            this.showError('email', 'Please enter a valid email address');
            isValid = false;
        }

        // Validate password
        if (!password) {
            this.showError('password', 'Password is required');
            isValid = false;
        } else if (password.length < 8) {
            this.showError('password', 'Password must be at least 8 characters');
            isValid = false;
        }

        // Validate confirm password
        if (!confirmPassword) {
            this.showError('confirmPassword', 'Please confirm your password');
            isValid = false;
        } else if (password !== confirmPassword) {
            this.showError('confirmPassword', 'Passwords do not match');
            isValid = false;
        }

        return isValid;
    }

    handleSubmit(event) {
        event.preventDefault();
        
        if (this.validate()) {
            const formData = new FormData(this.form);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                password: formData.get('password'),
                confirmPassword: formData.get('confirmPassword')
            };
            
            console.log('Registration Form Data:', data);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const register = new Register();
    register.init();
});