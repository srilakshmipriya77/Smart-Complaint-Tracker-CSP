// =============================================
// Assign Complaints
// =============================================

let complaints = getComplaints();
let departments = getDepartments();
let users = getUsers();

const complaintTable = document.getElementById("complaintTable");
const departmentSelect = document.getElementById("department");
const officerSelect = document.getElementById("officer");

// =============================================
// Load Departments
// =============================================

function loadDepartments() {

    departmentSelect.innerHTML = "";

    departments.forEach(department => {

        departmentSelect.innerHTML += `

        <option value="${department.name}">

            ${department.name}

        </option>

        `;

    });

}

loadDepartments();

loadOfficers();

departmentSelect.addEventListener("change", loadOfficers);

// =============================================
// Load Officers
// =============================================

function loadOfficers() {

    officerSelect.innerHTML = "";

    const department = departmentSelect.value;

    const officers = users.filter(

        user =>

        user.role === "officer" &&

        user.department === department

    );

    if (officers.length === 0) {

        officerSelect.innerHTML = `

        <option>

            No Officers Available

        </option>

        `;

        return;

    }

    officers.forEach(officer => {

        officerSelect.innerHTML += `

        <option value="${officer.name}">

            ${officer.name}

        </option>

        `;

    });

}

// =============================================
// Load Complaint Table
// =============================================

function loadComplaints(data = null) {

    complaintTable.innerHTML = "";

    const list = data || complaints;

    if (list.length === 0) {

        complaintTable.innerHTML = `

        <tr>

            <td colspan="7">

                No Complaints Found

            </td>

        </tr>

        `;

        return;

    }

    list.forEach(c => {

        let badge = "secondary";

        if (c.status === "Pending")
            badge = "warning";

        else if (c.status === "Assigned")
            badge = "primary";

        else if (c.status === "In Progress")
            badge = "info";

        else if (c.status === "Completed")
            badge = "success";

        complaintTable.innerHTML += `

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

                class="btn btn-success btn-sm"

                onclick="openAssignModal('${c.id}')">

                    <i class="fa-solid fa-user-check"></i>

                    Assign

                </button>

            </td>

        </tr>

        `;

    });

}

loadComplaints();

// =============================================
// Search Complaint
// =============================================

document
.getElementById("searchComplaint")
.addEventListener("keyup", function () {

    const keyword = this.value.toLowerCase();

    const filtered = complaints.filter(

        complaint =>

        complaint.id.toLowerCase().includes(keyword) ||

        complaint.category.toLowerCase().includes(keyword) ||

        complaint.citizenName.toLowerCase().includes(keyword)

    );

    loadComplaints(filtered);

});

// =============================================
// Open Assign Modal
// =============================================

function openAssignModal(id) {

    document.getElementById("complaintId").value = id;

    loadOfficers();

    new bootstrap.Modal(

        document.getElementById("assignModal")

    ).show();

}

// =============================================
// Assign Complaint
// =============================================

function assignComplaint() {

    const complaintId =
    document.getElementById("complaintId").value;

    const department =
    departmentSelect.value;

    const officer =
    officerSelect.value;

    if (

        department === "" ||

        officer === "" ||

        officer === "No Officers Available"

    ) {

        alert("Select Department and Officer.");

        return;

    }

    const complaint = complaints.find(

        c => c.id === complaintId

    );

    if (!complaint)
        return;

    complaint.department = department;

    complaint.officer = officer;

    complaint.status = "Assigned";

    complaint.assignedDate =
    new Date().toLocaleString();

    saveComplaints(complaints);

    bootstrap.Modal
    .getInstance(

        document.getElementById("assignModal")

    )
    .hide();

    loadComplaints();

}

// =============================================
// Auto Refresh
// =============================================

window.addEventListener("focus", function () {

    complaints = getComplaints();

    users = getUsers();

    departments = getDepartments();

    loadDepartments();

    loadComplaints();

});