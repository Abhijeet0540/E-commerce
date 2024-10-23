
// Initialize cart from localStorage or create an empty array
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to add products to the cart
function addToCart(name, price, image, price_id) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let product = cart.find(item => item.name === name);

    if (product) {
        product.quantity += 1; // Increase quantity
    } else {
        // Add new product with image and price_id
        cart.push({
            name: name,
            price: price,
            quantity: 1,
            image: image,  // Store the product image URL
            price_id: price_id // Store the price_id
        });
    }

    // Save the updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update cart count
    updateCartCount();

    // Show toast notification
    showToast("Successfully added to cart");
}

// Function to update the cart count in the navbar
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0); // Calculate total items
    const cartCountElement = document.getElementById('cart-count');

    // Check if the cartCountElement exists
    if (cartCountElement) {
        cartCountElement.textContent = totalItems;

        // Hide the cart count if it's 0
        if (totalItems === 0) {
            cartCountElement.style.display = 'none';
        } else {
            cartCountElement.style.display = 'inline'; // Show if there are items
        }
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

    // Optional: reload the page after a brief moment (set to 1 second)
    setTimeout(() => {
        window.location.reload();
    }, 1000);
}



// can you do this the my data stoded in local storage my naming users to read the data in and how this id username
// must have log in in card 

// only Fetch user data from local storage with the key 'users'
// and show in username in navbar

