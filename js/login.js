document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('form');

    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const usernameInput = document.getElementById('username');
            const passwordInput = document.getElementById('password');

            if (usernameInput && passwordInput) {
                const username = usernameInput.value.trim();
                const password = passwordInput.value.trim();

                // Check if both username and password fields are filled
                if (username && password) {
                    // Store the username in sessionStorage
                    sessionStorage.setItem('auth_username', username);

                    // Redirect to the main page after successful "login"
                    window.location.href = 'dashboard.html';
                } else {
                    alert('Please enter both username and password.');
                }
            }
        });
    }
});