// ======================================
// Complaint Registration
// ======================================

// Check Login

const currentUser = getCurrentUser();

if (!currentUser) {

    alert("Please login first.");

    window.location.href = "login.html";

}

if (currentUser.role !== "citizen") {

    alert("Access Denied!");

    window.location.href = "login.html";

}

const complaintForm = document.getElementById("complaintForm");

const imageInput = document.getElementById("image");

// ======================================
// Image Preview
// ======================================

let preview = document.getElementById("previewImage");

if (!preview) {
    preview = document.createElement("img");
    preview.id = "previewImage";
    preview.style.width = "200px";
    preview.style.marginTop = "15px";
    preview.style.display = "none";
    preview.style.borderRadius = "10px";
    imageInput.parentNode.appendChild(preview);
}

imageInput.addEventListener("change", function () {
    if (this.files.length === 0) {
        preview.style.display = "none";
        return;
    }
    const reader = new FileReader();

    reader.onload = function (e) {

        preview.src = e.target.result;

        preview.style.display = "block";

    };

    reader.readAsDataURL(imageInput.files[0]);

});

// ======================================
// Submit Complaint
// ======================================

complaintForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const category =
    document.getElementById("category").value;

    const title =
    document.getElementById("title").value.trim();

    const description =
    document.getElementById("description").value.trim();

    const location =
    document.getElementById("location").value.trim();

    const department =
    document.getElementById("department").value;

    const priority =
    document.getElementById("priority").value;

    if (

        category === "" ||

        title === "" ||

        description === "" ||

        location === "" ||

        department === "" ||

        priority === ""

    ) {

        alert("Please fill all required fields.");

        return;

    }

    let complaints = getComplaints();

    const complaintId = generateComplaintId();

    const now = new Date();

    const date = now.toLocaleDateString();

    const time = now.toLocaleTimeString();

    function saveComplaint(imageData) {
        const complaint = {
            id: complaintId,
            citizenId: currentUser.id,
            citizenName: currentUser.name,
            category,
            title,
            description,
            location,
            department,
            priority,
            image: imageData,
            status: "Pending",
            officer: "Not Assigned",
            remarks: "",
            feedback: "",
            rating: 0,
            date,
            time,
            createdAt: now.toISOString()
        };
        complaints.push(complaint);
        saveComplaints(complaints);
        complaintForm.reset();
        preview.style.display = "none";
        window.location.href =
        "citizen-dashboard.html";
    }
    if (imageInput.files.length > 0) {
        const reader = new FileReader();
        reader.onload = function (e) {
            saveComplaint(e.target.result);
        };
        reader.readAsDataURL(imageInput.files[0]);
    }
    else {
        saveComplaint("");
    }
});

function generateComplaintId() {
    let complaints = getComplaints();
    let max = 1000;
    complaints.forEach(c => {
        const num = parseInt(
            c.id.replace("CMP", "")
        );
        if (num > max)
            max = num;
    });
    return "CMP" + (max + 1);
}