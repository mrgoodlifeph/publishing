// Author Books Page Functionality
let authorId = null;
let allBooks = [];

document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    const currentUser = checkAuth('author');
    if (!currentUser) return;

    // Display user name
    document.getElementById('userName').textContent = currentUser.name;
    authorId = currentUser.id;

    // Load data
    loadAuthorBooks();

    // Setup filters
    document.getElementById('searchInput').addEventListener('input', filterBooks);
    document.getElementById('categoryFilter').addEventListener('change', filterBooks);
});

function loadAuthorBooks() {
    const booksData = JSON.parse(localStorage.getItem('booksData') || JSON.stringify(products));
    const salesData = JSON.parse(localStorage.getItem('salesData') || '[]');
    
    // Get author's books
    const authorBooks = booksData.filter(b => b.authorId === authorId);
    
    // Calculate sales statistics for each book
    allBooks = authorBooks.map(book => {
        let unitsSold = 0;
        let revenue = 0;
        
        salesData.forEach(sale => {
            sale.items.forEach(item => {
                if (item.id === book.id) {
                    unitsSold += item.quantity;
                    revenue += item.price * item.quantity;
                }
            });
        });
        
        return {
            ...book,
            unitsSold,
            revenue,
            royalties: revenue * (book.royaltyRate || 0.30)
        };
    });
    
    // Update stats
    updateStats();
    
    // Display books
    displayBooks(allBooks);
}

function updateStats() {
    const totalBooks = allBooks.length;
    const totalRevenue = allBooks.reduce((sum, book) => sum + book.revenue, 0);
    const unitsSold = allBooks.reduce((sum, book) => sum + book.unitsSold, 0);
    const avgRoyaltyRate = totalBooks > 0 ? 
        (allBooks.reduce((sum, book) => sum + (book.royaltyRate || 0.30), 0) / totalBooks) * 100 : 0;
    
    document.getElementById('totalBooks').textContent = totalBooks;
    document.getElementById('totalRevenue').textContent = `₱${totalRevenue.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    document.getElementById('unitsSold').textContent = unitsSold;
    document.getElementById('avgRoyaltyRate').textContent = `${avgRoyaltyRate.toFixed(1)}%`;
}

function displayBooks(books) {
    const tableBody = document.getElementById('booksTable');
    
    if (books.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="9" class="empty-state">
                    <i class="fas fa-book empty-state-icon"></i>
                    <p>No books found</p>
                </td>
            </tr>
        `;
        return;
    }
    
    tableBody.innerHTML = books.map(book => `
        <tr>
            <td>
                <div class="book-item-cell">
                    <img src="${book.image}" alt="${book.title}" class="book-item-thumb">
                    <strong>${book.title}</strong>
                </div>
            </td>
            <td>${getCategoryDisplayName(book.category)}</td>
            <td>₱${book.price.toFixed(2)}</td>
            <td>
                <span class="badge ${book.stock < 10 ? (book.stock === 0 ? 'danger' : 'warning') : 'success'}">
                    ${book.stock}
                </span>
            </td>
            <td><strong>${((book.royaltyRate || 0.30) * 100).toFixed(0)}%</strong></td>
            <td>${book.unitsSold}</td>
            <td>₱${book.revenue.toFixed(2)}</td>
            <td><strong class="royalty-amount">₱${book.royalties.toFixed(2)}</strong></td>
            <td>
                <div class="table-actions">
                    <button class="btn-icon" onclick="viewBookDetails(${book.id})" title="View Details">
                        <i class="fas fa-eye"></i>
                    </button>
                    <a href="book-detail.html?id=${book.id}" class="btn-icon" title="View on Website" target="_blank">
                        <i class="fas fa-external-link-alt"></i>
                    </a>
                </div>
            </td>
        </tr>
    `).join('');
}

function filterBooks() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const categoryFilter = document.getElementById('categoryFilter').value;
    
    let filteredBooks = allBooks;
    
    // Apply search filter
    if (searchTerm) {
        filteredBooks = filteredBooks.filter(book => 
            book.title.toLowerCase().includes(searchTerm) ||
            book.description.toLowerCase().includes(searchTerm)
        );
    }
    
    // Apply category filter
    if (categoryFilter) {
        filteredBooks = filteredBooks.filter(book => book.category === categoryFilter);
    }
    
    displayBooks(filteredBooks);
}

function viewBookDetails(bookId) {
    const book = allBooks.find(b => b.id === bookId);
    if (!book) return;
    
    // Populate modal
    document.getElementById('detailImage').src = book.image;
    document.getElementById('detailImage').alt = book.title;
    document.getElementById('detailTitle').textContent = book.title;
    document.getElementById('detailCategory').textContent = getCategoryDisplayName(book.category);
    document.getElementById('detailPrice').textContent = `₱${book.price.toFixed(2)}`;
    document.getElementById('detailStock').textContent = book.stock;
    document.getElementById('detailRoyalty').textContent = `${((book.royaltyRate || 0.30) * 100).toFixed(0)}%`;
    document.getElementById('detailUnitsSold').textContent = book.unitsSold;
    document.getElementById('detailRevenue').textContent = `₱${book.revenue.toFixed(2)}`;
    document.getElementById('detailRoyalties').textContent = `₱${book.royalties.toFixed(2)}`;
    document.getElementById('detailDescription').textContent = book.description;
    
    // Show modal
    document.getElementById('bookModal').classList.add('active');
}

function closeModal() {
    document.getElementById('bookModal').classList.remove('active');
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('bookModal');
    if (event.target === modal) {
        closeModal();
    }
}
