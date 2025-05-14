document.getElementById('signin').addEventListener('submit', function (event) {
    event.preventDefault();

    const emailOrUsername = document.getElementById('signin-email').value.trim();
    const password = document.getElementById('signin-password').value;

    // Simulated login check — replace with real backend logic
    if (emailOrUsername === "admin" && password === "1234") {
        alert("Login successful!");
        // Redirect to homepage or dashboard
        window.location.href = 'index.html'; 
    } else {
        alert("Invalid credentials. Try again.");
    }
});
