// --- 1. AUTH REDIRECT LOGIC ---
const page = window.location.pathname.split('/').pop();
const isLoggedIn = !!localStorage.getItem('token');
if (!isLoggedIn) {
    window.location.href = 'index.html';
}

// --- 2. DARK/LIGHT MODE INITIAL STATE ---
// UPDATED: Use 'theme' key and handle 'light-mode' explicitly
const savedThemeOnLoad = localStorage.getItem("theme"); // Read the 'theme' key
if (savedThemeOnLoad === "dark-mode") {
    document.body.classList.add("dark-mode");
} else if (savedThemeOnLoad === "light-mode") { // Explicitly check for 'light-mode'
    document.body.classList.remove("dark-mode"); // Ensure dark-mode class is removed
} else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    // Apply system preference if no explicit theme is saved
    document.body.classList.add('dark-mode');
}


// --- 3. DARK MODE BUTTON & PROFILE LOGIC ---
document.addEventListener('DOMContentLoaded', function () {
    // Dark/Light mode toggle logic
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    if (darkModeToggle) {
        // Set initial icon based on current theme
        if (document.body.classList.contains("dark-mode")) {
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>'; // Sun icon for dark mode
        } else {
            darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>'; // Moon icon for light mode
        }

        darkModeToggle.addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");
            if (document.body.classList.contains("dark-mode")) {
                darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
                localStorage.setItem("theme", "dark-mode"); // UPDATED: Save 'theme' as 'dark-mode'
            } else {
                darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
                localStorage.setItem("theme", "light-mode"); // UPDATED: Explicitly save 'theme' as 'light-mode'
            }
        });
    }

    // Profile logic (user only)
    const profileContainer = document.querySelector('.profile-container');
    if (profileContainer) {
        profileContainer.innerHTML = `
            <div class="profile">
                <img src="https://www.gravatar.com/avatar/default?s=40&d=mp" alt="Profile" class="profile-img">
                <div class="profile-dropdown">
                    <a href="profile.html">Profile</a>
                    <a href="#">Orders</a>
                    <a href="#">Wishlist</a>
                    <a href="#" id="logout-link">Logout</a>
                </div>
            </div>
        `;
        // Dropdown show/hide on hover
        const profileDiv = profileContainer.querySelector('.profile');
        if (profileDiv) {
            profileDiv.addEventListener('mouseover', () => {
                const dropdown = profileContainer.querySelector('.profile-dropdown');
                if (dropdown) dropdown.style.display = 'block';
            });
            profileDiv.addEventListener('mouseout', () => {
                const dropdown = profileContainer.querySelector('.profile-dropdown');
                if (dropdown) dropdown.style.display = 'none';
            });
        }
        // Logout
        const logoutLink = document.getElementById('logout-link');
        if (logoutLink) {
            logoutLink.addEventListener('click', function (e) {
                e.preventDefault();
                localStorage.removeItem('token');
                localStorage.removeItem('customer');
                // Also clear theme preference on logout if desired, or keep it
                // localStorage.removeItem('theme'); // Optional: uncomment to clear theme on logout
                window.location.href = 'index.html';
            });
        }
    }

    // --- 4. BOOKS, CATEGORIES, FILTERS ---
    const API_BASE_URL = 'http://localhost:3000/api';
    const bookGrid = document.querySelector('.book-grid');
    const categorySelect = document.getElementById('category-select');
    const subCategorySelect = document.getElementById('subcategory-select');
    const clearFiltersBtn = document.getElementById('clear-filters-btn');
    const heroSearchBox = document.getElementById('hero-search-box');
    const cartNavBtn = document.getElementById('cart-nav-btn'); // Cart nav button
    const cartItemCountSpan = document.getElementById('cart-item-count'); // Get the span for the count
    const notificationArea = document.getElementById('notification-area'); // Notification area

    if (cartNavBtn) {
        cartNavBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'cart.html';
        });
    }

    // Helper to get JWT token
    function getAuthToken() {
        return localStorage.getItem('token');
    }

    // Function to show transient notifications
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
        }, 3000); // Notification disappears after 3 seconds
    }

    // Function to update cart item count in header
    async function updateCartCount() {
        if (!cartItemCountSpan) return; // Ensure the element exists
        const token = getAuthToken();
        if (!token) {
            cartItemCountSpan.textContent = '0';
            cartNavBtn.setAttribute('data-cart-count', '0'); // Also update data-attribute for CSS ::after
            return;
        }
        try {
            const response = await fetch(`${API_BASE_URL}/cart`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.ok) {
                const cartData = await response.json();
                const totalItems = cartData.items.reduce((sum, item) => sum + item.quantity, 0);
                cartItemCountSpan.textContent = totalItems;
                cartNavBtn.setAttribute('data-cart-count', totalItems.toString()); // Update data-attribute for CSS ::after
            } else {
                console.error('Failed to fetch cart for count update:', response.statusText);
                cartItemCountSpan.textContent = '0'; // Reset on error
                cartNavBtn.setAttribute('data-cart-count', '0');
            }
        } catch (error) {
            console.error('Error updating cart count:', error);
            cartItemCountSpan.textContent = '0'; // Reset on error
            cartNavBtn.setAttribute('data-cart-count', '0');
        }
    }

    // Add to Cart functionality
    async function addToCart(bookId, quantity = 1) {
        const token = getAuthToken();
        if (!token) {
            showNotification('Please log in to add items to your cart.', 'error');
            setTimeout(() => { window.location.href = 'index.html'; }, 1500); // Redirect to login/home
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/cart/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ bookId, quantity })
            });

            if (response.ok) {
                showNotification('Book added to cart successfully!', 'success');
                updateCartCount(); // Update cart icon
            } else {
                const errorData = await response.json();
                showNotification(`Failed to add book to cart: ${errorData.error || 'Unknown error'}`, 'error');
                console.error('Failed to add to cart:', errorData.error || response.statusText);
            }
        } catch (error) {
            showNotification('An error occurred while adding to cart.', 'error');
            console.error('Error adding to cart:', error);
        }
    }

    function displayBooks(books) {
        if (!bookGrid) return;
        bookGrid.innerHTML = '';
        if (books.length === 0) {
            bookGrid.innerHTML = '<p style="text-align: center; width: 100%; grid-column: 1 / -1; margin-top: 50px; font-size: 1.2rem; color: #555;">No books found matching your criteria.</p>';
            return;
        }
        books.forEach(book => {
            const bookCard = document.createElement('div');
            bookCard.classList.add('book-card');
            bookCard.innerHTML = `
                <a href="book-details.html?name=${encodeURIComponent(book.title)}" class="book-card-link">
                    <img src="${book.image_url || 'https://via.placeholder.com/180x260/cccccc/ffffff?text=No+Cover'}" alt="${book.title} Cover">
                    <h3>${book.title}</h3>
                    <p class="author">by ${book.author || 'Unknown Author'}</p>
                    <p class="price">$${parseFloat(book.price).toFixed(2)}</p>
                </a>
                <button class="add-to-cart-btn" data-book-id="${book.id}">Add to Cart</button>
            `;
            // Attach event listener directly to the button element
            const addToCartBtn = bookCard.querySelector('.add-to-cart-btn');
            if (addToCartBtn) {
                addToCartBtn.addEventListener('click', (event) => {
                    event.preventDefault(); // Prevent default link behavior if it was inside <a>
                    event.stopPropagation(); // Stop event from bubbling up to the book card link
                    const bookId = event.target.dataset.bookId;
                    addToCart(bookId, 1); // Add 1 quantity by default
                });
            }
            bookGrid.appendChild(bookCard);
        });
    }

    async function fetchBooks(searchTerm = '', categoryId = '', subCategoryId = '') {
        let url = `${API_BASE_URL}/books`;
        const params = new URLSearchParams();
        if (searchTerm) {
            params.append('q', searchTerm);
            url = `${API_BASE_URL}/books/search`;
        }
        if (categoryId) {
            params.append('categoryId', categoryId);
        }
        if (subCategoryId) {
            params.append('subCategoryId', subCategoryId);
        }
        if (params.toString()) {
            url += `?${params.toString()}`;
        }
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            displayBooks(data);
        } catch (error) {
            console.error('Error fetching data:', error);
            if (bookGrid) {
                bookGrid.innerHTML = '<p style="text-align: center; width: 100%; grid-column: 1 / -1; margin-top: 50px; font-size: 1.2rem; color: red;">Failed to load books. Please check server connection or filters.</p>';
            }
        }
    }

    async function fetchAndPopulateCategories() {
        if (!categorySelect) return;
        try {
            const response = await fetch(`${API_BASE_URL}/categories`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const categories = await response.json();
            categorySelect.innerHTML = '<option value="">All Categories</option>';
            categories.forEach(category => {
                const option = document.createElement('option');
                option.value = category.category_id;
                option.textContent = category.category_name;
                categorySelect.appendChild(option);
            });
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    }

    async function fetchAndPopulateSubcategories(categoryId) {
        if (!subCategorySelect) return;
        subCategorySelect.innerHTML = '<option value="">All Sub-Categories</option>';
        subCategorySelect.disabled = true;
        if (categoryId) {
            try {
                const response = await fetch(`${API_BASE_URL}/subcategories?categoryId=${categoryId}`);
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const subcategories = await response.json();
                subcategories.forEach(sub => {
                    const option = document.createElement('option');
                    option.value = sub.sub_category_id;
                    option.textContent = sub.sub_category_name;
                    subCategorySelect.appendChild(option);
                });
                subCategorySelect.disabled = false;
            } catch (error) {
                console.error('Error fetching subcategories:', error);
            }
        }
        applyFilters();
    }

    function applyFilters() {
        const selectedCategoryId = categorySelect ? categorySelect.value : '';
        const selectedSubCategoryId = subCategorySelect ? subCategorySelect.value : '';
        const currentSearchTerm = heroSearchBox ? heroSearchBox.value.trim() : '';
        fetchBooks(currentSearchTerm, selectedCategoryId, selectedSubCategoryId);
    }

    if (categorySelect) {
        categorySelect.addEventListener('change', () => {
            const selectedCategoryId = categorySelect.value;
            if (subCategorySelect) subCategorySelect.value = '';
            fetchAndPopulateSubcategories(selectedCategoryId);
        });
    }
    if (subCategorySelect) subCategorySelect.addEventListener('change', applyFilters);

    if (clearFiltersBtn) clearFiltersBtn.addEventListener('click', () => {
        if (categorySelect) categorySelect.value = '';
        if (subCategorySelect) {
            subCategorySelect.value = '';
            subCategorySelect.disabled = true;
        }
        if (heroSearchBox) heroSearchBox.value = '';
        fetchAndPopulateSubcategories('');
    });

    let searchTimeout;
    if (heroSearchBox) {
        heroSearchBox.addEventListener('input', () => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                applyFilters();
            }, 300);
        });
    }

    // --- INITIAL LOAD ---
    fetchBooks();
    fetchAndPopulateCategories();
    updateCartCount(); // Fetch and display initial cart count on load

    // --- TYPING PLACEHOLDER ANIMATION ---
    const typingPlaceholder = document.getElementById('hero-search-box');
    const placeholderTexts = [
        "Search by Book Name...",
        "Search by Author Name...",
        "Try 'Atomic Habits' or 'J.K. Rowling'"
    ];
    let currentText = 0;
    let charIndex = 0;

    function typePlaceholder() {
        if (!typingPlaceholder) return;
        if (charIndex <= placeholderTexts[currentText].length) {
            typingPlaceholder.setAttribute("placeholder", placeholderTexts[currentText].substring(0, charIndex++));
            setTimeout(typePlaceholder, 80);
        } else {
            setTimeout(() => {
                charIndex = 0;
                currentText = (currentText + 1) % placeholderTexts.length;
                typePlaceholder();
            }, 2000);
        }
    }
    typePlaceholder();
});
