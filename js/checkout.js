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

    // "Postal Code / Zip is required."
    if (postal && postal.value.trim() === "") {
        showError(postal, "Postal Code / Zip is required.");
        isValid = false;
    } 
    
    else if (postal.value.trim().length !== 5 && postal.value.trim().length !== 9) {
        showError(postal, "Postal Code must be 5 or 9 digits long.");
        isValid = false;
    }
    else if (!/^[0-9]+$/.test(postal.value.trim())) {
        showError(postal, "Postal Code must contain only digits.");
        isValid = false;
    }
    // "Email address is not valid."
    if (email && email.value.trim() === "") {
        showError(email, "Email Address is required.");
        isValid = false;
    }
    //"Email can only contain letters, numbers, and standard symbols
    else if (!/^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email.value.trim())) {
        showError(email, "Email Address contains invalid characters.");
        isValid = false;
    }
    
    if (phone && phone.value.trim() === "") {
        showError(phone, "Phone Number is required.");
        isValid = false;
    } 
    // "Phone number must contain only digits."
    else if (!/^[0-9]+$/.test(phone.value.trim())) {
        showError(phone,"Phone Number must contain only digits.");
        isValid = false;
    }
    //"Phone number must be 10 digits."
    else if (phone.value.trim().length !== 10) {
        showError(phone, "Phone Number must be 10 digits long.");
        isValid = false;
    }

    // If all fields are valid, proceed with payment
    if (isValid) {
        // Initialize Stripe
        let stripe = Stripe("pk_test_51QA8RPIHWM8A4yFZqrWojP8IF2x896DJdUWpc999Liof9dPfCrP3iIyTEILm1FfbUxAy601S2guAdzzTex3n8A6v004uaGvLDE");

        // Retrieve active user from the `users` array
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
        const activeUser = users.find(user => user.email === loggedInUser.email && user.active);

        if (!activeUser) {
            console.error("Active user not found or not logged in.");
            return;
        }

        // Create an array of line items for Stripe Checkout
        const cartItems = activeUser.cart.map(item => ({
            price: item.price_id,
            quantity: item.quantity
        }));

        // Redirect to Stripe Checkout
        stripe.redirectToCheckout({
            lineItems: cartItems,
            mode: "payment",
            successUrl: "http://127.0.0.1:53810/thankyou.html",
            cancelUrl: "http://127.0.0.1:53810/error.html",
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
    input.style.boxShadow = "0 0 0.2rem 0.2rem rgba(220, 53, 69, 0.25)";
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


document.querySelectorAll('.form-control').forEach(input => {
    input.addEventListener('focus', () => clearError(input));
    input.addEventListener('input', () => clearError(input)); 
});

document.addEventListener('DOMContentLoaded', function () {

    updateCartTotals();
    
});


// Function to update cart totals
function updateCartTotals() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const activeUser = users.find(user => user.email === loggedInUser.email && user.active);

    if (!activeUser) {
        console.error("Active user not found or not logged in.");
        return;
    }

    const cart = activeUser.cart || [];
    let subtotal = 0;

    const orderTableBody = document.querySelector('tbody');

    // Clear existing rows
    while (orderTableBody.rows.length > 2) {
        orderTableBody.deleteRow(0);
    }

    // Loop through cart items and calculate subtotal
    cart.forEach((item) => {
        const totalItemPrice = item.price * item.quantity;
        subtotal += totalItemPrice;

        // Create a new row for each cart item.
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name} <strong class="mx-2">x</strong> ${item.quantity}</td>
            <td>$${totalItemPrice.toFixed(2)}</td>
            
        `;
        orderTableBody.insertBefore(row, orderTableBody.firstChild);
    });
    
    // Add row to show subtotal
    
    // Update the subtotal and total and Discount
    document.querySelector('.site-block-order-table tbody tr:nth-last-child(2) td:last-child').textContent = `$${subtotal.toFixed(2)}`;
    document.querySelector('.site-block-order-table tbody tr:last-child td:last-child strong').textContent = `$${subtotal.toFixed(2)}`;
}


function applyCoupon() {
    const couponCodeInput = document.getElementById('coupon_code');
    const couponCode = couponCodeInput.value.trim();
    const validCoupons = {
        "SAVE10": 0.10,  // 10% discount
        "SAVE20": 0.20   // 20% discount
    };

    const orderTableBody = document.querySelector('.order-table tbody');
    const subtotalElement = document.querySelector('#order-subtotal');
    const totalElement = document.querySelector('#order-total strong');
    
    let subtotal = parseFloat(subtotalElement.textContent.replace('$', ''));
    const discountRate = validCoupons[couponCode] || 0;

    // Remove any existing discount row to avoid duplicates
    const existingDiscountRow = document.getElementById('order-discount');
    if (existingDiscountRow) {
        existingDiscountRow.remove();
    }

    // Check if the coupon code is valid and apply the discount
    if (discountRate > 0) {
        const discountAmount = subtotal * discountRate;
        const newTotal = subtotal - discountAmount;

        // Add a new row for the discount amount
        const discountRow = document.createElement('tr');
        discountRow.id = 'order-discount';
        discountRow.innerHTML = `
            <td class="text-primary fs-6"><strong>Discount (${couponCode})</strong></td>
            <td class="text-primary"><strong>-$${discountAmount.toFixed(2)}</strong></td>
        `;
        // Insert the discount row above the total row
        orderTableBody.insertBefore(discountRow, totalElement.closest('tr'));

        // Update the total with the discounted amount
        totalElement.textContent = `$${newTotal.toFixed(2)}`;

        Swal.fire({
            icon: 'success',
            title: 'Coupon Applied',
            text: `Coupon "${couponCode}" Applied successfully.`,
        });
    } else {
        // Alert if the coupon code is invalid
        Swal.fire({
            icon: 'error',
            title: 'Invalid Coupon',
            text: 'Please enter a valid coupon code.',
        });
    }

    // Clear the coupon code input field
    couponCodeInput.value = '';
}
