document.addEventListener('DOMContentLoaded', function () {
    /* Check-in Entry */
    const emojiButtons = document.querySelectorAll('.btn-emoji');
    if (emojiButtons.length > 0) {
        emojiButtons.forEach(button => {
            button.addEventListener('click', function () {
                emojiButtons.forEach(btn => {
                    btn.classList.remove('btn-emoji--selected');
                });
                this.classList.add('btn-emoji--selected');
            });
        });
    }

    /* Check-in History */
    const historyList = document.getElementById('history-list');
    const historyDetail = document.getElementById('history-detail');

    if (historyList && historyDetail) {
        let historyData = [];

        fetch('../mock-data/checkin-history.json')
            .then(response => response.json())
            .then(data => {
                historyData = data;
                if (historyList) {
                    renderHistoryList(historyData);
                    if (historyData.length > 0) {
                        renderHistoryDetail(0);
                        if (historyList.children[0]) {
                            historyList.children[0].classList.add('history-list-item--selected');
                        }
                    }
                }
            });

        function renderHistoryList(data) {
            historyList.innerHTML = '';
            data.forEach((item, index) => {
                const listItem = document.createElement('li');
                listItem.classList.add('history-list-item');
                listItem.dataset.index = index;

                const mood = document.createElement('span');
                mood.classList.add('history-list-item__mood');
                mood.textContent = item.mood;

                const textContainer = document.createElement('div');
                textContainer.classList.add('history-list-item__text');

                const date = document.createElement('span');
                date.classList.add('history-list-item__date');
                date.textContent = new Date(item.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });

                const notePreview = document.createElement('p');
                notePreview.classList.add('history-list-item__note-preview');
                const previewText = item.note.substring(0, 50);
                notePreview.textContent = previewText + (item.note.length > 50 ? '...' : '');

                textContainer.appendChild(date);
                textContainer.appendChild(notePreview);

                listItem.appendChild(mood);
                listItem.appendChild(textContainer);

                listItem.addEventListener('click', () => {
                    document.querySelectorAll('.history-list-item').forEach(item => {
                        item.classList.remove('history-list-item--selected');
                    });
                    listItem.classList.add('history-list-item--selected');
                    renderHistoryDetail(index);
                });

                historyList.appendChild(listItem);
            });
        }

        function renderHistoryDetail(index) {
            const item = historyData[index];
            historyDetail.innerHTML = `
                <h2>${item.mood}</h2>
                <p class="history-detail__meta">${new Date(item.date).toLocaleString('en-US', {
                    dateStyle: 'full',
                    timeStyle: 'short'
                })}</p>
                <p class="history-detail__note">${item.note}</p>
            `;
        }
    }
});
