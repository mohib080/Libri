// Global variables
let currentOrders = [];
let currentFilter = 'all';
const API_BASE_URL = 'http://localhost:3000/api';

// DOM elements - Updated to match your HTML structure
const ordersListContainer = document.getElementById('orders-list');
const emptyOrdersContainer = document.getElementById('empty-orders');
const orderModal = document.getElementById('order-modal-overlay');
const orderModalBody = document.getElementById('order-modal-body');
const orderModalClose = document.getElementById('modal-close-btn');
const cancellationModal = document.getElementById('cancellation-modal-overlay');
const cancellationModalClose = document.getElementById('cancellation-modal-close');
const cancelCancellationBtn = document.getElementById('cancel-cancellation');
const cancellationForm = document.getElementById('cancellation-form');
const cancellationReasonSelect = document.getElementById('cancellation-reason');
const cancellationDetailsTextarea = document.getElementById('cancellation-details');
const filterButtons = document.querySelectorAll('.filter-btn');
const notificationContainer = document.getElementById('notification-area');

// Current order ID being cancelled
let currentOrderIdToCancel = null;

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
        <span>${message}</span>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    if (notificationContainer) {
        notificationContainer.appendChild(notification);
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 5000);
    }
}

// Authentication helper
function getAuthToken() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'signin.html';
        return null;
    }
    return token;
}

// API call wrapper with error handling
async function handleApiCall(apiCall, errorMessage) {
    try {
        const response = await apiCall();
        if (!response.ok) {
            if (response.status === 401) {
                localStorage.removeItem('token');
                window.location.href = 'signin.html';
                return null;
            }
            throw new Error(`HTTP ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        showNotification(errorMessage, 'error');
        return null;
    }
}

// Fetch orders from API
async function fetchOrders() {
    const token = getAuthToken();
    if (!token) return;

    console.log('Fetching orders...'); // Debug log

    // Show loading state
    ordersListContainer.innerHTML = `
        <div class="loading-message">
            <i class="fas fa-spinner fa-spin"></i>
            <p>Loading your orders...</p>
        </div>
    `;

    try {
        const response = await fetch(`${API_BASE_URL}/orders`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        console.log('Response status:', response.status); // Debug log
        
        if (!response.ok) {
            console.error('Response not ok:', response.status, response.statusText);
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        console.log('Orders data received:', data); // Debug log

        if (data && data.length > 0) {
            currentOrders = data;
            filterOrders(currentFilter);
        } else {
            console.log('No orders found');
            renderOrders([]);
        }
    } catch (error) {
        console.error('Error fetching orders:', error);
        showNotification('Failed to load orders', 'error');
        
        // Show error state
        ordersListContainer.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-triangle"></i>
                <p>Failed to load orders. Please try again.</p>
                <button onclick="fetchOrders()" class="btn-primary">Retry</button>
            </div>
        `;
    }
}

// Utility functions
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

function getStatusBadge(status) {
    const statusMap = {
        pending: { text: 'Pending', class: 'pending' },
        processing: { text: 'Processing', class: 'processing' },
        shipped: { text: 'Shipped', class: 'shipped' },
        delivered: { text: 'Delivered', class: 'delivered' },
        cancelled: { text: 'Cancelled', class: 'cancelled' }
    };
    
    const statusInfo = statusMap[status] || { text: status, class: 'default' };
    return `<span class="status-badge ${statusInfo.class}">${statusInfo.text}</span>`;
}

function getOrderActions(order) {
    const actions = [];
    
    actions.push(`<button onclick="showOrderDetails(${order.order_id})" class="btn-outline">View Details</button>`);
    
    if (order.status === 'pending') {
        actions.push(`<button onclick="showCancelModal(${order.order_id})" class="btn-danger">Cancel Order</button>`);
    }
    
    if (order.status === 'delivered') {
        actions.push(`<button onclick="reorderItems(${order.order_id})" class="btn-primary">Reorder</button>`);
    }
    
    return actions.join(' ');
}

// Order filtering
function filterOrders(filter) {
    currentFilter = filter;
    
    // Update filter buttons
    filterButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.status === filter) {
            btn.classList.add('active');
        }
    });
    
    // Filter orders
    let filteredOrders = currentOrders;
    if (filter !== 'all') {
        filteredOrders = currentOrders.filter(order => order.status === filter);
    }
    
    renderOrders(filteredOrders);
}

// Render orders
function renderOrders(orders) {
    if (orders.length === 0) {
        ordersListContainer.style.display = 'none';
        emptyOrdersContainer.style.display = 'block';
        return;
    }

    ordersListContainer.style.display = 'block';
    emptyOrdersContainer.style.display = 'none';
    
    ordersListContainer.innerHTML = orders.map(order => `
        <div class="order-card" data-order-id="${order.order_id}">
            <div class="order-header">
                <div class="order-info">
                    <h3>Order #${order.order_id}</h3>
                    <p class="order-date">Placed on ${formatDate(order.order_date)}</p>
                </div>
                <div class="order-status">
                    ${getStatusBadge(order.status)}
                </div>
            </div>
            
            <div class="order-items">
                ${order.items.slice(0, 3).map(item => `
                    <div class="order-item">
                        <img src="${item.image_url}" alt="${item.title}" onerror="this.src='/images/default-book.jpg'">
                        <div class="item-details">
                            <h4>${item.title}</h4>
                            <p>Quantity: ${item.quantity}</p>
                            <p>Price: ${formatCurrency(item.item_price)}</p>
                        </div>
                    </div>
                `).join('')}
                ${order.items.length > 3 ? `
                    <div class="more-items">+ ${order.items.length - 3} more items</div>
                ` : ''}
            </div>
            
            <div class="order-summary">
                <div class="total-amount">
                    <strong>Total: ${formatCurrency(order.total_amount)}</strong>
                </div>
                <div class="order-actions">
                    ${getOrderActions(order)}
                </div>
            </div>
        </div>
    `).join('');
}

// Show order details modal
function showOrderDetails(orderId) {
    const order = currentOrders.find(o => o.order_id === orderId);
    if (!order) {
        showNotification('Order not found', 'error');
        return;
    }

    const modalContent = `
        <div class="order-details">
            <div class="order-summary-section">
                <h3>Order #${order.order_id}</h3>
                <div class="order-info-grid">
                    <div class="info-item">
                        <label>Status:</label>
                        <span>${getStatusBadge(order.status)}</span>
                    </div>
                    <div class="info-item">
                        <label>Order Date:</label>
                        <span>${formatDate(order.order_date)}</span>
                    </div>
                    <div class="info-item">
                        <label>Total Amount:</label>
                        <span>${formatCurrency(order.total_amount)}</span>
                    </div>
                    <div class="info-item">
                        <label>Shipping Method:</label>
                        <span>${order.shipping_method || 'Standard'}</span>
                    </div>
                    ${order.tracking_number ? `
                        <div class="info-item">
                            <label>Tracking Number:</label>
                            <span>${order.tracking_number}</span>
                        </div>
                    ` : ''}
                </div>
            </div>
            
            <div class="order-items-section">
                <h3>Items Ordered</h3>
                <div class="items-list">
                    ${order.items.map(item => `
                        <div class="item-row">
                            <img src="${item.image_url}" alt="${item.title}" onerror="this.src='/images/default-book.jpg'">
                            <div class="item-info">
                                <h4>${item.title}</h4>
                                <p>Quantity: ${item.quantity}</p>
                                <p>Price: ${formatCurrency(item.item_price)}</p>
                                <p><strong>Subtotal: ${formatCurrency(item.item_price * item.quantity)}</strong></p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            ${order.shipping ? `
                <div class="shipping-section">
                    <h3>Shipping Information</h3>
                    <div class="shipping-details">
                        <p><strong>Address:</strong> ${order.shipping.address}</p>
                        <p><strong>City:</strong> ${order.shipping.city}, ${order.shipping.postal_code}</p>
                        <p><strong>Country:</strong> ${order.shipping.country}</p>
                        ${order.shipping.shipped_date ? `
                            <p><strong>Shipped:</strong> ${formatDate(order.shipping.shipped_date)}</p>
                        ` : ''}
                        ${order.shipping.delivery_estimate ? `
                            <p><strong>Estimated Delivery:</strong> ${formatDate(order.shipping.delivery_estimate)}</p>
                        ` : ''}
                    </div>
                </div>
            ` : ''}
        </div>
    `;

    if (orderModalBody) {
        orderModalBody.innerHTML = modalContent;
        orderModal.style.display = 'flex';
    }
}

// Show cancel order modal
function showCancelModal(orderId) {
    const order = currentOrders.find(o => o.order_id === orderId);
    if (!order) {
        showNotification('Order not found', 'error');
        return;
    }

    if (order.status !== 'pending') {
        showNotification('Only pending orders can be cancelled', 'error');
        return;
    }

    currentOrderIdToCancel = orderId;
    
    // Reset form
    cancellationForm.reset();
    
    cancellationModal.style.display = 'flex';
}

// Cancel order
async function cancelOrder(orderId, reason, details) {
    const token = getAuthToken();
    if (!token) return;

    const data = await handleApiCall(
        () => fetch(`${API_BASE_URL}/orders/${orderId}/cancel`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ reason, details })
        }),
        'Failed to cancel order'
    );

    if (data) {
        showNotification('Order cancelled successfully', 'success');
        cancellationModal.style.display = 'none';
        currentOrderIdToCancel = null;
        await fetchOrders(); // Refresh orders list
    }
}

// Reorder items
async function reorderItems(orderId) {
    const token = getAuthToken();
    if (!token) return;

    const order = currentOrders.find(o => o.order_id === orderId);
    if (!order) {
        showNotification('Order not found', 'error');
        return;
    }

    try {
        // Add each item to cart
        for (const item of order.items) {
            const response = await fetch(`${API_BASE_URL}/cart/add`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    bookId: item.book_id,
                    quantity: item.quantity
                })
            });

            if (!response.ok) {
                throw new Error(`Failed to add ${item.title} to cart`);
            }
        }

        showNotification('Items added to cart successfully', 'success');
        
        // Redirect to cart page
        setTimeout(() => {
            window.location.href = 'cart.html';
        }, 1500);

    } catch (error) {
        console.error('Error reordering items:', error);
        showNotification('Some items could not be added to cart', 'error');
    }
}

// Initialize modal handlers
function initializeModalHandlers() {
    // Order details modal
    if (orderModalClose) {
        orderModalClose.addEventListener('click', () => {
            orderModal.style.display = 'none';
        });
    }

    // Cancel order modal
    if (cancellationModalClose) {
        cancellationModalClose.addEventListener('click', () => {
            cancellationModal.style.display = 'none';
        });
    }

    if (cancelCancellationBtn) {
        cancelCancellationBtn.addEventListener('click', () => {
            cancellationModal.style.display = 'none';
        });
    }

    // Cancellation form submission
    if (cancellationForm) {
        cancellationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const reason = cancellationReasonSelect.value;
            const details = cancellationDetailsTextarea.value;
            
            if (!reason) {
                showNotification('Please select a cancellation reason', 'error');
                return;
            }
            
            if (currentOrderIdToCancel) {
                cancelOrder(currentOrderIdToCancel, reason, details);
            }
        });
    }

    // Close modals when clicking outside
    window.addEventListener('click', (event) => {
        if (event.target === orderModal) {
            orderModal.style.display = 'none';
        }
        if (event.target === cancellationModal) {
            cancellationModal.style.display = 'none';
        }
    });
}

// Initialize filter buttons
function initializeFilterButtons() {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.status;
            filterOrders(filter);
        });
    });
}

// Initialize cart counter
async function updateCartCounter() {
    const token = getAuthToken();
    if (!token) return;

    try {
        const response = await fetch(`${API_BASE_URL}/cart`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.ok) {
            const cartData = await response.json();
            const cartCount = cartData.items.reduce((total, item) => total + item.quantity, 0);
            
            const cartCountElement = document.getElementById('cart-item-count');
            if (cartCountElement) {
                cartCountElement.textContent = cartCount;
            }
        }
    } catch (error) {
        console.error('Error updating cart counter:', error);
    }
}

// Initialize user menu
function initializeUserMenu() {
    const signoutLink = document.getElementById('signout-link');
    if (signoutLink) {
        signoutLink.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('token');
            window.location.href = 'signin.html';
        });
    }
}

// Initialize page
function initializePage() {
    // Check authentication
    if (!getAuthToken()) {
        return;
    }

    // Initialize all handlers
    initializeModalHandlers();
    initializeFilterButtons();
    initializeUserMenu();

    // Update cart counter
    updateCartCounter();

    // Load orders
    fetchOrders();
}

// Page load event
document.addEventListener('DOMContentLoaded', initializePage);

// Export functions for global access
window.showOrderDetails = showOrderDetails;
window.showCancelModal = showCancelModal;
window.reorderItems = reorderItems;
window.filterOrders = filterOrders;
window.fetchOrders = fetchOrders;
