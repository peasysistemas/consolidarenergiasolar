document.addEventListener("DOMContentLoaded", function () {
   // 🔹 Alternar a classe para reduzir o cabeçalho ao rolar (com suavidade)
window.addEventListener("scroll", function () {
    let header = document.getElementById("header");
    const logo = document.querySelector('.logo img');
    
    if (window.scrollY > 50) {
        header.classList.add("header-small");
    } else {
        header.classList.remove("header-small");
    }
    
    // Efeito de escala progressiva (opcional)
    const scale = Math.max(0.5, 1 - window.scrollY / 300); // Ajuste 300 para mudar a sensibilidade
    logo.style.transform = `scale(${scale})`;
});

    // 🔹 Menu Mobile
    const menuToggle = document.getElementById("menu-toggle");
    const menu = document.getElementById("menu");

    menuToggle.addEventListener("click", function () {
        menu.classList.toggle("menu-open");
        menuToggle.setAttribute('aria-expanded', menu.classList.contains("menu-open"));
    });

    // 🔹 Fechar menu ao clicar nos links
    const menuLinks = document.querySelectorAll(".menu ul li a");
    menuLinks.forEach((link) => {
        link.addEventListener("click", function () {
            menu.classList.remove("menu-open");
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });

    // 🔹 Slider de Imagens
    let slideIndex = 0;
    const slides = document.querySelectorAll(".slide");
    let sliderInterval;

    function nextSlide() {
        slides.forEach((slide) => {
            slide.style.opacity = "0";
        });
        slides[slideIndex].style.opacity = "1";
        slideIndex = (slideIndex + 1) % slides.length;
    }

    function startSlider() {
        if (!sliderInterval) {
            sliderInterval = setInterval(nextSlide, 5000);
        }
    }

    function stopSlider() {
        clearInterval(sliderInterval);
        sliderInterval = null;
    }

    function checkVisibility() {
        const section = document.querySelector("#sobre");
        if (!section) return;
        
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
            startSlider();
        } else {
            stopSlider();
        }
    }

    // Debounce para scroll/resize
    let isScrolling;
    window.addEventListener("scroll", function() {
        window.clearTimeout(isScrolling);
        isScrolling = setTimeout(checkVisibility, 100);
    }, false);

    window.addEventListener("resize", function() {
        window.clearTimeout(isScrolling);
        isScrolling = setTimeout(checkVisibility, 100);
    }, false);

    checkVisibility();
    nextSlide();

    // 🔹 Animações de Seção
    const sections = document.querySelectorAll(".sobre-empresa");
    sections.forEach((section) => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    section.classList.add("visible");
                    observer.unobserve(section);
                }
            });
        }, { threshold: 0.1 });
        observer.observe(section);
    });

    // 🔹 Formulário de Contato
    document.getElementById('contactForm').addEventListener('submit', function (event) {
        event.preventDefault();
        
        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const telefone = document.getElementById('telefone').value.trim();

        if (!nome || !email || !telefone) {
            alert("Por favor, preencha todos os campos!");
            return;
        }

        const mensagem = `Olá, meu nome é ${nome}. Meu email é ${email} e meu telefone é ${telefone}. Gostaria de mais informações.`;
        const mensagemCodificada = encodeURIComponent(mensagem);
        const linkWhatsApp = `https://wa.me/5584998227798?text=${mensagemCodificada}`;
        
        window.open(linkWhatsApp, '_blank');
    });

    // 🔹 Sistema de Players de Vídeo (para múltiplos players)
    const videoGroups = {
        1: {
            videos: [
                { id: "2sZWrR3jXZY", description: "💰 Financiamento de Energia Solar – Invista sem pesar no bolso! ☀️⚡" },
                { id: "RNd0YQilsHI", description: "O que muda quando instalamos Energia Solar?" },
                { id: "RP4bME3sVFQ", description: "E as garantias?" },
                { id: "0hjEsDNzzpY", description: "Conforto e Economia é com a Consolida Energia Solar!" },
                { id: "GnPJhLs0gqM", description: "E a taxa mínima da concessionária?" },
                { id: "4og6ijAdOsE", description: "🔎 Não sabe quanto precisa de energia? 🤔⚡\n\nFique tranquilo! A Consolida Energia Solar faz um diagnóstico gratuito do seu consumo e dimensiona um sistema fotovoltaico sob medida para você!" },
                { id: "4JOUEg7CyqM", description: "🔹 O que é uma Unidade Beneficiária na Energia Solar? ☀️⚡" },
            ],
            currentIndex: 0,
            player: null
        },
        2: {
            videos: [
                { id: "2_brZemIXbM", description: "🌟 Depoimento de Nosso Cliente, Darlisson – Economia e Satisfação! 🌟 (parte 1)" },
                { id: "RP4bME3sVFQ", description: "🌟 Depoimento de Nosso Cliente, Darlisson – Economia e Satisfação! 🌟 (parte 2)" },
            ],
            currentIndex: 0,
            player: null
        }
    };

    // Inicializa todos os players
    document.querySelectorAll('.slider-container').forEach(container => {
        const groupId = container.getAttribute('data-video-group');
        const group = videoGroups[groupId];
        const videoFrame = container.querySelector('.video-frame');
        const description = container.querySelector('.video-description');
        const prevBtn = container.querySelector('.btn.prev');
        const nextBtn = container.querySelector('.btn.next');
        
        function loadVideo(index) {
            group.currentIndex = index;
            const videoId = group.videos[index].id;
            videoFrame.src = `https://www.youtube.com/embed/${videoId}?autoplay=0&controls=0&enablejsapi=1`;
            description.textContent = group.videos[index].description;
        }

        function prevVideo() {
            let newIndex = group.currentIndex - 1;
            if (newIndex < 0) newIndex = group.videos.length - 1;
            loadVideo(newIndex);
        }

        function nextVideo() {
            let newIndex = group.currentIndex + 1;
            if (newIndex >= group.videos.length) newIndex = 0;
            loadVideo(newIndex);
        }

        prevBtn.addEventListener('click', prevVideo);
        nextBtn.addEventListener('click', nextVideo);

        // Inicializa o primeiro vídeo
        loadVideo(0);

        // Configura o player quando a API estiver pronta
        window.onYouTubeIframeAPIReady = function() {
            group.player = new YT.Player(videoFrame, {
                events: {
                    'onStateChange': function(event) {
                        if (event.data === YT.PlayerState.ENDED) {
                            nextVideo();
                        }
                    }
                }
            });
        };

        // Controle de visibilidade
        new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (group.player) {
                    if (entry.isIntersecting) {
                        group.player.playVideo();
                    } else {
                        group.player.pauseVideo();
                    }
                }
            });
        }, { threshold: 0.5 }).observe(container);
    });

    // Carrega a API do YouTube (apenas uma vez)
    if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    // 🔹 Responsividade
    function handleResponsiveChanges() {
        const logo = document.querySelector('.logo img');
        if (window.innerWidth < 768) {
            logo.style.height = '60px';
        } else {
            logo.style.height = '120px';
        }
    }

    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            handleResponsiveChanges();
            checkVisibility();
        }, 250);
    });

    handleResponsiveChanges();
});

document.addEventListener("DOMContentLoaded", function() {
    // Configuração dos players de vídeo (mantenha todo o código existente)
    // ...
    
    // Controle do botão Veja Mais
    const vejaMaisBtn = document.getElementById('vejaMaisBtn');
    const conteudoExtra = document.getElementById('conteudoExtra');
    
    if(vejaMaisBtn && conteudoExtra) {
        vejaMaisBtn.addEventListener('click', function() {
            // Mostra apenas a segunda seção de vídeos
            conteudoExtra.style.display = 'block';
            conteudoExtra.style.opacity = '0';
            
            // Animação de aparecimento
            setTimeout(() => {
                conteudoExtra.style.transition = 'opacity 0.5s ease';
                conteudoExtra.style.opacity = '1';
            }, 10);
            
            // Esconde o botão
            this.style.transition = 'opacity 0.3s ease';
            this.style.opacity = '0';
            
            // Remove o botão após a animação
            setTimeout(() => {
                this.style.display = 'none';
                
                // Rola a página até a seção aberta
                conteudoExtra.scrollIntoView({ behavior: 'smooth', block: 'start' });
                
                // Inicializa o player de vídeo da segunda seção
                const secondVideoGroup = videoGroups[2];
                if(secondVideoGroup && secondVideoGroup.videos.length > 0) {
                    const secondVideoFrame = conteudoExtra.querySelector('.video-frame');
                    secondVideoFrame.src = `https://www.youtube.com/embed/${secondVideoGroup.videos[0].id}?autoplay=0&controls=0&enablejsapi=1`;
                }
            }, 300);
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const carrossel = document.querySelector('.carrossel-fila');
    if (!carrossel) return;

    const track = carrossel.querySelector('.carrossel-track');
    const slides = Array.from(carrossel.querySelectorAll('.carrossel-slide'));
    const dotsContainer = carrossel.querySelector('.carrossel-dots');
    
    // Configurações
    const config = {
        slideInterval: 5000,
        scrollSpeed: 600,
        slidesPerView: 1 // Será calculado
    };
    
    let currentIndex = 0;
    let slideWidth = 0;
    let isAnimating = false;
    let slideTimeout;
    let resizeTimeout;

    // Inicialização
    function initCarrossel() {
        calculateSlidesPerView();
        createDots();
        setupEventListeners();
        startAutoScroll();
        updateCarrossel();
    }

    // Calcula quantos slides cabem na tela
    function calculateSlidesPerView() {
        if (slides.length === 0) return;
        
        const slide = slides[0];
        const containerWidth = carrossel.offsetWidth;
        
        slideWidth = slide.offsetWidth + 20; // Inclui o gap
        
        config.slidesPerView = Math.floor(containerWidth / slideWidth);
        config.slidesPerView = Math.max(1, config.slidesPerView);
    }

    // Atualiza a posição do carrossel
    function updateCarrossel() {
        const maxIndex = Math.max(0, slides.length - config.slidesPerView);
        currentIndex = Math.min(currentIndex, maxIndex);
        
        track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
        updateDots();
    }

    // Cria os dots de navegação
    function createDots() {
        if (!dotsContainer) return;
        
        dotsContainer.innerHTML = '';
        const dotCount = Math.ceil(slides.length / config.slidesPerView);
        
        for (let i = 0; i < dotCount; i++) {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
    }

    // Atualiza os dots ativos
    function updateDots() {
        if (!dotsContainer) return;
        
        const dots = dotsContainer.querySelectorAll('.dot');
        const activeDotIndex = Math.floor(currentIndex / config.slidesPerView);
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === activeDotIndex);
        });
    }

    // Navegação para o próximo grupo de slides
    function nextSlide() {
        const maxIndex = Math.max(0, slides.length - config.slidesPerView);
        
        if (currentIndex < maxIndex) {
            currentIndex += config.slidesPerView;
        } else {
            currentIndex = 0;
        }
        
        animateCarrossel();
    }

    // Vai para um slide específico
    function goToSlide(index) {
        currentIndex = index * config.slidesPerView;
        animateCarrossel();
        resetAutoScroll();
    }

    // Animação do carrossel
    function animateCarrossel() {
        isAnimating = true;
        track.style.transition = `transform ${config.scrollSpeed}ms ease`;
        updateCarrossel();
        
        setTimeout(() => {
            isAnimating = false;
        }, config.scrollSpeed);
    }

    // Controle do auto-scroll
    function startAutoScroll() {
        resetAutoScroll();
    }

    function resetAutoScroll() {
        clearTimeout(slideTimeout);
        slideTimeout = setTimeout(() => {
            nextSlide();
            resetAutoScroll();
        }, config.slideInterval);
    }

    function pauseAutoScroll() {
        clearTimeout(slideTimeout);
    }

    // Event listeners
    function setupEventListeners() {
        // Pausa no hover
        carrossel.addEventListener('mouseenter', pauseAutoScroll);
        carrossel.addEventListener('mouseleave', resetAutoScroll);

        // Redimensionamento
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                calculateSlidesPerView();
                createDots();
                updateCarrossel();
            }, 200);
        });

        // Toque para dispositivos móveis
        let touchStartX = 0;
        let touchEndX = 0;

        track.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            pauseAutoScroll();
        }, {passive: true});

        track.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
            resetAutoScroll();
        }, {passive: true});

        function handleSwipe() {
            const threshold = 50;
            if (touchStartX - touchEndX > threshold) {
                nextSlide();
            }
        }
    }

    // Inicializa o carrossel
    initCarrossel();
});