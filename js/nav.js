function loadNavigation() {
    const path = window.location.pathname.includes('/pages/') ? '../pages/nav.html' : 'nav.html';
    fetch(path)
        .then(response => response.text())
        .then(data => {
            document.getElementById('nav-placeholder').innerHTML = data;
        })
        .catch(error => console.error('Error loading navigation:', error));
}

document.addEventListener('DOMContentLoaded', loadNavigation);