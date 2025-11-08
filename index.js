// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

  // Close mobile menu when clicking on a link
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
    });
  });
}

// Header scroll effect
window.addEventListener("scroll", () => {
  const header = document.getElementById("header");
  if (header) {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }
});

// Testimonials Slider
class TestimonialSlider {
  constructor() {
    this.slides = document.querySelectorAll(".testimonial-slide");
    this.dots = document.querySelectorAll(".dot");
    this.prevBtn = document.querySelector(".prev-btn");
    this.nextBtn = document.querySelector(".next-btn");
    this.currentIndex = 0;
    this.autoSlideInterval = null;

    // Only initialize if elements exist
    if (
      this.slides.length > 0 &&
      this.dots.length > 0 &&
      this.prevBtn &&
      this.nextBtn
    ) {
      this.init();
    }
  }

  init() {
    // Add event listeners
    this.prevBtn.addEventListener("click", () => this.prevSlide());
    this.nextBtn.addEventListener("click", () => this.nextSlide());

    // Add dot click events
    this.dots.forEach((dot) => {
      dot.addEventListener("click", (e) => {
        const index = parseInt(e.target.getAttribute("data-index"));
        this.goToSlide(index);
      });
    });

    // Start auto-slide
    this.startAutoSlide();

    // Pause auto-slide on hover
    const sliderContainer = document.querySelector(
      ".testimonial-slider-container"
    );
    if (sliderContainer) {
      sliderContainer.addEventListener("mouseenter", () =>
        this.stopAutoSlide()
      );
      sliderContainer.addEventListener("mouseleave", () =>
        this.startAutoSlide()
      );
    }

    // Initialize first slide
    this.showSlide(this.currentIndex);
  }

  showSlide(index) {
    // Hide all slides
    this.slides.forEach((slide) => {
      slide.classList.remove("active");
    });

    // Remove active class from all dots
    this.dots.forEach((dot) => {
      dot.classList.remove("active");
    });

    // Show current slide and activate dot
    this.slides[index].classList.add("active");
    this.dots[index].classList.add("active");

    this.currentIndex = index;
  }

  nextSlide() {
    const nextIndex = (this.currentIndex + 1) % this.slides.length;
    this.showSlide(nextIndex);
  }

  prevSlide() {
    const prevIndex =
      (this.currentIndex - 1 + this.slides.length) % this.slides.length;
    this.showSlide(prevIndex);
  }

  goToSlide(index) {
    this.showSlide(index);
  }

  startAutoSlide() {
    this.stopAutoSlide(); // Clear any existing interval
    this.autoSlideInterval = setInterval(() => {
      this.nextSlide();
    }, 5000); // Change slide every 5 seconds
  }

  stopAutoSlide() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
      this.autoSlideInterval = null;
    }
  }
}

// Form submission for Netlify Forms
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    // Show loading state
    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    // Let Netlify handle the form submission naturally
    // This timeout is just for better UX
    setTimeout(() => {
      // The form will be submitted to Netlify automatically
      // We just show a success message and reset the form
      alert("Thank you for your message! I will get back to you soon.");
      contactForm.reset();
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }, 1500);
  });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
      });
    }
  });
});

// Initialize testimonial slider when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new TestimonialSlider();
});

// Add animation on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe elements for animation
document
  .querySelectorAll(".project-card, .about-content, .testimonial-card")
  .forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });
