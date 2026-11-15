class IQPuzzleApp {
  constructor() {
    this.questions = [...window.IQ_PUZZLES];
    this.currentQuestion = 0;
    this.answers = [];
    this.screen = "start";
    this.locked = false;
    this.sent = new Set();
    this.surface = this.readSurface();
    this.categoryScores = {};
    this.results = null;
  }

  readSurface() {
    const value = new URLSearchParams(location.search).get("surface") || "";
    return /^[a-z0-9_]{1,48}$/.test(value) ? value : "direct";
  }

  track(name, params = {}) {
    if (this.sent.has(name)) return;
    this.sent.add(name);
    if (typeof gtag === "function")
      gtag("event", name, { entry_surface: this.surface, ...params });
  }

  async init() {
    await i18n.initialize();
    i18n.bindControls();
    this.bindControls();
    this.updateRelatedLinks();
    this.track("iq_puzzle_view");
    window.addEventListener("languageChanged", () => {
      this.updateRelatedLinks();
      this.renderCurrentState();
    });
    const params = new URLSearchParams(location.search);
    if (params.get("start") === "1") this.startTest();
  }

  bindControls() {
    document.getElementById("theme-toggle")?.addEventListener("click", () => {
      const next =
        document.documentElement.dataset.theme === "light" ? "dark" : "light";
      document.documentElement.dataset.theme = next;
      localStorage.setItem("iq-theme", next);
      this.updateThemeButton();
    });
    const theme =
      localStorage.getItem("iq-theme") === "light" ? "light" : "dark";
    document.documentElement.dataset.theme = theme;
    this.updateThemeButton();
    document
      .getElementById("btn-start")
      ?.addEventListener("click", () => this.startTest());
    document
      .getElementById("btn-retry")
      ?.addEventListener("click", () => this.reset());
    document
      .getElementById("btn-detail-notes")
      ?.addEventListener("click", () => this.openNotes());
    document
      .querySelector(".modal-close")
      ?.addEventListener("click", () => this.closeNotes());
    document
      .getElementById("detail-modal")
      ?.addEventListener("click", (event) => {
        if (event.target.id === "detail-modal") this.closeNotes();
      });
    document
      .getElementById("btn-share")
      ?.addEventListener("click", () => this.shareResult());
    document.querySelectorAll("[data-related-route]").forEach((link) => {
      link.addEventListener("click", () => {
        const targetSlug = link.dataset.relatedRoute
          .replace(/^\//, "")
          .replace(/\/$/, "")
          .replace(/[^a-z0-9/-]/gi, "-");
        if (typeof gtag === "function") {
          gtag("event", "content_cta_click", {
            event_category: "engagement",
            page_path: location.pathname,
            target_url: link.href,
            link_id: link.id === "next-step-cta" ? "iq_test_next_step" : ("iq_test_related_" + targetSlug)
          });
        }
        this.track("iq_puzzle_related_click", {
          target_slug: targetSlug,
          is_hero: link.id === "next-step-cta"
        });
      });
    });
  }

  updateThemeButton() {
    const button = document.getElementById("theme-toggle");
    if (button)
      button.textContent =
        document.documentElement.dataset.theme === "light" ? "🌙" : "☀️";
  }

  updateRelatedLinks() {
    document.querySelectorAll("[data-related-route]").forEach((link) => {
      const url = new URL(link.dataset.relatedRoute, location.origin);
      url.searchParams.set("lang", i18n.currentLang || "en");
      url.searchParams.set("source", "iq_test");
      link.href = `${url.pathname}${url.search}`;
    });
    this.updateCuratedResources();
    if (this.screen === "results") this.renderNextStep();
  }

  updateCuratedResources() {
    const asins = { thinkingFastSlow: "0374533555", mindForNumbers: "039916524X" };
    const koQueries = {
      thinkingFastSlow: "생각에 관한 생각 대니얼 카너먼",
      mindForNumbers: "바바라 오클리"
    };
    const partnerTag = "dopabrain-" + "20";
    const amazonDomains = {
      en: { domain: "amazon.com", tag: partnerTag },
      de: { domain: "amazon.de", tag: "" },
      fr: { domain: "amazon.fr", tag: "" },
      es: { domain: "amazon.es", tag: "" },
      pt: { domain: "amazon.com", tag: partnerTag },
      ja: { domain: "amazon.co.jp", tag: "" }
    };
    const resolvedLang = i18n.currentLang || "en";
    document.querySelectorAll("#curated-resources-card .curated-item").forEach((item) => {
      const key = item.dataset.curatedKey;
      const asin = asins[key];
      if (!asin) return;
      if (resolvedLang === "ko") {
        item.href = "https://search.kyobobook.co.kr/search?keyword=" + encodeURIComponent(koQueries[key] || key);
      } else {
        const market = amazonDomains[resolvedLang] || amazonDomains.en;
        item.href = "https://www." + market.domain + "/dp/" + asin + (market.tag ? ("?tag=" + market.tag) : "");
      }
      if (!item.dataset.curatedTracked) {
        item.dataset.curatedTracked = "true";
        item.addEventListener("click", () => {
          if (typeof gtag === "function") {
            gtag("event", "curated_resource_click", {
              app_name: "iq-test",
              resource_key: key,
              content_locale: i18n.currentLang || resolvedLang,
              cta_surface: "curated_resources"
            });
            gtag("event", "content_cta_click", {
              page_path: location.pathname,
              target_url: item.href,
              link_id: "iq_test_curated_" + key
            });
          }
        });
      }
    });
  }

  startTest() {
    if (this.screen === "test") return;
    this.currentQuestion = 0;
    this.answers = new Array(this.questions.length).fill(null);
    this.categoryScores = {};
    this.results = null;
    this.screen = "test";
    this.switchScreen("test");
    this.renderQuestion();
    this.track("iq_puzzle_start");
  }

  renderQuestion() {
    const question = this.questions[this.currentQuestion];
    document.getElementById("progress-current").textContent = String(
      this.currentQuestion + 1,
    );
    document.getElementById("progress-total").textContent = String(
      this.questions.length,
    );
    document.getElementById("progress-fill").style.width =
      `${((this.currentQuestion + 1) / this.questions.length) * 100}%`;
    document.getElementById("question-type-label").textContent = i18n.t(
      `results.category_${question.category}`,
      question.category,
    );
    document.getElementById("question-text").textContent = i18n.t(
      question.promptKey,
      "Choose the answer.",
    );
    document.getElementById("question-content").textContent = question.display;
    const container = document.getElementById("options-container");
    container.replaceChildren();
    question.options.forEach((option, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "option";
      button.textContent = option;
      button.addEventListener("click", () => this.selectOption(index));
      container.appendChild(button);
    });
  }

  selectOption(index) {
    if (this.locked) return;
    this.locked = true;
    this.answers[this.currentQuestion] = index;
    const buttons = [...document.querySelectorAll(".option")];
    buttons.forEach((button, optionIndex) => {
      button.disabled = true;
      button.classList.toggle("selected", optionIndex === index);
    });
    window.setTimeout(() => {
      this.locked = false;
      if (this.currentQuestion + 1 < this.questions.length) {
        this.currentQuestion += 1;
        this.renderQuestion();
      } else this.completeTest();
    }, 140);
  }

  calculateScore() {
    this.categoryScores = {};
    let score = 0;
    this.questions.forEach((question, index) => {
      if (!this.categoryScores[question.category])
        this.categoryScores[question.category] = { correct: 0, total: 0 };
      this.categoryScores[question.category].total += 1;
      if (this.answers[index] === question.correct) {
        score += 1;
        this.categoryScores[question.category].correct += 1;
      }
    });
    return score;
  }

  calculatePuzzleScore(score) {
    return Math.round((score / this.questions.length) * 100);
  }

  completeTest() {
    const correct = this.calculateScore();
    this.results = { correct, puzzleScore: this.calculatePuzzleScore(correct) };
    this.screen = "results";
    this.switchScreen("results");
    this.renderResults();
    this.track("iq_puzzle_complete");
  }

  renderResults() {
    if (!this.results) return;
    document.getElementById("score-value").textContent = String(
      this.results.puzzleScore,
    );
    document.getElementById("grade-title").textContent = i18n.t(
      "results.session_summary",
      "Session summary",
    );
    document.getElementById("grade-desc").textContent = i18n
      .t("results.correct_count", "{correct} of {total} correct")
      .replace("{correct}", this.results.correct)
      .replace("{total}", this.questions.length);
    const container = document.getElementById("score-bars");
    container.replaceChildren();
    ["pattern", "sequence", "logic", "spatial"].forEach((category) => {
      const score = this.categoryScores[category] || { correct: 0, total: 0 };
      const row = document.createElement("div");
      row.className = "score-bar";
      const label = document.createElement("span");
      label.textContent = i18n.t(`results.category_${category}`, category);
      const track = document.createElement("span");
      track.className = "score-bar-track";
      const fill = document.createElement("span");
      fill.className = "score-bar-fill";
      fill.style.width = `${score.total ? (score.correct / score.total) * 100 : 0}%`;
      track.appendChild(fill);
      const value = document.createElement("span");
      value.textContent = `${score.correct}/${score.total}`;
      row.append(label, track, value);
      container.appendChild(row);
    });
    this.renderNextStep();
  }

  renderNextStep() {
    const card = document.getElementById("next-step-card");
    const label = document.getElementById("next-step-label");
    const title = document.getElementById("next-step-title");
    const desc = document.getElementById("next-step-desc");
    const cta = document.getElementById("next-step-cta");
    if (!card || !label || !title || !desc || !cta) return;

    const correct = this.results?.correct ?? 0;
    const lang = i18n.currentLang || "en";

    let rec;
    if (correct >= 7) {
      rec = {
        route: "/stress-type/",
        label: i18n.t("nextStep.highLabel", "Recommended Next Step"),
        title: i18n.t("nextStep.highTitle", "Stress Resilience & Response Type"),
        desc: i18n.t("nextStep.highDesc", "High fluid reasoning thrives under pressure. Explore your autonomic reaction to overload with a body heatmap in Stress Type."),
        cta: i18n.t("nextStep.highCta", "Test Stress Type →")
      };
    } else if (correct >= 4) {
      rec = {
        route: "/future-self/",
        label: i18n.t("nextStep.midLabel", "Recommended Next Step"),
        title: i18n.t("nextStep.midTitle", "Explore Strategic Archetypes & Future Trajectory"),
        desc: i18n.t("nextStep.midDesc", "Discover whether your cognitive instincts align with strategic leadership, creative vision, autonomy, or wisdom in Future Self."),
        cta: i18n.t("nextStep.midCta", "Explore Future Self →")
      };
    } else {
      rec = {
        route: "/stress-check/",
        label: i18n.t("nextStep.lowLabel", "Recommended Next Step"),
        title: i18n.t("nextStep.lowTitle", "Check for Cognitive & Mental Fatigue"),
        desc: i18n.t("nextStep.lowDesc", "Low focus often reflects nervous system strain. Assess somatic tension in Stress Check."),
        cta: i18n.t("nextStep.lowCta", "Check Stress Levels →")
      };
    }

    label.textContent = rec.label;
    title.textContent = rec.title;
    desc.textContent = rec.desc;
    cta.textContent = rec.cta;
    cta.dataset.relatedRoute = rec.route;
    cta.href = `${rec.route}?lang=${encodeURIComponent(lang)}&source=iq_test`;
  }

  openNotes() {
    if (!this.results) return;
    document.getElementById("detail-notes-text").textContent = i18n.t(
      "results.detail_body",
      "This score summarizes only these 10 puzzles and does not measure intelligence or population rank.",
    );
    document.getElementById("detail-modal").classList.remove("hidden");
  }

  closeNotes() {
    document.getElementById("detail-modal").classList.add("hidden");
  }

  async shareResult() {
    if (!this.results) return;
    const text = i18n
      .t("share.text", "I completed the 10-puzzle challenge: {score}/100.")
      .replace("{score}", this.results.puzzleScore);
    const shareData = {
      title: i18n.t("share.title", "10-puzzle challenge"),
      text,
      url: "https://dopabrain.com/iq-test/",
    };
    try {
      if (navigator.share) await navigator.share(shareData);
      else await navigator.clipboard.writeText(`${text}\n${shareData.url}`);
      this.track("iq_puzzle_share");
      document.getElementById("share-status").textContent = i18n.t(
        "share.copied",
        "Shared.",
      );
    } catch (error) {
      document.getElementById("share-status").textContent = "";
    }
  }

  reset() {
    this.screen = "start";
    this.switchScreen("start");
  }

  renderCurrentState() {
    if (this.screen === "test") this.renderQuestion();
    if (this.screen === "results") this.renderResults();
  }

  switchScreen(active) {
    ["start", "test", "results"].forEach((name) => {
      document
        .getElementById(`screen-${name}`)
        .classList.toggle("active", name === active);
    });
    document.getElementById("main-content")?.focus({ preventScroll: true });
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const app = new IQPuzzleApp();
    window.iqApp = app;
    await app.init();
  } catch (error) {
    document.getElementById("app-loader")?.classList.add("hidden");
    console.error("IQ puzzle initialization failed:", error);
    return;
  }
  document.getElementById("app-loader")?.remove();
});
