/* =================================================================
   I18n - Internationalization Module
   Supports 12 languages: ko, en, ja, zh, hi, ru, es, pt, id, tr, de, fr
   ================================================================= */

class I18n {
    constructor() {
        this.translations = {};
        this.supportedLanguages = ['ko', 'en', 'ja', 'zh', 'hi', 'ru', 'es', 'pt', 'id', 'tr', 'de', 'fr'];
        this.currentLang = this.detectLanguage();
        this.initialized = false;
    }

    // Detect user language preference
    detectLanguage() {
        // 1. Check localStorage for saved preference
        const saved = localStorage.getItem('appLanguage');
        if (saved && this.supportedLanguages.includes(saved)) {
            return saved;
        }

        // 2. Check browser language
        const browserLang = navigator.language.split('-')[0];
        if (this.supportedLanguages.includes(browserLang)) {
            return browserLang;
        }

        // 3. Default to English
        return 'en';
    }

    // Load all translations
    async initialize() {
        try {
            // Load primary language
            await this.loadTranslations(this.currentLang);

            // Load English as fallback
            if (this.currentLang !== 'en') {
                const enTranslations = await this.loadTranslations('en');
                this.fallbackTranslations = enTranslations;
            }

            this.initialized = true;
            this.updateUI();
            return true;
        } catch (error) {
            console.error('i18n initialization failed:', error);
            return false;
        }
    }

    // Load translation file
    async loadTranslations(lang) {
        if (this.translations[lang]) {
            return this.translations[lang];
        }

        try {
            const response = await fetch(`js/locales/${lang}.json`);
            if (!response.ok) throw new Error(`Failed to load ${lang}.json`);

            const translations = await response.json();
            this.translations[lang] = translations;
            return translations;
        } catch (error) {
            console.error(`Failed to load language ${lang}:`, error);
            return {};
        }
    }

    // Get translated string with dot notation support
    t(key, defaultValue = key) {
        const keys = key.split('.');
        let value = this.translations[this.currentLang];

        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k];
            } else {
                // Fallback to English
                value = this.fallbackTranslations;
                for (const fk of keys) {
                    if (value && typeof value === 'object' && fk in value) {
                        value = value[fk];
                    } else {
                        return defaultValue;
                    }
                }
                return value;
            }
        }

        return value || defaultValue;
    }

    // Set language
    async setLanguage(lang) {
        if (!this.supportedLanguages.includes(lang)) {
            console.warn(`Language ${lang} not supported`);
            return false;
        }

        await this.loadTranslations(lang);
        this.currentLang = lang;
        localStorage.setItem('appLanguage', lang);

        // Update UI
        this.updateUI();

        // Update page language attribute
        document.documentElement.lang = lang;

        return true;
    }

    // Update all elements with data-i18n attribute
    updateUI() {
        // Update text content
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const text = this.t(key);

            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                if (element.placeholder !== '') {
                    element.placeholder = text;
                }
            } else {
                element.textContent = text;
            }
        });

        // Update page title
        const titleElement = document.querySelector('title[data-i18n]');
        if (titleElement) {
            const titleKey = titleElement.getAttribute('data-i18n');
            document.title = this.t(titleKey);
        }

        // Update meta descriptions
        document.querySelectorAll('meta[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const name = element.getAttribute('name') || element.getAttribute('property');
            const text = this.t(key);

            if (name === 'description') {
                element.setAttribute('content', text);
            } else if (name && name.startsWith('og:')) {
                element.setAttribute('content', text);
            }
        });

        // Update language selector active state
        document.querySelectorAll('.lang-option').forEach(btn => {
            if (btn.getAttribute('data-lang') === this.currentLang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Dispatch custom event
        window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang: this.currentLang } }));
    }

    // Get current language
    getCurrentLanguage() {
        return this.currentLang;
    }

    // Get language name
    getLanguageName(lang) {
        const names = {
            'ko': '한국어',
            'en': 'English',
            'ja': '日本語',
            'zh': '中文',
            'hi': 'हिन्दी',
            'ru': 'Русский',
            'es': 'Español',
            'pt': 'Português',
            'id': 'Bahasa Indonesia',
            'tr': 'Türkçe',
            'de': 'Deutsch',
            'fr': 'Français'
        };
        return names[lang] || lang;
    }

    // Get all supported languages
    getSupportedLanguages() {
        return this.supportedLanguages;
    }
}

// Global instance
const i18n = new I18n();

// Initialize on page load
document.addEventListener('DOMContentLoaded', async () => {
    await i18n.initialize();

    // Setup language selector
    const langToggle = document.getElementById('lang-toggle');
    const langMenu = document.getElementById('lang-menu');

    if (langToggle) {
        langToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            langMenu.classList.toggle('hidden');
        });
    }

    // Language options
    document.querySelectorAll('.lang-option').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            e.stopPropagation();
            const lang = btn.getAttribute('data-lang');
            await i18n.setLanguage(lang);
            langMenu.classList.add('hidden');
        });
    });

    // Close language menu when clicking outside
    document.addEventListener('click', () => {
        if (langMenu) langMenu.classList.add('hidden');
    });
});
