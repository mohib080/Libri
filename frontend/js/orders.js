document.addEventListener('DOMContentLoaded', () => {
    const API_BASE_URL = 'http://localhost:3000/api';
    const ordersListContainer = document.getElementById('orders-list');
    const emptyOrdersContainer = document.getElementById('empty-orders');
    const notificationArea = document.getElementById('notification-area');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    // Modal elements
    const orderModal = document.getElementById('order-modal-overlay');
    const orderModalBody = document.getElementById('order-modal-body');
    const orderModalClose = document.getElementById('modal-close-btn');
    const cancellationModal = document.getElementById('cancellation-modal-overlay');
    const cancellationForm = document.getElementById('cancellation-form');
    const cancellationModalClose = document.getElementById('cancellation-modal-close');
    const cancelCancellationBtn = document.getElementById('cancel-cancellation');
    
    let currentOrders = [];
    let currentFilter = 'all';
    let currentOrderIdForCancellation = null;

    // Authentication
    function getAuthToken() {
        return localStorage.getItem('token');
    }

    function checkAuthentication() {
        const token = getAuthToken();
        if (!token) {
            window.location.href = 'signin.html';
            return false;
        }
        return true;
    }

    // Notification system
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

    // Format date
    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    // Format currency
    function formatCurrency(amount) {
        return `$${parseFloat(amount).toFixed(2)}`;
    }

    // Get status badge HTML
    function getStatusBadge(status) {
        const statusClasses = {
            'pending': 'pending',
            'processing': 'processing',
            'shipped': 'shipped',
            'delivered': 'delivered',
            'cancelled': 'cancelled'
        };
        
        return `<span class="order-status ${statusClasses[status] || 'pending'}">${status}</span>`;
    }

    // Get order actions based on status
    function getOrderActions(order) {
        const actions = [];
        
        actions.push(`
            <button class="btn-primary" onclick="viewOrderDetails(${order.order_id})">
                <i class="fas fa-eye"></i> View Details
            </button>
        `);
        
        if (order.status === 'pending' || order.status === 'processing') {
            actions.push(`
                <button class="btn-danger" onclick="showCancellationModal(${order.order_id})">
                    <i class="fas fa-times"></i> Cancel Order
                </button>
            `);
        }
        
        if (order.status === 'shipped' && order.tracking_number) {
            actions.push(`
                <button class="btn-secondary" onclick="trackOrder('${order.tracking_number}')">
                    <i class="fas fa-truck"></i> Track Order
                </button>
            `);
        }
        
        return actions.join('');
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
            <div class="order-card">
                <div class="order-header">
                    <div class="order-info">
                        <h3>Order #${order.order_id}</h3>
                        <p>Placed on ${formatDate(order.order_date)}</p>
                    </div>
                    ${getStatusBadge(order.status)}
                </div>
                <div class="order-body">
                    <div class="order-items">
                        ${order.items.slice(0, 3).map(item => `
                            <div class="order-item">
                                <img src="${item.image_url || 'https://via.placeholder.com/60x80'}" 
                                     alt="${item.title}">
                                <div class="item-details">
                                    <h4>${item.title}</h4>
                                    <p>Quantity: ${item.quantity}</p>
                                </div>
                                <div class="item-price">${formatCurrency(item.item_price)}</div>
                            </div>
                        `).join('')}
                        ${order.items.length > 3 ? `
                            <div class="more-items">
                                <p>+ ${order.items.length - 3} more items</p>
                            </div>
                        ` : ''}
                    </div>
                    <div class="order-summary">
                        <div class="summary-row">
                            <span>Total Items:</span>
                            <span>${order.items.reduce((sum, item) => sum + item.quantity, 0)}</span>
                        </div>
                        <div class="summary-row">
                            <span>Total Amount:</span>
                            <span>${formatCurrency(order.total_amount)}</span>
                        </div>
                    </div>
                    <div class="order-actions">
                        ${getOrderActions(order)}
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Fetch orders
    async function fetchOrders() {
        const token = getAuthToken();
        if (!token) return;
        
        try {
            const response = await fetch(`${API_BASE_URL}/orders`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            if (!response.ok) {
                throw new Error('Failed to fetch orders');
            }
            
            const orders = await response.json();
            currentOrders = orders;
            filterOrders(currentFilter);
            
        } catch (error) {
            console.error('Error fetching orders:', error);
            showNotification('Failed to load orders', 'error');
        }
    }

    // Filter orders
    function filterOrders(status) {
        currentFilter = status;
        
        // Update active filter button
        filterButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.status === status) {
                btn.classList.add('active');
            }
        });
        
        // Filter orders
        let filteredOrders = currentOrders;
        if (status !== 'all') {
            filteredOrders = currentOrders.filter(order => order.status === status);
        }
        
        renderOrders(filteredOrders);
    }

    // View order details
    window.viewOrderDetails = async function(orderId) {
        const token = getAuthToken();
        if (!token) return;
        
        try {
            const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            if (!response.ok) {
                throw new Error('Failed to fetch order details');
            }
            
            const order = await response.json();
            
            orderModalBody.innerHTML = `
                <div class="order-details">
                    <div class="order-header-info">
                        <h3>Order #${order.order_id}</h3>
                        <p>Status: ${getStatusBadge(order.status)}</p>
                        <p>Placed on: ${formatDate(order.order_date)}</p>
                        ${order.tracking_number ? `<p>Tracking: ${order.tracking_number}</p>` : ''}
                    </div>
                    
                    <div class="order-items-details">
                        <h4>Items Ordered:</h4>
                        ${order.items.map(item => `
                            <div class="order-item">
                                <img src="${item.image_url || 'https://via.placeholder.com/60x80'}" 
                                     alt="${item.title}">
                                <div class="item-details">
                                    <h4>${item.title}</h4>
                                    <p>Quantity: ${item.quantity}</p>
                                    <p>Price: ${formatCurrency(item.item_price)}</p>
                                </div>
                                <div class="item-total">${formatCurrency(item.item_price * item.quantity)}</div>
                            </div>
                        `).join('')}
                    </div>
                    
                    <div class="order-summary">
                        <div class="summary-row">
                            <span>Subtotal:</span>
                            <span>${formatCurrency(order.total_amount)}</span>
                        </div>
                        <div class="summary-row">
                            <span>Shipping:</span>
                            <span>Free</span>
                        </div>
                        <div class="summary-row">
                            <span><strong>Total:</strong></span>
                            <span><strong>${formatCurrency(order.total_amount)}</strong></span>
                        </div>
                    </div>
                    
                    ${order.shipping ? `
                        <div class="shipping-info">
                            <h4>Shipping Information:</h4>
                            <p>${order.shipping.address}</p>
                            <p>${order.shipping.city}, ${order.shipping.postal_code}</p>
                            <p>${order.shipping.country}</p>
                            ${order.shipping.shipped_date ? `<p>Shipped: ${formatDate(order.shipping.shipped_date)}</p>` : ''}
                            ${order.shipping.delivery_estimate ? `<p>Estimated Delivery: ${formatDate(order.shipping.delivery_estimate)}</p>` : ''}
                        </div>
                    ` : ''}
                </div>
            `;
            
            orderModal.classList.add('active');
            
        } catch (error) {
            console.error('Error fetching order details:', error);
            showNotification('Failed to load order details', 'error');
        }
    };

    // Show cancellation modal
    window.showCancellationModal = function(orderId) {
        currentOrderIdForCancellation = orderId;
        cancellationModal.classList.add('active');
    };

    // Track order
    window.trackOrder = function(trackingNumber) {
        showNotification(`Tracking number: ${trackingNumber}`, 'info');
        // In a real app, this would redirect to a tracking page or API
    };

    // Handle order cancellation
    cancellationForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const reason = document.getElementById('cancellation-reason').value;
        const details = document.getElementById('cancellation-details').value;
        
        if (!reason) {
            showNotification('Please select a reason for cancellation', 'error');
            return;
        }
        
        const token = getAuthToken();
        if (!token) return;
        
        try {
            const response = await fetch(`${API_BASE_URL}/orders/${currentOrderIdForCancellation}/cancel`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    reason: reason,
                    details: details
                })
            });
            
            if (!response.ok) {
                throw new Error('Failed to cancel order');
            }
            
            showNotification('Order cancelled successfully', 'success');
            cancellationModal.classList.remove('active');
            
            // Reset form
            cancellationForm.reset();
            
            // Refresh orders
            fetchOrders();
            
        } catch (error) {
            console.error('Error cancelling order:', error);
            showNotification('Failed to cancel order', 'error');
        }
    });

    // Event listeners
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterOrders(btn.dataset.status);
        });
    });

    // Modal close handlers
    orderModalClose.addEventListener('click', () => {
        orderModal.classList.remove('active');
    });

    cancellationModalClose.addEventListener('click', () => {
        cancellationModal.classList.remove('active');
    });

    cancelCancellationBtn.addEventListener('click', () => {
        cancellationModal.classList.remove('active');
    });

    // Close modals when clicking outside
    [orderModal, cancellationModal].forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    });

    // Dark mode toggle
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark-mode') {
        body.classList.add('dark-mode');
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

    // Initialize
    if (checkAuthentication()) {
        fetchOrders();
    }
});
