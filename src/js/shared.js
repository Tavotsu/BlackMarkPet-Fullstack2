document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
});

function addToCart(productId) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const productToAdd = products.find(p => p.id === productId);

    if (!productToAdd) {
        console.error("El producto no fue encontrado.");
        return;
    }

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProduct = cart.find(item => item.id === productId);

    if (existingProduct) {
        existingProduct.cantidad++;
    } else {
        cart.push({ ...productToAdd, cantidad: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCounter = document.getElementById('cart-item-count');
    const totalItems = cart.reduce((sum, item) => sum + item.cantidad, 0);

    if (cartCounter) {
        if (totalItems > 0) {
            cartCounter.textContent = totalItems;
            cartCounter.classList.remove('hidden');
        } else {
            cartCounter.classList.add('hidden');
        }
    }
}
