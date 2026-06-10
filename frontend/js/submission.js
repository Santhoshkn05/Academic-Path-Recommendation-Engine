const tableBody =
document.getElementById("tableBody");

async function loadSubmissions() {

    try {

        const response =
        await fetch(
            "https://academic-path-recommendation-engine.onrender.com/api/submissions"
        );

        const submissions =
        await response.json();

        tableBody.innerHTML = "";

        submissions.forEach(item => {

            tableBody.innerHTML += `
                <tr>
                    <td>${item.fullname}</td>
                    <td>${item.email}</td>
                    <td>${item.qualification}</td>
                    <td>${item.experience}</td>
                    <td>${item.profession}</td>
                    <td>${item.career_goal}</td>
                    <td>${item.recommendation}</td>
                    <td>
                        ${new Date(
                            item.created_at
                        ).toLocaleDateString()}
                    </td>
                    <td>
                        <button 
                            onclick="deleteSubmission('${item.id}')"
                            class="delete-btn"
                        >
                            Delete
                        </button>
                    </td>
                </tr>
            `;
        });

        updateStatistics(submissions);

    } catch(error) {

        console.error(error);
    }
}

function updateStatistics(data) {

    document.getElementById(
        "totalSubmissions"
    ).textContent = data.length;

    document.getElementById(
        "phdCount"
    ).textContent =
    data.filter(
        item =>
        item.recommendation === "PhD"
    ).length;

    document.getElementById(
        "dbaCount"
    ).textContent =
    data.filter(
        item =>
        item.recommendation === "DBA"
    ).length;

    document.getElementById(
        "certificationCount"
    ).textContent =
    data.filter(
        item =>
        item.recommendation ===
        "Certification Program"
    ).length;
}

async function deleteSubmission(id) {
    
    if (!confirm("Are you sure you want to delete this submission?")) {
        return;
    }

    try {
        
        const response =
        await fetch(
            `https://academic-path-recommendation-engine.onrender.com/api/submissions/${id}`,
            {
                method: "DELETE"
            }
        );

        if (response.ok) {
            
            loadSubmissions();
            
        } else {
            
            alert("Failed to delete submission");
            
        }

    } catch(error) {
        
        console.error(error);
        alert("Failed to delete submission");
    }
}

loadSubmissions();