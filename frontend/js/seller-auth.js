document.addEventListener('DOMContentLoaded', () => {
    const loginTab = document.getElementById('loginTab');
    const signupTab = document.getElementById('signupTab');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');

    // Tab switching logic
    loginTab.addEventListener('click', () => {
        loginTab.classList.add('active');
        signupTab.classList.remove('active');
        loginForm.style.display = 'block';
        signupForm.style.display = 'none';
    });

    signupTab.addEventListener('click', () => {
        signupTab.classList.add('active');
        loginTab.classList.remove('active');
        signupForm.style.display = 'block';
        loginForm.style.display = 'none';
    });

    // Seller Login
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = loginForm.querySelector('#loginEmail').value;
        const password = loginForm.querySelector('#loginPassword').value;
        try {
            const response = await fetch('http://localhost:3000/api/seller/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.error || 'Login failed.');

            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            window.location.href = 'seller-form.html';
        } catch (error) {
            showNotification(error.message, 'error', 'loginNotification');
        } 
    });

    // Seller Signup
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const fullName = signupForm.querySelector('#fullName').value;
        const email = signupForm.querySelector('#signupEmail').value;
        const password = signupForm.querySelector('#signupPassword').value;
        const confirmPassword = signupForm.querySelector('#confirmPassword').value;

        if (password !== confirmPassword) {
            showNotification('Passwords do not match.', 'error', 'signupNotification');
            return;
        } // <--- This closing brace was missing

        try {
            const response = await fetch('http://localhost:3000/api/seller/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ fullName, email, password })
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.error || 'Signup failed.');

            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            window.location.href = 'seller-form.html';
        } catch (error) {
            showNotification(error.message, 'error', 'signupNotification');
        } 
    });
});

// Reusable notification function
function showNotification(message, type, elementId) {
    const notificationElement = document.getElementById(elementId);
    if (notificationElement) {
        notificationElement.textContent = message;
        notificationElement.className = `p-3 my-3 text-sm text-center rounded-md ${type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`;
        notificationElement.style.display = 'block';

        setTimeout(() => {
            notificationElement.style.display = 'none';
        }, 5000);
    } 
}
