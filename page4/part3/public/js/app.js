let app = {};
app.get = function (selector) {
	return document.querySelector(selector);
};
app.create = function (element) {
	return document.createElement(element);
};

//loading
app.loading = function() {
    app.get('.loading-animation').style.opacity = '0.7';
    app.get('.loading-animation').style.transform = 'translateY(100%)';
    app.get('.loading-color').style.opacity = '0.7';
    app.get('.loading-color').style.transform = 'translateY(100%)';
    app.get('.header').style.animation = 'headerUp 1s ease 0s 1';
    app.get('.aside').style.animation = 'asideDown 1s ease 0s 1';
    setTimeout(function() {
        app.get('.loading-animation').style.display = 'none';
    }, 600)
}

setTimeout(() => {
    app.loading();
}, 1800)

window.onload = () => {
    //top
    app.get('.top').addEventListener("click", function() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
          });
    });
};

document.addEventListener('DOMContentLoaded', function() {
    //search
    const searchDiv = app.get('.search-div');
    const searchOutside = app.get('.search-outside');
    const searchClick = app.get('.search-img');
    const searchInput = app.get(".search-input");
    let clickCount = 0;

    searchClick.addEventListener('click', function() {
        clickCount += 1;
        if (clickCount === 1) {
            searchDiv.style.display = 'flex';
            searchOutside.style.display = 'flex';
            searchInput.focus();}
        if (clickCount === 2) {
            searchDiv.style.display = 'none';
            searchOutside.style.display = 'none';
            clickCount = 0;}
    });
      
    searchOutside.onclick = () => {
        searchDiv.style.display = 'none';
        searchOutside.style.display = 'none';
    };
    
    searchInput.onkeypress = (event) => {
        if(event.keyCode == 13){
            event.preventDefault();
            const searchTerm = searchInput.value;
            if (searchTerm.trim() !== '') {
                const url = 'article.html?id=' + encodeURIComponent(searchTerm);
                window.location.href = url;
            }
        }
    }

    app.get('.search-button').addEventListener('click', function() {
        const searchTerm = searchInput.value;
        if (searchTerm.trim() !== '') {
            const url = 'article.html?id=' + encodeURIComponent(searchTerm);
            window.location.href = url;
        }
    });

    const voiceInput = app.get('.voice-button');
    const speechRecognition = window.webkitSpeechRecognition;

    if (speechRecognition){
        const recognition = new speechRecognition();
        voiceInput.addEventListener('click', function micIconClick(){
            recognition.start();
        })
        recognition.addEventListener('end', function() {
            recognition.stop();
        });
        recognition.addEventListener('result', function(event) {
            const transcript = event.results[0][0].transcript;
            searchInput.value = transcript;
            searchInput.focus();
        });
    } else {
        voiceInput.addEventListener('click', function(){ 
            alert('本瀏覽器不支援語音辨識功能，請切換瀏覽器。')
        })
    }

    //test go
    const testGoOutside = app.get('.test-go-outside');
    const testTitle = app.get('.test-title');
    const testPreface = app.get('.test-preface');
    const testButtonStart = app.get('.test-button-start');
    const testQuestion = app.get('.test-question');
    const testNumber = app.get('.test-number');
    const testSelectElements = document.querySelectorAll('[class^="test-select"]');
    const endCircle = app.get('.test-end-circle');
    const endCircleWhite = app.get('.test-end-white');
    const endLocation = app.get('.test-end-location');
    const endArticle = app.get('.test-end-result');
    let clickCountTest = 0;

    fetch('front-enter-export.json')
        .then(response => response.json())
        .then(data => {
            const quizs = Object.values(data.quizData);
            const articles = Object.values(data.article);
            let currentQuestionIndex = 0;
            let userAnswers = {};

            async function displayQuestion(index) {
                const currentQuestion = quizs[index];
                if (currentQuestion) {
                    testQuestion.textContent = currentQuestion.question;
                    testNumber.textContent = currentQuestion.questionNum;
                    testSelectElements.forEach((element, i) => {
                        element.textContent = currentQuestion['select' + (i + 1)];
                    });
                    
                    // 先移除先前的事件監聽器
                    testSelectElements.forEach(element => {
                        element.onclick = null;
                    });
            
                    // 等待監聽完成後再執行下一題
                    await new Promise((resolve) => {
                        testSelectElements.forEach((element, i) => {
                            element.onclick = function() {
                                const selectedOption = i + 1;
                                userAnswers[currentQuestion.questionNum] = selectedOption;

                                resolve();
                            };
                        });
                    });
                        currentQuestionIndex++;
                        displayQuestion(currentQuestionIndex);
                } else {
                    console.log('回覆:', userAnswers);
                    let classes = { class1: 0, class2: 0, class3: 0, class4: 0, class5: 0, class6: 0, class7: 0, class8: 0, class9: 0 };
                    const mapping = {
                        '1/5': {
                            1: ['class1', 'class2', 'class3', 'class4', 'class5', 'class7', 'class8','class9'],
                            2: ['class4', 'class8'], 
                            3: ['class4', 'class6', 'class8']
                        },
                        '2/5': {
                            1: ['class1', 'class4', 'class5', 'class6', 'class9'],
                            2: ['class2', 'class3', 'class7', 'class8']
                        },
                        '3/5': {
                            1: ['class1', 'class2'],
                            2: ['class3', 'class5', 'class6', 'class8', 'class9'],
                            3: ['class4', 'class7']
                        },
                        '4/5': {
                            1: ['class2'],
                            2: ['class3', 'class4', 'class5', 'class7', 'class9'],
                            3: ['class1', 'class6', 'class8']
                        },
                        '5/5': {
                            1: ['class4', 'class5', 'class8'],
                            2: ['class4', 'class8'], 
                            3: ['class1', 'class2', 'class3', 'class6', 'class7', 'class9']
                        }
                    };
                    
                    for (let question in userAnswers) {
                        let answer = userAnswers[question];
                        let affectedClasses = mapping[question][answer];
                        if (affectedClasses) {
                            affectedClasses.forEach(c => classes[c]++);
                        }
                    }
                    testQuestion.textContent = '來看看你有多適合這所學校？';
                    testNumber.textContent = '';
                    testSelectElements.forEach(element => {
                        element.textContent = '';
                    });
                    endCircleWhite.textContent = '';
                    endCircle.style.display = 'block';
                    endCircleWhite.style.display = 'block';
                    endArticle.style.display = 'flex';
                    
                    let highestClass = Object.keys(classes).reduce((a, b) => classes[a] > classes[b] ? a : b);
                    function getIdByClass(className) {
                        const index = parseInt(className.replace('class', ''), 10) - 1;
                        return {
                            id: articles[index].creatTime,
                            name: articles[index].name
                        };
                    }
                    const result = getIdByClass(highestClass);
                    endLocation.href = 'content.html?id=' + result.id;
                    setTimeout(()=> {
                        endArticle.textContent = result.name;
                        endCircleWhite.textContent = `${classes[highestClass]}` *20+`%`;}
                    , 3000);

                    if(classes[highestClass] === 1) {
                        endCircle.style.setProperty('--rotate-before', '90deg');
                        endCircle.style.setProperty('--rotate-after', '162deg');
                        endCircle.style.setProperty('--border-color-after', 'rgb(26,216,211)');
                    } else if(classes[highestClass] === 2) {
                        endCircle.style.setProperty('--rotate-before', '90deg');
                        endCircle.style.setProperty('--rotate-after', '234deg');
                        endCircle.style.setProperty('--border-color-after', 'rgb(26,216,211)');
                    } else if(classes[highestClass] === 3) {
                        endCircle.style.setProperty('--rotate-before', '90deg');
                        endCircle.style.setProperty('--rotate-after', '162deg');
                    } else if(classes[highestClass] === 4) {
                        endCircle.style.setProperty('--rotate-before', '90deg');
                        endCircle.style.setProperty('--rotate-after', '198deg');
                    }
                    console.log(`最高分的教室是: ${highestClass}，分數為: ${classes[highestClass]}`);
                }
            }
    
            app.get('.test-button-start').addEventListener('click',function(){
                testTitle.style.display = 'none';
                testPreface.style.display = 'none';
                testButtonStart.style.display = 'none';
                testQuestion.style.display = 'flex';
                testNumber.style.display = 'flex';
                testSelectElements.forEach(element => {
                    element.style.display = 'flex';
                });
                displayQuestion(currentQuestionIndex); 
            });

            function testInitial(){
                testGoOutside.style.display = 'none';
                testTitle.style.display = 'flex';
                testPreface.style.display = 'flex';
                testButtonStart.style.display = 'block';
                testQuestion.style.display = 'none';
                testNumber.style.display = 'none';
                endCircle.style.display = 'none';
                endCircleWhite.style.display = 'none';
                endArticle.style.display = 'none';
                endArticle.textContent = '';
                testSelectElements.forEach(element => {
                    element.style.display = 'none';
                })
                userAnswers = {};
                currentQuestionIndex = 0;
                clickCountTest = 0;
                endCircle.style.setProperty('--border-color-after', '#44aaa7');
                endCircle.style.setProperty('--rotate-before', '90deg');
                endCircle.style.setProperty('--rotate-after', '270deg');
            };

            testGoOutside.addEventListener('click',function(event){
                if(event.target === testGoOutside){
                    testInitial();
                }
            });

            app.get('.aside').addEventListener('click',function(){
                clickCountTest += 1;
                if(clickCountTest === 1) {
                    testGoOutside.style.display = 'flex';}
                if(clickCountTest === 2) {
                    testInitial();
                }
            });
        })
        .catch(error => console.error('Error:', error));
});