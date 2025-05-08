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
            <a href="/signin.html" class="profile-link">Profile</a>
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