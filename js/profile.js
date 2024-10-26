// read the data in local storage loggedInUserand display it in the profile page 

 // Retrieve loggedInUser data from localStorage
 const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

 // Check if loggedInUser exists in localStorage
 if (loggedInUser) {
     // Populate the table with loggedInUser data
     document.getElementById("name").textContent = loggedInUser.name;
     document.getElementById("email").textContent = loggedInUser.email;
     document.getElementById("status").textContent = loggedInUser.status || "Active";
 } else {
     // Display a message if no logged-in user is found
     document.getElementById("name").textContent = "No user data found.";
     document.getElementById("email").textContent = "-";
     document.getElementById("status").textContent = "-";
 }