document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const bookTitle = urlParams.get('name');
    let currentBookId = null; // To store the ID of the currently displayed book

    const bookDetailsContent = document.getElementById('book-details-content');
    const reviewListContent = document.getElementById('review-list-content');
    const notificationArea = document.getElementById('notification-area'); // Assuming notification area exists in book-details.html
    const API_BASE_URL = 'http://localhost:3000/api';

    // Helper to get JWT token from localStorage
    function getAuthToken() {
        return localStorage.getItem('token');
    }

    // Helper to show transient notifications
    function showNotification(message, type = 'success') {
        if (!notificationArea) return; // Exit if notification area doesn't exist
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

    // Function to generate star ratings HTML
    function renderStars(rating, size = '1.2rem') {
        let stars = '';
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating - fullStars >= 0.5;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

        for (let i = 0; i < fullStars; i++) {
            stars += `<i class="fas fa-star" style="font-size: ${size};"></i>`;
        }
        if (hasHalfStar) {
            stars += `<i class="fas fa-star-half-alt" style="font-size: ${size};"></i>`;
        }
        for (let i = 0; i < emptyStars; i++) {
            stars += `<i class="far fa-star" style="font-size: ${size};"></i>`; // Outline star for empty
        }
        return stars;
    }

    // Function to update cart item count in header (assuming a cart-item-count span exists in header)
    async function updateCartCount() {
        const cartItemCountSpan = document.getElementById('cart-item-count'); // Assuming this ID in your header
        const cartNavBtn = document.querySelector('.cart-btn'); // Assuming this class for the button
        if (!cartItemCountSpan || !cartNavBtn) return;

        const token = getAuthToken();
        if (!token) {
            cartItemCountSpan.textContent = '0';
            cartNavBtn.setAttribute('data-cart-count', '0'); // For potential CSS styling
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
                cartNavBtn.setAttribute('data-cart-count', totalItems.toString());
            } else {
                console.error('Failed to fetch cart for count update:', response.statusText);
                cartItemCountSpan.textContent = '0';
                cartNavBtn.setAttribute('data-cart-count', '0');
            }
        } catch (error) {
            console.error('Error updating cart count:', error);
            cartItemCountSpan.textContent = '0';
            cartNavBtn.setAttribute('data-cart-count', '0');
        }
    }


    // Initial fetch of book details based on URL parameter
    if (bookTitle) {
        fetchBookDetails(bookTitle);
        updateCartCount(); // Also update cart count on page load
    } else {
        bookDetailsContent.innerHTML = '<p style="text-align: center; color: red;">No book name provided in the URL.</p>';
        reviewListContent.innerHTML = '<p style="text-align: center; color: red;">Cannot load reviews without a book name.</p>';
    }

    // Function to fetch and display book details by title
    async function fetchBookDetails(title) {
        try {
            const response = await fetch(`${API_BASE_URL}/books/by-name?title=${encodeURIComponent(title)}`);
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
            }
            const book = await response.json();

            if (book) {
                currentBookId = book.id; // Store the fetched book_id
                const pubDate = book.publication_date ? new Date(book.publication_date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                }) : 'N/A';

                const averageRating = parseFloat(book.average_rating).toFixed(2);
                const overallRatingStars = renderStars(averageRating, '1.4rem'); // Larger stars for overall rating
                const reviewCount = book.review_count !== undefined ? book.review_count : 0; // Use review_count from backend

                bookDetailsContent.innerHTML = `
                    <div class="book-cover-wrapper">
                        <img src="${book.image_url || 'https://via.placeholder.com/300x450/cccccc/ffffff?text=No+Cover'}" alt="${book.title} Cover">
                    </div>
                    <div class="book-info">
                        <h2>${book.title}</h2>
                        <p class="author"><i class="fas fa-user-edit"></i> ${book.author || 'Unknown Author'}</p>
                        <div class="overall-rating">
                            <span class="average-score">${averageRating}</span>
                            <div class="stars">${overallRatingStars}</div>
                            <span class="review-count-text">(${reviewCount} reviews)</span>
                        </div>
                        <p class="price">$${parseFloat(book.price).toFixed(2)}</p>
                        <p class="description">${book.description || 'No description available for this book.'}</p>

                        <div class="book-meta">
                            <div class="book-meta-item">
                                <strong>Category:</strong>
                                <span>${book.category_name || 'N/A'}</span>
                            </div>
                            <div class="book-meta-item">
                                <strong>Sub-Category:</strong>
                                <span>${book.sub_category_name || 'N/A'}</span>
                            </div>
                            <div class="book-meta-item">
                                <strong>ISBN:</strong>
                                <span>${book.isbn || 'N/A'}</span>
                            </div>
                            <div class="book-meta-item">
                                <strong>Publisher:</strong>
                                <span>${book.publisher || 'N/A'}</span>
                            </div>
                            <div class="book-meta-item">
                                <strong>Publication Date:</strong>
                                <span>${pubDate}</span>
                            </div>
                            <div class="book-meta-item">
                                <strong>Language:</strong>
                                <span>${book.language || 'N/A'}</span>
                            </div>
                        </div>

                        <div class="action-buttons">
                            <button id="add-to-cart-btn"><i class="fas fa-shopping-cart"></i> Add to Cart</button>
                            <button id="add-to-wishlist-btn"><i class="fas fa-heart"></i> Add to Wishlist</button>
                        </div>
                    </div>
                `;

                // Attach event listeners after rendering the HTML
                const addToCartBtn = document.getElementById('add-to-cart-btn');
                if (addToCartBtn) {
                    addToCartBtn.addEventListener('click', () => addToCart(currentBookId, 1));
                }

                const addToWishlistBtn = document.getElementById('add-to-wishlist-btn');
                if (addToWishlistBtn) {
                    addToWishlistBtn.addEventListener('click', () => addToWishlist(currentBookId));
                }

                // After book details are loaded, fetch its reviews
                fetchBookReviews(currentBookId);

                // Check if the book is already in the user's cart or wishlist
                checkCartAndWishlistStatus(currentBookId);

            } else {
                bookDetailsContent.innerHTML = '<p style="text-align: center; color: #555;">Book not found.</p>';
                reviewListContent.innerHTML = '<p style="text-align: center; color: #555;">Book not found, no reviews to display.</p>';
            }
        } catch (error) {
            console.error('Error fetching book details by title:', error);
            bookDetailsContent.innerHTML = `<p style="text-align: center; color: red;">Error loading book details: ${error.message}</p>`;
            reviewListContent.innerHTML = `<p style="text-align: center; color: red;">Error loading reviews: ${error.message}</p>`;
        }
    }

    // Function to fetch and display book reviews
    async function fetchBookReviews(bookId) {
        try {
            const response = await fetch(`${API_BASE_URL}/books/${bookId}/reviews`);
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
            }
            const reviews = await response.json();

            reviewListContent.innerHTML = ''; // Clear previous content

            if (reviews.length > 0) {
                reviews.forEach(review => {
                    const reviewCard = document.createElement('div');
                    reviewCard.classList.add('review-card');

                    const customerName = review.customer_name || 'Anonymous';
                    const reviewDate = new Date(review.review_date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                    });

                    reviewCard.innerHTML = `
                        <div class="review-header">
                            <span class="reviewer-name">
                                <i class="fas fa-user-circle"></i> <!-- Profile icon added here -->
                                ${customerName}
                            </span>
                            <div class="review-rating">${renderStars(review.rating, '1.2rem')}</div>
                        </div>
                        <p class="review-comment">${review.comment || 'No comment provided.'}</p>
                        <p class="review-date">Reviewed on ${reviewDate}</p>
                    `;
                    reviewListContent.appendChild(reviewCard);
                });
            } else {
                reviewListContent.innerHTML = '<p style="text-align: center; color: #555;">No reviews yet. Be the first to review!</p>';
            }
        } catch (error) {
            console.error('Error fetching book reviews:', error);
            reviewListContent.innerHTML = `<p style="text-align: center; color: red;">Error loading reviews: ${error.message}</p>`;
        }
    }

    // --- Check if book is in Cart or Wishlist ---
    async function checkCartAndWishlistStatus(bookId) {
        const token = getAuthToken();
        if (!token) {
            // If not logged in, buttons remain active (or default state)
            return;
        }

        const addToCartBtn = document.getElementById('add-to-cart-btn');
        const addToWishlistBtn = document.getElementById('add-to-wishlist-btn');

        // Check Cart
        try {
            const cartResponse = await fetch(`${API_BASE_URL}/cart`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (cartResponse.ok) {
                const cartData = await cartResponse.json();
                const isInCart = cartData.items.some(item => item.book_id === bookId);
                if (isInCart && addToCartBtn) {
                    addToCartBtn.textContent = 'In Cart';
                    addToCartBtn.disabled = true;
                    addToCartBtn.style.backgroundColor = '#6c757d'; // Grey out button
                    addToCartBtn.style.background = 'linear-gradient(45deg, #6c757d, #5a6268)'; // Grey gradient
                    addToCartBtn.style.cursor = 'not-allowed';
                }
            }
        } catch (error) {
            console.error('Error checking cart status:', error);
        }

        // Check Wishlist
        try {
            const wishlistResponse = await fetch(`${API_BASE_URL}/wishlist`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (wishlistResponse.ok) {
                const wishlistData = await wishlistResponse.json();
                const isInWishlist = wishlistData.items.some(item => item.book_id === bookId);
                if (isInWishlist && addToWishlistBtn) {
                    addToWishlistBtn.textContent = 'In Wishlist';
                    addToWishlistBtn.disabled = true;
                    addToWishlistBtn.style.backgroundColor = '#6c757d'; // Grey out button
                    addToWishlistBtn.style.background = 'linear-gradient(45deg, #6c757d, #5a6268)'; // Grey gradient
                    addToWishlistBtn.style.cursor = 'not-allowed';
                }
            }
        } catch (error) {
            console.error('Error checking wishlist status:', error);
        }
    }


    // --- Add to Cart functionality ---
    async function addToCart(bookId, quantity = 1) {
        const token = getAuthToken();
        if (!token) {
            showNotification('Please log in to add items to your cart.', 'error');
            setTimeout(() => { window.location.href = 'signin.html'; }, 1500);
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
                const addToCartBtn = document.getElementById('add-to-cart-btn');
                if (addToCartBtn) {
                    addToCartBtn.textContent = 'In Cart';
                    addToCartBtn.disabled = true;
                    addToCartBtn.style.backgroundColor = '#6c757d'; // Grey out button
                    addToCartBtn.style.background = 'linear-gradient(45deg, #6c757d, #5a6268)'; // Grey gradient
                    addToCartBtn.style.cursor = 'not-allowed';
                }
                updateCartCount(); // Update cart count in header
            } else if (response.status === 409) { // Conflict: item already in cart
                showNotification('This book is already in your cart.', 'info');
            }
            else {
                const errorData = await response.json();
                showNotification(`Failed to add book to cart: ${errorData.error || 'Unknown error'}`, 'error');
                console.error('Failed to add to cart:', errorData.error || response.statusText);
            }
        } catch (error) {
            showNotification('An error occurred while adding to cart.', 'error');
            console.error('Error adding to cart:', error);
        }
    }

    // --- Add to Wishlist functionality ---
    async function addToWishlist(bookId) {
        const token = getAuthToken();
        if (!token) {
            showNotification('Please log in to add items to your wishlist.', 'error');
            setTimeout(() => { window.location.href = 'signin.html'; }, 1500);
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/wishlist/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ bookId })
            });

            if (response.ok) {
                showNotification('Book added to wishlist successfully!', 'success');
                const addToWishlistBtn = document.getElementById('add-to-wishlist-btn');
                if (addToWishlistBtn) {
                    addToWishlistBtn.textContent = 'In Wishlist';
                    addToWishlistBtn.disabled = true;
                    addToWishlistBtn.style.backgroundColor = '#6c757d'; // Grey out button
                    addToWishlistBtn.style.background = 'linear-gradient(45deg, #6c757d, #5a6268)'; // Grey gradient
                    addToWishlistBtn.style.cursor = 'not-allowed';
                }
            } else if (response.status === 409) { // Conflict: item already in wishlist
                showNotification('This book is already in your wishlist.', 'info');
                // Also update button state if it was a 409, meaning it's already there.
                const addToWishlistBtn = document.getElementById('add-to-wishlist-btn');
                if (addToWishlistBtn) {
                    addToWishlistBtn.textContent = 'In Wishlist';
                    addToWishlistBtn.disabled = true;
                    addToWishlistBtn.style.backgroundColor = '#6c757d'; // Grey out button
                    addToWishlistBtn.style.background = 'linear-gradient(45deg, #6c757d, #5a6268)'; // Grey gradient
                    addToWishlistBtn.style.cursor = 'not-allowed';
                }
            } else {
                const errorData = await response.json();
                showNotification(`Failed to add book to wishlist: ${errorData.error || 'Unknown error'}`, 'error');
                console.error('Failed to add to wishlist:', errorData.error || response.statusText);
            }
        } catch (error) {
            showNotification('An error occurred while adding to wishlist.', 'error');
            console.error('Error adding to wishlist:', error);
        }
    }


    // Dark mode toggle functionality (copied for consistency)
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    const body = document.body;

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === "dark-mode") {
        body.classList.add("dark-mode");
    } else if (savedTheme === "light-mode") {
        body.classList.remove("dark-mode");
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        body.classList.add('dark-mode');
    }

    if (darkModeToggle) {
        if (body.classList.contains('dark-mode')) {
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }

        darkModeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            if (body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark-mode');
                darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            } else {
                localStorage.setItem('theme', 'light-mode');
                darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            }
        });
    }
});
