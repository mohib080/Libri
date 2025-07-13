document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('signup');

    if (!form) {
        console.error('Signup form not found');
        return;
    }

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        const name = document.getElementById('username').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const confirm = document.getElementById('confirm').value;
        const phone_number = document.getElementById('phone')?.value?.trim() || '';
        const address = document.getElementById('address')?.value?.trim() || '';
        if (!name || !email || !password || !confirm) {
            alert('Please fill out all required fields.');
            return;
        }

        if (password !== confirm) {
            alert('Passwords do not match!');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                    phone_number,
                    address
                })
            });

            const data = await response.json();

            if (response.ok) {
                alert('Signup successful!');
                localStorage.setItem('token', data.token);
                localStorage.setItem('customer_name', data.customer.name);
                localStorage.setItem('customer_id', data.customer.customer_id);
                localStorage.setItem('customer_email', data.customer.email);
                localStorage.setItem('customer_role', data.customer.role);
                window.location.href = '/'; 
            } else {
                alert('Signup failed: ' + (data.error || 'Unknown error.'));
            }

        } catch (err) {
            console.error('Error during signup:', err);
            alert('Network error or server is not responding.');
        }
    });
});
