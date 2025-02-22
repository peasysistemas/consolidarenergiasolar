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