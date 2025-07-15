document.addEventListener('DOMContentLoaded', function () {
    const notificationArea = document.getElementById('notification-area');
    const signinForm = document.getElementById('signin');
    const submitButton = signinForm.querySelector('button[type="submit"]');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

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
            submitButton.innerHTML = '<div class="loading-spinner"></div> Signing In...';
        } else {
            submitButton.disabled = false;
            submitButton.innerHTML = 'Sign In';
        }
    }

    // Form validation
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email) || email.length > 0; // Allow username or email
    }

    function validatePassword(password) {
        return password.length >= 1; // Basic validation
    }

    // Real-time validation
    emailInput.addEventListener('input', function () {
        const errorMsg = this.parentElement.querySelector('.error-msg');
        const email = this.value.trim();

        if (!email) {
            errorMsg.textContent = 'Email or username is required';
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
        } else {
            errorMsg.style.opacity = '0';
        }
    });

    // Form submission
    signinForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const email = emailInput.value.trim();
        const password = passwordInput.value;

        // Clear previous error messages
        document.querySelectorAll('.error-msg').forEach(msg => {
            msg.style.opacity = '0';
        });

        // Validation
        let hasErrors = false;

        if (!email) {
            const emailError = emailInput.parentElement.querySelector('.error-msg');
            emailError.textContent = 'Email or username is required';
            emailError.style.opacity = '1';
            hasErrors = true;
        }

        if (!password) {
            const passwordError = passwordInput.parentElement.querySelector('.error-msg');
            passwordError.textContent = 'Password is required';
            passwordError.style.opacity = '1';
            hasErrors = true;
        }

        if (hasErrors) {
            showNotification('Please fill in all required fields', 'error');
            return;
        }

        setLoading(true);

        try {
            const response = await fetch('/signin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('customer', JSON.stringify(data.customer));

                showNotification('Login successful! Redirecting...', 'success');

                // Redirect after a short delay to show success message
                setTimeout(() => {
                    window.location.href = 'user.html';
                }, 1500);
            } else {
                showNotification(data.error || 'Invalid email or password', 'error');

                // Show specific field errors if available
                if (data.error && data.error.includes('email')) {
                    const emailError = emailInput.parentElement.querySelector('.error-msg');
                    emailError.textContent = data.error;
                    emailError.style.opacity = '1';
                } else if (data.error && data.error.includes('password')) {
                    const passwordError = passwordInput.parentElement.querySelector('.error-msg');
                    passwordError.textContent = data.error;
                    passwordError.style.opacity = '1';
                }
            }
        } catch (error) {
            console.error('Login error:', error);
            showNotification('Network error. Please check your connection and try again.', 'error');
        } finally {
            setLoading(false);
        }
    });
});
