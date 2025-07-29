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

    const totalSalesEl = document.querySelector('#dashboard-content .stat-card:nth-child(1) p');
    const totalOrdersEl = document.querySelector('#dashboard-content .stat-card:nth-child(2) p');
    const booksInStockEl = document.querySelector('#dashboard-content .stat-card:nth-child(3) p');
    const lowStockAlertsEl = document.querySelector('#dashboard-content .stat-card:nth-child(4) p');
    const recentOrdersTbody = document.querySelector('#dashboard-content table tbody');

    // --- API CALL TO FETCH DASHBOARD DATA ---
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
            // You can show an error message on the UI here
        }
    }

    // --- UI UPDATE FUNCTIONS ---
    function updateDashboardUI(data) {
        // Update stat cards
        totalSalesEl.textContent = `$${data.totalSales.toFixed(2)}`;
        totalOrdersEl.textContent = data.totalOrders;
        booksInStockEl.textContent = data.booksInStock;
        lowStockAlertsEl.textContent = data.lowStockAlerts; // This is static for now

        // Update recent orders table
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

    // --- SIDEBAR NAVIGATION LOGIC ---
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
                }
            });
        });
    }

    // --- SUPPLIED BOOKS FUNCTIONS ---
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
                    <span class="revenue">Revenue: $${parseFloat(book.total_revenue).toFixed(2)}</span>
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

    // --- DELIVERED BOOKS STATISTICS FUNCTIONS ---
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

    // Make functions globally accessible for onclick handlers
    window.loadSuppliedBooks = loadSuppliedBooks;
    window.loadDeliveredBooksStats = loadDeliveredBooksStats;

    // --- INITIALIZE THE DASHBOARD ---
    fetchDashboardData();
    setupNavigation();

    // Load supplied books when page loads (for the inventory section)
    loadSuppliedBooks();
});
