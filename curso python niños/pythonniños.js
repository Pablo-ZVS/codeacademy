document.addEventListener('DOMContentLoaded', function() {
    // Manejo de clicks en los botones de lecciones
    document.querySelectorAll('.button').forEach(button => {
        button.addEventListener('click', function() {
            const lessonCard = this.closest('.lesson-card');
            const lessonTitle = lessonCard.querySelector('h2').textContent;
            const isFree = lessonCard.querySelector('.free-badge') !== null;

            if (isFree) {
                startLesson(lessonTitle);
            } else {
                showPremiumMessage(lessonTitle);
            }
        });
    });

    // Agregar efecto de brillo al hover
    const cards = document.querySelectorAll('.lesson-card, .teacher-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // Función para iniciar una lección
    function startLesson(lessonTitle) {
        alert(`¡Bienvenido a la clase: ${lessonTitle}! 🌟\nPreparando tu lección...`);
        // Aquí puedes agregar la lógica para cargar la lección
    }

    // Función para mostrar mensaje de contenido premium
    function showPremiumMessage(lessonTitle) {
        alert(`La lección "${lessonTitle}" está disponible en la versión completa del curso.\n¡Únete para acceder a todo el contenido! 🚀`);
    }

    // Animación suave al hacer scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});