fetch('front-enter-export.json')
    .then(response => response.json())
    .then(data => {
        const articles = Object.values(data.article);
        const articleContainer = document.querySelector('.main-article');

        articles.forEach(article => {
            addArticle(articleContainer,article);
        });

        const filterClassType = document.querySelectorAll('.center-nav-div');
        const filterCity = document.querySelectorAll('.location-text');

        filterClassType.forEach(button => {
            button.addEventListener('click', () => {
                const selectedClass = button.classList.contains('all') ? 'all' : button.classList[1];
                const filteredClass = articles.filter(article => {
                    return (selectedClass === 'all' || article.classType === selectedClass); 
                });
                const selectedTeach = button.classList.contains('all') ? 'all' : button.classList[1];
                const filteredTeach = articles.filter(article => {
                    return (selectedTeach === 'all' || article.teachWay === selectedTeach); 
                });
                articleContainer.innerHTML = '';
                if (button.classList.contains('放養制')){
                    filteredTeach.forEach(article => {
                        addArticle(articleContainer,article);
                    });
                }
                filteredClass.forEach(article => {
                    addArticle(articleContainer,article);
                });
                // 因應班級事件重新綁定城市事件
                const filterCity = document.querySelectorAll('.location-text');
                filterCity.forEach(button => {
                    button.addEventListener('click', () => {onCityClick(articles,articleContainer,button)});
                });
            });
        });

        filterCity.forEach(button => {
            button.addEventListener('click',() => {onCityClick(articles,articleContainer,button)});
        });          
    })
    .catch(error => console.error('Error:', error));

function addArticle(articleContainer, article) { 
    const articleElement = document.createElement('article');
    articleElement.classList.add('article-box');

    const locationElement = document.createElement('div');
    locationElement.classList.add('location');

    const locationImg = document.createElement('div');
    locationImg.classList.add('location-img');
        
    const locationAElement = document.createElement('a');

    const locationText = document.createElement('p');
    locationText.classList.add('location-text');
    locationText.textContent = article.city;
    locationText.classList.add(`${article.city}`);

    const articleAElement = document.createElement('a');
    articleAElement.classList.add('article-a');

    const articleImgBox = document.createElement('div');
    articleImgBox.classList.add('article-img-box');

    const articleImg = document.createElement('img');
    articleImg.classList.add('article-img');
    articleImg.src = article.squareUrl;

    const articleTitle = document.createElement('p');
    articleTitle.classList.add('article-title');
    articleTitle.textContent = article.name;

    const articleContent = document.createElement('p');
    articleContent.classList.add('article-content');
    articleContent.textContent = article.preface;

    const readmoreBox = document.createElement('div');
    readmoreBox.classList.add('readmore');

    const readmoreText = document.createElement('div');
    readmoreText.classList.add('readmore-text');
    readmoreText.textContent = "read more";

    const readmoreImg = document.createElement('div');
    readmoreImg.classList.add('readmore-img');

    const underline = document.createElement('div');
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
    console.log(selectedCity);
    const filteredCity = articles.filter(article => selectedCity === article.city);
    articleContainer.innerHTML = '';
    filteredCity.forEach(article => {
        addArticle(articleContainer,article);
    });
}