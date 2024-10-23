document.addEventListener('DOMContentLoaded', () => {
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');

    // Add and remove the "right-panel-active" class for Sign Up and Sign In transitions
    signUpButton.addEventListener('click', () => {
        container.classList.add("right-panel-active");
    });
    signInButton.addEventListener('click', () => {
        container.classList.remove("right-panel-active");
    });

    // Handle the sign-up form submission
    document.querySelector('.sign-up-container form').addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('signUpName').value;
        const email = document.getElementById('signUpEmail').value;
        const password = document.getElementById('signUpPassword').value;
        // Retrieve users from localStorage
        const users = JSON.parse(localStorage.getItem('users')) || [];

        if (!name || !email || !password) {
            showToast("Please fill in all the fields.", true);
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            showToast("Please enter a valid email address.", true);
            return;
        }

        if (password.length < 6) {
            showToast("Password must be at least 6 characters long.", true);
            return;
        }

        // Check if the email is already used
        if (users.some(user => user.email === email)) {
            showToast("Email is already registered. Please use a different email.", true);
            return;
        }

        // Store new user in localStorage
        const newUser = { name, email, password };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        document.getElementById('signUpName').disabled = true;
        document.getElementById('signUpEmail').disabled = true;
        document.getElementById('signUpPassword').disabled = true;

        showToast("Account created successfully!");

        setTimeout(() => {
            container.classList.remove("right-panel-active");
        }, 2000);
    });

    // Handle the sign-in form submission
    document.querySelector('.sign-in-container form').addEventListener('submit', (e) => {
        e.preventDefault();
    
        const email = document.getElementById('signInEmail').value;
        const password = document.getElementById('signInPassword').value;
    
        if (!email || !password) {
            showToast("Please fill in all the fields.", true);
            return;
        }
    
        // Retrieve users from localStorage
        const users = JSON.parse(localStorage.getItem('users')) || [];
    
        // Find the user by email and password
        const user = users.find(user => user.email === email && user.password === password);
    
        if (user) {
            // Store the logged-in user in local storage
            localStorage.setItem('loggedInUser', JSON.stringify(user));
            
            showToast(`Welcome to Furni, ${user.name}!`);
            setTimeout(() => {
                window.location.href = 'index.html'; // Redirect to the home page
            }, 2000);
        } else {
            showToast("Invalid email or password. Please try again.", true);
        }
    });
    // Function to show toast notifications
    function showToast(message, isError = false) {
        const toast = document.createElement('div');
        toast.className = `toast ${isError ? 'toast-error' : 'toast-success'}`;
        toast.textContent = message;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.display = 'block';
            toast.style.opacity = '1';
        }, 100);

        
        setTimeout(() => {
            toast.classList.add('fade-out');
            toast.addEventListener('transitionend', () => {
                toast.remove(); 
            });
        }, 1000);
    }
});


    // Logout functionality
//     document.getElementById("logout").addEventListener("click", function(event) {
//         event.preventDefault(); // Prevent default link behavior

//         // Show a confirmation dialog
//         const confirmation = confirm("Are you sure you want to log out?");
        
//         if (confirmation) {
//             try {
//                 // Clear local storage
//                 localStorage.clear();
//                 // Clear session data (if any)
//                 sessionStorage.clear();

//                 // Show a success toast message
//                 showToast("You have been logged out successfully.");

//                 // Redirect to login or homepage after a brief delay
//                 setTimeout(() => {
//                     window.location.href = "login.html"; // Change to your login or homepage URL
//                 }, 2000); // Adjust the delay as needed
//             } catch (error) {
//                 console.error("Logout error:", error);
//                 showToast("An error occurred while logging out. Please try again.", true);
//             }
//         } 
//     });
// });


// Handle the sign-in form submission

