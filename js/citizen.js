// ======================================
// Citizen Dashboard
// ======================================

// Check whether the user is logged in

const currentUser = getCurrentUser();

if (!currentUser) {
    alert("Please login first.");
    window.location.href = "login.html";
}

if (currentUser.role !== "citizen") {
    alert("Access Denied!");
    window.location.href = "login.html";
}

// Display logged-in user's name

document.getElementById("username").textContent = currentUser.name;

// Get all complaints

let complaints = getComplaints();

// Filter complaints of logged-in citizen

let myComplaints = complaints.filter(
    complaint => complaint.citizenId === currentUser.id
);

// Dashboard Statistics

document.getElementById("totalComplaints").textContent =
    myComplaints.length;

document.getElementById("pendingComplaints").textContent =
    myComplaints.filter(c => c.status === "Pending").length;

document.getElementById("progressComplaints").textContent =
    myComplaints.filter(c => c.status === "In Progress").length;

document.getElementById("completedComplaints").textContent =
    myComplaints.filter(c => c.status === "Completed").length;

// Display Complaint History

const table = document.getElementById("complaintTable");

table.innerHTML = "";

if (myComplaints.length === 0) {

    table.innerHTML = `
        <tr>
            <td colspan="5">
                No complaints found.
            </td>
        </tr>
    `;

} else {

    myComplaints.forEach(complaint => {

        let badgeClass = "";

        switch (complaint.status) {

            case "Pending":
                badgeClass = "pending-status";
                break;

            case "In Progress":
                badgeClass = "progress-status";
                break;

            case "Completed":
                badgeClass = "completed-status";
                break;

        }

        table.innerHTML += `

        <tr>

            <td>${complaint.id}</td>

            <td>${complaint.category}</td>

            <td>

                <span class="status ${badgeClass}">
                    ${complaint.status}
                </span>

            </td>

            <td>${complaint.department}</td>

            <td>${complaint.date}</td>

        </tr>

        `;

    });

}

// Navigation Buttons

document.getElementById("newComplaintBtn")
.addEventListener("click", () => {

    window.location.href = "complaint.html";

});

document.getElementById("historyBtn")
.addEventListener("click", () => {

    window.location.href = "history.html";

});

document.getElementById("trackBtn")
.addEventListener("click", () => {

    window.location.href = "track.html";

});

document.getElementById("feedbackBtn")
.addEventListener("click", () => {

    window.location.href = "feedback.html";

});