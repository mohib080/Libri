// Dark/Light mode toggle functionality
const darkModeToggle = document.getElementById("dark-mode-toggle");

// Check if dark mode is enabled in localStorage
if (localStorage.getItem("dark-mode") === "enabled") {
    document.body.classList.add("dark-mode");
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>'; // Sun icon for light mode
}

darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    // Update the button icon and save the state in localStorage
    if (document.body.classList.contains("dark-mode")) {
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>'; // Sun icon for light mode
        localStorage.setItem("dark-mode", "enabled");
    } else {
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>'; // Moon icon for dark mode
        localStorage.setItem("dark-mode", "disabled");
    }
});