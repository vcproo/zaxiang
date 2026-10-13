(function () {
  const embed = new URLSearchParams(location.search).has('embed') || window.self !== window.top;
  if (!embed) return;
  document.documentElement.classList.add('is-embed');
  document.documentElement.setAttribute('data-theme', 'light');
})();
