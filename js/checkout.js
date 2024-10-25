// Function to validate the form when "Place Order" button is clicked
function placeOrder(event) {
    event.preventDefault();

    clearAllErrors();

    // Validate all fields
    const country = document.getElementById('country-select');
    const firstName = document.getElementById('country-fname');
    const lastName = document.getElementById('country-lname');
    const address = document.getElementById('country-address');
    const state = document.getElementById('country-state');
    const postal = document.getElementById('country-zip');
    const email = document.getElementById('country-email');
    const phone = document.getElementById('country-phone');

    let isValid = true;

    // Validate each field
    if (country && country.value.trim() === "") {
        showError(country, "Country Name is required.");
        isValid = false;
    }

    if (firstName && firstName.value.trim() === "") {
        showError(firstName, "First Name is required.");
        isValid = false;
    } else if (firstName.value.trim().length < 2) {
        showError(firstName, "First Name must be at least 2 characters long.");
        isValid = false;
    } else if (!/^[A-Za-z]+$/.test(firstName.value.trim())) {
        showError(firstName, "First Name must contain only letters.");
        isValid = false;
    }

    if (lastName && lastName.value.trim() === "") {
        showError(lastName, "Last Name is required.");
        isValid = false;
    } else if (lastName.value.trim().length < 2) {
        showError(lastName, "Last Name must be at least 2 characters long.");
        isValid = false;
    } else if (!/^[A-Za-z]+$/.test(lastName.value.trim())) {
        showError(lastName, "Last Name must contain only letters.");
        isValid = false;
    }


    if (address && address.value.trim() === "") {
        showError(address, "Address is required.");
        isValid = false;
    } else if (address.value.trim().length < 10) {
        showError(address, "Address must be at least 10 characters long.");
        isValid = false;
    }

    if (state && state.value.trim() === "") {
        showError(state, "State / Country is required.");
        isValid = false;
    }

    if (postal && postal.value.trim() === "") {
        showError(postal, "Postal Code / Zip is required.");
        isValid = false;
    } else if (!/^\d{5}(-\d{4})?$/.test(postal.value)) {  // Example: US ZIP code format
        showError(postal, "Enter a valid Postal Code.");
        isValid = false;
    }

    if (email && email.value.trim() === "") {
        showError(email, "Email Address is required.");
        isValid = false;
    } else if (!validateEmail(email.value.trim())) {
        showError(email, "Please enter a valid Email Address.");
        isValid = false;
    } else if (email.value.trim().includes("example.com")) {
        showError(email, "Emails from example.com are not allowed.");
        isValid = false;
    } else if (email.value.trim().includes(" ")) {
        showError(email, "Email Address cannot contain spaces.");
        isValid = false;
    }

    if (phone && phone.value.trim() === "") {
        showError(phone, "Phone Number is required.");
        isValid = false;
    } else if (!/^[0-9]{10}$/.test(phone.value.trim())) {
        showError(phone, "Please enter a valid Phone Number.");
        isValid = false;
    }

    // If all fields are valid, proceed with payment
    if (isValid) {
        let stripe = Stripe("pk_test_51QA8RPIHWM8A4yFZqrWojP8IF2x896DJdUWpc999Liof9dPfCrP3iIyTEILm1FfbUxAy601S2guAdzzTex3n8A6v004uaGvLDE");

        const cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Create an array of line items
        const cartItems = cart.map(item => {
            return {
                price: item.price_id,
                quantity: item.quantity
            };
        });

        // Redirect to Stripe Checkout
        stripe.redirectToCheckout({
            lineItems: cartItems,
            mode: "payment",
            successUrl: "http://127.0.0.1:57612/thankyou.html",
            cancelUrl: "http://127.0.0.1:57612/error.html",
        }).then(function (result) {
            if (result.error) {
                console.log(result.error.message);
            }
        });
        clearAllInputFields();

    }
}

// Function to show error messages
function showError(input, message) {
    const error = document.createElement('span');
    error.classList.add('text-danger', 'error-message');
    error.textContent = message;
    input.parentElement.appendChild(error);
    input.classList.add('is-invalid');
    input.style.boxShadow = "0 0 0 0.2rem rgba(220, 53, 69, 0.25)";
}

// Function to clear the error message for a specific input
function clearError(input) {
    const errorMessages = input.parentElement.querySelectorAll('.error-message');
    errorMessages.forEach(error => error.remove());
    input.classList.remove('is-invalid');
    input.style.boxShadow = "";
}

// Function to clear all error messages (used on form submission)
function clearAllErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(error => error.remove());
}
// clear all input fields 
function clearAllInputFields() {
    const inputFields = document.querySelectorAll('.form-control');
    inputFields.forEach(input => input.value = '');
}
// Function to validate email format
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

// A
document.querySelectorAll('.form-control').forEach(input => {
    input.addEventListener('focus', () => clearError(input));
    input.addEventListener('input', () => clearError(input)); 
});

document.addEventListener('DOMContentLoaded', function () {

    updateCartTotals();
});


// Function to update cart totals
function updateCartTotals() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let subtotal = 0;

    const orderTableBody = document.querySelector('tbody');

    // Clear existing rows except for the subtotal and total rows
    while (orderTableBody.rows.length > 2) {
        orderTableBody.deleteRow(0);
    }

    // Loop through cart items and calculate subtotal
    cart.forEach((item) => {
        const totalItemPrice = item.price * item.quantity;
        subtotal += totalItemPrice;

        // Create a new row for each cart item
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name} <strong class="mx-2">x</strong> ${item.quantity}</td>
            <td>$${totalItemPrice.toFixed(2)}</td>
        `;
        orderTableBody.insertBefore(row, orderTableBody.firstChild);
    });

    // Update the subtotal and total in the table in my 
    document.querySelector('.site-block-order-table tbody tr:nth-last-child(2) td:last-child').textContent = `$${subtotal.toFixed(2)}`;
    document.querySelector('.site-block-order-table tbody tr:last-child td:last-child strong').textContent = `$${subtotal.toFixed(2)}`;
}
