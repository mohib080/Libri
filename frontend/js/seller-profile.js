document.addEventListener('DOMContentLoaded', () => {
    // --- AUTHENTICATION CHECK ---
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'seller-login.html';
        return;
    }
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        if (!payload.isSeller) window.location.href = 'seller-login.html';
    } catch (e) {
        window.location.href = 'seller-login.html';
    }

    // --- DOM ELEMENT REFERENCES ---
    const profileForm = document.getElementById('profile-form');
    const passwordForm = document.getElementById('password-form');
    const notificationEl = document.getElementById('notification');
    const welcomeMessageEl = document.getElementById('welcome-message'); // <-- ADD THIS

    // Form fields
    const fullNameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const addressInput = document.getElementById('address');
    const currentPasswordInput = document.getElementById('current-password');
    const newPasswordInput = document.getElementById('new-password');
    const confirmPasswordInput = document.getElementById('confirm-password');

    // --- DATA FETCHING & UI POPULATION ---
    async function fetchAndDisplayProfile() {
        try {
            const response = await fetch('/api/seller/profile', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!response.ok) throw new Error('Failed to fetch profile data.');

            const data = await response.json();

            // --- ADD THIS BLOCK TO SET THE WELCOME MESSAGE ---
            if (data.supplier_name) {
                welcomeMessageEl.innerHTML = `Hello, <strong>${data.supplier_name}</strong>!`;
            }
            // --------------------------------------------------

            fullNameInput.value = data.supplier_name || '';
            emailInput.value = data.email || '';
            phoneInput.value = data.phone_number || '';
            addressInput.value = data.address || '';

        } catch (error) {
            showNotification(error.message, 'error');
        }
    }

    // --- FORM SUBMISSION HANDLERS ---
    profileForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const profileData = {
            supplier_name: fullNameInput.value,
            email: emailInput.value,
            phone_number: phoneInput.value,
            address: addressInput.value
        };

        try {
            const response = await fetch('/api/seller/profile', {
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
            showNotification('New passwords do not match.', 'error');
            return;
        }

        const passwordData = {
            currentPassword: currentPasswordInput.value,
            newPassword: newPasswordInput.value
        };

        try {
            const response = await fetch('/api/seller/change-password', {
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
            passwordForm.reset(); // Clear fields after successful change
        } catch (error) {
            showNotification(error.message, 'error');
        }
    });

    // --- UTILITY FUNCTIONS ---
    function showNotification(message, type) {
        notificationEl.textContent = message;
        notificationEl.className = `notification ${type}`;
        setTimeout(() => {
            notificationEl.className = 'notification hidden';
        }, 4000);
    }

    // --- INITIALIZE ---
    fetchAndDisplayProfile();
});
