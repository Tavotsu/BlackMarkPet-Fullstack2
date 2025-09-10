document.addEventListener('DOMContentLoaded', function () {
    const registerForm = document.getElementById('registerForm');

    registerForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const users = JSON.parse(localStorage.getItem('users')) || [];

        // Verificar si el correo ya existe
        const userExists = users.some(user => user.email === email);

        if (userExists) {
            swal("Error", "Este correo electrónico ya está registrado.", "error");
        } else {
            // Agregar nuevo usuario
            const newUser = { name, email, password };
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));

            swal("¡Registro exitoso!", "Tu cuenta ha sido creada.", "success")
                .then(() => {
                    window.location.href = 'login.html';
                });
        }
    });
});