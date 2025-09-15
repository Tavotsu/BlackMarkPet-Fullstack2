document.addEventListener('DOMContentLoaded', () => {
    console.log("detalles.js: El script ha comenzado a ejecutarse.");

    // --- CÓDIGO PARA LA PÁGINA DE LISTA DE PRODUCTOS ---
    const productListContainer = document.getElementById('product-list');
    if (productListContainer) {
        console.log("detalles.js: Se encontró 'product-list'. Renderizando la lista de productos.");
        const products = JSON.parse(localStorage.getItem('products')) || [];

        if (products.length > 0) {
            products.forEach(product => {
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
    }

    // --- CÓDIGO DE DEPURACIÓN PARA LA PÁGINA DE DETALLES DEL PRODUCTO ---
    const productDetailContainer = document.getElementById('product-detail-container');
    if (productDetailContainer) {
        console.log("detalles.js: Se encontró 'product-detail-container'. Iniciando la renderización de los detalles del producto.");
        
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');
        console.log("detalles.js: ID del producto obtenido de la URL:", productId);

        if (productId) {
            const products = JSON.parse(localStorage.getItem('products')) || [];
            console.log("detalles.js: Productos cargados desde localStorage:", products);

            const product = products.find(p => p.id == productId);
            console.log("detalles.js: Producto encontrado:", product);

            if (product) {
                const productDetail = `
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <img src="${product.image}" alt="${product.name}" class="w-full h-auto rounded-lg shadow-lg">
                        </div>
                        <div>
                            <h1 class="text-3xl font-bold mb-4">${product.name}</h1>
                            <p class="text-neutral-400 mb-4">${product.description}</p>
                            <p class="text-3xl font-bold text-orange-standard mb-6">$${product.price.toLocaleString('es-CL')}</p>
                            <button id="add-to-cart-btn" class="bg-orange-standard text-white font-bold py-2 px-4 rounded hover:bg-orange-dark transition-colors duration-300">
                                Agregar al Carrito
                            </button>
                        </div>
                    </div>
                `;
                productDetailContainer.innerHTML = productDetail;
                console.log("detalles.js: HTML del detalle del producto inyectado en la página.");

                console.log("detalles.js: Añadiendo el event listener al contenedor.");
                productDetailContainer.addEventListener('click', (event) => {
                    console.log("detalles.js: Se ha detectado un clic dentro del contenedor. El elemento clickeado fue:", event.target);
                    
                    if (event.target && event.target.id === 'add-to-cart-btn') {
                        console.log("detalles.js: ¡El clic fue en el botón 'Agregar al Carrito'!");
                        
                        let cart = JSON.parse(localStorage.getItem('cart')) || [];
                        const existingProduct = cart.find(item => item.id === product.id);
                        if (existingProduct) {
                            existingProduct.quantity++;
                        } else {
                            cart.push({ ...product, quantity: 1 });
                        }
                        localStorage.setItem('cart', JSON.stringify(cart));
                        console.log("detalles.js: Carrito actualizado en localStorage:", cart);
                        
                        swal("¡Éxito!", "Producto agregado al carrito.", "success");
                    }
                });

            } else {
                productDetailContainer.innerHTML = '<p class="text-white text-center">Producto no encontrado.</p>';
                console.error("detalles.js: Error - No se encontró ningún producto con el ID:", productId);
            }
        } else {
            productDetailContainer.innerHTML = '<p class="text-white text-center">No se ha especificado un producto.</p>';
            console.error("detalles.js: Error - No se encontró ningún ID de producto en la URL.");
        }
    }
});