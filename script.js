/* ──────────────────────────────────────
   Renata Blondal — Site Scripts
   ────────────────────────────────────── */

(function () {
    'use strict';

    // ── Nav scroll effect ─────────────
    const nav = document.getElementById('nav');

    function onScroll() {
        nav.classList.toggle('scrolled', window.scrollY > 40);
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    // ── Mobile menu ───────────────────
    const toggle = document.querySelector('.nav-toggle');
    const mobileMenu = document.getElementById('mobileMenu');

    toggle.addEventListener('click', function () {
        toggle.classList.toggle('active');
        mobileMenu.classList.toggle('open');
        document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });

    mobileMenu.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
            toggle.classList.remove('active');
            mobileMenu.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    // ── Scroll reveal ─────────────────
    var reveals = document.querySelectorAll('.reveal');

    function checkReveal() {
        var windowHeight = window.innerHeight;

        reveals.forEach(function (el, i) {
            var top = el.getBoundingClientRect().top;

            if (top < windowHeight - 80) {
                // Stagger siblings slightly
                el.style.transitionDelay = (i % 4) * 0.08 + 's';
                el.classList.add('visible');
            }
        });
    }

    window.addEventListener('scroll', checkReveal, { passive: true });
    window.addEventListener('load', checkReveal);

    // ── Carousel arrows ───────────────
    document.querySelectorAll('.carousel').forEach(function (carousel) {
        var track = carousel.querySelector('.carousel-track');
        var leftBtn = carousel.querySelector('.carousel-arrow-left');
        var rightBtn = carousel.querySelector('.carousel-arrow-right');

        if (leftBtn && rightBtn && track) {
            var scrollAmount = 280;

            function updateArrows() {
                leftBtn.classList.toggle('hidden', track.scrollLeft <= 0);
                rightBtn.classList.toggle('hidden', track.scrollLeft + track.clientWidth >= track.scrollWidth - 1);
            }

            leftBtn.addEventListener('click', function () {
                track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            });

            rightBtn.addEventListener('click', function () {
                track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            });

            track.addEventListener('scroll', updateArrows, { passive: true });
            updateArrows();
        }
    });

    // ── Smooth scroll for nav links ───
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
})();
