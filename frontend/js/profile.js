document.addEventListener('DOMContentLoaded', () => {
    // --- AUTHENTICATION & SECURITY ---
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'signin.html'; // Redirect to customer sign-in
        return;
    }

    // --- DOM ELEMENT REFERENCES ---
    const welcomeMessageEl = document.getElementById('welcome-message');
    const notificationEl = document.getElementById('notification');

    // Forms & Inputs
    const profileForm = document.getElementById('profile-form');
    const passwordForm = document.getElementById('password-form');
    const fullNameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const addressInput = document.getElementById('address');
    const currentPasswordInput = document.getElementById('current-password');
    const newPasswordInput = document.getElementById('new-password');
    const confirmPasswordInput = document.getElementById('confirm-password');

    const logoutLink = document.getElementById('logout-link');

    // --- DATA FETCHING & UI POPULATION ---
    async function fetchAndDisplayProfile() {
        try {
            const response = await fetch('/api/profile', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!response.ok) throw new Error('Failed to fetch profile.');

            const { customer } = await response.json();

            welcomeMessageEl.textContent = `Hello, ${customer.name}!`;
            fullNameInput.value = customer.name || '';
            emailInput.value = customer.email || '';
            phoneInput.value = customer.phone_number || '';
            addressInput.value = customer.address || '';

        } catch (error) {
            showNotification(error.message, 'error');
        }
    }

    // --- FORM SUBMISSION LOGIC ---
    profileForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const profileData = {
            name: fullNameInput.value,
            email: emailInput.value,
            phone_number: phoneInput.value,
            address: addressInput.value,
        };
        try {
            const response = await fetch('/api/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(profileData)
            });
            const result = await response.json();
            if (!response.ok) throw new Error(result.error);
            showNotification(result.message, 'success');
        } catch (error) {
            showNotification(error.message, 'error');
        }
    });

    passwordForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (newPasswordInput.value !== confirmPasswordInput.value) {
            return showNotification('New passwords do not match.', 'error');
        }

        const passwordData = {
            oldPassword: currentPasswordInput.value,
            newPassword: newPasswordInput.value
        };

        try {
            const response = await fetch('/api/change-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(passwordData)
            });
            const result = await response.json();
            if (!response.ok) throw new Error(result.error);
            showNotification(result.message, 'success');
            passwordForm.reset();
        } catch (error) {
            showNotification(error.message, 'error');
        }
    });

    // --- NAVIGATION AND UTILITY ---
    function setupNavigation() {
        const navLinks = document.querySelectorAll('.sidebar-nav .nav-link');
        const sections = document.querySelectorAll('.content-section');

        navLinks.forEach(link => {
            if (link.href.includes('#')) {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const targetId = link.getAttribute('href').substring(1);

                    sections.forEach(sec => sec.classList.add('hidden'));
                    document.getElementById(targetId).classList.remove('hidden');

                    navLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                });
            }
        });
    }

    logoutLink.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('token');
        window.location.href = 'signin.html';
    });

    function showNotification(message, type) {
        notificationEl.textContent = message;
        notificationEl.className = `notification ${type}`;
        setTimeout(() => {
            notificationEl.className = 'notification hidden';
        }, 4000);
    }

    // --- INITIALIZE PAGE ---
    fetchAndDisplayProfile();
    setupNavigation();
});
