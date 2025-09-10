// Fichero: src/js/auth.js

document.addEventListener('DOMContentLoaded', function () {
    // Busca en el almacenamiento del navegador si hay un usuario con sesión iniciada
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    // Busca los elementos del menú que vamos a modificar
    const welcomeMessage = document.getElementById('welcome-message');
    const sessionLink = document.getElementById('session-link');

    // Verifica si estamos en la página de login o registro para evitar redirecciones infinitas
    const isAuthPage = window.location.pathname.endsWith('login.html') || window.location.pathname.endsWith('registro.html');

    if (currentUser) {
        // --- SI HAY UNA SESIÓN ACTIVA ---

        // 1. Muestra el mensaje de bienvenida con el nombre del usuario
        if (welcomeMessage) {
            welcomeMessage.textContent = `Hola, ${currentUser.name}`;
            welcomeMessage.classList.remove('hidden'); // Hace visible el texto
        }

        // 2. Transforma el botón a "Cerrar Sesión"
        if (sessionLink) {
            sessionLink.textContent = 'Cerrar Sesión';
            sessionLink.href = '#'; // Quita el enlace para que no redirija a ningún lado

            // 3. Añade la lógica para cerrar la sesión al hacer clic
            sessionLink.addEventListener('click', function (event) {
                event.preventDefault(); // Previene la acción por defecto del enlace
                
                // Limpia el almacenamiento
                localStorage.removeItem('currentUser');
                
                // Avisa al usuario y lo redirige al login
                alert("Has cerrado la sesión.");
                window.location.href = 'login.html';
            });
        }
    } else {
        // --- SI NO HAY UNA SESIÓN ACTIVA ---

        // Si el usuario intenta entrar a una página protegida, lo redirigimos al login
        if (!isAuthPage) {
            window.location.href = 'login.html';
        }
    }
});