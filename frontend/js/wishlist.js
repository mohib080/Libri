document.addEventListener('DOMContentLoaded', () => {
    const wishlistItemsContainer = document.querySelector('.wishlist-items');
    const wishlistItemCountElement = document.getElementById('wishlist-item-count');
    const clearWishlistBtn = document.querySelector('.clear-wishlist-btn');
    const notificationArea = document.getElementById('notification-area');
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

    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'signin.html';
        return;
    }

    const API_BASE_URL = 'http://localhost:3000/api';

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
    function renderWishlist(wishlist) {
        const headerRow = wishlistItemsContainer.querySelector('.wishlist-header-row');
        const emptyWishlistMessageElement = wishlistItemsContainer.querySelector('.empty-wishlist-message');

        const existingWishlistItems = wishlistItemsContainer.querySelectorAll('.wishlist-item');
        existingWishlistItems.forEach(item => item.remove());

        if (!wishlist.items || wishlist.items.length === 0) {
            if (headerRow) headerRow.style.display = 'none';
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

        wishlistItemCountElement.textContent = wishlist.items.length;
    }

    async function addToCartFromWishlist(bookId) {
        try {
            const response = await fetch(`${API_BASE_URL}/wishlist/move-to-cart`, {
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
            fetchWishlist();
        } catch (error) {
            console.error('Error moving item to cart from wishlist:', error);
            showNotification('Failed to move item to cart.', 'error');
        }
    }
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
                fetchWishlist();
            }
        } catch (error) {
            console.error('Error removing wishlist item:', error);
            showNotification('Failed to remove item from wishlist.', 'error');
        }
    }
    async function clearWishlist() {
        if (!confirm('Are you sure you want to clear your entire wishlist?')) {
            return;
        }
        try {
            const response = await fetch(`${API_BASE_URL}/wishlist/clear`, {
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
            fetchWishlist();
        } catch (error) {
            console.error('Error clearing wishlist:', error);
            showNotification('Failed to clear wishlist.', 'error');
        }
    }
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
    fetchWishlist();
});
