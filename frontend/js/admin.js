document.addEventListener('DOMContentLoaded', () => {
    // --- Security Check ---
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'admin-login.html'; // Redirect to admin login if no token
        return;
    }

    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        // The isAdmin check is still good practice, even for an admin-only page
        if (!payload.isAdmin) {
            alert('Access Denied: Invalid or non-admin token.');
            window.location.href = 'admin-login.html';
            return;
        }
    } catch (e) {
        console.error('Invalid token:', e);
        localStorage.clear();
        window.location.href = 'admin-login.html';
        return;
    }

    // --- DOM Elements ---
    const links = {
        dashboard: document.getElementById('dashboard-link'),
        users: document.getElementById('users-link'),
        sellers: document.getElementById('sellers-link'), // Added sellers link
        books: document.getElementById('books-link'),
        orders: document.getElementById('orders-link'),
    };

    const sections = {
        dashboard: document.getElementById('dashboard-content'),
        users: document.getElementById('users-content'),
        sellers: document.getElementById('sellers-content'), // Added sellers section
        books: document.getElementById('books-content'),
        orders: document.getElementById('orders-content'),
    };

    const logoutButton = document.getElementById('logout-button');

    // --- Navigation Logic ---
    function showSection(sectionName) {
        Object.values(sections).forEach(section => section.classList.add('hidden'));
        Object.values(links).forEach(link => link.classList.remove('active'));

        sections[sectionName].classList.remove('hidden');
        links[sectionName].classList.add('active');
    }

    links.dashboard.addEventListener('click', (e) => { e.preventDefault(); showSection('dashboard'); loadDashboardData(); });
    links.users.addEventListener('click', (e) => { e.preventDefault(); showSection('users'); loadUsers(); });
    links.sellers.addEventListener('click', (e) => { e.preventDefault(); showSection('sellers'); loadSellers(); }); // Added listener
    links.books.addEventListener('click', (e) => { e.preventDefault(); showSection('books'); loadBooks(); });
    links.orders.addEventListener('click', (e) => { e.preventDefault(); showSection('orders'); loadOrders(); });

    logoutButton.addEventListener('click', () => {
        localStorage.clear();
        window.location.href = 'index.html';
    });

    // --- Data Fetching and Rendering ---

    async function loadDashboardData() {
        const headers = { 'Authorization': `Bearer ${token}` };
        try {
            const [usersRes, ordersRes, booksRes, salesRes] = await Promise.all([
                fetch('/api/admin/total-users', { headers }),
                fetch('/api/admin/total-orders', { headers }),
                fetch('/api/admin/total-books-in-stock', { headers }),
                fetch('/api/admin/total-sales', { headers }),
            ]);
            const usersData = await usersRes.json();
            const ordersData = await ordersRes.json();
            const booksData = await booksRes.json();
            const salesData = await salesRes.json();
            document.getElementById('total-users').textContent = (usersData.totalUsers ?? 'N/A').toLocaleString();
            document.getElementById('total-orders').textContent = (ordersData.totalOrders ?? 'N/A').toLocaleString();
            document.getElementById('total-books').textContent = (booksData.booksInStock ?? 'N/A').toLocaleString();
            document.getElementById('total-sales').textContent = '$' + (typeof salesData.totalSales === 'number' ? salesData.totalSales.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0.00');
        } catch (error) {
            console.error('Failed to load dashboard data:', error);
            ['total-users', 'total-orders', 'total-books', 'total-sales'].forEach(id => document.getElementById(id).textContent = 'N/A');
        }
    }

    // MODIFIED to load only customers
    async function loadUsers() {
        const usersTableBody = document.getElementById('users-table-body');
        usersTableBody.innerHTML = `<tr><td colspan="4" class="py-4 text-center text-gray-500">Loading customers...</td></tr>`;
        try {
            const response = await fetch('/api/admin/customers', { headers: { 'Authorization': `Bearer ${token}` } });
            if (!response.ok) throw new Error('Failed to fetch customers');
            const customers = await response.json();

            if (customers.length === 0) {
                usersTableBody.innerHTML = `<tr><td colspan="4" class="py-4 text-center text-gray-500">No customers found.</td></tr>`;
                return;
            }
            usersTableBody.innerHTML = customers.map(customer => `
                <tr>
                    <td class="font-mono text-gray-500">${customer.customer_id}</td>
                    <td class="font-semibold">${customer.name}</td>
                    <td>${customer.email}</td>
                    <td><button class="action-btn">Edit</button></td>
                </tr>
            `).join('');
        } catch (err) {
            usersTableBody.innerHTML = `<tr><td colspan="4" class="py-4 text-center text-red-600">${err.message}</td></tr>`;
        }
    }

    async function loadSellers() {
        const sellersTableBody = document.getElementById('sellers-table-body');
        sellersTableBody.innerHTML = `<tr><td colspan="4" class="py-4 text-center text-gray-500">Loading sellers...</td></tr>`;
        try {
            const response = await fetch('/api/admin/sellers', { headers: { 'Authorization': `Bearer ${token}` } });
            if (!response.ok) throw new Error('Failed to fetch sellers');
            const sellers = await response.json();

            if (sellers.length === 0) {
                sellersTableBody.innerHTML = `<tr><td colspan="4" class="py-4 text-center text-gray-500">No sellers found.</td></tr>`;
                return;
            }

            sellersTableBody.innerHTML = sellers.map(seller => `
            <tr>
                <td class="font-mono text-gray-500">${seller.supplier_id}</td>
                <td class="font-semibold">${seller.supplier_name}</td>
                <td>${seller.email}</td>
                <td><button class="action-btn">Edit</button></td>
            </tr>
        `).join('');
        } catch (err) {
            sellersTableBody.innerHTML = `<tr><td colspan="4" class="py-4 text-center text-red-600">${err.message}</td></tr>`;
        }
    }

    async function loadBooks() {
        const booksTableBody = document.getElementById('books-table-body');
        booksTableBody.innerHTML = `<tr><td colspan="10" class="py-4 text-center text-gray-500">Loading...</td></tr>`;
        try {
            const response = await fetch('/api/admin/books', { headers: { 'Authorization': `Bearer ${token}` } });
            if (!response.ok) throw new Error('Failed to fetch books from the server.');
            const books = await response.json();
            if (books.length === 0) {
                booksTableBody.innerHTML = `<tr><td colspan="10" class="py-4 text-center text-gray-500">No books found.</td></tr>`;
                return;
            }
            booksTableBody.innerHTML = books.map(book => `
                <tr>
                    <td class="font-mono text-gray-500">${book.book_id}</td><td class="book-title">${book.title}</td><td>${book.authors || 'N/A'}</td>
                    <td><span class="badge badge-category">${book.category_name || 'N/A'}</span></td><td><span class="badge badge-subcategory">${book.sub_category_name || 'N/A'}</span></td>
                    <td>$${Number(book.price).toFixed(2)}</td><td><span class="badge badge-stock ${book.total_stock > 0 ? 'in-stock' : 'out-of-stock'}">${book.total_stock ?? 0}</span></td>
                    <td><div class="rating-cell"><span>${Number(book.average_rating).toFixed(2)}</span><span class="star">★</span></div></td>
                    <td>${book.review_count ?? 0}</td><td><button class="action-btn">Edit</button></td>
                </tr>
            `).join('');
        } catch (err) {
            booksTableBody.innerHTML = `<tr><td colspan="10" class="py-4 text-center text-red-600">Error: ${err.message}</td></tr>`;
        }
    }

    async function loadOrders() {
        const ordersTableBody = document.getElementById('orders-table-body');
        ordersTableBody.innerHTML = `<tr><td colspan="6" class="py-4 text-center text-gray-500">Loading orders...</td></tr>`;
        const getStatusBadge = (status) => {
            status = status ? status.toLowerCase() : 'unknown';
            let classes = 'badge ';
            switch (status) {
                case 'completed': case 'shipped': classes += 'badge-status-completed'; break;
                case 'processing': classes += 'badge-status-processing'; break;
                case 'pending': classes += 'badge-status-pending'; break;
                case 'cancelled': classes += 'badge-status-cancelled'; break;
                default: classes += 'badge-status-default';
            }
            return `<span class="${classes}">${status.charAt(0).toUpperCase() + status.slice(1)}</span>`;
        };
        try {
            const response = await fetch('/api/admin/orders', { headers: { 'Authorization': `Bearer ${token}` } });
            if (!response.ok) throw new Error(`Server responded with status ${response.status}`);
            const orders = await response.json();
            if (orders.length === 0) {
                ordersTableBody.innerHTML = `<tr><td colspan="6" class="py-4 text-center text-gray-500">No orders found.</td></tr>`;
                return;
            }
            ordersTableBody.innerHTML = orders.map(order => `
                <tr>
                    <td class="font-mono text-gray-500">${order.order_id}</td><td class="font-semibold">${order.customer_name}</td>
                    <td>${new Date(order.order_date).toLocaleDateString()}</td><td class="font-medium">$${Number(order.total_amount).toFixed(2)}</td>
                    <td>${getStatusBadge(order.status)}</td><td><button class="action-btn">View</button></td>
                </tr>
            `).join('');
        } catch (err) {
            console.error('Failed to load orders:', err);
            ordersTableBody.innerHTML = `<tr><td colspan="6" class="py-4 text-center text-red-600">Error: ${err.message}</td></tr>`;
        }
    }

    // --- NOTIFICATION SYSTEM ---
    // Notification elements
    const notificationBtn = document.getElementById('notification-btn');
    const notificationDropdown = document.getElementById('notification-dropdown');
    const notificationBadge = document.getElementById('notification-badge');
    const notificationsList = document.getElementById('notifications-list');
    const markAllReadBtn = document.getElementById('mark-all-read');

    // Only initialize notification system if elements exist
    if (notificationBtn && notificationDropdown && notificationBadge && notificationsList && markAllReadBtn) {

        // Notification functions
        async function loadNotifications() {
            try {
                const response = await fetch('/api/admin/notifications', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (!response.ok) throw new Error('Failed to fetch notifications');
                const notifications = await response.json();

                displayNotifications(notifications);
                updateNotificationCount();
            } catch (err) {
                console.error('Error loading notifications:', err);
            }
        }

        async function updateNotificationCount() {
            try {
                const response = await fetch('/api/admin/notifications/count', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (!response.ok) throw new Error('Failed to fetch notification count');
                const data = await response.json();

                const count = data.unreadCount;
                if (count > 0) {
                    notificationBadge.textContent = count;
                    notificationBadge.classList.remove('hidden');
                } else {
                    notificationBadge.classList.add('hidden');
                }
            } catch (err) {
                console.error('Error updating notification count:', err);
            }
        }

        function displayNotifications(notifications) {
            if (notifications.length === 0) {
                notificationsList.innerHTML = '<div class="p-4 text-center text-gray-500">No notifications</div>';
                // Disable the button when there are no notifications
                markAllReadBtn.disabled = true;
                markAllReadBtn.classList.add('opacity-50', 'cursor-not-allowed');
                return;
            }

            // Check if there are any unread notifications
            const hasUnreadNotifications = notifications.some(notification => !notification.is_read);

            // Enable/disable the button based on unread notifications
            if (hasUnreadNotifications) {
                markAllReadBtn.disabled = false;
                markAllReadBtn.classList.remove('opacity-50', 'cursor-not-allowed');
            } else {
                markAllReadBtn.disabled = true;
                markAllReadBtn.classList.add('opacity-50', 'cursor-not-allowed');
            }

            notificationsList.innerHTML = notifications.map(notification => `
        <div class="notification-item ${!notification.is_read ? 'unread' : ''}" data-id="${notification.notification_id}">
            <div class="notification-title">${notification.title}</div>
            <div class="notification-message">${notification.message}</div>
            <div class="notification-time">${new Date(notification.created_at).toLocaleString()}</div>
        </div>
    `).join('');

            // Add click handlers to mark notifications as read
            document.querySelectorAll('.notification-item').forEach(item => {
                item.addEventListener('click', async () => {
                    const notificationId = item.dataset.id;
                    await markNotificationAsRead(notificationId);
                    item.classList.remove('unread');
                    updateNotificationCount();

                    // Check if we need to disable the button after marking one as read
                    const remainingUnread = document.querySelectorAll('.notification-item.unread');
                    if (remainingUnread.length === 0) {
                        markAllReadBtn.disabled = true;
                        markAllReadBtn.classList.add('opacity-50', 'cursor-not-allowed');
                    }
                });
            });
        }
        async function markNotificationAsRead(notificationId) {
            try {
                await fetch(`/api/admin/notifications/${notificationId}/read`, {
                    method: 'PUT',
                    headers: { 'Authorization': `Bearer ${token}` }
                });
            } catch (err) {
                console.error('Error marking notification as read:', err);
            }
        }

        async function markAllNotificationsAsRead() {
            try {
                // Immediately hide the badge and disable the button for instant feedback
                notificationBadge.classList.add('hidden');
                markAllReadBtn.disabled = true;
                markAllReadBtn.classList.add('opacity-50', 'cursor-not-allowed');

                await fetch('/api/admin/notifications/read-all', {
                    method: 'PUT',
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                // Update both the notification list AND the counter
                loadNotifications(); // Reload to update UI
                updateNotificationCount(); // Update the badge counter

            } catch (err) {
                console.error('Error marking all notifications as read:', err);
                // If there's an error, restore the badge and button state
                updateNotificationCount();
                loadNotifications(); // This will restore the correct button state
            }
        }



        // Event listeners
        notificationBtn.addEventListener('click', (e) => {
            e.preventDefault();
            notificationDropdown.classList.toggle('hidden');
            if (!notificationDropdown.classList.contains('hidden')) {
                loadNotifications();
            }
        });

        markAllReadBtn.addEventListener('click', markAllNotificationsAsRead);

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!notificationBtn.contains(e.target) && !notificationDropdown.contains(e.target)) {
                notificationDropdown.classList.add('hidden');
            }
        });

        // Load notifications on page load and periodically
        updateNotificationCount();
        setInterval(updateNotificationCount, 10000); // Check every 10 seconds

    } else {
        console.log('Notification elements not found - notification system disabled');
    }

    // Initial load
    showSection('dashboard');
    loadDashboardData();
});
