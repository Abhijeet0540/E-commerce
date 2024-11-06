// Function to add products to the active user's cart
function addToCart(name, price, image, price_id) {
    // Retrieve users array from local storage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Find the active user
    const activeUserIndex = users.findIndex(user => user.active === true);

    // If an active user is found
    if (activeUserIndex !== -1) {
        const activeUser = users[activeUserIndex];
        
        // Initialize the cart if it doesn't exist
        if (!activeUser.cart) {
            activeUser.cart = [];
        }

        // Check if the product already exists in the cart
        let product = activeUser.cart.find(item => item.name === name);

        if (product) {
            // If product exists, increase the quantity
            product.quantity += 1;
        } else {
            // Add new product with image and price_id
            activeUser.cart.push({
                name: name,
                price: price,
                quantity: 1,
                image: image,
                price_id: price_id
            });
        }

        // Update users array in local storage
        users[activeUserIndex] = activeUser;
        localStorage.setItem("users", JSON.stringify(users));

        // Update cart count
        updateCartCount();

        // Show toast notification
        showToast("Successfully added to cart");
    } else {
        console.error("No active user found in users array.");
    }
}

// Function to update the cart count in the navbar
function updateCartCount() {
    // Retrieve the active user's cart from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const activeUser = users.find(user => user.active === true);

    if (!activeUser) {
        console.error("No active user found.");
        return;
    }

    const cart = activeUser.cart || [];

    // Calculate total items
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    console.log("Total items in cart:", totalItems); // Debugging line to check total items
    const cartCountElement = document.getElementById('cart-count');

    // Check if the cartCountElement exists
    if (cartCountElement) {
        cartCountElement.textContent = totalItems;

        // Hide the cart count if it's 0
        // cartCountElement.style.display = totalItems === 0 ? 'none' : 'inline ';
        cartCountElement.style.background = totalItems === 0 ? '#ccc' : 'red';
        // loggedInUser is null then hide the cart count with a display of none
        // if(loggedInUser === null) {
        //     cartCountElement.style.background = '#fff';
        //     cartCountElement.style.display = 'none';
        // }
    } else {
        console.warn('Element with ID "cart-count" not found in the DOM.');
    }
}

// Call the updateCartCount function when the page loads
document.addEventListener('DOMContentLoaded', updateCartCount);

// Function to show toast notification
function showToast(message) {
    const toastElement = document.getElementById('cart-toast');
    const toastBody = toastElement.querySelector('.toast-body');
    toastBody.innerHTML = `<i class="fas fa-check-circle me-2"></i> ${message}`;

    const toast = new bootstrap.Toast(toastElement);
    toast.show();

    // Reload the page after 1 second
    setTimeout(() => {
        window.location.reload();
    }, 1000);
}
