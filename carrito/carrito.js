
document.addEventListener('DOMContentLoaded', () => {
    // Obtener elementos del DOM
    const cartItems = document.querySelector('.cart-items');
    const subtotalAmount = document.querySelector('.subtotal-amount');
    const taxAmount = document.querySelector('.tax-amount');
    const totalAmount = document.querySelector('.total-amount');
    const paymentOptions = document.querySelectorAll('input[name="payment"]');
    const paymentForms = {
        creditCard: document.getElementById('creditCardForm'),
        yape: document.getElementById('yapeForm'),
        plin: document.getElementById('plinForm')
    };
    const payButton = document.querySelector('.pay-button');

    // Recuperar items del carrito del localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Formatear números a moneda
    const formatCurrency = (amount) => `S/. ${amount.toFixed(2)}`;

    // Calcular y mostrar totales
    const calculateTotals = () => {
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const tax = subtotal * 0.18;
        const total = subtotal + tax;

        subtotalAmount.textContent = formatCurrency(subtotal);
        taxAmount.textContent = formatCurrency(tax);
        totalAmount.textContent = formatCurrency(total);
    };

    // Renderizar items del carrito
    const renderCartItems = () => {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div>
                    <h4>${item.name}</h4>
                    <p>Cantidad: ${item.quantity}</p>
                </div>
                <div>
                    <p>${formatCurrency(item.price * item.quantity)}</p>
                </div>
            </div>
        `).join('');

        calculateTotals();
    };

    // Cambiar formulario según método de pago
    const handlePaymentMethodChange = (event) => {
        const selectedMethod = event.target.id;
        
        // Ocultar todos los formularios
        Object.values(paymentForms).forEach(form => {
            form.style.display = 'none';
        });

        // Mostrar el formulario seleccionado
        switch(selectedMethod) {
            case 'credit-card':
                paymentForms.creditCard.style.display = 'block';
                break;
            case 'yape':
                paymentForms.yape.style.display = 'block';
                break;
            case 'plin':
                paymentForms.plin.style.display = 'block';
                break;
        }
    };

    // Formatear entrada de tarjeta de crédito
    const formatCreditCard = (input) => {
        let value = input.value.replace(/\D/g, '');
        value = value.replace(/(\d{4})/g, '$1 ').trim();
        input.value = value;
    };

    // Formatear fecha de vencimiento
    const formatExpiryDate = (input) => {
        let value = input.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.slice(0,2) + '/' + value.slice(2);
        }
        input.value = value;
    };

    // Event Listeners
    paymentOptions.forEach(option => {
        option.addEventListener('change', handlePaymentMethodChange);
    });

    // Formateo de inputs de tarjeta
    document.querySelector('input[placeholder="1234 5678 9012 3456"]')
        .addEventListener('input', (e) => formatCreditCard(e.target));

    document.querySelector('input[placeholder="MM/YY"]')
        .addEventListener('input', (e) => formatExpiryDate(e.target));

    // Procesar pago
    payButton.addEventListener('click', () => {
        const selectedMethod = document.querySelector('input[name="payment"]:checked').id;
        
        // Mostrar loading
        payButton.disabled = true;
        payButton.textContent = 'Procesando...';

        // Simular proceso de pago
        setTimeout(() => {
            // Limpiar carrito
            localStorage.removeItem('cart');
            
            // Redireccionar a página de éxito
            alert('¡Pago procesado con éxito!');
            window.location.href = 'carrito.html';
        }, 2000);
    });

    // Inicializar
    renderCartItems();
});