// Product Database for MR-GOODLIFE PUBLISHING
const products = [
    {
        id: 1,
        title: "The Art of Digital Storytelling",
        author: "Maria Santos",
        category: "non-fiction",
        price: 450,
        image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400",
        description: "A comprehensive guide to crafting compelling narratives in the digital age. Learn techniques for engaging audiences across multiple platforms.",
        isbn: "978-1-234567-89-0",
        pages: 320,
        year: 2025,
        stock: 15
    },
    {
        id: 2,
        title: "Introduction to Business Management",
        author: "Dr. Ramon Cruz",
        category: "business",
        price: 850,
        image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=400",
        description: "Essential principles and practices for effective business management. Perfect for students and aspiring entrepreneurs.",
        isbn: "978-1-234567-90-6",
        pages: 450,
        year: 2024,
        stock: 20
    },
    {
        id: 3,
        title: "Tales from Cagayan Valley",
        author: "Elena Reyes",
        category: "fiction",
        price: 380,
        image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400",
        description: "A collection of heartwarming stories set in the beautiful landscapes of Cagayan Valley. Experience local culture through vivid storytelling.",
        isbn: "978-1-234567-91-3",
        pages: 280,
        year: 2025,
        stock: 25
    },
    {
        id: 4,
        title: "My First Science Book",
        author: "Teacher Ana Mendoza",
        category: "children",
        price: 250,
        image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400",
        description: "Make learning fun! An illustrated introduction to basic scientific concepts for young learners ages 6-10.",
        isbn: "978-1-234567-92-0",
        pages: 128,
        year: 2025,
        stock: 30
    },
    {
        id: 5,
        title: "Philippine Literature: A Modern Anthology",
        author: "Prof. Carlos Bautista",
        category: "academic",
        price: 1200,
        image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400",
        description: "A comprehensive collection of contemporary Philippine literary works. Essential reading for literature students and enthusiasts.",
        isbn: "978-1-234567-93-7",
        pages: 680,
        year: 2024,
        stock: 12
    },
    {
        id: 6,
        title: "Entrepreneurship in the Digital Era",
        author: "Jose Tan",
        category: "business",
        price: 650,
        image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=400",
        description: "Navigate the challenges and opportunities of starting a business in today's digital landscape. Real case studies included.",
        isbn: "978-1-234567-94-4",
        pages: 380,
        year: 2025,
        stock: 18
    },
    {
        id: 7,
        title: "The Mystery of Balete Tree",
        author: "Linda Garcia",
        category: "fiction",
        price: 420,
        image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400",
        description: "A thrilling mystery novel that weaves Filipino folklore with modern detective work. Perfect for young adult readers.",
        isbn: "978-1-234567-95-1",
        pages: 350,
        year: 2025,
        stock: 22
    },
    {
        id: 8,
        title: "Adventures in Math Land",
        author: "Teacher Ben Ramos",
        category: "children",
        price: 280,
        image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400",
        description: "Join Max and Maya on exciting adventures while learning mathematics! Colorfully illustrated with fun exercises.",
        isbn: "978-1-234567-96-8",
        pages: 150,
        year: 2025,
        stock: 35
    },
    {
        id: 9,
        title: "Research Methods for Social Sciences",
        author: "Dr. Patricia Flores",
        category: "academic",
        price: 980,
        image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400",
        description: "Master quantitative and qualitative research methodologies. A practical guide for students and researchers.",
        isbn: "978-1-234567-97-5",
        pages: 520,
        year: 2024,
        stock: 14
    },
    {
        id: 10,
        title: "Creative Writing Workshop",
        author: "Angela Torres",
        category: "non-fiction",
        price: 520,
        image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400",
        description: "Unlock your creativity with proven techniques and exercises. From basic writing skills to advanced storytelling.",
        isbn: "978-1-234567-98-2",
        pages: 290,
        year: 2025,
        stock: 20
    },
    {
        id: 11,
        title: "Leadership Excellence",
        author: "Gen. Ricardo Santos",
        category: "business",
        price: 720,
        image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=400",
        description: "Develop essential leadership skills through real-world examples and actionable strategies. Transform your leadership approach.",
        isbn: "978-1-234567-99-9",
        pages: 410,
        year: 2024,
        stock: 16
    },
    {
        id: 12,
        title: "Moonlight Over Manila",
        author: "Roberto Vasquez",
        category: "fiction",
        price: 395,
        image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400",
        description: "A romance novel set against the backdrop of Manila's vibrant culture. A story of love, loss, and second chances.",
        isbn: "978-1-234568-00-2",
        pages: 310,
        year: 2025,
        stock: 28
    },
    {
        id: 13,
        title: "The Curious Rainbow",
        author: "Joy Alvarez",
        category: "children",
        price: 220,
        image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400",
        description: "A beautifully illustrated picture book about colors, friendship, and accepting differences. Ages 4-8.",
        isbn: "978-1-234568-01-9",
        pages: 96,
        year: 2025,
        stock: 40
    },
    {
        id: 14,
        title: "Philippine History: Critical Perspectives",
        author: "Dr. Manuel Santiago",
        category: "academic",
        price: 1100,
        image: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=400",
        description: "An in-depth analysis of Philippine history from pre-colonial times to the present. Required reading for history majors.",
        isbn: "978-1-234568-02-6",
        pages: 750,
        year: 2024,
        stock: 10
    },
    {
        id: 15,
        title: "Marketing in the Modern Age",
        author: "Sandra Diaz",
        category: "business",
        price: 780,
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400",
        description: "Master digital marketing strategies, social media, and brand building. Updated with latest trends and case studies.",
        isbn: "978-1-234568-03-3",
        pages: 440,
        year: 2025,
        stock: 19
    },
    {
        id: 16,
        title: "Cooking with Lola",
        author: "Chef Maria Gonzales",
        category: "non-fiction",
        price: 480,
        image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400",
        description: "Traditional Filipino recipes passed down through generations. Learn to cook authentic dishes with step-by-step instructions.",
        isbn: "978-1-234568-04-0",
        pages: 260,
        year: 2025,
        stock: 24
    },
    {
        id: 17,
        title: "The Last Train Home",
        author: "Thomas Rivera",
        category: "fiction",
        price: 440,
        image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400",
        description: "A gripping tale of family, sacrifice, and redemption. Follow one man's journey to reconnect with his roots.",
        isbn: "978-1-234568-05-7",
        pages: 340,
        year: 2025,
        stock: 21
    },
    {
        id: 18,
        title: "Fun with Numbers",
        author: "Teacher Rosa Cruz",
        category: "children",
        price: 260,
        image: "https://images.unsplash.com/photo-1509266272358-7701da638078?w=400",
        description: "Make math enjoyable with games, puzzles, and activities. Perfect for early learners developing number sense.",
        isbn: "978-1-234568-06-4",
        pages: 140,
        year: 2025,
        stock: 32
    }
];

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

// Initialize on page load
document.addEventListener('DOMContentLoaded', initializeCart);
