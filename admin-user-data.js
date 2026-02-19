// Admin User Data Management
let currentRecord = null;
let currentRecordType = null;

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    loadAllData();
    updateStats();
    
    // Search on Enter key
    document.getElementById('searchQuery').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchUserData();
        }
    });
});

// Load all user data
function loadAllData() {
    loadOrdersData();
    loadContactsData();
}

// Load orders data
function loadOrdersData(filteredOrders = null) {
    const orders = filteredOrders || JSON.parse(localStorage.getItem('orders') || '[]');
    const tbody = document.getElementById('ordersDataTable');
    
    if (orders.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" class="empty-state">No order data available</td></tr>';
        return;
    }
    
    // Sort by date (newest first)
    orders.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
    
    tbody.innerHTML = orders.map((order, index) => `
        <tr>
            <td>${escapeHtml(order.orderNumber)}</td>
            <td>${formatDate(order.orderDate)}</td>
            <td>${escapeHtml(order.customer.firstName)} ${escapeHtml(order.customer.lastName)}</td>
            <td>${escapeHtml(order.customer.email)}</td>
            <td>${escapeHtml(order.customer.phone)}</td>
            <td>${escapeHtml(order.customer.address)}, ${escapeHtml(order.customer.city)}</td>
            <td>
                <button class="btn-action btn-view" onclick="viewOrderData('${order.orderNumber}')" title="View Details">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn-action btn-delete" onclick="deleteOrderData('${order.orderNumber}')" title="Delete">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

// Load contacts data
function loadContactsData(filteredContacts = null) {
    const contacts = filteredContacts || JSON.parse(localStorage.getItem('contactMessages') || '[]');
    const tbody = document.getElementById('contactsDataTable');
    
    if (contacts.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="empty-state">No contact data available</td></tr>';
        return;
    }
    
    // Sort by date (newest first)
    contacts.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    tbody.innerHTML = contacts.map(contact => `
        <tr>
            <td>${formatDate(contact.date)}</td>
            <td>${escapeHtml(contact.name)}</td>
            <td>${escapeHtml(contact.email)}</td>
            <td>${escapeHtml(contact.phone)}</td>
            <td>${escapeHtml(contact.subject)}</td>
            <td>
                <button class="btn-action btn-view" onclick="viewContactData(${contact.id})" title="View Details">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn-action btn-delete" onclick="deleteContactData(${contact.id})" title="Delete">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

// Search user data
function searchUserData() {
    const query = document.getElementById('searchQuery').value.toLowerCase().trim();
    
    if (!query) {
        loadAllData();
        return;
    }
    
    // Search in orders
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const filteredOrders = orders.filter(order => 
        order.orderNumber.toLowerCase().includes(query) ||
        order.customer.firstName.toLowerCase().includes(query) ||
        order.customer.lastName.toLowerCase().includes(query) ||
        order.customer.email.toLowerCase().includes(query) ||
        order.customer.phone.includes(query) ||
        order.customer.address.toLowerCase().includes(query)
    );
    
    // Search in contacts
    const contacts = JSON.parse(localStorage.getItem('contactMessages') || '[]');
    const filteredContacts = contacts.filter(contact =>
        contact.name.toLowerCase().includes(query) ||
        contact.email.toLowerCase().includes(query) ||
        contact.phone.includes(query) ||
        contact.subject.toLowerCase().includes(query)
    );
    
    loadOrdersData(filteredOrders);
    loadContactsData(filteredContacts);
    
    showNotification(`Found ${filteredOrders.length} orders and ${filteredContacts.length} contact submissions`);
}

// View order data details
function viewOrderData(orderNumber) {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const order = orders.find(o => o.orderNumber === orderNumber);
    
    if (!order) return;
    
    currentRecord = order;
    currentRecordType = 'order';
    
    document.getElementById('detailsModalBody').innerHTML = `
        <div class="user-data-details">
            <h3>Order Information</h3>
            <div class="info-row">
                <strong>Order Number:</strong>
                <span>${escapeHtml(order.orderNumber)}</span>
            </div>
            <div class="info-row">
                <strong>Order Date:</strong>
                <span>${formatDate(order.orderDate)}</span>
            </div>
            <div class="info-row">
                <strong>Status:</strong>
                <span class="status-badge status-${order.status}">${order.status}</span>
            </div>
            
            <h3>Customer Information</h3>
            <div class="info-row">
                <strong>Full Name:</strong>
                <span>${escapeHtml(order.customer.firstName)} ${escapeHtml(order.customer.lastName)}</span>
            </div>
            <div class="info-row">
                <strong>Email:</strong>
                <span>${escapeHtml(order.customer.email)}</span>
            </div>
            <div class="info-row">
                <strong>Phone:</strong>
                <span>${escapeHtml(order.customer.phone)}</span>
            </div>
            <div class="info-row">
                <strong>Address:</strong>
                <span>${escapeHtml(order.customer.address)}</span>
            </div>
            <div class="info-row">
                <strong>City:</strong>
                <span>${escapeHtml(order.customer.city)}</span>
            </div>
            <div class="info-row">
                <strong>Province:</strong>
                <span>${escapeHtml(order.customer.province)}</span>
            </div>
            <div class="info-row">
                <strong>Zip Code:</strong>
                <span>${escapeHtml(order.customer.zipcode)}</span>
            </div>
            ${order.customer.notes ? `
            <div class="info-row">
                <strong>Notes:</strong>
                <span>${escapeHtml(order.customer.notes)}</span>
            </div>
            ` : ''}
            
            <h3>Order Details</h3>
            <div class="info-row">
                <strong>Payment Method:</strong>
                <span>${order.paymentMethod.toUpperCase()}</span>
            </div>
            <div class="info-row">
                <strong>Total Amount:</strong>
                <span>₱${order.total.toFixed(2)}</span>
            </div>
            <div class="info-row">
                <strong>Items:</strong>
                <span>${order.items.length} item(s)</span>
            </div>
        </div>
    `;
    
    document.getElementById('detailsModal').style.display = 'block';
}

// View contact data details
function viewContactData(id) {
    const contacts = JSON.parse(localStorage.getItem('contactMessages') || '[]');
    const contact = contacts.find(c => c.id === id);
    
    if (!contact) return;
    
    currentRecord = contact;
    currentRecordType = 'contact';
    
    document.getElementById('detailsModalBody').innerHTML = `
        <div class="user-data-details">
            <h3>Contact Information</h3>
            <div class="info-row">
                <strong>Submission Date:</strong>
                <span>${formatDate(contact.date)}</span>
            </div>
            <div class="info-row">
                <strong>Name:</strong>
                <span>${escapeHtml(contact.name)}</span>
            </div>
            <div class="info-row">
                <strong>Email:</strong>
                <span>${escapeHtml(contact.email)}</span>
            </div>
            <div class="info-row">
                <strong>Phone:</strong>
                <span>${escapeHtml(contact.phone)}</span>
            </div>
            <div class="info-row">
                <strong>Subject:</strong>
                <span>${escapeHtml(contact.subject)}</span>
            </div>
            <div class="info-row">
                <strong>Status:</strong>
                <span class="status-badge status-${contact.status}">${contact.status}</span>
            </div>
            <div class="message-content">
                <strong>Message:</strong>
                <p>${escapeHtml(contact.message).replace(/\n/g, '<br>')}</p>
            </div>
        </div>
    `;
    
    document.getElementById('detailsModal').style.display = 'block';
}

// Delete order data
function deleteOrderData(orderNumber) {
    if (!confirm('Are you sure you want to delete this customer\'s order data? This action cannot be undone.')) return;
    
    let orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders = orders.filter(o => o.orderNumber !== orderNumber);
    localStorage.setItem('orders', JSON.stringify(orders));
    
    loadOrdersData();
    updateStats();
    showNotification('Order data deleted successfully');
}

// Delete contact data
function deleteContactData(id) {
    if (!confirm('Are you sure you want to delete this contact submission? This action cannot be undone.')) return;
    
    let contacts = JSON.parse(localStorage.getItem('contactMessages') || '[]');
    contacts = contacts.filter(c => c.id !== id);
    localStorage.setItem('contactMessages', JSON.stringify(contacts));
    
    loadContactsData();
    updateStats();
    showNotification('Contact data deleted successfully');
}

// Delete current record from modal
function deleteCurrentRecord() {
    if (!currentRecord || !currentRecordType) return;
    
    if (currentRecordType === 'order') {
        deleteOrderData(currentRecord.orderNumber);
    } else if (currentRecordType === 'contact') {
        deleteContactData(currentRecord.id);
    }
    
    closeDetailsModal();
}

// Delete all orders data
function deleteAllOrdersData() {
    if (!confirm('⚠️ WARNING: This will permanently delete ALL customer order data. This action cannot be undone. Are you absolutely sure?')) return;
    
    // Double confirmation
    const confirmation = prompt('Type "DELETE ALL ORDERS" to confirm:');
    if (confirmation !== 'DELETE ALL ORDERS') {
        showNotification('Deletion cancelled');
        return;
    }
    
    localStorage.setItem('orders', '[]');
    loadOrdersData();
    updateStats();
    showNotification('All order data has been deleted');
}

// Delete all contacts data
function deleteAllContactsData() {
    if (!confirm('⚠️ WARNING: This will permanently delete ALL contact message data. This action cannot be undone. Are you absolutely sure?')) return;
    
    // Double confirmation
    const confirmation = prompt('Type "DELETE ALL CONTACTS" to confirm:');
    if (confirmation !== 'DELETE ALL CONTACTS') {
        showNotification('Deletion cancelled');
        return;
    }
    
    localStorage.setItem('contactMessages', '[]');
    loadContactsData();
    updateStats();
    showNotification('All contact data has been deleted');
}

// Close modal
function closeDetailsModal() {
    document.getElementById('detailsModal').style.display = 'none';
    currentRecord = null;
    currentRecordType = null;
}

// Update statistics
function updateStats() {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const contacts = JSON.parse(localStorage.getItem('contactMessages') || '[]');
    
    document.getElementById('totalCustomers').textContent = orders.length;
    document.getElementById('totalContacts').textContent = contacts.length;
    document.getElementById('totalRecords').textContent = orders.length + contacts.length;
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    if (!text) return 'N/A';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Show notification
function showNotification(message) {
    alert(message);
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('detailsModal');
    if (event.target === modal) {
        closeDetailsModal();
    }
}
