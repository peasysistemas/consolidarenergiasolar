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

    // 🔹 Slider automático com efeito de transição suave
    let slideIndex = 0;
    const slides = document.querySelectorAll(".slide");
    let sliderInterval;

    function nextSlide() {
        slides.forEach((slide, index) => {
            slide.style.opacity = index === slideIndex ? "1" : "0";
        });

        slideIndex = (slideIndex + 1) % slides.length;
    }

    function startSlider() {
        sliderInterval = setInterval(nextSlide, 5000); // Muda a imagem a cada 5 segundos
    }

    function stopSlider() {
        clearInterval(sliderInterval);
    }

    // 🔹 Verifica se o usuário está na seção "Sobre"
    function checkVisibility() {
        const section = document.querySelector("#sobre");
        const rect = section.getBoundingClientRect();
        if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
            startSlider();
        } else {
            stopSlider();
        }
    }

    window.addEventListener("scroll", checkVisibility);
    window.addEventListener("resize", checkVisibility);

    // 🔹 Iniciar apenas quando visível
    checkVisibility();
});
