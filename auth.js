// Authentication System for MR-GOODLIFE PUBLISHING

// Initialize users (in a real app, this would be handled by a backend)
function initializeUsers() {
    if (!localStorage.getItem('adminUser')) {
        // Default admin credentials (should be changed in production)
        const adminUser = {
            username: 'admin',
            password: 'mrgoodlife2026', // In production, passwords should be hashed
            role: 'admin',
            name: 'Administrator'
        };
        localStorage.setItem('adminUser', JSON.stringify(adminUser));
    }

    if (!localStorage.getItem('authorUsers')) {
        // Initialize author accounts with default passwords
        const authorUsers = authors.map(author => ({
            id: author.id,
            email: author.email,
            password: 'author123', // Default password for all authors
            role: 'author',
            authorData: author
        }));
        localStorage.setItem('authorUsers', JSON.stringify(authorUsers));
    }
}

// Check if user is logged in
function checkAuth(requiredRole) {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser') || 'null');
    
    if (!currentUser) {
        // Redirect to appropriate login page
        if (requiredRole === 'admin') {
            window.location.href = 'admin-login.html';
        } else if (requiredRole === 'author') {
            window.location.href = 'author-login.html';
        }
        return null;
    }
    
    if (requiredRole && currentUser.role !== requiredRole) {
        window.location.href = 'index.html';
        return null;
    }
    
    return currentUser;
}

// Logout function
function logout() {
    sessionStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

// Admin Login Handler
if (window.location.pathname.includes('admin-login.html')) {
    document.addEventListener('DOMContentLoaded', function() {
        initializeUsers();
        
        const form = document.getElementById('adminLoginForm');
        const errorMessage = document.getElementById('errorMessage');
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            const adminUser = JSON.parse(localStorage.getItem('adminUser'));
            
            if (username === adminUser.username && password === adminUser.password) {
                // Successful login
                const sessionUser = {
                    username: adminUser.username,
                    role: adminUser.role,
                    name: adminUser.name
                };
                sessionStorage.setItem('currentUser', JSON.stringify(sessionUser));
                window.location.href = 'admin-dashboard.html';
            } else {
                // Failed login
                errorMessage.textContent = 'Invalid username or password';
                errorMessage.classList.remove('hidden');
            }
        });
    });
}

// Author Login Handler
if (window.location.pathname.includes('author-login.html')) {
    document.addEventListener('DOMContentLoaded', function() {
        initializeUsers();
        
        const form = document.getElementById('authorLoginForm');
        const errorMessage = document.getElementById('errorMessage');
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            const authorUsers = JSON.parse(localStorage.getItem('authorUsers'));
            const authorUser = authorUsers.find(u => u.email === email);
            
            if (authorUser && password === authorUser.password) {
                // Successful login
                const sessionUser = {
                    id: authorUser.id,
                    email: authorUser.email,
                    role: authorUser.role,
                    name: authorUser.authorData.name
                };
                sessionStorage.setItem('currentUser', JSON.stringify(sessionUser));
                window.location.href = 'author-dashboard.html';
            } else {
                // Failed login
                errorMessage.textContent = 'Invalid email or password';
                errorMessage.classList.remove('hidden');
            }
        });
    });
}
