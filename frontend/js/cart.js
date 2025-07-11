document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.querySelector('.cart-items');
    const totalPriceElement = document.getElementById('total-price');
    const checkoutBtn = document.querySelector('.checkout-btn');

    // --- Dark Mode Toggle Logic ---
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

    // --- User Authentication Check ---
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'signin.html';
        return;
    }

    // --- Fetch Cart Data from Backend ---
    async function fetchCart() {
        try {
            const response = await fetch('http://localhost:3000/api/cart', {
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
                throw new Error('Failed to fetch cart');
            }
            const cart = await response.json();
            renderCart(cart);
        } catch (error) {
            console.error('Error fetching cart:', error);
            // Ensure only the dynamic items are cleared, not the header or empty message
            const existingCartItems = cartItemsContainer.querySelectorAll('.cart-item');
            existingCartItems.forEach(item => item.remove());
            document.querySelector('.empty-cart-message').style.display = 'block';
            document.querySelector('.empty-cart-message p').textContent = 'Failed to load your cart. Please try again later.';
            totalPriceElement.textContent = '0.00';
        }
    }

    // --- Render Cart Items (FIXED for headers) ---
    function renderCart(cart) {
        // Select the header row and empty message elements
        const headerRow = cartItemsContainer.querySelector('.cart-header-row');
        const emptyCartMessageElement = cartItemsContainer.querySelector('.empty-cart-message');

        // Remove only the dynamically generated cart items, preserve header and empty message
        const existingCartItems = cartItemsContainer.querySelectorAll('.cart-item');
        existingCartItems.forEach(item => item.remove());

        if (!cart.items || cart.items.length === 0) {
            if (headerRow) headerRow.style.display = 'none'; // Hide header if cart is empty
            if (emptyCartMessageElement) {
                emptyCartMessageElement.style.display = 'block'; // Show empty message
                emptyCartMessageElement.querySelector('p').textContent = 'Your cart is currently empty.'; // Reset text
            }
            totalPriceElement.textContent = '0.00';
            return;
        } else {
            if (headerRow) headerRow.style.display = 'flex'; // Show header if items exist
            if (emptyCartMessageElement) emptyCartMessageElement.style.display = 'none'; // Hide empty message
        }

        cart.items.forEach(item => {
            const cartItemElement = document.createElement('div');
            cartItemElement.classList.add('cart-item');
            cartItemElement.dataset.bookId = item.book_id;
            cartItemElement.innerHTML = `
                <div class="item-details">
                    <img src="${item.image_url || 'https://placehold.co/80x100/cccccc/333333?text=Book'}" alt="${item.title}">
                    <div class="item-info">
                        <h3>${item.title}</h3>
                        <p class="author">${item.author || 'Unknown Author'}</p>
                    </div>
                </div>
                <div class="item-price">$${parseFloat(item.price).toFixed(2)}</div>
                <div class="quantity-controls">
                    <button class="quantity-btn minus-btn" data-id="${item.book_id}">-</button>
                    <input type="text" value="${item.quantity}" readonly>
                    <button class="quantity-btn plus-btn" data-id="${item.book_id}">+</button>
                </div>
                <div class="total-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
                <button class="remove-btn" data-id="${item.book_id}"><i class="fas fa-trash-alt"></i> Remove</button>
            `;
            // Insert new cart items *after* the header row and *before* the empty message
            // This ensures the header and empty message remain in their positions
            if (emptyCartMessageElement) {
                cartItemsContainer.insertBefore(cartItemElement, emptyCartMessageElement);
            } else {
                cartItemsContainer.appendChild(cartItemElement); // Fallback if empty message not found
            }
        });

        totalPriceElement.textContent = parseFloat(cart.total_amount).toFixed(2);
    }

    // --- Update Cart Item Quantity ---
    async function updateCartItem(bookId, quantity) {
        try {
            const response = await fetch('http://localhost:3000/api/cart/update', {
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
                    window.location.href = 'signin.html';
                    return;
                }
                throw new Error('Failed to update cart');
            }
            fetchCart();
        } catch (error) {
            console.error('Error updating cart item:', error);
        }
    }

    // --- Remove Cart Item ---
    async function removeCartItem(bookId) {
        try {
            const response = await fetch(`http://localhost:3000/api/cart/remove/${bookId}`, {
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
                throw new Error('Failed to remove item from cart');
            }
            fetchCart();
        } catch (error) {
            console.error('Error removing cart item:', error);
        }
    }

    // --- Event Listeners for Cart Actions ---
    cartItemsContainer.addEventListener('click', (e) => {
        const target = e.target;
        const bookId = target.dataset.id || target.closest('button')?.dataset.id;

        if (!bookId) return;

        if (target.classList.contains('plus-btn')) {
            const input = target.previousElementSibling;
            const newQuantity = parseInt(input.value) + 1;
            updateCartItem(bookId, newQuantity);
        } else if (target.classList.contains('minus-btn')) {
            const input = target.nextElementSibling;
            const newQuantity = parseInt(input.value) - 1;
            if (newQuantity > 0) {
                updateCartItem(bookId, newQuantity);
            } else {
                removeCartItem(bookId);
            }
        } else if (target.closest('.remove-btn')) {
            removeCartItem(bookId);
        }
    });

    // --- Checkout Button ---
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            alert('Checkout functionality is not yet implemented.');
        });
    }

    // Initial fetch of cart data when the page loads
    fetchCart();
});
