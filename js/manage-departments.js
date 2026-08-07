// =============================================
// Manage Departments
// =============================================

let departments = getDepartments();

const table = document.getElementById("departmentTable");

// =============================================
// Load Departments
// =============================================

function loadDepartments(data = null) {

    table.innerHTML = "";

    const list = data || departments;

    if (list.length === 0) {

        table.innerHTML = `
        <tr>
            <td colspan="3">No Departments Found</td>
        </tr>
        `;

        return;

    }

    list.forEach(department => {

        table.innerHTML += `

        <tr>

            <td>${department.id}</td>

            <td>${department.name}</td>

            <td>

                <button
                class="btn btn-warning btn-sm"
                onclick="editDepartment('${department.id}')">

                    <i class="fa-solid fa-pen"></i>

                </button>

                <button
                class="btn btn-danger btn-sm"
                onclick="deleteDepartment('${department.id}')">

                    <i class="fa-solid fa-trash"></i>

                </button>

            </td>

        </tr>

        `;

    });

}

loadDepartments();

// =============================================
// Save Department
// =============================================

function saveDepartment() {

    const id =
    document.getElementById("departmentId").value;

    const name =
    document.getElementById("departmentName").value.trim();

    if (name === "") {

        alert("Department name is required.");

        return;

    }

    const duplicate = departments.find(

        d =>

        d.name.toLowerCase() === name.toLowerCase() &&

        String(d.id) !== String(id)

    );

    if (duplicate) {

        alert("Department already exists.");

        return;

    }

    if (id === "") {

        departments.push({

            id: Date.now(),

            name: name

        });

    }

    else {

        const department = departments.find(

            d => String(d.id) === String(id)

        );

        if (department) {

            department.name = name;

        }

    }

    saveDepartments(departments);

    bootstrap.Modal.getInstance(

        document.getElementById("departmentModal")

    ).hide();

    clearForm();

    loadDepartments();

}

// =============================================
// Edit Department
// =============================================

function editDepartment(id) {

    const department = departments.find(

        d => String(d.id) === String(id)

    );

    if (!department) return;

    document.getElementById("departmentId").value =
    department.id;

    document.getElementById("departmentName").value =
    department.name;

    new bootstrap.Modal(

        document.getElementById("departmentModal")

    ).show();

}

// =============================================
// Delete Department
// =============================================

function deleteDepartment(id) {

    if (!confirm("Delete this department?"))
        return;

    departments = departments.filter(

        d => String(d.id) !== String(id)

    );

    saveDepartments(departments);

    loadDepartments();

}

// =============================================
// Search Department
// =============================================

document
.getElementById("searchDepartment")
.addEventListener("keyup", function () {

    const keyword = this.value.toLowerCase();

    const filtered = departments.filter(

        d => d.name.toLowerCase().includes(keyword)

    );

    loadDepartments(filtered);

});

// =============================================
// Clear Form
// =============================================

function clearForm() {

    document.getElementById("departmentId").value = "";

    document.getElementById("departmentName").value = "";

}

// =============================================
// Clear Modal on Close
// =============================================

document
.getElementById("departmentModal")
.addEventListener("hidden.bs.modal", clearForm);