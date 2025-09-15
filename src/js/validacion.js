document.addEventListener('DOMContentLoaded', () => {
    const guestView = document.getElementById('guest-view');
    const userView = document.getElementById('user-view');
    const welcomeMessage = document.getElementById('welcome-message');
    const logoutButton = document.getElementById('logout-button');
    
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));

    if (currentUser) {
        if (guestView) guestView.classList.add('hidden');
        if (userView) userView.classList.remove('hidden');
        
        if (welcomeMessage) {
            welcomeMessage.textContent = `Hola, ${currentUser.name}`;
        }
        
        if (logoutButton) {
            logoutButton.addEventListener('click', () => {
                sessionStorage.removeItem('currentUser');
                window.location.href = 'index.html';
            });
        }
    } else {
        if (guestView) guestView.classList.remove('hidden');
        if (userView) userView.classList.add('hidden');
    }
});