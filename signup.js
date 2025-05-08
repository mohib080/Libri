document.getElementById('signup').addEventListener('submit', function (event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirm = document.getElementById('confirm').value;

    if (password !== confirm) {
        alert('Passwords do not match!');
        return;
    }

    console.log('Signing up with:', username, email, password);
    // TODO: Send signup data to backend
});
