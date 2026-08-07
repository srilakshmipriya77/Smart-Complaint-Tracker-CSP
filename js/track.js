// ======================================
// Track Complaint
// ======================================

const currentUser = getCurrentUser();

if (!currentUser) {

    window.location.href = "login.html";

}

const complaintInput =
document.getElementById("complaintId");

const trackBtn =
document.getElementById("trackBtn");

// ======================================
// Track Button
// ======================================

trackBtn.addEventListener("click", trackComplaint);

// Track on Enter Key

complaintInput.addEventListener("keypress", function(e){

    if(e.key==="Enter"){

        trackComplaint();

    }

});

// ======================================
// Track Complaint
// ======================================

function trackComplaint(){

    const complaintId =
    complaintInput.value.trim();

    if(complaintId===""){

        alert("Enter Complaint ID");

        return;

    }

    const complaints = getComplaints();

    const complaint = complaints.find(

        c =>

        c.id === complaintId &&

        c.citizenId === currentUser.id

    );

    if(!complaint){

        alert("Complaint not found.");

        return;

    }

    document.getElementById("result").style.display =
    "block";

    // ==================================
    // Complaint Details
    // ==================================

    document.getElementById("complaintNo").textContent =
    complaint.id;

    document.getElementById("title").textContent =
    complaint.title;

    document.getElementById("category").textContent =
    complaint.category;

    document.getElementById("priority").textContent =
    complaint.priority;

    document.getElementById("department").textContent =
    complaint.department;

    document.getElementById("officer").textContent =
    complaint.officer;

    document.getElementById("remarks").textContent =

    complaint.remarks ||

    "No remarks yet";

    document.getElementById("date").textContent =

    complaint.date + " " + complaint.time;

    // ==================================
    // Status Badge
    // ==================================

    let badge="secondary";

    if(complaint.status==="Pending")
        badge="warning";

    else if(complaint.status==="In Progress")
        badge="info";

    else if(complaint.status==="Completed")
        badge="success";

    document.getElementById("status").innerHTML =

    `<span class="badge bg-${badge}">
        ${complaint.status}
    </span>`;

    // ==================================
    // Image
    // ==================================

    const image =
    document.getElementById("complaintImage");

    if(complaint.image){

        image.src = complaint.image;

        image.style.display = "block";

    }

    else{

        image.style.display = "none";

    }

    // ==================================
    // Timeline
    // ==================================

    document.querySelectorAll(".step")
    .forEach(step=>{

        step.classList.remove(

            "active",
            "pending",
            "progress"

        );

    });

    // Submitted

    document.getElementById("step1")
    .classList.add("active");

    // Assigned

    if(

        complaint.officer &&

        complaint.officer !== "Not Assigned"

    ){

        document.getElementById("step2")
        .classList.add("active");

    }

    // In Progress

    if(complaint.status==="In Progress"){

        document.getElementById("step2")
        .classList.add("active");

        document.getElementById("step3")
        .classList.add("progress");

    }

    // Completed

    if(complaint.status==="Completed"){

        document.getElementById("step2")
        .classList.add("active");

        document.getElementById("step3")
        .classList.add("active");

        document.getElementById("step4")
        .classList.add("active");

    }

}