document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalContainer = document.getElementById('cart-total');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const renderCart = () => {
        cartItemsContainer.innerHTML = ''; // Limpia el carrito para evitar duplicados
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = `
                <tr>
                    <td colspan="5" class="text-center py-10">
                        <p class="text-xl text-neutral-400">Tu carrito está vacío.</p>
                        <a href="productos.html" class="mt-4 inline-block bg-orange-standard hover:bg-orange-dark text-white font-bold py-2 px-4 rounded transition-colors">
                            Ver productos
                        </a>
                    </td>
                </tr>
            `;
            cartTotalContainer.textContent = '$0';
            return;
        }

        let total = 0;
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;

            const cartItemHTML = `
                <tr class="border-b border-neutral-700">
                    <td class="py-4 px-2">
                        <div class="flex items-center space-x-4">
                            <img src="${item.image}" alt="${item.name}" class="w-24 h-24 object-cover rounded-md">
                            <div>
                                <p class="font-bold text-white">${item.name}</p>
                            </div>
                        </div>
                    </td>
                    <td class="py-4 px-2 text-center text-neutral-300">$${item.price.toLocaleString('es-CL')}</td>
                    <td class="py-4 px-2">
                        <div class="flex items-center justify-center space-x-3">
                            <button class="quantity-change bg-neutral-700 w-8 h-8 rounded hover:bg-neutral-600 text-white" data-id="${item.id}" data-change="-1">-</button>
                            <span class="text-white">${item.quantity}</span>
                            <button class="quantity-change bg-neutral-700 w-8 h-8 rounded hover:bg-neutral-600 text-white" data-id="${item.id}" data-change="1">+</button>
                        </div>
                    </td>
                    <td class="py-4 px-2 text-center text-white font-semibold">$${itemTotal.toLocaleString('es-CL')}</td>
                    <td class="py-4 px-2 text-center">
                        <button class="remove-item text-red-500 hover:text-red-400" data-id="${item.id}">Eliminar</button>
                    </td>
                </tr>
            `;
            cartItemsContainer.innerHTML += cartItemHTML;
        });

        cartTotalContainer.textContent = `$${total.toLocaleString('es-CL')}`;
    };

    const updateCart = () => {
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
        if (typeof updateCartCounter === 'function') {
            updateCartCounter();
        }
    };

    cartItemsContainer.addEventListener('click', (e) => {
        const target = e.target;
        if (!target.dataset.id) return; // Si no hay data-id, no hacer nada

        const productId = parseInt(target.dataset.id);

        if (target.classList.contains('quantity-change')) {
            const change = parseInt(target.dataset.change);
            const item = cart.find(p => p.id === productId);

            if (item) {
                item.quantity += change;
                if (item.quantity <= 0) {
                    cart = cart.filter(p => p.id !== productId);
                }
            }
            updateCart();
        }

        if (target.classList.contains('remove-item')) {
            cart = cart.filter(p => p.id !== productId);
            updateCart();
        }
    });

    renderCart();
});