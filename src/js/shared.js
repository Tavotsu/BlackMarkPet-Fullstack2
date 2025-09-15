// Esta función se podrá llamar desde cualquier script para actualizar el contador
function updateCartCounter() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCounter = document.getElementById('cart-item-count');

    // Calculamos el total de items sumando las cantidades de cada producto
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    if (cartCounter) {
        if (totalItems > 0) {
            cartCounter.textContent = totalItems;
            cartCounter.classList.remove('hidden'); // Muestra el contador
        } else {
            cartCounter.classList.add('hidden'); // Oculta si no hay items
        }
    }
}

// Ejecutamos la función cada vez que se carga una página para que el contador esté siempre actualizado
document.addEventListener('DOMContentLoaded', () => {
    updateCartCounter();
});