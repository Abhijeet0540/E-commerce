document.addEventListener('DOMContentLoaded', () => {
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');

    signUpButton.addEventListener('click', () => {
        container.classList.add("right-panel-active");
    });
    signInButton.addEventListener('click', () => {
        container.classList.remove("right-panel-active");
    });

    // Handle the sign-up form submission
    document.querySelector('.sign-up-container form').addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('signUpName').value.trim();
        const email = document.getElementById('signUpEmail').value.trim();
        const password = document.getElementById('signUpPassword').value.trim();

        const users = JSON.parse(localStorage.getItem('users')) || [];

        if (!name || !email || !password) {
            showToast("Please fill in all the required fields.", true);
            return false; // Return false if validation fails
        }

        // Name must be at least 2 characters long
        if (name.length < 2) {
            showToast("Name must be at least 2 characters long.", true);
            return false;
        }

        // Name length validation (max 9 characters)
        if (name.length > 9) {
            showToast("Name must be at most 9 characters long.", true);
            return false;
        }

        // Special character validation
        if (!/^[a-zA-Z\s]+$/.test(name)) {
            showToast("Name must not contain special characters.", true);
            return false;
        }

        const emailPattern = /^[^\s@]+@gmail\.com$/;
        if (!emailPattern.test(email)) {
            showToast("Please enter a valid Gmail address.", true);
            return false;
        }

        if (password.length < 6) {
            showToast("Password must be at least 6 characters long.", true);
            return false;
        }

        if (users.some(user => user.email === email)) {
            showToast("Email is already registered. Please use a different email.", true);
            return false;
        }

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

        return true; // Return true on successful sign-up
    });

    // Handle the sign-in form submission with validation
    document.querySelector('.sign-in-container form').addEventListener('submit', (e) => {
        e.preventDefault();

        const email = document.getElementById('signInEmail').value.trim();
        const password = document.getElementById('signInPassword').value.trim();

        if (!email && !password) {
            showToast("Please enter your email and password.", true);
            return false;
        }

        if (!email) {
            showToast("Please enter your email address.", true);
            return false;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            showToast("Please enter a valid email address.", true);
            return false;
        }

        if (!password) {
            showToast("Please enter your password.", true);
            return false;
        }

        if (password.length < 6) {
            showToast("Password must be at least 6 characters long.", true);
            return false;
        }

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(user => user.email === email && user.password === password);

        if (!user) {
            showToast("Invalid email or password. Please try again.", true);
            return false;
        }

        localStorage.setItem('loggedInUser', JSON.stringify(user));
        showToast(`Welcome to Furni, ${user.name}!`);

        // Spinner
        const spinner = document.getElementById('spinner');
        spinner.style.display = 'block';

        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);

        return true; // Return true on successful sign-in
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
            toast.addEventListener('transitionend', () => toast.remove());
        }, 2000);
    }
});

//togglePassword to show show/hide password
const togglePassword = document.querySelector("#togglePassword");
const password = document.querySelector("#signInPassword");

togglePassword.addEventListener("click", function () {
    const type = password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);
    this.classList.toggle("fa-eye-slash");
});
