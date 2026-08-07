// =============================================
// SMART COMPLAINT TRACKER
// Local Storage Database
// =============================================

// Initialize Database

function initializeDatabase() {

    if (!localStorage.getItem("users"))
        localStorage.setItem("users", JSON.stringify([]));

    if (!localStorage.getItem("complaints"))
        localStorage.setItem("complaints", JSON.stringify([]));

    if (!localStorage.getItem("feedback"))
        localStorage.setItem("feedback", JSON.stringify([]));

    if (!localStorage.getItem("notifications"))
        localStorage.setItem("notifications", JSON.stringify([]));

    if (!localStorage.getItem("reports"))
        localStorage.setItem("reports", JSON.stringify([]));

    if (!localStorage.getItem("departments")) {

        const departments = [

            {
                id:1,
                name:"Roads"
            },

            {
                id:2,
                name:"Water Supply"
            },

            {
                id:3,
                name:"Electricity"
            },

            {
                id:4,
                name:"Sanitation"
            },

            {
                id:5,
                name:"Street Lights"
            }

        ];

        localStorage.setItem(
            "departments",
            JSON.stringify(departments)
        );

    }

    let users = getUsers();

    const adminExists = users.some(
        u => u.role === "admin"
    );

    if(!adminExists){

        users.push({

            id:"ADM001",

            name:"System Admin",

            email:"admin@gmail.com",

            mobile:"9999999999",

            password:"admin123",

            role:"admin",

            department:""

        });

        saveUsers(users);

    }

}

initializeDatabase();

// =============================================
// Users
// =============================================

function getUsers(){

    return JSON.parse(
        localStorage.getItem("users")
    ) || [];

}

function saveUsers(users){

    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );

}

function getOfficerByName(name){

    return getUsers().find(

        u =>

        u.role==="officer" &&

        u.name===name

    );

}

// =============================================
// Complaints
// =============================================

function getComplaints(){

    return JSON.parse(
        localStorage.getItem("complaints")
    ) || [];

}

function saveComplaints(complaints){

    localStorage.setItem(

        "complaints",

        JSON.stringify(complaints)

    );

}

function getComplaintById(id){

    return getComplaints().find(

        c=>c.id===id

    );

}

// =============================================
// Feedback
// =============================================

function getFeedback(){

    return JSON.parse(
        localStorage.getItem("feedback")
    ) || [];

}

function saveFeedback(feedback){

    localStorage.setItem(

        "feedback",

        JSON.stringify(feedback)

    );

}

// =============================================
// Departments
// =============================================

function getDepartments(){

    return JSON.parse(
        localStorage.getItem("departments")
    ) || [];

}

function saveDepartments(departments){

    localStorage.setItem(

        "departments",

        JSON.stringify(departments)

    );

}

// =============================================
// Notifications
// =============================================

function getNotifications(){

    return JSON.parse(

        localStorage.getItem("notifications")

    ) || [];

}

function saveNotifications(data){

    localStorage.setItem(

        "notifications",

        JSON.stringify(data)

    );

}

function addNotification(userId,message){

    let notifications = getNotifications();

    notifications.unshift({

        id:generateId("NOT"),

        userId:userId,

        message:message,

        date:new Date().toLocaleString(),

        read:false

    });

    saveNotifications(notifications);

}

// =============================================
// Reports
// =============================================

function getReports(){

    return JSON.parse(

        localStorage.getItem("reports")

    ) || [];

}

function saveReports(reports){

    localStorage.setItem(

        "reports",

        JSON.stringify(reports)

    );

}

// =============================================
// Current User
// =============================================
function setCurrentUser(user){
    localStorage.setItem(
        "currentUser",
        JSON.stringify(user)
    );
}
function getCurrentUser(){
    return JSON.parse(
        localStorage.getItem("currentUser")
    );
}
function logout(){
    localStorage.removeItem("currentUser");
    window.location.href="login.html";
}
// =============================================
// Generate ID
// =============================================
function generateId(prefix){
    return prefix + "-" +
    Date.now() +
    "-" +
    Math.floor(Math.random()*1000);

}