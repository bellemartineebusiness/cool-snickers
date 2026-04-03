/* cookie.js — Cookie consent logic */

(function () {
  'use strict';

  var COOKIE_KEY = 'bm_cookie_consent';
  var EXPIRY_DAYS = 365;

  function getCookie(name) {
    var match = document.cookie.split('; ').find(function (row) {
      return row.startsWith(name + '=');
    });
    return match ? match.split('=')[1] : null;
  }

  function setCookie(name, value, days) {
    var expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = name + '=' + value + '; expires=' + expires + '; path=/; SameSite=Lax';
  }

  function hideBanner() {
    var banner = document.getElementById('cookie-banner');
    if (banner) {
      banner.classList.add('hidden');
    }
  }

  function initBanner() {
    var consent = getCookie(COOKIE_KEY);
    if (consent) {
      hideBanner();
      return;
    }

    var acceptBtn = document.getElementById('cookie-accept');
    var declineBtn = document.getElementById('cookie-decline');

    if (acceptBtn) {
      acceptBtn.addEventListener('click', function () {
        setCookie(COOKIE_KEY, 'accepted', EXPIRY_DAYS);
        hideBanner();
      });
    }

    if (declineBtn) {
      declineBtn.addEventListener('click', function () {
        setCookie(COOKIE_KEY, 'declined', EXPIRY_DAYS);
        hideBanner();
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBanner);
  } else {
    initBanner();
  }
})();
