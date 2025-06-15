document.addEventListener('DOMContentLoaded', () => {
    // Simulate login status (replace with actual backend check later)
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

        // Add event listeners for dropdown toggle
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
            <a href="signin.html" class="profile-link">Profile</a>
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

    // Fetch and display books
    fetch('/api/books') // This will need a backend later
        .then(response => response.json())
        .then(books => {
            const bookGrid = document.querySelector('.book-grid');
            bookGrid.innerHTML = '';
            books.forEach(book => {
                const bookCard = document.createElement('div');
                bookCard.classList.add('book-card');
                bookCard.innerHTML = `
                    <img src="${book.cover_image_url || 'https://via.placeholder.com/180x260'}" alt="${book.title} Cover">
                    <h3>${book.title}</h3>
                    <p class="author">by ${book.author}</p>
                    <p class="price">$${book.price}</p>
                    <button>Add to Cart</button>
                `;
                bookGrid.appendChild(bookCard);
            });
        })
        .catch(error => {
            console.error('Error fetching books:', error);
        });
});

// Assuming you're getting books from your backend to display on the homepage
document.addEventListener('DOMContentLoaded', () => {
    // Call the fetch function when the page loads
    fetchBooks();
});

// Function to fetch book data from backend
function fetchBooks() {
    fetch('http://192.168.0.176:3000/api/books')  // Your backend API URL
        .then(response => response.json())     // Parse the response as JSON
        .then(data => {
            console.log(data);  // Do something with the data (e.g., display it)
            displayBooks(data); // Function to display books in the homepage
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Function to display books data in the homepage
function displayBooks(books) {
    const booksList = document.getElementById('books-list');  // Make sure your HTML has this element

    books.forEach(book => {
        const listItem = document.createElement('li');
        listItem.textContent = `${book.title} by ${book.author}`;  // Adjust this based on your DB schema
        booksList.appendChild(listItem);
    });
}

document.getElementById('hero-search-box')?.addEventListener('input', (e) => {
    const query = e.target.value.trim().toLowerCase();
    // You can implement fetch(`/api/search?q=${query}`) here
    console.log('Searching for:', query);
});

// Typing animation for placeholder text
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


