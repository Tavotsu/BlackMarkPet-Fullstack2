document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const users = JSON.parse(localStorage.getItem('users')) || [];

    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        // Guardamos el usuario actual en sessionStorage para saber quién está conectado
        sessionStorage.setItem('currentUser', JSON.stringify(user));

        swal("¡Éxito!", "Has iniciado sesión correctamente.", "success")
            .then(() => {
                // --- NUEVO: Redirección basada en el rol ---
                if (user.role === 'admin') {
                    window.location.href = 'admin.html'; // Redirigir al panel de admin
                } else {
                    window.location.href = 'index.html'; // Redirigir a la página principal
                }
            });
    } else {
        swal("Error", "Correo electrónico o contraseña incorrectos.", "error");
    }
});