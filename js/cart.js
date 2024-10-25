document.addEventListener('DOMContentLoaded', () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    
    if (loggedInUser) {
        const userIndex = users.findIndex(user => user.email === loggedInUser.email);
        
        if (users[userIndex] && users[userIndex].active) {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            const cartTableBody = document.querySelector('tbody');
            let subtotal = 0; 

            cart.forEach(product => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td class="product-thumbnail"><img src="${product.image}" alt="Image" class="img-fluid"></td>
                    <td class="product-name"><h2 class="h5 text-black">${product.name}</h2></td>
                    <td>$${product.price.toFixed(2)}</td>
                    <td>
                        <div class="input-group mb-3 d-flex align-items-center quantity-container" style="max-width: 120px;">
                            <div class="input-group-prepend">
                                <button class="btn btn-outline-black decrease" type="button" onclick="updateQuantity('${product.name}', -1)">&minus;</button>
                            </div>
                            <input type="text" class="form-control text-center quantity-amount" value="${product.quantity}" readonly>
                            <div class="input-group-append">
                                <button class="btn btn-outline-black increase" type="button" onclick="updateQuantity('${product.name}', 1)">&plus;</button>
                            </div>
                        </div>
                    </td>
                    <td>$${(product.price * product.quantity).toFixed(2)}</td>
                    <td><a href="#" class="btn btn-black btn-sm" onclick="removeFromCart('${product.name}')">X</a></td>
                `;
                cartTableBody.appendChild(row);

                subtotal += product.price * product.quantity;
            });

            document.getElementById('cart-subtotal').textContent = `$${subtotal.toFixed(2)}`;
            document.getElementById('cart-total').textContent = `$${subtotal.toFixed(2)}`; 
        } 
    } else {
        // User is not logged in or inactive redirect to login page
        window.location.href = "login.html";
    }
});

// Function to update product quantity
function updateQuantity(productName, change) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = cart.find(item => item.name === productName);

    if (product) {
        product.quantity += change;

        if (product.quantity < 1) {
            product.quantity = 1;
        }

        localStorage.setItem('cart', JSON.stringify(cart));

        location.reload();
    }
}

// Function to remove product from cart
function removeFromCart(productName) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.name !== productName);
    localStorage.setItem('cart', JSON.stringify(cart));
    location.reload(); 
}
