// ======================================
// Feedback Module
// ======================================

// Check Login

const currentUser = getCurrentUser();

if (!currentUser || currentUser.role !== "citizen") {

    alert("Please login first.");

    window.location.href = "login.html";

}

// Load Completed Complaints

const complaintSelect =
document.getElementById("complaintSelect");

const feedbackTable =
document.getElementById("feedbackTable");

let complaints = getComplaints().filter(c =>
    c.citizenId === currentUser.id &&
    c.status === "Completed"
);

let feedbacks = getFeedback();

// Load Complaint Dropdown

complaints.forEach(c => {

    const alreadyGiven = feedbacks.find(f =>
        f.complaintId === c.id
    );

    if (!alreadyGiven) {

        complaintSelect.innerHTML += `
            <option value="${c.id}">
                ${c.id} - ${c.title}
            </option>
        `;

    }

});

// Submit Feedback

document.getElementById("feedbackForm")
.addEventListener("submit", function(e){

    e.preventDefault();

    const complaintId =
    complaintSelect.value;

    const rating =
    document.getElementById("rating").value;

    const comment =
    document.getElementById("comment").value;

    if(complaintId===""){

        alert("Select Complaint");

        return;

    }

    const complaint =
    complaints.find(c=>c.id===complaintId);

    feedbacks.push({

        complaintId,

        citizenId:currentUser.id,

        citizenName:currentUser.name,

        title:complaint.title,

        rating,

        comment,

        date:new Date().toLocaleDateString()

    });

    saveFeedback(feedbacks);

    location.reload();

});

// Display Feedback

feedbackTable.innerHTML="";

feedbacks
.filter(f=>f.citizenId===currentUser.id)
.forEach(f=>{

feedbackTable.innerHTML+=`

<tr>

<td>${f.title}</td>

<td>${"⭐".repeat(f.rating)}</td>

<td>${f.comment}</td>

</tr>

`;

});