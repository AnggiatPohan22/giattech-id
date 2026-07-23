export interface SidebarNavItem {
  id: string;
  label: string;
  /** Inner SVG markup (paths) — wrapped in a 24×24 stroke svg by the component */
  icon: string;
}

export const sidebarNav: SidebarNavItem[] = [
  { id: 'hero', label: 'Home', icon: '<path d="M3 10.5L12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/>' },
  { id: 'about', label: 'About Me', icon: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-7 8-7s8 3 8 7"/>' },
  { id: 'projects', label: 'Projects', icon: '<rect x="3" y="4" width="18" height="14" rx="2"/><path d="M3 9h18"/>' },
  { id: 'services', label: 'What You Get', icon: '<path d="M12 3l9 5-9 5-9-5 9-5z"/><path d="M3 13l9 5 9-5"/>' },
  { id: 'pricing', label: 'Services', icon: '<path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z"/>' },
  { id: 'testimonials', label: 'Clients', icon: '<circle cx="9" cy="8" r="3.5"/><circle cx="17" cy="9.5" r="2.5"/><path d="M2.5 20c0-3.3 2.9-5.5 6.5-5.5s6.5 2.2 6.5 5.5"/><path d="M16 15c2.9.2 5.5 2 5.5 5"/>' },
  { id: 'faq', label: 'FAQ', icon: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.4 2.3c-.8.3-.9 1-.9 1.7"/><line x1="12" y1="17" x2="12" y2="17.01"/>' },
];

export interface SidebarStat {
  value: number;
  suffix: string;
  label: string;
}

export const sidebarStats: SidebarStat[] = [
  { value: 80, suffix: '+', label: 'Projects' },
  { value: 3, suffix: '+', label: 'Years of<br/>Experience' },
];

export const sidebarClients: string[] = [
  'Bintan Prestige',
  'Prima Logistik',
  'Kelola Studio',
  'Rimba Kopi',
  'Aksara',
];
