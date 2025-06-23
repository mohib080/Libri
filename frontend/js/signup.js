document.getElementById('signup').addEventListener('submit', function (event) {
    event.preventDefault();

    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmInput = document.getElementById('confirm');

    const username = usernameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmInput.value;

    let isValid = true;

    // Username validation
    const usernameError = usernameInput.nextElementSibling;
    if (!username) {
        usernameError.textContent = 'Username is required.';
        usernameError.style.opacity = '1';
        isValid = false;
    } else {
        usernameError.textContent = '';
        usernameError.style.opacity = '0';
    }

    // Email validation
    const emailError = emailInput.nextElementSibling;
    if (!email) {
        emailError.textContent = 'Email is required.';
        emailError.style.opacity = '1';
        isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
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
    } else if (password.length < 6) {
        passwordError.textContent = 'Password must be at least 6 characters.';
        passwordError.style.opacity = '1';
        isValid = false;
    } else {
        passwordError.textContent = '';
        passwordError.style.opacity = '0';
    }

    // Confirm Password validation
    const confirmError = confirmInput.nextElementSibling;
    if (password !== confirmPassword) {
        confirmError.textContent = 'Passwords do not match.';
        confirmError.style.opacity = '1';
        isValid = false;
    } else {
        confirmError.textContent = '';
        confirmError.style.opacity = '0';
    }

    if (!isValid) {
        return;
    }

    console.log("User sign-up attempt:", { username, email, password });

    // Simulate successful signup
    alert("Signup successful! You can now log in.");
    window.location.href = 'signin.html'; // Redirect to login page
});


document.getElementById('username').addEventListener('input', function () {
    const usernameInput = this;
    const usernameError = usernameInput.nextElementSibling;
    if (!usernameInput.value.trim()) {
        usernameError.textContent = 'Username is required.';
        usernameError.style.opacity = '1';
    } else {
        usernameError.textContent = '';
        usernameError.style.opacity = '0';
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
    } else if (passwordInput.value.length < 6) {
        passwordError.textContent = 'Password must be at least 6 characters.';
        passwordError.style.opacity = '1';
    } else {
        passwordError.textContent = '';
        passwordError.style.opacity = '0';
    }
    document.getElementById('confirm').dispatchEvent(new Event('input'));
});

document.getElementById('confirm').addEventListener('input', function () {
    const confirmInput = this;
    const passwordInput = document.getElementById('password');
    const confirmError = confirmInput.nextElementSibling;
    if (passwordInput.value !== confirmInput.value) {
        confirmError.textContent = 'Passwords do not match.';
        confirmError.style.opacity = '1';
    } else {
        confirmError.textContent = '';
        confirmError.style.opacity = '0';
    }
});