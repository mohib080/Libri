const page = window.location.pathname.split('/').pop();
const isLoggedIn = !!localStorage.getItem('token');
// Redirect logic for user-specific pages if not logged in
if (!isLoggedIn && page !== 'index.html' && page !== 'signin.html' && page !== 'signup.html') {
    window.location.href = 'index.html';
}

const savedThemeOnLoad = localStorage.getItem("theme");
if (savedThemeOnLoad === "dark-mode") {
    document.body.classList.add("dark-mode");
} else if (savedThemeOnLoad === "light-mode") {
    document.body.classList.remove("dark-mode");
} else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.body.classList.add('dark-mode');
}

document.addEventListener('DOMContentLoaded', function () {
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    if (darkModeToggle) {
        if (document.body.classList.contains("dark-mode")) {
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }

        darkModeToggle.addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");
            if (document.body.classList.contains("dark-mode")) {
                darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
                localStorage.setItem("theme", "dark-mode");
            } else {
                darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
                localStorage.setItem("theme", "light-mode");
            }
        });
    }

    const profileContainer = document.querySelector('.profile-container');
    const adminBtn = document.getElementById('admin-btn'); // Get the admin button

    if (profileContainer) {
        const profileDropdown = profileContainer.querySelector('.profile-dropdown');

        if (profileDropdown) {
            // Attach mouseover and mouseout directly to the profileContainer
            profileContainer.addEventListener('mouseover', () => {
                profileDropdown.classList.add('active'); // Add the 'active' class to show dropdown
            });

            profileContainer.addEventListener('mouseout', () => {
                profileDropdown.classList.remove('active'); // Remove the 'active' class to hide dropdown
            });
        }

        const logoutLink = profileDropdown ? profileDropdown.querySelector('a[href="logout.html"]') : null;
        if (logoutLink) {
            logoutLink.addEventListener('click', function (e) {
                e.preventDefault(); // Prevent default link behavior
                localStorage.removeItem('token'); // Clear token
                localStorage.removeItem('customer'); // Clear customer data
                window.location.href = 'index.html'; // Redirect to home page
            });
        }
    }
    // Logout
    const logoutLink = document.getElementById('logout-link');
    if (logoutLink) {
        logoutLink.addEventListener('click', function (e) {
            e.preventDefault();
            localStorage.removeItem('token');
            localStorage.removeItem('customer');
            window.location.href = 'index.html';
        });
    }

    const API_BASE_URL = 'http://localhost:3000/api';
    const bookGrid = document.querySelector('.book-grid');
    const categorySelect = document.getElementById('category-select');
    const subCategorySelect = document.getElementById('subcategory-select');
    const clearFiltersBtn = document.getElementById('clear-filters-btn');
    const heroSearchBox = document.getElementById('hero-search-box');
    const cartNavBtn = document.getElementById('cart-nav-btn');
    const cartItemCountSpan = document.getElementById('cart-item-count');
    const notificationArea = document.getElementById('notification-area');

    // Notification elements
    const notificationBtn = document.getElementById('notification-btn');
    const notificationDropdown = document.getElementById('notification-dropdown');
    const notificationCount = document.getElementById('notification-count');
    const notificationList = document.getElementById('notification-list');
    const markAllReadBtn = document.getElementById('mark-all-read');

    if (cartNavBtn) {
        cartNavBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'cart.html';
        });
    }

    function getAuthToken() {
        return localStorage.getItem('token');
    }

    function showNotification(message, type = 'success') {
        if (!notificationArea) {
            console.warn('Notification area not found. Cannot display notification:', message);
            return;
        }
        const notification = document.createElement('div');
        notification.classList.add('notification', type);
        notification.textContent = message;
        notificationArea.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('hide');
            notification.addEventListener('transitionend', () => {
                notification.remove();
            }, { once: true });
        }, 3000);
    }

    async function updateCartCount() {
        if (!cartItemCountSpan) return;
        const token = getAuthToken();
        if (!token) {
            cartItemCountSpan.textContent = '0';
            cartNavBtn.setAttribute('data-cart-count', '0');
            return;
        }
        try {
            const response = await fetch(`${API_BASE_URL}/cart`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.ok) {
                const cartData = await response.json();
                const totalItems = cartData.items.reduce((sum, item) => sum + item.quantity, 0);
                cartItemCountSpan.textContent = totalItems;
                cartNavBtn.setAttribute('data-cart-count', totalItems.toString()); // Update data-attribute for CSS ::after
            } else {
                console.error('Failed to fetch cart for count update:', response.statusText);
                cartItemCountSpan.textContent = '0';
                cartNavBtn.setAttribute('data-cart-count', '0');
            }
        } catch (error) {
            console.error('Error updating cart count:', error);
            cartItemCountSpan.textContent = '0';
            cartNavBtn.setAttribute('data-cart-count', '0');
        }
    }

    async function updateWishlistCount() {
        const wishlistItemCountSpan = document.getElementById('wishlist-item-count');
        if (!wishlistItemCountSpan) return;
        const token = getAuthToken();
        if (!token) {
            wishlistItemCountSpan.textContent = '0';
            return;
        }
        try {
            const response = await fetch(`${API_BASE_URL}/wishlist`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.ok) {
                const wishlistData = await response.json();
                const totalItems = wishlistData.items.length;
                wishlistItemCountSpan.textContent = totalItems.toString();
            } else {
                console.error('Failed to fetch wishlist for count update:', response.statusText);
                wishlistItemCountSpan.textContent = '0';
            }
        } catch (error) {
            console.error('Error updating wishlist count:', error);
            wishlistItemCountSpan.textContent = '0';
        }
    }

    // --- NOTIFICATION SYSTEM ---
    async function updateNotificationCount() {
        const token = getAuthToken();
        if (!token || !notificationCount) return;

        try {
            const response = await fetch(`${API_BASE_URL}/user/notifications/count`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                const data = await response.json();
                const count = data.unreadCount;

                if (count > 0) {
                    notificationCount.textContent = count;
                    notificationCount.style.display = 'flex';
                } else {
                    notificationCount.style.display = 'none';
                }
            }
        } catch (error) {
            console.error('Error updating notification count:', error);
        }
    }

    async function loadNotifications() {
        const token = getAuthToken();
        if (!token || !notificationList) return;

        try {
            const response = await fetch(`${API_BASE_URL}/user/notifications`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                const notifications = await response.json();
                displayNotifications(notifications);
            }
        } catch (error) {
            console.error('Error loading notifications:', error);
            if (notificationList) {
                notificationList.innerHTML = '<div class="no-notifications">Error loading notifications</div>';
            }
        }
    }

    function displayNotifications(notifications) {
        if (!notificationList) return;

        if (notifications.length === 0) {
            notificationList.innerHTML = '<div class="no-notifications">No notifications yet</div>';
            if (markAllReadBtn) {
                markAllReadBtn.disabled = true;
                markAllReadBtn.classList.add('opacity-50', 'cursor-not-allowed');
            }
            return;
        }

        const hasUnread = notifications.some(n => !n.is_read);
        if (markAllReadBtn) {
            markAllReadBtn.disabled = !hasUnread;
            if (hasUnread) {
                markAllReadBtn.classList.remove('opacity-50', 'cursor-not-allowed');
            } else {
                markAllReadBtn.classList.add('opacity-50', 'cursor-not-allowed');
            }
        }

        notificationList.innerHTML = notifications.map(notification => `
            <div class="notification-item ${!notification.is_read ? 'unread' : ''}" data-id="${notification.notification_id}">
                <div class="notification-title">${notification.title}</div>
                <div class="notification-message">${notification.message}</div>
                <div class="notification-time">${new Date(notification.created_at).toLocaleString()}</div>
            </div>
        `).join('');

        // Add click handlers
        document.querySelectorAll('.notification-item').forEach(item => {
            item.addEventListener('click', async () => {
                const notificationId = item.dataset.id;
                await markNotificationAsRead(notificationId);
                item.classList.remove('unread');
                updateNotificationCount();

                // Check if we need to disable the button after marking one as read
                const remainingUnread = document.querySelectorAll('.notification-item.unread');
                if (remainingUnread.length === 0 && markAllReadBtn) {
                    markAllReadBtn.disabled = true;
                    markAllReadBtn.classList.add('opacity-50', 'cursor-not-allowed');
                }
            });
        });
    }

    async function markNotificationAsRead(notificationId) {
        const token = getAuthToken();
        if (!token) return;

        try {
            await fetch(`${API_BASE_URL}/user/notifications/${notificationId}/read`, {
                method: 'PUT',
                headers: { 'Authorization': `Bearer ${token}` }
            });
        } catch (error) {
            console.error('Error marking notification as read:', error);
        }
    }

    async function markAllNotificationsAsRead() {
        const token = getAuthToken();
        if (!token) return;

        try {
            // Hide count and disable button immediately
            if (notificationCount) {
                notificationCount.style.display = 'none';
            }
            if (markAllReadBtn) {
                markAllReadBtn.disabled = true;
                markAllReadBtn.classList.add('opacity-50', 'cursor-not-allowed');
            }

            // Mark all as read on server
            const notifications = document.querySelectorAll('.notification-item.unread');
            for (const item of notifications) {
                await markNotificationAsRead(item.dataset.id);
            }

            // Reload notifications
            loadNotifications();

        } catch (error) {
            console.error('Error marking all notifications as read:', error);
            updateNotificationCount(); // Restore count on error
        }
    }

    // Event listeners for notification system
    if (notificationBtn && notificationDropdown) {
        notificationBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isVisible = notificationDropdown.classList.contains('show');

            if (isVisible) {
                notificationDropdown.classList.remove('show');
            } else {
                notificationDropdown.classList.add('show');
                loadNotifications();
            }
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!notificationBtn.contains(e.target) && !notificationDropdown.contains(e.target)) {
                notificationDropdown.classList.remove('show');
            }
        });
    }

    if (markAllReadBtn) {
        markAllReadBtn.addEventListener('click', markAllNotificationsAsRead);
    }

    async function checkCartStatusForBooks() {
        const token = getAuthToken();
        if (!token) {
            console.log('Guest mode: Not checking cart status for books on user.html.');
            // Ensure buttons are enabled in guest mode
            document.querySelectorAll('.book-card .add-to-cart-btn').forEach(button => {
                button.textContent = 'Add to Cart';
                button.disabled = false;
                button.style.backgroundColor = '';
                button.style.background = '';
                button.style.cursor = '';
            });
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/cart`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                const cartData = await response.json();
                const cartBookIds = new Set(cartData.items.map(item => item.book_id));

                document.querySelectorAll('.book-card').forEach(bookCard => {
                    const addToCartBtn = bookCard.querySelector('.add-to-cart-btn');
                    if (addToCartBtn) { // Ensure button exists
                        const bookId = parseInt(addToCartBtn.dataset.bookId, 10);
                        if (cartBookIds.has(bookId)) {
                            addToCartBtn.textContent = 'In Cart';
                            addToCartBtn.disabled = true;
                            addToCartBtn.style.backgroundColor = '#6c757d'; // Grey out button
                            addToCartBtn.style.background = 'linear-gradient(45deg, #6c757d, #5a6268)'; // Grey gradient
                            addToCartBtn.style.cursor = 'not-allowed';
                        } else {
                            // Reset button if it was previously disabled (e.g., after removing from cart)
                            addToCartBtn.textContent = 'Add to Cart';
                            addToCartBtn.disabled = false;
                            addToCartBtn.style.backgroundColor = ''; // Reset styles
                            addToCartBtn.style.background = '';
                            addToCartBtn.style.cursor = '';
                        }
                    }
                });
            } else {
                console.error('Failed to fetch cart status for books:', response.status, response.statusText);
                // On error, ensure buttons are enabled for user to try again
                document.querySelectorAll('.book-card .add-to-cart-btn').forEach(button => {
                    button.textContent = 'Add to Cart';
                    button.disabled = false;
                    button.style.backgroundColor = '';
                    button.style.background = '';
                    button.style.cursor = '';
                });
            }
        } catch (error) {
            console.error('Error checking cart status for books:', error);
            // On network error, ensure buttons are enabled
            document.querySelectorAll('.book-card .add-to-cart-btn').forEach(button => {
                button.textContent = 'Add to Cart';
                button.disabled = false;
                button.style.backgroundColor = '';
                button.style.background = '';
                button.style.cursor = '';
            });
        }
    }

    // New function to check wishlist status for all displayed books
    async function checkWishlistStatusForBooks() {
        const token = getAuthToken();
        if (!token) {
            console.log('Guest mode: Not checking wishlist status for books on user.html.');
            // Ensure buttons are enabled in guest mode
            document.querySelectorAll('.book-card .add-to-wishlist-btn').forEach(button => {
                button.textContent = 'Add to Wishlist';
                button.disabled = false;
                button.style.backgroundColor = '';
                button.style.background = '';
                button.style.cursor = '';
            });
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/wishlist`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                const wishlistData = await response.json();
                const wishlistBookIds = new Set(wishlistData.items.map(item => item.book_id));

                document.querySelectorAll('.book-card').forEach(bookCard => {
                    const addToWishlistBtn = bookCard.querySelector('.add-to-wishlist-btn');
                    if (addToWishlistBtn) { // Ensure button exists
                        const bookId = parseInt(addToWishlistBtn.dataset.bookId, 10);
                        if (wishlistBookIds.has(bookId)) {
                            addToWishlistBtn.textContent = 'In Wishlist';
                            addToWishlistBtn.disabled = true;
                            addToWishlistBtn.style.backgroundColor = '#6c757d'; // Grey out button
                            addToWishlistBtn.style.background = 'linear-gradient(45deg, #6c757d, #5a6268)'; // Grey gradient
                            addToWishlistBtn.style.cursor = 'not-allowed';
                        } else {
                            // Reset button if it was previously disabled
                            addToWishlistBtn.textContent = 'Add to Wishlist';
                            addToWishlistBtn.disabled = false;
                            addToWishlistBtn.style.backgroundColor = ''; // Reset styles
                            addToWishlistBtn.style.background = '';
                            addToWishlistBtn.style.cursor = '';
                        }
                    }
                });
            } else {
                console.error('Failed to fetch wishlist status for books:', response.status, response.statusText);
                // On error, ensure buttons are enabled
                document.querySelectorAll('.book-card .add-to-wishlist-btn').forEach(button => {
                    button.textContent = 'Add to Wishlist';
                    button.disabled = false;
                    button.style.backgroundColor = '';
                    button.style.background = '';
                    button.style.cursor = '';
                });
            }
        } catch (error) {
            console.error('Error checking wishlist status for books:', error);
            // On network error, ensure buttons are enabled
            document.querySelectorAll('.book-card .add-to-wishlist-btn').forEach(button => {
                button.textContent = 'Add to Wishlist';
                button.disabled = false;
                button.style.backgroundColor = '';
                button.style.background = '';
                button.style.cursor = '';
            });
        }
    }

    async function addToCart(bookId, quantity = 1) {
        const token = getAuthToken();
        if (!token) {
            showNotification('Please log in to add items to your cart.', 'error');
            setTimeout(() => { window.location.href = 'signin.html'; }, 1500);
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/cart/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ bookId, quantity })
            });

            if (response.ok) {
                showNotification('Book added to cart successfully!', 'success');
                // Update the specific button that was clicked
                const clickedButton = document.querySelector(`.book-card button.add-to-cart-btn[data-book-id="${bookId}"]`);
                if (clickedButton) {
                    clickedButton.innerHTML = '<i class="fas fa-check-circle"></i> In Cart'; // Added icon
                    clickedButton.disabled = true;
                    clickedButton.style.backgroundColor = '#6c757d';
                    clickedButton.style.background = 'linear-gradient(45deg, #6c757d, #5a6268)'; // Grey gradient
                    clickedButton.style.cursor = 'not-allowed';
                }
                updateCartCount();
            } else if (response.status === 409) {
                showNotification('This book is already in your cart.', 'info');
                // Ensure button is disabled if it was a 409
                const clickedButton = document.querySelector(`.book-card button.add-to-cart-btn[data-book-id="${bookId}"]`);
                if (clickedButton) {
                    clickedButton.innerHTML = '<i class="fas fa-check-circle"></i> In Cart'; // Added icon
                    clickedButton.disabled = true;
                    clickedButton.style.backgroundColor = '#6c757d';
                    clickedButton.style.background = 'linear-gradient(45deg, #6c757d, #5a6268)'; // Grey gradient
                    clickedButton.style.cursor = 'not-allowed';
                }
            } else {
                const errorData = await response.json();
                showNotification(`Failed to add book to cart: ${errorData.error || 'Unknown error'}`, 'error');
                console.error('Failed to add to cart:', errorData.error || response.statusText);
            }
        } catch (error) {
            showNotification('An error occurred while adding to cart.', 'error');
            console.error('Error adding to cart:', error);
        }
    }

    // New: Add to Wishlist functionality
    async function addToWishlist(bookId) {
        const token = getAuthToken();
        if (!token) {
            showNotification('Please log in to add items to your wishlist.', 'error');
            setTimeout(() => { window.location.href = 'signin.html'; }, 1500);
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/wishlist/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ bookId })
            });

            if (response.ok) {
                showNotification('Book added to wishlist successfully!', 'success');
                const clickedButton = document.querySelector(`.book-card button.add-to-wishlist-btn[data-book-id="${bookId}"]`);
                if (clickedButton) {
                    clickedButton.innerHTML = '<i class="fas fa-check-circle"></i> In Wishlist'; // Added icon
                    clickedButton.disabled = true;
                    clickedButton.style.backgroundColor = '#6c757d';
                    clickedButton.style.background = 'linear-gradient(45deg, #6c757d, #5a6268)'; // Grey gradient
                    clickedButton.style.cursor = 'not-allowed';
                }
                updateWishlistCount();
            } else if (response.status === 409) {
                showNotification('This book is already in your wishlist.', 'info');
                const clickedButton = document.querySelector(`.book-card button.add-to-wishlist-btn[data-book-id="${bookId}"]`);
                if (clickedButton) {
                    clickedButton.innerHTML = '<i class="fas fa-check-circle"></i> In Wishlist'; // Added icon
                    clickedButton.disabled = true;
                    clickedButton.style.backgroundColor = '#6c757d';
                    clickedButton.style.background = 'linear-gradient(45deg, #6c757d, #5a6268)'; // Grey gradient
                    clickedButton.style.cursor = 'not-allowed';
                }
            } else {
                const errorData = await response.json();
                showNotification(`Failed to add book to wishlist: ${errorData.error || 'Unknown error'}`, 'error');
                console.error('Failed to add to wishlist:', errorData.error || response.statusText);
            }
        } catch (error) {
            showNotification('An error occurred while adding to wishlist.', 'error');
            console.error('Error adding to wishlist:', error);
        }
    }

    function displayBooks(books) {
        if (!bookGrid) return;
        bookGrid.innerHTML = '';
        if (books.length === 0) {
            bookGrid.innerHTML = '<p style="text-align: center; width: 100%; grid-column: 1 / -1; margin-top: 50px; font-size: 1.2rem; color: #555;">No books found matching your criteria.</p>';
            return;
        }
        books.forEach(book => {
            const bookCard = document.createElement('div');
            bookCard.classList.add('book-card');
            bookCard.innerHTML = `
                <a href="book-details.html?name=${encodeURIComponent(book.title)}" class="book-card-link">
                    <img src="${book.image_url || 'https://via.placeholder.co/180x260/cccccc/ffffff?text=No+Cover'}" alt="${book.title} Cover">
                    <h3>${book.title}</h3>
                    <p class="author">by ${book.author || 'Unknown Author'}</p>
                    <p class="price">$${parseFloat(book.price).toFixed(2)}</p>
                </a>
                <div class="book-actions">
                    <button class="add-to-cart-btn" data-book-id="${book.book_id}"><i class="fas fa-shopping-cart"></i> Add to Cart</button>
                    <button class="add-to-wishlist-btn" data-book-id="${book.book_id}"><i class="fas fa-heart"></i> Add to Wishlist</button>
                </div>
            `;
            const addToCartBtn = bookCard.querySelector('.add-to-cart-btn');
            if (addToCartBtn) {
                addToCartBtn.addEventListener('click', (event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    const bookId = parseInt(event.currentTarget.dataset.bookId, 10);
                    addToCart(bookId, 1);
                });
            }
            const addToWishlistBtn = bookCard.querySelector('.add-to-wishlist-btn');
            if (addToWishlistBtn) {
                addToWishlistBtn.addEventListener('click', (event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    const bookId = parseInt(event.currentTarget.dataset.bookId, 10);
                    addToWishlist(bookId);
                });
            }

            bookGrid.appendChild(bookCard);
        });
        // After displaying all books, check their cart and wishlist status
        checkCartStatusForBooks();
        checkWishlistStatusForBooks();
    }

    async function fetchBooks(searchTerm = '', categoryId = '', subCategoryId = '') {
        let url = `${API_BASE_URL}/books`;
        const params = new URLSearchParams();
        if (searchTerm) {
            params.append('q', searchTerm);
            url = `${API_BASE_URL}/books/search`;
        }
        if (categoryId) {
            params.append('categoryId', categoryId);
        }
        if (subCategoryId) {
            params.append('subCategoryId', subCategoryId);
        }
        if (params.toString()) {
            url += `?${params.toString()}`;
        }
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            displayBooks(data);
        } catch (error) {
            console.error('Error fetching data:', error);
            if (bookGrid) {
                bookGrid.innerHTML = '<p style="text-align: center; width: 100%; grid-column: 1 / -1; margin-top: 50px; font-size: 1.2rem; color: red;">Failed to load books. Please check server connection or filters.</p>';
            }
        }
    }

    async function fetchAndPopulateCategories() {
        if (!categorySelect) return;
        try {
            const response = await fetch(`${API_BASE_URL}/categories`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const categories = await response.json();
            categorySelect.innerHTML = '<option value="">All Categories</option>';
            categories.forEach(category => {
                const option = document.createElement('option');
                option.value = category.category_id;
                option.textContent = category.category_name;
                categorySelect.appendChild(option);
            });
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    }

    async function fetchAndPopulateSubcategories(categoryId) {
        if (!subCategorySelect) return;
        subCategorySelect.innerHTML = '<option value="">All Sub-Categories</option>';
        subCategorySelect.disabled = true;
        if (categoryId) {
            try {
                const response = await fetch(`${API_BASE_URL}/subcategories?categoryId=${categoryId}`);
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const subcategories = await response.json();
                subcategories.forEach(sub => {
                    const option = document.createElement('option');
                    option.value = sub.sub_category_id;
                    option.textContent = sub.sub_category_name;
                    subCategorySelect.appendChild(option);
                });
                subCategorySelect.disabled = false;
            } catch (error) {
                console.error('Error fetching subcategories:', error);
            }
        }
        applyFilters();
    }

    function applyFilters() {
        const selectedCategoryId = categorySelect ? categorySelect.value : '';
        const selectedSubCategoryId = subCategorySelect ? subCategorySelect.value : '';
        const currentSearchTerm = heroSearchBox ? heroSearchBox.value.trim() : '';
        fetchBooks(currentSearchTerm, selectedCategoryId, selectedSubCategoryId);
    }

    if (categorySelect) {
        categorySelect.addEventListener('change', () => {
            const selectedCategoryId = categorySelect.value;
            if (subCategorySelect) subCategorySelect.value = '';
            fetchAndPopulateSubcategories(selectedCategoryId);
        });
    }
    if (subCategorySelect) subCategorySelect.addEventListener('change', applyFilters);

    if (clearFiltersBtn) clearFiltersBtn.addEventListener('click', () => {
        if (categorySelect) categorySelect.value = '';
        if (subCategorySelect) {
            subCategorySelect.value = '';
            subCategorySelect.disabled = true;
        }
        if (heroSearchBox) heroSearchBox.value = '';
        fetchAndPopulateSubcategories('');
    });

    let searchTimeout;
    if (heroSearchBox) {
        heroSearchBox.addEventListener('input', () => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                applyFilters();
            }, 300);
        });
    }

    // Initialize all data and counters
    async function initializePageData() {
        await Promise.all([
            fetchBooks(),
            fetchAndPopulateCategories(),
            updateCartCount(),
            updateWishlistCount(),
            updateNotificationCount() // Add notification count to initialization
        ]);
    }

    initializePageData();

    // Check for new notifications periodically (every 30 seconds)
    if (getAuthToken()) {
        setInterval(updateNotificationCount, 30000);
    }

    const typingPlaceholder = document.getElementById('hero-search-box');
    const placeholderTexts = [
        "Search by Book Name...",
        "Search by Author Name...",
        "Try 'Atomic Habits' or 'J.K. Rowling'"
    ];
    let currentText = 0;
    let charIndex = 0;

    function typePlaceholder() {
        if (!typingPlaceholder) return;
        if (charIndex <= placeholderTexts[currentText].length) {
            typingPlaceholder.setAttribute("placeholder", placeholderTexts[currentText].substring(0, charIndex++));
            setTimeout(typePlaceholder, 80);
        } else {
            setTimeout(() => {
                charIndex = 0;
                currentText = (currentText + 1) % placeholderTexts.length;
                typePlaceholder();
            }, 2000);
        }
    }
    typePlaceholder();
});
