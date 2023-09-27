// Замените 'YOUR_API_KEY' на ваш собственный API ключ Unsplash
const apiKey = 'RlWnx6EVZISmHMzP7RiVAt9FsKchM7jPiNa_IeChESs';
const apiUrl = 'https://api.unsplash.com/photos/random/?count=15'; // Загружаем 15 случайных изображений
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

const gallery = document.querySelector('.gallery');

// Функция для загрузки изображений из Unsplash API
async function fetchImages(query) {
    try {
        const url = query ? `https://api.unsplash.com/photos/random/?count=10&query=${query}` : apiUrl;
        const response = await fetch(url, {
            headers: {
                Authorization: `Client-ID ${apiKey}`,
            },
        });

        if (!response.ok) {
            throw new Error('Ошибка при загрузке изображений');
        }

        const data = await response.json();

        // Очистите галерею перед добавлением новых изображений
        gallery.innerHTML = '';

        // Отобразите изображения в галерее
        data.forEach((image) => {
            const imgElement = document.createElement('img');
            imgElement.src = image.urls.small;
            imgElement.alt = image.alt_description || 'Unsplash Image';
            gallery.appendChild(imgElement);
        });
    } catch (error) {
        console.error('Произошла ошибка:', error);
    }
}

// Обработчик события для кнопки поиска
searchButton.addEventListener('click', () => {
    const query = searchInput.value;
    fetchImages(query);
});

// Вызываем функцию загрузки изображений при загрузке страницы
fetchImages();
