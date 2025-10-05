document.addEventListener("DOMContentLoaded", function() {
    const checkInButton = document.getElementById('check-in');
    const ventWallButton = document.getElementById('vent-wall');
    const findBuddyButton = document.getElementById('find-buddy');

    if (checkInButton) {
        checkInButton.addEventListener('click', function () {
            window.location.href = 'checkin-entry.html';
        });
    }

    if (ventWallButton) {
        ventWallButton.addEventListener('click', function () {
            window.location.href = 'vent-feed.html';
        });
    }

    if (findBuddyButton) {
        findBuddyButton.addEventListener('click', function () {
            window.location.href = 'buddy-lookup.html';
        });
    }
});