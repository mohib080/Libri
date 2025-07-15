document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const bookTitle = urlParams.get('name');
    let currentBookId = null;

    const bookDetailsContent = document.getElementById('book-details-content');
    const reviewListContent = document.getElementById('review-list-content');
    const notificationArea = document.getElementById('notification-area');
    const API_BASE_URL = 'http://localhost:3000/api';

    // Review Form Elements
    const reviewForm = document.getElementById('review-form');
    const reviewRatingInput = document.getElementById('review-rating');
    const reviewCommentTextarea = document.getElementById('review-comment');
    const starRatingContainer = document.getElementById('star-rating-input');
    let selectedRating = 0;

    // Authentication helpers
    function getAuthToken() {
        return localStorage.getItem('token');
    }

    function decodeToken(token) {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            return JSON.parse(jsonPayload);
        } catch (e) {
            console.error("Error decoding token:", e);
            return null;
        }
    }

    // Check authentication state
    const isLoggedIn = !!getAuthToken();
    let currentCustomerId = null;

    if (isLoggedIn) {
        const token = getAuthToken();
        const decodedUser = decodeToken(token);
        if (decodedUser && decodedUser.customerId) {
            currentCustomerId = decodedUser.customerId;
        }
    }

    // Notification system
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
        }, 3000);
    }

    // Enhanced Authentication UI Management
    function updateAuthenticationUI() {
        const signinLink = document.getElementById('signin-link');
        const signupLink = document.getElementById('signup-link');
        const signoutLink = document.getElementById('signout-link');
        const profileLink = document.getElementById('profile-link');
        const ordersLink = document.getElementById('orders-link');
        const cartBtn = document.querySelector('.cart-btn');
        const wishlistBtn = document.querySelector('.icon-btn[href="wishlist.html"]');

        if (isLoggedIn) {
            // Hide sign in/up, show profile options
            if (signinLink) signinLink.style.display = 'none';
            if (signupLink) signupLink.style.display = 'none';
            if (signoutLink) signoutLink.style.display = 'block';
            if (profileLink) profileLink.style.display = 'block';
            if (ordersLink) ordersLink.style.display = 'block';

            // Enable cart and wishlist buttons
            if (cartBtn) {
                cartBtn.style.opacity = '1';
                cartBtn.style.cursor = 'pointer';
                cartBtn.title = 'View Cart';
            }
            if (wishlistBtn) {
                wishlistBtn.style.opacity = '1';
                wishlistBtn.style.cursor = 'pointer';
                wishlistBtn.title = 'View Wishlist';
            }

            // Update review form visibility
            const reviewFormSection = document.querySelector('.review-form-section');
            if (reviewFormSection) {
                reviewFormSection.style.display = 'block';
            }
        } else {
            // Show sign in/up, hide profile options
            if (signinLink) signinLink.style.display = 'block';
            if (signupLink) signupLink.style.display = 'block';
            if (signoutLink) signoutLink.style.display = 'none';
            if (profileLink) profileLink.style.display = 'none';
            if (ordersLink) ordersLink.style.display = 'none';

            // Dim cart and wishlist buttons for guests
            if (cartBtn) {
                cartBtn.style.opacity = '0.7';
                cartBtn.style.cursor = 'pointer';
                cartBtn.title = 'Sign in to view cart';
            }
            if (wishlistBtn) {
                wishlistBtn.style.opacity = '0.7';
                wishlistBtn.style.cursor = 'pointer';
                wishlistBtn.title = 'Sign in to view wishlist';
            }

            // Hide review form for guests
            const reviewFormSection = document.querySelector('.review-form-section');
            if (reviewFormSection) {
                reviewFormSection.style.display = 'none';
            }
        }
    }

    // Sign out functionality
    function handleSignOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('customer');
        showNotification('Successfully signed out', 'success');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    }

    // Dark mode functionality
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

    // Star rating generation
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
            stars += `<i class="far fa-star" style="font-size: ${size};"></i>`;
        }
        return stars;
    }

    // Enhanced cart count update
    async function updateCartCount() {
        const cartItemCountSpan = document.getElementById('cart-item-count');
        const cartNavBtn = document.querySelector('.cart-btn');
        if (!cartItemCountSpan || !cartNavBtn) return;

        const token = getAuthToken();
        if (!token) {
            cartItemCountSpan.textContent = '0';
            cartNavBtn.setAttribute('data-cart-count', '0');
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

                if (totalItems > 0) {
                    cartItemCountSpan.style.animation = 'pulse 0.5s ease-in-out';
                    setTimeout(() => {
                        cartItemCountSpan.style.animation = '';
                    }, 500);
                }
            }
        } catch (error) {
            console.error('Error updating cart count:', error);
            cartItemCountSpan.textContent = '0';
            cartNavBtn.setAttribute('data-cart-count', '0');
        }
    }

    // Enhanced add to cart functionality with INSTANT UI UPDATE
    async function addToCart(bookId, quantity = 1) {
        const token = getAuthToken();
        const addToCartBtn = document.getElementById('add-to-cart-btn');

        // Store original button state
        const originalText = addToCartBtn.innerHTML;
        const originalBackground = addToCartBtn.style.background;
        const originalBackgroundColor = addToCartBtn.style.backgroundColor;
        const originalDisabled = addToCartBtn.disabled;

        // Show loading state
        addToCartBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Adding...';
        addToCartBtn.disabled = true;

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

                // INSTANT UI UPDATE - change button to "In Cart" state
                addToCartBtn.innerHTML = '<i class="fas fa-check-circle"></i> In Cart';
                addToCartBtn.disabled = true;
                addToCartBtn.style.backgroundColor = '#6c757d';
                addToCartBtn.style.background = 'linear-gradient(45deg, #6c757d, #5a6268)';
                addToCartBtn.style.cursor = 'not-allowed';
                addToCartBtn.style.opacity = '0.8';
                addToCartBtn.style.transform = 'none';

                // Update cart count
                updateCartCount();

            } else if (response.status === 409) {
                showNotification('This book is already in your cart', 'info');

                // Book already in cart - update button to "In Cart" state
                addToCartBtn.innerHTML = '<i class="fas fa-check-circle"></i> In Cart';
                addToCartBtn.disabled = true;
                addToCartBtn.style.backgroundColor = '#6c757d';
                addToCartBtn.style.background = 'linear-gradient(45deg, #6c757d, #5a6268)';
                addToCartBtn.style.cursor = 'not-allowed';
                addToCartBtn.style.opacity = '0.8';
                addToCartBtn.style.transform = 'none';

            } else {
                const errorData = await response.json();
                showNotification(`Failed to add book to cart: ${errorData.error || 'Unknown error'}`, 'error');

                // Restore original button state on error
                addToCartBtn.innerHTML = originalText;
                addToCartBtn.disabled = originalDisabled;
                addToCartBtn.style.background = originalBackground;
                addToCartBtn.style.backgroundColor = originalBackgroundColor;
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
            showNotification('Network error occurred while adding to cart', 'error');

            // Restore original button state on error
            addToCartBtn.innerHTML = originalText;
            addToCartBtn.disabled = originalDisabled;
            addToCartBtn.style.background = originalBackground;
            addToCartBtn.style.backgroundColor = originalBackgroundColor;
        }
    }

    // Enhanced add to wishlist functionality with INSTANT UI UPDATE
    async function addToWishlist(bookId) {
        const token = getAuthToken();
        const addToWishlistBtn = document.getElementById('add-to-wishlist-btn');

        // Store original button state
        const originalText = addToWishlistBtn.innerHTML;
        const originalBackground = addToWishlistBtn.style.background;
        const originalBackgroundColor = addToWishlistBtn.style.backgroundColor;
        const originalDisabled = addToWishlistBtn.disabled;

        // Show loading state
        addToWishlistBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Adding...';
        addToWishlistBtn.disabled = true;

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

                // INSTANT UI UPDATE - change button to "In Wishlist" state
                addToWishlistBtn.innerHTML = '<i class="fas fa-check-circle"></i> In Wishlist';
                addToWishlistBtn.disabled = true;
                addToWishlistBtn.style.backgroundColor = '#6c757d';
                addToWishlistBtn.style.background = 'linear-gradient(45deg, #6c757d, #5a6268)';
                addToWishlistBtn.style.cursor = 'not-allowed';
                addToWishlistBtn.style.opacity = '0.8';
                addToWishlistBtn.style.transform = 'none';

            } else if (response.status === 409) {
                showNotification('This book is already in your wishlist', 'info');

                // Book already in wishlist - update button to "In Wishlist" state
                addToWishlistBtn.innerHTML = '<i class="fas fa-check-circle"></i> In Wishlist';
                addToWishlistBtn.disabled = true;
                addToWishlistBtn.style.backgroundColor = '#6c757d';
                addToWishlistBtn.style.background = 'linear-gradient(45deg, #6c757d, #5a6268)';
                addToWishlistBtn.style.cursor = 'not-allowed';
                addToWishlistBtn.style.opacity = '0.8';
                addToWishlistBtn.style.transform = 'none';

            } else {
                const errorData = await response.json();
                showNotification(`Failed to add book to wishlist: ${errorData.error || 'Unknown error'}`, 'error');

                // Restore original button state on error
                addToWishlistBtn.innerHTML = originalText;
                addToWishlistBtn.disabled = originalDisabled;
                addToWishlistBtn.style.background = originalBackground;
                addToWishlistBtn.style.backgroundColor = originalBackgroundColor;
            }
        } catch (error) {
            console.error('Error adding to wishlist:', error);
            showNotification('Network error occurred while adding to wishlist', 'error');

            // Restore original button state on error
            addToWishlistBtn.innerHTML = originalText;
            addToWishlistBtn.disabled = originalDisabled;
            addToWishlistBtn.style.background = originalBackground;
            addToWishlistBtn.style.backgroundColor = originalBackgroundColor;
        }
    }

    // Check cart and wishlist status with INSTANT UI UPDATE
    async function checkCartAndWishlistStatus(bookId) {
        const token = getAuthToken();
        if (!token) return;

        // Check cart status
        try {
            const cartResponse = await fetch(`${API_BASE_URL}/cart`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (cartResponse.ok) {
                const cartData = await cartResponse.json();
                const isInCart = cartData.items.some(item => item.book_id === bookId);
                const addToCartBtn = document.getElementById('add-to-cart-btn');
                if (isInCart && addToCartBtn) {
                    addToCartBtn.innerHTML = '<i class="fas fa-check-circle"></i> In Cart';
                    addToCartBtn.disabled = true;
                    addToCartBtn.style.backgroundColor = '#6c757d';
                    addToCartBtn.style.background = 'linear-gradient(45deg, #6c757d, #5a6268)';
                    addToCartBtn.style.cursor = 'not-allowed';
                    addToCartBtn.style.opacity = '0.8';
                    addToCartBtn.style.transform = 'none';
                }
            }
        } catch (error) {
            console.error('Error checking cart status:', error);
        }

        // Check wishlist status
        try {
            const wishlistResponse = await fetch(`${API_BASE_URL}/wishlist`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (wishlistResponse.ok) {
                const wishlistData = await wishlistResponse.json();
                const isInWishlist = wishlistData.items.some(item => item.book_id === bookId);
                const addToWishlistBtn = document.getElementById('add-to-wishlist-btn');
                if (isInWishlist && addToWishlistBtn) {
                    addToWishlistBtn.innerHTML = '<i class="fas fa-check-circle"></i> In Wishlist';
                    addToWishlistBtn.disabled = true;
                    addToWishlistBtn.style.backgroundColor = '#6c757d';
                    addToWishlistBtn.style.background = 'linear-gradient(45deg, #6c757d, #5a6268)';
                    addToWishlistBtn.style.cursor = 'not-allowed';
                    addToWishlistBtn.style.opacity = '0.8';
                    addToWishlistBtn.style.transform = 'none';
                }
            }
        } catch (error) {
            console.error('Error checking wishlist status:', error);
        }
    }

    // Book details rendering
    function renderBookDetails(book) {
        const pubDate = book.publication_date ? new Date(book.publication_date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }) : 'N/A';

        const averageRating = parseFloat(book.average_rating || 0).toFixed(2);
        const reviewCount = book.review_count !== undefined ? book.review_count : 0;
        const overallRatingStars = renderStars(averageRating, '1.4rem');

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

        // Add event listeners for action buttons
        const addToCartBtn = document.getElementById('add-to-cart-btn');
        const addToWishlistBtn = document.getElementById('add-to-wishlist-btn');

        if (addToCartBtn) {
            addToCartBtn.addEventListener('click', () => {
                if (isLoggedIn) {
                    addToCart(currentBookId, 1);
                } else {
                    showNotification('Please sign in to add items to your cart', 'error');
                    setTimeout(() => {
                        window.location.href = 'signin.html';
                    }, 1500);
                }
            });
        }

        if (addToWishlistBtn) {
            addToWishlistBtn.addEventListener('click', () => {
                if (isLoggedIn) {
                    addToWishlist(currentBookId);
                } else {
                    showNotification('Please sign in to add items to your wishlist', 'error');
                    setTimeout(() => {
                        window.location.href = 'signin.html';
                    }, 1500);
                }
            });
        }

        // Check cart and wishlist status if logged in
        if (isLoggedIn) {
            checkCartAndWishlistStatus(currentBookId);
        }
    }

    // Fetch book details
    async function fetchBookDetails(title) {
        try {
            const response = await fetch(`${API_BASE_URL}/books/by-name?title=${encodeURIComponent(title)}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const book = await response.json();

            if (book) {
                currentBookId = book.id;
                renderBookDetails(book);
                await fetchBookReviews(currentBookId);
            } else {
                showNotification('Book not found', 'error');
            }
        } catch (error) {
            console.error('Error fetching book details:', error);
            showNotification('Failed to load book details', 'error');
        }
    }

    // Fetch and render reviews
    async function fetchBookReviews(bookId) {
        if (!bookId) return;

        try {
            const response = await fetch(`${API_BASE_URL}/books/${bookId}/reviews`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const reviews = await response.json();
            renderReviews(reviews);
        } catch (error) {
            console.error('Error fetching reviews:', error);
            showNotification('Failed to load reviews', 'error');
        }
    }

    // Render reviews
    function renderReviews(reviews) {
        const existingReviews = reviewListContent.querySelectorAll('.review-card');
        existingReviews.forEach(review => review.remove());

        if (!reviews || reviews.length === 0) {
            reviewListContent.innerHTML = '<p style="text-align: center; color: #555;">No reviews yet. Be the first to review!</p>';
            return;
        }

        reviews.forEach(review => {
            const reviewCard = document.createElement('div');
            reviewCard.classList.add('review-card');
            reviewCard.dataset.reviewId = review.review_id;

            const customerName = review.customer_name || 'Anonymous';
            const reviewDate = new Date(review.review_date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });

            let deleteButtonHtml = '';
            if (isLoggedIn && currentCustomerId && review.customer_id === currentCustomerId) {
                deleteButtonHtml = `
                    <button class="delete-review-btn" data-review-id="${review.review_id}">
                        <i class="fas fa-trash-alt"></i> Delete
                    </button>
                `;
            }

            reviewCard.innerHTML = `
                <div class="review-header">
                    <span class="reviewer-name">
                        <i class="fas fa-user-circle"></i>
                        ${customerName}
                    </span>
                    <div class="review-rating">${renderStars(review.rating, '1.2rem')}</div>
                </div>
                <p class="review-comment">${review.comment || 'No comment provided.'}</p>
                <div class="review-footer">
                    <p class="review-date">Reviewed on ${reviewDate}</p>
                    ${deleteButtonHtml}
                </div>
            `;

            reviewListContent.appendChild(reviewCard);
        });
    }

    // Submit review (only for logged-in users)
    async function submitReview(rating, comment) {
        if (!isLoggedIn) {
            showNotification('Please sign in to submit a review', 'error');
            setTimeout(() => {
                window.location.href = 'signin.html';
            }, 1500);
            return;
        }

        if (!currentBookId) {
            showNotification('Error: Book ID not found', 'error');
            return;
        }

        const token = getAuthToken();
        try {
            const response = await fetch(`${API_BASE_URL}/books/${currentBookId}/reviews`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    rating: rating,
                    comment: comment
                })
            });

            if (response.ok) {
                showNotification('Review submitted successfully!', 'success');
                // Reset form
                reviewRatingInput.value = '0';
                reviewCommentTextarea.value = '';
                selectedRating = 0;
                resetStarRating();
                // Refresh data
                await fetchBookDetails(bookTitle);
            } else if (response.status === 409) {
                showNotification('You have already reviewed this book', 'info');
            } else {
                const errorData = await response.json();
                showNotification(`Failed to submit review: ${errorData.error || 'Unknown error'}`, 'error');
            }
        } catch (error) {
            console.error('Error submitting review:', error);
            showNotification('Network error occurred while submitting review', 'error');
        }
    }

    // Delete review
    async function deleteReview(reviewId) {
        if (!isLoggedIn) {
            showNotification('Please sign in to delete reviews', 'error');
            return;
        }

        if (!confirm('Are you sure you want to delete this review?')) {
            return;
        }

        const token = getAuthToken();
        try {
            const response = await fetch(`${API_BASE_URL}/books/${currentBookId}/reviews/${reviewId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                showNotification('Review deleted successfully!', 'success');
                await fetchBookDetails(bookTitle);
            } else {
                const errorData = await response.json();
                showNotification(`Failed to delete review: ${errorData.error || 'Unknown error'}`, 'error');
            }
        } catch (error) {
            console.error('Error deleting review:', error);
            showNotification('Network error occurred while deleting review', 'error');
        }
    }

    // Star rating functionality
    function resetStarRating() {
        if (starRatingContainer) {
            Array.from(starRatingContainer.children).forEach(star => {
                star.classList.remove('fas');
                star.classList.add('far');
            });
        }
    }

    // BUTTON EVENT LISTENERS - PROPERLY SCOPED
    function attachButtonEventListeners() {
        // Cart button functionality
        const cartBtn = document.querySelector('.cart-btn');
        if (cartBtn) {
            cartBtn.removeEventListener('click', handleCartClick);
            cartBtn.addEventListener('click', handleCartClick);
        }

        // Wishlist button functionality
        const wishlistBtn = document.querySelector('.icon-btn[href="wishlist.html"]');
        if (wishlistBtn) {
            wishlistBtn.removeEventListener('click', handleWishlistClick);
            wishlistBtn.addEventListener('click', handleWishlistClick);
        }

        // Profile button functionality
        const profileLink = document.getElementById('profile-link');
        if (profileLink) {
            profileLink.removeEventListener('click', handleProfileClick);
            profileLink.addEventListener('click', handleProfileClick);
        }

        // Orders button functionality
        const ordersLink = document.getElementById('orders-link');
        if (ordersLink) {
            ordersLink.removeEventListener('click', handleOrdersClick);
            ordersLink.addEventListener('click', handleOrdersClick);
        }

        // Sign out button functionality
        const signoutLink = document.getElementById('signout-link');
        if (signoutLink) {
            signoutLink.removeEventListener('click', handleSignoutClick);
            signoutLink.addEventListener('click', handleSignoutClick);
        }

        // Search functionality
        const searchButton = document.getElementById('search-button');
        const searchInput = document.getElementById('search-input');

        if (searchButton && searchInput) {
            searchButton.removeEventListener('click', handleSearchClick);
            searchButton.addEventListener('click', handleSearchClick);

            searchInput.removeEventListener('keypress', handleSearchKeypress);
            searchInput.addEventListener('keypress', handleSearchKeypress);
        }
    }

    // Button click handlers
    function handleCartClick(e) {
        e.preventDefault();
        if (isLoggedIn) {
            window.location.href = 'cart.html';
        } else {
            showNotification('Please sign in to view your cart', 'error');
            setTimeout(() => {
                window.location.href = 'signin.html';
            }, 1500);
        }
    }

    function handleWishlistClick(e) {
        e.preventDefault();
        if (isLoggedIn) {
            window.location.href = 'wishlist.html';
        } else {
            showNotification('Please sign in to view your wishlist', 'error');
            setTimeout(() => {
                window.location.href = 'signin.html';
            }, 1500);
        }
    }

    function handleProfileClick(e) {
        e.preventDefault();
        if (isLoggedIn) {
            window.location.href = 'profile.html';
        } else {
            showNotification('Please sign in to view your profile', 'error');
            setTimeout(() => {
                window.location.href = 'signin.html';
            }, 1500);
        }
    }

    function handleOrdersClick(e) {
        e.preventDefault();
        if (isLoggedIn) {
            window.location.href = 'orders.html';
        } else {
            showNotification('Please sign in to view your orders', 'error');
            setTimeout(() => {
                window.location.href = 'signin.html';
            }, 1500);
        }
    }

    function handleSignoutClick(e) {
        e.preventDefault();
        handleSignOut();
    }

    function handleSearchClick(e) {
        e.preventDefault();
        const searchInput = document.getElementById('search-input');
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            window.location.href = `index.html?search=${encodeURIComponent(searchTerm)}`;
        } else {
            showNotification('Please enter a search term', 'info');
        }
    }

    function handleSearchKeypress(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            const searchTerm = e.target.value.trim();
            if (searchTerm) {
                window.location.href = `index.html?search=${encodeURIComponent(searchTerm)}`;
            } else {
                showNotification('Please enter a search term', 'info');
            }
        }
    }

    // Event listeners for star rating and review form
    if (starRatingContainer && isLoggedIn) {
        starRatingContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('fa-star')) {
                selectedRating = parseInt(e.target.dataset.rating);
                reviewRatingInput.value = selectedRating;

                Array.from(starRatingContainer.children).forEach(star => {
                    if (parseInt(star.dataset.rating) <= selectedRating) {
                        star.classList.remove('far');
                        star.classList.add('fas');
                    } else {
                        star.classList.remove('fas');
                        star.classList.add('far');
                    }
                });
            }
        });
    }

    // Review form submission
    if (reviewForm && isLoggedIn) {
        reviewForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const rating = parseInt(reviewRatingInput.value);
            const comment = reviewCommentTextarea.value.trim();

            if (rating === 0 || !comment) {
                showNotification('Please select a rating and write a comment', 'error');
                return;
            }

            await submitReview(rating, comment);
        });
    }

    // Delete review event delegation
    reviewListContent.addEventListener('click', (e) => {
        if (e.target.closest('.delete-review-btn')) {
            const reviewId = e.target.closest('.delete-review-btn').dataset.reviewId;
            deleteReview(parseInt(reviewId, 10));
        }
    });

    // INITIALIZATION - PROPER ORDER
    // 1. First, update authentication UI
    updateAuthenticationUI();

    // 2. Then attach button event listeners
    attachButtonEventListeners();

    // 3. Finally, initialize page content
    if (bookTitle) {
        await fetchBookDetails(bookTitle);
        if (isLoggedIn) {
            updateCartCount();
        }
    } else {
        showNotification('No book specified in URL', 'error');
    }

    // 4. Re-attach event listeners after any DOM updates
    setTimeout(() => {
        attachButtonEventListeners();
    }, 100);
});
