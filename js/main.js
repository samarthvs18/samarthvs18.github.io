// ==================== EMAILJS INITIALIZATION ====================
(function() {
  emailjs.init({
    publicKey: "DVtOk3W0YSnV5gNfc", // Replace with your actual EmailJS Public Key from dashboard
  });
})();

// ==================== THEME TOGGLE ====================
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const themeIcon = themeToggle.querySelector('i');
const themeText = themeToggle.querySelector('span');

// Check for saved theme preference
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
  body.setAttribute('data-theme', 'dark');
  themeIcon.classList.replace('fa-moon', 'fa-sun');
  themeText.textContent = 'Light';
}

themeToggle.addEventListener('click', () => {
  const theme = body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  body.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  
  if (theme === 'dark') {
    themeIcon.classList.replace('fa-moon', 'fa-sun');
    themeText.textContent = 'Light';
  } else {
    themeIcon.classList.replace('fa-sun', 'fa-moon');
    themeText.textContent = 'Dark';
  }
});

// ==================== TYPED.JS INITIALIZATION ====================
const typed = new Typed('#typed', {
  strings: [
    'Full Stack Developer',
    'AI/ML Enthusiast',
    'Problem Solver',
    'Tech Innovator',
    'Web Developer',
    'Java Enthusiast',
    'React Developer',
    'Tech Explorer'
  ],
  typeSpeed: 50,
  backSpeed: 30,
  backDelay: 2000,
  loop: true
});

// ==================== AOS (ANIMATE ON SCROLL) ====================
AOS.init({
  duration: 1000,
  once: true,
  offset: 100
});

// ==================== CUSTOM CURSOR ====================
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

if (cursor && cursorFollower) {
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
      cursorFollower.style.left = e.clientX + 'px';
      cursorFollower.style.top = e.clientY + 'px';
    }, 100);
  });

  // Cursor hover effect
  const hoverElements = document.querySelectorAll('a, button, .magnetic');
  hoverElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
      cursor.classList.add('hover');
    });
    element.addEventListener('mouseleave', () => {
      cursor.classList.remove('hover');
    });
  });
}

// ==================== MAGNETIC EFFECT ====================
const magneticElements = document.querySelectorAll('.magnetic');
magneticElements.forEach(element => {
  element.addEventListener('mousemove', (e) => {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    element.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
  });
  
  element.addEventListener('mouseleave', () => {
    element.style.transform = 'translate(0, 0)';
  });
});

// ==================== SMOOTH SCROLL ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offset = 80;
      const targetPosition = target.offsetTop - offset;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ==================== NAVBAR BACKGROUND ON SCROLL ====================
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    if (window.scrollY > 50) {
      navbar.style.boxShadow = 'var(--shadow)';
    } else {
      navbar.style.boxShadow = 'none';
    }
  }
});

// ==================== CONTACT FORM WITH EMAILJS ====================
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Clear previous errors
    const errorMessages = document.querySelectorAll('.error-message');
    if (errorMessages.length > 0) {
      errorMessages.forEach(el => el.textContent = '');
    }
    if (formMessage) {
      formMessage.style.display = 'none';
    }
    
    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Validation
    let isValid = true;
    
    if (name === '' || name.length < 2) {
      const nameError = document.getElementById('nameError');
      if (nameError) {
        nameError.textContent = 'Name must be at least 2 characters';
      }
      isValid = false;
    }
    
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === '' || !emailPattern.test(email)) {
      const emailError = document.getElementById('emailError');
      if (emailError) {
        emailError.textContent = 'Please enter a valid email address';
      }
      isValid = false;
    }
    
    if (message === '' || message.length < 10) {
      const messageError = document.getElementById('messageError');
      if (messageError) {
        messageError.textContent = 'Message must be at least 10 characters';
      }
      isValid = false;
    }
    
    if (!isValid) {
      showMessage('Please fix the errors above', 'error');
      return;
    }
    
    // Show loading state
    const submitBtn = contactForm.querySelector('.submit-btn');
    const btnIcon = submitBtn.querySelector('i');
    const btnText = submitBtn.querySelector('span');
    const originalText = btnText.textContent;
    submitBtn.disabled = true;
    btnIcon.className = 'fas fa-spinner fa-spin';
    btnText.textContent = 'Sending...';
    
    // Send email using EmailJS
    try {
      const response = await emailjs.sendForm(
        'service_4oythfg',        // Your Service ID
        'template_d6siy2g',       // Replace with your Template ID from EmailJS dashboard
        contactForm
      );
      
      console.log('SUCCESS!', response.status, response.text);
      showMessage(`Thank you, ${name}! Your message has been sent successfully. I'll get back to you soon!`, 'success');
      contactForm.reset();
      
    } catch (error) {
      console.error('FAILED...', error);
      showMessage('Oops! Something went wrong. Please try again or email me directly at samarthvamshy@example.com', 'error');
    } finally {
      // Reset button state
      submitBtn.disabled = false;
      btnIcon.className = 'fas fa-paper-plane';
      btnText.textContent = originalText;
    }
  });
}

function showMessage(text, type) {
  if (formMessage) {
    formMessage.textContent = text;
    formMessage.className = `message ${type}`;
    formMessage.style.display = 'block';
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
      formMessage.style.display = 'none';
    }, 5000);
  }
}

// ==================== HARDWARE PROJECTS MODAL ====================
function openHardwareModal() {
  const modal = document.getElementById('hardwareModal');
  if (modal) {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }
}

function closeHardwareModal() {
  const modal = document.getElementById('hardwareModal');
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    
    // Close all accordions when modal closes
    const accordions = document.querySelectorAll('.accordion-item');
    accordions.forEach(item => {
      item.classList.remove('active');
    });
  }
}

// Accordion Toggle Function
function toggleAccordion(header) {
  const accordionItem = header.parentElement;
  const allItems = document.querySelectorAll('.accordion-item');
  
  // Close other accordions (optional - remove this loop if you want multiple open at once)
  allItems.forEach(item => {
    if (item !== accordionItem) {
      item.classList.remove('active');
    }
  });
  
  // Toggle current accordion
  accordionItem.classList.toggle('active');
}

// Close modal when clicking outside
window.onclick = function(event) {
  const modal = document.getElementById('hardwareModal');
  if (modal && event.target == modal) {
    closeHardwareModal();
  }
}

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    const modal = document.getElementById('hardwareModal');
    if (modal && modal.style.display === 'block') {
      closeHardwareModal();
    }
  }
});

// ==================== MOBILE MENU TOGGLE ====================
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

if (mobileMenu && navLinks) {
  mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenu.classList.toggle('active');
  });

  // Close mobile menu when clicking on a link
  const navLinkItems = document.querySelectorAll('.nav-link');
  navLinkItems.forEach(link => {
    link.addEventListener('click', () => {
      if (navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        mobileMenu.classList.remove('active');
      }
    });
  });
}

// ==================== CONSOLE WELCOME MESSAGE ====================
console.log('%c👋 Welcome to Samarth\'s Portfolio!', 'color: #d00000; font-size: 20px; font-weight: bold;');
console.log('%cInterested in the code? Check out my GitHub!', 'color: #666; font-size: 14px;');
