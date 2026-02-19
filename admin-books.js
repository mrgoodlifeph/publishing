// Admin Books Management
let confirmCallback = null;

document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    const currentUser = checkAuth('admin');
    if (!currentUser) return;

    // Display user name
    document.getElementById('userName').textContent = currentUser.name;

    // Load books and authors
    loadBooks();
    loadFeaturedBooks();
    loadAuthorOptions();

    // Search filter
    document.getElementById('searchBooks').addEventListener('input', filterBooks);
    document.getElementById('filterCategory').addEventListener('change', filterBooks);

    // Image upload preview
    document.getElementById('bookImageFile').addEventListener('change', handleImagePreview);

    // Form submission
    document.getElementById('bookForm').addEventListener('submit', handleBookSubmit);
});

function loadBooks() {
    const booksData = JSON.parse(localStorage.getItem('booksData') || JSON.stringify(products));
    // Initialize featured property if not exists
    booksData.forEach((book, index) => {
        if (book.featured === undefined) {
            book.featured = false;
        }
        if (book.featuredPosition === undefined) {
            book.featuredPosition = 999;
        }
        if (book.shippingFee === undefined) {
            book.shippingFee = 50; // Default shipping fee
        }
        if (book.weight === undefined) {
            book.weight = 0.5; // Default weight
        }
        if (book.shopPosition === undefined) {
            book.shopPosition = index; // Initialize shop position
        }
    });
    localStorage.setItem('booksData', JSON.stringify(booksData));
    displayBooks(booksData);
    loadFeaturedBooks();
}

function loadFeaturedBooks() {
    const booksData = JSON.parse(localStorage.getItem('booksData') || JSON.stringify(products));
    const featuredBooks = booksData
        .filter(book => book.featured)
        .sort((a, b) => (a.featuredPosition || 999) - (b.featuredPosition || 999));
    
    const container = document.getElementById('featuredBooksContainer');
    
    if (featuredBooks.length === 0) {
        container.innerHTML = `
            <div class=\"empty-state\">
                <i class=\"fas fa-star\" style=\"font-size: 48px; color: #ddd; margin-bottom: 15px;\"></i>
                <p>No featured books yet. Toggle the star icon on any book to feature it.</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = featuredBooks.map((book, index) => {
        const author = authors.find(a => a.id === book.authorId);
        return `
            <div class=\"featured-book-card\" draggable=\"true\" data-book-id=\"${book.id}\" ondragstart=\"handleDragStart(event)\" ondragover=\"handleDragOver(event)\" ondrop=\"handleDrop(event)\" ondragend=\"handleDragEnd(event)\">
                <div class=\"featured-book-position\">${index + 1}</div>
                <img src=\"${book.image}\" alt=\"${book.title}\" class=\"featured-book-image\">
                <div class=\"featured-book-info\">
                    <h4>${book.title}</h4>
                    <p class=\"featured-book-author\">by ${author ? author.name : book.author}</p>
                    <p class=\"featured-book-category\">${getCategoryDisplayName(book.category)}</p>
                </div>
                <button class=\"btn-remove-featured\" onclick=\"toggleFeatured(${book.id}, false)\" title=\"Remove from featured\">
                    <i class=\"fas fa-times\"></i>
                </button>
            </div>
        `;
    }).join('');
}

function displayBooks(booksToDisplay) {
    const tableBody = document.getElementById('booksTable');
    
    if (booksToDisplay.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="10" style="text-align: center; padding: 40px;">No books found</td></tr>';
        return;
    }

    // Sort by shop position
    const sortedBooks = [...booksToDisplay].sort((a, b) => 
        (a.shopPosition !== undefined ? a.shopPosition : 999) - 
        (b.shopPosition !== undefined ? b.shopPosition : 999)
    );

    tableBody.innerHTML = sortedBooks.map(book => {
        const author = authors.find(a => a.id === book.authorId);
        const isFeatured = book.featured || false;
        return `
            <tr draggable="true" data-book-id="${book.id}" 
                ondragstart="handleTableDragStart(event)" 
                ondragover="handleTableDragOver(event)" 
                ondrop="handleTableDrop(event)" 
                ondragend="handleTableDragEnd(event)"
                style="cursor: move;">
                <td class="drag-handle" title="Drag to reorder">
                    <i class="fas fa-grip-vertical"></i>
                </td>
                <td>${book.id}</td>
                <td><strong>${book.title}</strong></td>
                <td>${author ? author.name : book.author}</td>
                <td>${getCategoryDisplayName(book.category)}</td>
                <td>₱${book.price.toFixed(2)}</td>
                <td>₱${(book.shippingFee || 50).toFixed(2)}</td>
                <td>
                    <span class="badge ${book.stock < 10 ? 'warning' : 'success'}">
                        ${book.stock}
                    </span>
                </td>
                <td>
                    <button class="btn-featured ${isFeatured ? 'active' : ''}" onclick="toggleFeatured(${book.id}, ${!isFeatured})" title="${isFeatured ? 'Remove from featured' : 'Add to featured'}">
                        <i class="fas fa-star"></i>
                    </button>
                </td>
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
    document.getElementById('imagePreviewContainer').classList.remove('show');
    document.getElementById('bookModal').classList.add('active');
}

function handleImagePreview(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            document.getElementById('imagePreview').src = event.target.result;
            document.getElementById('imagePreviewContainer').classList.add('show');
        };
        reader.readAsDataURL(file);
    }
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
    document.getElementById('bookRoyalty').value = (book.royaltyRate || 0.30) * 100;
    document.getElementById('bookShipping').value = book.shippingFee || 50;
    document.getElementById('bookWeight').value = book.weight || 0.5;
    
    // Show existing image
    if (book.image) {
        document.getElementById('imagePreview').src = book.image;
        document.getElementById('imagePreviewContainer').classList.add('show');
    }
    
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
    const imageFile = document.getElementById('bookImageFile').files[0];
    
    // Function to save book data
    // Images are stored as base64 data in localStorage, connected to book via unique book.id and book.authorId
    const saveBookData = (imageData) => {
        // Get existing book data to preserve position and featured properties
        const existingBook = bookId ? booksData.find(b => b.id === parseInt(bookId)) : null;
        
        const bookData = {
            id: bookId ? parseInt(bookId) : Date.now(), // Unique book identifier
            title: document.getElementById('bookTitle').value,
            author: author ? author.name : 'Unknown',
            authorId: authorId, // Connects book to author
            category: document.getElementById('bookCategory').value,
            price: parseFloat(document.getElementById('bookPrice').value),
            stock: parseInt(document.getElementById('bookStock').value),
            description: document.getElementById('bookDescription').value,
            isbn: document.getElementById('bookISBN').value,
            pages: parseInt(document.getElementById('bookPages').value) || 0,
            year: parseInt(document.getElementById('bookYear').value) || new Date().getFullYear(),
            royaltyRate: parseFloat(document.getElementById('bookRoyalty').value) / 100 || 0.30,
            shippingFee: parseFloat(document.getElementById('bookShipping').value) || 50,
            weight: parseFloat(document.getElementById('bookWeight').value) || 0.5,
            image: imageData, // Book cover image (base64) - linked to this book via id and authorId
            // Preserve position and featured properties from existing book
            shopPosition: existingBook?.shopPosition !== undefined ? existingBook.shopPosition : booksData.length,
            featured: existingBook?.featured || false,
            featuredPosition: existingBook?.featuredPosition || 999
        };
        
        if (bookId) {
            // Update existing book
            const index = booksData.findIndex(b => b.id === parseInt(bookId));
            if (index !== -1) {
                booksData[index] = bookData;
            }
        } else {
            // Add new book with position at the end
            bookData.shopPosition = booksData.length;
            bookData.featured = false;
            bookData.featuredPosition = 999;
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
        showSuccessModal(bookId ? 'Book updated successfully!' : 'Book added successfully! The book is now live on the website.');
    };
    
    // If new image uploaded, read it
    if (imageFile) {
        const reader = new FileReader();
        reader.onload = function(event) {
            saveBookData(event.target.result);
        };
        reader.readAsDataURL(imageFile);
    } else {
        // Use existing image or default
        const existingImage = bookId ? 
            booksData.find(b => b.id === parseInt(bookId))?.image : 
            'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400';
        saveBookData(existingImage || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400');
    }
}

function deleteBook(bookId) {
    const booksData = JSON.parse(localStorage.getItem('booksData'));
    const book = booksData.find(b => b.id === bookId);
    
    showConfirmModal(
        'Delete Book',
        `Are you sure you want to delete "${book.title}"? This action cannot be undone.`,
        () => {
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
            showSuccessModal('Book deleted successfully!');
        }
    );
}

function toggleFeatured(bookId, shouldFeature) {
    const booksData = JSON.parse(localStorage.getItem('booksData'));
    const book = booksData.find(b => b.id === bookId);
    
    if (!book) return;
    
    const featuredBooks = booksData.filter(b => b.featured);
    
    if (shouldFeature) {
        // Check if already have 6 featured books
        if (featuredBooks.length >= 6) {
            showConfirmModal(
                'Maximum Featured Books',
                'You can only have up to 6 featured books. Do you want to replace the last featured book?',
                () => {
                    // Remove the last featured book
                    const lastFeatured = featuredBooks.sort((a, b) => 
                        (b.featuredPosition || 999) - (a.featuredPosition || 999)
                    )[0];
                    lastFeatured.featured = false;
                    lastFeatured.featuredPosition = 999;
                    
                    // Add new featured book
                    book.featured = true;
                    book.featuredPosition = featuredBooks.length;
                    
                    localStorage.setItem('booksData', JSON.stringify(booksData));
                    loadBooks();
                    showSuccessModal('Featured book updated!');
                }
            );
            return;
        }
        
        book.featured = true;
        book.featuredPosition = featuredBooks.length;
    } else {
        book.featured = false;
        book.featuredPosition = 999;
        
        // Reorder remaining featured books
        booksData.filter(b => b.featured).sort((a, b) => 
            (a.featuredPosition || 999) - (b.featuredPosition || 999)
        ).forEach((b, index) => {
            b.featuredPosition = index;
        });
    }
    
    localStorage.setItem('booksData', JSON.stringify(booksData));
    loadBooks();
    showSuccessModal(shouldFeature ? 'Book added to featured!' : 'Book removed from featured!');
}

// Drag and drop for featured books
let draggedElement = null;

function handleDragStart(e) {
    draggedElement = e.target;
    e.target.style.opacity = '0.4';
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.target.innerHTML);
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }
    e.dataTransfer.dropEffect = 'move';
    return false;
}

function handleDrop(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    }
    
    if (draggedElement !== e.target && e.target.classList.contains('featured-book-card')) {
        const draggedId = parseInt(draggedElement.getAttribute('data-book-id'));
        const targetId = parseInt(e.target.getAttribute('data-book-id'));
        
        const booksData = JSON.parse(localStorage.getItem('booksData'));
        const draggedBook = booksData.find(b => b.id === draggedId);
        const targetBook = booksData.find(b => b.id === targetId);
        
        // Swap positions
        const tempPosition = draggedBook.featuredPosition;
        draggedBook.featuredPosition = targetBook.featuredPosition;
        targetBook.featuredPosition = tempPosition;
        
        localStorage.setItem('booksData', JSON.stringify(booksData));
        loadFeaturedBooks();
    }
    
    return false;
}

function handleDragEnd(e) {
    e.target.style.opacity = '1';
}

// Drag and drop for books table
let draggedTableRow = null;

function handleTableDragStart(e) {
    draggedTableRow = e.currentTarget;
    e.currentTarget.style.opacity = '0.4';
    e.dataTransfer.effectAllowed = 'move';
}

function handleTableDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }
    e.dataTransfer.dropEffect = 'move';
    
    const targetRow = e.currentTarget;
    if (draggedTableRow && draggedTableRow !== targetRow && targetRow.tagName === 'TR') {
        targetRow.style.borderTop = '3px solid var(--primary-color)';
    }
    
    return false;
}

function handleTableDrop(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    }
    
    const targetRow = e.currentTarget;
    targetRow.style.borderTop = '';
    
    if (draggedTableRow !== targetRow && targetRow.tagName === 'TR') {
        const draggedId = parseInt(draggedTableRow.getAttribute('data-book-id'));
        const targetId = parseInt(targetRow.getAttribute('data-book-id'));
        
        const booksData = JSON.parse(localStorage.getItem('booksData'));
        const draggedBook = booksData.find(b => b.id === draggedId);
        const targetBook = booksData.find(b => b.id === targetId);
        
        if (draggedBook && targetBook) {
            // Swap shop positions
            const tempPosition = draggedBook.shopPosition;
            draggedBook.shopPosition = targetBook.shopPosition;
            targetBook.shopPosition = tempPosition;
            
            localStorage.setItem('booksData', JSON.stringify(booksData));
            loadBooks();
            showSuccessModal('Book order updated! Changes will reflect in the shop.');
        }
    }
    
    return false;
}

function handleTableDragEnd(e) {
    e.currentTarget.style.opacity = '1';
    
    // Remove any border highlights
    document.querySelectorAll('#booksTable tr').forEach(row => {
        row.style.borderTop = '';
    });
}

// Modal functions
function showConfirmModal(title, message, callback) {
    document.getElementById('confirmTitle').textContent = title;
    document.getElementById('confirmMessage').textContent = message;
    confirmCallback = callback;
    document.getElementById('confirmModal').classList.add('active');
}

function closeConfirmModal() {
    document.getElementById('confirmModal').classList.remove('active');
    confirmCallback = null;
}

function confirmAction() {
    if (confirmCallback) {
        confirmCallback();
    }
    closeConfirmModal();
}

function showSuccessModal(message) {
    document.getElementById('successMessage').textContent = message;
    document.getElementById('successModal').classList.add('active');
}

function closeSuccessModal() {
    document.getElementById('successModal').classList.remove('active');
}

// Close modal when clicking outside
window.addEventListener('click', function(e) {
    const bookModal = document.getElementById('bookModal');
    const confirmModal = document.getElementById('confirmModal');
    const successModal = document.getElementById('successModal');
    
    if (e.target === bookModal) {
        closeBookModal();
    }
    if (e.target === confirmModal) {
        closeConfirmModal();
    }
    if (e.target === successModal) {
        closeSuccessModal();
    }
});
