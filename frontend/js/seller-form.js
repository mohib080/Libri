console.log("Script running!");

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOMContentLoaded fired!");
    const token = localStorage.getItem('token');

    // Security check: Redirect to login if not a valid seller
    let isSeller = false;
    if (token) {
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            if (payload.isSeller) {
                isSeller = true;
            }
        } catch (e) {
            isSeller = false;
        }
    }

    if (!isSeller) {
        localStorage.clear();
        window.location.href = 'seller-login.html';
        return;
    }

    const bookForm = document.getElementById('bookInfoForm');

    const paymentMethodSelect = document.getElementById('payment-method');
    const cardNumber = document.getElementById('card-number');
    const cardHolderName = document.getElementById('card-holder-name');
    const expiryDate = document.getElementById('expiry-date');
    const cvv = document.getElementById('cvv');
    const cardFields = [cardNumber, cardHolderName, expiryDate, cvv];

    function updateCardFieldRequirements() {
        if (paymentMethodSelect.value === 'credit-debit') {
            cardFields.forEach(field => field.required = true);
        } else {
            cardFields.forEach(field => field.required = false);
        }
    }

    paymentMethodSelect.addEventListener('change', updateCardFieldRequirements);
    // Run it once immediately in case the user loads with COD selected
    updateCardFieldRequirements();



    bookForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        console.log("Form submit event triggered!");

        const formData = {
            title: document.getElementById('book-title').value,
            authorName: document.getElementById('author-name').value,
            format: document.getElementById('format').value,
            description: document.getElementById('description').value,
            price: document.getElementById('price').value,
            isbn: document.getElementById('isbn').value,
            publisher: document.getElementById('publisher').value,
            publicationDate: document.getElementById('publication-date').value,
            quantity: document.getElementById('quantity').value
        };

        try {
            const response = await fetch('http://localhost:3000/api/seller/books', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error);

            showNotification(data.message, 'success');
            bookForm.reset();

        } catch (error) {
            showNotification(error.message, 'error');
        }
    });
});

function showNotification(message, type) {
    const notificationElement = document.getElementById('notification');
    notificationElement.textContent = message;
    notificationElement.className = `p-3 my-4 text-sm text-center rounded-md ${type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`;
    notificationElement.style.display = 'block';

    setTimeout(() => {
        notificationElement.style.display = 'none';
    }, 5000);
}
