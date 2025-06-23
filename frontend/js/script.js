const isLoggedIn = false;
const profileContainer = document.querySelector('.profile-container');

if (isLoggedIn) {
    profileContainer.innerHTML = `
        <div class="profile">
            <img src="https://www.gravatar.com/avatar/default?s=40&d=mp" alt="Profile" class="profile-img">
            <div class="profile-dropdown">
                <a href="#">Profile</a>
                <a href="#">Orders</a>
                <a href="#">Wishlist</a>
                <a href="#">Logout</a>
            </div>
        </div>
    `;

    const profileDiv = profileContainer.querySelector('.profile');
    if (profileDiv) {
        profileDiv.addEventListener('mouseover', () => {
            const dropdown = profileContainer.querySelector('.profile-dropdown');
            if (dropdown) {
                dropdown.style.display = 'block';
            }
        });
        profileDiv.addEventListener('mouseout', () => {
            const dropdown = profileContainer.querySelector('.profile-dropdown');
            if (dropdown) {
                dropdown.style.display = 'none';
            }
        });
    }
} else {
    profileContainer.innerHTML = `
        <a href="signin.html" class="profile-link">Login</a>
        <a href="signup.html" class="profile-link">Sign Up</a>
    `;
}

// Dark/Light mode toggle functionality
const darkModeToggle = document.getElementById("dark-mode-toggle");

if (localStorage.getItem("dark-mode") === "enabled") {
    document.body.classList.add("dark-mode");
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
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


const API_BASE_URL = 'http://localhost:3000/api';
const bookGrid = document.querySelector('.book-grid');
const categorySelect = document.getElementById('category-select');
const subCategorySelect = document.getElementById('subcategory-select');
const clearFiltersBtn = document.getElementById('clear-filters-btn');
const heroSearchBox = document.getElementById('hero-search-box');

function displayBooks(books) {
    if (!bookGrid) return;

    bookGrid.innerHTML = ''; // Clear previous books

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
            event.preventDefault();
            event.stopPropagation();
            console.log(`Added "${book.title}" to cart!`);
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
        console.log('Fetched books:', data);
        displayBooks(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        if (bookGrid) {
            bookGrid.innerHTML = '<p style="text-align: center; width: 100%; grid-column: 1 / -1; margin-top: 50px; font-size: 1.2rem; color: red;">Failed to load books. Please check server connection or filters.</p>';
        }
    }
}


async function fetchAndPopulateCategories() {
    try {
        const response = await fetch(`${API_BASE_URL}/categories`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const categories = await response.json();

        categorySelect.innerHTML = '<option value="">All Categories</option>'; // Always add default option
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
    subCategorySelect.innerHTML = '<option value="">All Sub-Categories</option>';
    subCategorySelect.disabled = true;

    if (categoryId) {
        try {
            const response = await fetch(`${API_BASE_URL}/subcategories?categoryId=${categoryId}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
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
    applyFilters(); // Always apply filters after subcategories are potentially updated
}

function applyFilters() {
    const selectedCategoryId = categorySelect.value;
    const selectedSubCategoryId = subCategorySelect.value;
    const currentSearchTerm = heroSearchBox.value.trim(); // Get current search term
    fetchBooks(currentSearchTerm, selectedCategoryId, selectedSubCategoryId);
}

// Event Listeners for Filter Changes
categorySelect.addEventListener('change', () => {
    const selectedCategoryId = categorySelect.value;
    subCategorySelect.value = '';
    fetchAndPopulateSubcategories(selectedCategoryId);
});

subCategorySelect.addEventListener('change', applyFilters);

clearFiltersBtn.addEventListener('click', () => {
    categorySelect.value = ''; // Reset category
    subCategorySelect.value = ''; // Reset subcategory
    subCategorySelect.disabled = true; // Disable subcategory dropdown
    heroSearchBox.value = ''; 
    fetchAndPopulateSubcategories('');
});

let searchTimeout;
heroSearchBox?.addEventListener('input', (e) => {
    clearTimeout(searchTimeout); 
    searchTimeout = setTimeout(() => {
        applyFilters();
    }, 300);
});



document.addEventListener('DOMContentLoaded', async () => {
    await fetchBooks();

    await fetchAndPopulateCategories();
});


const typingPlaceholder = document.getElementById('hero-search-box');
const placeholderTexts = ["Search by Book Name...", "Search by Author Name...", "Try 'Atomic Habits' or 'J.K. Rowling'"];
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
