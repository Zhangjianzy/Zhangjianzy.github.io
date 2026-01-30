// 语言配置
type I18nConfig = {
  zh: {
    'page.title': string;
  };
  en: {
    'page.title': string;
  };
};

class I18nManager {
  private static instance: I18nManager;
  private i18n: I18nConfig = {
    zh: {
      'page.title': '张舰 - 水杉智境工作室创始人 | 研发专家'
    },
    en: {
      'page.title': 'Justin Zhang - Founder of Metasequoia AI Studio | Frontend R&D Expert'
    }
  };

  private constructor() {}

  public static getInstance(): I18nManager {
    if (!I18nManager.instance) {
      I18nManager.instance = new I18nManager();
    }
    return I18nManager.instance;
  }

  public setLanguage(lang: 'zh' | 'en'): void {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
      const key = element.getAttribute('data-i18n');
      if (key && element.tagName === 'TITLE') {
        (element as HTMLTitleElement).text = this.i18n[lang][key];
      }
    });
  }
}

class LanguageToggle {
  private zhBtn: HTMLElement | null;
  private enBtn: HTMLElement | null;
  private i18nManager: I18nManager;

  constructor() {
    this.zhBtn = document.getElementById('zh-btn');
    this.enBtn = document.getElementById('en-btn');
    this.i18nManager = I18nManager.getInstance();
    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    if (this.zhBtn && this.enBtn) {
      this.zhBtn.addEventListener('click', () => {
        this.toggleLanguage('zh');
      });
      
      this.enBtn.addEventListener('click', () => {
        this.toggleLanguage('en');
      });
    }
  }

  private toggleLanguage(lang: 'zh' | 'en'): void {
    const zhElements = document.querySelectorAll('.zh');
    const enElements = document.querySelectorAll('.en');
    
    if (lang === 'zh') {
      zhElements.forEach(el => el.classList.remove('hidden'));
      enElements.forEach(el => el.classList.add('hidden'));
      this.zhBtn?.classList.add('active');
      this.zhBtn?.classList.remove('inactive');
      this.enBtn?.classList.add('inactive');
      this.enBtn?.classList.remove('active');
    } else {
      enElements.forEach(el => el.classList.remove('hidden'));
      zhElements.forEach(el => el.classList.add('hidden'));
      this.enBtn?.classList.add('active');
      this.enBtn?.classList.remove('inactive');
      this.zhBtn?.classList.add('inactive');
      this.zhBtn?.classList.remove('active');
    }
    
    this.i18nManager.setLanguage(lang);
  }
}

class ScrollAnimator {
  private observer: IntersectionObserver | null;

  constructor() {
    if ('IntersectionObserver' in window) {
      this.observer = new IntersectionObserver(this.handleIntersect.bind(this), {
        rootMargin: '0px',
        threshold: 0.1
      });
      this.setupObserver();
    } else {
      this.observer = null;
      this.fallbackScrollListener();
    }
  }

  private setupObserver(): void {
    if (this.observer) {
      const sections = document.querySelectorAll('.section');
      sections.forEach(section => {
        this.observer?.observe(section);
      });
    }
  }

  private handleIntersect(entries: IntersectionObserverEntry[]): void {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }

  private fallbackScrollListener(): void {
    const checkVisibility = () => {
      const sections = document.querySelectorAll('.section');
      sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (sectionTop < windowHeight * 0.9) {
          section.classList.add('visible');
        }
      });
    };
    
    window.addEventListener('load', checkVisibility);
    window.addEventListener('scroll', throttle(checkVisibility, 200));
  }
}

// 节流函数
function throttle<T extends (...args: any[]) => void>(func: T, delay: number): T {
  let timer: number | null = null;
  return function(this: any, ...args: Parameters<T>) {
    if (!timer) {
      func.apply(this, args);
      timer = setTimeout(() => {
        timer = null;
      }, delay);
    }
  } as T;
}

class ThemeManager {
  private themeToggle: HTMLInputElement | null;

  constructor() {
    this.themeToggle = document.getElementById('theme-toggle') as HTMLInputElement | null;
    this.setupEventListeners();
    this.loadSavedTheme();
  }

  private setupEventListeners(): void {
    if (this.themeToggle) {
      this.themeToggle.addEventListener('change', () => {
        this.toggleTheme();
      });
    }
  }

  private toggleTheme(): void {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
  }

  private loadSavedTheme(): void {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-mode');
      if (this.themeToggle) {
        this.themeToggle.checked = true;
      }
    }
  }
}

class NavbarScrollEffect {
  private nav: HTMLElement | null;

  constructor() {
    this.nav = document.querySelector('nav');
    this.setupEventListener();
  }

  private setupEventListener(): void {
    if (this.nav) {
      window.addEventListener('scroll', throttle(() => {
        this.handleScroll();
      }, 100));
    }
  }

  private handleScroll(): void {
    const navContainer = this.nav?.querySelector('.container');
    if (navContainer) {
      if (window.scrollY > 50) {
        (navContainer as HTMLElement).style.paddingTop = '8px';
        (navContainer as HTMLElement).style.paddingBottom = '8px';
      } else {
        (navContainer as HTMLElement).style.paddingTop = '12px';
        (navContainer as HTMLElement).style.paddingBottom = '12px';
      }
    }
  }
}

// 初始化各个模块
new LanguageToggle();
new ScrollAnimator();
new ThemeManager();
new NavbarScrollEffect();