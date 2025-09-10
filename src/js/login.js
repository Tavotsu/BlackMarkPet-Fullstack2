document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');

    // Inicializar usuarios por defecto si no existen
    if (!localStorage.getItem('users')) {
        const defaultUsers = [
            { email: 'user@example.com', password: 'password', name: 'Usuario de Ejemplo' },
            { email: 'cristobal@example.com', password: 'password123', name: 'Cristobal' },
            { email: 'gustavo@example.com', password: 'securepassword', name: 'Gustavo' }
        ];
        localStorage.setItem('users', JSON.stringify(defaultUsers));
    }

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const users = JSON.parse(localStorage.getItem('users'));
        const foundUser = users.find(user => user.email === email && user.password === password);

        if (foundUser) {
            localStorage.setItem('currentUser', JSON.stringify(foundUser));
            swal("¡Éxito!", "Has iniciado sesión correctamente.", "success")
                .then(() => {
                    window.location.href = 'index.html';
                });
        } else {
            swal("Error", "Correo electrónico o contraseña incorrectos.", "error");
        }
    });
});