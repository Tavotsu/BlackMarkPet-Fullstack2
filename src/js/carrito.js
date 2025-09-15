document.addEventListener('DOMContentLoaded', () => {
    // Referencias a los elementos correctos del DOM de carrito.html
    const cartContainer = document.getElementById('cart-container');
    const cartSummaryContainer = document.getElementById('cart-summary');
    const emptyCartMessage = document.getElementById('empty-cart-message');

    // Cargar el carrito desde localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const renderCart = () => {
        // Limpiar el contenedor antes de volver a renderizar
        cartContainer.innerHTML = ''; 
        cartSummaryContainer.innerHTML = '';

        if (cart.length === 0) {
            // Si el carrito está vacío, muestra el mensaje y oculta el contenedor principal
            emptyCartMessage.classList.remove('hidden');
            cartContainer.classList.add('hidden');
            cartSummaryContainer.classList.add('hidden');
            return;
        }

        // Si hay productos, asegúrate de que el mensaje de vacío esté oculto
        emptyCartMessage.classList.add('hidden');
        cartContainer.classList.remove('hidden');
        cartSummaryContainer.classList.remove('hidden');

        let total = 0;

        // Renderizar cada producto en el carrito
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;

            const cartItemHTML = `
                <div class="cart-item flex items-center justify-between bg-neutral-800 p-4 rounded-lg shadow-md">
                    <div class="flex items-center space-x-4">
                        <img src="${item.image}" alt="${item.name}" class="w-20 h-20 object-cover rounded-md">
                        <div>
                            <p class="font-bold text-white text-lg">${item.name}</p>
                            <p class="text-neutral-400 text-sm">$${item.price.toLocaleString('es-CL')}</p>
                        </div>
                    </div>
                    <div class="flex items-center space-x-4">
                        <div class="flex items-center justify-center space-x-3">
                            <button class="quantity-change bg-neutral-700 w-8 h-8 rounded hover:bg-neutral-600 text-white" data-id="${item.id}" data-change="-1">-</button>
                            <span class="text-white text-lg font-bold">${item.quantity}</span>
                            <button class="quantity-change bg-neutral-700 w-8 h-8 rounded hover:bg-neutral-600 text-white" data-id="${item.id}" data-change="1">+</button>
                        </div>
                        <p class="text-white font-semibold w-24 text-center">$${itemTotal.toLocaleString('es-CL')}</p>
                        <button class="remove-item text-red-500 hover:text-red-400 font-bold" data-id="${item.id}">Eliminar</button>
                    </div>
                </div>
            `;
            cartContainer.innerHTML += cartItemHTML;
        });

        // Renderizar el resumen del carrito
        const summaryHTML = `
            <h2 class="text-2xl font-bold text-white">Total: <span class="text-orange-standard">$${total.toLocaleString('es-CL')}</span></h2>
            <button id="checkout-btn" class="mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded transition duration-300">
                Proceder al Pago
            </button>
        `;
        cartSummaryContainer.innerHTML = summaryHTML;
    };

    // Función para guardar el carrito en localStorage y volver a renderizar
    const updateCart = () => {
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
        // Si tienes un contador en otras páginas, esto lo actualizaría
        if (typeof updateCartCounter === 'function') {
            updateCartCounter();
        }
    };

    // Manejador de eventos para los botones de cantidad y eliminar
    cartContainer.addEventListener('click', (e) => {
        const target = e.target;
        const productId = target.dataset.id;

        if (!productId) return; // Si no hay data-id, no hacer nada

        if (target.classList.contains('quantity-change')) {
            const change = parseInt(target.dataset.change);
            const item = cart.find(p => p.id == productId);

            if (item) {
                item.quantity += change;
                if (item.quantity <= 0) {
                    // Eliminar el producto si la cantidad llega a 0
                    cart = cart.filter(p => p.id != productId);
                }
            }
            updateCart();
        }

        if (target.classList.contains('remove-item')) {
            cart = cart.filter(p => p.id != productId);
            updateCart();
        }
    });

    // Renderizado inicial al cargar la página
    renderCart();
});