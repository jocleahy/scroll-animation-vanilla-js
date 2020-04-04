const debounce = (func, delay = 20) => {
    let debounceTimer
    return function () {
        const context = this
        const args = arguments
        clearTimeout(debounceTimer)
        debounceTimer
            = setTimeout(() => func.apply(context, args), delay)
    }
}

const hasAnimations = document.querySelectorAll('.has-animation');
const isShowcase = document.querySelectorAll('.showcase');

// add animation class and set duration
function init() {
    hasAnimations.forEach(hasAnimation => {
        const animation = hasAnimation.dataset.animation;
        const duration = hasAnimation.dataset.duration;

        hasAnimation.classList.add(animation);
        hasAnimation.style.animationDuration = `${duration}s`;
    })

    resizeShowcaseImg();

}

// resize showcase images based on number per row option
function resizeShowcaseImg() {
    isShowcase.forEach(showcase => {
        // number of images inside div
        const img = showcase.querySelectorAll('img.has-animation');
        // data-display not to exceed number of images
        const numImages = (showcase.dataset.display > img.length) ? img.length : showcase.dataset.display;
        // set image width + padding
        const setWidth = ((100 / numImages) - 2) + '%';
        img.forEach(e => {
            e.style.width = setWidth;
        })
    })

}

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

window.addEventListener('scroll', debounce(isScrolling));

init();