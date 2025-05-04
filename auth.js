const signinForm = document.getElementById('signin-form');
const signupForm = document.getElementById('signup-form');

function showSignUp() {
    signinForm.style.display = 'none';
    signupForm.style.display = 'block';
}

function showSignIn() {
    signupForm.style.display = 'none';
    signinForm.style.display = 'block';
}

// In a real application, you would handle form submissions using JavaScript
// to send data to your backend for authentication and user creation.
document.getElementById('signin').addEventListener('submit', function (event) {
    event.preventDefault();
    const email = document.getElementById('signin-email').value;
    const password = document.getElementById('signin-password').value;
    console.log('Signing in with:', email, password);
    // Here you would typically send this data to your backend
});

document.getElementById('signup').addEventListener('submit', function (event) {
    event.preventDefault();
    const firstname = document.getElementById('signup-firstname').value;
    const lastname = document.getElementById('signup-lastname').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    console.log('Signing up with:', firstname, lastname, email, password);
    // Here you would typically send this data to your backend
});