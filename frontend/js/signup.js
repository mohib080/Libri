document.addEventListener('DOMContentLoaded', function () {
    const notificationArea = document.getElementById('notification-area');
    const signupForm = document.getElementById('signup');
    const submitButton = signupForm.querySelector('button[type="submit"]');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');

    // Notification system
    function showNotification(message, type = 'success') {
        if (!notificationArea) return;

        const notification = document.createElement('div');
        notification.classList.add('notification', type);

        // Add icon based on type
        let icon = '';
        switch (type) {
            case 'success':
                icon = '<i class="fas fa-check-circle"></i>';
                break;
            case 'error':
                icon = '<i class="fas fa-exclamation-circle"></i>';
                break;
            case 'info':
                icon = '<i class="fas fa-info-circle"></i>';
                break;
        }

        notification.innerHTML = `${icon} ${message}`;
        notificationArea.appendChild(notification);

        // Auto-hide after 3 seconds
        setTimeout(() => {
            notification.classList.add('hide');
            notification.addEventListener('transitionend', () => {
                notification.remove();
            }, { once: true });
        }, 3000);
    }

    // Loading state management
    function setLoading(isLoading) {
        if (isLoading) {
            submitButton.disabled = true;
            submitButton.innerHTML = '<div class="loading-spinner"></div> Creating Account...';
        } else {
            submitButton.disabled = false;
            submitButton.innerHTML = 'Create Account';
        }
    }

    // Form validation functions
    function validateName(name) {
        return name.length >= 2 && name.length <= 50;
    }

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function validatePassword(password) {
        return password.length >= 6;
    }

    function validatePasswordsMatch(password, confirmPassword) {
        return password === confirmPassword;
    }

    // Real-time validation
    nameInput.addEventListener('input', function () {
        const errorMsg = this.parentElement.querySelector('.error-msg');
        const name = this.value.trim();

        if (!name) {
            errorMsg.textContent = 'Full name is required';
            errorMsg.style.opacity = '1';
        } else if (!validateName(name)) {
            errorMsg.textContent = 'Name must be between 2 and 50 characters';
            errorMsg.style.opacity = '1';
        } else {
            errorMsg.style.opacity = '0';
        }
    });

    emailInput.addEventListener('input', function () {
        const errorMsg = this.parentElement.querySelector('.error-msg');
        const email = this.value.trim();

        if (!email) {
            errorMsg.textContent = 'Email address is required';
            errorMsg.style.opacity = '1';
        } else if (!validateEmail(email)) {
            errorMsg.textContent = 'Please enter a valid email address';
            errorMsg.style.opacity = '1';
        } else {
            errorMsg.style.opacity = '0';
        }
    });

    passwordInput.addEventListener('input', function () {
        const errorMsg = this.parentElement.querySelector('.error-msg');
        const password = this.value;

        if (!password) {
            errorMsg.textContent = 'Password is required';
            errorMsg.style.opacity = '1';
        } else if (!validatePassword(password)) {
            errorMsg.textContent = 'Password must be at least 6 characters';
            errorMsg.style.opacity = '1';
        } else {
            errorMsg.style.opacity = '0';
        }
    });

    confirmPasswordInput.addEventListener('input', function () {
        const errorMsg = this.parentElement.querySelector('.error-msg');
        const password = passwordInput.value;
        const confirmPassword = this.value;

        if (!confirmPassword) {
            errorMsg.textContent = 'Please confirm your password';
            errorMsg.style.opacity = '1';
        } else if (!validatePasswordsMatch(password, confirmPassword)) {
            errorMsg.textContent = 'Passwords do not match';
            errorMsg.style.opacity = '1';
        } else {
            errorMsg.style.opacity = '0';
        }
    });

    // Form submission
    signupForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        // Clear previous error messages
        document.querySelectorAll('.error-msg').forEach(msg => {
            msg.style.opacity = '0';
        });

        // Validation
        let hasErrors = false;

        if (!name) {
            const nameError = nameInput.parentElement.querySelector('.error-msg');
            nameError.textContent = 'Full name is required';
            nameError.style.opacity = '1';
            hasErrors = true;
        } else if (!validateName(name)) {
            const nameError = nameInput.parentElement.querySelector('.error-msg');
            nameError.textContent = 'Name must be between 2 and 50 characters';
            nameError.style.opacity = '1';
            hasErrors = true;
        }

        if (!email) {
            const emailError = emailInput.parentElement.querySelector('.error-msg');
            emailError.textContent = 'Email address is required';
            emailError.style.opacity = '1';
            hasErrors = true;
        } else if (!validateEmail(email)) {
            const emailError = emailInput.parentElement.querySelector('.error-msg');
            emailError.textContent = 'Please enter a valid email address';
            emailError.style.opacity = '1';
            hasErrors = true;
        }

        if (!password) {
            const passwordError = passwordInput.parentElement.querySelector('.error-msg');
            passwordError.textContent = 'Password is required';
            passwordError.style.opacity = '1';
            hasErrors = true;
        } else if (!validatePassword(password)) {
            const passwordError = passwordInput.parentElement.querySelector('.error-msg');
            passwordError.textContent = 'Password must be at least 6 characters';
            passwordError.style.opacity = '1';
            hasErrors = true;
        }

        if (!confirmPassword) {
            const confirmPasswordError = confirmPasswordInput.parentElement.querySelector('.error-msg');
            confirmPasswordError.textContent = 'Please confirm your password';
            confirmPasswordError.style.opacity = '1';
            hasErrors = true;
        } else if (!validatePasswordsMatch(password, confirmPassword)) {
            const confirmPasswordError = confirmPasswordInput.parentElement.querySelector('.error-msg');
            confirmPasswordError.textContent = 'Passwords do not match';
            confirmPasswordError.style.opacity = '1';
            hasErrors = true;
        }

        if (hasErrors) {
            showNotification('Please fix the errors below', 'error');
            return;
        }

        setLoading(true);

        try {
            const response = await fetch('/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password })
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('customer', JSON.stringify(data.customer));

                showNotification('Account created successfully! Redirecting...', 'success');

                // Redirect after a short delay to show success message
                setTimeout(() => {
                    window.location.href = 'signin.html';
                }, 1500);
            } else {
                showNotification(data.error || 'Registration failed. Please try again.', 'error');

                // Show specific field errors if available
                if (data.error) {
                    if (data.error.includes('email')) {
                        const emailError = emailInput.parentElement.querySelector('.error-msg');
                        emailError.textContent = data.error;
                        emailError.style.opacity = '1';
                    } else if (data.error.includes('name')) {
                        const nameError = nameInput.parentElement.querySelector('.error-msg');
                        nameError.textContent = data.error;
                        nameError.style.opacity = '1';
                    }
                }
            }
        } catch (error) {
            console.error('Registration error:', error);
            showNotification('Network error. Please check your connection and try again.', 'error');
        } finally {
            setLoading(false);
        }
    });
});
