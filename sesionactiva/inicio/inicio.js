document.addEventListener('DOMContentLoaded', function() {
    // Cargar datos del usuario desde localStorage
    const userData = JSON.parse(localStorage.getItem('userData'));
    const savedAvatar = localStorage.getItem('userAvatar');
    
    if (userData) {
        // Actualizar nombre de usuario en el mensaje de bienvenida
        const welcomeMessage = document.getElementById('welcome-message');
        if (welcomeMessage) {
            welcomeMessage.textContent = `Bienvenido, ${userData.nombres} ${userData.apellidos}`;
        }

        // Actualizar avatar
        const userAvatar = document.getElementById('user-avatar');
        if (userAvatar) {
            if (savedAvatar) {
                userAvatar.innerHTML = `<img src="${savedAvatar}" alt="Avatar de usuario" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">`;
            } else {
                userAvatar.textContent = userData.nombres?.charAt(0) || 'U';
            }
        }

        // Mostrar información del perfil según las opciones de privacidad
        const profileInfo = document.getElementById('profile-info');
        if (profileInfo && userData.privacidad) {
            let profileHtml = '';

            // Si el perfil es público
            if (userData.privacidad.perfilPublico) {
                profileHtml += '<div class="profile-status public">Perfil Público</div>';
            } else {
                profileHtml += '<div class="profile-status private">Perfil Privado</div>';
            }

            // Si decidió mostrar su nombre
            if (userData.privacidad.mostrarNombre) {
                profileHtml += `
                    <div class="profile-detail">
                        <span class="detail-label">Usuario:</span>
                        <span class="detail-value">${userData.usuario}</span>
                    </div>
                    <div class="profile-detail">
                        <span class="detail-label">Nombre:</span>
                        <span class="detail-value">${userData.nombres} ${userData.apellidos}</span>
                    </div>`;
            }

            // Si decidió mostrar su país
            if (userData.privacidad.mostrarPais && userData.telefono?.codigo) {
                const countryCode = getCountryCode(userData.telefono.codigo);
                if (countryCode) {
                    profileHtml += `
                        <div class="profile-detail">
                            <span class="detail-label">País:</span>
                            <span class="detail-value">
                                <img src="https://flagcdn.com/24x18/${countryCode.flag}.png" alt="${countryCode.name}" class="country-flag">
                                ${countryCode.name}
                            </span>
                        </div>`;
                }
            }

            // Mostrar biografía si existe
            if (userData.bio && userData.bio.trim() !== '') {
                profileHtml += `
                    <div class="profile-detail bio-section">
                        <span class="detail-label">Biografía:</span>
                        <span class="detail-value bio-text">${userData.bio}</span>
                    </div>`;
            }

            profileInfo.innerHTML = profileHtml;
        }
    }
});

// Función para obtener información del país según el código
function getCountryCode(code) {
    const countryCodes = {
        '+1': { name: 'Estados Unidos', flag: 'us' },
        '+34': { name: 'España', flag: 'es' },
        '+51': { name: 'Perú', flag: 'pe' },
        '+52': { name: 'México', flag: 'mx' },
        '+54': { name: 'Argentina', flag: 'ar' },
        '+56': { name: 'Chile', flag: 'cl' },
        '+57': { name: 'Colombia', flag: 'co' },
        '+58': { name: 'Venezuela', flag: 've' }
    };
    return countryCodes[code];
}