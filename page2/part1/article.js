window.onload = function() {
    let slideIndex = 0;
    showSlides();

    function showSlides() {
        let i;
        const slides = document.querySelector(".slide-container").getElementsByTagName("img");
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
};