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

fetch('front-enter-export.json')
    .then(response => response.json())
    .then(data => {
        const articles = Object.values(data.article);
        const articleContainer = app.get('.main-article');

        articles.forEach(article => {
            addArticle(articleContainer,article);
        });

        const filterClassType = document.querySelectorAll('.center-nav-div');
        const filterCity = document.querySelectorAll('.location-text');

        filterClassType.forEach(button => {
            button.addEventListener('click', () => {
                filterClassType.forEach(btn => {
                    btn.style.color = '';
                });
                const selectedClass = button.classList.contains('all') ? 'all' : button.classList[1];
                const filteredClass = articles.filter(article => {
                    return (selectedClass === 'all' || article.classType === selectedClass || article.teachWay === selectedClass); 
                });
                articleContainer.innerHTML = '';
                filteredClass.forEach(article => {
                    addArticle(articleContainer,article);
                });
                // 因應班級事件重新綁定城市事件
                const filterCity = document.querySelectorAll('.location-text');
                filterCity.forEach(button => {
                    button.addEventListener('click', () => {onCityClick(articles,articleContainer,button)});
                });
                button.style.color = 'rgb(26, 216, 211)';
            });
        });

        filterCity.forEach(button => {
            button.addEventListener('click',() => {onCityClick(articles,articleContainer,button)});
        });      

        //跳轉頁面後從網址抓keyword搜尋
        const urlParams = new URLSearchParams(window.location.search);
        const searchTerm = urlParams.get('id');

        if (searchTerm) {
            (function() {
                const keyword = searchTerm.toLowerCase();
                articleContainer.innerHTML = '';
                let hasResults = false;
                articles.forEach(article => {
                    if (article.name.toLowerCase().includes(keyword) || 
                        article.content.toLowerCase().includes(keyword) ||
                        article.classType.toLowerCase().includes(keyword) ||
                        article.preface.toLowerCase().includes(keyword) ||
                        article.teachWay.toLowerCase().includes(keyword) ||
                        article.technology.toLowerCase().includes(keyword) ||
                        article.topic.toLowerCase().includes(keyword) ||
                        article.city.toLowerCase().includes(keyword)) {
                            addArticle(articleContainer,article);
                            hasResults = true;
                    }
                });
                if (!hasResults) {
                    articleContainer.innerHTML = '請嘗試輸入其他字詞';
                }
            })();
        }
    })
    .catch(error => console.error('Error:', error));

function addArticle(articleContainer, article) { 
    const articleElement = app.create('article');
    articleElement.classList.add('article-box');

    const locationElement = app.create('div');
    locationElement.classList.add('location');

    const locationImg = app.create('div');
    locationImg.classList.add('location-img');
        
    const locationAElement = app.create('a');

    const locationText = app.create('p');
    locationText.classList.add('location-text');
    locationText.textContent = article.city;
    locationText.classList.add(`${article.city}`);

    const articleAElement = app.create('a');
    articleAElement.classList.add('article-a');

    const articleImgBox = app.create('div');
    articleImgBox.classList.add('article-img-box');

    const articleImg = app.create('img');
    articleImg.classList.add('article-img');
    articleImg.src = article.squareUrl;

    const articleTitle = app.create('p');
    articleTitle.classList.add('article-title');
    articleTitle.textContent = article.name;

    const articleContent = app.create('p');
    articleContent.classList.add('article-content');
    articleContent.textContent = article.preface;

    const readmoreBox = app.create('div');
    readmoreBox.classList.add('readmore');

    const readmoreText = app.create('div');
    readmoreText.classList.add('readmore-text');
    readmoreText.textContent = "read more";

    const readmoreImg = app.create('div');
    readmoreImg.classList.add('readmore-img');

    const underline = app.create('div');
    underline.classList.add('underline');

    articleElement.appendChild(locationElement);
    articleElement.appendChild(articleAElement);
    articleElement.appendChild(underline);
    locationElement.appendChild(locationImg);
    locationElement.appendChild(locationAElement);
    locationAElement.appendChild(locationText);
    articleAElement.appendChild(articleImgBox);
    articleAElement.appendChild(articleTitle);
    articleAElement.appendChild(articleContent);
    articleAElement.appendChild(readmoreBox);
    articleImgBox.appendChild(articleImg);
    readmoreBox.appendChild(readmoreText);
    readmoreBox.appendChild(readmoreImg);

    articleContainer.appendChild(articleElement.cloneNode(true));
};

function onCityClick(articles,articleContainer,button) {
    const selectedCity = button.classList[1];
    const filteredCity = articles.filter(article => selectedCity === article.city);
    articleContainer.innerHTML = '';
    filteredCity.forEach(article => {
        addArticle(articleContainer,article);
    });
}

app.create = function (element) {
	return document.createElement(element);
};

