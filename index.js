document.addEventListener("DOMContentLoaded", function() {
    if (!sessionStorage.getItem("auth_username")) {
        window.location.href = "./pages/login.html";
    } else {
        window.location.href = "./pages/dashboard.html";
    }
});