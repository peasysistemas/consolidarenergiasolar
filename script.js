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
});