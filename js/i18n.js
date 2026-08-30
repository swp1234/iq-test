class I18n {
  constructor() {
    this.supportedLanguages = [
      "ko",
      "en",
      "ja",
      "zh",
      "hi",
      "ru",
      "es",
      "pt",
      "id",
      "tr",
      "de",
      "fr",
    ];
    this.translations = {};
    this.currentLang = this.detectLanguage();
    this.fallbackTranslations = {};
    this.ready = null;
    document.documentElement.lang = this.currentLang;
  }

  detectLanguage() {
    const queryLanguage = new URLSearchParams(location.search).get("lang");
    if (this.supportedLanguages.includes(queryLanguage)) return queryLanguage;
    const savedLanguage = localStorage.getItem("appLanguage");
    if (this.supportedLanguages.includes(savedLanguage)) return savedLanguage;
    const browserLanguage = (navigator.language || "").split("-")[0];
    return this.supportedLanguages.includes(browserLanguage)
      ? browserLanguage
      : "en";
  }

  initialize() {
    if (!this.ready) this.ready = this.loadInitialTranslations();
    return this.ready;
  }

  async loadInitialTranslations() {
    await this.loadTranslations(this.currentLang);
    if (this.currentLang !== "en")
      this.fallbackTranslations = await this.loadTranslations("en");
    else this.fallbackTranslations = this.translations.en;
    this.updateUI();
  }

  async loadTranslations(language) {
    if (this.translations[language]) return this.translations[language];
    try {
      const response = await fetch(`./js/locales/${language}.json`);
      if (!response.ok)
        throw new Error(`Locale ${language} failed: ${response.status}`);
      this.translations[language] = await response.json();
    } catch (error) {
      this.translations[language] = {};
    }
    return this.translations[language];
  }

  t(key, fallback = key) {
    const read = (source) =>
      key.split(".").reduce((value, part) => value && value[part], source);
    return (
      read(this.translations[this.currentLang]) ??
      read(this.fallbackTranslations) ??
      fallback
    );
  }

  async setLanguage(language) {
    if (!this.supportedLanguages.includes(language)) return false;
    await this.loadTranslations(language);
    this.currentLang = language;
    localStorage.setItem("appLanguage", language);
    document.documentElement.lang = language;
    this.updateUI();
    window.dispatchEvent(
      new CustomEvent("languageChanged", { detail: { language } }),
    );
    return true;
  }

  updateUI() {
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const value = this.t(element.dataset.i18n, element.textContent.trim());
      if (element.matches("meta")) element.setAttribute("content", value);
      else element.textContent = value;
    });
    document.querySelectorAll(".lang-option").forEach((button) => {
      button.classList.toggle(
        "active",
        button.dataset.lang === this.currentLang,
      );
    });
    document.title = this.t("app.title", document.title);
  }

  bindControls() {
    const toggle = document.getElementById("lang-toggle");
    const menu = document.getElementById("lang-menu");
    toggle?.addEventListener("click", (event) => {
      event.stopPropagation();
      menu?.classList.toggle("hidden");
    });
    document.querySelectorAll(".lang-option").forEach((button) => {
      button.addEventListener("click", async (event) => {
        event.stopPropagation();
        await this.setLanguage(button.dataset.lang);
        menu?.classList.add("hidden");
      });
    });
    document.addEventListener("click", () => menu?.classList.add("hidden"));
  }
}

const i18n = new I18n();
window.i18n = i18n;
