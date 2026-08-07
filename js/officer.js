// =============================================
// OFFICER DASHBOARD
// =============================================

// Check Login

const currentUser = getCurrentUser();

if (!currentUser || currentUser.role !== "officer") {

    alert("Access Denied!");

    window.location.href = "login.html";

}

// Welcome

document.getElementById("officerName").textContent =
currentUser.name;

// Load Complaints

let allComplaints = getComplaints();

let complaints = allComplaints.filter(

    complaint => complaint.officer === currentUser.name

);

// Dashboard Cards

updateDashboard();

// Complaint Table

loadComplaintTable(complaints);

// =============================================
// Dashboard
// =============================================

function updateDashboard(){

    complaints = getComplaints().filter(
        c => c.officer === currentUser.name
    );

    document.getElementById("assignedCount").textContent =
        complaints.length;

    document.getElementById("pendingCount").textContent =
        complaints.filter(c => c.status === "Pending").length;

    document.getElementById("progressCount").textContent =
        complaints.filter(c => c.status === "In Progress").length;

    document.getElementById("completedCount").textContent =
        complaints.filter(c => c.status === "Completed").length;

}

// =============================================
// Complaint Table
// =============================================

function loadComplaintTable(data){

    const table =
    document.getElementById("officerTable");

    table.innerHTML="";

    if(data.length===0){

        table.innerHTML=`

        <tr>

        <td colspan="6">

        No Assigned Complaints

        </td>

        </tr>

        `;

        return;

    }

    data.forEach(c=>{

        let badge="secondary";

        if(c.status==="Assigned" || c.status==="Pending"){

    actions=`

    <button
    class="btn btn-primary btn-sm"
    onclick="viewComplaint('${c.id}')">

    <i class="fa-solid fa-eye"></i>

    </button>

    <button
    class="btn btn-success btn-sm"
    onclick="acceptComplaint('${c.id}')">

    Accept

    </button>

    `;

}

        else if(c.status==="In Progress"){

            actions=`

            <button
            class="btn btn-primary btn-sm"
            onclick="viewComplaint('${c.id}')">

            <i class="fa-solid fa-eye"></i>

            </button>

            <button
            class="btn btn-warning btn-sm"
            onclick="openUpdateModal('${c.id}')">

            <i class="fa-solid fa-pen"></i>

            </button>

            `;

        }

        else{

            actions=`

            <button
            class="btn btn-primary btn-sm"
            onclick="viewComplaint('${c.id}')">

            <i class="fa-solid fa-eye"></i>

            </button>

            <button
            class="btn btn-success btn-sm"
            disabled>

            <i class="fa-solid fa-circle-check"></i>

            </button>

            `;

        }

        table.innerHTML+=`

        <tr>

        <td>${c.id}</td>

        <td>${c.citizenName}</td>

        <td>${c.category}</td>

        <td>${c.priority}</td>

        <td>

        <span class="badge bg-${badge}">

        ${c.status}

        </span>

        </td>

        <td>

        ${actions}

        </td>

        </tr>

        `;

    });

}

// =============================================
// Search
// =============================================

document
.getElementById("searchComplaint")
.addEventListener("keyup",function(){

    const value=this.value.toLowerCase();

    const filtered=complaints.filter(c=>

        c.id.toLowerCase().includes(value) ||

        c.category.toLowerCase().includes(value) ||

        c.citizenName.toLowerCase().includes(value)

    );

    loadComplaintTable(filtered);

});

// =============================================
// View Complaint
// =============================================

function viewComplaint(id){

    const complaint = complaints.find(c => c.id === id);

    if(!complaint) return;

    document.getElementById("viewId").textContent =
    complaint.id;

    document.getElementById("viewCitizen").textContent =
    complaint.citizenName;

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

        image.style.display = "block";

    }
    else{

        image.style.display = "none";

    }

    const modal = new bootstrap.Modal(

        document.getElementById("viewModal")

    );

    modal.show();

}

// =============================================
// Accept Complaint
// =============================================

function acceptComplaint(id){

    let all = getComplaints();

    let complaint = all.find(c => c.id === id);

    if(!complaint) return;

    complaint.status = "In Progress";

    complaint.remarks = "Complaint accepted by officer.";

    saveComplaints(all);

    location.reload();

}

// =============================================
// Open Update Modal
// =============================================

function openUpdateModal(id){

    const complaint = complaints.find(c => c.id === id);

    if(!complaint) return;

    document.getElementById("updateComplaintId").value =
    complaint.id;

    document.getElementById("updateStatus").value =
    complaint.status;

    document.getElementById("updateRemarks").value =
    complaint.remarks || "";

    document.getElementById("completionImage").value = "";

    const modal = new bootstrap.Modal(

        document.getElementById("updateModal")

    );

    modal.show();

}

// =============================================
// Save Complaint Update
// =============================================

function saveComplaintUpdate(){

    const complaintId =
    document.getElementById("updateComplaintId").value;

    const status =
    document.getElementById("updateStatus").value;

    const remarks =
    document.getElementById("updateRemarks").value;

    const imageInput =
    document.getElementById("completionImage");

    let allComplaints = getComplaints();

    let complaint =
    allComplaints.find(c => c.id === complaintId);

    if(!complaint){

        alert("Complaint not found.");

        return;

    }

    complaint.status = status;
    complaint.remarks = remarks;

    // If no image selected
    if(imageInput.files.length === 0){

        saveComplaints(allComplaints);

        bootstrap.Modal
        .getInstance(
            document.getElementById("updateModal")
        ).hide();

        location.reload();

        return;

    }

    // Read selected image

    const reader = new FileReader();

    reader.onload = function(e){

        complaint.image = e.target.result;

        saveComplaints(allComplaints);

        bootstrap.Modal
        .getInstance(
            document.getElementById("updateModal")
        ).hide();

        location.reload();

    };

    reader.readAsDataURL(imageInput.files[0]);

}

// =============================================
// Refresh Dashboard
// =============================================

function refreshDashboard(){

    allComplaints = getComplaints();

    complaints = allComplaints.filter(

        complaint => complaint.officer === currentUser.name

    );

    updateDashboard();

    loadComplaintTable(complaints);

}

// =============================================
// Auto Refresh
// =============================================

window.addEventListener("focus", refreshDashboard);

// =============================================
// Logout
// =============================================

function logout(){

    localStorage.removeItem("currentUser");

    window.location.href = "login.html";

}