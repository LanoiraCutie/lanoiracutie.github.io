let currentSectionIndex = 0;
const sections = document.querySelectorAll('.section');
let isTransitioning = false;

function showSection(index) {
    if (index < 0 || index >= sections.length || isTransitioning) return;

    isTransitioning = true;

    const newSection = sections[index];
    const oldSection = sections[currentSectionIndex];

    // Add "visible" so it's interactable
    newSection.classList.add('visible');
    newSection.style.backgroundImage = `url('${newSection.getAttribute('data-bg')}')`;

    // Start fade in
    newSection.classList.add('active');

    // Fade out old section
    if (oldSection && oldSection !== newSection) {
        oldSection.classList.remove('active');

        // After fade out, send it behind
        setTimeout(() => {
            oldSection.classList.remove('visible');
        }, 1000); // match transition duration
    }

    currentSectionIndex = index;

    setTimeout(() => {
        isTransitioning = false;
    }, 1000);
}

function handleWheelScroll(e) {
    if (isTransitioning) return;

    const direction = e.deltaY > 0 ? 1 : -1;
    const nextIndex = currentSectionIndex + direction;

    if (nextIndex >= 0 && nextIndex < sections.length) {
        showSection(nextIndex);
    }
}

window.addEventListener('wheel', handleWheelScroll);
window.addEventListener('DOMContentLoaded', () => {
    showSection(0);

    // --- SLIDER LOGIC START ---
    const slider = document.querySelector('.seatwork-slide');
    const slides = document.querySelectorAll('.seatwork-hl-container');
    const dots = document.querySelectorAll('.sliders');
    let currentSlideIndex = 0;

    function updateIndicators(index) {
        dots.forEach(dot => dot.classList.remove('active'));
        dots[index].classList.add('active');
    }

    function scrollToSlide(index) {
        const slideWidth = slides[0].offsetWidth + 30; // includes the gap/margin
        slider.scrollTo({ left: slideWidth * index, behavior: 'smooth' });
        currentSlideIndex = index;
        updateIndicators(index);
    }

    // Clickable dots
    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => scrollToSlide(i));
    });

    // Prev/Next buttons
    document.querySelector('.prev-btn').addEventListener('click', () => {
        if (currentSlideIndex > 0) scrollToSlide(currentSlideIndex - 1);
    });

    document.querySelector('.next-btn').addEventListener('click', () => {
        if (currentSlideIndex < slides.length - 1) scrollToSlide(currentSlideIndex + 1);
    });
    // --- SLIDER LOGIC END ---
});
