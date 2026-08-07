// ======================================
// Complaint History
// ======================================

const currentUser = getCurrentUser();

if (!currentUser) {

    window.location.href = "login.html";

}

let complaints = getComplaints().filter(

    c => c.citizenId === currentUser.id

);

const historyTable =
document.getElementById("historyTable");

// ======================================
// Load Table
// ======================================

displayComplaints(complaints);

function displayComplaints(data){

    historyTable.innerHTML = "";

    if(data.length===0){

        historyTable.innerHTML = `

        <tr>

        <td colspan="6">

        No Complaints Found

        </td>

        </tr>

        `;

        return;

    }

    data.forEach(c=>{

        let badge = "secondary";

        if(c.status==="Pending")
            badge="warning";

        else if(c.status==="In Progress")
            badge="info";

        else if(c.status==="Completed")
            badge="success";

        historyTable.innerHTML += `

        <tr>

            <td>${c.id}</td>

            <td>${c.category}</td>

            <td>${c.priority}</td>

            <td>

                <span class="badge bg-${badge}">

                    ${c.status}

                </span>

            </td>

            <td>${c.date}</td>

            <td>

                <button
                class="btn btn-primary btn-sm"
                onclick="viewComplaint('${c.id}')">

                <i class="fa-solid fa-eye"></i>

                </button>

                ${
                    c.status==="Pending"

                    ?

                    `<button
                    class="btn btn-danger btn-sm"
                    onclick="deleteComplaint('${c.id}')">

                    <i class="fa-solid fa-trash"></i>

                    </button>`

                    :

                    ""

                }

            </td>

        </tr>

        `;

    });

}

// ======================================
// Search
// ======================================

document
.getElementById("searchBox")
.addEventListener("keyup",function(){

    const keyword =
    this.value.toLowerCase();

    const filtered = complaints.filter(c=>

        c.id.toLowerCase().includes(keyword) ||

        c.category.toLowerCase().includes(keyword)

    );

    displayComplaints(filtered);

});

// ======================================
// Filter
// ======================================

document
.getElementById("statusFilter")
.addEventListener("change",function(){

    const status=this.value;

    if(status==="All"){

        displayComplaints(complaints);

        return;

    }

    displayComplaints(

        complaints.filter(

            c=>c.status===status

        )

    );

});

// ======================================
// View Complaint
// ======================================

function viewComplaint(id){

    const complaint = complaints.find(

        c=>c.id===id

    );

    if(!complaint) return;

    document.getElementById("viewId").textContent =
    complaint.id;

    document.getElementById("viewCategory").textContent =
    complaint.category;

    document.getElementById("viewTitle").textContent =
    complaint.title;

    document.getElementById("viewDescription").textContent =
    complaint.description;

    document.getElementById("viewLocation").textContent =
    complaint.location;

    document.getElementById("viewDepartment").textContent =
    complaint.department;

    document.getElementById("viewPriority").textContent =
    complaint.priority;

    document.getElementById("viewStatus").textContent =
    complaint.status;

    document.getElementById("viewOfficer").textContent =
    complaint.officer;

    document.getElementById("viewRemarks").textContent =
    complaint.remarks || "No Remarks";

    const image =
    document.getElementById("viewImage");

    if(complaint.image){

        image.src = complaint.image;

        image.style.display="block";

    }

    else{

        image.style.display="none";

    }

    const modal = new bootstrap.Modal(

        document.getElementById("viewModal")

    );

    modal.show();

}

// ======================================
// Delete Complaint
// ======================================

function deleteComplaint(id){

    if(!confirm("Delete this complaint?"))
        return;

    let allComplaints = getComplaints();

    allComplaints = allComplaints.filter(

        c=>c.id!==id

    );

    saveComplaints(allComplaints);

    complaints = allComplaints.filter(

        c=>c.citizenId===currentUser.id

    );

    displayComplaints(complaints);

}