function captura(){
    var nombre=document.getElementById('nombre').value;
    console.log(nombre)

    var correo=document.getElementById('correo').value;
    console.log(correo)

    var telefono=document.getElementById('telefono').value;
    console.log(telefono)

    var direccion=document.getElementById('direccion').value;
    console.log(direccion)

}   

var counter =1;

setInterval(function(){
    document.getElementById('radio' + counter ).checked = true;
    counter++;
    if(counter > 4) {
        counter = 1;
    }




}, 1000)

let currentIndex = 0;

function moveCarousel(direction) {
    const carousel = document.querySelector('.carousel');
    const cards = document.querySelectorAll('.scroll');
    const cardWidth = cards[0].offsetWidth + 30; // Ancho de la tarjeta más margen
    const visibleWidth = carousel.parentElement.offsetWidth; // Ancho visible del contenedor
    const totalCards = cards.length;
    const totalCarouselWidth = cardWidth * totalCards; // Ancho total de todas las tarjetas

    // Actualiza el índice de la tarjeta actual
    currentIndex += direction;

    // Calcula el número de tarjetas visibles al mismo tiempo
    const maxVisibleCards = Math.floor(visibleWidth / cardWidth);

    // Restringe el índice para que no vaya fuera del rango
    if (currentIndex < 0) {
        currentIndex = 0;
    }

    // Si se intenta avanzar más allá del último grupo de tarjetas visibles, ajusta el índice
    if (currentIndex > totalCards - maxVisibleCards) {
        currentIndex = totalCards - maxVisibleCards;
    }

    // Asegúrate de que el carrusel no se desplace más allá de su contenido
    if (totalCards * cardWidth < visibleWidth) {
        carousel.style.transform = 'translateX(0)'; // No hay desplazamiento si las tarjetas caben en el contenedor
    } else {
        const maxTranslateX = totalCarouselWidth - visibleWidth; // El desplazamiento máximo sin espacio vacío
        const translateX = Math.min(currentIndex * cardWidth, maxTranslateX); // Limita el desplazamiento
        carousel.style.transform = `translateX(-${translateX}px)`;
    }
}

