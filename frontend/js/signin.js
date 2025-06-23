document.getElementById('signin').addEventListener('submit', function (event) {
    event.preventDefault();

    const emailInput = document.getElementById('email'); // Corrected ID
    const passwordInput = document.getElementById('password'); // Corrected ID

    const emailOrUsername = emailInput.value.trim();
    const password = passwordInput.value;

    // Simple client-side validation
    let isValid = true;

    // Email validation
    const emailError = emailInput.nextElementSibling;
    if (!emailOrUsername) {
        emailError.textContent = 'Email is required.';
        emailError.style.opacity = '1';
        isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailOrUsername)) {
        emailError.textContent = 'Invalid email format.';
        emailError.style.opacity = '1';
        isValid = false;
    } else {
        emailError.textContent = '';
        emailError.style.opacity = '0';
    }

    // Password validation
    const passwordError = passwordInput.nextElementSibling;
    if (!password) {
        passwordError.textContent = 'Password is required.';
        passwordError.style.opacity = '1';
        isValid = false;
    } else {
        passwordError.textContent = '';
        passwordError.style.opacity = '0';
    }

    if (!isValid) {
        return; // Stop if validation fails
    }

    // Simulated login check
    if (emailOrUsername === "test@example.com" && password === "password123") {
        alert("Login successful!");
        window.location.href = 'index.html';
    } else {
        alert("Invalid credentials. Please check your email and password.");
    }
});

document.getElementById('email').addEventListener('input', function () {
    const emailInput = this;
    const emailError = emailInput.nextElementSibling;
    if (!emailInput.value.trim()) {
        emailError.textContent = 'Email is required.';
        emailError.style.opacity = '1';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim())) {
        emailError.textContent = 'Invalid email format.';
        emailError.style.opacity = '1';
    } else {
        emailError.textContent = '';
        emailError.style.opacity = '0';
    }
});

document.getElementById('password').addEventListener('input', function () {
    const passwordInput = this;
    const passwordError = passwordInput.nextElementSibling;
    if (!passwordInput.value) {
        passwordError.textContent = 'Password is required.';
        passwordError.style.opacity = '1';
    } else {
        passwordError.textContent = '';
        passwordError.style.opacity = '0';
    }
});