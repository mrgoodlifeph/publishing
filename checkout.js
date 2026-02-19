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

    // Payment method toggle
    const paymentRadios = document.querySelectorAll('input[name="payment"]');
    paymentRadios.forEach(radio => {
        radio.addEventListener('change', togglePaymentInstructions);
    });
    
    // Payment proof upload handlers
    document.getElementById('bankProof').addEventListener('change', handleBankProofUpload);
    document.getElementById('gcashProof').addEventListener('change', handleGcashProofUpload);
    
    // Initialize with first selected option
    togglePaymentInstructions();
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
    
    // Calculate dynamic shipping based on each book's shipping fee
    const booksData = JSON.parse(localStorage.getItem('booksData') || '[]');
    let shipping = 0;
    
    cart.forEach(item => {
        const book = booksData.find(b => b.id === item.id);
        const bookShipping = book && book.shippingFee ? book.shippingFee : 50; // Default to 50 if not set
        shipping += bookShipping * item.quantity;
    });
    
    const total = subtotal + shipping;

    document.getElementById('checkoutSubtotal').textContent = `₱${subtotal.toFixed(2)}`;
    document.getElementById('checkoutShipping').textContent = `₱${shipping.toFixed(2)}`;
    document.getElementById('checkoutTotal').textContent = `₱${total.toFixed(2)}`;
}

function togglePaymentInstructions() {
    const selectedPayment = document.querySelector('input[name="payment"]:checked').value;
    
    // Hide all instructions
    document.getElementById('codInstructions').style.display = 'none';
    document.getElementById('bankInstructions').style.display = 'none';
    document.getElementById('gcashInstructions').style.display = 'none';
    
    // Show selected instructions
    if (selectedPayment === 'cod') {
        document.getElementById('codInstructions').style.display = 'block';
    } else if (selectedPayment === 'bank') {
        document.getElementById('bankInstructions').style.display = 'block';
    } else if (selectedPayment === 'gcash') {
        document.getElementById('gcashInstructions').style.display = 'block';
    }
}

function handleBankProofUpload(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            document.getElementById('bankProofImage').src = event.target.result;
            document.getElementById('bankProofPreview').classList.add('show');
        };
        reader.readAsDataURL(file);
    }
}

function handleGcashProofUpload(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            document.getElementById('gcashProofImage').src = event.target.result;
            document.getElementById('gcashProofPreview').classList.add('show');
        };
        reader.readAsDataURL(file);
    }
}

function handleCheckout(e) {
    e.preventDefault();

    const cart = getCart();
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Calculate dynamic shipping
    const booksData = JSON.parse(localStorage.getItem('booksData') || '[]');
    let shipping = 0;
    
    cart.forEach(item => {
        const book = booksData.find(b => b.id === item.id);
        const bookShipping = book && book.shippingFee ? book.shippingFee : 50;
        shipping += bookShipping * item.quantity;
    });
    
    const total = subtotal + shipping;

    const formData = new FormData(e.target);
    const paymentMethod = formData.get('payment');
    
    // Validate proof of payment for bank and gcash
    if (paymentMethod === 'bank') {
        const bankProofFile = document.getElementById('bankProof').files[0];
        if (!bankProofFile) {
            alert('Please upload proof of payment for bank transfer.');
            return;
        }
    } else if (paymentMethod === 'gcash') {
        const gcashProofFile = document.getElementById('gcashProof').files[0];
        if (!gcashProofFile) {
            alert('Please upload proof of payment for GCash.');
            return;
        }
    }
    
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
        paymentMethod: paymentMethod,
        items: cart,
        orderDate: new Date().toISOString(),
        orderNumber: generateOrderNumber(),
        subtotal: subtotal,
        shipping: shipping,
        total: total,
        status: (paymentMethod === 'cod') ? 'confirmed' : 'pending'
    };
    
    // Add payment proof if provided
    if (paymentMethod === 'bank') {
        orderData.paymentProof = document.getElementById('bankProofImage').src;
    } else if (paymentMethod === 'gcash') {
        orderData.paymentProof = document.getElementById('gcashProofImage').src;
    }

    // Store order in localStorage (in real app, send to backend)
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push(orderData);
    localStorage.setItem('orders', JSON.stringify(orders));

    // Record sale for tracking and royalties only if COD (confirmed immediately)
    if (orderData.status === 'confirmed') {
        recordSale(orderData);
    }

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
