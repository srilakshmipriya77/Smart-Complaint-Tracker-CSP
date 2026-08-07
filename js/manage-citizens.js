// =============================================
// Manage Citizens
// =============================================

let users = getUsers();

const table = document.getElementById("citizenTable");

// =============================================
// Load Citizens
// =============================================

function loadCitizens(data = null) {

    table.innerHTML = "";

    const citizens = data || users.filter(u => u.role === "citizen");

    if (citizens.length === 0) {

        table.innerHTML = `
        <tr>
            <td colspan="5">No Citizens Found</td>
        </tr>
        `;

        return;

    }

    citizens.forEach(citizen => {

        table.innerHTML += `

        <tr>

            <td>${citizen.id}</td>

            <td>${citizen.name}</td>

            <td>${citizen.email}</td>

            <td>${citizen.mobile}</td>

        </tr>

        `;

    });

}

loadCitizens();

// =============================================
// Save Citizen
// =============================================

function saveCitizen() {

    const id = document.getElementById("citizenId").value;

    const name = document.getElementById("citizenName").value.trim();

    const email = document.getElementById("citizenEmail").value.trim();

    const mobile = document.getElementById("citizenMobile").value.trim();

    const password = document.getElementById("citizenPassword").value.trim();

    if (

        name === "" ||

        email === "" ||

        mobile === "" ||

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

            password,

            role: "citizen"

        });

    }

    else {

        const citizen = users.find(

            u => u.id === id

        );

        citizen.name = name;

        citizen.email = email;

        citizen.mobile = mobile;

        citizen.password = password;

    }

    saveUsers(users);

    bootstrap.Modal.getInstance(

        document.getElementById("citizenModal")

    ).hide();

    clearForm();

    loadCitizens();

}

// =============================================
// Edit Citizen
// =============================================

function editCitizen(id) {

    const citizen = users.find(

        u => u.id === id

    );

    document.getElementById("citizenId").value =
    citizen.id;

    document.getElementById("citizenName").value =
    citizen.name;

    document.getElementById("citizenEmail").value =
    citizen.email;

    document.getElementById("citizenMobile").value =
    citizen.mobile;

    document.getElementById("citizenPassword").value =
    citizen.password;

    new bootstrap.Modal(

        document.getElementById("citizenModal")

    ).show();

}

// =============================================
// Delete Citizen
// =============================================

function deleteCitizen(id) {

    if (!confirm("Delete this citizen?"))
        return;

    users = users.filter(

        u => u.id !== id

    );

    saveUsers(users);

    loadCitizens();

}

// =============================================
// Search Citizen
// =============================================

document
.getElementById("searchCitizen")
.addEventListener("keyup", function () {

    const keyword = this.value.toLowerCase();

    const filtered = users.filter(

        u =>

        u.role === "citizen" &&

        (

            u.name.toLowerCase().includes(keyword) ||

            u.email.toLowerCase().includes(keyword) ||

            u.mobile.includes(keyword)

        )

    );

    loadCitizens(filtered);

});

// =============================================
// Clear Form
// =============================================

function clearForm() {

    document.getElementById("citizenId").value = "";

    document.getElementById("citizenName").value = "";

    document.getElementById("citizenEmail").value = "";

    document.getElementById("citizenMobile").value = "";

    document.getElementById("citizenPassword").value = "";

}

// =============================================
// Clear Modal on Close
// =============================================

document
.getElementById("citizenModal")
.addEventListener("hidden.bs.modal", clearForm);