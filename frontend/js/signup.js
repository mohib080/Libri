document.getElementById('signup').addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm').value;

    // Basic validation
    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    // You can later replace this with an actual POST request to your server
    console.log("User signed up:", { username, email, password });

    alert("Signup successful!");

    // Optionally redirect to login page
    window.location.href = 'signin.html';
});
