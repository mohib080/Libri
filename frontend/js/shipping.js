document.addEventListener('DOMContentLoaded', () => {
    const API_BASE_URL = 'http://localhost:3000/api';
    const checkoutData = JSON.parse(localStorage.getItem('checkoutData') || '{}');

    // If no checkout data, redirect back to cart
    if (!checkoutData.items || !checkoutData.items.length) {
        window.location.href = 'cart.html';
        return;
    }

    // Populate order summary table
    const orderTableBody = document.querySelector('#orderSummaryTable tbody');
    checkoutData.items.forEach(item => {
        const row = document.createElement('tr');
        row.classList.add('border-b', 'border-gray-100');
        row.innerHTML = `
            <td class="py-3 px-4 text-gray-800">${item.title} (${item.format})</td>
            <td class="py-3 px-4 text-gray-800">${item.quantity}</td>
            <td class="py-3 px-4 text-right text-gray-800">$${(item.price * item.quantity).toFixed(2)}</td>
        `;
        orderTableBody.appendChild(row);
    });

    // Update total amounts
    const subtotal = checkoutData.totalAmount;
    const shipping = 5.00; // Fixed shipping cost
    const total = subtotal + shipping;

    document.getElementById('subtotalAmount').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('shippingAmount').textContent = `$${shipping.toFixed(2)}`;
    document.getElementById('totalAmount').textContent = `$${total.toFixed(2)}`;

    // Handle form submission
    document.getElementById('shippingForm').addEventListener('submit', async (e) => {
        e.preventDefault();

        // Always get address from form (no profile option anymore)
        const shippingData = {
            address: document.getElementById('addressBox').value,
            city: document.getElementById('city').value,
            postal_code: document.getElementById('postalCode').value,
            country: document.getElementById('country').value
        };

        try {
            const token = localStorage.getItem('token');
            const checkoutData = JSON.parse(localStorage.getItem('checkoutData') || '{}');

            const response = await fetch(`${API_BASE_URL}/orders`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    shipping: shippingData,
                    items: checkoutData.items.map(item => ({
                        bookId: item.bookId,
                        quantity: item.quantity,
                        price: item.price,
                        formatId: item.formatId // Use formatId instead of format
                    })),
                    totalAmount: checkoutData.totalAmount
                })
            });

            const data = await response.json();

            if (response.ok) {
                // Store order success info
                localStorage.setItem('orderSuccess', 'true');
                localStorage.setItem('lastOrderId', data.order_id);
                localStorage.removeItem('checkoutData'); // Clear checkout data

                // Redirect to orders page
                window.location.href = 'orders.html';
            } else {
                throw new Error(data.error || 'Failed to create order');
            }
        } catch (error) {
            console.error('Error creating order:', error);
            alert('Failed to create order. Please try again.');
        }
    });
});
