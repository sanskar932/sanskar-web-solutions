/* ============================================================
   SANSKAR WEB SOLUTIONS — main.js
   Version: 2.0.0 | Production Ready
   Covers: Preloader, Cursor, Nav, Particles, Typed, AOS,
           Counters, Spotlight, Forms, Translate, Admin, Easter Egg
   ============================================================ */

'use strict';

/* ============================================================
   0. CONSTANTS & CONFIG
   ============================================================ */
const API_BASE  = 'https://sanskar-backend-d8t9.onrender.com/api/v1';
const WA_NUMBER = '919696065037';

/* ============================================================
   1. EASTER EGG — Console Warning
   Fires immediately so devs see it the moment they open DevTools
   ============================================================ */
(function fireEasterEgg() {
  const styles = {
    big:    'font-size:22px; font-weight:800; color:#0ea5e9; font-family:monospace;',
    normal: 'font-size:13px; color:#94a3b8; font-family:monospace; line-height:2;',
    accent: 'font-size:13px; color:#38bdf8; font-weight:600; font-family:monospace;',
    warn:   'font-size:13px; color:#f59e0b; font-weight:700; font-family:monospace;',
  };

  console.log('%c⚡ Hey, you! Yes, you — the curious developer.', styles.big);
  console.log(
    '%cSo you opened DevTools on my website. Respect.\n' +
    'This site was hand-crafted by Sanskar Gupta,\n' +
    'a web developer based in Bahraich, Uttar Pradesh.\n' +
    'Every line of code here was written from scratch.\n' +
    'No templates. No drag-and-drop builders. Just clean code.',
    styles.normal
  );
  console.log('%c🚀 Looking for a developer for your own project?', styles.warn);
  console.log('%cWhatsApp me right now: https://wa.me/' + WA_NUMBER, styles.accent);
  console.log('%c📧 Email: sanskargupta1295@gmail.com', styles.accent);
  console.log(
    '%c⚠️  Stop snooping and hire me instead. Much better use of your time.',
    styles.warn
  );
})();

/* ============================================================
   2. RENDER WAKE-UP
   NOTE FOR DEVELOPER: Client-side /health pings add unnecessary
   network overhead on every page load and expose your backend URL
   to all visitors. Implement server-side warming instead:
   — Use Render's built-in "always on" paid plan, OR
   — Set up a cron job (e.g. cron-job.org) to ping /health
     server-to-server every 14 minutes on a free plan.
   ============================================================ */

/* ============================================================
   3. DOM READY WRAPPER
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {

  /* ----------------------------------------------------------
     3A. PRELOADER — 3D Cyber-Cube dismiss
     The cube spin (spinCube), glow (pulseCore), and blink
     (blinkStep) are all pure CSS keyframe animations — this JS
     block only handles dismissal by adding the .hidden class
     after the page has loaded. The CSS transition then fades
     the preloader out smoothly.
     ---------------------------------------------------------- */
  const preloader = document.getElementById('preloader');

  if (preloader) {
    /* Let the CSS fill-bar animation complete (1.8s),
       then add a brief buffer and slide the preloader up */
    const dismissPreloader = () => {
      preloader.classList.add('hidden');
      preloader.addEventListener('transitionend', () => {
        preloader.style.display = 'none';
        document.body.classList.add('page-fade');
      }, { once: true });
    };

    /* Minimum display: 2000ms so the animation looks intentional */
    const minDisplayTime = 2000;
    const startTime      = performance.now();

    window.addEventListener('load', () => {
      const elapsed   = performance.now() - startTime;
      const remaining = Math.max(0, minDisplayTime - elapsed);
      setTimeout(dismissPreloader, remaining);
    });

    /* Hard failsafe: dismiss after 4s no matter what */
    setTimeout(dismissPreloader, 4000);
  }

  /* ----------------------------------------------------------
     3B. FOOTER YEAR — keeps copyright always current
     ---------------------------------------------------------- */
  const footerYear = document.getElementById('footerYear');
  if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
  }

  /* ----------------------------------------------------------
     3C. CUSTOM CURSOR — Desktop only (>768px)
     On mobile, touch devices have no mouse pointer so this
     rAF loop would burn battery for zero visual benefit.
     ---------------------------------------------------------- */
  const IS_DESKTOP = window.innerWidth > 768;

  if (IS_DESKTOP) {
    const cursorDot     = document.getElementById('cursorDot');
    const cursorOutline = document.getElementById('cursorOutline');

    if (cursorDot && cursorOutline) {
      let mouseX = -100, mouseY = -100;
      let outlineX = -100, outlineY = -100;

      document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
      });

      /* Outline trails with lerp smoothing */
      function animateOutline() {
        outlineX += (mouseX - outlineX) * 0.12;
        outlineY += (mouseY - outlineY) * 0.12;
        cursorOutline.style.transform =
          `translate(${outlineX}px, ${outlineY}px) translate(-50%, -50%)`;
        requestAnimationFrame(animateOutline);
      }
      animateOutline();

      document.addEventListener('mouseleave', () => {
        cursorDot.style.opacity     = '0';
        cursorOutline.style.opacity = '0';
      });
      document.addEventListener('mouseenter', () => {
        cursorDot.style.opacity     = '1';
        cursorOutline.style.opacity = '0.5';
      });

      document.querySelectorAll('a, button, .bento-card, .portfolio-card, .testimonial-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
          cursorDot.style.width       = '14px';
          cursorDot.style.height      = '14px';
          cursorOutline.style.width   = '56px';
          cursorOutline.style.height  = '56px';
          cursorOutline.style.opacity = '0.2';
        });
        el.addEventListener('mouseleave', () => {
          cursorDot.style.width       = '8px';
          cursorDot.style.height      = '8px';
          cursorOutline.style.width   = '36px';
          cursorOutline.style.height  = '36px';
          cursorOutline.style.opacity = '0.5';
        });
      });
    }
  }

  /* ----------------------------------------------------------
     3D. HEADER — scroll-based styling
     ---------------------------------------------------------- */
  const header = document.getElementById('header');

  if (header) {
    const handleHeaderScroll = () => {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleHeaderScroll, { passive: true });
    handleHeaderScroll(); /* Run once on load */
  }

  /* ----------------------------------------------------------
     3E. HAMBURGER MENU & MOBILE NAV
     ---------------------------------------------------------- */
  const hamburger = document.getElementById('hamburger');
  const navMenu   = document.getElementById('navMenu');

  /* Create overlay dynamically so it doesn't need to be in every HTML file */
  const navOverlay = document.createElement('div');
  navOverlay.className = 'nav-overlay';
  document.body.appendChild(navOverlay);

  function openNav() {
    hamburger.classList.add('active');
    navMenu.classList.add('open');
    navOverlay.classList.add('active');
    document.body.classList.add('menu-open');
    hamburger.setAttribute('aria-expanded', 'true');
  }

  function closeNav() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('open');
    navOverlay.classList.remove('active');
    document.body.classList.remove('menu-open');
    hamburger.setAttribute('aria-expanded', 'false');
  }

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = navMenu.classList.contains('open');
      isOpen ? closeNav() : openNav();
    });

    navOverlay.addEventListener('click', closeNav);

    /* Close nav when a nav link is clicked on mobile */
    navMenu.querySelectorAll('.nav-link:not(.dropdown-toggle)').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) closeNav();
      });
    });

    /* Mobile dropdown toggle */
    const dropdownToggle = navMenu.querySelector('.dropdown-toggle');
    if (dropdownToggle) {
      dropdownToggle.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          const parent = dropdownToggle.closest('.nav-dropdown');
          parent.classList.toggle('open');
        }
      });
    }

    /* Close nav on resize to desktop */
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) closeNav();
    });

    /* Trap focus inside mobile nav when open */
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) closeNav();
    });
  }

  /* ----------------------------------------------------------
     3F. ACTIVE NAV LINK — based on current page URL
     ---------------------------------------------------------- */
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href && href !== '#') {
      const linkPage = href.split('/').pop();
      if (linkPage === currentPath) {
        link.classList.add('active');
      }
    }
  });

  /* ----------------------------------------------------------
     3G. PARTICLES.JS INITIALIZATION — Desktop only (>768px)
     Running a 60-particle canvas animation on a mobile CPU
     causes severe frame drops. On mobile the hero section
     uses a pure-CSS gradient background instead.
     ---------------------------------------------------------- */
  if (IS_DESKTOP && document.getElementById('particles-js') && typeof particlesJS === 'function') {
    particlesJS('particles-js', {
      particles: {
        number: {
          value: 60,
          density: { enable: true, value_area: 900 }
        },
        color: { value: '#0ea5e9' },
        shape: { type: 'circle' },
        opacity: {
          value: 0.35,
          random: true,
          anim: { enable: true, speed: 0.8, opacity_min: 0.1, sync: false }
        },
        size: {
          value: 2.5,
          random: true,
          anim: { enable: false }
        },
        line_linked: {
          enable: true,
          distance: 140,
          color: '#0ea5e9',
          opacity: 0.15,
          width: 1
        },
        move: {
          enable: true,
          speed: 1.2,
          direction: 'none',
          random: true,
          straight: false,
          out_mode: 'out',
          bounce: false
        }
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: { enable: true, mode: 'grab' },
          onclick: { enable: true, mode: 'push' },
          resize: true
        },
        modes: {
          grab:   { distance: 180, line_linked: { opacity: 0.45 } },
          push:   { particles_nb: 3 },
          remove: { particles_nb: 2 }
        }
      },
      retina_detect: true
    });
  }

  /* ----------------------------------------------------------
     3H. TYPED.JS — Dynamic Typing Effect in Hero
     Only runs if the #typedText element and Typed are present
     ---------------------------------------------------------- */
  if (document.getElementById('typedText') && typeof Typed === 'function') {
    new Typed('#typedText', {
      strings: [
        'Web Developer',
        'Website Designer',
        'Graphic Designer',
        'Video Editor',
        'AI Tools Expert',
        'Your Digital Partner'
      ],
      typeSpeed:   55,
      backSpeed:   30,
      backDelay:   1800,
      startDelay:  400,
      loop:        true,
      smartBackspace: true,
      showCursor:  true,
      cursorChar:  '|'
    });
  }

  /* ----------------------------------------------------------
     3I. AOS — Animate on Scroll
     ---------------------------------------------------------- */
  if (typeof AOS === 'object' && typeof AOS.init === 'function') {
    AOS.init({
      duration:   750,
      easing:     'cubic-bezier(0.4, 0, 0.2, 1)',
      once:       true,
      offset:     80,
      delay:      0,
      anchorPlacement: 'top-bottom'
    });
  }

  /* ----------------------------------------------------------
     3J. STATS COUNTER ANIMATION
     Looks for elements with [data-target] and counts up to them
     when they enter the viewport
     ---------------------------------------------------------- */
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');

  if (statNumbers.length > 0) {
    const easeOutQuad = (t) => t * (2 - t);

    const animateCounter = (el) => {
      const target   = parseInt(el.getAttribute('data-target'), 10);
      const duration = 1800; /* ms */
      const start    = performance.now();

      const step = (now) => {
        const elapsed  = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const value    = Math.floor(easeOutQuad(progress) * target);
        el.textContent = value;

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          el.textContent = target;
        }
      };
      requestAnimationFrame(step);
    };

    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.counted) {
          entry.target.dataset.counted = 'true';
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });

    statNumbers.forEach(el => counterObserver.observe(el));
  }

  /* ----------------------------------------------------------
     3K. SPOTLIGHT BORDER HOVER EFFECT — Desktop only (>768px)
     Touch devices don't fire mousemove in the same way, and
     attaching dozens of event listeners to cards on mobile
     wastes memory and causes janky scroll behaviour.
     ---------------------------------------------------------- */
  if (IS_DESKTOP) {
    const spotlightCards = document.querySelectorAll('.spotlight-card');
    spotlightCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x    = e.clientX - rect.left;
        const y    = e.clientY - rect.top;
        card.style.setProperty('--spotlight-x', `${x}px`);
        card.style.setProperty('--spotlight-y', `${y}px`);
      });
    });
  }

  /* ----------------------------------------------------------
     3L. BACK TO TOP BUTTON
     ---------------------------------------------------------- */
  const backToTopBtn = document.getElementById('backToTop');

  if (backToTopBtn) {
    const toggleBackToTop = () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    };

    window.addEventListener('scroll', toggleBackToTop, { passive: true });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ----------------------------------------------------------
     3M. GOOGLE TRANSLATE INTEGRATION
     Uses the standard cookie approach to toggle Hindi/English.
     We avoid DOM surgery on Google's injected elements because
     that breaks unpredictably across browser versions and
     violates Google Translate TOS.

     How this works:
     — Google Translate reads the "googtrans" cookie on load.
     — Setting it to "/en/hi" switches the page to Hindi.
     — Clearing it and reloading restores English.
     — We hide the widget div via CSS (it's off-screen in
       #google_translate_element which has display:none).
     — The only Google UI we suppress is the top banner frame,
       done once via a safe CSS rule injected into <head>.
     ---------------------------------------------------------- */

  /* Inject one-time CSS to suppress Google's top banner */
  (function suppressGoogleBanner() {
    const style = document.createElement('style');
    style.textContent =
      '.goog-te-banner-frame { display: none !important; }' +
      'body { top: 0 !important; }' +
      '#google_translate_element { display: none !important; }';
    document.head.appendChild(style);
  })();

  let isHindi          = false;
  const translateBtn   = document.getElementById('translateBtn');
  const translateLabel = document.getElementById('translateLabel');

  /* Minimal TranslateElement init — just registers the widget,
     we never display it directly */
  window.googleTranslateElementInit = function () {
    if (typeof google === 'undefined' || !google.translate) return;
    new google.translate.TranslateElement(
      { pageLanguage: 'en', includedLanguages: 'hi', autoDisplay: false },
      'google_translate_element'
    );
  };

  /* Read current language from cookie */
  function getCurrentLang() {
    const match = document.cookie.match(/googtrans=\/en\/([a-z]{2})/);
    return match ? match[1] : 'en';
  }

  /* Set the googtrans cookie and reload — cleanest cross-browser method */
  function setLanguage(lang) {
    if (lang === 'en') {
      /* Clear cookie on both root and domain to fully reset */
      document.cookie = 'googtrans=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
      document.cookie = `googtrans=; path=/; domain=.${window.location.hostname}; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
    } else {
      document.cookie = `googtrans=/en/${lang}; path=/;`;
      document.cookie = `googtrans=/en/${lang}; path=/; domain=.${window.location.hostname};`;
    }
    window.location.reload();
  }

  /* Initialise button label from current cookie state */
  if (getCurrentLang() === 'hi') {
    isHindi = true;
    if (translateLabel) translateLabel.textContent = 'English';
  }

  if (translateBtn) {
    translateBtn.addEventListener('click', () => {
      setLanguage(isHindi ? 'en' : 'hi');
    });
  }

  /* ----------------------------------------------------------
     3N. CONTACT FORM — Honeypot + Validation + API Submission
     Works for any page that has a #contactForm element
     ---------------------------------------------------------- */
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    const formSuccess  = document.getElementById('formSuccess');
    const formError    = document.getElementById('formError');
    const submitBtn    = document.getElementById('submitBtn');
    const submitBtnText = submitBtn ? submitBtn.querySelector('.btn-text') : null;
    const submitBtnLoader = submitBtn ? submitBtn.querySelector('.btn-loader') : null;

    /* Show/hide submission status messages */
    function showFormMessage(type, message) {
      if (formSuccess) { formSuccess.style.display = 'none'; formSuccess.textContent = ''; }
      if (formError)   { formError.style.display   = 'none'; formError.textContent   = ''; }

      if (type === 'success' && formSuccess) {
        formSuccess.textContent = message;
        formSuccess.style.display = 'block';
        formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else if (type === 'error' && formError) {
        formError.textContent = message;
        formError.style.display = 'block';
        formError.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }

    /* Toggle loading state on submit button */
    function setSubmitLoading(isLoading) {
      if (!submitBtn) return;
      submitBtn.disabled = isLoading;
      if (submitBtnText)   submitBtnText.style.display   = isLoading ? 'none'   : 'inline';
      if (submitBtnLoader) submitBtnLoader.style.display = isLoading ? 'inline' : 'none';
    }

    /* Inline validation */
    function validateField(input) {
      const value = input.value.trim();
      const parent = input.closest('.form-group');
      let errorEl = parent ? parent.querySelector('.form-error-msg') : null;

      input.classList.remove('error');
      if (errorEl) errorEl.textContent = '';

      if (input.hasAttribute('required') && !value) {
        input.classList.add('error');
        if (errorEl) errorEl.textContent = 'This field is required.';
        return false;
      }

      if (input.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          input.classList.add('error');
          if (errorEl) errorEl.textContent = 'Please enter a valid email address.';
          return false;
        }
      }

      if (input.type === 'tel' && value) {
        const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,8}$/;
        if (!phoneRegex.test(value.replace(/\s/g, ''))) {
          input.classList.add('error');
          if (errorEl) errorEl.textContent = 'Please enter a valid phone number.';
          return false;
        }
      }

      return true;
    }

    /* Live validation on blur */
    contactForm.querySelectorAll('.form-control[required]').forEach(input => {
      input.addEventListener('blur', () => validateField(input));
      input.addEventListener('input', () => {
        if (input.classList.contains('error')) validateField(input);
      });
    });

    /* Form submission */
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      /* 🍯 HONEYPOT CHECK — if bot_catcher is filled, silently fake success */
      const honeypot = contactForm.querySelector('[name="bot_catcher"]');
      if (honeypot && honeypot.value.trim() !== '') {
        console.warn('[Security] Honeypot triggered. Bot submission blocked silently.');
        showFormMessage('success', '✅ Thank you! Your message has been sent. We will get back to you soon.');
        contactForm.reset();
        return;
      }

      /* Validate all required fields */
      const allFields = contactForm.querySelectorAll('.form-control[required]');
      let isValid = true;
      allFields.forEach(field => {
        if (!validateField(field)) isValid = false;
      });

      if (!isValid) {
        showFormMessage('error', '⚠️ Please fill in all required fields correctly.');
        return;
      }

      /* Gather form data */
      const name    = contactForm.querySelector('[name="name"]')?.value.trim()    || '';
      const email   = contactForm.querySelector('[name="email"]')?.value.trim()   || '';
      const phone   = contactForm.querySelector('[name="phone"]')?.value.trim()   || '';
      const message = contactForm.querySelector('[name="message"]')?.value.trim() || '';
      const service = contactForm.querySelector('[name="service"]')?.value.trim() || '';

      /* Set loading state */
      setSubmitLoading(true);
      showFormMessage('', '');

      try {
        const response = await fetch(`${API_BASE}/leads`, {
          method:  'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, phone, message, service }),
        });

        if (response.ok) {
          showFormMessage(
            'success',
            `✅ Thank you, ${name}! Your message has been received. I'll WhatsApp or call you within a few hours.`
          );
          contactForm.reset();
        } else {
          const errData = await response.json().catch(() => ({}));
          throw new Error(errData.message || `Server error: ${response.status}`);
        }
      } catch (err) {
        console.error('[Form] Submission failed:', err);
        showFormMessage(
          'error',
          '❌ Something went wrong sending your message. Please WhatsApp me directly at +91 96960 65037 — I respond within the hour.'
        );
      } finally {
        setSubmitLoading(false);
      }
    });

    /* -------------------------------------------------------
       After a successful form submission, you have two options
       to notify yourself as the site owner:

       OPTION A (Recommended): Configure your backend at
       POST /api/v1/leads to send you a WhatsApp message or
       email via Twilio / EmailJS whenever a new lead arrives.
       That keeps all notification logic server-side.

       OPTION B (Manual fallback): Uncomment the block below.
       It opens a pre-filled WhatsApp message in a new tab so
       you can see the lead detail immediately. The user WILL
       see a new tab briefly — inform them in the UX if needed.

       function notifyOwner(name, phone, topic) {
         const text = encodeURIComponent(
           'New lead from website!\nName: ' + name +
           '\nPhone: ' + phone + '\nTopic: ' + topic
         );
         window.open('https://wa.me/' + WA_NUMBER + '?text=' + text, '_blank', 'noopener');
       }
       notifyOwner(name, phone, service || message.substring(0, 60));
       ------------------------------------------------------- */
  }

  /* ----------------------------------------------------------
     3O. ADMIN DASHBOARD
     Only activates when #adminPanel exists (admin.html)
     ---------------------------------------------------------- */
  const adminPanel = document.getElementById('adminPanel');

  if (adminPanel) {
    initAdminDashboard();
  }

  /* ----------------------------------------------------------
     3P. SMOOTH SCROLL for anchor links
     ---------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const navH = parseInt(getComputedStyle(document.documentElement)
          .getPropertyValue('--nav-height'), 10) || 72;
        const top = targetEl.getBoundingClientRect().top + window.scrollY - navH - 16;
        window.scrollTo({ top, behavior: 'smooth' });
        if (window.innerWidth <= 768) closeNav();
      }
    });
  });

  /* ============================================================
     END DOMContentLoaded
  ============================================================ */
});

/* ============================================================
   4. ADMIN DASHBOARD — Full Implementation
   Fetches leads from the API, renders them in a Bento-style
   layout with live search, filters, and XSS-safe rendering.
   ============================================================ */
function initAdminDashboard() {
  /* ------ DOM References ------ */
  const loginSection   = document.getElementById('adminLogin');
  const dashSection    = document.getElementById('adminDash');
  const loginForm      = document.getElementById('adminLoginForm');
  const loginError     = document.getElementById('loginError');
  const adminKeyInput  = document.getElementById('adminKeyInput');
  const leadsTableBody = document.getElementById('leadsTableBody');
  const leadsLoading   = document.getElementById('leadsLoading');
  const leadsError     = document.getElementById('leadsErrorMsg');
  const searchInput    = document.getElementById('leadsSearch');
  const filterService  = document.getElementById('filterService');
  const filterSort     = document.getElementById('filterSort');
  const refreshBtn     = document.getElementById('refreshLeads');
  const logoutBtn      = document.getElementById('adminLogout');
  const statTotal      = document.getElementById('statTotal');
  const statToday      = document.getElementById('statToday');
  const statWeek       = document.getElementById('statWeek');
  const statNew        = document.getElementById('statNew');
  const exportBtn      = document.getElementById('exportCSV');

  /* ================================================================
     SECURITY ARCHITECTURE NOTE
     ================================================================
     Authentication state is NO LONGER managed in sessionStorage.

     WHY sessionStorage was removed:
     - Any injected script (XSS) can read sessionStorage trivially:
       sessionStorage.getItem('sws_admin_key')  ← exposed instantly.
     - Storing a credential in JS-accessible storage is equivalent
       to storing it in plaintext.

     HOW THIS SHOULD WORK IN PRODUCTION:
     1. The admin submits their key via the login form below.
     2. The backend (your Render API) validates the key against an
        environment variable (never hardcoded).
     3. On success, the backend responds with Set-Cookie headers
        using HttpOnly + Secure + SameSite=Strict flags:
        Set-Cookie: sws_session=<signed_token>; HttpOnly; Secure; SameSite=Strict
     4. The browser stores this cookie automatically. Because it is
        HttpOnly, NO JavaScript on the page can ever read it —
        making XSS attacks unable to steal the credential.
     5. Every subsequent API request automatically sends this cookie.
        The backend verifies it server-side on every /api/v1/leads call.
     6. Logout clears the cookie server-side via a DELETE /api/v1/session
        endpoint (or equivalent) that sets the cookie to expired.

     WHAT THIS FRONTEND DOES NOW:
     - It sends the key once to the backend to initiate a session.
     - It trusts the backend's 401/200 response to determine access.
     - It stores NOTHING in sessionStorage or localStorage.
     - The "isAuthenticated" state lives only in the in-memory JS
       variable below — wiped on every tab close/refresh, which is
       the correct behaviour for an admin panel.
     ================================================================ */

  let allLeads       = [];
  let isAuthenticated = false;

  /* On load, attempt a credentialed ping to see if a valid
     HttpOnly session cookie already exists from a prior login.
     If the backend returns 200, skip the login screen. */
  (async function checkExistingSession() {
    try {
      const res = await fetch(`${API_BASE}/leads`, {
        method: 'GET',
        credentials: 'include',   /* sends HttpOnly cookie automatically */
        headers: { 'Content-Type': 'application/json' },
        cache: 'no-store'
      });
      if (res.ok) {
        isAuthenticated = true;
        showDashboard();
        const data = await res.json();
        allLeads = Array.isArray(data) ? data
          : (Array.isArray(data.leads) ? data.leads : []);
        updateStats(allLeads);
        applyFilters();
      }
      /* 401 = no valid session → stay on login screen (default) */
    } catch (_) {
      /* Network error — stay on login screen */
    }
  })();

  /* ------ Login form handler ------ */
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const enteredKey = adminKeyInput ? adminKeyInput.value.trim() : '';
      if (!enteredKey) return;

      /* Disable button during request */
      const submitBtn = loginForm.querySelector('button[type="submit"]');
      if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Verifying…'; }

      try {
        /* Send the key to the backend ONCE.
           The backend should:
           a) Validate the key against its environment variable.
           b) If valid, respond with Set-Cookie: sws_session=<token>; HttpOnly; Secure
           c) Return HTTP 200.
           d) If invalid, return HTTP 401.

           CURRENT FALLBACK: while the backend session/cookie endpoint
           is not yet implemented, we send the key as x-admin-key and
           use the leads response to confirm validity. Remove this
           fallback once proper session management is on the backend. */
        const res = await fetch(`${API_BASE}/leads`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'x-admin-key': enteredKey,
            'Content-Type': 'application/json'
          },
          cache: 'no-store'
        });

        if (res.ok) {
          isAuthenticated = true;
          /* Clear the key from the input immediately — don't leave
             credentials sitting in a DOM input field */
          if (adminKeyInput) adminKeyInput.value = '';
          showDashboard();
          const data = await res.json();
          allLeads = Array.isArray(data) ? data
            : (Array.isArray(data.leads) ? data.leads : []);
          updateStats(allLeads);
          applyFilters();
        } else if (res.status === 401) {
          if (loginError) {
            loginError.textContent = 'Wrong admin key. Please try again.';
            loginError.style.display = 'block';
          }
        } else {
          throw new Error(`Unexpected status: ${res.status}`);
        }
      } catch (err) {
        console.error('[Admin] Login error:', err);
        if (loginError) {
          loginError.textContent = 'Could not reach the server. Check your connection.';
          loginError.style.display = 'block';
        }
      } finally {
        if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Access Dashboard'; }
      }
    });
  }

  /* ------ Logout ------ */
  if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
      isAuthenticated = false;
      allLeads = [];

      /* Ask the backend to clear the HttpOnly session cookie.
         Implement DELETE /api/v1/session on your backend that
         responds with: Set-Cookie: sws_session=; Max-Age=0; HttpOnly; Secure
         Until then this call will 404 silently — that's acceptable
         because the in-memory state is already cleared above. */
      try {
        await fetch(`${API_BASE}/session`, {
          method: 'DELETE',
          credentials: 'include'
        });
      } catch (_) { /* silent — local state already cleared */ }

      if (dashSection)  dashSection.style.display  = 'none';
      if (loginSection) loginSection.style.display = 'flex';
    });
  }

  /* ------ Refresh ------ */
  if (refreshBtn) {
    refreshBtn.addEventListener('click', () => {
      if (isAuthenticated) fetchLeads();
    });
  }

  /* ------ Export CSV ------ */
  if (exportBtn) {
    exportBtn.addEventListener('click', () => exportLeadsCSV(allLeads));
  }

  /* ------ Search & Filter (live) ------ */
  [searchInput, filterService, filterSort].forEach(el => {
    if (el) el.addEventListener('input', applyFilters);
  });

  /* ------ Show / hide sections ------ */
  function showDashboard() {
    if (loginSection) loginSection.style.display = 'none';
    if (dashSection)  dashSection.style.display  = 'block';
  }

  /* ------ Fetch Leads from API ------ */
  async function fetchLeads() {
    if (leadsLoading) leadsLoading.style.display  = 'block';
    if (leadsError)   leadsError.style.display    = 'none';
    if (leadsTableBody) leadsTableBody.innerHTML  = '';

    try {
      const response = await fetch(`${API_BASE}/leads`, {
        method:      'GET',
        credentials: 'include',   /* HttpOnly session cookie sent automatically */
        headers:     { 'Content-Type': 'application/json' },
        cache:       'no-store'
      });

      if (response.status === 401) {
        /* Session expired or invalid — send back to login */
        isAuthenticated = false;
        if (leadsError) {
          leadsError.textContent = '❌ Session expired. Please log in again.';
          leadsError.style.display = 'block';
        }
        if (dashSection)  dashSection.style.display  = 'none';
        if (loginSection) loginSection.style.display = 'flex';
        return;
      }

      if (!response.ok) {
        throw new Error(`API returned status ${response.status}`);
      }

      const data = await response.json();
      allLeads = Array.isArray(data)
        ? data
        : (Array.isArray(data.leads) ? data.leads : []);

      updateStats(allLeads);
      applyFilters();
    } catch (err) {
      console.error('[Admin] Fetch leads error:', err);
      if (leadsError) {
        leadsError.textContent =
          '⚠️ Could not load leads. Check your internet connection or try refreshing.';
        leadsError.style.display = 'block';
      }
    } finally {
      if (leadsLoading) leadsLoading.style.display = 'none';
    }
  }

  /* ------ Update Stat Cards ------ */
  function updateStats(leads) {
    const now     = new Date();
    const today   = now.toDateString();
    const weekAgo = new Date(now - 7 * 24 * 60 * 60 * 1000);

    const todayCount = leads.filter(l => {
      const d = l.createdAt || l.created_at || l.date || '';
      return new Date(d).toDateString() === today;
    }).length;

    const weekCount = leads.filter(l => {
      const d = l.createdAt || l.created_at || l.date || '';
      return new Date(d) >= weekAgo;
    }).length;

    const newCount = leads.filter(l =>
      (l.status || '').toLowerCase() === 'new' ||
      !(l.status)
    ).length;

    if (statTotal) animateAdminStat(statTotal, leads.length);
    if (statToday) animateAdminStat(statToday, todayCount);
    if (statWeek)  animateAdminStat(statWeek,  weekCount);
    if (statNew)   animateAdminStat(statNew,   newCount);
  }

  /* ------ Animate a single admin stat number ------ */
  function animateAdminStat(el, target) {
    const duration = 800;
    const start    = performance.now();
    const from     = parseInt(el.textContent, 10) || 0;

    const step = (now) => {
      const t = Math.min((now - start) / duration, 1);
      el.textContent = Math.floor(from + (target - from) * t);
      if (t < 1) requestAnimationFrame(step);
      else el.textContent = target;
    };
    requestAnimationFrame(step);
  }

  /* ------ Apply search + filter + sort ------ */
  function applyFilters() {
    const query   = searchInput   ? searchInput.value.toLowerCase().trim()  : '';
    const service = filterService ? filterService.value.toLowerCase().trim() : '';
    const sort    = filterSort    ? filterSort.value                          : 'newest';

    let filtered = allLeads.filter(lead => {
      const nameMatch    = (lead.name    || '').toLowerCase().includes(query);
      const emailMatch   = (lead.email   || '').toLowerCase().includes(query);
      const phoneMatch   = (lead.phone   || '').toLowerCase().includes(query);
      const msgMatch     = (lead.message || '').toLowerCase().includes(query);
      const matchQuery   = !query || nameMatch || emailMatch || phoneMatch || msgMatch;

      const svcField     = (lead.service || lead.type || '').toLowerCase();
      const matchService = !service || svcField.includes(service);

      return matchQuery && matchService;
    });

    /* Sorting */
    filtered.sort((a, b) => {
      const dateA = new Date(a.createdAt || a.created_at || a.date || 0);
      const dateB = new Date(b.createdAt || b.created_at || b.date || 0);
      if (sort === 'newest')  return dateB - dateA;
      if (sort === 'oldest')  return dateA - dateB;
      if (sort === 'name_az') return (a.name || '').localeCompare(b.name || '');
      if (sort === 'name_za') return (b.name || '').localeCompare(a.name || '');
      return 0;
    });

    renderLeads(filtered);
  }

  /* ------ Render leads table — XSS safe via textContent ------ */
  function renderLeads(leads) {
    if (!leadsTableBody) return;

    /* Clear safely — no innerHTML */
    while (leadsTableBody.firstChild) {
      leadsTableBody.removeChild(leadsTableBody.firstChild);
    }

    if (leads.length === 0) {
      const emptyRow = document.createElement('tr');
      const emptyCell = document.createElement('td');
      emptyCell.colSpan = 7;
      emptyCell.style.textAlign  = 'center';
      emptyCell.style.padding    = '3rem';
      emptyCell.style.color      = 'var(--muted)';
      emptyCell.textContent      = 'No leads found matching your search.';
      emptyRow.appendChild(emptyCell);
      leadsTableBody.appendChild(emptyRow);
      return;
    }

    leads.forEach((lead, index) => {
      const row = document.createElement('tr');
      row.className = 'admin-lead-row';

      /* We use textContent for every user-supplied value — prevents XSS */
      const cells = [
        { value: String(index + 1),                                       cls: 'cell-index' },
        { value: lead.name    || '—',                                     cls: 'cell-name'  },
        { value: lead.email   || '—',                                     cls: 'cell-email' },
        { value: lead.phone   || '—',                                     cls: 'cell-phone' },
        { value: lead.service || lead.type || '—',                        cls: 'cell-service'},
        { value: formatLeadDate(lead.createdAt || lead.created_at || lead.date), cls: 'cell-date' },
      ];

      cells.forEach(({ value, cls }) => {
        const td  = document.createElement('td');
        td.className = cls;
        td.textContent = value; /* ← Safe. No innerHTML. */
        row.appendChild(td);
      });

      /* Action cell — WhatsApp link (safe) + preview toggle */
      const actionCell = document.createElement('td');
      actionCell.className = 'cell-actions';

      if (lead.phone) {
        const waLink = document.createElement('a');
        waLink.href   = `https://wa.me/${lead.phone.replace(/\D/g, '')}`;
        waLink.target = '_blank';
        waLink.rel    = 'noopener noreferrer';
        waLink.className = 'admin-wa-btn';
        waLink.title  = 'Open WhatsApp';
        waLink.setAttribute('aria-label', 'Contact via WhatsApp');
        /* Font Awesome icon via class — NOT from user data */
        const icon = document.createElement('i');
        icon.className = 'fab fa-whatsapp';
        waLink.appendChild(icon);
        actionCell.appendChild(waLink);
      }

      const previewBtn = document.createElement('button');
      previewBtn.className = 'admin-preview-btn';
      previewBtn.title     = 'View message';
      const previewIcon = document.createElement('i');
      previewIcon.className = 'fa fa-eye';
      previewBtn.appendChild(previewIcon);

      previewBtn.addEventListener('click', () => {
        showLeadModal(lead);
      });

      actionCell.appendChild(previewBtn);
      row.appendChild(actionCell);
      leadsTableBody.appendChild(row);
    });
  }

  /* ------ Lead detail modal ------ */
  function showLeadModal(lead) {
    /* Remove any existing modal first */
    const existing = document.getElementById('leadModal');
    if (existing) existing.remove();

    const overlay = document.createElement('div');
    overlay.id = 'leadModal';
    overlay.className = 'admin-modal-overlay';

    const modal = document.createElement('div');
    modal.className = 'admin-modal';

    const fields = [
      ['Name',    lead.name    || '—'],
      ['Email',   lead.email   || '—'],
      ['Phone',   lead.phone   || '—'],
      ['Service', lead.service || lead.type || '—'],
      ['Date',    formatLeadDate(lead.createdAt || lead.created_at || lead.date)],
      ['Message', lead.message || '—'],
      ['Status',  lead.status  || 'New'],
    ];

    const title = document.createElement('h3');
    title.className   = 'admin-modal-title';
    title.textContent = 'Lead Details'; /* Static string — safe */
    modal.appendChild(title);

    fields.forEach(([label, value]) => {
      const row = document.createElement('div');
      row.className = 'admin-modal-row';

      const labelEl = document.createElement('span');
      labelEl.className   = 'admin-modal-label';
      labelEl.textContent = label; /* Static label — safe */

      const valueEl = document.createElement('span');
      valueEl.className   = 'admin-modal-value';
      valueEl.textContent = value; /* User data via textContent — XSS safe */

      row.appendChild(labelEl);
      row.appendChild(valueEl);
      modal.appendChild(row);
    });

    const closeBtn = document.createElement('button');
    closeBtn.className   = 'admin-modal-close';
    closeBtn.textContent = '✕ Close';
    closeBtn.addEventListener('click', () => overlay.remove());
    modal.appendChild(closeBtn);

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    /* Close on backdrop click */
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) overlay.remove();
    });

    /* Close on Escape */
    const closeOnEsc = (e) => {
      if (e.key === 'Escape') { overlay.remove(); document.removeEventListener('keydown', closeOnEsc); }
    };
    document.addEventListener('keydown', closeOnEsc);
  }

  /* ------ Format date for display ------ */
  function formatLeadDate(raw) {
    if (!raw) return '—';
    const d = new Date(raw);
    if (isNaN(d.getTime())) return String(raw);
    return d.toLocaleDateString('en-IN', {
      day:   '2-digit',
      month: 'short',
      year:  'numeric',
      hour:  '2-digit',
      minute:'2-digit',
      hour12: true
    });
  }

  /* ------ Export leads to CSV ------ */
  function exportLeadsCSV(leads) {
    if (!leads || leads.length === 0) {
      alert('No leads to export.');
      return;
    }

    const headers = ['#', 'Name', 'Email', 'Phone', 'Service', 'Message', 'Date', 'Status'];

    const escape = (val) => {
      const str = String(val || '').replace(/"/g, '""');
      return `"${str}"`;
    };

    const rows = leads.map((lead, i) => [
      i + 1,
      lead.name    || '',
      lead.email   || '',
      lead.phone   || '',
      lead.service || lead.type || '',
      (lead.message || '').replace(/\n/g, ' '),
      formatLeadDate(lead.createdAt || lead.created_at || lead.date),
      lead.status  || 'New'
    ].map(escape).join(','));

    const csvContent = [headers.map(escape).join(','), ...rows].join('\n');
    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url  = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `sanskar_leads_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}
/* ============================================================
   END OF main.js
   ============================================================ */
