// ═══════════════════════════════════════════════════════════════════════════
//  SHREE HARI TECH — Premium Interaction & Motion Engine
//  Frameworks: GSAP, ScrollTrigger, Lenis Smooth Scroll
// ═══════════════════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
  // Register GSAP plugins
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  // Interaction Initializations
  initLenis();
  initLoader();
  initCursor();
  initTextSplits();
  initGsapTriggers();
  initCrmInteractiveMockup();
  initCrmParticleFlow();
  initScrollProgress();
  initNavbarScrollState();
  initServicesSplitTimeline();
  initDirectoryHoverProfile();
  initWhyUsStacking();
  initTechBlueprintInteraction();
  initJourneyTimelineProgress();
  initFaqAccordion();
  initFormControllers();
  initPopups();
  initMobileMenu();
  initMagneticElements();
});

// Helper utilities for media/motion preferences
const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isTouchDevice = () => window.matchMedia('(hover: none), (pointer: coarse)').matches;

/* ══════════════════════════════════════════════════════════════════════════
   1. Lenis Smooth Scroll Integration
   ══════════════════════════════════════════════════════════════════════════ */
let lenis;
function initLenis() {
  if (typeof Lenis === 'undefined' || prefersReducedMotion()) return;

  lenis = new Lenis({
    duration: 1.4,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 1.0,
    touchMultiplier: 1.2,
    infinite: false,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Sync scroll triggers with Lenis
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  // Smooth anchor link scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      
      const target = document.querySelector(targetId);
      if (target && lenis) {
        e.preventDefault();
        lenis.scrollTo(target, { offset: -80 });
      }
    });
  });
}

/* ══════════════════════════════════════════════════════════════════════════
   2. Swiss Editorial Page Loader
   ══════════════════════════════════════════════════════════════════════════ */
function initLoader() {
  const loader = document.getElementById('site-loader');
  if (!loader) return;

  const counterElement = loader.querySelector('.loader-counter');
  const duration = prefersReducedMotion() ? 0 : 1600;
  
  if (counterElement && !prefersReducedMotion()) {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 12) + 4;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
      }
      counterElement.textContent = String(progress).padStart(2, '0');
    }, 80);
  }

  const hideLoader = () => {
    loader.classList.add('hidden');
    setTimeout(() => loader.remove(), 800);
  };

  if (document.readyState === 'complete') {
    setTimeout(hideLoader, duration);
  } else {
    window.addEventListener('load', () => setTimeout(hideLoader, duration));
  }
}

/* ══════════════════════════════════════════════════════════════════════════
   3. Premium Luxury Custom Cursor
   ══════════════════════════════════════════════════════════════════════════ */
function initCursor() {
  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring || isTouchDevice()) return;

  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = `${mouseX}px`;
    dot.style.top = `${mouseY}px`;
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.left = `${ringX}px`;
    ring.style.top = `${ringY}px`;
    requestAnimationFrame(animateRing);
  }
  requestAnimationFrame(animateRing);

  // Hover states
  const interactives = document.querySelectorAll(
    'a, button, input, textarea, select, [role="button"], .faq-trigger, .directory-row, .why-stack-card'
  );
  interactives.forEach(el => {
    el.addEventListener('mouseenter', () => {
      dot.classList.add('hovering');
      ring.classList.add('hovering');
    });
    el.addEventListener('mouseleave', () => {
      dot.classList.remove('hovering');
      ring.classList.remove('hovering');
    });
  });
}

/* ══════════════════════════════════════════════════════════════════════════
   4. Typography Text-Split Animation Reveal
   ══════════════════════════════════════════════════════════════════════════ */
function initTextSplits() {
  if (prefersReducedMotion()) return;

  const splitHeaders = document.querySelectorAll('[data-gsap="split-text"]');
  splitHeaders.forEach(el => {
    const text = el.innerHTML;
    const lines = text.split('<br>');
    el.innerHTML = '';
    
    lines.forEach(lineText => {
      const lineWrapper = document.createElement('span');
      lineWrapper.style.display = 'block';
      lineWrapper.style.overflow = 'hidden';
      
      const lineInner = document.createElement('span');
      lineInner.className = 'split-line-inner';
      lineInner.style.display = 'block';
      lineInner.innerHTML = lineText;
      
      lineWrapper.appendChild(lineInner);
      el.appendChild(lineWrapper);
    });
  });
}

/* ══════════════════════════════════════════════════════════════════════════
   5. General GSAP Trigger Setup (Fade ups, Scale, Blur)
   ══════════════════════════════════════════════════════════════════════════ */
function initGsapTriggers() {
  if (prefersReducedMotion() || typeof gsap === 'undefined') return;

  // Split-text animations trigger
  const splitHeaders = document.querySelectorAll('[data-gsap="split-text"]');
  splitHeaders.forEach(el => {
    const inners = el.querySelectorAll('.split-line-inner');
    gsap.from(inners, {
      yPercent: 100,
      duration: 1.4,
      ease: 'power4.out',
      stagger: 0.15,
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        toggleActions: 'play none none none'
      }
    });
  });

  // General fade-up items
  const fadeUpItems = document.querySelectorAll('[data-gsap="fade-up"]');
  fadeUpItems.forEach(el => {
    const delay = parseFloat(el.getAttribute('data-delay')) || 0;
    gsap.from(el, {
      y: 40,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 90%',
        toggleActions: 'play none none none'
      },
      delay: delay
    });
  });

  // Depth reveals
  const depthItems = document.querySelectorAll('[data-gsap="depth-reveal"]');
  depthItems.forEach(el => {
    gsap.from(el, {
      scale: 0.96,
      filter: 'blur(8px)',
      opacity: 0,
      duration: 1.6,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });
  });

  // Metrics Count up trigger
  const countUpElements = document.querySelectorAll('.count-up');
  countUpElements.forEach(el => {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const suffix = el.textContent.trim();
    const obj = { value: 0 };
    
    gsap.to(obj, {
      value: target,
      duration: 2.5,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 92%'
      },
      onUpdate: () => {
        el.textContent = Math.floor(obj.value) + suffix;
      }
    });
  });
}

/* ══════════════════════════════════════════════════════════════════════════
   6. Custom CRM Interactive Mockup (3D Mouse Tilt)
   ══════════════════════════════════════════════════════════════════════════ */
function initCrmInteractiveMockup() {
  const container = document.getElementById('crm-mockup-container');
  const card = document.getElementById('crm-mockup-card');
  if (!container || !card || isTouchDevice() || prefersReducedMotion()) return;

  container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const rotateX = ((rect.height / 2 - mouseY) / (rect.height / 2)) * 6; // Max 6deg
    const rotateY = ((mouseX - rect.width / 2) / (rect.width / 2)) * 6; // Max 6deg
    
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  container.addEventListener('mouseleave', () => {
    card.style.transform = 'rotateX(0deg) rotateY(0deg)';
    card.style.transition = 'transform 0.8s var(--ease-editorial)';
  });

  container.addEventListener('mouseenter', () => {
    card.style.transition = 'none';
  });
}

/* ══════════════════════════════════════════════════════════════════════════
   7. CRM Workflow Pipeline Particle Flow Animation
   ══════════════════════════════════════════════════════════════════════════ */
function initCrmParticleFlow() {
  if (prefersReducedMotion() || typeof gsap === 'undefined') return;

  const particles = document.querySelectorAll('.flow-particle');
  particles.forEach((part, i) => {
    gsap.to(part, {
      duration: 6,
      repeat: -1,
      ease: 'none',
      stagger: 3,
      keyframes: [
        { 'offset-distance': '0%' },
        { 'offset-distance': '100%' }
      ],
      delay: i * 3
    });
  });

  // Highlight workflow nodes as particles pass them
  const nodes = document.querySelectorAll('.flow-node');
  setInterval(() => {
    particles.forEach(part => {
      const distanceStr = part.style.offsetDistance || '0%';
      const dist = parseFloat(distanceStr);
      
      nodes.forEach((node, nodeIdx) => {
        const targetPercent = nodeIdx * 25; // 0, 25, 50, 75, 100
        const circle = node.querySelector('.node-circle');
        
        if (Math.abs(dist - targetPercent) < 4) {
          circle.classList.add('active');
        } else {
          // Keep node 0 active at start
          if (nodeIdx !== 0 || dist > 5) {
            circle.classList.remove('active');
          }
        }
      });
    });
  }, 100);
}

/* ══════════════════════════════════════════════════════════════════════════
   8. Scroll Progress Indicator Updates
   ══════════════════════════════════════════════════════════════════════════ */
function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    const doc = document.documentElement;
    const total = doc.scrollHeight - doc.clientHeight;
    const progress = total > 0 ? (doc.scrollTop / total) * 100 : 0;
    bar.style.width = `${progress}%`;
  }, { passive: true });
}

/* ══════════════════════════════════════════════════════════════════════════
   9. Navbar Scrolled State Trigger
   ══════════════════════════════════════════════════════════════════════════ */
function initNavbarScrollState() {
  const nav = document.getElementById('navbar');
  if (!nav) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }, { passive: true });
}

/* ══════════════════════════════════════════════════════════════════════════
   10. Pinned Services Editorial Split Logic
   ══════════════════════════════════════════════════════════════════════════ */
function initServicesSplitTimeline() {
  if (prefersReducedMotion() || typeof gsap === 'undefined' || window.innerWidth < 1024) return;

  const canvas = document.getElementById('services-blueprint-canvas');
  if (!canvas) return;

  const coordEl = canvas.querySelector('.blueprint-coord');
  const cards = document.querySelectorAll('.service-editorial-card');
  
  // Coordinates corresponding to 8 different systems
  const coordinates = [
    'X: 19.52 | Y: 70.45', // Junagadh Police
    'X: 21.14 | Y: 72.88',
    'X: 23.02 | Y: 72.57',
    'X: 18.96 | Y: 73.08',
    'X: 22.30 | Y: 70.82',
    'X: 20.25 | Y: 71.94',
    'X: 19.98 | Y: 73.12',
    'X: 22.75 | Y: 71.18'
  ];

  cards.forEach((card, index) => {
    ScrollTrigger.create({
      trigger: card,
      start: 'top 40%',
      end: 'bottom 40%',
      onEnter: () => updateBlueprint(index),
      onEnterBack: () => updateBlueprint(index)
    });
  });

  function updateBlueprint(index) {
    if (coordEl) coordEl.textContent = coordinates[index] || coordinates[0];
    
    // Pulse rings in canvas
    gsap.fromTo(canvas.querySelectorAll('.blueprint-ring'), 
      { width: 50, height: 50, opacity: 0.8 },
      { width: 180, height: 180, opacity: 0.1, duration: 1.2, ease: 'power2.out' }
    );
  }
}

/* ══════════════════════════════════════════════════════════════════════════
   11. Interactive Directory Hover Profile Position Tracker
   ══════════════════════════════════════════════════════════════════════════ */
function initDirectoryHoverProfile() {
  if (isTouchDevice()) return;

  const rows = document.querySelectorAll('.directory-row');
  rows.forEach(row => {
    const preview = row.querySelector('.hover-profile-preview');
    if (!preview) return;

    row.addEventListener('mousemove', (e) => {
      const rect = row.getBoundingClientRect();
      const relativeX = e.clientX - rect.left;
      
      // Keep within bounds
      preview.style.left = `${relativeX - 100}px`;
    });
  });
}

/* ══════════════════════════════════════════════════════════════════════════
   12. Stacking Cards Pinning Logic
   ══════════════════════════════════════════════════════════════════════════ */
function initWhyUsStacking() {
  if (prefersReducedMotion() || typeof gsap === 'undefined' || window.innerWidth < 1024) return;

  const cards = document.querySelectorAll('.why-stack-card');
  cards.forEach((card, i) => {
    if (i === cards.length - 1) return; // Skip last card scaling
    
    const inner = card.querySelector('.stack-card-inner');
    gsap.to(inner, {
      scale: 0.94 - (cards.length - i) * 0.015,
      opacity: 0.8,
      scrollTrigger: {
        trigger: card,
        start: 'top 120px',
        endTrigger: '.why-cards-container',
        end: 'bottom 100%',
        scrub: true,
        pinSpacing: false
      }
    });
  });
}

/* ══════════════════════════════════════════════════════════════════════════
   13. Technical Stack Blueprint interaction lines drawing
   ══════════════════════════════════════════════════════════════════════════ */
function initTechBlueprintInteraction() {
  const nodes = document.querySelectorAll('.blueprint-node-item');
  nodes.forEach(node => {
    node.addEventListener('mouseenter', () => {
      node.style.borderLeft = '2px solid var(--accent-blue)';
      node.style.paddingLeft = '12px';
      node.style.transition = 'all 0.3s var(--ease-editorial)';
    });
    node.addEventListener('mouseleave', () => {
      node.style.borderLeft = '2px solid transparent';
      node.style.paddingLeft = '0px';
    });
  });
}

/* ══════════════════════════════════════════════════════════════════════════
   14. Journey timeline vertical line height tracking
   ══════════════════════════════════════════════════════════════════════════ */
function initJourneyTimelineProgress() {
  if (prefersReducedMotion() || typeof gsap === 'undefined') return;

  const timeline = document.querySelector('.journey-timeline-wrapper');
  const indicator = document.getElementById('timeline-progress-indicator');
  const steps = document.querySelectorAll('.timeline-step-item');
  
  if (!timeline || !indicator) return;

  gsap.to(indicator, {
    height: '100%',
    scrollTrigger: {
      trigger: timeline,
      start: 'top 60%',
      end: 'bottom 60%',
      scrub: true
    }
  });

  steps.forEach(step => {
    ScrollTrigger.create({
      trigger: step,
      start: 'top 60%',
      end: 'bottom 60%',
      onEnter: () => step.classList.add('active'),
      onLeaveBack: () => step.classList.remove('active')
    });
  });
}

/* ══════════════════════════════════════════════════════════════════════════
   15. FAQs Accordion System (Physical Easing Toggle)
   ══════════════════════════════════════════════════════════════════════════ */
function initFaqAccordion() {
  const items = document.querySelectorAll('.faq-accordion-item');
  items.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const panel = item.querySelector('.faq-panel');
    if (!trigger || !panel) return;

    trigger.addEventListener('click', () => {
      const active = item.classList.contains('active');
      
      // Close other active accordions
      items.forEach(i => {
        i.classList.remove('active');
        i.querySelector('.faq-panel').style.maxHeight = '0px';
        i.querySelector('.faq-trigger').setAttribute('aria-expanded', 'false');
      });

      if (!active) {
        item.classList.add('active');
        panel.style.maxHeight = `${panel.scrollHeight}px`;
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* ══════════════════════════════════════════════════════════════════════════
   16. Forms submit validation & WhatsApp redirect formatting
   ══════════════════════════════════════════════════════════════════════════ */
function initFormControllers() {
  document.querySelectorAll('.lead-capture-form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = form.querySelector('[name="name"]').value.trim();
      const email = form.querySelector('[name="email"]').value.trim();
      const phone = form.querySelector('[name="phone"]').value.trim();
      const businessField = form.querySelector('[name="business_name"]');
      const business = businessField ? businessField.value.trim() : '';
      const details = form.querySelector('[name="project_details"]').value.trim();

      if (!name || !email || !phone || !details) {
        showToast('Please fill out all required fields.');
        return;
      }

      let message = `Hello Shree Hari Tech, I would like to book a free project consultation.\n\n`;
      message += `*Name:* ${name}\n`;
      message += `*Email:* ${email}\n`;
      message += `*Phone:* ${phone}\n`;
      if (business) message += `*Business:* ${business}\n`;
      message += `*Details:* ${details}`;

      const whatsappUrl = `https://wa.me/919274171310?text=${encodeURIComponent(message)}`;

      // Close modal popup if active
      const modal = form.closest('.modal-overlay');
      if (modal) modal.classList.remove('show');

      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      form.reset();

      showToast('Enquiry formulated successfully. Opening WhatsApp...');
    });
  });
}

function showToast(msg) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = msg;
  document.body.appendChild(toast);

  // Trigger repaint
  toast.offsetWidth;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}

/* ══════════════════════════════════════════════════════════════════════════
   17. Modals/Popups (Consultation & Exit Intent Tracker)
   ══════════════════════════════════════════════════════════════════════════ */
function initPopups() {
  const consultPopup = document.getElementById('consultation-popup');
  const exitPopup = document.getElementById('exit-popup');
  const stickyCta = document.getElementById('sticky-cta');

  // Trigger consultation modal triggers
  document.querySelectorAll('.trigger-consultation').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (consultPopup) consultPopup.classList.add('show');
    });
  });

  // Close buttons
  document.querySelectorAll('.popup-close, .modal-overlay').forEach(closer => {
    closer.addEventListener('click', (e) => {
      if (e.target === closer || closer.classList.contains('popup-close')) {
        const modal = closer.closest('.modal-overlay');
        if (modal) modal.classList.remove('show');
      }
    });
  });

  // Sticky proposal CTA bar reveal
  window.addEventListener('scroll', () => {
    const hero = document.getElementById('hero');
    if (!hero || !stickyCta) return;
    
    if (window.scrollY > hero.offsetHeight * 0.8) {
      stickyCta.classList.add('show');
    } else {
      stickyCta.classList.remove('show');
    }
  }, { passive: true });

  // Auto consultation trigger after 30s
  if (consultPopup && !sessionStorage.getItem('consultShown')) {
    setTimeout(() => {
      if (!consultPopup.classList.contains('show') && (!exitPopup || !exitPopup.classList.contains('show'))) {
        consultPopup.classList.add('show');
        sessionStorage.setItem('consultShown', 'true');
      }
    }, 30000);
  }

  // Exit intent popup
  if (exitPopup && !sessionStorage.getItem('exitShown') && !isTouchDevice()) {
    document.addEventListener('mouseleave', (e) => {
      if (e.clientY < 20 && !exitPopup.classList.contains('show')) {
        exitPopup.classList.add('show');
        sessionStorage.setItem('exitShown', 'true');
      }
    });
  }
}

/* ══════════════════════════════════════════════════════════════════════════
   18. Mobile Hamburger Drawer Menu
   ══════════════════════════════════════════════════════════════════════════ */
function initMobileMenu() {
  const openBtn = document.getElementById('mobile-menu-btn');
  const closeBtn = document.getElementById('mobile-menu-close');
  const drawer = document.getElementById('mobile-navigation');
  const links = document.querySelectorAll('.mobile-nav-link');

  if (!openBtn || !drawer) return;

  openBtn.addEventListener('click', () => {
    drawer.classList.add('open');
    if (lenis) lenis.stop();
  });

  const closeFn = () => {
    drawer.classList.remove('open');
    if (lenis) lenis.start();
  };

  if (closeBtn) closeBtn.addEventListener('click', closeFn);
  links.forEach(l => l.addEventListener('click', closeFn));
}

/* ══════════════════════════════════════════════════════════════════════════
   19. Physical Micro-interactions: Magnetic Cursor Elements
   ══════════════════════════════════════════════════════════════════════════ */
function initMagneticElements() {
  if (isTouchDevice() || prefersReducedMotion()) return;

  const magneticTargets = document.querySelectorAll('.btn, .footer-social-links a, .nav-logo');
  magneticTargets.forEach(target => {
    target.addEventListener('mousemove', (e) => {
      const rect = target.getBoundingClientRect();
      const relX = e.clientX - rect.left - rect.width / 2;
      const relY = e.clientY - rect.top - rect.height / 2;

      // Shift slightly towards cursor
      gsap.to(target, {
        x: relX * 0.15,
        y: relY * 0.15,
        duration: 0.3,
        ease: 'power2.out'
      });
    });

    target.addEventListener('mouseleave', () => {
      gsap.to(target, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.4)'
      });
    });
  });
}
