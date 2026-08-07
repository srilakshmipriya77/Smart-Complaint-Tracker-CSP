// ===============================
// LOGIN USER
// ===============================

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const email = document.getElementById("email").value.trim().toLowerCase();

    const password = document.getElementById("password").value;

    const role = document.getElementById("role").value;

    if (role === "") {
        alert("Please select a role.");
        return;
    }

    const users = getUsers();

    const user = users.find(
        u =>
            u.email === email &&
            u.password === password &&
            u.role === role
    );

    if (!user) {
        alert("Invalid Email, Password, or Role.");
        return;
    }

    // Save logged-in user
    setCurrentUser(user);

    // Redirect based on role

    switch (user.role) {

        case "citizen":
            window.location.href = "citizen-dashboard.html";
            break;

        case "officer":
            window.location.href = "officer-dashboard.html";
            break;

        case "admin":
            window.location.href = "admin-dashboard.html";
            break;

        default:
            alert("Invalid user role.");
    }

});