document.getElementById('signin').addEventListener('submit', function (event) {
    event.preventDefault();
    const email = document.getElementById('signin-email').value;
    const password = document.getElementById('signin-password').value;
    console.log('Signing in with:', email, password);
    // TODO: Send login data to backend
});
