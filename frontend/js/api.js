document.addEventListener("DOMContentLoaded", () => {
    console.log("Application Loaded");

    // initializeTooltips();
    initializeAnimations();
});

function showLoading(message = "Loading...") {

    const loading =
        document.getElementById("loading");

    if (!loading) return;

    loading.textContent = message;
    loading.classList.remove("hidden");
}

function hideLoading() {

    const loading =
        document.getElementById("loading");

    if (!loading) return;

    loading.classList.add("hidden");
}

function showToast(message, type = "success") {

    let toast =
        document.createElement("div");

    toast.className =
        `toast ${type}`;

    toast.textContent =
        message;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.add("show");
    }, 100);

    setTimeout(() => {
        toast.remove();
    }, 3500);
}

function displayRecommendation(data) {

    const card =
        document.getElementById(
            "recommendationCard"
        );

    if (!card) return;

    document.getElementById(
        "recommendationText"
    ).textContent =
        data.recommendation;

    document.getElementById(
        "reasonText"
    ).textContent =
        data.reason;

    document.getElementById(
        "generatedTime"
    ).textContent =
        new Date().toLocaleString();

    card.classList.remove("hidden");

    card.scrollIntoView({
        behavior: "smooth"
    });
}

function clearRecommendation() {

    const card =
        document.getElementById(
            "recommendationCard"
        );

    if (!card) return;

    card.classList.add("hidden");
}

function validateEmail(email) {

    const pattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return pattern.test(email);
}

function showEmptyState() {

    const emptyState =
        document.getElementById(
            "emptyState"
        );

    if (!emptyState) return;

    emptyState.classList.remove("hidden");
}

function hideEmptyState() {

    const emptyState =
        document.getElementById(
            "emptyState"
        );

    if (!emptyState) return;

    emptyState.classList.add("hidden");
}

function initializeAnimations() {

    const cards =
        document.querySelectorAll(
            ".stat-card, .recommendation-card"
        );

    cards.forEach(card => {

        card.addEventListener(
            "mouseenter",
            () => {
                card.style.transform =
                    "translateY(-5px)";
            }
        );

        card.addEventListener(
            "mouseleave",
            () => {
                card.style.transform =
                    "translateY(0px)";
            }
        );

    });
}

window.App = {
    showLoading,
    hideLoading,
    showToast,
    displayRecommendation,
    clearRecommendation,
    validateEmail,
    showEmptyState,
    hideEmptyState
};