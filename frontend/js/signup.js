document.getElementById('signup').addEventListener('submit', async function (event) {
    event.preventDefault();

    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmInput = document.getElementById('confirm');

    const name = usernameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmInput.value;

    let isValid = true;
    const errors = {};

    // Validation
    if (!name) {
        errors.username = 'Username is required';
        isValid = false;
    }

    if (!email) {
        errors.email = 'Email is required';
        isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.email = 'Invalid email format';
        isValid = false;
    }

    if (!password) {
        errors.password = 'Password is required';
        isValid = false;
    } else if (password.length < 8) {
        errors.password = 'Password must be at least 8 characters';
        isValid = false;
    } else if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/.test(password)) {
        errors.password = 'Password must contain uppercase, lowercase, and number';
        isValid = false;
    }

    if (password !== confirmPassword) {
        errors.confirm = 'Passwords do not match';
        isValid = false;
    }

    // Display errors
    for (const [field, message] of Object.entries(errors)) {
        const errorElement = document.getElementById(`${field}-error`);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
    }

    if (!isValid) return;

    try {
        const response = await fetch('/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name,
                email,
                password,
                phone_number: null,
                address: null
            })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('customer', JSON.stringify(data.customer));
            alert("Signup successful! You can now log in.");
            window.location.href = 'signin.html';
        } else {
            if (data.error.includes('Email')) {
                document.getElementById('email-error').textContent = data.error;
                document.getElementById('email-error').style.display = 'block';
            } else {
                alert(`Signup failed: ${data.error}`);
            }
        }
    } catch (error) {
        console.error('Signup error:', error);
        alert('Signup failed. Please try again.');
    }
});

// Real-time Validation
document.getElementById('username').addEventListener('input', validateName);
document.getElementById('email').addEventListener('input', validateEmail);
document.getElementById('password').addEventListener('input', validatePassword);
document.getElementById('confirm').addEventListener('input', validateConfirm);

function validateName() {
    const input = document.getElementById('username');
    const error = document.getElementById('username-error');
    if (!input.value.trim()) {
        error.textContent = 'Username is required';
        error.style.display = 'block';
    } else {
        error.style.display = 'none';
    }
}

function validateEmail() {
    const input = document.getElementById('email');
    const error = document.getElementById('email-error');
    const email = input.value.trim();

    if (!email) {
        error.textContent = 'Email is required';
        error.style.display = 'block';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        error.textContent = 'Invalid email format';
        error.style.display = 'block';
    } else {
        error.style.display = 'none';
    }
}

function validatePassword() {
    const input = document.getElementById('password');
    const error = document.getElementById('password-error');
    const password = input.value;

    if (!password) {
        error.textContent = 'Password is required';
        error.style.display = 'block';
    } else if (password.length < 8) {
        error.textContent = 'Password must be at least 8 characters';
        error.style.display = 'block';
    } else if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/.test(password)) {
        error.textContent = 'Password must contain uppercase, lowercase, and number';
        error.style.display = 'block';
    } else {
        error.style.display = 'none';
    }
    validateConfirm();
}

function validateConfirm() {
    const password = document.getElementById('password').value;
    const confirm = document.getElementById('confirm').value;
    const error = document.getElementById('confirm-error');

    if (password !== confirm) {
        error.textContent = 'Passwords do not match';
        error.style.display = 'block';
    } else {
        error.style.display = 'none';
    }
}
