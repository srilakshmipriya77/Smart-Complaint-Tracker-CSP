// =============================================
// Manage Officers
// =============================================

let users = getUsers();
let departments = getDepartments();

const table = document.getElementById("officerTable");
const departmentSelect = document.getElementById("officerDepartment");
const departmentFilter = document.getElementById("departmentFilter");

// =============================================
// Load Departments
// =============================================

function loadDepartments() {

    departmentSelect.innerHTML = "";
    departmentFilter.innerHTML = `<option value="All">All Departments</option>`;

    departments.forEach(dept => {

        departmentSelect.innerHTML += `
        <option value="${dept.name}">
            ${dept.name}
        </option>
        `;

        departmentFilter.innerHTML += `
        <option value="${dept.name}">
            ${dept.name}
        </option>
        `;

    });

}

loadDepartments();

// =============================================
// Load Officers
// =============================================

function loadOfficers(data = null) {

    table.innerHTML = "";

    const officers = data || users.filter(u => u.role === "officer");

    if (officers.length === 0) {

        table.innerHTML = `
        <tr>
            <td colspan="6">No Officers Found</td>
        </tr>
        `;

        return;

    }

    officers.forEach(officer => {

        table.innerHTML += `

        <tr>

            <td>${officer.id}</td>

            <td>${officer.name}</td>

            <td>${officer.email}</td>

            <td>${officer.department}</td>

            <td>${officer.mobile}</td>

        </tr>

        `;

    });

}

loadOfficers();

// =============================================
// Save Officer
// =============================================

function saveOfficer() {

    const id = document.getElementById("officerId").value;

    const name = document.getElementById("officerName").value.trim();

    const email = document.getElementById("officerEmail").value.trim();

    const mobile = document.getElementById("officerMobile").value.trim();

    const department = document.getElementById("officerDepartment").value;

    const password = document.getElementById("officerPassword").value.trim();

    if (

        name === "" ||

        email === "" ||

        mobile === "" ||

        department === "" ||

        password === ""

    ) {

        alert("Please fill all fields.");

        return;

    }

    if (id === "") {

        users.push({

            id: Date.now(),

            name,

            email,

            mobile,

            department,

            password,

            role: "officer"

        });

    }

    else {

        const officer = users.find(u => u.id === id);

        officer.name = name;
        officer.email = email;
        officer.mobile = mobile;
        officer.department = department;
        officer.password = password;

    }

    saveUsers(users);

    bootstrap.Modal.getInstance(

        document.getElementById("officerModal")

    ).hide();

    clearForm();

    loadOfficers();

}

// =============================================
// Edit Officer
// =============================================

function editOfficer(id) {

    const officer = users.find(

        u => u.id === id

    );

    document.getElementById("officerId").value =
    officer.id;

    document.getElementById("officerName").value =
    officer.name;

    document.getElementById("officerEmail").value =
    officer.email;

    document.getElementById("officerMobile").value =
    officer.mobile;

    document.getElementById("officerDepartment").value =
    officer.department;

    document.getElementById("officerPassword").value =
    officer.password;

    new bootstrap.Modal(

        document.getElementById("officerModal")

    ).show();

}

// =============================================
// Delete Officer
// =============================================

function deleteOfficer(id) {

    if (!confirm("Delete this officer?"))
        return;

    users = users.filter(

        u => u.id !== id

    );

    saveUsers(users);

    loadOfficers();

}

// =============================================
// Search
// =============================================

document
.getElementById("searchOfficer")
.addEventListener("keyup", function () {

    const keyword =
    this.value.toLowerCase();

    const filtered = users.filter(

        u =>

        u.role === "officer" &&

        (

            u.name.toLowerCase().includes(keyword) ||

            u.email.toLowerCase().includes(keyword) ||

            u.department.toLowerCase().includes(keyword)

        )

    );

    loadOfficers(filtered);

});

// =============================================
// Department Filter
// =============================================

departmentFilter.addEventListener("change", function () {

    const value = this.value;

    if (value === "All") {

        loadOfficers();

        return;

    }

    loadOfficers(

        users.filter(

            u =>

            u.role === "officer" &&

            u.department === value

        )

    );

});

// =============================================
// Clear Form
// =============================================

function clearForm() {

    document.getElementById("officerId").value = "";

    document.getElementById("officerName").value = "";

    document.getElementById("officerEmail").value = "";

    document.getElementById("officerMobile").value = "";

    document.getElementById("officerDepartment").selectedIndex = 0;

    document.getElementById("officerPassword").value = "";

}

// =============================================
// Clear Form When Modal Closes
// =============================================

document
.getElementById("officerModal")
.addEventListener("hidden.bs.modal", clearForm);