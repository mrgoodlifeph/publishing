// Author Royalties Page Functionality
let authorId = null;
let allTransactions = [];

document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    const currentUser = checkAuth('author');
    if (!currentUser) return;

    // Display user name
    document.getElementById('userName').textContent = currentUser.name;
    authorId = currentUser.id;

    // Load data
    loadRoyaltyData();

    // Setup filter
    document.getElementById('monthFilter').addEventListener('change', filterTransactions);
});

function loadRoyaltyData() {
    const booksData = JSON.parse(localStorage.getItem('booksData') || JSON.stringify(products));
    const salesData = JSON.parse(localStorage.getItem('salesData') || '[]');
    
    // Get author's books
    const authorBooks = booksData.filter(b => b.authorId === authorId);
    const bookIds = authorBooks.map(b => b.id);
    
    // Calculate statistics
    let totalSales = 0;
    let totalRoyalties = 0;
    let totalUnits = 0;
    let thisMonthRoyalties = 0;
    
    const now = new Date();
    const thisMonth = now.getMonth();
    const thisYear = now.getFullYear();
    
    // Get all transactions
    allTransactions = [];
    
    salesData.forEach(sale => {
        sale.items.forEach(item => {
            if (bookIds.includes(item.id)) {
                const book = booksData.find(p => p.id === item.id);
                const saleAmount = item.price * item.quantity;
                const royalty = saleAmount * (book.royaltyRate || 0.30);
                
                totalSales += saleAmount;
                totalRoyalties += royalty;
                totalUnits += item.quantity;
                
                // Check if this month
                const saleDate = new Date(sale.date);
                if (saleDate.getMonth() === thisMonth && saleDate.getFullYear() === thisYear) {
                    thisMonthRoyalties += royalty;
                }
                
                allTransactions.push({
                    date: sale.date,
                    orderNumber: sale.orderNumber,
                    bookTitle: item.title,
                    bookId: item.id,
                    quantity: item.quantity,
                    saleAmount: saleAmount,
                    royaltyRate: book.royaltyRate || 0.30,
                    royalty: royalty
                });
            }
        });
    });
    
    // Update stats
    document.getElementById('totalRoyalties').textContent = `₱${totalRoyalties.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    document.getElementById('totalSales').textContent = `₱${totalSales.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    document.getElementById('totalUnits').textContent = totalUnits;
    document.getElementById('monthRoyalties').textContent = `₱${thisMonthRoyalties.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    
    // Load tables
    loadBookRoyalties(authorBooks, booksData, salesData);
    displayTransactions(allTransactions);
    loadMonthlyBreakdown();
}

function loadBookRoyalties(authorBooks, booksData, salesData) {
    // Calculate royalties per book
    const bookRoyalties = authorBooks.map(book => {
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
        
        const royalties = revenue * (book.royaltyRate || 0.30);
        const avgPerUnit = unitsSold > 0 ? royalties / unitsSold : 0;
        
        return {
            title: book.title,
            royaltyRate: book.royaltyRate || 0.30,
            unitsSold,
            revenue,
            royalties,
            avgPerUnit
        };
    }).filter(book => book.unitsSold > 0); // Only show books with sales
    
    const tableBody = document.getElementById('bookRoyaltiesTable');
    
    if (bookRoyalties.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="6" class="empty-state">
                    <i class="fas fa-money-bill-wave empty-state-icon"></i>
                    <p>No royalty data available</p>
                </td>
            </tr>
        `;
        return;
    }
    
    // Sort by royalties (highest first)
    bookRoyalties.sort((a, b) => b.royalties - a.royalties);
    
    tableBody.innerHTML = bookRoyalties.map(book => `
        <tr>
            <td><strong>${book.title}</strong></td>
            <td><span class="badge success">${(book.royaltyRate * 100).toFixed(0)}%</span></td>
            <td>${book.unitsSold}</td>
            <td>₱${book.revenue.toFixed(2)}</td>
            <td><strong class="royalty-amount-large">₱${book.royalties.toFixed(2)}</strong></td>
            <td>₱${book.avgPerUnit.toFixed(2)}</td>
        </tr>
    `).join('');
}

function displayTransactions(transactions) {
    const tableBody = document.getElementById('transactionsTable');
    
    if (transactions.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="7" class="empty-state">
                    <i class="fas fa-receipt empty-state-icon"></i>
                    <p>No transactions found</p>
                </td>
            </tr>
        `;
        return;
    }
    
    // Sort by date (newest first)
    transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    tableBody.innerHTML = transactions.map(trans => `
        <tr>
            <td>${new Date(trans.date).toLocaleDateString('en-PH')}</td>
            <td><strong>${trans.orderNumber}</strong></td>
            <td>${trans.bookTitle}</td>
            <td>${trans.quantity}</td>
            <td>₱${trans.saleAmount.toFixed(2)}</td>
            <td><span class="badge success">${(trans.royaltyRate * 100).toFixed(0)}%</span></td>
            <td><strong class="royalty-amount">₱${trans.royalty.toFixed(2)}</strong></td>
        </tr>
    `).join('');
}

function filterTransactions() {
    const monthFilter = parseInt(document.getElementById('monthFilter').value);
    
    if (isNaN(monthFilter) || monthFilter === '') {
        displayTransactions(allTransactions);
        return;
    }
    
    const now = new Date();
    let startDate;
    
    if (monthFilter === 0) {
        // This month
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    } else {
        // Last N months
        startDate = new Date(now.getFullYear(), now.getMonth() - monthFilter, now.getDate());
    }
    
    const filtered = allTransactions.filter(trans => {
        const transDate = new Date(trans.date);
        return transDate >= startDate;
    });
    
    displayTransactions(filtered);
}

function loadMonthlyBreakdown() {
    if (allTransactions.length === 0) {
        document.getElementById('monthlyTable').innerHTML = `
            <tr>
                <td colspan="4" class="empty-state">
                    <i class="fas fa-calendar empty-state-icon"></i>
                    <p>No monthly data available</p>
                </td>
            </tr>
        `;
        return;
    }
    
    // Group by month
    const monthlyData = {};
    
    allTransactions.forEach(trans => {
        const date = new Date(trans.date);
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        
        if (!monthlyData[monthKey]) {
            monthlyData[monthKey] = {
                month: date.toLocaleString('en-PH', { month: 'long', year: 'numeric' }),
                units: 0,
                sales: 0,
                royalties: 0
            };
        }
        
        monthlyData[monthKey].units += trans.quantity;
        monthlyData[monthKey].sales += trans.saleAmount;
        monthlyData[monthKey].royalties += trans.royalty;
    });
    
    // Convert to array and sort by date (newest first)
    const monthlyArray = Object.entries(monthlyData)
        .sort((a, b) => b[0].localeCompare(a[0]))
        .map(([key, data]) => data);
    
    const tableBody = document.getElementById('monthlyTable');
    tableBody.innerHTML = monthlyArray.map(month => `
        <tr>
            <td><strong>${month.month}</strong></td>
            <td>${month.units}</td>
            <td>₱${month.sales.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
            <td><strong class="royalty-amount-large">₱${month.royalties.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong></td>
        </tr>
    `).join('');
}
