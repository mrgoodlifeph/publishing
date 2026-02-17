// Checkout Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    const cart = getCart();
    
    if (cart.length === 0) {
        window.location.href = 'shop.html';
        return;
    }

    displayCheckoutItems();
    updateCheckoutSummary();

    const checkoutForm = document.getElementById('checkoutForm');
    checkoutForm.addEventListener('submit', handleCheckout);
});

function displayCheckoutItems() {
    const cart = getCart();
    const checkoutItems = document.getElementById('checkoutItems');

    checkoutItems.innerHTML = cart.map(item => `
        <div class="checkout-item">
            <img src="${item.image}" alt="${item.title}">
            <div class="checkout-item-info">
                <h4>${item.title}</h4>
                <p>Qty: ${item.quantity} × ₱${item.price.toFixed(2)}</p>
            </div>
            <span class="checkout-item-total">₱${(item.price * item.quantity).toFixed(2)}</span>
        </div>
    `).join('');
}

function updateCheckoutSummary() {
    const cart = getCart();
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = 100;
    const total = subtotal + shipping;

    document.getElementById('checkoutSubtotal').textContent = `₱${subtotal.toFixed(2)}`;
    document.getElementById('checkoutShipping').textContent = `₱${shipping.toFixed(2)}`;
    document.getElementById('checkoutTotal').textContent = `₱${total.toFixed(2)}`;
}

function handleCheckout(e) {
    e.preventDefault();

    const cart = getCart();
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = 100;
    const total = subtotal + shipping;

    const formData = new FormData(e.target);
    const orderData = {
        customer: {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            address: formData.get('address'),
            city: formData.get('city'),
            province: formData.get('province'),
            zipcode: formData.get('zipcode'),
            notes: formData.get('notes')
        },
        paymentMethod: formData.get('payment'),
        items: cart,
        orderDate: new Date().toISOString(),
        orderNumber: generateOrderNumber(),
        subtotal: subtotal,
        shipping: shipping,
        total: total
    };

    // Store order in localStorage (in real app, send to backend)
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push(orderData);
    localStorage.setItem('orders', JSON.stringify(orders));

    // Record sale for tracking and royalties
    recordSale(orderData);

    // Clear cart
    localStorage.setItem('cart', JSON.stringify([]));
    updateCartCount();

    // Redirect to order confirmation
    window.location.href = `order-confirmation.html?order=${orderData.orderNumber}`;
}

function generateOrderNumber() {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `MRG${timestamp}${random}`.substring(0, 16);
}
