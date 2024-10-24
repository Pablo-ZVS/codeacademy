document.addEventListener('DOMContentLoaded', function() {
    // Cargar datos guardados si existen
    loadSavedData();
    
    const codigoPaisInput = document.getElementById('codigo-pais');
    const countryDisplay = document.getElementById('country-display');
    const countryFlag = document.getElementById('country-flag');
    const countryName = document.getElementById('country-name');
    const avatarInput = document.getElementById('avatar-input');
    const avatarPreview = document.getElementById('avatar-image');
    const uploadButton = document.getElementById('upload-button');
    const form = document.querySelector('form');

    // Objeto para mapear códigos de país
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

    // Manejar la selección de código de país
    codigoPaisInput.addEventListener('input', function() {
        const countryCode = this.value;
        if (countryCodes[countryCode]) {
            const country = countryCodes[countryCode];
            countryFlag.src = `https://flagcdn.com/24x18/${country.flag}.png`;
            countryName.textContent = country.name;
            countryDisplay.style.display = 'flex';
        } else {
            countryDisplay.style.display = 'none';
        }
    });

    // Manejar la carga de avatar
    uploadButton.addEventListener('click', () => avatarInput.click());

    avatarInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                avatarPreview.src = event.target.result;
                // Guardar la imagen en localStorage
                localStorage.setItem('userAvatar', event.target.result);
            };
            reader.readAsDataURL(file);
        }
    });

    // Manejar el envío del formulario
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Recopilar datos del formulario
        const userData = {
            nombres: document.getElementById('nombres').value,
            apellidos: document.getElementById('apellidos').value,
            usuario: document.getElementById('usuario').value,
            email: document.getElementById('email').value,
            telefono: {
                codigo: document.getElementById('codigo-pais').value,
                numero: document.getElementById('telefono').value
            },
            bio: document.getElementById('bio').value,
            genero: document.getElementById('genero').value,
            privacidad: {
                perfilPublico: document.getElementById('perfil-publico').checked,
                mostrarNombre: document.getElementById('mostrar-nombre').checked,
                mostrarPais: document.getElementById('mostrar-pais').checked
            }
        };
        
        // Guardar datos en localStorage
        localStorage.setItem('userData', JSON.stringify(userData));
        
        // Redireccionar a la página de inicio
        window.location.href = '../../sesionactiva/inicio/inicio.html';
    });
});

// Función para cargar datos guardados
function loadSavedData() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const savedAvatar = localStorage.getItem('userAvatar');
    
    if (userData) {
        document.getElementById('nombres').value = userData.nombres || '';
        document.getElementById('apellidos').value = userData.apellidos || '';
        document.getElementById('usuario').value = userData.usuario || '';
        document.getElementById('email').value = userData.email || '';
        document.getElementById('codigo-pais').value = userData.telefono?.codigo || '';
        document.getElementById('telefono').value = userData.telefono?.numero || '';
        document.getElementById('bio').value = userData.bio || '';
        document.getElementById('genero').value = userData.genero || '';
        document.getElementById('perfil-publico').checked = userData.privacidad?.perfilPublico || false;
        document.getElementById('mostrar-nombre').checked = userData.privacidad?.mostrarNombre || false;
        document.getElementById('mostrar-pais').checked = userData.privacidad?.mostrarPais || false;
    }
    
    if (savedAvatar) {
        document.getElementById('avatar-image').src = savedAvatar;
    }
}