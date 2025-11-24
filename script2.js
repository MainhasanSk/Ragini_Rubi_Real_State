// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Animate hamburger icon
        const spans = navToggle.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu) {
            navMenu.classList.remove('active');
        }
        if (navToggle) {
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
});

// Active navigation link on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Hero Slider
// Hero Slider - Updated for Clean Image Slider
const slides = document.querySelectorAll('.hero-slide-item');
const indicators = document.querySelectorAll('.hero-indicator');
const prevBtn = document.getElementById('prevSlide');
const nextBtn = document.getElementById('nextSlide');
let currentSlide = 0;
let slideInterval;

function showSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    currentSlide = (n + slides.length) % slides.length;
    
    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

function startSlideShow() {
    slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
}

function stopSlideShow() {
    clearInterval(slideInterval);
}

if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
        prevSlide();
        stopSlideShow();
        startSlideShow();
    });

    nextBtn.addEventListener('click', () => {
        nextSlide();
        stopSlideShow();
        startSlideShow();
    });
}

// Indicator click events
indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        showSlide(index);
        stopSlideShow();
        startSlideShow();
    });
});

// Start slideshow on page load
if (slides.length > 0) {
    startSlideShow();
}

// Pause on hover
const heroSliderSection = document.querySelector('.hero-slider-section');
if (heroSliderSection) {
    heroSliderSection.addEventListener('mouseenter', stopSlideShow);
    heroSliderSection.addEventListener('mouseleave', startSlideShow);
}

// Scroll to top button
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('active');
    } else {
        scrollTopBtn.classList.remove('active');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth scrolling for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Service Filter System
// Service Filter System
const filterBtns = document.querySelectorAll('.filter-btn');
const propertiesGrid = document.getElementById('propertiesGrid');
const propertyCards = document.querySelectorAll('.property-card');
const noProperties = document.getElementById('noProperties');
const buyEnquiryModal = document.getElementById('buyEnquiryModal');
const rentEnquiryModal = document.getElementById('rentEnquiryModal');
const landEnquiryModal = document.getElementById('landEnquiryModal');
const sellPropertyModal = document.getElementById('sellPropertyModal');
const filterMessage = document.getElementById('filterMessage');
const servicesInfo = document.getElementById('servicesInfo');

let currentFilter = 'all'; // Default filter changed to 'all'

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');
        currentFilter = filter;
        
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        if (filter === 'all') {
            // Show all properties
            filterProperties('all');
            
            if (propertiesGrid) {
                propertiesGrid.style.display = 'grid';
            }
            if (servicesInfo) {
                servicesInfo.style.display = 'none';
            }
            if (filterMessage) {
                filterMessage.classList.remove('show');
            }
            
        } else if (filter === 'buy') {
            // Show buy enquiry modal
            if (buyEnquiryModal) {
                buyEnquiryModal.classList.add('show');
                document.body.style.overflow = 'hidden';
            }
            
            // Show properties for sale
            filterProperties('sale');
            
            if (propertiesGrid) {
                propertiesGrid.style.display = 'grid';
            }
            if (servicesInfo) {
                servicesInfo.style.display = 'none';
            }
            
        } else if (filter === 'rent') {
            // Show rent enquiry modal
            if (rentEnquiryModal) {
                rentEnquiryModal.classList.add('show');
                document.body.style.overflow = 'hidden';
            }
            
            // Show properties for rent
            filterProperties('rent');
            
            if (propertiesGrid) {
                propertiesGrid.style.display = 'grid';
            }
            if (servicesInfo) {
                servicesInfo.style.display = 'none';
            }
            
        } else if (filter === 'land') {
            // Show land enquiry modal
            if (landEnquiryModal) {
                landEnquiryModal.classList.add('show');
                document.body.style.overflow = 'hidden';
            }
            
            // Show all properties
            filterProperties('all');
            
            if (propertiesGrid) {
                propertiesGrid.style.display = 'grid';
            }
            if (servicesInfo) {
                servicesInfo.style.display = 'none';
            }
            
        } else if (filter === 'sell') {
            // Show sell property form modal
            if (sellPropertyModal) {
                sellPropertyModal.classList.add('show');
                document.body.style.overflow = 'hidden';
            }
            
            // Hide properties grid and show services info
            if (propertiesGrid) {
                propertiesGrid.style.display = 'none';
            }
            if (noProperties) {
                noProperties.style.display = 'none';
            }
            if (filterMessage) {
                filterMessage.classList.remove('show');
            }
            if (servicesInfo) {
                servicesInfo.style.display = 'grid';
            }
        }
    });
});

function filterProperties(filter) {
    let visibleCount = 0;
    
    if (filter === 'all') {
        // Show all properties
        propertyCards.forEach(card => {
            card.classList.remove('hidden');
            visibleCount++;
        });
        
        // Hide filter message and no properties message
        if (filterMessage) {
            filterMessage.classList.remove('show');
        }
        if (noProperties) {
            noProperties.style.display = 'none';
        }
    } else {
        // Filter by type
        propertyCards.forEach(card => {
            const propertyType = card.getAttribute('data-type');
            
            if (filter === 'sale' && propertyType === 'sale') {
                card.classList.remove('hidden');
                visibleCount++;
            } else if (filter === 'rent' && propertyType === 'rent') {
                card.classList.remove('hidden');
                visibleCount++;
            } else {
                card.classList.add('hidden');
            }
        });
        
        // Show/hide no properties message
        if (visibleCount === 0) {
            if (noProperties) {
                noProperties.style.display = 'block';
            }
            if (filterMessage) {
                filterMessage.classList.remove('show');
            }
        } else {
            if (noProperties) {
                noProperties.style.display = 'none';
            }
            
            // Update filter message
            if (filterMessage) {
                if (filter === 'sale') {
                    filterMessage.textContent = `Showing ${visibleCount} Properties Available for Purchase`;
                } else if (filter === 'rent') {
                    filterMessage.textContent = `Showing ${visibleCount} Properties Available for Rent`;
                }
                filterMessage.classList.add('show');
            }
        }
    }
}

// Initialize with all properties visible on page load
window.addEventListener('load', () => {
    if (propertyCards.length > 0) {
        filterProperties('all');
        if (servicesInfo) {
            servicesInfo.style.display = 'none';
        }
    }
});

// Land Enquiry Modal Controls
const closeLandModal = document.getElementById('closeLandModal');
const cancelLandForm = document.getElementById('cancelLandForm');
const landEnquiryForm = document.getElementById('landEnquiryForm');
const landFormSuccess = document.getElementById('landFormSuccess');
const closeLandSuccess = document.getElementById('closeLandSuccess');

function closeLandEnquiryModal() {
    if (landEnquiryModal) {
        landEnquiryModal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
}

if (closeLandModal) {
    closeLandModal.addEventListener('click', closeLandEnquiryModal);
}

if (cancelLandForm) {
    cancelLandForm.addEventListener('click', closeLandEnquiryModal);
}

if (landEnquiryModal) {
    landEnquiryModal.addEventListener('click', (e) => {
        if (e.target === landEnquiryModal) {
            closeLandEnquiryModal();
        }
    });
}

if (landEnquiryForm) {
    landEnquiryForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Hide form and show success message
        landEnquiryForm.style.display = 'none';
        if (landFormSuccess) {
            landFormSuccess.style.display = 'block';
        }
    });
}

if (closeLandSuccess) {
    closeLandSuccess.addEventListener('click', () => {
        closeLandEnquiryModal();
        if (landEnquiryForm) {
            landEnquiryForm.reset();
            landEnquiryForm.style.display = 'block';
        }
        if (landFormSuccess) {
            landFormSuccess.style.display = 'none';
        }
    });
}


// Buy Enquiry Modal Controls
const closeBuyModal = document.getElementById('closeBuyModal');
const cancelBuyForm = document.getElementById('cancelBuyForm');
const buyEnquiryForm = document.getElementById('buyEnquiryForm');
const buyFormSuccess = document.getElementById('buyFormSuccess');
const closeBuySuccess = document.getElementById('closeBuySuccess');

function closeBuyEnquiryModal() {
    if (buyEnquiryModal) {
        buyEnquiryModal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
}

if (closeBuyModal) {
    closeBuyModal.addEventListener('click', closeBuyEnquiryModal);
}

if (cancelBuyForm) {
    cancelBuyForm.addEventListener('click', closeBuyEnquiryModal);
}

if (buyEnquiryModal) {
    buyEnquiryModal.addEventListener('click', (e) => {
        if (e.target === buyEnquiryModal) {
            closeBuyEnquiryModal();
        }
    });
}

if (buyEnquiryForm) {
    buyEnquiryForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Hide form and show success message
        buyEnquiryForm.style.display = 'none';
        if (buyFormSuccess) {
            buyFormSuccess.style.display = 'block';
        }
    });
}

if (closeBuySuccess) {
    closeBuySuccess.addEventListener('click', () => {
        closeBuyEnquiryModal();
        if (buyEnquiryForm) {
            buyEnquiryForm.reset();
            buyEnquiryForm.style.display = 'block';
        }
        if (buyFormSuccess) {
            buyFormSuccess.style.display = 'none';
        }
    });
}

// Rent Enquiry Modal Controls
const closeRentModal = document.getElementById('closeRentModal');
const cancelRentForm = document.getElementById('cancelRentForm');
const rentEnquiryForm = document.getElementById('rentEnquiryForm');
const rentFormSuccess = document.getElementById('rentFormSuccess');
const closeRentSuccess = document.getElementById('closeRentSuccess');

function closeRentEnquiryModal() {
    if (rentEnquiryModal) {
        rentEnquiryModal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
}

if (closeRentModal) {
    closeRentModal.addEventListener('click', closeRentEnquiryModal);
}

if (cancelRentForm) {
    cancelRentForm.addEventListener('click', closeRentEnquiryModal);
}

if (rentEnquiryModal) {
    rentEnquiryModal.addEventListener('click', (e) => {
        if (e.target === rentEnquiryModal) {
            closeRentEnquiryModal();
        }
    });
}

if (rentEnquiryForm) {
    rentEnquiryForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Hide form and show success message
        rentEnquiryForm.style.display = 'none';
        if (rentFormSuccess) {
            rentFormSuccess.style.display = 'block';
        }
    });
}

if (closeRentSuccess) {
    closeRentSuccess.addEventListener('click', () => {
        closeRentEnquiryModal();
        if (rentEnquiryForm) {
            rentEnquiryForm.reset();
            rentEnquiryForm.style.display = 'block';
        }
        if (rentFormSuccess) {
            rentFormSuccess.style.display = 'none';
        }
    });
}

// Sell Property Modal Controls
const closeSellModal = document.getElementById('closeSellModal');
const cancelSellForm = document.getElementById('cancelSellForm');
const sellPropertyForm = document.getElementById('sellPropertyForm');
const sellFormSuccess = document.getElementById('sellFormSuccess');
const closeSellSuccess = document.getElementById('closeSellSuccess');

function closeSellPropertyModal() {
    if (sellPropertyModal) {
        sellPropertyModal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
    
    // Reset to buy filter
    filterBtns.forEach(btn => {
        if (btn.getAttribute('data-filter') === 'buy') {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    filterProperties('sale');
    
    if (propertiesGrid) {
        propertiesGrid.style.display = 'grid';
    }
    if (servicesInfo) {
        servicesInfo.style.display = 'none';
    }
}

if (closeSellModal) {
    closeSellModal.addEventListener('click', closeSellPropertyModal);
}

if (cancelSellForm) {
    cancelSellForm.addEventListener('click', closeSellPropertyModal);
}

if (sellPropertyModal) {
    sellPropertyModal.addEventListener('click', (e) => {
        if (e.target === sellPropertyModal) {
            closeSellPropertyModal();
        }
    });
}

if (sellPropertyForm) {
    sellPropertyForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Hide form and show success message
        sellPropertyForm.style.display = 'none';
        if (sellFormSuccess) {
            sellFormSuccess.style.display = 'block';
        }
    });
}

if (closeSellSuccess) {
    closeSellSuccess.addEventListener('click', () => {
        closeSellPropertyModal();
        if (sellPropertyForm) {
            sellPropertyForm.reset();
            sellPropertyForm.style.display = 'block';
        }
        if (sellFormSuccess) {
            sellFormSuccess.style.display = 'none';
        }
    });
}

// Contact form submission
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        
        alert(`Thank you for contacting us, ${name}! We will get back to you soon.`);
        
        // Reset form
        contactForm.reset();
    });
}

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections
const animateElements = document.querySelectorAll('.service-card, .property-card, .testimonial-card, .stat-card, .founder-card, .why-card, .achievement-card, .contact-info, .contact-form-wrapper');

animateElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
});

// Hide scroll indicator when user scrolls
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            scrollIndicator.style.opacity = '0';
        } else {
            scrollIndicator.style.opacity = '1';
        }
    });
}

// Property card hover effect enhancement
const propertyCardsHover = document.querySelectorAll('.property-card');
propertyCardsHover.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.zIndex = '10';
    });
    card.addEventListener('mouseleave', function() {
        this.style.zIndex = '1';
    });
});

// Update phone numbers - Replace with actual phone number
const phoneNumber = '919876543210'; // Replace this with actual number
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.setAttribute('href', `tel:+${phoneNumber}`);
});

document.querySelectorAll('a[href^="https://wa.me/"]').forEach(link => {
    link.setAttribute('href', `https://wa.me/${phoneNumber}`);
});

console.log('RAGINI RUBI REAL ESTATE - Website Loaded Successfully!');
