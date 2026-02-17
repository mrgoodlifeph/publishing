// Product Database for MR-GOODLIFE PUBLISHING
// Check if we have custom books data in localStorage first
let products = JSON.parse(localStorage.getItem('booksData') || 'null') || [
    // Law Books
    {
        id: 1,
        title: "Philippine Civil Law: Principles and Applications",
        author: "Atty. Ricardo Santos",
        authorId: 1,
        category: "law",
        price: 1250,
        image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400",
        description: "Comprehensive guide to Philippine civil law including obligations, contracts, property rights, and family law. Essential for law students and practitioners.",
        isbn: "978-1-234567-89-0",
        pages: 850,
        year: 2024,
        stock: 15,
        royaltyRate: 0.15
    },
    {
        id: 2,
        title: "Criminal Law Review: Philippine Revised Penal Code",
        author: "Judge Maria Elena Cruz",
        authorId: 2,
        category: "law",
        price: 1100,
        image: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=400",
        description: "Updated analysis of the Revised Penal Code with recent Supreme Court decisions and interpretations. Perfect for bar exam preparation.",
        isbn: "978-1-234567-90-6",
        pages: 720,
        year: 2025,
        stock: 20,
        royaltyRate: 0.15
    },
    {
        id: 3,
        title: "Constitutional Law in the Philippines",
        author: "Prof. Antonio Bautista",
        authorId: 3,
        category: "law",
        price: 1350,
        image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400",
        description: "In-depth examination of Philippine constitutional law, bill of rights, and landmark cases. Standard textbook for constitutional law courses.",
        isbn: "978-1-234567-91-3",
        pages: 920,
        year: 2024,
        stock: 12,
        royaltyRate: 0.15
    },
    {
        id: 4,
        title: "Labor Law and Social Legislation",
        author: "Atty. Carmen Reyes",
        authorId: 4,
        category: "law",
        price: 980,
        image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400",
        description: "Complete coverage of Philippine labor laws, employment regulations, and social legislation. Updated with recent DOLE issuances.",
        isbn: "978-1-234567-92-0",
        pages: 680,
        year: 2025,
        stock: 18,
        royaltyRate: 0.15
    },
    
    // Business and Finance Books
    {
        id: 5,
        title: "Strategic Business Management for Filipinos",
        author: "Dr. Ramon Cruz",
        authorId: 5,
        category: "business",
        price: 850,
        image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=400",
        description: "Essential principles and practices for effective business management in the Philippine context. Perfect for students and aspiring entrepreneurs.",
        isbn: "978-1-234567-93-7",
        pages: 450,
        year: 2024,
        stock: 25,
        royaltyRate: 0.12
    },
    {
        id: 6,
        title: "Financial Accounting Made Simple",
        author: "CPA Maria Santos",
        authorId: 6,
        category: "business",
        price: 780,
        image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400",
        description: "Learn fundamental accounting principles with practical examples. Ideal for business students and small business owners.",
        isbn: "978-1-234567-94-4",
        pages: 520,
        year: 2025,
        stock: 30,
        royaltyRate: 0.12
    },
    {
        id: 7,
        title: "Investment Strategies for Filipinos",
        author: "José Tan Jr.",
        authorId: 7,
        category: "business",
        price: 920,
        image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400",
        description: "Navigate stocks, bonds, mutual funds, and real estate. Build wealth through smart investment decisions tailored to Philippine market.",
        isbn: "978-1-234567-95-1",
        pages: 580,
        year: 2025,
        stock: 22,
        royaltyRate: 0.12
    },
    {
        id: 8,
        title: "Entrepreneurship in the Digital Era",
        author: "Sandra Diaz",
        authorId: 8,
        category: "business",
        price: 650,
        image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=400",
        description: "Navigate the challenges and opportunities of starting a business in today's digital landscape. Real Philippine case studies included.",
        isbn: "978-1-234567-96-8",
        pages: 380,
        year: 2025,
        stock: 28,
        royaltyRate: 0.12
    },
    
    // Christian & Spiritual Books
    {
        id: 9,
        title: "Walking with Faith: A Daily Devotional",
        author: "Pastor David Reyes",
        authorId: 9,
        category: "christian",
        price: 450,
        image: "https://images.unsplash.com/photo-1505682634904-d7c8d95cdc50?w=400",
        description: "365 days of inspiring devotions to strengthen your faith journey. Scripture-based reflections with practical applications.",
        isbn: "978-1-234567-97-5",
        pages: 420,
        year: 2024,
        stock: 35,
        royaltyRate: 0.10
    },
    {
        id: 10,
        title: "Prayer and Purpose: Finding God's Will",
        author: "Rev. Grace Mendoza",
        authorId: 10,
        category: "christian",
        price: 520,
        image: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=400",
        description: "Discover God's purpose for your life through prayer and spiritual reflection. Biblical guidance for life decisions.",
        isbn: "978-1-234567-98-2",
        pages: 350,
        year: 2025,
        stock: 30,
        royaltyRate: 0.10
    },
    {
        id: 11,
        title: "The Gospel in Filipino Context",
        author: "Dr. Benjamin Torres",
        authorId: 11,
        category: "christian",
        price: 680,
        image: "https://images.unsplash.com/photo-1519491050282-cf00c82424b4?w=400",
        description: "Understanding and applying biblical principles in Philippine culture. A theological and cultural exploration.",
        isbn: "978-1-234567-99-9",
        pages: 480,
        year: 2024,
        stock: 20,
        royaltyRate: 0.10
    },
    {
        id: 12,
        title: "Christian Living in Modern Times",
        author: "Sis. Elena Garcia",
        authorId: 12,
        category: "christian",
        price: 420,
        image: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=400",
        description: "Practical guidance for living a Christian life in today's challenging world. Faith-based solutions to modern problems.",
        isbn: "978-1-234568-00-2",
        pages: 320,
        year: 2025,
        stock: 32,
        royaltyRate: 0.10
    },
    
    // Children Books
    {
        id: 13,
        title: "My First Science Book",
        author: "Teacher Ana Mendoza",
        authorId: 13,
        category: "children",
        price: 250,
        image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400",
        description: "Make learning fun! An illustrated introduction to basic scientific concepts for young learners ages 6-10.",
        isbn: "978-1-234568-01-9",
        pages: 128,
        year: 2025,
        stock: 45,
        royaltyRate: 0.10
    },
    {
        id: 14,
        title: "Adventures in Math Land",
        author: "Teacher Ben Ramos",
        authorId: 14,
        category: "children",
        price: 280,
        image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400",
        description: "Join Max and Maya on exciting adventures while learning mathematics! Colorfully illustrated with fun exercises.",
        isbn: "978-1-234568-02-6",
        pages: 150,
        year: 2025,
        stock: 50,
        royaltyRate: 0.10
    },
    {
        id: 15,
        title: "The Curious Rainbow",
        author: "Joy Alvarez",
        authorId: 15,
        category: "children",
        price: 220,
        image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400",
        description: "A beautifully illustrated picture book about colors, friendship, and accepting differences. Ages 4-8.",
        isbn: "978-1-234568-03-3",
        pages: 96,
        year: 2025,
        stock: 55,
        royaltyRate: 0.10
    },
    {
        id: 16,
        title: "Fun with Numbers",
        author: "Teacher Rosa Cruz",
        authorId: 16,
        category: "children",
        price: 260,
        image: "https://images.unsplash.com/photo-1509266272358-7701da638078?w=400",
        description: "Make math enjoyable with games, puzzles, and activities. Perfect for early learners developing number sense.",
        isbn: "978-1-234568-04-0",
        pages: 140,
        year: 2025,
        stock: 48,
        royaltyRate: 0.10
    },
    {
        id: 17,
        title: "Tales from Cagayan Valley",
        author: "Lola Maria Garcia",
        authorId: 17,
        category: "children",
        price: 320,
        image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400",
        description: "A collection of heartwarming Filipino folktales set in the beautiful landscapes of Cagayan Valley. Ages 8-12.",
        isbn: "978-1-234568-05-7",
        pages: 180,
        year: 2025,
        stock: 40,
        royaltyRate: 0.10
    },
    
    // Self-help Books
    {
        id: 18,
        title: "Mindfulness for Filipinos",
        author: "Dr. Patricia Flores",
        authorId: 18,
        category: "selfhelp",
        price: 580,
        image: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=400",
        description: "Discover peace and balance through mindfulness practices adapted to Filipino lifestyle. Reduce stress and find inner calm.",
        isbn: "978-1-234568-06-4",
        pages: 380,
        year: 2024,
        stock: 28,
        royaltyRate: 0.12
    },
    {
        id: 19,
        title: "The Power of Positive Thinking",
        author: "Angela Torres",
        authorId: 19,
        category: "selfhelp",
        price: 520,
        image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=400",
        description: "Transform your life through the power of positive thinking. Practical strategies to overcome negativity and achieve success.",
        isbn: "978-1-234568-07-1",
        pages: 340,
        year: 2025,
        stock: 32,
        royaltyRate: 0.12
    },
    {
        id: 20,
        title: "Goal Setting and Success",
        author: "Roberto Vasquez",
        authorId: 20,
        category: "selfhelp",
        price: 480,
        image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400",
        description: "Learn proven techniques for setting and achieving your goals. Turn your dreams into actionable plans.",
        isbn: "978-1-234568-08-8",
        pages: 310,
        year: 2025,
        stock: 30,
        royaltyRate: 0.12
    },
    {
        id: 21,
        title: "Emotional Intelligence for Success",
        author: "Dr. Linda Santos",
        authorId: 21,
        category: "selfhelp",
        price: 620,
        image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400",
        description: "Master your emotions and improve relationships. Develop EQ skills for personal and professional success.",
        isbn: "978-1-234568-09-5",
        pages: 420,
        year: 2024,
        stock: 25,
        royaltyRate: 0.12
    },
    {
        id: 22,
        title: "Building Confidence and Self-Esteem",
        author: "Prof. Carlos Manila",
        authorId: 22,
        category: "selfhelp",
        price: 550,
        image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400",
        description: "Overcome self-doubt and build lasting confidence. Practical exercises to boost self-esteem and self-worth.",
        isbn: "978-1-234568-10-1",
        pages: 360,
        year: 2025,
        stock: 27,
        royaltyRate: 0.12
    },
    
    // Others (General/Miscellaneous)
    {
        id: 23,
        title: "Cooking with Lola: Filipino Recipes",
        author: "Chef Maria Gonzales",
        authorId: 23,
        category: "others",
        price: 480,
        image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400",
        description: "Traditional Filipino recipes passed down through generations. Learn to cook authentic dishes with step-by-step instructions.",
        isbn: "978-1-234568-11-8",
        pages: 260,
        year: 2025,
        stock: 35,
        royaltyRate: 0.10
    },
    {
        id: 24,
        title: "Travel Guide to Philippine Hidden Gems",
        author: "Marco Rivera",
        authorId: 24,
        category: "others",
        price: 650,
        image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400",
        description: "Explore undiscovered destinations across the Philippines. Complete travel guide with tips, maps, and local insights.",
        isbn: "978-1-234568-12-5",
        pages: 420,
        year: 2025,
        stock: 22,
        royaltyRate: 0.10
    },
    {
        id: 25,
        title: "Photography Basics for Beginners",
        author: "Alex Cruz",
        authorId: 25,
        category: "others",
        price: 720,
        image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=400",
        description: "Master the fundamentals of photography. From camera settings to composition techniques for stunning photos.",
        isbn: "978-1-234568-13-2",
        pages: 380,
        year: 2024,
        stock: 20,
        royaltyRate: 0.10
    },
    {
        id: 26,
        title: "Gardening in the Tropics",
        author: "Nina Fernandez",
        authorId: 26,
        category: "others",
        price: 520,
        image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400",
        description: "Complete guide to growing plants, vegetables, and herbs in tropical climate. Perfect for Philippine gardeners.",
        isbn: "978-1-234568-14-9",
        pages: 320,
        year: 2025,
        stock: 28,
        royaltyRate: 0.10
    },
    {
        id: 27,
        title: "Creative Writing Workshop",
        author: "Thomas Rivera",
        authorId: 27,
        category: "others",
        price: 580,
        image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400",
        description: "Unlock your creativity with proven techniques and exercises. From basic writing skills to advanced storytelling.",
        isbn: "978-1-234568-15-6",
        pages: 290,
        year: 2025,
        stock: 24,
        royaltyRate: 0.10
    }
];

// Initialize localStorage with default products if not already set
if (!localStorage.getItem('booksData')) {
    localStorage.setItem('booksData', JSON.stringify(products));
}

// Ensure products array is up to date with localStorage
products = JSON.parse(localStorage.getItem('booksData'));

// Authors Database
let authors = JSON.parse(localStorage.getItem('authorsData') || 'null') || [
    { id: 1, name: "Atty. Ricardo Santos", email: "ricardo.santos@email.com", phone: "+639171234567", joinDate: "2023-01-15", totalBooks: 1, totalSales: 0, totalRoyalties: 0 },
    { id: 2, name: "Judge Maria Elena Cruz", email: "maria.cruz@email.com", phone: "+639181234568", joinDate: "2023-02-20", totalBooks: 1, totalSales: 0, totalRoyalties: 0 },
    { id: 3, name: "Prof. Antonio Bautista", email: "antonio.bautista@email.com", phone: "+639191234569", joinDate: "2023-03-10", totalBooks: 1, totalSales: 0, totalRoyalties: 0 },
    { id: 4, name: "Atty. Carmen Reyes", email: "carmen.reyes@email.com", phone: "+639201234570", joinDate: "2023-04-05", totalBooks: 1, totalSales: 0, totalRoyalties: 0 },
    { id: 5, name: "Dr. Ramon Cruz", email: "ramon.cruz@email.com", phone: "+639211234571", joinDate: "2023-05-12", totalBooks: 1, totalSales: 0, totalRoyalties: 0 },
    { id: 6, name: "CPA Maria Santos", email: "cpa.maria@email.com", phone: "+639221234572", joinDate: "2023-06-18", totalBooks: 1, totalSales: 0, totalRoyalties: 0 },
    { id: 7, name: "José Tan Jr.", email: "jose.tan@email.com", phone: "+639231234573", joinDate: "2023-07-22", totalBooks: 1, totalSales: 0, totalRoyalties: 0 },
    { id: 8, name: "Sandra Diaz", email: "sandra.diaz@email.com", phone: "+639241234574", joinDate: "2023-08-30", totalBooks: 1, totalSales: 0, totalRoyalties: 0 },
    { id: 9, name: "Pastor David Reyes", email: "pastor.david@email.com", phone: "+639251234575", joinDate: "2023-09-14", totalBooks: 1, totalSales: 0, totalRoyalties: 0 },
    { id: 10, name: "Rev. Grace Mendoza", email: "rev.grace@email.com", phone: "+639261234576", joinDate: "2023-10-08", totalBooks: 1, totalSales: 0, totalRoyalties: 0 },
    { id: 11, name: "Dr. Benjamin Torres", email: "ben.torres@email.com", phone: "+639271234577", joinDate: "2023-11-19", totalBooks: 1, totalSales: 0, totalRoyalties: 0 },
    { id: 12, name: "Sis. Elena Garcia", email: "elena.garcia@email.com", phone: "+639281234578", joinDate: "2023-12-03", totalBooks: 1, totalSales: 0, totalRoyalties: 0 },
    { id: 13, name: "Teacher Ana Mendoza", email: "ana.mendoza@email.com", phone: "+639291234579", joinDate: "2024-01-10", totalBooks: 1, totalSales: 0, totalRoyalties: 0 },
    { id: 14, name: "Teacher Ben Ramos", email: "ben.ramos@email.com", phone: "+639301234580", joinDate: "2024-02-14", totalBooks: 1, totalSales: 0, totalRoyalties: 0 },
    { id: 15, name: "Joy Alvarez", email: "joy.alvarez@email.com", phone: "+639311234581", joinDate: "2024-03-20", totalBooks: 1, totalSales: 0, totalRoyalties: 0 },
    { id: 16, name: "Teacher Rosa Cruz", email: "rosa.cruz@email.com", phone: "+639321234582", joinDate: "2024-04-25", totalBooks: 1, totalSales: 0, totalRoyalties: 0 },
    { id: 17, name: "Lola Maria Garcia", email: "lola.maria@email.com", phone: "+639331234583", joinDate: "2024-05-30", totalBooks: 1, totalSales: 0, totalRoyalties: 0 },
    { id: 18, name: "Dr. Patricia Flores", email: "patricia.flores@email.com", phone: "+639341234584", joinDate: "2024-06-15", totalBooks: 1, totalSales: 0, totalRoyalties: 0 },
    { id: 19, name: "Angela Torres", email: "angela.torres@email.com", phone: "+639351234585", joinDate: "2024-07-22", totalBooks: 1, totalSales: 0, totalRoyalties: 0 },
    { id: 20, name: "Roberto Vasquez", email: "roberto.vasquez@email.com", phone: "+639361234586", joinDate: "2024-08-18", totalBooks: 1, totalSales: 0, totalRoyalties: 0 },
    { id: 21, name: "Dr. Linda Santos", email: "linda.santos@email.com", phone: "+639371234587", joinDate: "2024-09-10", totalBooks: 1, totalSales: 0, totalRoyalties: 0 },
    { id: 22, name: "Prof. Carlos Manila", email: "carlos.manila@email.com", phone: "+639381234588", joinDate: "2024-10-05", totalBooks: 1, totalSales: 0, totalRoyalties: 0 },
    { id: 23, name: "Chef Maria Gonzales", email: "chef.maria@email.com", phone: "+639391234589", joinDate: "2024-11-12", totalBooks: 1, totalSales: 0, totalRoyalties: 0 },
    { id: 24, name: "Marco Rivera", email: "marco.rivera@email.com", phone: "+639401234590", joinDate: "2024-12-01", totalBooks: 1, totalSales: 0, totalRoyalties: 0 },
    { id: 25, name: "Alex Cruz", email: "alex.cruz@email.com", phone: "+639411234591", joinDate: "2025-01-08", totalBooks: 1, totalSales: 0, totalRoyalties: 0 },
    { id: 26, name: "Nina Fernandez", email: "nina.fernandez@email.com", phone: "+639421234592", joinDate: "2025-01-20", totalBooks: 1, totalSales: 0, totalRoyalties: 0 },
    { id: 27, name: "Thomas Rivera", email: "thomas.rivera@email.com", phone: "+639431234593", joinDate: "2025-02-01", totalBooks: 1, totalSales: 0, totalRoyalties: 0 }
];

// Initialize localStorage with default authors if not already set
if (!localStorage.getItem('authorsData')) {
    localStorage.setItem('authorsData', JSON.stringify(authors));
}

// Ensure authors array is up to date with localStorage
authors = JSON.parse(localStorage.getItem('authorsData'));

// Sales Data - Tracks all sales transactions
let salesData = JSON.parse(localStorage.getItem('salesData') || '[]');

// Initialize cart from localStorage
function initializeCart() {
    const cart = localStorage.getItem('cart');
    if (!cart) {
        localStorage.setItem('cart', JSON.stringify([]));
    }
    updateCartCount();
}

// Get cart items
function getCart() {
    return JSON.parse(localStorage.getItem('cart') || '[]');
}

// Add to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const cart = getCart();
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showNotification('Added to cart!');
}

// Update cart count in navigation
function updateCartCount() {
    const cart = getCart();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountElements = document.querySelectorAll('.cart-count');
    cartCountElements.forEach(el => {
        el.textContent = totalItems;
        if (totalItems > 0) {
            el.style.display = 'flex';
        } else {
            el.style.display = 'none';
        }
    });
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 2000);
}

// Get product by ID
function getProductById(id) {
    return products.find(p => p.id === parseInt(id));
}

// Get author by ID
function getAuthorById(id) {
    return authors.find(a => a.id === parseInt(id));
}

// Record sale (called when order is completed)
function recordSale(orderData) {
    const sale = {
        id: Date.now(),
        orderNumber: orderData.orderNumber,
        date: new Date().toISOString(),
        items: orderData.items,
        total: orderData.total,
        customer: orderData.customer
    };
    
    salesData.push(sale);
    localStorage.setItem('salesData', JSON.stringify(salesData));
    
    // Update author sales and royalties
    updateAuthorStats();
}

// Update author statistics based on sales
function updateAuthorStats() {
    const updatedAuthors = authors.map(author => {
        const authorBooks = products.filter(p => p.authorId === author.id);
        const bookIds = authorBooks.map(b => b.id);
        
        let totalSales = 0;
        let totalRoyalties = 0;
        
        salesData.forEach(sale => {
            sale.items.forEach(item => {
                if (bookIds.includes(item.id)) {
                    const book = products.find(p => p.id === item.id);
                    const saleAmount = item.price * item.quantity;
                    totalSales += saleAmount;
                    totalRoyalties += saleAmount * (book.royaltyRate || 0.10);
                }
            });
        });
        
        return {
            ...author,
            totalSales: totalSales,
            totalRoyalties: totalRoyalties
        };
    });
    
    return updatedAuthors;
}

// Get sales data
function getSalesData() {
    return salesData;
}

// Get category display name
function getCategoryDisplayName(category) {
    const categoryNames = {
        'law': 'Law Books',
        'business': 'Business and Finance Books',
        'christian': 'Christian & Spiritual Books',
        'children': 'Children Books',
        'selfhelp': 'Self-help Books',
        'others': 'Others'
    };
    return categoryNames[category] || category;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initializeCart);
