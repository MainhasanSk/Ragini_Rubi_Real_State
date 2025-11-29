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

// Hero Slider - Clean Image Slider
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

function nextSlideFunc() {
    showSlide(currentSlide + 1);
}

function prevSlideFunc() {
    showSlide(currentSlide - 1);
}

function startSlideShow() {
    slideInterval = setInterval(nextSlideFunc, 5000); // Change slide every 5 seconds
}

function stopSlideShow() {
    clearInterval(slideInterval);
}

if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
        prevSlideFunc();
        stopSlideShow();
        startSlideShow();
    });

    nextBtn.addEventListener('click', () => {
        nextSlideFunc();
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

// Service Enquiry Modal Functions
function openBuyModal() {
    const buyModal = document.getElementById('buyEnquiryModal');
    if (buyModal) {
        buyModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function openRentModal() {
    const rentModal = document.getElementById('rentEnquiryModal');
    if (rentModal) {
        rentModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function openSellModal() {
    const sellModal = document.getElementById('sellPropertyModal');
    if (sellModal) {
        sellModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function openLandModal() {
    const landModal = document.getElementById('landEnquiryModal');
    if (landModal) {
        landModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

// Buy Enquiry Modal Controls
const closeBuyModal = document.getElementById('closeBuyModal');
const cancelBuyForm = document.getElementById('cancelBuyForm');
const buyEnquiryForm = document.getElementById('buyEnquiryForm');
const buyFormSuccess = document.getElementById('buyFormSuccess');
const closeBuySuccess = document.getElementById('closeBuySuccess');
const buyEnquiryModal = document.getElementById('buyEnquiryModal');

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
const rentEnquiryModal = document.getElementById('rentEnquiryModal');

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
const sellPropertyModal = document.getElementById('sellPropertyModal');

function closeSellPropertyModal() {
    if (sellPropertyModal) {
        sellPropertyModal.classList.remove('show');
        document.body.style.overflow = 'auto';
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

// Land Enquiry Modal Controls
const closeLandModal = document.getElementById('closeLandModal');
const cancelLandForm = document.getElementById('cancelLandForm');
const landEnquiryForm = document.getElementById('landEnquiryForm');
const landFormSuccess = document.getElementById('landFormSuccess');
const closeLandSuccess = document.getElementById('closeLandSuccess');
const landEnquiryModal = document.getElementById('landEnquiryModal');

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
const animateElements = document.querySelectorAll('.service-box, .property-card, .testimonial-card, .stat-card, .founder-card, .why-card, .achievement-card, .contact-info, .contact-form-wrapper, .gallery-item');

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
//video
// Gallery Page - Simple Animations and Smooth Scrolling

// new booking model
// Booking Modal Functionality
const bookingModal = document.getElementById('bookingModal');
const closeBookingModal = document.getElementById('closeBookingModal');
const cancelBooking = document.getElementById('cancelBooking');
const bookingForm = document.getElementById('bookingForm');
const bookingVisitDate = document.getElementById('bookingVisitDate');

// Set minimum date to today
if (bookingVisitDate) {
    const today = new Date().toISOString().split('T')[0];
    bookingVisitDate.setAttribute('min', today);
}

// Store current property details
let currentPropertyDetails = {
    name: '',
    location: '',
    type: ''
};

// Open Booking Modal
function openBookingModal(propertyName, location, type) {
    currentPropertyDetails = { propertyName, location, type };
    
    // Update property info in modal
    const propertyInfo = document.getElementById('bookingPropertyInfo');
    propertyInfo.innerHTML = `
        <h4><i class="fas fa-building"></i> ${propertyName}</h4>
        <div class="booking-property-details">
            <div class="booking-detail-item">
                <i class="fas fa-map-marker-alt"></i>
                <span><strong>Location:</strong> ${location}</span>
            </div>
            <div class="booking-detail-item">
                <i class="fas fa-tag"></i>
                <span><strong>Type:</strong> ${type}</span>
            </div>
        </div>
    `;
    
    // Show modal
    bookingModal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

// Close Booking Modal
function closeBookingModalFunc() {
    bookingModal.classList.remove('show');
    document.body.style.overflow = 'auto';
    bookingForm.reset();
}

if (closeBookingModal) {
    closeBookingModal.addEventListener('click', closeBookingModalFunc);
}

if (cancelBooking) {
    cancelBooking.addEventListener('click', closeBookingModalFunc);
}

// Close on outside click
if (bookingModal) {
    bookingModal.addEventListener('click', (e) => {
        if (e.target === bookingModal) {
            closeBookingModalFunc();
        }
    });
}

// Handle Form Submission
if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('bookingName').value.trim();
        const phone = document.getElementById('bookingPhone').value.trim();
        const email = document.getElementById('bookingEmail').value.trim();
        const message = document.getElementById('bookingMessage').value.trim();
        const visitDate = document.getElementById('bookingVisitDate').value;
        
        // Validate phone number
        if (phone.length !== 10 || !/^\d{10}$/.test(phone)) {
            alert('Please enter a valid 10-digit phone number');
            return;
        }
        
        // Create WhatsApp message
        let whatsappMessage = `*New Property Booking Enquiry*\n\n`;
        whatsappMessage += `*Property Details:*\n`;
        whatsappMessage += `• Name: ${currentPropertyDetails.propertyName}\n`;
        whatsappMessage += `• Location: ${currentPropertyDetails.location}\n`;
        whatsappMessage += `• Type: ${currentPropertyDetails.type}\n\n`;
        whatsappMessage += `*Customer Details:*\n`;
        whatsappMessage += `• Name: ${name}\n`;
        whatsappMessage += `• Phone: ${phone}\n`;
        
        if (email) {
            whatsappMessage += `• Email: ${email}\n`;
        }
        
        if (visitDate) {
            const formattedDate = new Date(visitDate).toLocaleDateString('en-IN', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            whatsappMessage += `• Preferred Visit Date: ${formattedDate}\n`;
        }
        
        if (message) {
            whatsappMessage += `\n*Message:*\n${message}`;
        }
        
        whatsappMessage += `\n\n_Sent from RAGINI RUBI REAL ESTATE Website_`;
        
        // Encode message for URL
        const encodedMessage = encodeURIComponent(whatsappMessage);
        
        // Your WhatsApp number (replace with actual number)
        const whatsappNumber = '919876543210';
        
        // Create WhatsApp URL
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
        
        // Open WhatsApp
        window.open(whatsappURL, '_blank');
        
        // Close modal and reset form
        setTimeout(() => {
            closeBookingModalFunc();
        }, 500);
    });
}
