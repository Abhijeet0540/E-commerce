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
            return;
        }
        // name length validation 4
        if (name.length < 4) {
            showToast("Name must be at least 4 characters long.", true);
            return;
        }
        // spacal caracter validation
        if (!/^[a-zA-Z\s]+$/.test(name)) {
            showToast("Name must not contain special characters.", true);
            return;
        }

        const emailPattern = /^[^\s@]+@gmail\.com$/;
        if (!emailPattern.test(email)) {
            showToast("Please enter a valid Gmail address.", true);
            return;
        }

        if (password.length < 6) {
            showToast("Password must be at least 6 characters long.", true);
            return;
        }

        if (users.some(user => user.email === email)) {
            showToast("Email is already registered. Please use a different email.", true);
            return;
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
    });

    // Handle the sign-in form submission with validation
    document.querySelector('.sign-in-container form').addEventListener('submit', (e) => {
        e.preventDefault();
    
        const email = document.getElementById('signInEmail').value.trim();
        const password = document.getElementById('signInPassword').value.trim();

        if (!email && !password) {
            showToast("Please enter your email and password.", true);
            return;
        }

        if (!email) {
            showToast("Please enter your email address.", true);
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            showToast("Please enter a valid email address.", true);
            return;
        }

        if (!password) {
            showToast("Please enter your password.", true);
            return;
        }
        
        if(password.length < 6) {
            showToast("Password must be at least 6 characters long.", true);
            return;
        }

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(user => user.email === email && user.password === password);

        if (!user) {
            showToast("Invalid email or password. Please try again.", true);
            return;
        }

        localStorage.setItem('loggedInUser', JSON.stringify(user));
        showToast(`Welcome to Furni, ${user.name}!`);

        //spinner
        const spinner = document.getElementById('spinner');
        spinner.style.display = 'block';

        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000); // Adjust the timing if needed
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
