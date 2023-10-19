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
