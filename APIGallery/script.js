// Замените 'YOUR_API_KEY' на ваш собственный API ключ Unsplash
const apiKey = 'RlWnx6EVZISmHMzP7RiVAt9FsKchM7jPiNa_IeChESs';
const apiUrl = 'https://api.unsplash.com/photos/random/?count=15&orientation=landscape'; // Загружаем 15 случайных изображений
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

const gallery = document.querySelector('.gallery');


// URL-адреса для готовых запросов
const queryUrls = {
    cars: 'https://api.unsplash.com/photos/cars/?count=15&query=cars',
    cats: 'https://api.unsplash.com/photos/cats/?count=15&query=cats',
    cosmos: 'https://api.unsplash.com/photos/cosmos/?count=15&query=cosmos',
    dogs: 'https://api.unsplash.com/photos/dogs/?count=15&query=dogs',
    nature: 'https://api.unsplash.com/photos/random/?count=15&query=nature',
    night: 'https://api.unsplash.com/photos/random/?count=15&query=night',
};

// Обработчик события для клика на иконку
function handleIconClick(iconClass) {
    const queryUrl = queryUrls[iconClass];
    fetchImages(queryUrl);
}

// Функция для загрузки изображений из Unsplash API
async function fetchImages(query) {
    try {
        const url = query ? `https://api.unsplash.com/photos/random/?count=10&query=${query}&orientation=landscape` : apiUrl;
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


            // Добавляем обработчик события клика для каждой картинки
            imgElement.addEventListener('click', () => {
                // Удаляем класс 'clicked' у всех картинок
                const allImages = document.querySelectorAll('.gallery img');
                allImages.forEach((img) => {
                    img.classList.remove('clicked');
                });

                // Добавляем класс 'clicked' только к выбранной картинке
                imgElement.classList.add('clicked');
            });

            gallery.appendChild(imgElement);
        });
    } catch (error) {
        console.error('Произошла ошибка:', error);
    }
}

// Обработчик события для текстового поля для отправки формы по нажатию Enter
searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        const query = searchInput.value;
        const searchUrl = query ? `https://api.unsplash.com/photos/random/?count=10&query=${query}` : apiUrl;
        fetchImages(searchUrl);
    }
});


// Находим все элементы с классом 'icon' и добавляем обработчик события для каждой из них
const icons = document.querySelectorAll('.icon');
icons.forEach((icon) => {
    icon.addEventListener('click', () => {
        // Получаем класс иконки и передаем его в функцию обработки клика
        const iconClass = icon.classList[1]; // Предполагаем, что второй класс уникален для каждой иконки
        handleIconClick(iconClass);
    });
});

// Вызываем функцию загрузки изображений при загрузке страницы
fetchImages();
