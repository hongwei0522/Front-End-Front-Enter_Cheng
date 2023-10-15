let app = {};
app.get = function (selector) {
	return document.querySelector(selector);
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

window.onload = () => {
    //top
    app.get('.top').addEventListener("click", function() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
          });
    });
    
    //banner carousel
    showSlides();
    
};