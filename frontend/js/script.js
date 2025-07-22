localStorage.removeItem('token');
localStorage.removeItem('customer');
// --- 1. AUTH REDIRECT LOGIC ---
const page = window.location.pathname.split('/').pop();
const isLoggedIn = !!localStorage.getItem('token');

// --- FOR DEVELOPMENT/TESTING ---
// Uncomment below lines ONLY if you want to always start as logged out for testing
// localStorage.removeItem('token');
// localStorage.removeItem('customer');

// --- Redirect Logic ---
if (page === 'user.html' && !isLoggedIn) {
    window.location.href = 'index.html';
}
if (page === 'index.html' && isLoggedIn) {
    window.location.href = 'user.html';
}

// --- 2. DARK/LIGHT MODE INITIAL STATE (prevent flicker) ---
if (localStorage.getItem("dark-mode") === "enabled") {
    document.body.classList.add("dark-mode");
}

// --- 3. PROFILE ICON / NAVIGATION LOGIC & DARK MODE BUTTON ---
document.addEventListener('DOMContentLoaded', function () {
    // Dark/Light mode toggle logic (now works on all pages)
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    if (darkModeToggle) {
        // Set icon on page load
        if (document.body.classList.contains("dark-mode")) {
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }

        darkModeToggle.addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");
            if (document.body.classList.contains("dark-mode")) {
                darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
                localStorage.setItem("dark-mode", "enabled");
            } else {
                darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
                localStorage.setItem("dark-mode", "disabled");
            }
        });
    }

    // Profile logic
    const profileContainer = document.querySelector('.profile-container');
    if (profileContainer) {
        if (isLoggedIn) {
            // Customer mode: show profile + dropdown + logout
            profileContainer.innerHTML = `
                <div class="profile">
                    <img src="https://www.gravatar.com/avatar/default?s=40&d=mp" alt="Profile" class="profile-img">
                    <div class="profile-dropdown">
                        <a href="#">Profile</a>
                        <a href="#">Orders</a>
                        <a href="#">Wishlist</a>
                        <a href="#" id="logout-link">Logout</a>
                    </div>
                </div>
            `;
            // Show/hide dropdown on hover
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
            // Handle logout
            const logoutLink = document.getElementById('logout-link');
            if (logoutLink) {
                logoutLink.addEventListener('click', function (e) {
                    e.preventDefault();
                    localStorage.removeItem('token');
                    localStorage.removeItem('customer');
                    window.location.href = 'index.html';
                });
            }
        } else {
            // Guest mode: show only login (no sign up)
            profileContainer.innerHTML = `
                <a href="signin.html" class="profile-link">Login</a>
            `;
        }
    }

    // --- 4. BOOKS, CATEGORIES, FILTERS ---
    const API_BASE_URL = 'http://localhost:3000/api';
    const bookGrid = document.querySelector('.book-grid');
    const categorySelect = document.getElementById('category-select');
    const subCategorySelect = document.getElementById('subcategory-select');
    const clearFiltersBtn = document.getElementById('clear-filters-btn');
    const heroSearchBox = document.getElementById('hero-search-box');

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
                    <button class="add-to-cart-btn">Add to Cart</button>
                </a>
            `;
            bookCard.querySelector('.add-to-cart-btn').addEventListener('click', (event) => {
                event.preventDefault(); // Prevents any default form submission or link following behavior
                event.stopPropagation(); // Stops the click event from bubbling up to parent elements
                window.location.href = 'signin.html'; // This line redirects to signin.html
            });

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

    // --- FILTER EVENT LISTENERS ---
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