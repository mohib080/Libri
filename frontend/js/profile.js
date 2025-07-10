if (!localStorage.getItem('token')) {
    window.location.href = 'index.html';
}

// --- DARK MODE INITIAL STATE ---
if (localStorage.getItem("dark-mode") === "enabled") {
    document.body.classList.add("dark-mode");
}

document.addEventListener('DOMContentLoaded', function () {
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    if (darkModeToggle) {
        darkModeToggle.innerHTML = document.body.classList.contains("dark-mode")
            ? '<i class="fas fa-sun"></i>'
            : '<i class="fas fa-moon"></i>';
        darkModeToggle.addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");
            if (document.body.classList.contains("dark-mode")) {
                darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
                localStorage.setItem("dark-mode", "enabled");
            } else {
                darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
                localStorage.setItem("dark-mode", "disabled");
            }
        });
    }

    const profileContainer = document.querySelector('.profile-container');
    if (profileContainer) {
        profileContainer.innerHTML = `
            <div class="profile">
                <img src="https://www.gravatar.com/avatar/default?s=40&d=mp" alt="Profile" class="profile-img">
                <div class="profile-dropdown">
                    <a href="profile.html" class="active">Profile</a>
                    <a href="user.html">Home</a>
                    <a href="#">Orders</a>
                    <a href="#">Wishlist</a>
                    <a href="#" id="logout-link">Logout</a>
                </div>
            </div>
        `;
        const profileDiv = profileContainer.querySelector('.profile');
        if (profileDiv) {
            profileDiv.addEventListener('mouseover', () => {
                const dropdown = profileContainer.querySelector('.profile-dropdown');
                if (dropdown) dropdown.style.display = 'block';
            });
            profileDiv.addEventListener('mouseout', () => {
                const dropdown = profileContainer.querySelector('.profile-dropdown');
                if (dropdown) dropdown.style.display = 'none';
            });
        }
        const logoutLink = document.getElementById('logout-link');
        if (logoutLink) {
            logoutLink.addEventListener('click', function (e) {
                e.preventDefault();
                localStorage.removeItem('token');
                window.location.href = 'index.html';
            });
        }
    }

    async function getProfileData() {
        const token = localStorage.getItem('token');
        if (!token) {
            window.location.href = 'index.html';
            return null;
        }
        try {
            const response = await fetch('http://localhost:3000/api/profile', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!response.ok) throw new Error('Failed to fetch profile');
            const data = await response.json();
            return data.customer;
        } catch (e) {
            localStorage.removeItem('token');
            window.location.href = 'index.html';
            return null;
        }
    }

    async function renderProfile() {
        const profile = await getProfileData();
        if (!profile) return;
        document.getElementById('profile-name').textContent = profile.name || '';
        document.getElementById('profile-email').textContent = profile.email || '';
        document.getElementById('profile-phone').textContent = `Phone: ${profile.phone_number || ''}`;
        document.getElementById('profile-address').textContent = `Address: ${profile.address || ''}`;
        document.getElementById('profile-role').textContent = `Role: ${profile.role || ''}`;
        document.getElementById('profile-verified').textContent = `Verified: ${profile.is_verified ? 'Yes' : 'No'}`;
        document.getElementById('profile-last-login').textContent = `Last Login: ${new Date(profile.last_login_at).toLocaleString() || ''}`;

        document.getElementById('edit-name').value = profile.name || '';
        document.getElementById('edit-email').value = profile.email || '';
        document.getElementById('edit-phone').value = profile.phone_number || '';
        document.getElementById('edit-address').value = profile.address || '';
    }

    renderProfile();

    const editProfileBtn = document.getElementById('edit-profile-btn');
    const editSection = document.getElementById('edit-profile-section');
    const cancelEditBtn = document.getElementById('cancel-edit-btn');
    const profileEditForm = document.getElementById('profile-edit-form');

    if (editProfileBtn) {
        editProfileBtn.addEventListener('click', function () {
            editSection.style.display = 'block';
        });
    }
    if (cancelEditBtn) {
        cancelEditBtn.addEventListener('click', function () {
            editSection.style.display = 'none';
            renderProfile();
        });
    }
    if (profileEditForm) {
        profileEditForm.addEventListener('submit', async function (e) {
            e.preventDefault();
            const token = localStorage.getItem('token');
            const updatedData = {
                name: document.getElementById('edit-name').value.trim(),
                email: document.getElementById('edit-email').value.trim(),
                phone_number: document.getElementById('edit-phone').value.trim(),
                address: document.getElementById('edit-address').value.trim(),
            };

            try {
                const response = await fetch('http://localhost:3000/api/profile', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(updatedData)
                });

                const data = await response.json();

                if (!response.ok) throw new Error("Update failed");

                // ✅ Store the new token if returned (after email update, etc.)
                if (data.token) {
                    localStorage.setItem('token', data.token);
                }

                alert("Profile updated successfully");
                editSection.style.display = 'none';
                renderProfile();
            } catch (err) {
                alert("Error updating profile.");
            }
        });
    }


    const changePasswordBtn = document.getElementById('change-password-btn');
    const changePasswordSection = document.getElementById('change-password-section');
    const cancelPasswordBtn = document.getElementById('cancel-password-btn');
    const changePasswordForm = document.getElementById('change-password-form');

    if (changePasswordBtn) {
        changePasswordBtn.addEventListener('click', function () {
            changePasswordSection.style.display = 'block';
        });
    }
    if (cancelPasswordBtn) {
        cancelPasswordBtn.addEventListener('click', function () {
            changePasswordSection.style.display = 'none';
            changePasswordForm.reset();
        });
    }
    if (changePasswordForm) {
        changePasswordForm.addEventListener('submit', async function (e) {
            e.preventDefault();
            const oldPassword = document.getElementById('old-password').value.trim();
            const newPassword = document.getElementById('new-password').value.trim();
            const token = localStorage.getItem('token');
            try {
                const response = await fetch('http://localhost:3000/api/change-password', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify({ oldPassword, newPassword }),
                });
                const data = await response.json();
                if (response.ok) {
                    alert('Password changed successfully.');
                    changePasswordSection.style.display = 'none';
                    changePasswordForm.reset();
                } else {
                    alert(data.error || 'Failed to change password.');
                }
            } catch (err) {
                alert('Error connecting to server.');
            }
        });
    }

    const avatarUpload = document.getElementById('avatar-upload');
    if (avatarUpload) {
        avatarUpload.addEventListener('change', function () {
            const file = avatarUpload.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    document.getElementById('profile-avatar').src = e.target.result;
                    // TODO: Upload avatar to server
                };
                reader.readAsDataURL(file);
            }
        });
    }
});
