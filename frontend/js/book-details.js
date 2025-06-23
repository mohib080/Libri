document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const bookTitle = urlParams.get('name');
    let currentBookId = null;

    const bookDetailsContent = document.getElementById('book-details-content');
    const reviewListContent = document.getElementById('review-list-content');
    const API_BASE_URL = 'http://localhost:3000/api';


    function renderStars(rating, size = '1.2rem') {
        let stars = '';
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0 && rating > 0; 
        const emptyStars = 5 - Math.ceil(rating);

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

    if (bookTitle) {
        fetchBookDetails(bookTitle);
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

                // Display average rating, formatted to 2 decimal places
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
                            <button><i class="fas fa-shopping-cart"></i> Add to Cart</button>
                            <button><i class="fas fa-heart"></i> Add to Wishlist</button>
                        </div>
                    </div>
                `;

                // After book details are loaded, fetch its reviews
                fetchBookReviews(currentBookId);

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

                    // Use customer_name from backend, default to 'Anonymous' if not available
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


    // Dark mode toggle functionality (copied for consistency)
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    if (localStorage.getItem("dark-mode") === "enabled") {
        document.body.classList.add("dark-mode");
        if (darkModeToggle) darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    if (darkModeToggle) {
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
});
