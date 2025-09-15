document.addEventListener('DOMContentLoaded', () => {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if (!currentUser || currentUser.role !== 'admin') {
        window.location.href = 'login.html';
        return;
    }

    const productForm = document.getElementById('product-form');
    const formTitle = document.getElementById('form-title');
    const productIdInput = document.getElementById('product-id');
    const productNameInput = document.getElementById('product-name');
    const productPriceInput = document.getElementById('product-price');
    const productImageInput = document.getElementById('product-image');
    const productDescriptionInput = document.getElementById('product-description');
    const productTableBody = document.getElementById('product-table-body');
    const cancelEditButton = document.getElementById('cancel-edit');
    const logoutButton = document.getElementById('logoutButton');

    let products = JSON.parse(localStorage.getItem('products')) || [];

    const formatPrice = (value) => {
        if (!value) return '';
        const number = parseInt(value.toString().replace(/[^0-9]/g, ''), 10);
        return isNaN(number) ? '' : `$${number.toLocaleString('es-CL')}`;
    };

    productPriceInput.addEventListener('input', (e) => {
        e.target.value = formatPrice(e.target.value);
    });

    const renderProducts = () => {
        productTableBody.innerHTML = '';
        products.forEach(product => {
            const row = `
                <tr class="border-b border-neutral-700">
                    <td class="py-2 px-4"><img src="${product.image}" alt="${product.name}" class="h-12 w-12 object-cover rounded"></td>
                    <td class="py-2 px-4">${product.name}</td>
                    <td class="py-2 px-4">${formatPrice(product.price)}</td>
                    <td class="py-2 px-4 flex space-x-2">
                        <button class="edit-btn bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded" data-id="${product.id}">Editar</button>
                        <button class="delete-btn bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded" data-id="${product.id}">Eliminar</button>
                    </td>
                </tr>
            `;
            productTableBody.innerHTML += row;
        });
    };

    productForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = productIdInput.value;
        const name = productNameInput.value;
        const price = parseInt(productPriceInput.value.replace(/[^0-9]/g, ''), 10);
        const image = productImageInput.value;
        const description = productDescriptionInput.value;

        if (id) {
            const productIndex = products.findIndex(p => p.id == id);
            if (productIndex > -1) {
                products[productIndex] = { ...products[productIndex], name, price, image, description };
                swal("¡Éxito!", "Producto actualizado.", "success");
            }
        } else {
            const newProduct = { id: Date.now(), name, price, image, description };
            products.push(newProduct);
            swal("¡Éxito!", "Producto añadido.", "success");
        }

        localStorage.setItem('products', JSON.stringify(products));
        renderProducts();
        resetForm();
    });

    productTableBody.addEventListener('click', (e) => {
        const id = e.target.dataset.id;
        if (!id) return;
        if (e.target.classList.contains('edit-btn')) {
            const productToEdit = products.find(p => p.id == id);
            if (productToEdit) {
                formTitle.textContent = 'Editar Producto';
                productIdInput.value = productToEdit.id;
                productNameInput.value = productToEdit.name;
                productPriceInput.value = formatPrice(productToEdit.price);
                productImageInput.value = productToEdit.image;
                productDescriptionInput.value = productToEdit.description;
                cancelEditButton.classList.remove('hidden');
                window.scrollTo(0, 0);
            }
        } else if (e.target.classList.contains('delete-btn')) {
            swal({
                title: "¿Estás seguro?", text: "No podrás recuperar este producto.", icon: "warning",
                buttons: true, dangerMode: true,
            }).then((willDelete) => {
                if (willDelete) {
                    products = products.filter(p => p.id != id);
                    localStorage.setItem('products', JSON.stringify(products));
                    renderProducts();
                    swal("Producto eliminado.", { icon: "success" });
                }
            });
        }
    });

    const resetForm = () => {
        productForm.reset();
        productIdInput.value = '';
        formTitle.textContent = 'Añadir Nuevo Producto';
        cancelEditButton.classList.add('hidden');
    };

    cancelEditButton.addEventListener('click', resetForm);
    
    logoutButton.addEventListener('click', () => {
        sessionStorage.removeItem('currentUser');
        window.location.href = 'login.html';
    });

    renderProducts();
});