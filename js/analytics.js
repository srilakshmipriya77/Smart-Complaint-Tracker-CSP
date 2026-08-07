// ============================================
// Analytics Dashboard
// ============================================

let complaints = getComplaints();

let statusChart;
let departmentChart;
let monthlyChart;

refreshAnalytics();

// ============================================
// Refresh Dashboard
// ============================================

function refreshAnalytics(){

    complaints = getComplaints();

    loadCards();

    loadStatusChart();

    loadDepartmentChart();

    loadMonthlyChart();

}

// ============================================
// Dashboard Cards
// ============================================

function loadCards(){

    document.getElementById("totalComplaints").textContent =
    complaints.length;

    document.getElementById("pendingComplaints").textContent =

    complaints.filter(c=>c.status==="Pending").length;

    document.getElementById("progressComplaints").textContent =

    complaints.filter(c=>c.status==="In Progress").length;

    document.getElementById("completedComplaints").textContent =

    complaints.filter(c=>c.status==="Completed").length;

}

// ============================================
// Status Pie Chart
// ============================================

function loadStatusChart(){

    const pending =
    complaints.filter(c=>c.status==="Pending").length;

    const assigned =
    complaints.filter(c=>c.status==="Assigned").length;

    const progress =
    complaints.filter(c=>c.status==="In Progress").length;

    const completed =
    complaints.filter(c=>c.status==="Completed").length;

    if(statusChart){

        statusChart.destroy();

    }

    statusChart = new Chart(

        document.getElementById("statusChart"),

        {

            type:"pie",

            data:{

                labels:[
                    "Pending",
                    "Assigned",
                    "In Progress",
                    "Completed"
                ],

                datasets:[{

                    data:[
                        pending,
                        assigned,
                        progress,
                        completed
                    ],

                    backgroundColor:[

                        "#ffc107",
                        "#0d6efd",
                        "#0dcaf0",
                        "#198754"

                    ]

                }]

            },

            options:{

                responsive:true

            }

        }

    );

}

// ============================================
// Department Bar Chart
// ============================================

function loadDepartmentChart(){

    const departments = {};

    complaints.forEach(c=>{

        if(!departments[c.department])

            departments[c.department]=0;

        departments[c.department]++;

    });

    if(departmentChart){

        departmentChart.destroy();

    }

    departmentChart = new Chart(

        document.getElementById("departmentChart"),

        {

            type:"bar",

            data:{

                labels:Object.keys(departments),

                datasets:[{

                    label:"Complaints",

                    data:Object.values(departments),

                    backgroundColor:"#0d6efd"

                }]

            },

            options:{

                responsive:true,

                scales:{

                    y:{

                        beginAtZero:true

                    }

                }

            }

        }

    );

}

// ============================================
// Monthly Line Chart
// ============================================

function loadMonthlyChart(){

    const months = [

        "Jan","Feb","Mar","Apr","May","Jun",

        "Jul","Aug","Sep","Oct","Nov","Dec"

    ];

    const values = new Array(12).fill(0);

    complaints.forEach(c=>{

        if(!c.date) return;

        const date = new Date(c.date);

        if(!isNaN(date)){

            values[date.getMonth()]++;

        }

    });

    if(monthlyChart){

        monthlyChart.destroy();

    }

    monthlyChart = new Chart(

        document.getElementById("monthlyChart"),

        {

            type:"line",

            data:{

                labels:months,

                datasets:[{

                    label:"Complaints",

                    data:values,

                    borderColor:"#198754",

                    backgroundColor:"rgba(25,135,84,0.2)",

                    fill:true,

                    tension:0.4

                }]

            },

            options:{

                responsive:true,

                scales:{

                    y:{

                        beginAtZero:true

                    }

                }

            }

        }

    );

}

// ============================================
// Auto Refresh
// ============================================

window.addEventListener("focus", refreshAnalytics);