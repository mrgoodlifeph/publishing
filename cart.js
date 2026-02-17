// Cart Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    displayCart();
    updateCartSummary();

    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            const cart = getCart();
            if (cart.length > 0) {
                window.location.href = 'checkout.html';
            }
        });
    }
});

function displayCart() {
    const cart = getCart();
    const cartItems = document.getElementById('cartItems');
    const emptyCart = document.getElementById('emptyCart');
    const cartLayout = document.querySelector('.cart-layout');

    if (cart.length === 0) {
        cartLayout.classList.add('hidden');
        emptyCart.classList.remove('hidden');
        return;
    }

    cartLayout.classList.remove('hidden');
    emptyCart.classList.add('hidden');

    cartItems.innerHTML = `
        <div class="cart-header">
            <h2>Your Cart (${cart.reduce((sum, item) => sum + item.quantity, 0)} items)</h2>
        </div>
        ${cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.title}">
                </div>
                <div class="cart-item-info">
                    <h3>${item.title}</h3>
                    <p class="cart-item-price">₱${item.price.toFixed(2)}</p>
                </div>
                <div class="cart-item-quantity">
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span class="qty-display">${item.quantity}</span>
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
                <div class="cart-item-total">
                    <span class="item-total-price">₱${(item.price * item.quantity).toFixed(2)}</span>
                </div>
                <button class="cart-item-remove" onclick="removeFromCart(${item.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('')}
    `;
}

function updateQuantity(productId, change) {
    const cart = getCart();
    const item = cart.find(i => i.id === productId);
    
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
            return;
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCart();
        updateCartSummary();
        updateCartCount();
    }
}

function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
    updateCartSummary();
    updateCartCount();
    showNotification('Item removed from cart');
}

function updateCartSummary() {
    const cart = getCart();
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = cart.length > 0 ? 100 : 0;
    const total = subtotal + shipping;

    const subtotalEl = document.getElementById('subtotal');
    const shippingEl = document.getElementById('shipping');
    const totalEl = document.getElementById('total');

    if (subtotalEl) subtotalEl.textContent = `₱${subtotal.toFixed(2)}`;
    if (shippingEl) shippingEl.textContent = cart.length > 0 ? `₱${shipping.toFixed(2)}` : 'FREE';
    if (totalEl) totalEl.textContent = `₱${total.toFixed(2)}`;
}

function clearCart() {
    localStorage.setItem('cart', JSON.stringify([]));
    displayCart();
    updateCartSummary();
    updateCartCount();
}
