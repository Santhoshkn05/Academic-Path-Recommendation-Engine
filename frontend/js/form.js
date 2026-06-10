const form = document.getElementById("recommendationForm");
const loading = document.getElementById("loading");
const recommendationCard = document.getElementById("recommendationCard");

const recommendationText = document.getElementById("recommendationText");
const reasonText = document.getElementById("reasonText");
const generatedTime = document.getElementById("generatedTime");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const fullname = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const qualification = document.getElementById("qualification").value;
    const experience = document.getElementById("experience").value;
    const profession = document.getElementById("profession").value.trim();
    const careerGoal = document.getElementById("careerGoal").value.trim();

    loading.classList.remove("hidden");
    recommendationCard.classList.add("hidden");

    try {

        const response = await fetch(
            "https://academic-path-recommendation-engine-2.onrender.com/api/recommendations",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    fullname,
                    email,
                    qualification,
                    experience,
                    profession,
                    careerGoal
                })
            }
        );

        const data = await response.json();

        recommendationText.textContent = data.recommendation;
        reasonText.textContent = data.reason;
        generatedTime.textContent = new Date().toLocaleString();

        recommendationCard.classList.remove("hidden");

    } catch (error) {

        alert("Failed to generate recommendation.");

        console.error(error);
    }

    loading.classList.add("hidden");
});