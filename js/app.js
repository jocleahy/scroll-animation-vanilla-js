const hasAnimations = document.querySelectorAll('.has-animation');

function isScrolling(e) {
    hasAnimations.forEach(hasAnimation => {
        // calc bottom of viewport
        const viewBot = window.innerHeight + window.scrollY;

        // calc when img comes into view
        // will add active class
        const inView = viewBot - hasAnimation.clientHeight / 3;

        // calc bottom of image from top of page
        // will remove animation active class
        const imgBot = hasAnimation.offsetTop + hasAnimation.clientHeight;

        // when inView is greater than the top of image from page
        const canAnimate = inView > hasAnimation.offsetTop;

        // done when Ypos is less than imgBot
        const aniPast = window.scrollY < imgBot;

        if (canAnimate && aniPast) {
            hasAnimation.classList.add('active');
        } else {
            hasAnimation.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', isScrolling);