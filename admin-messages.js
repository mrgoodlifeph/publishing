// Admin Messages Management
let currentMessage = null;

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    loadMessages();
    updateStats();
    
    // Status filter
    document.getElementById('statusFilter').addEventListener('change', function() {
        loadMessages(this.value);
    });
});

// Load and display messages
function loadMessages(filter = 'all') {
    const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
    const tbody = document.getElementById('messagesTable');
    
    // Filter messages
    let filteredMessages = messages;
    if (filter !== 'all') {
        filteredMessages = messages.filter(m => m.status === filter);
    }
    
    // Sort by date (newest first)
    filteredMessages.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    if (filteredMessages.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" class="empty-state">No messages found</td></tr>';
        return;
    }
    
    tbody.innerHTML = filteredMessages.map(message => `
        <tr class="${message.status === 'unread' ? 'unread-message' : ''}">
            <td>
                <span class="status-badge status-${message.status}">
                    ${message.status}
                </span>
            </td>
            <td>${formatDate(message.date)}</td>
            <td>${escapeHtml(message.name)}</td>
            <td>${escapeHtml(message.email)}</td>
            <td>${escapeHtml(message.phone)}</td>
            <td>${escapeHtml(message.subject)}</td>
            <td>
                <button class="btn-action btn-view" onclick="viewMessage(${message.id})" title="View Message">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn-action btn-edit" onclick="markAsRead(${message.id})" title="Mark as Read">
                    <i class="fas fa-check"></i>
                </button>
                <button class="btn-action btn-delete" onclick="deleteMessage(${message.id})" title="Delete">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

// View message details
function viewMessage(id) {
    const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
    const message = messages.find(m => m.id === id);
    
    if (!message) return;
    
    currentMessage = message;
    
    // Mark as read automatically when viewing
    if (message.status === 'unread') {
        message.status = 'read';
        localStorage.setItem('contactMessages', JSON.stringify(messages));
        loadMessages(document.getElementById('statusFilter').value);
        updateStats();
    }
    
    document.getElementById('messageModalBody').innerHTML = `
        <div class="message-details">
            <div class="info-row">
                <strong>From:</strong>
                <span>${escapeHtml(message.name)}</span>
            </div>
            <div class="info-row">
                <strong>Email:</strong>
                <span><a href="mailto:${escapeHtml(message.email)}">${escapeHtml(message.email)}</a></span>
            </div>
            <div class="info-row">
                <strong>Phone:</strong>
                <span>${escapeHtml(message.phone)}</span>
            </div>
            <div class="info-row">
                <strong>Subject:</strong>
                <span>${escapeHtml(message.subject)}</span>
            </div>
            <div class="info-row">
                <strong>Date:</strong>
                <span>${formatDate(message.date)}</span>
            </div>
            <div class="info-row">
                <strong>Status:</strong>
                <span class="status-badge status-${message.status}">${message.status}</span>
            </div>
            <div class="message-content">
                <strong>Message:</strong>
                <p>${escapeHtml(message.message).replace(/\n/g, '<br>')}</p>
            </div>
            <div class="message-actions">
                <button class="btn btn-success" onclick="markAsReplied(${message.id})">
                    <i class="fas fa-check-circle"></i> Mark as Replied
                </button>
            </div>
        </div>
    `;
    
    document.getElementById('messageModal').style.display = 'block';
}

// Close modal
function closeMessageModal() {
    document.getElementById('messageModal').style.display = 'none';
    currentMessage = null;
}

// Mark message as read
function markAsRead(id) {
    const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
    const message = messages.find(m => m.id === id);
    
    if (message) {
        message.status = 'read';
        localStorage.setItem('contactMessages', JSON.stringify(messages));
        loadMessages(document.getElementById('statusFilter').value);
        updateStats();
        showNotification('Message marked as read');
    }
}

// Mark message as replied
function markAsReplied(id) {
    const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
    const message = messages.find(m => m.id === id);
    
    if (message) {
        message.status = 'replied';
        localStorage.setItem('contactMessages', JSON.stringify(messages));
        closeMessageModal();
        loadMessages(document.getElementById('statusFilter').value);
        updateStats();
        showNotification('Message marked as replied');
    }
}

// Delete message
function deleteMessage(id) {
    if (!confirm('Are you sure you want to delete this message?')) return;
    
    let messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
    messages = messages.filter(m => m.id !== id);
    localStorage.setItem('contactMessages', JSON.stringify(messages));
    loadMessages(document.getElementById('statusFilter').value);
    updateStats();
    showNotification('Message deleted successfully');
}

// Delete all messages
function deleteAllMessages() {
    if (!confirm('Are you sure you want to delete ALL messages? This action cannot be undone.')) return;
    
    localStorage.setItem('contactMessages', '[]');
    loadMessages();
    updateStats();
    showNotification('All messages deleted');
}

// Update statistics
function updateStats() {
    const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
    
    document.getElementById('totalMessages').textContent = messages.length;
    document.getElementById('unreadMessages').textContent = messages.filter(m => m.status === 'unread').length;
    document.getElementById('repliedMessages').textContent = messages.filter(m => m.status === 'replied').length;
}

// Open email client to reply
function openEmailClient() {
    if (!currentMessage) return;
    
    const subject = encodeURIComponent(`Re: ${currentMessage.subject}`);
    const body = encodeURIComponent(`\n\n---\nOriginal message from ${currentMessage.name}:\n${currentMessage.message}`);
    
    window.location.href = `mailto:${currentMessage.email}?subject=${subject}&body=${body}`;
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
    const modal = document.getElementById('messageModal');
    if (event.target === modal) {
        closeMessageModal();
    }
}
