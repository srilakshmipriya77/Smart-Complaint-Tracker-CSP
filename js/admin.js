// ============================================
// Admin Dashboard
// ============================================

// Check Login
const currentUser = getCurrentUser();

if (!currentUser || currentUser.role !== "admin") {
    alert("Access Denied!");
    window.location.href = "login.html";
}

// Show Admin Name
document.getElementById("adminName").textContent = currentUser.name;

// Load Data
const users = getUsers();
const complaints = getComplaints();
const departments = getDepartments();

// Dashboard Statistics

document.getElementById("totalComplaints").textContent =
complaints.length;

document.getElementById("pendingComplaints").textContent =
complaints.filter(c => c.status === "Pending").length;

document.getElementById("progressComplaints").textContent =
complaints.filter(c => c.status === "In Progress").length;

document.getElementById("completedComplaints").textContent =
complaints.filter(c => c.status === "Completed").length;

document.getElementById("citizenCount").textContent =
users.filter(u => u.role === "citizen").length;

document.getElementById("officerCount").textContent =
users.filter(u => u.role === "officer").length;

document.getElementById("departmentCount").textContent =
departments.length;

// Complaint Table

const tbody = document.getElementById("complaintTable");

tbody.innerHTML = "";

if (complaints.length === 0) {

    tbody.innerHTML = `
    <tr>
        <td colspan="7">
            No Complaints Found
        </td>
    </tr>
    `;

}
else {

    complaints.forEach(c => {

        let badge = "secondary";

if (c.status === "Pending")
    badge = "warning";

else if (c.status === "Assigned")
    badge = "primary";

else if (c.status === "In Progress")
    badge = "info";

else if (c.status === "Completed")
    badge = "success";

        tbody.innerHTML += `

        <tr>

            <td>${c.id}</td>

            <td>${c.citizenName}</td>

            <td>${c.category}</td>

            <td>${c.department}</td>

            <td>

                <span class="badge bg-${badge}">
                    ${c.status}
                </span>

            </td>

            <td>${c.officer}</td>

            <td>

                <button
                class="btn btn-primary btn-sm btn-action"
                onclick="viewComplaint('${c.id}')">

                View

                </button>

                <button
class="btn btn-success btn-sm"
onclick="window.location.href='assign-complaints.html'">

Assign

</button>

            </td>

        </tr>

        `;

    });

}

// ============================================
// View Complaint
// ============================================

function viewComplaint(id){

    const complaint =
    complaints.find(c=>c.id===id);

    alert(

`Complaint ID : ${complaint.id}

Citizen : ${complaint.citizenName}

Category : ${complaint.category}

Title : ${complaint.title}

Description : ${complaint.description}

Location : ${complaint.location}

Department : ${complaint.department}

Priority : ${complaint.priority}

Status : ${complaint.status}

Officer : ${complaint.officer}

Date : ${complaint.date}`

    );

}

// ============================================
// Assign Complaint
// ============================================

