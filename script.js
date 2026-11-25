(function () {
    'use strict';

    let currentSlide = 1;
    const totalSlides = 4;

    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const indicators = document.querySelectorAll('.indicator');
    const slides = document.querySelectorAll('.slide');

    function goToSlide(slideNumber) {
        if (slideNumber < 1 || slideNumber > totalSlides) return;

        // Update slides
        slides.forEach((slide) => {
            slide.classList.remove('active', 'prev');
            const slideNum = parseInt(slide.dataset.slide);
            if (slideNum === slideNumber) {
                slide.classList.add('active');
            } else if (slideNum < slideNumber) {
                slide.classList.add('prev');
            }
        });

        // Update indicators
        indicators.forEach((indicator) => {
            indicator.classList.remove('active');
            if (parseInt(indicator.dataset.slide) === slideNumber) {
                indicator.classList.add('active');
            }
        });

        // Update current slide
        currentSlide = slideNumber;

        // Update button states
        prevBtn.disabled = currentSlide === 1;
        nextBtn.disabled = currentSlide === totalSlides;
    }

    // Navigation buttons
    prevBtn.addEventListener('click', () => {
        goToSlide(currentSlide - 1);
    });

    nextBtn.addEventListener('click', () => {
        goToSlide(currentSlide + 1);
    });

    // Indicators
    indicators.forEach((indicator) => {
        indicator.addEventListener('click', () => {
            const slideNumber = parseInt(indicator.dataset.slide);
            goToSlide(slideNumber);
        });
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            goToSlide(currentSlide - 1);
        } else if (e.key === 'ArrowRight' || e.key === ' ') {
            e.preventDefault();
            goToSlide(currentSlide + 1);
        } else if (e.key === 'Home') {
            goToSlide(1);
        } else if (e.key === 'End') {
            goToSlide(totalSlides);
        }
    });

    // Initialize
    goToSlide(1);
})();
