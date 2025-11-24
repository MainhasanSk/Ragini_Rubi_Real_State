// Service Details Toggle
function toggleServiceDetails(button) {
    const description = button.nextElementSibling;
    const allDescriptions = document.querySelectorAll('.service-description');
    const allButtons = document.querySelectorAll('.service-details-btn');
    
    // Close all other descriptions
    allDescriptions.forEach(desc => {
        if (desc !== description) {
            desc.classList.remove('show');
        }
    });
    
    // Remove active class from all buttons
    allButtons.forEach(btn => {
        if (btn !== button) {
            btn.classList.remove('active');
        }
    });
    
    // Toggle current description
    description.classList.toggle('show');
    button.classList.toggle('active');
    
    // Smooth scroll to the opened service card
    if (description.classList.contains('show')) {
        setTimeout(() => {
            button.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'nearest' 
            });
        }, 100);
    }
}
