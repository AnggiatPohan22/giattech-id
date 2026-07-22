async function boot() {
  const { default: Alpine } = await import('alpinejs');
  (window as unknown as { Alpine: typeof Alpine }).Alpine = Alpine;
  Alpine.start();
}

if (document.readyState === 'complete') {
  void boot();
} else {
  window.addEventListener('load', () => void boot(), { once: true });
}

export {};
