document.addEventListener('DOMContentLoaded', function () {
/* Check-in vent */
    const ventList = document.getElementById('vent-list');
    const ventDetail = document.getElementById('vent-detail');

    if (ventList && ventDetail) {
        let ventData = [];

        fetch('../mock-data/vent-feed.json')
            .then(response => response.json())
            .then(data => {
                ventData = data;
                if (ventList) {
                    renderventList(ventData);
                    if (ventData.length > 0) {
                        renderventDetail(0);
                        if (ventList.children[0]) {
                            ventList.children[0].classList.add('vent-list-item--selected');
                        }
                    }
                }
            });

        function renderventList(data) {
            ventList.innerHTML = '';
            data.forEach((item, index) => {
                const listItem = document.createElement('li');
                listItem.classList.add('vent-list-item');
                listItem.dataset.index = index;

                const title = document.createElement('span');
                title.classList.add('vent-list-item__title');
                title.textContent = item.title;

                const textContainer = document.createElement('div');
                textContainer.classList.add('vent-list-item__text');

                const date = document.createElement('span');
                date.classList.add('vent-list-item__date');
                date.textContent = new Date(item.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });

                const notePreview = document.createElement('p');
                notePreview.classList.add('vent-list-item__note-preview');
                const previewText = item.note.substring(0, 50);
                notePreview.textContent = previewText + (item.note.length > 50 ? '...' : '');

                textContainer.appendChild(date);
                textContainer.appendChild(notePreview);

                listItem.appendChild(title);
                listItem.appendChild(textContainer);

                listItem.addEventListener('click', () => {
                    document.querySelectorAll('.vent-list-item').forEach(item => {
                        item.classList.remove('vent-list-item--selected');
                    });
                    listItem.classList.add('vent-list-item--selected');
                    renderventDetail(index);
                });

                ventList.appendChild(listItem);
            });
        }

        function renderventDetail(index) {
            const item = ventData[index];
            ventDetail.innerHTML = `
                <h2>${item.title}</h2>
                <p class="vent-detail__meta">${new Date(item.date).toLocaleString('en-US', {
                    dateStyle: 'full',
                    timeStyle: 'short'
                })}</p>
                <p class="vent-detail__note">${item.note}</p>
            `;
        }
    }
});