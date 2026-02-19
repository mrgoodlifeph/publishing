// Shop page functionality
document.addEventListener('DOMContentLoaded', function() {
    const productsGrid = document.getElementById('productsGrid');
    const searchInput = document.getElementById('searchInput');
    const sortSelect = document.getElementById('sortSelect');
    const resultsCount = document.getElementById('resultsCount');
    const noResults = document.getElementById('noResults');

    // Load products from localStorage or use default products
    const booksData = JSON.parse(localStorage.getItem('booksData') || JSON.stringify(products));
    let currentProducts = [...booksData];
    let activeFilters = {
        categories: ['all'],
        prices: ['all'],
        search: ''
    };

    // Initialize products display
    displayProducts(currentProducts);

    // Search functionality
    searchInput.addEventListener('input', function() {
        activeFilters.search = this.value.toLowerCase();
        filterAndDisplayProducts();
    });

    // Category filters
    document.querySelectorAll('[data-category]').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            if (this.value === 'all') {
                if (this.checked) {
                    document.querySelectorAll('[data-category]:not([value="all"])').forEach(cb => cb.checked = false);
                    activeFilters.categories = ['all'];
                }
            } else {
                document.querySelector('[data-category="all"]').checked = false;
                activeFilters.categories = Array.from(document.querySelectorAll('[data-category]:checked:not([value="all"])'))
                    .map(cb => cb.value);
                if (activeFilters.categories.length === 0) {
                    document.querySelector('[data-category="all"]').checked = true;
                    activeFilters.categories = ['all'];
                }
            }
            filterAndDisplayProducts();
        });
    });

    // Price filters
    document.querySelectorAll('[data-price]').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            if (this.value === 'all') {
                if (this.checked) {
                    document.querySelectorAll('[data-price]:not([value="all"])').forEach(cb => cb.checked = false);
                    activeFilters.prices = ['all'];
                }
            } else {
                document.querySelector('[data-price="all"]').checked = false;
                activeFilters.prices = Array.from(document.querySelectorAll('[data-price]:checked:not([value="all"])'))
                    .map(cb => cb.value);
                if (activeFilters.prices.length === 0) {
                    document.querySelector('[data-price="all"]').checked = true;
                    activeFilters.prices = ['all'];
                }
            }
            filterAndDisplayProducts();
        });
    });

    // Sort functionality
    sortSelect.addEventListener('change', function() {
        sortProducts(this.value);
        displayProducts(currentProducts);
    });

    function filterAndDisplayProducts() {
        const booksData = JSON.parse(localStorage.getItem('booksData') || JSON.stringify(products));
        currentProducts = booksData.filter(product => {
            // Category filter
            const categoryMatch = activeFilters.categories.includes('all') || 
                                activeFilters.categories.includes(product.category);

            // Price filter
            let priceMatch = activeFilters.prices.includes('all');
            if (!priceMatch) {
                priceMatch = activeFilters.prices.some(range => {
                    if (range === '0-299') return product.price < 300;
                    if (range === '300-599') return product.price >= 300 && product.price < 600;
                    if (range === '600-999') return product.price >= 600 && product.price < 1000;
                    if (range === '1000+') return product.price >= 1000;
                    return false;
                });
            }

            // Search filter
            const searchMatch = activeFilters.search === '' || 
                                product.title.toLowerCase().includes(activeFilters.search) ||
                                product.author.toLowerCase().includes(activeFilters.search) ||
                                product.description.toLowerCase().includes(activeFilters.search);

            return categoryMatch && priceMatch && searchMatch;
        });

        sortProducts(sortSelect.value);
        displayProducts(currentProducts);
    }

    function sortProducts(sortBy) {
        switch(sortBy) {
            case 'price-low':
                currentProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                currentProducts.sort((a, b) => b.price - a.price);
                break;
            case 'title':
                currentProducts.sort((a, b) => a.title.localeCompare(b.title));
                break;
            default: // featured
                // Sort by shop position set by admin
                currentProducts.sort((a, b) => {
                    const aPos = a.shopPosition !== undefined ? a.shopPosition : 999;
                    const bPos = b.shopPosition !== undefined ? b.shopPosition : 999;
                    return aPos - bPos;
                });
        }
    }

    function displayProducts(productsToDisplay) {
        if (productsToDisplay.length === 0) {
            productsGrid.classList.add('hidden');
            noResults.classList.remove('hidden');
            resultsCount.textContent = 'No books found';
            return;
        }

        productsGrid.classList.remove('hidden');
        noResults.classList.add('hidden');
        resultsCount.textContent = `Showing ${productsToDisplay.length} ${productsToDisplay.length === 1 ? 'book' : 'books'}`;

        productsGrid.innerHTML = productsToDisplay.map(product => `
            <div class="product-card ${product.featured ? 'featured-product' : ''}">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.title}">
                    ${product.featured ? '<span class="featured-badge"><i class="fas fa-star"></i> Featured</span>' : ''}
                    <span class="stock-badge ${product.stock < 10 ? 'low-stock' : ''}">${product.stock} in stock</span>
                </div>
                <div class="product-info">
                    <span class="product-category">${formatCategory(product.category)}</span>
                    <h3 class="product-title">${product.title}</h3>
                    <p class="product-author">by ${product.author}</p>
                    <p class="product-description">${product.description.substring(0, 100)}...</p>
                    <div class="product-footer">
                        <span class="product-price">₱${product.price.toFixed(2)}</span>
                        <div class="product-actions">
                            <a href="book-detail.html?id=${product.id}" class="btn-view">
                                <i class="fas fa-eye"></i>
                            </a>
                            <button class="btn-add-cart" onclick="addToCart(${product.id})">
                                <i class="fas fa-cart-plus"></i> Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    function formatCategory(category) {
        return getCategoryDisplayName(category);
    }
});
