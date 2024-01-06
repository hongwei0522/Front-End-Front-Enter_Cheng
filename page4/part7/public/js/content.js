import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

//banner carousel
let slideIndex = 0;
function showSlides() {
    let i;
    const slides = app.get(".slide-container").getElementsByTagName("img");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.opacity = 0;
    }
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }
    slides[slideIndex - 1].style.opacity = 1;

    setTimeout(showSlides, 6000);
}
showSlides();

document.addEventListener('DOMContentLoaded', function() {
    const db = getDatabase();
    const articlesRef = ref(db, '/article');
    get(articlesRef).then((snapshot) => {
        if (snapshot.exists()) {
            const articles = Object.values(snapshot.val());
            const urlParams = new URLSearchParams(window.location.search);
            const articleId = urlParams.get('id');

            if (articleId) {
                articles.forEach(article => {
                    if (article.creatTime.toString() === articleId) {
                        app.get('.slide-text').textContent = article.name;
                        app.get('.main-content-title').textContent = article.topic;
                        app.get('.main-content-text').innerHTML = article.content;
                        app.get('.city').textContent = article.city;
                        app.get('.classtype').textContent = article.classType;
                        app.get('.teachway').textContent = article.teachWay;
                        app.get('.totalday').textContent = article.totalDay + '天';
                        app.get('.weekhour').textContent = article.weekHour + '小時';
                        app.get('.technology').textContent = article.technology;
                        app.get('.mail').textContent = article.mail;
                        app.get('.phone').textContent = article.phone;
                    }
                });
            }
        }
    }).catch((error) => {
        console.error(error);
    });
});

    const imgElements = document.querySelectorAll('[class^="image-left"]');
    const imgOutside = app.get('.rotate-outside');
    const imgRotate = app.get('.rotate-img');
    const arrowLeft = app.get('.rotate-left');
    const arrowRight = app.get('.rotate-right');
    let currentImageIndex = 0;

    arrowLeft.addEventListener('click', function () {
        currentImageIndex = (currentImageIndex - 1 + imgElements.length) % imgElements.length;
        updateImageBackground();
    });

    arrowRight.addEventListener('click', function () {
        currentImageIndex = (currentImageIndex + 1) % imgElements.length;
        updateImageBackground();
    });

    imgOutside.addEventListener('click', function (event) {
        if (event.target === imgOutside) {
            imgOutside.style.display = 'none';
        }
    });

    imgElements.forEach(function (imgElement, index) {
        imgElement.addEventListener('click', function () {
            currentImageIndex = index;
            updateImageBackground();
            imgOutside.style.display = 'flex';
        });
    });

    function updateImageBackground() {
        const nextImage = imgElements[currentImageIndex];
        const nextImageStyle = window.getComputedStyle(nextImage);
        const nextImageBackground = nextImageStyle.getPropertyValue('background');
        imgRotate.style.background = nextImageBackground;
    };

