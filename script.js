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

    function nextSlide() {
        slides.forEach((slide, index) => {
            slide.style.opacity = index === slideIndex ? "1" : "0";
        });

        slideIndex = (slideIndex + 1) % slides.length;
    }

    setInterval(nextSlide, 5000); // Muda a imagem a cada 5 segundos

    // Iniciar com a primeira imagem visível
    nextSlide();
});
