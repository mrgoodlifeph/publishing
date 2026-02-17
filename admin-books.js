// Admin Books Management
document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    const currentUser = checkAuth('admin');
    if (!currentUser) return;

    // Display user name
    document.getElementById('userName').textContent = currentUser.name;

    // Load books and authors
    loadBooks();
    loadAuthorOptions();

    // Search filter
    document.getElementById('searchBooks').addEventListener('input', filterBooks);
    document.getElementById('filterCategory').addEventListener('change', filterBooks);

    // Form submission
    document.getElementById('bookForm').addEventListener('submit', handleBookSubmit);
});

function loadBooks() {
    const booksData = JSON.parse(localStorage.getItem('booksData') || JSON.stringify(products));
    localStorage.setItem('booksData', JSON.stringify(booksData));
    displayBooks(booksData);
}

function displayBooks(booksToDisplay) {
    const tableBody = document.getElementById('booksTable');
    
    if (booksToDisplay.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="8" style="text-align: center; padding: 40px;">No books found</td></tr>';
        return;
    }

    tableBody.innerHTML = booksToDisplay.map(book => {
        const author = authors.find(a => a.id === book.authorId);
        return `
            <tr>
                <td>${book.id}</td>
                <td><strong>${book.title}</strong></td>
                <td>${author ? author.name : book.author}</td>
                <td>${getCategoryDisplayName(book.category)}</td>
                <td>₱${book.price.toFixed(2)}</td>
                <td>
                    <span class="badge ${book.stock < 10 ? 'warning' : 'success'}">
                        ${book.stock}
                    </span>
                </td>
                <td>${book.year}</td>
                <td>
                    <div class="table-actions">
                        <button class="btn-edit" onclick="editBook(${book.id})">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                        <button class="btn-delete" onclick="deleteBook(${book.id})">
                            <i class="fas fa-trash"></i> Delete
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

function filterBooks() {
    const searchTerm = document.getElementById('searchBooks').value.toLowerCase();
    const categoryFilter = document.getElementById('filterCategory').value;
    
    const booksData = JSON.parse(localStorage.getItem('booksData'));
    
    let filtered = booksData.filter(book => {
        const matchesSearch = book.title.toLowerCase().includes(searchTerm) ||
                            book.author.toLowerCase().includes(searchTerm) ||
                            book.isbn.toLowerCase().includes(searchTerm);
        
        const matchesCategory = categoryFilter === 'all' || book.category === categoryFilter;
        
        return matchesSearch && matchesCategory;
    });
    
    displayBooks(filtered);
}

function loadAuthorOptions() {
    const authorSelect = document.getElementById('bookAuthor');
    authorSelect.innerHTML = '<option value="">Select Author</option>' +
        authors.map(author => `<option value="${author.id}">${author.name}</option>`).join('');
}

function openAddBookModal() {
    document.getElementById('modalTitle').textContent = 'Add New Book';
    document.getElementById('bookForm').reset();
    document.getElementById('bookId').value = '';
    document.getElementById('bookModal').classList.add('active');
}

function editBook(bookId) {
    const booksData = JSON.parse(localStorage.getItem('booksData'));
    const book = booksData.find(b => b.id === bookId);
    
    if (!book) return;
    
    document.getElementById('modalTitle').textContent = 'Edit Book';
    document.getElementById('bookId').value = book.id;
    document.getElementById('bookTitle').value = book.title;
    document.getElementById('bookAuthor').value = book.authorId;
    document.getElementById('bookCategory').value = book.category;
    document.getElementById('bookPrice').value = book.price;
    document.getElementById('bookStock').value = book.stock;
    document.getElementById('bookDescription').value = book.description;
    document.getElementById('bookISBN').value = book.isbn;
    document.getElementById('bookPages').value = book.pages;
    document.getElementById('bookYear').value = book.year;
    document.getElementById('bookRoyalty').value = (book.royaltyRate || 0.10) * 100;
    document.getElementById('bookImage').value = book.image;
    
    document.getElementById('bookModal').classList.add('active');
}

function closeBookModal() {
    document.getElementById('bookModal').classList.remove('active');
}

function handleBookSubmit(e) {
    e.preventDefault();
    
    const booksData = JSON.parse(localStorage.getItem('booksData'));
    const bookId = document.getElementById('bookId').value;
    const authorId = parseInt(document.getElementById('bookAuthor').value);
    const author = authors.find(a => a.id === authorId);
    
    const bookData = {
        id: bookId ? parseInt(bookId) : Date.now(),
        title: document.getElementById('bookTitle').value,
        author: author ? author.name : 'Unknown',
        authorId: authorId,
        category: document.getElementById('bookCategory').value,
        price: parseFloat(document.getElementById('bookPrice').value),
        stock: parseInt(document.getElementById('bookStock').value),
        description: document.getElementById('bookDescription').value,
        isbn: document.getElementById('bookISBN').value,
        pages: parseInt(document.getElementById('bookPages').value) || 0,
        year: parseInt(document.getElementById('bookYear').value) || new Date().getFullYear(),
        royaltyRate: parseFloat(document.getElementById('bookRoyalty').value) / 100 || 0.10,
        image: document.getElementById('bookImage').value || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400'
    };
    
    if (bookId) {
        // Update existing book
        const index = booksData.findIndex(b => b.id === parseInt(bookId));
        if (index !== -1) {
            booksData[index] = bookData;
        }
    } else {
        // Add new book
        booksData.push(bookData);
    }
    
    localStorage.setItem('booksData', JSON.stringify(booksData));
    
    // Update products array in memory (for current session)
    if (window.products) {
        if (bookId) {
            const index = products.findIndex(b => b.id === parseInt(bookId));
            if (index !== -1) {
                products[index] = bookData;
            }
        } else {
            products.push(bookData);
        }
    }
    
    closeBookModal();
    loadBooks();
    showNotification(bookId ? 'Book updated successfully!' : 'Book added successfully!');
}

function deleteBook(bookId) {
    if (!confirm('Are you sure you want to delete this book?')) return;
    
    const booksData = JSON.parse(localStorage.getItem('booksData'));
    const filtered = booksData.filter(b => b.id !== bookId);
    
    localStorage.setItem('booksData', JSON.stringify(filtered));
    
    // Update products array in memory
    if (window.products) {
        const index = products.findIndex(b => b.id === bookId);
        if (index !== -1) {
            products.splice(index, 1);
        }
    }
    
    loadBooks();
    showNotification('Book deleted successfully!');
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 15px 25px;
        border-radius: 5px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Close modal when clicking outside
window.addEventListener('click', function(e) {
    const modal = document.getElementById('bookModal');
    if (e.target === modal) {
        closeBookModal();
    }
});
