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
        voiceInput.addEventListener('click', function micIconClick() {
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
        voiceInput.addEventListener('click', function() { 
            alert('本瀏覽器不支援語音辨識功能，請切換瀏覽器。')
        })
    }
});