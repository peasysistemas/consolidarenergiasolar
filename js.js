const carouselImages = document.querySelector('.carousel-images');
const totalImages = carouselImages.children.length;
let currentIndex = 0;

// Função para avançar o carrossel
function showNextImage() {
  currentIndex++;
  if (currentIndex >= totalImages) {
    currentIndex = 0; // Voltar para a primeira imagem
  }
  const translateX = -currentIndex * 100; // Move 100% para cada imagem
  carouselImages.style.transform = `translateX(${translateX}%)`;
}

// Alterne as imagens a cada 3 segundos
setInterval(showNextImage, 3000);
