# MR-GOODLIFE PUBLISHING

Official e-commerce website with Admin and Author Management System for MR-GOODLIFE PUBLISHING, a premier publishing company based in Tuguegarao City, Cagayan, Philippines. Browse, shop, and order books online!

## About

MR-GOODLIFE PUBLISHING is dedicated to providing exceptional publishing services that bring creative visions to life. We specialize in:

- Book Publishing
- Editorial Services
- Design & Layout
- Printing Services
- Digital Publishing
- Academic Publishing
- Corporate Publishing
- Periodicals & Magazines
- Publishing Consultation

## Book Categories

Our catalog features books across these categories:
- **Law Books** - Legal references, case studies, and Philippine law
- **Business and Finance Books** - Management, accounting, and investment guides
- **Christian & Spiritual Books** - Devotionals, theology, and faith-based literature
- **Children Books** - Educational and entertaining books for young readers
- **Self-help Books** - Personal development and motivational literature
- **Others** - Cookbooks, travel guides, photography, and more

## E-Commerce Features

Our online bookstore offers:

- **Browse Books**: Explore our collection of 27+ published books across 6 categories
- **Advanced Filtering**: Filter by category (Law, Business, Christian, Children, Self-help, Others) and price range
- **Search Functionality**: Quickly find books by title, author, or description
- **Product Details**: View detailed information including ISBN, page count, year, and stock availability
- **Shopping Cart**: Add books to cart, adjust quantities, and manage your order
- **Secure Checkout**: Complete your purchase with multiple payment options (Cash on Delivery, Credit/Debit Card, GCash)
- **Order Confirmation**: Receive instant order confirmation with tracking details
- **Responsive Design**: Shop seamlessly on desktop, tablet, or mobile devices

## Admin Management System

### Admin Portal Access
- **URL**: `admin-login.html`
- **Default Credentials**:
  - Username: `admin`
  - Password: `mrgoodlife2026`

### Admin Features
- **Dashboard Overview**: View total books, authors, orders, and revenue statistics
- **Book Management**:
  - Add new books to the catalog
  - Edit existing book information (title, author, category, price, stock, etc.)
  - Delete books from catalog
  - Filter and search books
  - Manage book images and royalty rates

- **Author Management**:
  - Add new authors to the system
  - Edit author information (name, email, phone, join date)
  - View author statistics (books published, sales, royalties earned)
  - Delete authors
  - Set author portal passwords
  - Calculate and track author royalties

- **Sales Reports**:
  - View sales by book (units sold, revenue, royalties)
  - View sales by author
  - Track total revenue and royalties
  - Analyze bestselling books

- **Order Management**:
  - View all customer orders
  - Search orders by order number or customer name
  - View detailed order information (customer details, items, payment method)
  - Track order history

## Author Portal

### Author Portal Access
- **URL**: `author-login.html`
- **Default Password**: `author123` (for all authors)
- **Login**: Use your registered email address

### Author Features
- **Dashboard Overview**: View your published books, sales, and royalty statistics
- **Book Tracking**:
  - See all your published books
  - View stock levels and prices
  - Track individual book sales and royalties

- **Sales Analytics**:
  - Monitor units sold per book
  - View revenue generated from your books
  - Track royalty earnings (calculated based on individual royalty rates)

- **Royalty Management**:
  - View recent sales transactions
  - See royalty earned per transaction
  - Track total lifetime royalties

- **Profile Information**: View your contact details and membership date

## Technical Details

### LocalStorage Data Structure
The system uses browser localStorage to persist:
- `booksData`: Product catalog (can be modified by admin)
- `authorsData`: Author information
- `salesData`: Transaction records for sales tracking
- `orders`: Customer orders
- `cart`: Shopping cart items
- `adminUser`: Admin credentials
- `authorUsers`: Author login credentials
- `'currentUser`: Active session information

### Royalty System
- Each book has an adjustable royalty rate (default 30%)
- Sales are automatically tracked when orders are completed
- Author royalties are calculated: `Sale Amount × Royalty Rate`
- Admin can view all royalty information
- Authors can see their own earnings

### Website Structure

#### Customer-Facing Pages
- `index.html` - Homepage with featured books and portal links
- `about.html` - About Us page
- `services.html` - Services page
- `shop.html` - Book catalog with filters and search
- `book-detail.html` - Individual book details
- `cart.html` - Shopping cart
- `checkout.html` - Checkout process
- `order-confirmation.html` - Order confirmation
- `contact.html` - Contact page

#### Admin Pages
- `admin-login.html` - Admin authentication
- `admin-dashboard.html` - Admin overview dashboard
- `admin-books.html` - Book management interface
- `admin-authors.html` - Author management interface
- `admin-sales.html` - Sales reports and analytics
- `admin-orders.html` - Order management

#### Author Pages
- `author-login.html` - Author authentication
- `author-dashboard.html` - Author overview with sales and royalties

### JavaScript Files
- `products.js` - Product/author database and cart management
- `auth.js` - Authentication system for admin and authors
- `admin-dashboard.js` - Admin dashboard functionality
- `admin-books.js` - Book management operations
- `admin-authors.js` - Author management operations
- `author-dashboard.js` - Author portal functionality
- `shop.js` - Shop page filtering and display
- `book-detail.js` - Product detail functionality
- `cart.js` - Shopping cart operations
- `checkout.js` - Checkout process and sales recording
- `script.js` - General JavaScript functionality

### Stylesheets
- `styles.css` - Complete styling including e-commerce, dashboard, and authentication pages
- `cart.js` - Shopping cart operations
- `checkout.js` - Checkout processing
- `icon.png` - Company logo

## Book Categories

- Fiction
- Non-Fiction
- Academic
- Children's Books
- Business

## Contact Information

**Address:** Zone 1 Apple Street, Pengue, Tuguegarao City, Cagayan, 3500  
**Phone:** +639554659229  
**Email:** mrgoodlifeph@gmail.com

**Business Hours:**
- Monday - Friday: 8:00 AM - 5:00 PM
- Saturday: 9:00 AM - 3:00 PM
- Sunday: Closed

## Technologies Used

- HTML5
- CSS3
- JavaScript (Vanilla)
- LocalStorage for cart persistence
- Font Awesome Icons
- Google Fonts

## Features

- Fully responsive e-commerce platform
- Modern and professional UI/UX
- Product catalog with 18 original book listings
- Advanced search and filtering
- Real-time shopping cart updates
- Order management system
- Contact form with validation
- Smooth scrolling and animations
- Mobile-friendly navigation
- SEO optimized
- Fast loading times
- Accessibility compliant

## How to Use

1. Browse books on the Shop page
2. Use filters to narrow down by category or price
3. Search for specific books using the search bar
4. Click on a book to view detailed information
5. Add books to cart with quantity selection
6. Review cart and adjust quantities as needed
7. Proceed to checkout and enter shipping information
8. Select payment method and place order
9. Receive order confirmation with order number

## Deployment

This website can be deployed on any web hosting service or GitHub Pages.

**Live Repository:** https://github.com/mrgoodlifeph/publishing

## Copyright

© 2026 MR-GOODLIFE PUBLISHING. All rights reserved.
