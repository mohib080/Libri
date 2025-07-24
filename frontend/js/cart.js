document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.querySelector('.cart-items');
    const totalPriceElement = document.getElementById('total-price');
    const itemsCountElement = document.getElementById('items-count');
    const checkoutBtn = document.getElementById('checkout-btn');
    const notificationArea = document.getElementById('notification-area');
    const API_BASE_URL = 'http://localhost:3000/api';

    // Authentication helpers
    function getAuthToken() {
        return localStorage.getItem('token');
    }

    function decodeToken(token) {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            return JSON.parse(jsonPayload);
        } catch (e) {
            console.error("Error decoding token:", e);
            return null;
        }
    }

    // Check authentication state
    const isLoggedIn = !!getAuthToken();
    let currentCustomerId = null;

    if (isLoggedIn) {
        const token = getAuthToken();
        const decodedUser = decodeToken(token);
        if (decodedUser && decodedUser.customerId) {
            currentCustomerId = decodedUser.customerId;
        }
    }

    // Redirect to signin if not logged in
    if (!isLoggedIn) {
        showNotification('Please sign in to view your cart', 'error');
        setTimeout(() => {
            window.location.href = 'signin.html';
        }, 2000);
        return;
    }

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

        setTimeout(() => {
            notification.classList.add('hide');
            notification.addEventListener('transitionend', () => {
                notification.remove();
            }, { once: true });
        }, 3000);
    }

    // Authentication UI Management
    function updateAuthenticationUI() {
        const signinLink = document.getElementById('signin-link');
        const signupLink = document.getElementById('signup-link');
        const signoutLink = document.getElementById('signout-link');
        const profileLink = document.getElementById('profile-link');
        const ordersLink = document.getElementById('orders-link');

        if (isLoggedIn) {
            if (signinLink) signinLink.style.display = 'none';
            if (signupLink) signupLink.style.display = 'none';
            if (signoutLink) signoutLink.style.display = 'block';
            if (profileLink) profileLink.style.display = 'block';
            if (ordersLink) ordersLink.style.display = 'block';
        } else {
            if (signinLink) signinLink.style.display = 'block';
            if (signupLink) signupLink.style.display = 'block';
            if (signoutLink) signoutLink.style.display = 'none';
            if (profileLink) profileLink.style.display = 'none';
            if (ordersLink) ordersLink.style.display = 'none';
        }
    }

    // Sign out functionality
    function handleSignOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('customer');
        showNotification('Successfully signed out', 'success');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    }

    // Dark mode functionality
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === "dark-mode") {
        body.classList.add("dark-mode");
    } else if (savedTheme === "light-mode") {
        body.classList.remove("dark-mode");
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        body.classList.add('dark-mode');
    }

    if (darkModeToggle) {
        if (body.classList.contains('dark-mode')) {
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }

        darkModeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            if (body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark-mode');
                darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            } else {
                localStorage.setItem('theme', 'light-mode');
                darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            }
        });
    }

    // Header button functionality
    const wishlistBtn = document.querySelector('.icon-btn[href="wishlist.html"]');
    const profileLink = document.getElementById('profile-link');
    const ordersLink = document.getElementById('orders-link');
    const signoutLink = document.getElementById('signout-link');

    if (wishlistBtn) {
        wishlistBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'wishlist.html';
        });
    }

    if (profileLink) {
        profileLink.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'profile.html';
        });
    }

    if (ordersLink) {
        ordersLink.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'orders.html';
        });
    }

    if (signoutLink) {
        signoutLink.addEventListener('click', (e) => {
            e.preventDefault();
            handleSignOut();
        });
    }

    // Cart functionality
    async function fetchCart() {
        try {
            const token = getAuthToken();
            const response = await fetch(`${API_BASE_URL}/cart`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                if (response.status === 401 || response.status === 403) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('customer');
                    showNotification('Session expired. Please sign in again', 'error');
                    setTimeout(() => {
                        window.location.href = 'signin.html';
                    }, 2000);
                    return;
                }
                throw new Error('Failed to fetch cart');
            }

            const cart = await response.json();
            renderCart(cart);
        } catch (error) {
            console.error('Error fetching cart:', error);
            showNotification('Failed to load cart. Please try again.', 'error');
            displayEmptyCart();
        }
    }

    function renderCart(cart) {
        const headerRow = cartItemsContainer.querySelector('.cart-header-row');
        const emptyCartMessageElement = cartItemsContainer.querySelector('.empty-cart-message');

        // Clear existing cart items, but keep the header and empty message
        const existingCartItems = cartItemsContainer.querySelectorAll('.cart-item');
        existingCartItems.forEach(item => item.remove());

        if (!cart.items || cart.items.length === 0) {
            displayEmptyCart();
            return;
        }

        // Show header and hide empty message
        if (headerRow) headerRow.style.display = 'flex';
        if (emptyCartMessageElement) emptyCartMessageElement.style.display = 'none';

        // Render cart items
        cart.items.forEach(item => {
            const cartItemElement = document.createElement('div');
            cartItemElement.classList.add('cart-item');
            cartItemElement.dataset.bookId = item.book_id;

            cartItemElement.innerHTML = `
                <div class="item-details">
                    <img src="${item.image_url || 'https://via.placeholder.com/80x100/cccccc/333333?text=Book'}" alt="${item.title}">
                    <div class="item-info">
                        <h3>${item.title}</h3>
                        <p class="author">by ${item.author || 'Unknown Author'}</p>
                        <button class="view-details-btn" onclick="window.location.href='book-details.html?name=${encodeURIComponent(item.title)}'">
                            <i class="fas fa-eye"></i> View Details
                        </button>
                        <div class="format-selection">
                            <select class="format-select" data-book-id="${item.book_id}">
                                <option value="1" ${item.format_id == 1 ? 'selected' : ''}>Paperback</option>
                                <option value="2" ${item.format_id == 2 ? 'selected' : ''}>Hardcover</option>
                                <option value="3" ${item.format_id == 3 ? 'selected' : ''}>E-book</option>
                            </select>
                            <span class="current-format">${item.format_name || 'Hardcover'}</span>
                        </div>
                    </div>
                </div>
                <div class="item-price">$${parseFloat(item.price * item.factor).toFixed(2)}</div>
                <div class="quantity-controls">
                    <button class="quantity-btn minus-btn" data-id="${item.book_id}">
                        <i class="fas fa-minus"></i>
                    </button>
                    <input type="number" value="${item.quantity}" min="1" max="99" readonly>
                    <button class="quantity-btn plus-btn" data-id="${item.book_id}">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
                <div class="total-item-price">$${parseFloat(item.total_item_price).toFixed(2)}</div>
                <button class="remove-btn" data-id="${item.book_id}">
                    <i class="fas fa-trash-alt"></i> Remove
                </button>
            `;

            if (emptyCartMessageElement) {
                cartItemsContainer.insertBefore(cartItemElement, emptyCartMessageElement);
            } else {
                cartItemsContainer.appendChild(cartItemElement);
            }
        });

        // Update totals
        updateCartSummary(cart);
    }

    function displayEmptyCart() {
        const headerRow = cartItemsContainer.querySelector('.cart-header-row');
        const emptyCartMessageElement = cartItemsContainer.querySelector('.empty-cart-message');

        if (headerRow) headerRow.style.display = 'none';
        if (emptyCartMessageElement) {
            emptyCartMessageElement.style.display = 'block';
        }

        updateCartSummary({ items: [], total_amount: '0.00' });
    }

    function updateCartSummary(cart) {
        const totalAmount = parseFloat(cart.total_amount || 0);
        const totalItems = cart.items ? cart.items.reduce((sum, item) => sum + item.quantity, 0) : 0;

        totalPriceElement.textContent = totalAmount.toFixed(2);
        itemsCountElement.textContent = totalItems;

        // Update cart count in header
        const cartCountElement = document.getElementById('cart-item-count');
        if (cartCountElement) {
            cartCountElement.textContent = totalItems;
        }

        // Enable/disable checkout button
        if (checkoutBtn) {
            checkoutBtn.disabled = totalItems === 0;
            checkoutBtn.style.opacity = totalItems === 0 ? '0.5' : '1';
        }
    }

    // NEW: Function to update cart item format
    async function updateCartItemFormat(bookId, formatId) {
        try {
            const token = getAuthToken();
            const response = await fetch(`${API_BASE_URL}/cart/update-format`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ bookId, formatId })
            });

            if (!response.ok) {
                if (response.status === 401 || response.status === 403) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('customer');
                    showNotification('Session expired. Please sign in again', 'error');
                    setTimeout(() => {
                        window.location.href = 'signin.html';
                    }, 2000);
                    return;
                }
                throw new Error('Failed to update format');
            }

            showNotification('Format updated successfully!', 'success');
            // Re-fetch cart to get updated prices and format info
            fetchCart();
        } catch (error) {
            console.error('Error updating format:', error);
            showNotification('Failed to update format. Please try again.', 'error');
        }
    }

    async function updateCartItem(bookId, quantity) {
        try {
            const token = getAuthToken();
            const response = await fetch(`${API_BASE_URL}/cart/update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ bookId, quantity })
            });

            if (!response.ok) {
                if (response.status === 401 || response.status === 403) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('customer');
                    showNotification('Session expired. Please sign in again', 'error');
                    setTimeout(() => {
                        window.location.href = 'signin.html';
                    }, 2000);
                    return;
                }
                throw new Error('Failed to update cart');
            }

            showNotification('Cart updated successfully!', 'success');
            fetchCart();
        } catch (error) {
            console.error('Error updating cart item:', error);
            showNotification('Failed to update cart. Please try again.', 'error');
        }
    }

    async function removeCartItem(bookId) {
        try {
            const token = getAuthToken();
            const response = await fetch(`${API_BASE_URL}/cart/remove/${bookId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                if (response.status === 401 || response.status === 403) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('customer');
                    showNotification('Session expired. Please sign in again', 'error');
                    setTimeout(() => {
                        window.location.href = 'signin.html';
                    }, 2000);
                    return;
                }
                throw new Error('Failed to remove item from cart');
            }

            showNotification('Item removed from cart successfully!', 'success');
            fetchCart(); // Re-fetch cart to update display
        } catch (error) {
            console.error('Error removing cart item:', error);
            showNotification('Failed to remove item. Please try again.', 'error');
        }
    }

    // Cart event listeners
    cartItemsContainer.addEventListener('click', (e) => {
        const target = e.target.closest('button');
        if (!target) return;

        const bookId = target.dataset.id;
        if (!bookId) return;

        if (target.classList.contains('plus-btn')) {
            const input = target.previousElementSibling;
            const newQuantity = parseInt(input.value) + 1;
            if (newQuantity <= 99) {
                updateCartItem(bookId, newQuantity);
            }
        } else if (target.classList.contains('minus-btn')) {
            const input = target.nextElementSibling;
            const newQuantity = parseInt(input.value) - 1;
            if (newQuantity > 0) {
                updateCartItem(bookId, newQuantity);
            } else {
                showNotification('Click "Remove" to delete this item.', 'info');
            }
        } else if (target.classList.contains('remove-btn')) {
            showNotification('Removing item...', 'info');
            removeCartItem(bookId);
        }
    });

    // UPDATED: Event listener for format selection change
    cartItemsContainer.addEventListener('change', (e) => {
        const target = e.target;
        if (target.classList.contains('format-select')) {
            const bookId = target.dataset.bookId;
            const formatId = parseInt(target.value);

            // Update format in backend and refresh cart
            updateCartItemFormat(bookId, formatId);
        }
    });

    // Checkout functionality
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', async () => {
            const token = getAuthToken();

            if (!token) {
                showNotification('Please sign in to proceed with checkout', 'error');
                setTimeout(() => {
                    window.location.href = 'signin.html';
                }, 1500);
                return;
            }

            try {
                // Store cart data in localStorage for shipping page
                const cartItems = Array.from(cartItemsContainer.querySelectorAll('.cart-item')).map(item => ({
                    bookId: item.dataset.bookId,
                    title: item.querySelector('.item-info h3').textContent,
                    quantity: parseInt(item.querySelector('.quantity-controls input').value),
                    price: parseFloat(item.querySelector('.item-price').textContent.replace('$', '')),
                    formatId: parseInt(item.querySelector('.format-select').value),
                    formatName: item.querySelector('.format-select option:checked').textContent
                }));

                localStorage.setItem('checkoutData', JSON.stringify({
                    items: cartItems,
                    totalAmount: parseFloat(totalPriceElement.textContent),
                    itemsCount: parseInt(itemsCountElement.textContent)
                }));

                // Redirect to shipping page
                window.location.href = 'shipping.html';

            } catch (error) {
                console.error('Error preparing checkout:', error);
                showNotification('Failed to proceed to checkout. Please try again.', 'error');
            }
        });
    }

    // Initialize
    updateAuthenticationUI();
    fetchCart();
});
