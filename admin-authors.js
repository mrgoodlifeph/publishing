// Admin Authors Management
let confirmCallback = null;

document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    const currentUser = checkAuth('admin');
    if (!currentUser) return;

    // Display user name
    document.getElementById('userName').textContent = currentUser.name;

    // Load authors
    loadAuthors();

    // Search filter
    document.getElementById('searchAuthors').addEventListener('input', filterAuthors);

    // Form submission
    document.getElementById('authorForm').addEventListener('submit', handleAuthorSubmit);
});

function loadAuthors() {
    const authorsData = JSON.parse(localStorage.getItem('authorsData') || JSON.stringify(authors));
    localStorage.setItem('authorsData', JSON.stringify(authorsData));
    
    // Calculate sales and royalties for each author
    const authorsWithStats = calculateAuthorStats(authorsData);
    displayAuthors(authorsWithStats);
}

function calculateAuthorStats(authorsData) {
    const booksData = JSON.parse(localStorage.getItem('booksData') || JSON.stringify(products));
    const salesData = JSON.parse(localStorage.getItem('salesData') || '[]');
    
    return authorsData.map(author => {
        const authorBooks = booksData.filter(b => b.authorId === author.id);
        const bookIds = authorBooks.map(b => b.id);
        
        let totalSales = 0;
        let totalRoyalties = 0;
        
        salesData.forEach(sale => {
            sale.items.forEach(item => {
                if (bookIds.includes(item.id)) {
                    const book = booksData.find(p => p.id === item.id);
                    const saleAmount = item.price * item.quantity;
                    totalSales += saleAmount;
                    totalRoyalties += saleAmount * (book.royaltyRate || 0.30);
                }
            });
        });
        
        return {
            ...author,
            totalBooks: authorBooks.length,
            totalSales: totalSales,
            totalRoyalties: totalRoyalties
        };
    });
}

function displayAuthors(authorsToDisplay) {
    const tableBody = document.getElementById('authorsTable');
    
    if (authorsToDisplay.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="9" style="text-align: center; padding: 40px;">No authors found</td></tr>';
        return;
    }

    tableBody.innerHTML = authorsToDisplay.map(author => `
        <tr>
            <td>${author.id}</td>
            <td><strong>${author.name}</strong></td>
            <td>${author.email}</td>
            <td>${author.phone}</td>
            <td>${new Date(author.joinDate).toLocaleDateString('en-PH')}</td>
            <td>
                <span class="badge ${author.totalBooks > 0 ? 'success' : 'warning'}">
                    ${author.totalBooks}
                </span>
            </td>
            <td>₱${author.totalSales.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
            <td>₱${author.totalRoyalties.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
            <td>
                <div class="table-actions">
                    <button class="btn-edit" onclick="editAuthor(${author.id})">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn-view" onclick="viewAuthorDetails(${author.id})">
                        <i class="fas fa-eye"></i> View
                    </button>
                    <button class="btn-delete" onclick="deleteAuthor(${author.id})">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

function filterAuthors() {
    const searchTerm = document.getElementById('searchAuthors').value.toLowerCase();
    const authorsData = JSON.parse(localStorage.getItem('authorsData'));
    const authorsWithStats = calculateAuthorStats(authorsData);
    
    const filtered = authorsWithStats.filter(author => 
        author.name.toLowerCase().includes(searchTerm) ||
        author.email.toLowerCase().includes(searchTerm) ||
        author.phone.includes(searchTerm)
    );
    
    displayAuthors(filtered);
}

function openAddAuthorModal() {
    document.getElementById('modalTitle').textContent = 'Add New Author';
    document.getElementById('authorForm').reset();
    document.getElementById('authorId').value = '';
    document.getElementById('authorJoinDate').value = new Date().toISOString().split('T')[0];
    document.getElementById('authorModal').classList.add('active');
}

function editAuthor(authorId) {
    const authorsData = JSON.parse(localStorage.getItem('authorsData'));
    const author = authorsData.find(a => a.id === authorId);
    
    if (!author) return;
    
    document.getElementById('modalTitle').textContent = 'Edit Author';
    document.getElementById('authorId').value = author.id;
    document.getElementById('authorName').value = author.name;
    document.getElementById('authorEmail').value = author.email;
    document.getElementById('authorPhone').value = author.phone;
    document.getElementById('authorJoinDate').value = author.joinDate;
    document.getElementById('authorPassword').value = '';
    document.getElementById('authorPassword').placeholder = 'Leave blank to keep current password';
    
    document.getElementById('authorModal').classList.add('active');
}

function closeAuthorModal() {
    document.getElementById('authorModal').classList.remove('active');
}

function handleAuthorSubmit(e) {
    e.preventDefault();
    
    const authorsData = JSON.parse(localStorage.getItem('authorsData'));
    const authorId = document.getElementById('authorId').value;
    const newPassword = document.getElementById('authorPassword').value;
    
    const authorData = {
        id: authorId ? parseInt(authorId) : Date.now(),
        name: document.getElementById('authorName').value,
        email: document.getElementById('authorEmail').value,
        phone: document.getElementById('authorPhone').value,
        joinDate: document.getElementById('authorJoinDate').value || new Date().toISOString().split('T')[0],
        totalBooks: 0,
        totalSales: 0,
        totalRoyalties: 0
    };
    
    if (authorId) {
        // Update existing author
        const index = authorsData.findIndex(a => a.id === parseInt(authorId));
        if (index !== -1) {
            authorData.totalBooks = authorsData[index].totalBooks;
            authorData.totalSales = authorsData[index].totalSales;
            authorData.totalRoyalties = authorsData[index].totalRoyalties;
            authorsData[index] = authorData;
        }
    } else {
        // Add new author
        authorsData.push(authorData);
    }
    
    localStorage.setItem('authorsData', JSON.stringify(authorsData));
    
    // Update author users for login
    if (newPassword || !authorId) {
        const authorUsers = JSON.parse(localStorage.getItem('authorUsers') || '[]');
        const password = newPassword || 'author123'; // Default password
        
        if (authorId) {
            const userIndex = authorUsers.findIndex(u => u.id === parseInt(authorId));
            if (userIndex !== -1) {
                authorUsers[userIndex].email = authorData.email;
                if (newPassword) {
                    authorUsers[userIndex].password = password;
                }
                authorUsers[userIndex].authorData = authorData;
            }
        } else {
            authorUsers.push({
                id: authorData.id,
                email: authorData.email,
                password: password,
                role: 'author',
                authorData: authorData
            });
        }
        
        localStorage.setItem('authorUsers', JSON.stringify(authorUsers));
    }
    
    closeAuthorModal();
    loadAuthors();
    showSuccessModal(authorId ? 'Author updated successfully!' : 'Author added successfully!');
}

function deleteAuthor(authorId) {
    const authorsData = JSON.parse(localStorage.getItem('authorsData'));
    const author = authorsData.find(a => a.id === authorId);
    
    showConfirmModal(
        'Delete Author',
        `Are you sure you want to delete "${author.name}"? This will not delete their books, but they won't be able to log in anymore.`,
        () => {
            const filtered = authorsData.filter(a => a.id !== authorId);
            
            localStorage.setItem('authorsData', JSON.stringify(filtered));
            
            // Remove from author users
            const authorUsers = JSON.parse(localStorage.getItem('authorUsers') || '[]');
            const filteredUsers = authorUsers.filter(u => u.id !== authorId);
            localStorage.setItem('authorUsers', JSON.stringify(filteredUsers));
            
            loadAuthors();
            showSuccessModal('Author deleted successfully!');
        }
    );
}

function viewAuthorDetails(authorId) {
    const authorsData = JSON.parse(localStorage.getItem('authorsData'));
    const authorsWithStats = calculateAuthorStats(authorsData);
    const author = authorsWithStats.find(a => a.id === authorId);
    
    if (!author) return;
    
    const booksData = JSON.parse(localStorage.getItem('booksData') || JSON.stringify(products));
    const authorBooks = booksData.filter(b => b.authorId === authorId);
    
    alert(`
Author Details:

Name: ${author.name}
Email: ${author.email}
Phone: ${author.phone}
Join Date: ${new Date(author.joinDate).toLocaleDateString('en-PH')}

Statistics:
Total Books Published: ${author.totalBooks}
Total Sales: ₱${author.totalSales.toLocaleString('en-PH', { minimumFractionDigits: 2 })}
Total Royalties Earned: ₱${author.totalRoyalties.toLocaleString('en-PH', { minimumFractionDigits: 2 })}

Books:
${authorBooks.map(b => `- ${b.title} (₱${b.price})`).join('\n') || 'No books published yet'}
    `);
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
    const authorModal = document.getElementById('authorModal');
    const confirmModal = document.getElementById('confirmModal');
    const successModal = document.getElementById('successModal');
    
    if (e.target === authorModal) {
        closeAuthorModal();
    }
    if (e.target === confirmModal) {
        closeConfirmModal();
    }
    if (e.target === successModal) {
        closeSuccessModal();
    }
});
