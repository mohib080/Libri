document.addEventListener('DOMContentLoaded', () => {
    const wishlistItemsContainer = document.querySelector('.wishlist-items');
    const wishlistItemCountElement = document.getElementById('wishlist-item-count');
    const clearWishlistBtn = document.querySelector('.clear-wishlist-btn');
    const notificationArea = document.getElementById('notification-area'); // Assuming you have this in wishlist.html

    // --- Dark Mode Toggle Logic (Copied from cart.js for consistency) ---
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
    // --- End Dark Mode Toggle Logic ---


    // --- User Authentication Check ---
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'signin.html'; // Redirect to signin if no token
        return;
    }

    const API_BASE_URL = 'http://localhost:3000/api'; // Define API base URL

    // Helper to show transient notifications
    function showNotification(message, type = 'success') {
        if (!notificationArea) return;
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

    // --- Fetch Wishlist Data from Backend ---
    async function fetchWishlist() {
        try {
            const response = await fetch(`${API_BASE_URL}/wishlist`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                if (response.status === 401 || response.status === 403) {
                    localStorage.removeItem('token');
                    window.location.href = 'signin.html';
                    return;
                }
                throw new Error('Failed to fetch wishlist');
            }
            const wishlist = await response.json();
            renderWishlist(wishlist);
        } catch (error) {
            console.error('Error fetching wishlist:', error);
            const existingWishlistItems = wishlistItemsContainer.querySelectorAll('.wishlist-item');
            existingWishlistItems.forEach(item => item.remove());
            document.querySelector('.empty-wishlist-message').style.display = 'block';
            document.querySelector('.empty-wishlist-message p').textContent = 'Failed to load your wishlist. Please try again later.';
            wishlistItemCountElement.textContent = '0';
        }
    }

    // --- Render Wishlist Items ---
    function renderWishlist(wishlist) {
        const headerRow = wishlistItemsContainer.querySelector('.wishlist-header-row');
        const emptyWishlistMessageElement = wishlistItemsContainer.querySelector('.empty-wishlist-message');

        // Remove only dynamically generated wishlist items, preserve header and empty message
        const existingWishlistItems = wishlistItemsContainer.querySelectorAll('.wishlist-item');
        existingWishlistItems.forEach(item => item.remove());

        if (!wishlist.items || wishlist.items.length === 0) {
            if (headerRow) headerRow.style.display = 'none'; // Hide header if wishlist is empty
            if (emptyWishlistMessageElement) {
                emptyWishlistMessageElement.style.display = 'block';
                emptyWishlistMessageElement.querySelector('p').textContent = 'Your wishlist is empty!';
            }
            wishlistItemCountElement.textContent = '0';
            return;
        } else {
            if (headerRow) headerRow.style.display = 'flex'; // Show header if items exist
            if (emptyWishlistMessageElement) emptyWishlistMessageElement.style.display = 'none';
        }

        wishlist.items.forEach(item => {
            const wishlistItemElement = document.createElement('div');
            wishlistItemElement.classList.add('wishlist-item');
            wishlistItemElement.dataset.bookId = item.book_id;
            wishlistItemElement.innerHTML = `
                <div class="item-details">
                    <img src="${item.image_url || 'https://placehold.co/80x100/cccccc/333333?text=Book'}" alt="${item.title}">
                    <div class="item-info">
                        <h3>${item.title}</h3>
                        <p class="author">${item.author || 'Unknown Author'}</p>
                    </div>
                </div>
                <div class="item-price">$${parseFloat(item.price).toFixed(2)}</div>
                <div class="wishlist-actions">
                    <button class="add-to-cart-from-wishlist-btn" data-id="${item.book_id}"><i class="fas fa-shopping-cart"></i> Add to Cart</button>
                    <button class="remove-wishlist-btn" data-id="${item.book_id}"><i class="fas fa-trash-alt"></i> Remove</button>
                </div>
            `;
            if (emptyWishlistMessageElement) {
                wishlistItemsContainer.insertBefore(wishlistItemElement, emptyWishlistMessageElement);
            } else {
                wishlistItemsContainer.appendChild(wishlistItemElement);
            }
        });

        wishlistItemCountElement.textContent = wishlist.items.length; // Display total number of items
    }

    // --- Add to Cart from Wishlist ---
    async function addToCartFromWishlist(bookId) {
        try {
            const response = await fetch(`${API_BASE_URL}/wishlist/move-to-cart`, { // Use the new move-to-cart endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ bookId })
            });
            if (!response.ok) {
                if (response.status === 401 || response.status === 403) {
                    localStorage.removeItem('token');
                    window.location.href = 'signin.html';
                    return;
                }
                throw new Error('Failed to move item to cart');
            }
            showNotification('Item moved to cart!', 'success');
            fetchWishlist(); // Re-fetch the wishlist to show updated state
        } catch (error) {
            console.error('Error moving item to cart from wishlist:', error);
            showNotification('Failed to move item to cart.', 'error');
        }
    }

    // --- Remove Item from Wishlist ---
    async function removeWishlistItem(bookId, refetch = true) {
        try {
            const response = await fetch(`${API_BASE_URL}/wishlist/remove/${bookId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                if (response.status === 401 || response.status === 403) {
                    localStorage.removeItem('token');
                    window.location.href = 'signin.html';
                    return;
                }
                throw new Error('Failed to remove item from wishlist');
            }
            showNotification('Item removed from wishlist.', 'success');
            if (refetch) {
                fetchWishlist(); // Re-fetch the wishlist to show updated state
            }
        } catch (error) {
            console.error('Error removing wishlist item:', error);
            showNotification('Failed to remove item from wishlist.', 'error');
        }
    }

    // --- Clear All Items from Wishlist ---
    async function clearWishlist() {
        if (!confirm('Are you sure you want to clear your entire wishlist?')) { // Use a custom modal in production
            return;
        }
        try {
            const response = await fetch(`${API_BASE_URL}/wishlist/clear`, { // Assuming a clear all endpoint
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                if (response.status === 401 || response.status === 403) {
                    localStorage.removeItem('token');
                    window.location.href = 'signin.html';
                    return;
                }
                throw new Error('Failed to clear wishlist');
            }
            showNotification('Wishlist cleared successfully!', 'success');
            fetchWishlist(); // Re-fetch to show empty state
        } catch (error) {
            console.error('Error clearing wishlist:', error);
            showNotification('Failed to clear wishlist.', 'error');
        }
    }

    // --- Event Listeners for Wishlist Actions ---
    wishlistItemsContainer.addEventListener('click', (e) => {
        const target = e.target;
        const bookId = target.dataset.id || target.closest('button')?.dataset.id;

        if (!bookId) return;

        if (target.closest('.add-to-cart-from-wishlist-btn')) {
            addToCartFromWishlist(bookId);
        } else if (target.closest('.remove-wishlist-btn')) {
            removeWishlistItem(bookId);
        }
    });

    if (clearWishlistBtn) {
        clearWishlistBtn.addEventListener('click', clearWishlist);
    }

    // Initial fetch of wishlist data when the page loads
    fetchWishlist();
});
