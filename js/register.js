
const registerForm = document.getElementById("registerForm");
registerForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim().toLowerCase();
    const mobile = document.getElementById("mobile").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const role = document.getElementById("role").value;
    let department = "";

    if (role === "officer") {
        department = document.getElementById("department").value;

        if (department === "") {
            alert("Please select a department.");
            return;
        }
    }

    // Validation

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    
    }
    if (mobile.length !== 10 || isNaN(mobile)) {
        alert("Enter a valid 10-digit mobile number.");
        return;
    }
    let users = getUsers();
    // Check existing email
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        alert("Email already registered.");
        return;
    }
    // Create User
    const newUser = {
        id: Date.now(),
        name,
        email,
        mobile,
        password,
        role,
        department
    };
    users.push(newUser);
    saveUsers(users);
    window.location.href = "login.html";

});