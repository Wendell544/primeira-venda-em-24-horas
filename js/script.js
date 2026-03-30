// Facebook Pixel - Carregamento assíncrono otimizado
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

// Carrossel de Depoimentos - Versão corrigida e com suporte a toque
(function() {
    const track = document.getElementById('carouselTrack');
    if (!track) return;

    const slides = Array.from(track.children);
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const dotsContainer = document.getElementById('carouselDots');
    
    let currentIndex = 0;
    let slidesToShow = 1;
    let slideWidth = 0;
    let gap = 20; // mesmo valor do gap no CSS
    let totalSlides = slides.length;
    
    // Função para atualizar dimensões e slides
    function updateDimensions() {
        const container = track.parentElement;
        const containerWidth = container.clientWidth;
        
        // Determinar quantos slides mostrar baseado na largura
        if (containerWidth >= 1024) slidesToShow = 3;
        else if (containerWidth >= 768) slidesToShow = 2;
        else slidesToShow = 1;
        
        // Calcular largura de cada slide: (largura total - gap*(slidesToShow-1)) / slidesToShow
        slideWidth = (containerWidth - (gap * (slidesToShow - 1))) / slidesToShow;
        
        // Aplicar largura fixa a cada slide
        slides.forEach(slide => {
            slide.style.flex = `0 0 ${slideWidth}px`;
            slide.style.width = `${slideWidth}px`;
        });
        
        // Ajustar o track para que o gap funcione corretamente
        track.style.gap = `${gap}px`;
        
        // Garantir que o índice atual não ultrapasse o máximo
        const maxIndex = Math.max(0, totalSlides - slidesToShow);
        if (currentIndex > maxIndex) currentIndex = maxIndex;
        if (currentIndex < 0) currentIndex = 0;
        
        goToSlide(currentIndex, false);
        updateDots();
    }
    
    function goToSlide(index, smooth = true) {
        const maxIndex = Math.max(0, totalSlides - slidesToShow);
        if (index < 0) index = 0;
        if (index > maxIndex) index = maxIndex;
        
        currentIndex = index;
        const translateX = - (currentIndex * (slideWidth + gap));
        
        if (smooth) {
            track.style.transition = 'transform 0.4s ease-in-out';
        } else {
            track.style.transition = 'none';
        }
        track.style.transform = `translateX(${translateX}px)`;
        
        // Forçar reflow para garantir que a transição seja aplicada corretamente
        if (!smooth) {
            track.offsetHeight;
            track.style.transition = '';
        }
        
        updateDots();
    }
    
    function updateDots() {
        if (!dotsContainer) return;
        const maxIndex = Math.max(0, totalSlides - slidesToShow);
        const dotCount = maxIndex + 1;
        
        dotsContainer.innerHTML = '';
        for (let i = 0; i < dotCount; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === currentIndex) dot.classList.add('active');
            dot.addEventListener('click', () => {
                goToSlide(i);
            });
            dotsContainer.appendChild(dot);
        }
    }
    
    // Eventos dos botões
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const maxIndex = Math.max(0, totalSlides - slidesToShow);
            if (currentIndex < maxIndex) {
                goToSlide(currentIndex + 1);
            }
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                goToSlide(currentIndex - 1);
            }
        });
    }
    
    // Suporte a toque (touch) para dispositivos móveis
    let touchStartX = 0;
    let touchEndX = 0;
    
    function handleTouchStart(e) {
        touchStartX = e.touches[0].clientX;
    }
    
    function handleTouchMove(e) {
        touchEndX = e.touches[0].clientX;
    }
    
    function handleTouchEnd() {
        if (touchStartX - touchEndX > 50) {
            // Swipe esquerda -> próximo
            const maxIndex = Math.max(0, totalSlides - slidesToShow);
            if (currentIndex < maxIndex) goToSlide(currentIndex + 1);
        } else if (touchEndX - touchStartX > 50) {
            // Swipe direita -> anterior
            if (currentIndex > 0) goToSlide(currentIndex - 1);
        }
        touchStartX = 0;
        touchEndX = 0;
    }
    
    const carouselContainer = document.querySelector('.testimonial-carousel');
    if (carouselContainer) {
        carouselContainer.addEventListener('touchstart', handleTouchStart, { passive: true });
        carouselContainer.addEventListener('touchmove', handleTouchMove, { passive: true });
        carouselContainer.addEventListener('touchend', handleTouchEnd);
    }
    
    // Redimensionamento
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            updateDimensions();
        }, 150);
    });
    
    // Inicializar
    updateDimensions();
})();