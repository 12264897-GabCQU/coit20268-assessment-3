document.addEventListener('DOMContentLoaded', () => {
    const buddyList = document.getElementById('buddy-list');
    const activityFilter = document.getElementById('activity-filter');
    const locationFilter = document.getElementById('location-filter');
    const dateFilter = document.getElementById('date-filter');
    let buddyData = [];

    // Fetch buddy lookup data
    fetch('../mock-data/buddy-lookup.json')
        .then(response => response.json())
        .then(data => {
            buddyData = data;
            renderBuddyList(buddyData);
        });

    // Add event listeners for filters
    activityFilter.addEventListener('change', filterAndRender);
    locationFilter.addEventListener('change', filterAndRender);
    dateFilter.addEventListener('change', filterAndRender);

    function filterAndRender() {
        let filteredData = buddyData;

        // Filter by activity
        const activity = activityFilter.value;
        if (activity !== 'all') {
            filteredData = filteredData.filter(item => item.activity === activity);
        }

        // Filter by location
        const location = locationFilter.value;
        if (location !== 'all') {
            filteredData = filteredData.filter(item => item.location === location);
        }

        // Filter by date
        const date = dateFilter.value;
        if (date) {
            filteredData = filteredData.filter(item => {
                const itemDate = new Date(item.date).toISOString().split('T')[0];
                return itemDate === date;
            });
        }

        renderBuddyList(filteredData);
    }

    function renderBuddyList(data) {
        buddyList.innerHTML = ''; // Clear existing list

        if (data.length === 0) {
            buddyList.innerHTML = '<p>No buddies found for the selected criteria.</p>';
            return;
        }

        data.forEach(item => {
            const card = document.createElement('div');
            card.classList.add('buddy-card', `buddy-card--${item.activity}`);

            const icon = getActivityIcon(item.activity);
            const formattedDate = new Date(item.date).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });

            card.innerHTML = `
                <div class="buddy-card__header">
                    <div class="buddy-card__icon">${icon}</div>
                    <h3 class="buddy-card__title">${item.activity}</h3>
                </div>
                <div class="buddy-card__body">
                    <p class="buddy-card__detail">
                        📍${item.location}
                    </p>
                </div>
                <div class="buddy-card__footer">
                    Posted on ${formattedDate}
                </div>
            `;
            buddyList.appendChild(card);
        });
    }

    function getActivityIcon(activity) {
        switch (activity) {
            case 'walk':
                return '🚶';
            case 'study':
                return '📚';
            case 'coffee':
                return '☕';
            default:
                return '😊';
        }
    }
});