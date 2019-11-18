/**
 * Test for whether to display for cell-phone devices
 * Taken from: https://coderwall.com/p/i817wa/one-line-function-to-detect-mobile-devices-with-javascript
 */
export const isMobile =
  typeof window.orientation !== 'undefined' || navigator.userAgent.indexOf('IEMobile') !== -1;

// Alternative, cruder test:
// export const isMobile = window.innerWidth < 400;
