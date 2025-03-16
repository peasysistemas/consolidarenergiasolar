document.addEventListener("DOMContentLoaded", function () {
    // 🔹 Alternar a classe para reduzir o cabeçalho ao rolar
    window.addEventListener("scroll", function () {
        let header = document.getElementById("header");
        if (window.scrollY > 50) {
            header.classList.add("header-small");
        } else {
            header.classList.remove("header-small");
        }
    });

    // 🔹 Alternar visibilidade do menu no mobile com animação
    const menuToggle = document.getElementById("menu-toggle");
    const menu = document.getElementById("menu");

    menuToggle.addEventListener("click", function () {
        menu.classList.toggle("menu-open");
    });

    // 🔹 Fechar o menu ao clicar em um link
    const menuLinks = document.querySelectorAll(".menu ul li a");
    menuLinks.forEach((link) => {
        link.addEventListener("click", function () {
            menu.classList.remove("menu-open");
        });
    });

    // 🔹 Slider automático com efeito de transição suave
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
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
            startSlider();
        } else {
            stopSlider();
        }
    }

    window.addEventListener("scroll", checkVisibility);
    window.addEventListener("resize", checkVisibility);

    checkVisibility();
    nextSlide();

    // 🔹 Efeito de deslize ao rolar até as seções
    const sections = document.querySelectorAll(".sobre-empresa");

    sections.forEach((section) => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    section.classList.add("visible");
                    observer.unobserve(section); // Para de observar após a animação
                }
            });
        }, { threshold: 0.5 }); // Dispara quando 50% da seção estiver visível

        observer.observe(section);
    });
});

// Captura o formulário pelo ID "contactForm" e adiciona um evento de "submit"
document.getElementById('contactForm').addEventListener('submit', function (event) {
    // Impede o comportamento padrão do formulário (não envia o formulário da forma tradicional)
    event.preventDefault();

    // Captura o valor do campo de nome pelo ID "nome"
    const nome = document.getElementById('nome').value;

    // Captura o valor do campo de email pelo ID "email"
    const email = document.getElementById('email').value;

    // Captura o valor do campo de telefone pelo ID "telefone"
    const telefone = document.getElementById('telefone').value;

    // Cria uma mensagem personalizada com os valores capturados
    const mensagem = `Olá, meu nome é ${nome}. Meu email é ${email} e meu telefone é ${telefone}. Gostaria de mais informações.`;

    // Codifica a mensagem para ser usada em uma URL (substitui espaços e caracteres especiais)
    const mensagemCodificada = encodeURIComponent(mensagem);

    // Define o número de WhatsApp no formato internacional (sem espaços ou hífens)
    const numeroWhatsApp = '5584998227798';

    // Cria o link do WhatsApp com o número e a mensagem codificada
    const linkWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensagemCodificada}`;

    // Abre o link do WhatsApp em uma nova aba ou janela do navegador
    window.open(linkWhatsApp, '_blank');
});

// Aguarda o carregamento completo da página antes de executar o script
document.addEventListener("DOMContentLoaded", function () {
    // Seleciona o iframe onde os vídeos do YouTube serão carregados
    const videoFrame = document.getElementById("video-frame");
    // Seleciona o parágrafo onde a descrição do vídeo será exibida
    const videoDescription = document.getElementById("video-description");

    // Lista de vídeos com seus respectivos IDs e descrições
    const videos = [
        { id: "RNd0YQilsHI", description: "O que muda quando instalamos Energia Solar?" },
        { id: "RP4bME3sVFQ", description: "E as garantias?" },
        { id: "0hjEsDNzzpY", description: "Conforto e Economia é com a Consolida Energia Solar!" },
        { id: "GnPJhLs0gqM", description: "E a taxa mínima da concessionária?" }
    ];

    let currentIndex = 0; // Índice do vídeo atual na lista
    let player; // Variável global para armazenar o player do YouTube

    /**
     * Carrega um vídeo do YouTube com base no índice da lista `videos`
     * @param {number} index - Índice do vídeo a ser carregado
     */
    function loadVideo(index) {
        const videoId = videos[index].id; // Obtém o ID do vídeo
        // Define a URL do vídeo no iframe com autoplay ativado e sem controles do YouTube
        videoFrame.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=0&enablejsapi=1`;
        // Atualiza a descrição do vídeo na interface
        videoDescription.innerText = videos[index].description;
    }

    /**
     * Detecta mudanças no estado do vídeo (por exemplo, se terminou de tocar)
     * @param {object} event - Evento do player do YouTube
     */
    function onPlayerStateChange(event) {
        // Se o vídeo terminou, passa automaticamente para o próximo
        if (event.data === YT.PlayerState.ENDED) {
            nextVideo();
        }
    }

    /**
     * Função chamada automaticamente quando a API do YouTube é carregada
     * Cria um novo player do YouTube e associa a função `onPlayerStateChange`
     */
    function onYouTubeIframeAPIReady() {
        player = new YT.Player('video-frame', {
            events: {
                'onStateChange': onPlayerStateChange // Vincula a função de mudança de estado do vídeo
            }
        });
    }

    /**
     * Retrocede para o vídeo anterior na lista
     */
    function prevVideo() {
        // Atualiza o índice para o vídeo anterior, garantindo que a lista seja circular
        currentIndex = (currentIndex - 1 + videos.length) % videos.length;
        loadVideo(currentIndex); // Carrega o novo vídeo
    }

    /**
     * Avança para o próximo vídeo na lista
     */
    function nextVideo() {
        // Atualiza o índice para o próximo vídeo, garantindo que a lista seja circular
        currentIndex = (currentIndex + 1) % videos.length;
        loadVideo(currentIndex); // Carrega o novo vídeo
    }

    // Torna as funções acessíveis globalmente para serem usadas no HTML
    window.prevVideo = prevVideo;
    window.nextVideo = nextVideo;
    window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;

    /**
     * Usa a API de Intersection Observer para detectar quando o vídeo está visível na tela
     * Se o vídeo estiver visível, ele começa a tocar automaticamente
     * Se sair da tela, ele pausa automaticamente
     */
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Verifica se o player já foi inicializado antes de tentar controlá-lo
            if (player && entry.isIntersecting) {
                player.playVideo(); // Toca o vídeo automaticamente
            } else if (player) {
                player.pauseVideo(); // Pausa o vídeo se não estiver visível
            }
        });
    }, { threshold: 0.5 }); // A condição é que pelo menos 50% do vídeo esteja visível

    // Inicia a observação do container do vídeo
    observer.observe(document.getElementById('video-container'));

    // Carrega o primeiro vídeo ao iniciar a página
    loadVideo(currentIndex);
});
