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
const API_BASE   = 'https://sanskar-backend-d8t9.onrender.com/api/v1';
const HEALTH_URL = 'https://sanskar-backend-d8t9.onrender.com/health';
const WA_NUMBER  = '919696065037';

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
   2. RENDER WAKE-UP PING
   Pings the backend on every page load so the free Render
   instance spins up before the user needs it.
   ============================================================ */
(function wakeUpBackend() {
  fetch(HEALTH_URL, { method: 'GET', cache: 'no-store' })
    .then(res => {
      if (res.ok) {
        console.info('%c[Sanskar API] Backend is awake ✅', 'color:#22c55e; font-size:11px;');
      }
    })
    .catch(() => {
      /* Silently fail — user should never know about this ping */
      console.info('%c[Sanskar API] Backend waking up… 🔄', 'color:#f59e0b; font-size:11px;');
    });
})();

/* ============================================================
   3. DOM READY WRAPPER
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {

  /* ----------------------------------------------------------
     3A. PRELOADER — Apple-style slide-up dismiss
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
     Hides the default Google Translate toolbar and exposes
     a clean button that toggles Hindi ↔ English
     ---------------------------------------------------------- */
  let isHindi          = false;
  let translateReady   = false;
  const translateBtn   = document.getElementById('translateBtn');
  const translateLabel = document.getElementById('translateLabel');

  /* Called by Google's script once loaded */
  window.googleTranslateElementInit = function () {
    new google.translate.TranslateElement(
      {
        pageLanguage:       'en',
        includedLanguages:  'hi',
        autoDisplay:        false,
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE
      },
      'google_translate_element'
    );
    translateReady = true;
    suppressGoogleUI();
  };

  /* Remove Google's floating iframe / bar from the DOM */
  function suppressGoogleUI() {
    const hideElements = () => {
      /* The top-of-page banner Google injects */
      const banner = document.querySelector('.goog-te-banner-frame');
      if (banner) banner.style.display = 'none';

      /* Body offset Google adds */
      document.body.style.top = '0px';

      /* The select element Google adds */
      const select = document.querySelector('.goog-te-combo');
      if (select) select.style.display = 'none';
    };

    hideElements();
    /* Retry a few times because Google inserts elements async */
    [200, 600, 1200].forEach(delay => setTimeout(hideElements, delay));
  }

  if (translateBtn) {
    translateBtn.addEventListener('click', () => {
      if (!translateReady) {
        console.warn('[Translate] Google Translate not ready yet, please wait.');
        return;
      }

      if (!isHindi) {
        /* Switch to Hindi */
        const select = document.querySelector('.goog-te-combo');
        if (select) {
          select.value = 'hi';
          select.dispatchEvent(new Event('change'));
        }
        isHindi = true;
        if (translateLabel) translateLabel.textContent = 'English';
        translateBtn.setAttribute('title', 'Switch to English');
      } else {
        /* Restore to English — Google uses this iframe trick */
        const iframe = document.querySelector('.goog-te-banner-frame');
        if (iframe) {
          const innerDoc = iframe.contentDocument || iframe.contentWindow.document;
          const restoreBtn = innerDoc.querySelector('.goog-te-button button');
          if (restoreBtn) restoreBtn.click();
        }
        /* Fallback: reload without translate cookie */
        const cookieName = 'googtrans';
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${window.location.hostname};`;

        const select = document.querySelector('.goog-te-combo');
        if (select) {
          select.value = 'en';
          select.dispatchEvent(new Event('change'));
        }

        isHindi = false;
        if (translateLabel) translateLabel.textContent = 'हिंदी';
        translateBtn.setAttribute('title', 'Switch to Hindi / हिंदी में देखें');
      }

      suppressGoogleUI();
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
          /* Also fire WhatsApp notification ping with details */
          prefillWhatsApp(name, phone, service || message.substring(0, 60));
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

    /* After successful submission, open a prefilled WhatsApp to notify self */
    function prefillWhatsApp(name, phone, topic) {
      const text = encodeURIComponent(
        `New lead from website!\nName: ${name}\nPhone: ${phone}\nTopic: ${topic}`
      );
      /* This is an invisible image ping — doesn't open a new tab for the user */
      const img = new Image();
      img.src = `https://wa.me/${WA_NUMBER}?text=${text}`;
    }
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

  /* Admin key stored in sessionStorage (cleared when tab closes) */
  const SESSION_KEY = 'sws_admin_key';
  let allLeads      = [];
  let activeKey     = sessionStorage.getItem(SESSION_KEY) || '';

  /* ------ Boot: skip login if session key exists ------ */
  if (activeKey) {
    showDashboard();
    fetchLeads(activeKey);
  }

  /* ------ Login form handler ------ */
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const enteredKey = adminKeyInput ? adminKeyInput.value.trim() : '';
      if (!enteredKey) return;

      /* Optimistically store and try fetching;
         if the fetch returns 401 we show an error */
      activeKey = enteredKey;
      sessionStorage.setItem(SESSION_KEY, activeKey);
      showDashboard();
      fetchLeads(activeKey);
    });
  }

  /* ------ Logout ------ */
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      sessionStorage.removeItem(SESSION_KEY);
      activeKey = '';
      allLeads  = [];
      if (dashSection)  dashSection.style.display  = 'none';
      if (loginSection) loginSection.style.display = 'flex';
    });
  }

  /* ------ Refresh ------ */
  if (refreshBtn) {
    refreshBtn.addEventListener('click', () => {
      if (activeKey) fetchLeads(activeKey);
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
  async function fetchLeads(key) {
    if (leadsLoading) leadsLoading.style.display  = 'block';
    if (leadsError)   leadsError.style.display    = 'none';
    if (leadsTableBody) leadsTableBody.innerHTML  = '';

    try {
      const response = await fetch(`${API_BASE}/leads`, {
        method:  'GET',
        headers: {
          'x-admin-key': key,
          'Content-Type': 'application/json'
        },
        cache: 'no-store'
      });

      if (response.status === 401) {
        sessionStorage.removeItem(SESSION_KEY);
        if (leadsError) {
          leadsError.textContent = '❌ Invalid admin key. Access denied.';
          leadsError.style.display = 'block';
        }
        if (loginError) {
          loginError.textContent = 'Wrong admin key. Please try again.';
          loginError.style.display = 'block';
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
