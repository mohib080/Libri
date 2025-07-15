document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.querySelector('.cart-items');
    const totalPriceElement = document.getElementById('total-price');
    const checkoutBtn = document.querySelector('.checkout-btn');

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

    function renderCart(cart) {
        const headerRow = cartItemsContainer.querySelector('.cart-header-row');
        const emptyCartMessageElement = cartItemsContainer.querySelector('.empty-cart-message');

        const existingCartItems = cartItemsContainer.querySelectorAll('.cart-item');
        existingCartItems.forEach(item => item.remove());

        if (!cart.items || cart.items.length === 0) {
            if (headerRow) headerRow.style.display = 'none';
            if (emptyCartMessageElement) {
                emptyCartMessageElement.style.display = 'block';
                emptyCartMessageElement.querySelector('p').textContent = 'Your cart is currently empty.';
            }
            totalPriceElement.textContent = '0.00';
            return;
        } else {
            if (headerRow) headerRow.style.display = 'flex';
            if (emptyCartMessageElement) emptyCartMessageElement.style.display = 'none';
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
            if (emptyCartMessageElement) {
                cartItemsContainer.insertBefore(cartItemElement, emptyCartMessageElement);
            } else {
                cartItemsContainer.appendChild(cartItemElement);
            }
        });

        totalPriceElement.textContent = parseFloat(cart.total_amount).toFixed(2);
    }

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

    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            alert('Checkout functionality is not yet implemented.');
        });
    }
    fetchCart();
});

// Add this to your existing cart.js file

// Checkout functionality
const checkoutBtn = document.querySelector('.checkout-btn');
if (checkoutBtn) {
    checkoutBtn.addEventListener('click', handleCheckout);
}

async function handleCheckout() {
    const token = getAuthToken();
    if (!token) {
        showNotification('Please sign in to checkout', 'error');
        setTimeout(() => {
            window.location.href = 'signin.html';
        }, 1500);
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/cart`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch cart');
        }

        const cart = await response.json();

        if (!cart.items || cart.items.length === 0) {
            showNotification('Your cart is empty', 'error');
            return;
        }

        // Show checkout modal or redirect to checkout page
        showCheckoutModal(cart);

    } catch (error) {
        console.error('Error during checkout:', error);
        showNotification('Failed to proceed to checkout', 'error');
    }
}

function showCheckoutModal(cart) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Checkout</h2>
                <button class="modal-close" onclick="closeCheckoutModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <form id="checkout-form">
                    <h3>Shipping Information</h3>
                    <div class="form-group">
                        <label for="shipping-address">Address:</label>
                        <input type="text" id="shipping-address" required>
                    </div>
                    <div class="form-group">
                        <label for="shipping-city">City:</label>
                        <input type="text" id="shipping-city" required>
                    </div>
                    <div class="form-group">
                        <label for="shipping-postal">Postal Code:</label>
                        <input type="text" id="shipping-postal" required>
                    </div>
                    <div class="form-group">
                        <label for="shipping-country">Country:</label>
                        <input type="text" id="shipping-country" required>
                    </div>
                    
                    <h3>Order Summary</h3>
                    <div class="order-summary">
                        ${cart.items.map(item => `
                            <div class="summary-item">
                                <span>${item.title} × ${item.quantity}</span>
                                <span>$${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        `).join('')}
                        <div class="summary-total">
                            <span><strong>Total: $${cart.total_amount}</strong></span>
                        </div>
                    </div>
                    
                    <div class="modal-actions">
                        <button type="button" class="btn-secondary" onclick="closeCheckoutModal()">Cancel</button>
                        <button type="submit" class="btn-primary">Place Order</button>
                    </div>
                </form>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    modal.classList.add('active');

    // Handle form submission
    document.getElementById('checkout-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        await processOrder(cart);
    });
}

async function processOrder(cart) {
    const token = getAuthToken();
    const shippingData = {
        address: document.getElementById('shipping-address').value,
        city: document.getElementById('shipping-city').value,
        postal_code: document.getElementById('shipping-postal').value,
        country: document.getElementById('shipping-country').value
    };

    try {
        const response = await fetch(`${API_BASE_URL}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                items: cart.items,
                shipping: shippingData,
                total_amount: cart.total_amount
            })
        });

        if (!response.ok) {
            throw new Error('Failed to create order');
        }

        const order = await response.json();

        showNotification('Order placed successfully!', 'success');
        closeCheckoutModal();

        // Redirect to orders page
        setTimeout(() => {
            window.location.href = 'orders.html';
        }, 1500);

    } catch (error) {
        console.error('Error creating order:', error);
        showNotification('Failed to place order', 'error');
    }
}

function closeCheckoutModal() {
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
        modal.remove();
    }
}

