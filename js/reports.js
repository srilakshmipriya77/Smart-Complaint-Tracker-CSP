// ==========================================
// Reports
// ==========================================

let complaints = getComplaints();

const table =
document.getElementById("reportTable");

// ==========================================
// Load Reports
// ==========================================

function loadReports(data = null){

    table.innerHTML="";

    const list = data || complaints;

    if(list.length===0){

        table.innerHTML=`

        <tr>

        <td colspan="7">

        No Reports Found

        </td>

        </tr>

        `;

        return;

    }

    list.forEach(c=>{

        let badge="secondary";

        if(c.status==="Pending")
        badge="warning";

        else if(c.status==="Assigned")
        badge="primary";

        else if(c.status==="In Progress")
        badge="info";

        else if(c.status==="Completed")
        badge="success";

        table.innerHTML+=`

        <tr>

        <td>${c.id}</td>

        <td>${c.citizenName}</td>

        <td>${c.category}</td>

        <td>${c.department}</td>

        <td>

        <span class="badge bg-${badge}">

        ${c.status}

        </span>

        </td>

        <td>${c.officer}</td>

        <td>${c.date}</td>

        </tr>

        `;

    });

}

loadReports();

// ==========================================
// Search
// ==========================================

document
.getElementById("searchBox")
.addEventListener("keyup",function(){

    const keyword=this.value.toLowerCase();

    const filtered=complaints.filter(c=>

        c.id.toLowerCase().includes(keyword)||

        c.category.toLowerCase().includes(keyword)||

        c.citizenName.toLowerCase().includes(keyword)||

        c.department.toLowerCase().includes(keyword)

    );

    loadReports(filtered);

});

// ==========================================
// Status Filter
// ==========================================

document
.getElementById("statusFilter")
.addEventListener("change",function(){

    const value=this.value;

    if(value==="All"){

        loadReports();

        return;

    }

    loadReports(

        complaints.filter(c=>c.status===value)

    );

});

// ==========================================
// Export CSV
// ==========================================

function exportCSV(){

    let csv="Complaint ID,Citizen,Category,Department,Status,Officer,Date\n";

    complaints.forEach(c=>{

        csv+=`${c.id},${c.citizenName},${c.category},${c.department},${c.status},${c.officer},${c.date}\n`;

    });

    const blob=new Blob([csv],{

        type:"text/csv"

    });

    const url=URL.createObjectURL(blob);

    const a=document.createElement("a");

    a.href=url;

    a.download="Complaint_Report.csv";

    a.click();

    URL.revokeObjectURL(url);

}

// ==========================================
// Print Report
// ==========================================

function printReport(){

    window.print();

}

// ==========================================
// Refresh
// ==========================================

window.addEventListener("focus",()=>{

    complaints=getComplaints();

    loadReports();

});