document.addEventListener("DOMContentLoaded", function() {
    if (!sessionStorage.getItem("auth_username")) {
        console.log('No user logged in, redirecting to login page.');
        window.location.href = "./pages/login.html";
    } else {
        window.location.href = "./pages/dashboard.html";
    }
});