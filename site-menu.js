/**
 * Shared hamburger menu — Gallery + Slop Machine (+ reusable elsewhere).
 * Keeps open/close, Escape, outside-click, and focus restore consistent.
 */
(function (global) {
    'use strict';

    function bindSiteMenu(options) {
        const opts = options || {};
        const menuContainer = document.querySelector(opts.menuSelector || '.hamburger-menu');
        const menuToggle = document.querySelector(opts.toggleSelector || '.menu-toggle');
        const menuLinks = document.querySelectorAll(opts.linkSelector || '.menu-link');
        if (!menuContainer || !menuToggle) return null;

        let lastMenuFocusEl = null;

        const setMenuOpen = (open) => {
            menuContainer.classList.toggle('open', open);
            menuToggle.setAttribute('aria-expanded', String(open));
            if (open) {
                lastMenuFocusEl = document.activeElement;
                (menuLinks[0] || menuToggle).focus();
                return;
            }
            if (lastMenuFocusEl && typeof lastMenuFocusEl.focus === 'function') {
                lastMenuFocusEl.focus();
            }
            lastMenuFocusEl = null;
        };

        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            setMenuOpen(!menuContainer.classList.contains('open'));
        });

        document.addEventListener('keydown', (e) => {
            if (e.key !== 'Escape') return;
            if (!menuContainer.classList.contains('open')) return;
            e.stopPropagation();
            setMenuOpen(false);
        });

        document.addEventListener('click', (e) => {
            if (!menuContainer.classList.contains('open')) return;
            if (menuContainer.contains(e.target)) return;
            setMenuOpen(false);
        });

        menuLinks.forEach((link) => {
            link.addEventListener('click', () => setMenuOpen(false));
        });

        return {
            open: () => setMenuOpen(true),
            close: () => setMenuOpen(false),
            isOpen: () => menuContainer.classList.contains('open')
        };
    }

    global.bindSiteMenu = bindSiteMenu;
})(typeof window !== 'undefined' ? window : this);
