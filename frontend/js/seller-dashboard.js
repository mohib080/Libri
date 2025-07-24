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
            });
        });
    }

    // --- INITIALIZE THE DASHBOARD ---
    fetchDashboardData();
    setupNavigation();
});

