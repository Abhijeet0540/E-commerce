// Function to add product to cart
function addToCart(name, price, image, price_id) {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const activeUserIndex = users.findIndex(user => user.active === true);

    // If an active user is found
    if (activeUserIndex !== -1) {
        const activeUser = users[activeUserIndex];
        
        if (!activeUser.cart) {
            activeUser.cart = [];
        }
        // Check if the product already exists in the cart
        let product = activeUser.cart.find(item => item.name === name);

        if (product) {
            product.quantity += 1;// Increase the quantity
        } else {
            
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

        updateCartCount();
        // Show toast notification
        showToast("Successfully added to cart");
    } else {
        console.error("No active user found in users array.");
    }
}

// Function to update cart count
function updateCartCount() {
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

    if (cartCountElement) {
        // Update cart count
        if (totalItems === 0) {
            cartCountElement.style.display = "none";
            cartCountElement.style.background = "none";
        } else {
            cartCountElement.style.display = "inline"; 
            cartCountElement.textContent = totalItems;
            cartCountElement.style.background = "red";
        }
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


