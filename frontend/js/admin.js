document.addEventListener('DOMContentLoaded', () => {
    // --- Security Check ---
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'login.html'; // Redirect to a general login page
        return;
    }

    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        if (!payload.isAdmin) {
            alert('Access Denied: You are not an administrator.');
            window.location.href = 'index.html'; // Redirect to home page
            return;
        }
    } catch (e) {
        console.error('Invalid token:', e);
        localStorage.clear();
        window.location.href = 'login.html';
        return;
    }

    // --- DOM Elements ---
    const links = {
        dashboard: document.getElementById('dashboard-link'),
        users: document.getElementById('users-link'),
        books: document.getElementById('books-link'),
        orders: document.getElementById('orders-link'),
    };

    const sections = {
        dashboard: document.getElementById('dashboard-content'),
        users: document.getElementById('users-content'),
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

    links.dashboard.addEventListener('click', () => {
        showSection('dashboard');
        loadDashboardData();
    });

    links.users.addEventListener('click', () => {
        showSection('users');
        loadUsers();
    });

    links.books.addEventListener('click', () => {
        showSection('books');
        loadBooks();
    });

    links.orders.addEventListener('click', () => {
        showSection('orders');
        loadOrders();
    });

    logoutButton.addEventListener('click', () => {
        localStorage.clear();
        window.location.href = 'index.html';
    });

    // --- Data Fetching and Rendering ---
    const apiHeaders = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };

    async function loadDashboardData() {
        // You would fetch real data from an endpoint like /api/admin/stats
        document.getElementById('total-sales').textContent = '$12,345';
        document.getElementById('total-orders').textContent = '456';
        document.getElementById('total-users').textContent = '789';
        document.getElementById('total-books').textContent = '1,234';
    }

    async function loadUsers() {
        // Fetch from /api/admin/users
        const usersTableBody = document.getElementById('users-table-body');
        usersTableBody.innerHTML = `
            <tr><td class="py-2">1</td><td>Admin User</td><td>admin@example.com</td><td>Admin</td><td><button class="text-indigo-600">Edit</button></td></tr>
            <tr><td class="py-2">2</td><td>Seller One</td><td>seller1@example.com</td><td>Seller</td><td><button class="text-indigo-600">Edit</button></td></tr>
        `;
    }

    async function loadBooks() {
        // Fetch from /api/admin/books
        const booksTableBody = document.getElementById('books-table-body');
        booksTableBody.innerHTML = `
            <tr><td class="py-2">101</td><td>The Great Gatsby</td><td>F. Scott Fitzgerald</td><td>$10.99</td><td>50</td><td><button class="text-indigo-600">Edit</button></td></tr>
            <tr><td class="py-2">102</td><td>To Kill a Mockingbird</td><td>Harper Lee</td><td>$12.50</td><td>30</td><td><button class="text-indigo-600">Edit</button></td></tr>
        `;
    }

    async function loadOrders() {
        // Fetch from /api/admin/orders
        const ordersTableBody = document.getElementById('orders-table-body');
        ordersTableBody.innerHTML = `
             <tr><td class="py-2">ORD-001</td><td>John Doe</td><td>2024-07-23</td><td>$25.50</td><td class="text-green-600">Shipped</td><td><button class="text-indigo-600">View</button></td></tr>
             <tr><td class="py-2">ORD-002</td><td>Jane Smith</td><td>2024-07-22</td><td>$15.00</td><td class="text-yellow-600">Processing</td><td><button class="text-indigo-600">View</button></td></tr>
        `;
    }

    // Initial load
    showSection('dashboard');
    loadDashboardData();
});
