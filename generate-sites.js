const fs = require('fs');
const path = require('path');

// Place categories and their details
const placeCategories = {
    restaurants: {
        count: 50,
        subcategories: ['Italian', 'Japanese', 'Chinese', 'Mexican', 'French', 'Thai', 'Indian', 'American', 'Mediterranean', 'Korean'],
        icons: ['🍝', '🍱', '🥢', '🌮', '🥖', '🍜', '🍛', '🍔', '🥙', '🍲'],
        colors: ['#e74c3c', '#e67e22', '#f39c12', '#16a085', '#8e44ad', '#c0392b', '#d35400', '#e67e22', '#27ae60', '#2980b9']
    },
    cafes: {
        count: 30,
        subcategories: ['Coffee Shop', 'Tea House', 'Bakery Cafe', 'Juice Bar'],
        icons: ['☕', '🍵', '🥐', '🧃'],
        colors: ['#6F4E37', '#8B4513', '#D2691E', '#FF6347']
    },
    hotels: {
        count: 30,
        subcategories: ['Luxury Hotel', 'Budget Hotel', 'Boutique Hotel', 'Resort', 'Motel', 'Hostel'],
        icons: ['🏨', '🏩', '🏰', '🏖️', '🛏️', '🏠'],
        colors: ['#2c3e50', '#34495e', '#7f8c8d', '#16a085', '#8e44ad', '#2980b9']
    },
    shopping: {
        count: 40,
        subcategories: ['Mall', 'Boutique', 'Electronics Store', 'Bookstore', 'Clothing Store', 'Jewelry Store', 'Toy Store', 'Sports Store'],
        icons: ['🏬', '👗', '📱', '📚', '👔', '💎', '🧸', '⚽'],
        colors: ['#e91e63', '#9c27b0', '#3f51b5', '#00bcd4', '#4caf50', '#ff9800', '#ff5722', '#795548']
    },
    entertainment: {
        count: 25,
        subcategories: ['Movie Theater', 'Concert Hall', 'Night Club', 'Arcade', 'Bowling'],
        icons: ['🎬', '🎭', '🎪', '🎮', '🎳'],
        colors: ['#e74c3c', '#9b59b6', '#3498db', '#f39c12', '#1abc9c']
    },
    health: {
        count: 30,
        subcategories: ['Hospital', 'Clinic', 'Pharmacy', 'Dental Clinic', 'Eye Clinic', 'Veterinary'],
        icons: ['🏥', '⚕️', '💊', '🦷', '👁️', '🐾'],
        colors: ['#c0392b', '#e74c3c', '#27ae60', '#2ecc71', '#3498db', '#9b59b6']
    },
    education: {
        count: 25,
        subcategories: ['University', 'School', 'Library', 'Training Center', 'Preschool'],
        icons: ['🎓', '🏫', '📚', '📖', '🧒'],
        colors: ['#2980b9', '#3498db', '#16a085', '#27ae60', '#f39c12']
    },
    services: {
        count: 40,
        subcategories: ['Bank', 'Post Office', 'Salon', 'Spa', 'Laundry', 'Repair Shop', 'Legal Services', 'Accounting'],
        icons: ['🏦', '📮', '💇', '🧖', '🧺', '🔧', '⚖️', '💼'],
        colors: ['#34495e', '#7f8c8d', '#e91e63', '#9c27b0', '#3f51b5', '#ff9800', '#795548', '#607d8b']
    },
    attractions: {
        count: 50,
        subcategories: ['Museum', 'Art Gallery', 'Zoo', 'Aquarium', 'Park', 'Garden', 'Monument', 'Theme Park', 'Beach', 'Viewpoint'],
        icons: ['🏛️', '🎨', '🦁', '🐠', '🌳', '🌸', '🗽', '🎢', '🏖️', '🌄'],
        colors: ['#8e44ad', '#9b59b6', '#16a085', '#1abc9c', '#27ae60', '#2ecc71', '#f39c12', '#e67e22', '#3498db', '#2980b9']
    },
    transportation: {
        count: 20,
        subcategories: ['Airport', 'Train Station', 'Bus Station', 'Parking'],
        icons: ['✈️', '🚂', '🚌', '🅿️'],
        colors: ['#34495e', '#2c3e50', '#7f8c8d', '#95a5a6']
    },
    religious: {
        count: 20,
        subcategories: ['Church', 'Mosque', 'Temple', 'Synagogue'],
        icons: ['⛪', '🕌', '🛕', '🕍'],
        colors: ['#8e44ad', '#9b59b6', '#e67e22', '#3498db']
    },
    sports: {
        count: 30,
        subcategories: ['Gym', 'Stadium', 'Swimming Pool', 'Tennis Court', 'Golf Course', 'Yoga Studio'],
        icons: ['💪', '🏟️', '🏊', '🎾', '⛳', '🧘'],
        colors: ['#e74c3c', '#c0392b', '#3498db', '#f39c12', '#27ae60', '#9b59b6']
    },
    automotive: {
        count: 30,
        subcategories: ['Gas Station', 'Car Wash', 'Auto Repair', 'Car Dealership', 'Tire Shop', 'Car Rental'],
        icons: ['⛽', '🚿', '🔧', '🚗', '🛞', '🔑'],
        colors: ['#e74c3c', '#3498db', '#f39c12', '#2ecc71', '#95a5a6', '#34495e']
    },
    grocery: {
        count: 30,
        subcategories: ['Supermarket', 'Convenience Store', 'Farmers Market', 'Organic Store', 'Bakery', 'Butcher'],
        icons: ['🛒', '🏪', '🥕', '🥬', '🥖', '🥩'],
        colors: ['#27ae60', '#2ecc71', '#f39c12', '#16a085', '#e67e22', '#c0392b']
    },
    miscellaneous: {
        count: 50,
        subcategories: ['Pet Store', 'Florist', 'Photography Studio', 'Event Venue', 'Coworking Space', 'Tourist Info', 'Real Estate', 'Insurance', 'Travel Agency', 'Furniture Store'],
        icons: ['🐕', '🌺', '📷', '🎉', '💻', 'ℹ️', '🏘️', '🛡️', '✈️', '🛋️'],
        colors: ['#e67e22', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#00bcd4', '#009688', '#4caf50', '#8bc34a']
    }
};

// Generate a place page
function generatePlacePage(category, subcategory, index, icon, color) {
    const placeName = `${subcategory} ${index}`;
    const fileName = `${category}_${subcategory.toLowerCase().replace(/\s+/g, '_')}_${index}.html`;
    const rating = (4 + Math.random()).toFixed(1);
    const reviewCount = Math.floor(Math.random() * 500) + 50;
    const priceLevel = '$'.repeat(Math.floor(Math.random() * 4) + 1);

    return {
        fileName,
        content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${placeName} - Google Maps Place</title>
    <link rel="stylesheet" href="../../shared/css/common.css">
    <style>
        .category-badge {
            background: ${color};
            color: white;
            padding: 8px 16px;
            border-radius: 20px;
            display: inline-block;
            margin: 10px 0;
            font-weight: 600;
        }
        .hero {
            background: linear-gradient(135deg, ${color}dd 0%, ${color}88 100%);
        }
    </style>
</head>
<body>
    <header>
        <div class="header-content">
            <div class="logo">${icon} ${placeName}</div>
            <nav>
                <ul class="nav-links">
                    <li><a href="#overview">Overview</a></li>
                    <li><a href="#features">Features</a></li>
                    <li><a href="#reviews">Reviews</a></li>
                    <li><a href="#contact">Contact</a></li>
                    <li><a href="../../index.html">← Back to All Places</a></li>
                </ul>
            </nav>
        </div>
    </header>

    <section class="hero">
        <h1>${icon} ${placeName}</h1>
        <p class="random-quote">Discover amazing places around you!</p>
        <div class="rating" data-rating="${rating}">
            <span class="stars"></span>
            <span class="rating-text">${rating} (${reviewCount} reviews)</span>
        </div>
        <div class="price-range">${priceLevel}</div>
        <div class="tags">
            <span class="tag">${subcategory}</span>
            <span class="tag">${category.charAt(0).toUpperCase() + category.slice(1)}</span>
            <span class="tag">Verified</span>
        </div>
    </section>

    <div class="container">
        <div class="content-card" id="overview">
            <h2>About ${placeName}</h2>
            <div class="category-badge">${icon} ${subcategory}</div>
            <p>Welcome to ${placeName}, your premier destination for exceptional ${subcategory.toLowerCase()} experiences. We pride ourselves on delivering outstanding service and creating memorable moments for all our visitors.</p>
            <p>Located in a prime area, ${placeName} has been serving the community with dedication and passion. Our commitment to excellence has earned us a ${rating}-star rating from ${reviewCount} satisfied customers.</p>

            <h3 class="mt-3">Why Choose Us?</h3>
            <div class="info-grid">
                <div class="info-card">
                    <span class="info-card-icon">⭐</span>
                    <h3>Top Rated</h3>
                    <p>Consistently rated ${rating} stars by our customers</p>
                </div>
                <div class="info-card">
                    <span class="info-card-icon">🏆</span>
                    <h3>Award Winning</h3>
                    <p>Recognized for excellence in service and quality</p>
                </div>
                <div class="info-card">
                    <span class="info-card-icon">💎</span>
                    <h3>Premium Quality</h3>
                    <p>We maintain the highest standards in everything we do</p>
                </div>
                <div class="info-card">
                    <span class="info-card-icon">🤝</span>
                    <h3>Customer First</h3>
                    <p>Your satisfaction is our top priority</p>
                </div>
            </div>
        </div>

        <div class="content-card" id="features">
            <h2>Features & Amenities</h2>
            <div class="amenities">
                <div class="amenity">
                    <span class="amenity-icon">📍</span>
                    <span class="amenity-text">Prime Location</span>
                </div>
                <div class="amenity">
                    <span class="amenity-icon">🅿️</span>
                    <span class="amenity-text">Free Parking</span>
                </div>
                <div class="amenity">
                    <span class="amenity-icon">📶</span>
                    <span class="amenity-text">Free WiFi</span>
                </div>
                <div class="amenity">
                    <span class="amenity-icon">♿</span>
                    <span class="amenity-text">Wheelchair Accessible</span>
                </div>
                <div class="amenity">
                    <span class="amenity-icon">🔒</span>
                    <span class="amenity-text">Secure Facility</span>
                </div>
                <div class="amenity">
                    <span class="amenity-icon">🌡️</span>
                    <span class="amenity-text">Climate Controlled</span>
                </div>
                <div class="amenity">
                    <span class="amenity-icon">👨‍👩‍👧‍👦</span>
                    <span class="amenity-text">Family Friendly</span>
                </div>
                <div class="amenity">
                    <span class="amenity-icon">💳</span>
                    <span class="amenity-text">Card Payments</span>
                </div>
            </div>

            <h3 class="mt-3">What Makes Us Special</h3>
            <div class="features">
                <div class="feature-item">
                    <span class="feature-icon">✨</span>
                    <h3>Exceptional Service</h3>
                    <p>Our dedicated team goes above and beyond to ensure your experience is nothing short of perfect.</p>
                </div>
                <div class="feature-item">
                    <span class="feature-icon">🎯</span>
                    <h3>Attention to Detail</h3>
                    <p>Every aspect of our service is carefully crafted to meet your needs and exceed expectations.</p>
                </div>
                <div class="feature-item">
                    <span class="feature-icon">🌟</span>
                    <h3>Quality Guaranteed</h3>
                    <p>We stand behind our services with a satisfaction guarantee that puts your mind at ease.</p>
                </div>
                <div class="feature-item">
                    <span class="feature-icon">⚡</span>
                    <h3>Fast & Efficient</h3>
                    <p>We value your time and ensure prompt service without compromising on quality.</p>
                </div>
            </div>
        </div>

        <div class="content-card" id="reviews">
            <h2>Customer Reviews</h2>
            <div class="reviews">
                <div class="review-card">
                    <div class="review-header">
                        <div class="reviewer-avatar">J</div>
                        <div class="reviewer-info">
                            <h4>John Smith</h4>
                            <div class="review-date">2 weeks ago</div>
                        </div>
                    </div>
                    <div class="rating" data-rating="5">
                        <span class="stars">★★★★★</span>
                    </div>
                    <p class="review-text">Absolutely fantastic experience! The service was impeccable and the attention to detail was remarkable. I highly recommend ${placeName} to anyone looking for top-quality ${subcategory.toLowerCase()} service.</p>
                </div>

                <div class="review-card">
                    <div class="review-header">
                        <div class="reviewer-avatar">S</div>
                        <div class="reviewer-info">
                            <h4>Sarah Johnson</h4>
                            <div class="review-date">1 month ago</div>
                        </div>
                    </div>
                    <div class="rating" data-rating="5">
                        <span class="stars">★★★★★</span>
                    </div>
                    <p class="review-text">I've been coming here for months and it never disappoints. The staff is friendly, professional, and always ready to help. The facilities are clean and well-maintained. Five stars all the way!</p>
                </div>

                <div class="review-card">
                    <div class="review-header">
                        <div class="reviewer-avatar">M</div>
                        <div class="reviewer-info">
                            <h4>Michael Chen</h4>
                            <div class="review-date">2 months ago</div>
                        </div>
                    </div>
                    <div class="rating" data-rating="4.5">
                        <span class="stars">★★★★⯨</span>
                    </div>
                    <p class="review-text">Great place with excellent service. The only minor issue was the wait time during peak hours, but the quality of service made up for it. Will definitely return!</p>
                </div>

                <div class="review-card">
                    <div class="review-header">
                        <div class="reviewer-avatar">E</div>
                        <div class="reviewer-info">
                            <h4>Emily Davis</h4>
                            <div class="review-date">3 months ago</div>
                        </div>
                    </div>
                    <div class="rating" data-rating="5">
                        <span class="stars">★★★★★</span>
                    </div>
                    <p class="review-text">Outstanding! From the moment I walked in, I felt welcomed. The atmosphere is wonderful and the service is second to none. This is now my go-to place for ${subcategory.toLowerCase()} needs.</p>
                </div>
            </div>
        </div>

        <div class="content-card">
            <h2>Opening Hours</h2>
            <div class="hours-table">
                <div class="hours-row">
                    <span class="hours-day">Sunday</span>
                    <span class="hours-time">9:00 AM - 8:00 PM</span>
                </div>
                <div class="hours-row">
                    <span class="hours-day">Monday</span>
                    <span class="hours-time">8:00 AM - 10:00 PM</span>
                </div>
                <div class="hours-row">
                    <span class="hours-day">Tuesday</span>
                    <span class="hours-time">8:00 AM - 10:00 PM</span>
                </div>
                <div class="hours-row">
                    <span class="hours-day">Wednesday</span>
                    <span class="hours-time">8:00 AM - 10:00 PM</span>
                </div>
                <div class="hours-row">
                    <span class="hours-day">Thursday</span>
                    <span class="hours-time">8:00 AM - 10:00 PM</span>
                </div>
                <div class="hours-row">
                    <span class="hours-day">Friday</span>
                    <span class="hours-time">8:00 AM - 11:00 PM</span>
                </div>
                <div class="hours-row">
                    <span class="hours-day">Saturday</span>
                    <span class="hours-time">9:00 AM - 11:00 PM</span>
                </div>
            </div>
        </div>

        <div class="content-card" id="contact">
            <h2>Contact & Location</h2>
            <div class="contact-info">
                <div class="contact-item">
                    <span class="contact-icon">📍</span>
                    <div>
                        <strong>Address</strong><br>
                        ${Math.floor(Math.random() * 9999) + 1} Main Street, City Center, ST ${Math.floor(Math.random() * 90000) + 10000}
                    </div>
                </div>
                <div class="contact-item">
                    <span class="contact-icon">📞</span>
                    <div>
                        <strong>Phone</strong><br>
                        +1 (${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}
                    </div>
                </div>
                <div class="contact-item">
                    <span class="contact-icon">✉️</span>
                    <div>
                        <strong>Email</strong><br>
                        info@${placeName.toLowerCase().replace(/\s+/g, '')}.com
                    </div>
                </div>
                <div class="contact-item">
                    <span class="contact-icon">🌐</span>
                    <div>
                        <strong>Website</strong><br>
                        www.${placeName.toLowerCase().replace(/\s+/g, '')}.com
                    </div>
                </div>
            </div>

            <div class="map-container">
                ${icon} Map Location
            </div>

            <div class="text-center mt-3">
                <a href="../../index.html" class="btn btn-primary">← Back to All Places</a>
                <a href="#" class="btn btn-secondary">Get Directions</a>
            </div>
        </div>
    </div>

    <footer>
        <div class="footer-content">
            <div class="logo">${icon} ${placeName}</div>
            <div class="footer-links">
                <a href="#overview">About</a>
                <a href="#features">Features</a>
                <a href="#reviews">Reviews</a>
                <a href="#contact">Contact</a>
                <a href="../../index.html">All Places</a>
            </div>
            <div class="social-links">
                <a href="#">📘</a>
                <a href="#">📷</a>
                <a href="#">🐦</a>
                <a href="#">💼</a>
            </div>
            <p>&copy; 2024 ${placeName}. All rights reserved.</p>
        </div>
    </footer>

    <script src="../../shared/js/common.js"></script>
</body>
</html>`
    };
}

// Generate all sites
function generateAllSites() {
    const allSites = [];
    let totalGenerated = 0;

    for (const [category, details] of Object.entries(placeCategories)) {
        const { count, subcategories, icons, colors } = details;
        const sitesPerSubcategory = Math.ceil(count / subcategories.length);
        let categoryGenerated = 0;

        subcategories.forEach((subcategory, subIndex) => {
            const icon = icons[subIndex % icons.length];
            const color = colors[subIndex % colors.length];

            for (let i = 1; i <= sitesPerSubcategory && categoryGenerated < count; i++) {
                const place = generatePlacePage(category, subcategory, i, icon, color);
                const filePath = path.join(__dirname, 'places', category, place.fileName);

                fs.writeFileSync(filePath, place.content);

                allSites.push({
                    name: `${subcategory} ${i}`,
                    category,
                    subcategory,
                    icon,
                    color,
                    path: `places/${category}/${place.fileName}`
                });

                totalGenerated++;
                categoryGenerated++;
            }
        });
    }

    return allSites;
}

// Run generation
console.log('Generating 500 place sites...');
const sites = generateAllSites();
console.log(`Generated ${sites.length} sites successfully!`);

// Save sites data for index page
fs.writeFileSync(
    path.join(__dirname, 'sites-data.json'),
    JSON.stringify(sites, null, 2)
);
console.log('Sites data saved to sites-data.json');
