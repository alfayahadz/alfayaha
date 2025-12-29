document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  if (menuBtn) {
    menuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth'
        });
        // Close menu on mobile after click
        if (navLinks) {
          navLinks.classList.remove('active');
        }
      }
    });
  });

  // Scroll Animations using Intersection Observer
  const observerOptions = {
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.section-title, .product-card, .feature-item, .about-content').forEach(section => {
    section.classList.add('fade-in-section');
    observer.observe(section);
  });

  // Product Filtering Logic
  const filterBtns = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');

  if (filterBtns.length > 0 && productCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filterValue = btn.getAttribute('data-filter');
        productCards.forEach(card => {
          if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
            card.classList.remove('hidden');
            card.style.animation = 'none';
            card.offsetHeight; /* trigger reflow */
            card.style.animation = 'fadeIn 0.5s ease';
          } else {
            card.classList.add('hidden');
          }
        });
      });
    });
  }

  // Lightbox Functionality
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeBtn = document.querySelector('.lightbox-close');

  if (lightbox && lightboxImg && closeBtn) {
    document.querySelectorAll('.product-image').forEach(img => {
      img.addEventListener('click', () => {
        lightboxImg.src = img.src;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
      img.style.cursor = 'zoom-in';
    });

    const closeLightbox = () => {
      lightbox.classList.remove('active');
      document.body.style.overflow = 'auto';
    };

    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
      }
    });
  }
});

function sendToWhatsapp(e) {
  e.preventDefault();

  const nameEl = document.getElementById("name");
  const emailEl = document.getElementById("email");
  const messageEl = document.getElementById("message");

  if (!nameEl || !emailEl || !messageEl) {
    console.warn("Contact form elements not found.");
    return;
  }

  var name = nameEl.value;
  var email = emailEl.value;
  var message = messageEl.value;

  var phonenumber = "213794583797";

  var url = "https://wa.me/" + phonenumber + "?text="
    + "*اسم العميل:* " + name + "%0a"
    + "*البريد:* " + email + "%0a%0a"
    + "*الرسالة:*%0a" + message;

  window.open(url, '_blank').focus();
}
