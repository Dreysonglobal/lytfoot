// Add this at the beginning of your script.js file, or replace the existing initSolutionTabs function

function initSolutionTabs() {
    const tabs = document.querySelectorAll('.nav-tab');
    const sections = document.querySelectorAll('.solution-section');
    
    if (tabs.length === 0 || sections.length === 0) return;
    
    // Function to activate a specific tab and show its section
    function activateTab(tab) {
        // Remove active class from all tabs
        tabs.forEach(t => t.classList.remove('active'));
        
        // Add active class to clicked tab
        tab.classList.add('active');
        
        // Get target section ID
        const targetId = tab.getAttribute('href').substring(1);
        
        // Show target section, hide others
        sections.forEach(section => {
            if (section.id === targetId) {
                section.style.display = 'block';
                // Smooth scroll to section
                setTimeout(() => {
                    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
            } else {
                section.style.display = 'none';
            }
        });
    }
    
    // Set initial state - show first section, hide others
    const activeTab = document.querySelector('.nav-tab.active') || tabs[0];
    activateTab(activeTab);
    
    // Add click event to all tabs
    tabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            activateTab(this);
        });
    });
}
// Image Slider for Hero Section
document.addEventListener('DOMContentLoaded', function() {
    // Initialize image slider
    initImageSlider();
    
    // Initialize modal functionality
    initModal();
    
    // Initialize solution page tabs
    initSolutionTabs();
    
    // Initialize form submissions
    initForms();
});

// Image Slider Functionality
function initImageSlider() {
    const slides = document.querySelectorAll('.slide');
    if (slides.length === 0) return;
    
    let currentSlide = 0;
    
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[index].classList.add('active');
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    
    // Change slide every 3 seconds
    setInterval(nextSlide, 3000);
}

// Modal Functionality
function initModal() {
    let modal = document.getElementById('demo-modal');
    const requestDemoBtns = document.querySelectorAll('#request-demo-btn, #detail-request-demo, #hero-request-demo, #clients-request-demo');

    // If the demo modal isn't present on this page, inject it so the button works site-wide
    if (!modal) {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = `
            <div class="modal" id="demo-modal">
                <div class="modal-content">
                    <span class="close">&times;</span>
                    <h2>Request a Demo</h2>
                    <form id="demo-form">
                        <div class="form-group">
                            <label for="name">Full Name</label>
                            <input type="text" id="name" name="name" required>
                        </div>
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input type="email" id="email" name="email" required>
                        </div>
                        <div class="form-group">
                            <label for="company">Company</label>
                            <input type="text" id="company" name="company" required>
                        </div>
                        <div class="form-group">
                            <label for="message">Message</label>
                            <textarea id="message" name="message" rows="4"></textarea>
                        </div>
                        <button type="submit" class="btn">Submit Request</button>
                    </form>
                </div>
            </div>
        `;
        document.body.appendChild(wrapper.firstElementChild);
        modal = document.getElementById('demo-modal');
    }

    // Attach form submission handler to demo-form (whether injected or already in HTML)
    const demoForm = document.getElementById('demo-form');
    if (demoForm) {
        demoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            submitForm(this, 'info@lytfoot.co.uk', 'Demo Request');
        });
    }

    const closeBtn = modal ? modal.querySelector('.close') : null;
    
    // Open modal when request demo button is clicked
    requestDemoBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            modal.style.display = 'block';
        });
    });
    
    // Close modal when X is clicked
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Solution Page Tabs
function initSolutionTabs() {
    const tabs = document.querySelectorAll('.nav-tab');
    const sections = document.querySelectorAll('.solution-section');
    
    if (tabs.length === 0) return;
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Get target section ID
            const targetId = this.getAttribute('href').substring(1);
            
            // Hide all sections
            sections.forEach(section => {
                section.style.display = 'none';
            });
            
            // Show target section
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.style.display = 'block';
            }
        });
    });
}

// Form Submission Handling
function initForms() {
    // Attach handlers to other form types (list-data-form, monetize-form, etc.)
    const otherFormIds = ['list-data-form', 'monetize-form', 'consultation-form', 'compliance-form'];
    
    otherFormIds.forEach(formId => {
        const form = document.getElementById(formId);
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                let subject = 'Form Submission';
                switch(formId) {
                    case 'list-data-form':
                        subject = 'List Data Request';
                        break;
                    case 'monetize-form':
                        subject = 'Monetize Data Request';
                        break;
                    case 'consultation-form':
                        subject = 'Consultation Request';
                        break;
                    case 'compliance-form':
                        subject = 'Compliance Request';
                        break;
                }
                
                submitForm(this, 'info@lytfoot.co.uk', subject);
            });
        }
    });
}

// Generic Form Submission Function
function submitForm(form, email, subject) {
    const formData = new FormData(form);
    const data = {};
    
    // Convert FormData to object
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    
    // Build email body from form data
    let bodyLines = [];
    for (let key in data) {
        bodyLines.push(key + ': ' + data[key]);
    }
    const body = bodyLines.join('\n');

    // Create a mailto: URL that opens the default mail client with the data
    const mailto = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Provide feedback to the user and close the modal BEFORE opening email
    showNotification('Opening your email client to send the request...', 'success');

    // Reset form and close modal
    form.reset();
    const modal = document.getElementById('demo-modal');
    if (modal) {
        modal.style.display = 'none';
    }

    // Log the constructed mailto for debugging
    console.log('Opening mailto:', mailto);
    
    // Open the user's default mail client with the prefilled email
    // Use setTimeout to allow the notification and modal to close first
    setTimeout(function() {
        window.location.href = mailto;
    }, 100);
}

// Notification Function
function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 4px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    if (type === 'success') {
        notification.style.backgroundColor = '#27ae60';
    } else {
        notification.style.backgroundColor = '#e74c3c';
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Add CSS for notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);