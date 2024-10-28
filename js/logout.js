// Logout functionality
document.getElementById("logout").addEventListener("click", function(event) {
    event.preventDefault(); 

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger bg-danger me-2'
        },
        buttonsStyling: false
    });

    // SweetAlert confirmation dialog with Bootstrap buttons
    swalWithBootstrapButtons.fire({
        title: `Are you sure?`,
        text: "You will be logged out and redirected to the login page.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Logout",
        cancelButtonText: "Cancel",
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
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

                
                localStorage.removeItem('loggedInUser');

                const usernameElement = document.getElementById("username");
                const userDropdown = document.getElementById("userDropdown");
                // Update UI elements after logout
                if (usernameElement && userDropdown) {
                    usernameElement.textContent = "Login";
                    usernameElement.href = "login.html";
                    userDropdown.style.display = 'none'; 
                }

                swalWithBootstrapButtons.fire({
                    title: "Logged Out!",
                    text: "You have been logged out successfully.",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1500
                });

                // Redirect to login page after a short delay
                setTimeout(() => {
                    window.location.href = "login.html"; 
                }, 2000);
            } catch (error) {
                console.error("Logout error:", error);
                // Show an error toast message
                showToast("An error occurred while logging out. Please try again.", true);
            }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            showToast("Logout cancelled.", false);
            
        }
        
    });
});
