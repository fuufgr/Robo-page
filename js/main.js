/**
 * KINETICA // PHYSICAL INTELLIGENCE ATELIER
 * Editorial Mechatronics & Micro-Electronics Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ==========================================================================
     01. Live UTC / Laboratory Clock
     ========================================================================== */
  const clockElement = document.getElementById('utc-clock');
  function updateClock() {
    if (!clockElement) return;
    const now = new Date();
    const hours = String(now.getUTCHours()).padStart(2, '0');
    const minutes = String(now.getUTCMinutes()).padStart(2, '0');
    const seconds = String(now.getUTCSeconds()).padStart(2, '0');
    clockElement.textContent = `UTC ${hours}:${minutes}:${seconds}`;
  }
  setInterval(updateClock, 1000);
  updateClock();

  /* ==========================================================================
     02. Theme Switcher (Obsidian Dark / Architectural Fine Paper)
     ========================================================================== */
  const themeToggle = document.getElementById('theme-toggle');
  const htmlRoot = document.documentElement;
  const themeIcon = document.getElementById('theme-icon');

  const sunSVG = `
    <circle cx="12" cy="12" r="5"></circle>
    <line x1="12" y1="1" x2="12" y2="3"></line>
    <line x1="12" y1="21" x2="12" y2="23"></line>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
    <line x1="1" y1="12" x2="3" y2="12"></line>
    <line x1="21" y1="12" x2="23" y2="12"></line>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
  `;

  const moonSVG = `
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
  `;

  function applyTheme(theme) {
    htmlRoot.setAttribute('data-theme', theme);
    localStorage.setItem('kinetica_theme', theme);
    if (themeIcon) {
      themeIcon.innerHTML = theme === 'light' ? moonSVG : sunSVG;
    }
  }

  const savedTheme = localStorage.getItem('kinetica_theme') || 'dark';
  applyTheme(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = htmlRoot.getAttribute('data-theme') || 'dark';
      const nextTheme = current === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme);
      playAcousticPulse(480, 0.05);
    });
  }

  /* ==========================================================================
     03. Mobile Navigation Menu
     ========================================================================== */
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileBtn && navMenu) {
    mobileBtn.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      mobileBtn.setAttribute('aria-expanded', isOpen);
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileBtn.setAttribute('aria-expanded', false);
      });
    });
  }

  /* ==========================================================================
     04. Active Section Highlighting via IntersectionObserver
     ========================================================================== */
  const sections = document.querySelectorAll('section[id]');
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(sec => navObserver.observe(sec));

  /* ==========================================================================
     05. Interactive Hero Actuator Hotspots
     ========================================================================== */
  const hotspots = document.querySelectorAll('.hotspot');
  hotspots.forEach(hotspot => {
    hotspot.addEventListener('click', (e) => {
      e.stopPropagation();
      const isActive = hotspot.classList.contains('active');
      hotspots.forEach(h => h.classList.remove('active'));
      if (!isActive) {
        hotspot.classList.add('active');
        playAcousticPulse(720, 0.08);
      }
    });
  });

  document.addEventListener('click', () => {
    hotspots.forEach(h => h.classList.remove('active'));
  });

  /* ==========================================================================
     06. About Section - Anatomy & Diagnostic Tab Switcher
     ========================================================================== */
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');
  const diagnosticBadge = document.getElementById('diagnostic-badge');

  const badgeLabels = {
    'tab-neural': 'LAYER: NEURAL COMPUTATION (ACTIVE)',
    'tab-power': 'LAYER: GAN POWER SWITCHING (ACTIVE)',
    'tab-harmonic': 'LAYER: SERDES WAVEGUIDES (ACTIVE)'
  };

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');

      tabButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      tabPanes.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const activePane = document.getElementById(targetTab);
      if (activePane) activePane.classList.add('active');

      if (diagnosticBadge && badgeLabels[targetTab]) {
        diagnosticBadge.textContent = badgeLabels[targetTab];
      }

      playAcousticPulse(550, 0.04);
    });
  });

  /* ==========================================================================
     07. Features Category Filter
     ========================================================================== */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const featureCards = document.querySelectorAll('.feature-monograph-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      featureCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
        }
      });

      playAcousticPulse(600, 0.04);
    });
  });

  /* ==========================================================================
     08. Hardware Blueprint Modal Spec Inspector
     ========================================================================== */
  const modal = document.getElementById('spec-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalTitle = document.getElementById('modal-title');
  const modalTag = document.getElementById('modal-tag');
  const modalDesc = document.getElementById('modal-desc');
  const modalQuote = document.getElementById('modal-quote');
  const modalSpecsBody = document.getElementById('modal-specs-body');
  const modalInquireBtn = document.getElementById('modal-inquire-btn');

  const hardwareDatabase = {
    'modal-compute': {
      title: 'Neuromorphic Compute Core [MOD-14]',
      tag: 'SCHEMATIC BLUEPRINT // MCM SILICON DIE',
      desc: 'Monolithic silicon-carrier package hosting custom 64-bit vector processors and an on-die sparse matrix accelerator for real-time spatial neural mapping.',
      quote: '“Sub-microsecond deterministic response across 18 articulated degrees of freedom.”',
      specs: [
        { label: 'ISA SPECIFICATION', val: 'RV64GCX Custom RISC-V' },
        { label: 'TENSOR THROUGHPUT', val: '48.4 TOPS @ INT8' },
        { label: 'ENERGY EFFICIENCY', val: '11.5 TOPS / Watt' },
        { label: 'ON-CHIP SRAM CACHE', val: '64 MB Low-Latency Mesh' },
        { label: 'MEMORY BANDWIDTH', val: '204.8 GB/s LPDDR5' },
        { label: 'THERMAL OPERATING LIMIT', val: '-40°C to +105°C' },
        { label: 'SILICON PROCESS', val: '4nm FinFET Monolithic' }
      ]
    },
    'modal-harmonic': {
      title: 'Biomimetic Harmonic Actuator Series',
      tag: 'SCHEMATIC BLUEPRINT // KINEMATICS & MOTORS',
      desc: 'High-torque-density rotary actuator coupling zero-backlash elliptical flexsplines with liquid-cooled neodymium magnetic arrays and optical dual-ring position encoders.',
      quote: '“Absolute continuous positioning repeatability to within 0.001 degrees under dynamic payloads.”',
      specs: [
        { label: 'GEAR RATIO', val: '100:1 Harmonic Differential' },
        { label: 'CONTINUOUS TORQUE', val: '42.0 Nm' },
        { label: 'PEAK BURST TORQUE', val: '95.0 Nm (500ms max)' },
        { label: 'BACKLASH', val: '0.00 Arcmin (Zero Measurable)' },
        { label: 'ENCODER RESOLUTION', val: '21-bit Absolute Multi-Turn' },
        { label: 'ACTUATOR MASS', val: '950 grams' },
        { label: 'CHASSIS ALLOY', val: 'Grade 5 Titanium & Carbon' }
      ]
    },
    'modal-rtos': {
      title: 'Deterministic Mechatronic Micro-Kernel',
      tag: 'SCHEMATIC BLUEPRINT // EMBEDDED FIRMWARE',
      desc: 'Formally verified real-time operating micro-kernel with zero dynamic heap allocation in safety flight-loops, guaranteeing strict mathematical boundary constraints.',
      quote: '“Certified deterministic interrupt jitter below 80 nanoseconds under 100% bus utilization.”',
      specs: [
        { label: 'LOOP EXECUTION RATE', val: '4 kHz (250 μs cycle)' },
        { label: 'SAFETY CERTIFICATION', val: 'ISO 26262 ASIL-D & DO-178C' },
        { label: 'CONTEXT SWITCH TIME', val: '420 Nanoseconds' },
        { label: 'INTERRUPT JITTER', val: '< 80 Nanoseconds' },
        { label: 'BINARY FOOTPRINT', val: '180 KB Verified ROM' },
        { label: 'FAULT RECOVERY TIME', val: '< 10 Microseconds' }
      ]
    },
    'modal-sensor': {
      title: 'RS-730 Optical & Solid-State LiDAR Module',
      tag: 'SCHEMATIC BLUEPRINT // SENSORY TRANSDUCERS',
      desc: 'Hermetically sealed multi-spectral perception cluster unifying 905nm micro-mirror solid-state LiDAR with 24-70mm telecentric glass optics and active depth projection.',
      quote: '“360° situational comprehension with millimeter ground truth in total darkness or rain.”',
      specs: [
        { label: 'DETECTION RANGE', val: '0.1m - 100m' },
        { label: 'ANGULAR RESOLUTION', val: '0.05° Horizontal / Vertical' },
        { label: 'POINT CLOUD RATE', val: '1,500,000 pts / sec' },
        { label: 'OPTICAL COATING', val: 'Multi-Layer Sapphire Crystal' },
        { label: 'POWER CONSUMPTION', val: '6.2W Peak Operating' },
        { label: 'INGRESS PROTECTION', val: 'IP68 & Submersible' }
      ]
    }
  };

  function openSpecModal(modalId) {
    const data = hardwareDatabase[modalId];
    if (!data) return;

    modalTitle.textContent = data.title;
    modalTag.textContent = data.tag;
    modalDesc.textContent = data.desc;
    modalQuote.textContent = data.quote;

    modalSpecsBody.innerHTML = '';
    data.specs.forEach(spec => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${spec.label}</td>
        <td>${spec.val}</td>
      `;
      modalSpecsBody.appendChild(row);
    });

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    playAcousticPulse(750, 0.06);
  }

  function closeSpecModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('[data-modal]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const modalId = trigger.getAttribute('data-modal');
      openSpecModal(modalId);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeSpecModal);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeSpecModal();
    });
  }

  if (modalInquireBtn) {
    modalInquireBtn.addEventListener('click', () => {
      closeSpecModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeSpecModal();
    }
  });

  /* ==========================================================================
     09. Dispatch Form Handling & Simulated Encrypted Transmission
     ========================================================================== */
  const dispatchForm = document.getElementById('dispatch-form');
  const statusText = document.getElementById('status-text');
  const submitBtn = document.getElementById('btn-submit-inquiry');
  const toast = document.getElementById('editorial-toast');
  const toastMsg = document.getElementById('toast-message');

  function showToast(message) {
    if (!toast) return;
    toastMsg.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 4500);
  }

  if (dispatchForm) {
    dispatchForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('inquirer-name');
      const orgInput = document.getElementById('inquirer-org');
      const emailInput = document.getElementById('inquirer-email');
      const domainInput = document.getElementById('inquiry-domain');
      const messageInput = document.getElementById('inquiry-message');

      if (!nameInput.value.trim() || !orgInput.value.trim() || !emailInput.value.trim() || !domainInput.value || !messageInput.value.trim()) {
        statusText.textContent = 'ERROR // INCOMPLETE PARAMETERS DETECTED';
        statusText.style.color = 'var(--accent-vermilion)';
        playAcousticPulse(220, 0.2);
        return;
      }

      // Simulated Encrypted Transmission Sequence
      submitBtn.disabled = true;
      submitBtn.style.opacity = '0.7';
      statusText.style.color = 'var(--accent-gold)';
      statusText.textContent = 'GENERATING SHA-256 HASH & ASSEMBLED PACKET...';
      playAcousticPulse(600, 0.05);

      setTimeout(() => {
        statusText.textContent = 'TRANSMITTING VIA ENCRYPTED TLS FREQUENCY...';
        playAcousticPulse(750, 0.05);
      }, 700);

      setTimeout(() => {
        statusText.textContent = 'DISPATCH CONFIRMED // ZÜRICH NODE ACK 200';
        statusText.style.color = 'var(--accent-emerald)';
        showToast(`COMMUNIQUÉ FROM ${orgInput.value.toUpperCase()} RECEIVED // TICKET #${Math.floor(1000 + Math.random() * 9000)}`);
        playAcousticPulse(880, 0.15);

        // Reset form
        dispatchForm.reset();
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';

        setTimeout(() => {
          statusText.textContent = 'SYSTEM READY // PACKET UNSEALED';
          statusText.style.color = 'var(--text-muted)';
        }, 5000);
      }, 1500);
    });
  }

  /* ==========================================================================
     10. Return to Summit (Back to top)
     ========================================================================== */
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      playAcousticPulse(800, 0.05);
    });
  }

  /* ==========================================================================
     11. Minimalist Web Audio Acoustic Feedback (Tactile Micro-Sound)
     ========================================================================== */
  let audioCtx = null;
  function playAcousticPulse(freq, duration) {
    try {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

      gain.gain.setValueAtTime(0.015, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch {
      // AudioContext unavailable or blocked by autoplay policy; silent fallback
    }
  }
});
