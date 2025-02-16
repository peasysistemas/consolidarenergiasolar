document.addEventListener("DOMContentLoaded", function () {
    // Alternar a classe para reduzir o cabeçalho ao rolar
    window.addEventListener("scroll", function () {
        let header = document.getElementById("header");
        if (window.scrollY > 50) {
            header.classList.add("header-small");
        } else {
            header.classList.remove("header-small");
        }
    });

    // Alternar visibilidade do menu no mobile com animação
    const menuToggle = document.getElementById("menu-toggle");
    const menu = document.getElementById("menu");

    menuToggle.addEventListener("click", function () {
        menu.classList.toggle("menu-open");
    });
});

document.addEventListener("DOMContentLoaded", function () {
    let slideIndex = 0;
    const slides = document.querySelector(".slides");
    const totalSlides = document.querySelectorAll(".slide").length;

    function nextSlide() {
        slideIndex = (slideIndex + 1) % totalSlides;
        slides.style.transform = `translateX(-${slideIndex * 100}%)`;
    }

    setInterval(nextSlide, 5000); // Muda a imagem a cada 5 segundos
});

