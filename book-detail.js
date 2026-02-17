// Book Detail Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    
    if (!productId) {
        window.location.href = 'shop.html';
        return;
    }

    const product = getProductById(productId);
    
    if (!product) {
        window.location.href = 'shop.html';
        return;
    }

    displayProductDetail(product);
    displayRelatedProducts(product);
    updateBreadcrumb(product);
});

function updateBreadcrumb(product) {
    const breadcrumbTitle = document.getElementById('breadcrumbTitle');
    if (breadcrumbTitle) {
        breadcrumbTitle.textContent = product.title;
    }
}

function displayProductDetail(product) {
    const productDetail = document.getElementById('productDetail');
    
    productDetail.innerHTML = `
        <div class="product-detail-content">
            <div class="product-detail-image">
                <img src="${product.image}" alt="${product.title}">
            </div>
            <div class="product-detail-info">
                <span class="product-category-badge">${formatCategory(product.category)}</span>
                <h1 class="product-detail-title">${product.title}</h1>
                <p class="product-detail-author">by ${product.author}</p>
                
                <div class="product-detail-price">
                    <span class="price-label">Price:</span>
                    <span class="price-value">₱${product.price.toFixed(2)}</span>
                </div>

                <div class="product-detail-meta">
                    <div class="meta-item">
                        <i class="fas fa-barcode"></i>
                        <span><strong>ISBN:</strong> ${product.isbn}</span>
                    </div>
                    <div class="meta-item">
                        <i class="fas fa-file-alt"></i>
                        <span><strong>Pages:</strong> ${product.pages}</span>
                    </div>
                    <div class="meta-item">
                        <i class="fas fa-calendar"></i>
                        <span><strong>Year:</strong> ${product.year}</span>
                    </div>
                    <div class="meta-item">
                        <i class="fas fa-boxes"></i>
                        <span><strong>Stock:</strong> ${product.stock} available</span>
                    </div>
                </div>

                <div class="product-detail-description">
                    <h3>About this book</h3>
                    <p>${product.description}</p>
                </div>

                <div class="product-detail-actions">
                    <div class="quantity-selector">
                        <button class="qty-btn" onclick="decreaseQuantity()">-</button>
                        <input type="number" id="quantity" value="1" min="1" max="${product.stock}" readonly>
                        <button class="qty-btn" onclick="increaseQuantity(${product.stock})">+</button>
                    </div>
                    <button class="btn btn-primary btn-large" onclick="addToCartWithQuantity(${product.id})">
                        <i class="fas fa-cart-plus"></i> Add to Cart
                    </button>
                </div>

                <div class="product-detail-features">
                    <div class="feature-badge">
                        <i class="fas fa-shipping-fast"></i>
                        <span>Fast Shipping</span>
                    </div>
                    <div class="feature-badge">
                        <i class="fas fa-shield-alt"></i>
                        <span>Secure Payment</span>
                    </div>
                    <div class="feature-badge">
                        <i class="fas fa-undo"></i>
                        <span>Easy Returns</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function displayRelatedProducts(currentProduct) {
    const relatedProducts = products
        .filter(p => p.category === currentProduct.category && p.id !== currentProduct.id)
        .slice(0, 4);
    
    const relatedProductsContainer = document.getElementById('relatedProducts');
    
    if (relatedProducts.length === 0) {
        relatedProductsContainer.innerHTML = '<p>No related products found.</p>';
        return;
    }

    relatedProductsContainer.innerHTML = relatedProducts.map(product => `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.title}">
                <span class="stock-badge ${product.stock < 10 ? 'low-stock' : ''}">${product.stock} in stock</span>
            </div>
            <div class="product-info">
                <span class="product-category">${formatCategory(product.category)}</span>
                <h3 class="product-title">${product.title}</h3>
                <p class="product-author">by ${product.author}</p>
                <div class="product-footer">
                    <span class="product-price">₱${product.price.toFixed(2)}</span>
                    <div class="product-actions">
                        <a href="book-detail.html?id=${product.id}" class="btn-view">
                            <i class="fas fa-eye"></i>
                        </a>
                        <button class="btn-add-cart" onclick="addToCart(${product.id})">
                            <i class="fas fa-cart-plus"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

function formatCategory(category) {
    const categories = {
        'fiction': 'Fiction',
        'non-fiction': 'Non-Fiction',
        'academic': 'Academic',
        'children': 'Children\'s',
        'business': 'Business'
    };
    return categories[category] || category;
}

function increaseQuantity(max) {
    const qtyInput = document.getElementById('quantity');
    const currentValue = parseInt(qtyInput.value);
    if (currentValue < max) {
        qtyInput.value = currentValue + 1;
    }
}

function decreaseQuantity() {
    const qtyInput = document.getElementById('quantity');
    const currentValue = parseInt(qtyInput.value);
    if (currentValue > 1) {
        qtyInput.value = currentValue - 1;
    }
}

function addToCartWithQuantity(productId) {
    const quantity = parseInt(document.getElementById('quantity').value);
    const product = getProductById(productId);
    
    if (!product) return;

    const cart = getCart();
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            quantity: quantity
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showNotification(`Added ${quantity} item(s) to cart!`);
}
