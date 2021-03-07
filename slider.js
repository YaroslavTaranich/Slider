function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {

    const slides = document.querySelectorAll(slide),
        slider = document.querySelector(container),
        current = document.querySelector(currentCounter),
        total = document.querySelector(totalCounter),
        prev = document.querySelector(prevArrow),
        next = document.querySelector(nextArrow),
        slidesWapper = document.querySelector(wrapper),
        slidesField = document.querySelector(field),
        width = window.getComputedStyle(slidesWapper).width;

    let slideIndex = 1;
    let offset = 0;

    function addZeroCurent() {
        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
    }

    function dotActiveOpasity() {
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = '1';
    }

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
    } else {
        total.textContent = slides.length;
    }

    function getNumbers(string) {
        return +string.replace(/\D/g, '');
    }

    addZeroCurent();

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWapper.style.overflow = "hidden";

    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
        dots = [];
    indicators.classList.add('carousel-indicators');
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.classList.add('dot');
        if (i == 0) {
            dot.style.opacity = '1';
        }
        indicators.append(dot);
        dots.push(dot);
    }

    function nextSlide() {
        if (offset == getNumbers(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += getNumbers(width);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;
        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }
        addZeroCurent();
        dotActiveOpasity();
    }

    next.addEventListener('click', () => {
        nextSlide();
    });
    document.addEventListener("keydown", (e) => {
        if (e.code === "ArrowRight") {
            nextSlide();
        }
    });


    function prevSlide() {
        if (offset == 0) {
            offset = getNumbers(width) * (slides.length - 1);
        } else {
            offset -= getNumbers(width);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;
        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }
        addZeroCurent();
        dotActiveOpasity();
    }


    prev.addEventListener('click', () => {
        prevSlide();
    });
    document.addEventListener("keydown", (e) => {
        if (e.code === "ArrowLeft") {
            prevSlide();
        }
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = getNumbers(width) * (slideTo - 1);

            slidesField.style.transform = `translateX(-${offset}px)`;

            addZeroCurent();
            dotActiveOpasity();
        });
    });
}

slider({
    container: '.offer__slider',
    nextArrow: '.offer__slider-next',
    slide:  '.offer__slide',
    prevArrow: '.offer__slider-prev',
    totalCounter: '#total',
    currentCounter: '#current',
    wrapper: '.offer__slider-wrapper',
    field: '.offer__slider-inner',
});