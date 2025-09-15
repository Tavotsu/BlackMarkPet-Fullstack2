document.addEventListener('DOMContentLoaded', () => {
    const productListContainer = document.getElementById('product-list');
    
    if (!productListContainer) return;

    const products = JSON.parse(localStorage.getItem('products')) || [];

    if (products.length > 0) {
        products.forEach(product => {
            // Cada tarjeta de producto es un enlace a la página de detalle
            const productCard = `
                <a href="detalle-producto.html?id=${product.id}" class="group bg-neutral-800 rounded-lg shadow-lg overflow-hidden flex flex-col hover:scale-105 transition-transform duration-300">
                    <div class="overflow-hidden">
                        <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300">
                    </div>
                    <div class="p-4 flex flex-col flex-grow">
                        <h3 class="text-xl font-bold text-white">${product.name}</h3>
                        <p class="text-neutral-400 mt-2 flex-grow text-sm">${product.description}</p>
                        <div class="flex items-center justify-end mt-4">
                            <span class="text-2xl font-bold text-orange-standard">$${product.price.toLocaleString('es-CL')}</span>
                        </div>
                    </div>
                </a>
            `;
            productListContainer.innerHTML += productCard;
        });
    } else {
        productListContainer.innerHTML = '<p class="text-white text-center col-span-full">No hay productos disponibles. El administrador debe añadirlos primero.</p>';
    }
});