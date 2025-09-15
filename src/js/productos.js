document.addEventListener('DOMContentLoaded', () => {
    const productListContainer = document.getElementById('product-list');
    const modal = document.getElementById('productModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalPrice = document.getElementById('modalPrice');
    const modalAddToCartBtn = document.getElementById('modalAddToCartBtn');

    if (!productListContainer) return;

    const products = JSON.parse(localStorage.getItem('products')) || [];

    const renderProducts = () => {
        if (products.length > 0) {
            productListContainer.innerHTML = '';
            products.forEach(product => {
                const productCard = `
                    <div class="product-card group bg-neutral-800 rounded-lg shadow-lg overflow-hidden flex flex-col transform hover:scale-105 transition-all duration-300 ease-in-out"
                         data-id="${product.id}">
                        <div class="overflow-hidden">
                            <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300">
                        </div>
                        <div class="p-4 flex flex-col flex-grow">
                            <h3 class="text-xl font-bold text-white">${product.name}</h3>
                            <p class="text-neutral-400 mt-2 flex-grow text-sm">${product.description.substring(0, 80)}...</p>
                            <div class="flex items-center justify-between mt-4">
                                <span class="text-2xl font-bold text-orange-standard">$${product.price.toLocaleString('es-CL')}</span>
                                <button class="ver-detalle-btn bg-orange-standard hover:bg-orange-dark text-white font-medium px-4 py-2 rounded transition-colors text-sm">Ver detalles</button>
                            </div>
                        </div>
                    </div>
                `;
                productListContainer.innerHTML += productCard;
            });
        } else {
            productListContainer.innerHTML = '<p class="text-white text-center col-span-full">No hay productos disponibles. El administrador debe añadirlos primero.</p>';
        }
    };

    const openModal = (productId) => {
        const product = products.find(p => p.id == productId);
        if (!product) return;

        modalImage.src = product.image;
        modalImage.alt = `Imagen de ${product.name}`;
        modalTitle.textContent = product.name;
        modalDescription.textContent = product.description;
        modalPrice.textContent = `$${product.price.toLocaleString('es-CL')}`;
        modalAddToCartBtn.dataset.productId = product.id;
        modal.classList.remove('hidden');
    };

    const closeModal = () => {
        modal.classList.add('hidden');
    };

    productListContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('ver-detalle-btn')) {
            const card = e.target.closest('.product-card');
            const productId = card.dataset.id;
            openModal(productId);
        }
    });

    modalAddToCartBtn.addEventListener('click', () => {
        const productId = modalAddToCartBtn.dataset.productId;
        const product = products.find(p => p.id == productId);

        if (product) {
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            const existingProduct = cart.find(item => item.id == productId);

            if (existingProduct) {
                existingProduct.quantity = (existingProduct.quantity || 1) + 1;
            } else {
                cart.push({ ...product, quantity: 1 });
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            swal("¡Éxito!", `${product.name} ha sido añadido al carrito.`, "success");
            closeModal();
        }
    });

    closeModalBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    renderProducts();
});
