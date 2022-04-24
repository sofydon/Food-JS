function slider ({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {

    let   currentSlide = 1;
    let   offset = 0;

    const slides = document.querySelectorAll(slide),
          slider = document.querySelector(container),
          prev = document.querySelector(prevArrow),
          next = document.querySelector(nextArrow),
          total = document.querySelector(totalCounter),
          current = document.querySelector(currentCounter),
          slidesWrapper = document.querySelector(wrapper),
          slidesField = document.querySelector(field),
          width = window.getComputedStyle(slidesWrapper).width;

    function addZeroToSlide(){
        if (currentSlide < 10){
            current.textContent = `0${currentSlide}`
        }else{
            current.textContent = currentSlide
        }
    }

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${currentSlide}`
    } else {
        total.textContent = slides.length;
        current.textContent = currentSlide;
    }
    
    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';

    const dots = document.createElement('ol'),
          points = [];
          
    dots.classList.add('carousel-dots');
    dots.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;
    slider.append(dots);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
        if (i == 0) {
            dot.style.opacity = 1;
        }
        dots.append(dot);
        points.push(dot);
    }

    function addTransform () {
        slidesField.style.transform = `translateX(-${offset}px)`
    }
    function changeActiveDots(){
        points.forEach(dot => dot.style.opacity = '.5');
        points[currentSlide -1].style.opacity = 1;
    } 
    function deleteNotDigits(str){
        return +str.replace(/\D/g, '');
    }

    next.addEventListener ('click', () => {
        if (offset == deleteNotDigits(width) * (slides.length -1)) {
            offset = 0;
        } else {
            offset += deleteNotDigits(width);
        }

        addTransform();

        if (currentSlide == slides.length){
            currentSlide = 1;
        }else {
            currentSlide ++;
        }

        addZeroToSlide(); 
        changeActiveDots();
    });


    prev.addEventListener ('click', () => {
        if (offset == 0) {
            offset = deleteNotDigits(width) * (slides.length -1)
        } else {
            offset -= deleteNotDigits(width);
        }

        addTransform();

        if (currentSlide == 1){
            currentSlide = slides.length;
        }else {
            currentSlide --;
        }
        addZeroToSlide();
        changeActiveDots();
    });

    points.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            currentSlide = slideTo;
            offset = deleteNotDigits(width) * (slideTo -1);

            addTransform();
            addZeroToSlide();
            changeActiveDots();   
        });
    });

    // showSlides(currentSlide);

    // if (slides.length < 10) {
    //     total.textContent = `0${slides.length}`;
    // } else {
    //     total.textContent = slides.length;
    // }
    
    
    // function showSlides(n){
    //     if (n > slides.length) {
    //         currentSlide = 1
    //     }
    //     if (n < 1) {
    //         currentSlide = slides.length
    //     }
    //     slides.forEach(item => {
    //         item.classList.add('hide');
    //     });
    //         slides[currentSlide - 1].classList.add('show');
    //         slides[currentSlide - 1].classList.remove('hide');
    //     if (slides.length < 10) {
    //         current.textContent = `0${currentSlide}`;
    //     } else {
    //         current.textContent = currentSlide;
    //     }
    // }

    // function plusSlides (n){
    //     showSlides(currentSlide += n);  
    // }
    // prev.addEventListener('click',() => {
    //     plusSlides(-1);
    // });
    // next.addEventListener('click',() => {
    //     plusSlides(1);
    // });
}

export default slider;