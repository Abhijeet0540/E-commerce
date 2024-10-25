(function () {
	'use strict';

	var tinyslider = function () {
		var el = document.querySelectorAll('.testimonial-slider');

		if (el.length > 0) {
			var slider = tns({
				container: '.testimonial-slider',
				items: 1,
				axis: "horizontal",
				controlsContainer: "#testimonial-nav",
				swipeAngle: false,
				speed: 700,
				nav: true,
				controls: true,
				autoplay: true,
				autoplayHoverPause: true,
				autoplayTimeout: 3500,
				autoplayButtonOutput: false
			});
		}
	};
	tinyslider();




	var sitePlusMinus = function () {

		var value,
			quantity = document.getElementsByClassName('quantity-container');

		function createBindings(quantityContainer) {
			var quantityAmount = quantityContainer.getElementsByClassName('quantity-amount')[0];
			var increase = quantityContainer.getElementsByClassName('increase')[0];
			var decrease = quantityContainer.getElementsByClassName('decrease')[0];
			increase.addEventListener('click', function (e) { increaseValue(e, quantityAmount); });
			decrease.addEventListener('click', function (e) { decreaseValue(e, quantityAmount); });
		}

		function init() {
			for (var i = 0; i < quantity.length; i++) {
				createBindings(quantity[i]);
			}
		};

		function increaseValue(event, quantityAmount) {
			value = parseInt(quantityAmount.value, 10);

			console.log(quantityAmount, quantityAmount.value);

			value = isNaN(value) ? 0 : value;
			value++;
			quantityAmount.value = value;
		}

		function decreaseValue(event, quantityAmount) {
			value = parseInt(quantityAmount.value, 10);

			value = isNaN(value) ? 0 : value;
			if (value > 0) value--;

			quantityAmount.value = value;
		}

		init();

	};
	sitePlusMinus();
})()

// Login and Logout Functionality
document.addEventListener("DOMContentLoaded", () => {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    const usernameElement = document.getElementById("username");
    const userDropdown = document.getElementById("user-dropdown");

    if (loggedInUser) {
        const userIndex = users.findIndex(user => user.email === loggedInUser.email);
        
        if (userIndex !== -1) {
            users[userIndex].active = true; 
            localStorage.setItem('users', JSON.stringify(users));
        }

        usernameElement.textContent = loggedInUser.name; 
        usernameElement.href = "#"; 

        usernameElement.addEventListener('click', (event) => {
            event.preventDefault();
        });
    } else {
        usernameElement.textContent = "Login";
        usernameElement.href = "login.html"; 
        userDropdown.style.display = 'none';
    }

    // Logout functionality
    document.getElementById("logout").addEventListener("click", function(event) {
        event.preventDefault(); 

        const confirmation = confirm("Are you sure you want to log out?");
        
        if (confirmation) {
            try {
                const userIndex = users.findIndex(user => user.email === loggedInUser.email);
                
                if (userIndex !== -1) {
                    users[userIndex].active = false;  
                    localStorage.setItem('users', JSON.stringify(users));
                }

                localStorage.removeItem('loggedInUser');

                usernameElement.textContent = "Login";
                usernameElement.href = "login.html";
                userDropdown.style.display = 'none'; 

                // Show a success toast message
                showToast("You have been logged out successfully.");

                setTimeout(() => {
                    window.location.href = "login.html"; 
                }, 1000);
            } catch (error) {
                console.error("Logout error:", error);
                showToast("An error occurred while logging out. Please try again.", true);
            }
        }
    });
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