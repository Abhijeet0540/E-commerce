// Logout functionality
document.getElementById("logout").addEventListener("click", function(event) {
    event.preventDefault(); 

    const confirmation = confirm("Are you sure you want to log out?");
    
    if (confirmation) {
        try {
            // Get loggedInUser data from localStorage
            const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
            const users = JSON.parse(localStorage.getItem('users')) || [];

            // Find the user index in the stored users array
            const userIndex = users.findIndex(user => user.email === loggedInUser.email);
            
            if (userIndex !== -1) {
                // Set the user's active status to false
                users[userIndex].active = false;  
                localStorage.setItem('users', JSON.stringify(users));
            }

            // Remove loggedInUser from localStorage
            localStorage.removeItem('loggedInUser');

            // Update UI elements after logout
            const usernameElement = document.getElementById("username");
            const userDropdown = document.getElementById("userDropdown");

            if (usernameElement && userDropdown) {
                usernameElement.textContent = "Login";
                usernameElement.href = "login.html";
                userDropdown.style.display = 'none'; 
            }

            // Show a success toast message
            showToast("You have been logged out successfully.");

            // Redirect to login page after a short delay
            setTimeout(() => {
                window.location.href = "login.html"; 
            }, 1000);
        } catch (error) {
            console.error("Logout error:", error);
            showToast("An error occurred while logging out. Please try again.", true);
        }
    }
});
