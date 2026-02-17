// Author Dashboard Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    const currentUser = checkAuth('author');
    if (!currentUser) return;

    // Display user name
    document.getElementById('userName').textContent = currentUser.name;

    // Load author data
    loadAuthorProfile(currentUser.id);
    loadAuthorStats(currentUser.id);
    loadAuthorBooks(currentUser.id);
    loadRecentSales(currentUser.id);
});

function loadAuthorProfile(authorId) {
    const authorsData = JSON.parse(localStorage.getItem('authorsData') || JSON.stringify(authors));
    const author = authorsData.find(a => a.id === authorId);
    
    if (author) {
        document.getElementById('authorEmail').textContent = author.email;
        document.getElementById('authorPhone').textContent = author.phone;
        document.getElementById('authorJoinDate').textContent = new Date(author.joinDate).toLocaleDateString('en-PH');
    }
}

function loadAuthorStats(authorId) {
    const booksData = JSON.parse(localStorage.getItem('booksData') || JSON.stringify(products));
    const salesData = JSON.parse(localStorage.getItem('salesData') || '[]');
    
    // Get author's books
    const authorBooks = booksData.filter(b => b.authorId === authorId);
    const bookIds = authorBooks.map(b => b.id);
    
    // Calculate statistics
    let totalSales = 0;
    let totalRoyalties = 0;
    let unitsSold = 0;
    
    salesData.forEach(sale => {
        sale.items.forEach(item => {
            if (bookIds.includes(item.id)) {
                const book = booksData.find(p => p.id === item.id);
                const saleAmount = item.price * item.quantity;
                totalSales += saleAmount;
                totalRoyalties += saleAmount * (book.royaltyRate || 0.30);
                unitsSold += item.quantity;
            }
        });
    });
    
    // Update stats
    document.getElementById('totalBooks').textContent = authorBooks.length;
    document.getElementById('totalSales').textContent = `₱${totalSales.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    document.getElementById('totalRoyalties').textContent = `₱${totalRoyalties.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    document.getElementById('unitsSold').textContent = unitsSold;
}

function loadAuthorBooks(authorId) {
    const booksData = JSON.parse(localStorage.getItem('booksData') || JSON.stringify(products));
    const salesData = JSON.parse(localStorage.getItem('salesData') || '[]');
    
    const authorBooks = booksData.filter(b => b.authorId === authorId);
    const tableBody = document.getElementById('booksTable');
    
    if (authorBooks.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="7" class="empty-state">No books published yet</td></tr>';
        return;
    }
    
    // Calculate sales per book
    const bookStats = authorBooks.map(book => {
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
    
    tableBody.innerHTML = bookStats.map(book => `
        <tr>
            <td><strong>${book.title}</strong></td>
            <td>${getCategoryDisplayName(book.category)}</td>
            <td>₱${book.price.toFixed(2)}</td>
            <td>
                <span class="badge ${book.stock < 10 ? 'warning' : 'success'}">
                    ${book.stock}
                </span>
            </td>
            <td>${book.unitsSold}</td>
            <td>₱${book.revenue.toFixed(2)}</td>
            <td>₱${book.royalties.toFixed(2)}</td>
        </tr>
    `).join('');
}

function loadRecentSales(authorId) {
    const booksData = JSON.parse(localStorage.getItem('booksData') || JSON.stringify(products));
    const salesData = JSON.parse(localStorage.getItem('salesData') || '[]');
    
    const authorBooks = booksData.filter(b => b.authorId === authorId);
    const bookIds = authorBooks.map(b => b.id);
    
    // Get all sales for author's books
    const authorSales = [];
    
    salesData.forEach(sale => {
        sale.items.forEach(item => {
            if (bookIds.includes(item.id)) {
                const book = booksData.find(p => p.id === item.id);
                const saleAmount = item.price * item.quantity;
                const royalty = saleAmount * (book.royaltyRate || 0.30);
                
                authorSales.push({
                    date: sale.date,
                    orderNumber: sale.orderNumber,
                    bookTitle: item.title,
                    quantity: item.quantity,
                    saleAmount: saleAmount,
                    royalty: royalty
                });
            }
        });
    });
    
    // Sort by date (newest first) and get last 10
    authorSales.sort((a, b) => new Date(b.date) - new Date(a.date));
    const recentSales = authorSales.slice(0, 10);
    
    const tableBody = document.getElementById('salesTable');
    
    if (recentSales.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="6" class="empty-state">No sales yet</td></tr>';
        return;
    }
    
    tableBody.innerHTML = recentSales.map(sale => `
        <tr>
            <td>${new Date(sale.date).toLocaleDateString('en-PH')}</td>
            <td><strong>${sale.orderNumber}</strong></td>
            <td>${sale.bookTitle}</td>
            <td>${sale.quantity}</td>
            <td>₱${sale.saleAmount.toFixed(2)}</td>
            <td><strong class="royalty-amount">₱${sale.royalty.toFixed(2)}</strong></td>
        </tr>
    `).join('');
}
