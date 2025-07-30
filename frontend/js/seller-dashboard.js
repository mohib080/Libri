document.addEventListener('DOMContentLoaded', () => {
    // --- AUTHENTICATION & SECURITY CHECK ---
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'seller-login.html';
        return;
    }

    // Decode token to ensure it's a seller
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        if (!payload.isSeller) {
            // If not a seller token, redirect
            window.location.href = 'seller-login.html';
            return;
        }
    } catch (e) {
        // If token is invalid, redirect
        window.location.href = 'seller-login.html';
        return;
    }

    // --- DOM ELEMENT REFERENCES ---
    const dashboardContent = document.getElementById('dashboard-content');
    const inventoryContent = document.getElementById('inventory-content');
    const ordersContent = document.getElementById('orders-content');
    const notificationsContent = document.getElementById('notifications-content');

    const totalSalesEl = document.querySelector('#dashboard-content .stat-card:nth-child(1) p');
    const totalOrdersEl = document.querySelector('#dashboard-content .stat-card:nth-child(2) p');
    const booksInStockEl = document.querySelector('#dashboard-content .stat-card:nth-child(3) p');
    const lowStockAlertsEl = document.querySelector('#dashboard-content .stat-card:nth-child(4) p');
    const recentOrdersTbody = document.querySelector('#dashboard-content table tbody');

    // --- NOTIFICATION VARIABLES ---
    let notificationPollingInterval;

    // --- NOTIFICATION SYSTEM FUNCTIONS (UNCHANGED) ---
    async function initializeNotifications() {
        await fetchNotificationCount();
        setupNotificationEventListeners();
    }

    function setupNotificationEventListeners() {
        const notificationsLink = document.getElementById('notifications-link');
        const notificationDropdown = document.getElementById('notificationDropdown');
        const markAllRead = document.getElementById('markAllRead');
        const markAllReadMain = document.getElementById('markAllReadMain'); // NEW: Main page button

        // Only show notification dropdown on click
        notificationsLink.addEventListener('click', async (e) => {
            e.preventDefault();
            e.stopPropagation();

            const isVisible = notificationDropdown.style.display === 'block';
            notificationDropdown.style.display = isVisible ? 'none' : 'block';

            if (!isVisible) {
                await fetchNotifications();
            }
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.notification-container')) {
                notificationDropdown.style.display = 'none';
            }
        });

        // Mark all notifications as read - Dropdown button
        if (markAllRead) {
            markAllRead.addEventListener('click', async (e) => {
                e.preventDefault();
                e.stopPropagation();

                try {
                    // Immediately update the badge to 0 for instant feedback
                    updateNotificationBadge(0);

                    const response = await fetch('/api/supplier/notifications/read-all', {
                        method: 'PUT',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    });

                    if (response.ok) {
                        // Refresh the notifications display
                        await fetchNotifications();
                        showToast('All notifications marked as read', 'success');
                    } else {
                        // If the API call failed, fetch the actual count to restore correct badge
                        await fetchNotificationCount();
                        showToast('Failed to mark notifications as read', 'error');
                    }
                } catch (error) {
                    console.error('Error marking all notifications as read:', error);
                    // If there was an error, fetch the actual count to restore correct badge
                    await fetchNotificationCount();
                    showToast('Error marking notifications as read', 'error');
                }
            });
        }

        // NEW: Mark all notifications as read - Main page button
        if (markAllReadMain) {
            markAllReadMain.addEventListener('click', async (e) => {
                e.preventDefault();

                try {
                    // Immediately update the badge to 0 for instant feedback
                    updateNotificationBadge(0);

                    const response = await fetch('/api/supplier/notifications/read-all', {
                        method: 'PUT',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    });

                    if (response.ok) {
                        // Refresh the notifications display
                        await loadAllNotifications();
                        showToast('All notifications marked as read', 'success');
                    } else {
                        // If the API call failed, fetch the actual count to restore correct badge
                        await fetchNotificationCount();
                        showToast('Failed to mark notifications as read', 'error');
                    }
                } catch (error) {
                    console.error('Error marking all notifications as read:', error);
                    // If there was an error, fetch the actual count to restore correct badge
                    await fetchNotificationCount();
                    showToast('Error marking notifications as read', 'error');
                }
            });
        }
    }

    async function fetchNotificationCount() {
        try {
            const response = await fetch('/api/supplier/notifications/count', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                updateNotificationBadge(data.unreadCount);
            }
        } catch (error) {
            console.error('Error fetching notification count:', error);
        }
    }

    async function fetchNotifications() {
        try {
            const response = await fetch('/api/supplier/notifications', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const notifications = await response.json();
                displayNotifications(notifications);
            } else {
                console.error('Failed to fetch notifications');
            }
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    }

    function updateNotificationBadge(count) {
        const badge = document.getElementById('notificationBadgeSidebar');
        if (count > 0) {
            badge.textContent = count > 99 ? '99+' : count;
            badge.style.display = 'flex';
        } else {
            badge.style.display = 'none';
        }
    }

    // MODIFIED: Enhanced notification display with support for review deletions
    function displayNotifications(notifications) {
        const notificationList = document.getElementById('notificationList');

        if (notifications.length === 0) {
            notificationList.innerHTML = `
                <div class="no-notifications">
                    No notifications yet
                </div>
            `;
            return;
        }

        const notificationsHTML = notifications.map(notification => {
            const timeAgo = formatTimeAgo(new Date(notification.created_at));
            const unreadClass = notification.is_read ? '' : 'unread';

            // Get notification icon based on type
            const notificationIcon = getNotificationIcon(notification.type);

            return `
                <div class="notification-item ${unreadClass}" onclick="handleNotificationClick(${notification.notification_id}, '${notification.type}', ${JSON.stringify(notification.data).replace(/"/g, '&quot;')})">
                    <div class="notification-header">
                        <span class="notification-icon ${notification.type}">${notificationIcon}</span>
                        <div class="notification-title">${escapeHtml(notification.title)}</div>
                        <div class="notification-time">${timeAgo}</div>
                    </div>
                    <div class="notification-message">${escapeHtml(notification.message)}</div>
                    ${renderNotificationDetails(notification)}
                </div>
            `;
        }).join('');

        notificationList.innerHTML = notificationsHTML;
    }

    // NEW: Function to get appropriate icon for notification type
    function getNotificationIcon(type) {
        const icons = {
            'new_review': '⭐',
            'review_deleted': '🗑️',
            'order': '📦',
            'low_stock': '⚠️',
            'default': '🔔'
        };
        return icons[type] || icons.default;
    }

    // NEW: Function to render notification details based on type
    function renderNotificationDetails(notification) {
        const data = notification.data || {};

        switch (notification.type) {
            case 'new_review':
                return `
                    <div class="notification-details">
                        ${data.book_title ? `<div class="detail-item"><strong>Book:</strong> ${escapeHtml(data.book_title)}</div>` : ''}
                        ${data.rating ? `<div class="detail-item"><strong>Rating:</strong> ${'★'.repeat(data.rating)}${'☆'.repeat(5 - data.rating)} (${data.rating}/5)</div>` : ''}
                        ${data.customer_name ? `<div class="detail-item"><strong>Customer:</strong> ${escapeHtml(data.customer_name)}</div>` : ''}
                        ${data.comment ? `<div class="detail-item review-comment"><strong>Comment:</strong> "${escapeHtml(data.comment)}"</div>` : ''}
                    </div>
                `;

            case 'review_deleted':
                return `
                    <div class="notification-details deleted-review">
                        ${data.book_title ? `<div class="detail-item"><strong>Book:</strong> ${escapeHtml(data.book_title)}</div>` : ''}
                        ${data.rating ? `<div class="detail-item deleted-rating"><strong>Deleted Rating:</strong> ${'★'.repeat(data.rating)}${'☆'.repeat(5 - data.rating)} (${data.rating}/5)</div>` : ''}
                        ${data.customer_name ? `<div class="detail-item"><strong>Customer:</strong> ${escapeHtml(data.customer_name)}</div>` : ''}
                        ${data.comment ? `<div class="detail-item deleted-comment"><strong>Deleted Comment:</strong> "${escapeHtml(data.comment)}"</div>` : ''}
                        ${data.deleted_date ? `<div class="detail-item deletion-info"><strong>Deleted on:</strong> ${formatTimeAgo(new Date(data.deleted_date))}</div>` : ''}
                    </div>
                `;

            default:
                if (data.book_title || data.customer_name) {
                    return `
                        <div class="notification-details">
                            ${data.book_title ? `<div class="detail-item"><strong>Book:</strong> ${escapeHtml(data.book_title)}</div>` : ''}
                            ${data.customer_name ? `<div class="detail-item"><strong>Customer:</strong> ${escapeHtml(data.customer_name)}</div>` : ''}
                        </div>
                    `;
                }
                return '';
        }
    }

    // MODIFIED: Enhanced notification click handler
    async function handleNotificationClick(notificationId, type, data) {
        // Mark notification as read
        await markNotificationAsRead(notificationId);

        // Handle different notification types
        switch (type) {
            case 'new_review':
                if (data && data.book_id) {
                    console.log('Navigate to book reviews:', data);
                    showToast(`New review for "${data.book_title}" - Rating: ${data.rating} stars`, 'info');
                }
                break;

            case 'review_deleted':
                if (data && data.book_id) {
                    console.log('Review deleted for book:', data);
                    showToast(`Review deleted for "${data.book_title}" - Was ${data.rating} stars`, 'warning');
                }
                break;

            default:
                console.log('Notification clicked:', type, data);
        }
    }

    async function markNotificationAsRead(notificationId) {
        try {
            const response = await fetch(`/api/supplier/notifications/${notificationId}/read`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                await fetchNotifications();
                await fetchNotificationCount();
            }
        } catch (error) {
            console.error('Error marking notification as read:', error);
        }
    }

    // MODIFIED: Enhanced full notifications page with review deletion support
    async function loadAllNotifications() {
        const container = document.getElementById('all-notifications-container');
        container.innerHTML = '<div class="loading">Loading all notifications...</div>';

        try {
            const response = await fetch('/api/supplier/notifications', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch notifications');
            }

            const notifications = await response.json();
            displayAllNotifications(notifications);
        } catch (error) {
            console.error('Error loading notifications:', error);
            container.innerHTML = '<div class="error">Failed to load notifications. Please try again.</div>';
        }
    }

    // MODIFIED: Enhanced display for all notifications
    function displayAllNotifications(notifications) {
        const container = document.getElementById('all-notifications-container');

        if (notifications.length === 0) {
            container.innerHTML = '<div class="no-notifications">No notifications yet.</div>';
            return;
        }

        // Group notifications by type for better organization
        const groupedNotifications = {
            review_deleted: [],
            new_review: [],
            other: []
        };

        notifications.forEach(notification => {
            if (groupedNotifications[notification.type]) {
                groupedNotifications[notification.type].push(notification);
            } else {
                groupedNotifications.other.push(notification);
            }
        });

        // Render notifications with priority (deleted reviews first, then new reviews, then others)
        const orderedNotifications = [
            ...groupedNotifications.review_deleted,
            ...groupedNotifications.new_review,
            ...groupedNotifications.other
        ];

        const notificationsHTML = orderedNotifications.map(notification => {
            const timeAgo = formatTimeAgo(new Date(notification.created_at));
            const unreadClass = notification.is_read ? '' : 'unread';
            const data = notification.data || {};
            const notificationIcon = getNotificationIcon(notification.type);

            return `
                <div class="notification-card ${unreadClass} ${notification.type}" onclick="handleNotificationClick(${notification.notification_id}, '${notification.type}', ${JSON.stringify(notification.data).replace(/"/g, '&quot;')})">
                    <div class="notification-card-header">
                        <div class="notification-card-icon">${notificationIcon}</div>
                        <div class="notification-card-title">${escapeHtml(notification.title)}</div>
                        <div class="notification-card-time">${timeAgo}</div>
                    </div>
                    <div class="notification-card-message">${escapeHtml(notification.message)}</div>
                    ${renderNotificationCardDetails(notification)}
                </div>
            `;
        }).join('');

        container.innerHTML = notificationsHTML;
    }

    // NEW: Function to render detailed notification card content
    function renderNotificationCardDetails(notification) {
        const data = notification.data || {};

        switch (notification.type) {
            case 'new_review':
                return `
                    <div class="notification-card-details">
                        ${data.book_title ? `<div class="detail-row"><strong>Book:</strong> ${escapeHtml(data.book_title)}</div>` : ''}
                        ${data.rating ? `<div class="detail-row"><strong>Rating:</strong> <span class="rating-stars">${'★'.repeat(data.rating)}${'☆'.repeat(5 - data.rating)}</span> (${data.rating}/5)</div>` : ''}
                        ${data.customer_name ? `<div class="detail-row"><strong>Customer:</strong> ${escapeHtml(data.customer_name)}</div>` : ''}
                        ${data.comment ? `<div class="detail-row review-comment-full"><strong>Comment:</strong><br>"${escapeHtml(data.comment)}"</div>` : ''}
                    </div>
                `;

            case 'review_deleted':
                return `
                    <div class="notification-card-details deleted-review-details">
                        ${data.book_title ? `<div class="detail-row"><strong>Book:</strong> ${escapeHtml(data.book_title)}</div>` : ''}
                        ${data.rating ? `<div class="detail-row"><strong>Deleted Rating:</strong> <span class="deleted-rating-stars">${'★'.repeat(data.rating)}${'☆'.repeat(5 - data.rating)}</span> (${data.rating}/5)</div>` : ''}
                        ${data.customer_name ? `<div class="detail-row"><strong>Customer:</strong> ${escapeHtml(data.customer_name)}</div>` : ''}
                        ${data.comment ? `<div class="detail-row deleted-comment-full"><strong>Deleted Comment:</strong><br><span class="deleted-text">"${escapeHtml(data.comment)}"</span></div>` : ''}
                        ${data.deleted_date ? `<div class="detail-row deletion-timestamp"><strong>Deleted on:</strong> ${new Date(data.deleted_date).toLocaleString()}</div>` : ''}
                    </div>
                `;

            default:
                if (data.book_title || data.customer_name) {
                    return `
                        <div class="notification-card-details">
                            ${data.book_title ? `<div class="detail-row"><strong>Book:</strong> ${escapeHtml(data.book_title)}</div>` : ''}
                            ${data.customer_name ? `<div class="detail-row"><strong>Customer:</strong> ${escapeHtml(data.customer_name)}</div>` : ''}
                        </div>
                    `;
                }
                return '';
        }
    }

    function formatTimeAgo(date) {
        const now = new Date();
        const diffInSeconds = Math.floor((now - date) / 1000);

        if (diffInSeconds < 60) return 'Just now';
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
        if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;

        return date.toLocaleDateString();
    }

    function escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, (m) => map[m]);
    }

    // Toast notification function
    function showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;

        Object.assign(toast.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '12px 20px',
            borderRadius: '4px',
            color: 'white',
            fontWeight: 'bold',
            zIndex: '10000',
            animation: 'slideIn 0.3s ease-out'
        });

        const colors = {
            success: '#28a745',
            error: '#dc3545',
            info: '#17a2b8',
            warning: '#ffc107'
        };
        toast.style.backgroundColor = colors[type] || colors.info;

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, 3000);
    }

    // --- API CALL TO FETCH DASHBOARD DATA (MODIFIED FOR LOW STOCK ALERTS) ---
    async function fetchDashboardData() {
        try {
            const response = await fetch('/api/seller/dashboard-stats', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Could not fetch dashboard data.');
            }

            const data = await response.json();
            updateDashboardUI(data);

        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        }
    }

    // --- UI UPDATE FUNCTIONS (MODIFIED FOR LOW STOCK ALERTS) ---
    function updateDashboardUI(data) {
        totalSalesEl.textContent = `$${data.totalSales.toFixed(2)}`;
        totalOrdersEl.textContent = data.totalOrders;
        booksInStockEl.textContent = data.booksInStock;
        lowStockAlertsEl.textContent = data.lowStockAlerts || 0; // Use actual count from API

        // Add visual indicators for low stock alerts
        if (data.lowStockAlerts > 0) {
            addLowStockIndicator(data.lowStockAlerts);
        } else {
            removeLowStockIndicator();
        }

        if (data.recentOrders.length === 0) {
            recentOrdersTbody.innerHTML = `<tr><td colspan="5" style="text-align:center;">No recent orders found.</td></tr>`;
        } else {
            recentOrdersTbody.innerHTML = data.recentOrders.map(order => `
                <tr>
                    <td>#ORD-${order.order_id}</td>
                    <td>${order.customer_name}</td>
                    <td>${order.book_title}</td>
                    <td>$${parseFloat(order.total).toFixed(2)}</td>
                    <td><span class="status-badge ${order.status.toLowerCase()}">${order.status}</span></td>
                </tr>
            `).join('');
        }
    }

    // --- LOW STOCK ALERT FUNCTIONS ---
    function addLowStockIndicator(count) {
        const lowStockCard = document.querySelector('#dashboard-content .stat-card:nth-child(4)');
        if (lowStockCard && count > 0) {
            // Remove any existing classes first
            lowStockCard.classList.remove('low-stock-warning', 'low-stock-critical', 'urgent-alert');

            // Add appropriate styling based on severity
            if (count >= 5) {
                lowStockCard.classList.add('low-stock-critical', 'urgent-alert');
            } else {
                lowStockCard.classList.add('low-stock-warning');
            }

            // Add click handler to show details
            if (!lowStockCard.hasAttribute('data-click-handler')) {
                lowStockCard.setAttribute('data-click-handler', 'true');
                lowStockCard.style.cursor = 'pointer';
                lowStockCard.addEventListener('click', showLowStockDetails);
            }
        }
    }

    function removeLowStockIndicator() {
        const lowStockCard = document.querySelector('#dashboard-content .stat-card:nth-child(4)');
        if (lowStockCard) {
            lowStockCard.classList.remove('low-stock-warning', 'low-stock-critical', 'urgent-alert');
            lowStockCard.style.cursor = 'default';
        }
    }

    // Function to show detailed low stock information
    async function showLowStockDetails() {
        try {
            const response = await fetch('/api/seller/low-stock-books', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const books = await response.json();
                displayLowStockModal(books);
            } else {
                showToast('Failed to fetch low stock details', 'error');
            }
        } catch (error) {
            console.error('Error fetching low stock books:', error);
            showToast('Error fetching low stock details', 'error');
        }
    }

    function displayLowStockModal(books) {
        if (books.length === 0) {
            showToast('No low stock items found', 'info');
            return;
        }

        const modalHTML = `
            <div id="lowStockModal" class="modal-overlay" onclick="closeLowStockModal(event)">
                <div class="modal-content" onclick="event.stopPropagation()">
                    <div class="modal-header">
                        <h3>Low Stock Alert (Stock < 5)</h3>
                        <button class="modal-close" onclick="closeLowStockModal()">&times;</button>
                    </div>
                    <div class="modal-body">
                        <div class="low-stock-list">
                            ${books.map(book => `
                                <div class="low-stock-item">
                                    <div class="book-info">
                                        <h4>${escapeHtml(book.title)}</h4>
                                        <p>by ${escapeHtml(book.authors || 'Unknown Author')}</p>
                                        <p class="format">${escapeHtml(book.format_name || 'N/A')}</p>
                                    </div>
                                    <div class="stock-info ${book.quantity_in_stock === 0 ? 'out-of-stock' : 'low-stock'}">
                                        <span class="stock-count">${book.quantity_in_stock}</span>
                                        <span class="stock-label">${book.quantity_in_stock === 0 ? 'Out of Stock' : 'In Stock'}</span>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    function closeLowStockModal(event) {
        if (event && event.target !== event.currentTarget) return;
        const modal = document.getElementById('lowStockModal');
        if (modal) {
            modal.remove();
        }
    }

    // --- SIDEBAR NAVIGATION LOGIC (UNCHANGED) ---
    function setupNavigation() {
        const navLinks = document.querySelectorAll('.sidebar-nav .nav-link');
        const contentSections = document.querySelectorAll('.main-content .content-section');

        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();

                // Handle active state for links
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');

                // Show the correct content section
                const targetId = `${link.id.split('-')[0]}-content`;
                contentSections.forEach(section => {
                    if (section.id === targetId) {
                        section.classList.remove('hidden');
                    } else {
                        section.classList.add('hidden');
                    }
                });

                // Special handling for the supply books link to navigate away
                if (link.id === 'supply-books-link') {
                    window.location.href = 'seller-form.html';
                }

                // Load specific content when sections are activated
                if (link.id === 'inventory-link') {
                    loadSuppliedBooks();
                } else if (link.id === 'orders-link') {
                    loadDeliveredBooksStats();
                } else if (link.id === 'notifications-link') {
                    loadAllNotifications();
                }
            });
        });
    }

    // --- YOUR ORIGINAL SUPPLIED BOOKS FUNCTIONS (UNCHANGED) ---
    async function loadSuppliedBooks() {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('/api/seller/supplied-books', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch supplied books');
            }

            const books = await response.json();
            displaySuppliedBooks(books);

        } catch (error) {
            console.error('Error loading supplied books:', error);
            document.getElementById('supplied-books-container').innerHTML =
                '<p class="error">Failed to load supplied books. Please try again.</p>';
        }
    }

    function displaySuppliedBooks(books) {
        const container = document.getElementById('supplied-books-container');

        if (books.length === 0) {
            container.innerHTML = '<p class="no-books">You haven\'t supplied any books yet.</p>';
            return;
        }

        const booksHTML = books.map(book => `
        <div class="book-card">
            <div class="book-image">
                <img src="${book.image_url || '/images/default-book.jpg'}" alt="${book.title}" />
            </div>
            <div class="book-details">
                <h3 class="book-title">${book.title}</h3>
                <p class="book-authors">by ${book.authors || 'Unknown Author'}</p>
                <p class="book-category">${book.category_name || 'N/A'} - ${book.sub_category_name || 'N/A'}</p>
                <div class="book-stats">
                    <span class="price">$${parseFloat(book.price).toFixed(2)}</span>
                    <span class="stock">Stock: ${book.total_stock}</span>
                    <span class="rating">★ ${book.average_rating} (${book.review_count} reviews)</span>
                </div>
                <div class="book-performance">
                    <span class="orders">Orders: ${book.total_orders}</span>
                    <span class="revenue">Format: ${book.format_name || 'N/A'}</span>
                </div>
                <div class="book-meta">
                    <p><strong>ISBN:</strong> ${book.isbn || 'N/A'}</p>
                    <p><strong>Publisher:</strong> ${book.publisher || 'N/A'}</p>
                    <p><strong>Published:</strong> ${book.publication_date ? new Date(book.publication_date).toLocaleDateString() : 'N/A'}</p>
                </div>
            </div>
        </div>
    `).join('');

        container.innerHTML = booksHTML;
    }

    // --- YOUR ORIGINAL DELIVERED BOOKS STATISTICS FUNCTIONS (UNCHANGED) ---
    async function loadDeliveredBooksStats() {
        console.log('Loading delivered books stats...');
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('/api/seller/delivered-books-stats', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch delivered books statistics');
            }

            const stats = await response.json();
            displayDeliveredBooksStats(stats);

        } catch (error) {
            console.error('Error loading delivered books stats:', error);
            document.getElementById('delivered-books-stats-container').innerHTML =
                '<p class="error">Failed to load delivered books statistics. Please try again.</p>';
        }
    }

    function displayDeliveredBooksStats(stats) {
        const container = document.getElementById('delivered-books-stats-container');

        if (stats.length === 0) {
            container.innerHTML = '<p class="no-stats">No delivered orders found for your books yet.</p>';
            return;
        }

        const statsHTML = stats.map(book => `
            <div class="stat-book-card">
                <div class="stat-book-image">
                    <img src="${book.image_url || '/images/default-book.jpg'}" alt="${book.title}" />
                </div>
                <div class="stat-book-details">
                    <h3 class="stat-book-title">${book.title}</h3>
                    <p class="stat-book-authors">by ${book.authors || 'Unknown Author'}</p>
                    <div class="stat-metrics">
                        <div class="metric">
                            <span class="metric-value">${book.delivered_orders}</span>
                            <span class="metric-label">Delivered Orders</span>
                        </div>
                        <div class="metric">
                            <span class="metric-value">${book.total_quantity_delivered}</span>
                            <span class="metric-label">Total Copies Sold</span>
                        </div>
                        <div class="metric">
                            <span class="metric-value">$${parseFloat(book.total_revenue_delivered).toFixed(2)}</span>
                            <span class="metric-label">Revenue from Delivered</span>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');

        container.innerHTML = statsHTML;
    }

    // Make functions globally available
    window.loadSuppliedBooks = loadSuppliedBooks;
    window.loadDeliveredBooksStats = loadDeliveredBooksStats;
    window.loadAllNotifications = loadAllNotifications;
    window.handleNotificationClick = handleNotificationClick;
    window.closeLowStockModal = closeLowStockModal;

    // Initialize everything
    fetchDashboardData();
    setupNavigation();
    initializeNotifications();

    notificationPollingInterval = setInterval(fetchNotificationCount, 30000);
    loadSuppliedBooks();

    window.addEventListener('beforeunload', () => {
        if (notificationPollingInterval) {
            clearInterval(notificationPollingInterval);
        }
    });
});
