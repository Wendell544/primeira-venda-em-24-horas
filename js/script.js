// PIXEL FACEBOOK (básico, sem eventos de compra)
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '2288144431932312');
fbq('track', 'PageView');

// Rastreamento de clique no botão de checkout (Lead)
document.addEventListener('DOMContentLoaded', function() {
    var checkoutBtns = document.querySelectorAll('a[href*="pay.cakto.com.br"]');
    checkoutBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            fbq('track', 'Lead', {content_name: 'Primeira Venda 24h', content_category: 'Checkout'});
        });
    });
});

// CARROSSEL DE DEPOIMENTOS
(function() {
    const track = document.getElementById('carouselTrack');
    if (!track) return;
    const slides = Array.from(track.children);
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const dotsContainer = document.getElementById('carouselDots');
    
    let slideWidth = 0;
    let slidesToShow = 1;
    let currentIndex = 0;
    
    function updateCarouselDimensions() {
        const containerWidth = track.parentElement.clientWidth;
        if (containerWidth >= 1024) slidesToShow = 3;
        else if (containerWidth >= 768) slidesToShow = 2;
        else slidesToShow = 1;
        
        slideWidth = (containerWidth / slidesToShow);
        slides.forEach(slide => {
            slide.style.flex = `0 0 ${slideWidth}px`;
        });
        goToSlide(currentIndex);
        updateDots();
    }
    
    function goToSlide(index) {
        if (slides.length === 0) return;
        const maxIndex = Math.max(0, slides.length - slidesToShow);
        if (index < 0) index = 0;
        if (index > maxIndex) index = maxIndex;
        currentIndex = index;
        const shiftAmount = - (currentIndex * slideWidth);
        track.style.transform = `translateX(${shiftAmount}px)`;
        updateDots();
    }
    
    function updateDots() {
        const maxIndex = Math.max(0, slides.length - slidesToShow);
        const dotCount = maxIndex + 1;
        dotsContainer.innerHTML = '';
        for (let i = 0; i < dotCount; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === currentIndex) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
    }
    
    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', () => {
            const maxIndex = Math.max(0, slides.length - slidesToShow);
            if (currentIndex < maxIndex) goToSlide(currentIndex + 1);
        });
        
        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) goToSlide(currentIndex - 1);
        });
    }
    
    window.addEventListener('resize', () => {
        updateCarouselDimensions();
    });
    
    updateCarouselDimensions();
})();