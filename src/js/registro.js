document.addEventListener('DOMContentLoaded', function () {
    // --- Crear cuenta de administrador si no existe ---
    function createAdminAccount() {
        let users = JSON.parse(localStorage.getItem('users')) || [];
        const adminExists = users.some(user => user.email === 'admin@blackmarkpet.cl');

        if (!adminExists) {
            const adminUser = {
                name: 'Super Admin',
                email: 'admin@blackmarkpet.cl',
                password: 'Admin2025*', // Nueva contraseña
                role: 'admin'
            };
            users.push(adminUser);
            localStorage.setItem('users', JSON.stringify(users));
            console.log('Cuenta de administrador NUEVA creada.');
        }
    }
    
    // --- Añadir productos de ejemplo si no existen ---
    function addSampleProducts() {
        let products = JSON.parse(localStorage.getItem('products')) || [];
        if (products.length === 0) {
            products = [
                { id: 1678886400001, name: "Pelota de Goma Resistente", price: 7990, image: "https://arenaparamascotas.cl/wp-content/uploads/2024/01/pelota-sonido-perros-800x800.webp", description: "Juguete duradero para perros, ideal para morder y jugar a buscar." },
                { id: 1678886400002, name: "Alimento Seco Premium 15kg", price: 29990, image: "https://media.falabella.com/sodimacCL/186971X_01/w=800,h=800,fit=pad", description: "Nutrición completa para perros adultos de todas las razas." },
                { id: 1678886400003, name: "Arena Sanitaria para Gatos", price: 12490, image: "https://petvet.cl/cdn/shop/files/arena-sanitaria-para-gato-traper-784591.jpg?v=1714233684", description: "Arena aglomerante con control de olores para la higiene de tu gato." },
                { id: 1678886400004, name: "Rascador de Cartón", price: 9990, image: "https://m.media-amazon.com/images/I/71On4tqmzkL.jpg", description: "Rascador para gatos que ayuda a mantener sus uñas sanas y a proteger tus muebles." },
                { id: 1678886400005, name: "Collar Reflectante Ajustable", price: 5990, image: "https://http2.mlstatic.com/D_Q_NP_2X_846994-CBT82409776456_022025-T-collar-de-perro-reflectante-con-hebilla-ajustable-de-segurid.webp", description: "Collar de nylon con bandas reflectantes para paseos nocturnos seguros." },
            ];
            localStorage.setItem('products', JSON.stringify(products));
            console.log('Productos de ejemplo añadidos.');
        }
    }

    createAdminAccount();
    addSampleProducts();

    const registerForm = document.getElementById('registerForm');
    if (!registerForm) return;

    registerForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (name.trim().length === 0) {
            swal("Error de validación", "El nombre es requerido.", "error");
            return;
        }

        const emailRegex = /@(duocuc\.cl|profesor\.duoc\.cl)$/;
        if (!emailRegex.test(email)) {
            swal("Error de validación", "Por favor, utiliza un correo con dominio @duocuc.cl o @profesor.duoc.cl.", "error");
            return;
        }
        
        const passwordRegex = /^(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
        if (!passwordRegex.test(password)) {
            swal("Error de validación", "La contraseña debe tener al menos 8 caracteres y contener al menos un carácter especial.", "error");
            return;
        }

        let users = JSON.parse(localStorage.getItem('users')) || [];
        const userExists = users.some(user => user.email === email);

        if (userExists) {
            swal("Error", "Este correo electrónico ya está registrado.", "error");
            return;
        }

        const newUser = { name, email, password, role: 'user' };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        swal("¡Registro exitoso!", "Tu cuenta ha sido creada correctamente.", "success")
            .then(() => {
                window.location.href = 'login.html';
            });
    });
});