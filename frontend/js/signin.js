document.getElementById('signin').addEventListener('submit', async function (event) {
    event.preventDefault();

    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const email = emailInput.value.trim();
    const password = passwordInput.value;

    // Basic validation
    if (!email || !password) {
        document.getElementById('login-error').textContent = 'Email and password are required';
        document.getElementById('login-error').style.display = 'block';
        return;
    }

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
            alert('Login successful!');
            window.location.href = 'index.html';
        } else {
            document.getElementById('login-error').textContent =
                data.error || 'Invalid email or password';
            document.getElementById('login-error').style.display = 'block';
        }
    } catch (error) {
        console.error('Login error:', error);
        document.getElementById('login-error').textContent = 'Login failed. Please try again.';
        document.getElementById('login-error').style.display = 'block';
    }
});

// Real-time Validation
document.getElementById('email').addEventListener('input', function () {
    const email = this.value.trim();
    const error = document.getElementById('login-error');
    if (!email) {
        error.textContent = 'Email is required';
        error.style.display = 'block';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        error.textContent = 'Invalid email format';
        error.style.display = 'block';
    } else {
        error.style.display = 'none';
    }
});

document.getElementById('password').addEventListener('input', function () {
    const password = this.value;
    const error = document.getElementById('login-error');
    if (!password) {
        error.textContent = 'Password is required';
        error.style.display = 'block';
    } else {
        error.style.display = 'none';
    }
});
