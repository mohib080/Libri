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

    //--- BOOK EDIT MODAL UTIL ---
    function ensureAdminBookEditModal() {
        if (!document.getElementById('admin-book-edit-modal')) {
            const mdl = document.createElement('div');
            mdl.innerHTML = `
<div id="admin-book-edit-modal" class="modal hidden">
    <div class="modal-content" id="admin-book-edit-content">
        <!-- Will be filled by JS -->
    </div>
</div>
<style>
.modal { display: none; position:fixed; left:0; top:0; width:100%; height:100%; z-index: 999; background: rgba(0,0,0,0.42); }
.modal.visible { display:block; }
.modal-content { background: #fff; max-width:540px; margin:80px auto; padding:30px; border-radius:6px; position:relative; }
.modal-content .close-btn { position:absolute; right:20px; top:10px; cursor:pointer; font-size:22px; }
.modal-content h2 {margin-top:0;}
.review-row { border-bottom:1px solid #ececec; margin-bottom:10px; padding:5px 0;}
.review-actions { float:right; }
.feature-possible { color:green; font-size:13px; }
.feature-disabled { color:#b22; font-size:13px;}
</style>
            `;
            document.body.appendChild(mdl);
        }
    }

    function openEditBookModal(bookId) {
        ensureAdminBookEditModal();
        const token = localStorage.getItem('token');
        const modal = document.getElementById('admin-book-edit-modal');
        const content = document.getElementById('admin-book-edit-content');
        content.innerHTML = '<div style="text-align:center;"><em>Loading...</em></div>';
        modal.classList.add('visible');
        modal.classList.remove('hidden');

        fetch(`/api/admin/books/${bookId}`, { headers: { Authorization: `Bearer ${token}` } })
            .then(r => r.json())
            .then(book => {
                if (book.error) throw new Error(book.error);

                content.innerHTML = `
                    <span class="close-btn" onclick="closeEditBookModal()">&times;</span>
                    <h2>${book.title}</h2>
                    <p><b>Book ID:</b> ${book.book_id}</p>
                    <p><b>Authors:</b> ${book.authors}</p>
                    <p><b>Category:</b> ${book.category_name || ''} - ${book.sub_category_name || ''}</p>
                    <p><b>ISBN:</b> ${book.isbn || ''}</p>
                    <p><b>Publisher:</b> ${book.publisher || ''}</p>
                    <p><b>Publication date:</b> ${book.publication_date ? new Date(book.publication_date).toLocaleDateString() : ''}</p>
                    <p><b>Language:</b> ${book.language || ''}</p>
                    <p><b>Stock:</b> ${book.total_stock || 'N/A'}</p>
                    <p><b>Average Rating:</b> ${book.avg_rating ?? book.average_rating}</p>
                    <p><b>Review Count:</b> ${book.review_count}</p>
                    <hr>
                    <div>
                        <label>
                            <input type="checkbox" id="edit-book-is-active" ${book.is_active ? 'checked' : ''}>
                            Is Active
                        </label>
                    </div>
                    <div>
                        <label>
                            <input type="checkbox" id="edit-book-is-featured" ${book.is_featured ? 'checked' : ''}
                              ${book.review_count < 5 ? 'disabled' : ''}>
                            Is Featured
                            ${book.review_count < 5
                        ? `<span class="feature-disabled">(At least 5 reviews needed)</span>`
                        : `<span class="feature-possible">(Eligible)</span>`
                    }
                        </label>
                    </div>
                    <button id="admin-book-save-flags-btn" class="action-btn">Save</button>
                    <hr>
                    <div>
                        <b>Reviews:</b>
                        <div style="max-height:200px; overflow-y:auto; margin:8px 0;">
                            ${!book.reviews || book.reviews.length === 0
                        ? '<div><i>No reviews for this book.</i></div>'
                        : book.reviews.map(rv => `
                                <div class="review-row" id="review-row-${rv.review_id}">
                                    <b>${rv.customer_name || 'Unknown User'}</b>
                                    <span>rated <b>${rv.rating}</b> &mdash; <i>${new Date(rv.review_date).toLocaleString()}</i></span><br>
                                    <span style="display:inline-block; min-width:60%;">${rv.comment ? rv.comment.replace(/[<>]/g, '') : ''}</span>
                                    <span class="review-actions">
                                        <button data-bookid="${book.book_id}" data-reviewid="${rv.review_id}" class="admin-del-review-btn" style="color:#a34;">Delete</button>
                                    </span>
                                </div>
                              `).join('')
                    }
                        </div>
                    </div>
                `;

                // Save handler
                document.getElementById('admin-book-save-flags-btn').onclick = function () {
                    const isActive = document.getElementById('edit-book-is-active').checked;
                    const isFeatured = document.getElementById('edit-book-is-featured').checked;
                    if (isFeatured && book.review_count < 5) {
                        alert('A book needs at least 5 reviews to be featured.');
                        return;
                    }
                    fetch(`/api/admin/books/${book.book_id}/flags`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify({ isActive, isFeatured })
                    })
                        .then(r => r.json())
                        .then(ret => {
                            if (ret.error) return alert('Update failed: ' + ret.error);
                            alert('Book status updated.');
                            loadBooks();
                            closeEditBookModal();
                        })
                        .catch(() => alert('Network or server error.'));
                };

                // Review delete
                content.querySelectorAll('.admin-del-review-btn').forEach(btn => {
                    btn.onclick = function () {
                        const confirmDel = confirm('Delete this review?');
                        if (!confirmDel) return;
                        const reviewId = btn.getAttribute('data-reviewid');
                        fetch(`/api/admin/books/${book.book_id}/reviews/${reviewId}`, {
                            method: 'DELETE',
                            headers: { Authorization: `Bearer ${token}` }
                        })
                            .then(r => r.json())
                            .then(ret => {
                                if (ret.error) return alert('Delete failed: ' + ret.error);
                                document.getElementById(`review-row-${reviewId}`).remove();
                                loadBooks();
                            })
                            .catch(() => alert('Network/software error!'));
                    };
                });
            })
            .catch(e => {
                content.innerHTML = `<div style="color:#b22">Failed to load: ${e.message}</div>`;
            });
    }
    window.openEditBookModal = openEditBookModal;
    function closeEditBookModal() {
        const modal = document.getElementById('admin-book-edit-modal');
        if (modal) {
            modal.classList.remove('visible');
            modal.classList.add('hidden');
        }
    }
    window.closeEditBookModal = closeEditBookModal;

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
                    <td class="font-mono text-gray-500">${book.book_id}</td>
                    <td class="book-title">${book.title}</td>
                    <td>${book.authors || 'N/A'}</td>
                    <td><span class="badge badge-category">${book.category_name || 'N/A'}</span></td>
                    <td><span class="badge badge-subcategory">${book.sub_category_name || 'N/A'}</span></td>
                    <td>$${Number(book.price).toFixed(2)}</td>
                    <td><span class="badge badge-stock ${book.total_stock > 0 ? 'in-stock' : 'out-of-stock'}">${book.total_stock ?? 0}</span></td>
                    <td><div class="rating-cell"><span>${Number(book.average_rating).toFixed(2)}</span><span class="star">★</span></div></td>
                    <td>${book.review_count ?? 0}</td>
                    <td><button class="action-btn admin-edit-book-btn" data-bookid="${book.book_id}">Edit</button></td>
                </tr>
            `).join('');
            setTimeout(() => {
                document.querySelectorAll('.admin-edit-book-btn').forEach(btn => {
                    btn.addEventListener('click', () => {
                        const bookId = btn.getAttribute('data-bookid');
                        openEditBookModal(bookId);
                    });
                });
            }, 30);
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
                    <td class="font-mono text-gray-500">${order.order_id}</td>
                    <td class="font-semibold">${order.customer_name}</td>
                    <td>${new Date(order.order_date).toLocaleDateString()}</td>
                    <td class="font-medium">$${Number(order.total_amount).toFixed(2)}</td>
                    <td>${getStatusBadge(order.status)}</td>
                    <td><button class="action-btn view-order-btn" data-order-id="${order.order_id}">View</button></td>
                </tr>
            `).join('');
        } catch (err) {
            console.error('Failed to load orders:', err);
            ordersTableBody.innerHTML = `<tr><td colspan="6" class="py-4 text-center text-red-600">Error: ${err.message}</td></tr>`;
        }
    }

    // Modal close logic for orders
    document.getElementById('orderModalClose').onclick = () => {
        document.getElementById('orderModal').style.display = 'none';
    };

    document.getElementById('orderModal').onclick = (e) => {
        if (e.target === document.getElementById('orderModal')) {
            document.getElementById('orderModal').style.display = 'none';
        }
    };

    // --- Order Modal Logic ---
    document.addEventListener('click', async (e) => {
        const btn = e.target.closest('.view-order-btn');
        if (btn) {
            const orderId = btn.getAttribute('data-order-id');
            await openOrderModal(orderId);
        }
    });

    // Load & show order in modal
    async function openOrderModal(orderId) {
        const modal = document.getElementById('orderModal');
        modal.style.display = 'flex';
        document.getElementById('order-modal-toast').textContent = '';
        document.getElementById('order-modal-toast').className = '';

        try {
            const resp = await fetch(`/api/admin/orders/${orderId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (!resp.ok) throw new Error("Failed to load order details!");

            const order = await resp.json();

            // Populate order details
            document.getElementById('order-modal-id').textContent = order.order_id;
            document.getElementById('order-modal-date').textContent = new Date(order.order_date).toLocaleString();
            document.getElementById('order-modal-customer').textContent = order.customer_name || 'N/A';
            document.getElementById('order-modal-email').textContent = order.customer_email || 'N/A';
            document.getElementById('order-modal-phone').textContent = order.customer_phone || 'N/A';
            document.getElementById('order-modal-customer-address').textContent = order.customer_address || 'N/A';
            document.getElementById('order-modal-shipping-method').textContent = order.shipping_method || 'Standard';
            document.getElementById('order-modal-tracking').textContent = order.tracking_number || 'Not assigned';

            // Populate shipping address
            const shippingElement = document.getElementById('order-modal-shipping');
            if (order.shipping) {
                shippingElement.innerHTML = `
                    <div>${order.shipping.address || 'N/A'}</div>
                    <div>${order.shipping.city || ''} ${order.shipping.postal_code || ''}</div>
                    <div>${order.shipping.country || ''}</div>
                `;
            } else {
                shippingElement.textContent = 'No shipping address provided';
            }

            // Populate order items
            const tbody = document.getElementById('order-modal-items-tbody');
            tbody.innerHTML = '';
            (order.items || []).forEach(item => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>
                        <img src="${item.image_url || '/images/default-book.jpg'}" 
                            alt="${item.title}" 
                            style="width:34px;height:45px;vertical-align:middle;border-radius:5px;">
                        <span>${item.title || 'Unknown Book'}</span><br>
                        <small>by ${item.authors || 'Unknown Author'}</small>
                    </td>
                    <td>${item.format_name || 'N/A'}</td>
                    <td>${item.quantity}</td>
                    <td>$${parseFloat(item.item_price || 0).toFixed(2)}</td>
                    <td>$${(parseFloat(item.item_price || 0) * parseInt(item.quantity || 0)).toFixed(2)}</td>
                `;
                tbody.appendChild(tr);
            });

            document.getElementById('order-modal-total').textContent = parseFloat(order.total_amount || 0).toFixed(2);

            // Status badge
            document.getElementById('order-modal-status-badge').innerHTML = `
                <span class="badge badge-status-${order.status}">
                    ${order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
            `;

            // Set status dropdown
            const dropdown = document.getElementById('order-status-dropdown');
            dropdown.value = order.status;
            // Save order ID for update
            dropdown.setAttribute('data-order-id', order.order_id);
            document.getElementById('order-status-update-btn').setAttribute('data-order-id', order.order_id);

        } catch (err) {
            console.error('Error loading order details:', err);
            document.getElementById('order-modal-toast').textContent = 'Could not load order details.';
            document.getElementById('order-modal-toast').className = 'toast-error';
        }
    }

    // Update order status from dropdown
    document.getElementById('order-status-update-btn').onclick = async function () {
        const orderId = this.getAttribute('data-order-id');
        const status = document.getElementById('order-status-dropdown').value;
        const toastElement = document.getElementById('order-modal-toast');

        if (!confirm(`Change order #${orderId} status to "${status}"?`)) return;

        try {
            const resp = await fetch(`/api/admin/orders/${orderId}/status`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status })
            });
            const res = await resp.json();
            if (!resp.ok) throw new Error(res.error || "Failed to update status");

            toastElement.textContent = "Status updated successfully!";
            toastElement.className = 'toast-success';
            // Update the status badge
            document.getElementById('order-modal-status-badge').innerHTML = `
                <span class="badge badge-status-${status}">
                    ${status.charAt(0).toUpperCase() + status.slice(1)}
                </span>
            `;
            // Refresh the orders table
            loadOrders();

        } catch (err) {
            toastElement.textContent = err.message;
            toastElement.className = 'toast-error';
        }
    };

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

        function formatNotificationMessage(notification) {
            switch (notification.type) {
                case 'new_signup':
                    return `
                <div class="notification-item ${!notification.is_read ? 'unread' : ''}" data-id="${notification.notification_id}">
                    <div class="notification-title">👤 ${notification.title}</div>
                    <div class="notification-message">${notification.message}</div>
                    <div class="notification-time">${new Date(notification.created_at).toLocaleString()}</div>
                </div>
            `;
                case 'new_review':
                    const data = notification.data || {};
                    return `
                <div class="notification-item ${!notification.is_read ? 'unread' : ''}" data-id="${notification.notification_id}">
                    <div class="notification-title">⭐ ${notification.title}</div>
                    <div class="notification-message">
                        ${data.customer_name} left a ${data.rating}/5 review for "${data.book_title}"
                        ${data.comment ? `<br><em>"${data.comment.substring(0, 100)}${data.comment.length > 100 ? '...' : ''}"</em>` : ''}
                    </div>
                    <div class="notification-time">${new Date(notification.created_at).toLocaleString()}</div>
                </div>
            `;
                case 'review_deleted':
                    const deleteData = notification.data || {};
                    return `
                <div class="notification-item ${!notification.is_read ? 'unread' : ''}" data-id="${notification.notification_id}">
                    <div class="notification-title">🗑️ ${notification.title}</div>
                    <div class="notification-message">
                        ${deleteData.customer_name} deleted their ${deleteData.rating}/5 review for "${deleteData.book_title}"
                        ${deleteData.comment ? `<br><em>Previous comment: "${deleteData.comment.substring(0, 80)}${deleteData.comment.length > 80 ? '...' : ''}"</em>` : ''}
                    </div>
                    <div class="notification-time">${new Date(notification.created_at).toLocaleString()}</div>
                </div>
            `;
                default:
                    return `
                <div class="notification-item ${!notification.is_read ? 'unread' : ''}" data-id="${notification.notification_id}">
                    <div class="notification-title">${notification.title}</div>
                    <div class="notification-message">${notification.message}</div>
                    <div class="notification-time">${new Date(notification.created_at).toLocaleString()}</div>
                </div>
            `;
            }
        }



        function displayNotifications(notifications) {
            if (notifications.length === 0) {
                notificationsList.innerHTML = '<div class="p-4 text-center text-gray-500">No notifications</div>';
                markAllReadBtn.disabled = true;
                markAllReadBtn.classList.add('opacity-50', 'cursor-not-allowed');
                return;
            }

            const hasUnreadNotifications = notifications.some(notification => !notification.is_read);

            if (hasUnreadNotifications) {
                markAllReadBtn.disabled = false;
                markAllReadBtn.classList.remove('opacity-50', 'cursor-not-allowed');
            } else {
                markAllReadBtn.disabled = true;
                markAllReadBtn.classList.add('opacity-50', 'cursor-not-allowed');
            }


            notificationsList.innerHTML = notifications.map(formatNotificationMessage).join('');

            document.querySelectorAll('.notification-item').forEach(item => {
                item.addEventListener('click', async () => {
                    const notificationId = item.dataset.id;
                    await markNotificationAsRead(notificationId);
                    item.classList.remove('unread');
                    updateNotificationCount();

                    // Optional: Navigate to books section for both review types
                    const notification = notifications.find(n => n.notification_id == notificationId);
                    if (notification && (notification.type === 'new_review' || notification.type === 'review_deleted')) {
                        showSection('books');
                        loadBooks();
                        notificationDropdown.classList.add('hidden');
                    }

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
                // Make the API call first
                const response = await fetch('/api/admin/notifications/read-all', {
                    method: 'PUT',
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (!response.ok) {
                    throw new Error('Failed to mark notifications as read');
                }

                // Immediately update UI after successful API call
                notificationBadge.textContent = '0';
                notificationBadge.classList.add('hidden');

                // Mark all notifications as read in the current UI
                document.querySelectorAll('.notification-item.unread').forEach(item => {
                    item.classList.remove('unread');
                });

                // Disable the mark all read button
                markAllReadBtn.disabled = true;
                markAllReadBtn.classList.add('opacity-50', 'cursor-not-allowed');

                // Reload notifications to ensure consistency (this shouldn't change the count since we already set it to 0)
                loadNotifications();

            } catch (err) {
                console.error('Error marking all notifications as read:', err);
                // If there's an error, restore the correct state by fetching from server
                updateNotificationCount();
                loadNotifications();
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
