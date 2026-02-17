// Admin Dashboard Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    const currentUser = checkAuth('admin');
    if (!currentUser) return;

    // Display user name
    document.getElementById('userName').textContent = currentUser.name;

    // Load dashboard statistics
    loadDashboardStats();
    loadRecentOrders();
    loadTopBooks();
});

function loadDashboardStats() {
    // Total Books
    const totalBooks = products.length;
    document.getElementById('totalBooks').textContent = totalBooks;

    // Total Authors
    const totalAuthors = authors.length;
    document.getElementById('totalAuthors').textContent = totalAuthors;

    // Total Orders
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    document.getElementById('totalOrders').textContent = orders.length;

    // Total Revenue
    const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);
    document.getElementById('totalRevenue').textContent = `₱${totalRevenue.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function loadRecentOrders() {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const recentOrders = orders.slice(-5).reverse(); // Get last 5 orders
    
    const tableBody = document.getElementById('recentOrdersTable');
    
    if (recentOrders.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 40px;">No orders yet</td></tr>';
        return;
    }

    tableBody.innerHTML = recentOrders.map(order => {
        const orderDate = new Date(order.orderDate);
        const itemCount = order.items.reduce((sum, item) => sum + item.quantity, 0);
        
        return `
            <tr>
                <td><strong>${order.orderNumber}</strong></td>
                <td>${order.customer.firstName} ${order.customer.lastName}</td>
                <td>${orderDate.toLocaleDateString('en-PH')}</td>
                <td>${itemCount} ${itemCount === 1 ? 'item' : 'items'}</td>
                <td>₱${order.total.toFixed(2)}</td>
                <td><span class="badge success">Completed</span></td>
            </tr>
        `;
    }).join('');
}

function loadTopBooks() {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const tableBody = document.getElementById('topBooksTable');
    
    if (orders.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 40px;">No sales data yet</td></tr>';
        return;
    }

    // Calculate sales per book
    const bookSales = {};
    
    orders.forEach(order => {
        order.items.forEach(item => {
            if (!bookSales[item.id]) {
                const book = products.find(p => p.id === item.id);
                if (book) {
                    bookSales[item.id] = {
                        id: item.id,
                        title: item.title,
                        author: book.author,
                        category: book.category,
                        unitsSold: 0,
                        revenue: 0
                    };
                }
            }
            if (bookSales[item.id]) {
                bookSales[item.id].unitsSold += item.quantity;
                bookSales[item.id].revenue += item.price * item.quantity;
            }
        });
    });

    // Convert to array and sort by units sold
    const topBooks = Object.values(bookSales)
        .sort((a, b) => b.unitsSold - a.unitsSold)
        .slice(0, 5); // Top 5 books

    if (topBooks.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 40px;">No sales data yet</td></tr>';
        return;
    }

    tableBody.innerHTML = topBooks.map(book => `
        <tr>
            <td><strong>${book.title}</strong></td>
            <td>${book.author}</td>
            <td>${getCategoryDisplayName(book.category)}</td>
            <td>${book.unitsSold}</td>
            <td>₱${book.revenue.toFixed(2)}</td>
        </tr>
    `).join('');
}
