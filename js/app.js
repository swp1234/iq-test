/* =================================================================
   Quick IQ Test - Main Application Logic
   ================================================================= */

class IQTestApp {
    constructor() {
        this.currentQuestion = 0;
        this.questions = [];
        this.userAnswers = [];
        this.startTime = 0;
        this.questionStartTime = 0;
        this.timeTaken = [];
        this.testState = 'start'; // start, test, results
        this.categoryScores = {
            pattern: { correct: 0, total: 0 },
            sequence: { correct: 0, total: 0 },
            logic: { correct: 0, total: 0 },
            spatial: { correct: 0, total: 0 },
            language: { correct: 0, total: 0 }
        };
        this.timerInterval = null;
    }

    // Initialize the app
    async init() {
        // Initialize theme
        const savedTheme = localStorage.getItem('app-theme') || 'dark';
        document.documentElement.setAttribute('data-theme', savedTheme);
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.textContent = savedTheme === 'light' ? '🌙' : '☀️';
        }
        
        this.setupEventListeners();
        this.questions = getRandomQuestions(20);
    }

    // Setup event listeners
    setupEventListeners() {
        // Theme toggle
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                const current = document.documentElement.getAttribute('data-theme') || 'dark';
                const next = current === 'light' ? 'dark' : 'light';
                document.documentElement.setAttribute('data-theme', next);
                localStorage.setItem('app-theme', next);
                themeToggle.textContent = next === 'light' ? '🌙' : '☀️';
            });
        }

        // Start button
        document.getElementById('btn-start').addEventListener('click', () => this.startTest());

        // Test navigation
        document.getElementById('btn-prev').addEventListener('click', () => this.previousQuestion());
        document.getElementById('btn-next').addEventListener('click', () => this.nextQuestion());

        // Results actions
        document.getElementById('btn-detail-notes').addEventListener('click', () => this.showDetailNotes());
        document.getElementById('btn-share-image').addEventListener('click', () => this.shareAsImage());
        document.getElementById('btn-share-web').addEventListener('click', () => this.shareWeb());
        document.getElementById('btn-retry').addEventListener('click', () => this.retryTest());

        // Modal close
        document.querySelector('.modal-close').addEventListener('click', () => this.closeDetailNotes());
        document.getElementById('detail-modal').addEventListener('click', (e) => {
            if (e.target.id === 'detail-modal') this.closeDetailNotes();
        });
    }

    // Start test
    startTest() {
        this.testState = 'test';
        this.startTime = Date.now();
        this.userAnswers = new Array(this.questions.length).fill(null);
        this.categoryScores = {
            pattern: { correct: 0, total: 0 },
            sequence: { correct: 0, total: 0 },
            logic: { correct: 0, total: 0 },
            spatial: { correct: 0, total: 0 },
            language: { correct: 0, total: 0 }
        };

        this.switchScreen('start', 'test');
        this.loadQuestion(0);

        // Track in GA4
        if (typeof gtag === 'function') {
            gtag('event', 'test_start', { event_category: 'engagement', event_label: 'iq_test_start' });
            gtag('event', 'engagement', { event_category: 'iq_test', event_label: 'first_interaction' });
        }
    }

    // Load and display question
    loadQuestion(index) {
        this.currentQuestion = index;
        const question = this.questions[index];
        this.questionStartTime = Date.now();

        // Update progress
        document.getElementById('progress-current').textContent = index + 1;
        document.getElementById('progress-total').textContent = this.questions.length;

        const percentage = ((index + 1) / this.questions.length) * 100;
        document.getElementById('progress-fill').style.width = percentage + '%';

        // Update question type
        document.getElementById('question-icon').textContent = question.icon;
        document.getElementById('question-type-label').textContent = question.categoryLabel;

        // Update question text
        document.getElementById('question-text').textContent = this.i18n_t(
            `question_${question.id}_text`,
            question.question
        );

        // Render question content
        this.renderQuestionContent(question);

        // Render options
        this.renderOptions(question);

        // Setup timer
        this.startQuestionTimer();

        // Update navigation buttons
        document.getElementById('btn-prev').disabled = index === 0;
        document.getElementById('btn-next').disabled = index === this.questions.length - 1;
    }

    // Render question content
    renderQuestionContent(question) {
        const container = document.getElementById('question-content');
        container.innerHTML = '';

        switch (question.type) {
            case 'sequence':
            case 'numbers':
            case 'letters':
            case 'symbols':
                const seq = question.content.sequence || [];
                const seqHtml = seq.map((item, i) => {
                    if (item === '?') {
                        return `<span class="sequence-item unknown">?</span>`;
                    }
                    return `<span class="sequence-item">${item}</span>`;
                }).join('<span class="sequence-separator">→</span>');
                container.innerHTML = `<div class="sequence-display">${seqHtml}</div>`;
                break;

            case 'grid':
                const grid = question.content.grid || [];
                const gridHtml = grid.map(row =>
                    `<div class="grid-row">${row.map(cell =>
                        `<span class="grid-cell">${cell}</span>`
                    ).join('')}</div>`
                ).join('');
                container.innerHTML = `<div class="grid-display">${gridHtml}</div>`;
                break;

            case 'color':
                const colors = question.content.sequence || [];
                const colorHtml = colors.map(color => {
                    const bgColor = this.getColorCode(color);
                    return `<span class="color-box" style="background: ${bgColor}; border: 2px solid ${bgColor};" title="${color}"></span>`;
                }).join('');
                container.innerHTML = `<div class="color-display">${colorHtml}</div>`;
                break;

            default:
                container.textContent = question.content.description || '';
        }
    }

    // Get color code from name
    getColorCode(colorName) {
        const colors = {
            'Red': '#ff6b6b',
            'Blue': '#3498db',
            'Green': '#27ae60',
            'Yellow': '#f39c12',
            'Purple': '#9b59b6'
        };
        return colors[colorName] || '#95a5a6';
    }

    // Render options
    renderOptions(question) {
        const container = document.getElementById('options-container');
        container.innerHTML = '';

        question.options.forEach((option, index) => {
            const btn = document.createElement('button');
            btn.className = 'option';
            btn.textContent = option;
            btn.addEventListener('click', () => this.selectOption(index));

            if (this.userAnswers[this.currentQuestion] === index) {
                btn.classList.add('selected');
            }

            container.appendChild(btn);
        });
    }

    // Select option
    selectOption(index) {
        this.userAnswers[this.currentQuestion] = index;
        this.renderOptions(this.questions[this.currentQuestion]);

        // Track in GA4
        gtag('event', 'question_answered', {
            'event_category': 'engagement',
            'event_label': `q${this.currentQuestion + 1}`,
            'value': index
        });

        // Advance after 0.3s; nextQuestion() completes the test on the last item.
        setTimeout(() => {
            this.nextQuestion();
        }, 300);
    }

    // Previous question
    previousQuestion() {
        if (this.currentQuestion > 0) {
            this.loadQuestion(this.currentQuestion - 1);
        }
    }

    // Next question
    nextQuestion() {
        if (this.currentQuestion < this.questions.length - 1) {
            this.loadQuestion(this.currentQuestion + 1);
        } else {
            // Test complete
            this.completeTest();
        }
    }

    // Start question timer
    startQuestionTimer() {
        let timeRemaining = 30;
        document.getElementById('timer').textContent = timeRemaining;
        document.getElementById('timer').classList.remove('warning', 'critical');

        if (this.timerInterval) clearInterval(this.timerInterval);

        this.timerInterval = setInterval(() => {
            timeRemaining--;
            document.getElementById('timer').textContent = timeRemaining;

            if (timeRemaining <= 10) {
                document.getElementById('timer').classList.add('warning');
            }
            if (timeRemaining <= 5) {
                document.getElementById('timer').classList.add('critical');
            }

            if (timeRemaining <= 0) {
                clearInterval(this.timerInterval);
                this.nextQuestion();
            }
        }, 1000);
    }

    // Complete test
    completeTest() {
        if (this.timerInterval) clearInterval(this.timerInterval);

        // Calculate scores
        const score = this.calculateScore();
        const totalTime = (Date.now() - this.startTime) / 1000;
        const puzzleScore = this.calculatePuzzleScore(score);

        // Store results
        this.results = {
            score,
            puzzleScore,
            totalTime,
            categoryScores: this.categoryScores,
            timestamp: new Date().toISOString()
        };

        // Show results
        this.showResults();

        // Track in GA4
        gtag('event', 'test_complete', {
            'event_category': 'engagement',
            'event_label': 'iq_test_complete',
            'value': puzzleScore
        });
    }

    // Calculate score
    calculateScore() {
        let score = 0;

        this.questions.forEach((question, index) => {
            const answer = this.userAnswers[index];
            const isCorrect = answer === question.correct;

            if (isCorrect) {
                score++;
                this.categoryScores[question.category].correct++;
            }

            this.categoryScores[question.category].total++;
        });

        return score;
    }

    // Transparent game score: percentage of this session's questions answered correctly.
    calculatePuzzleScore(score) {
        return Math.round((score / this.questions.length) * 100);
    }

    // Show results
    showResults() {
        this.switchScreen('test', 'results');

        const puzzleScore = this.results.puzzleScore;

        // Update transparent puzzle score display.
        document.getElementById('score-value').textContent = puzzleScore;

        // Update gauge chart
        const gaugeProgress = document.getElementById('gauge-progress');
        const percentage = puzzleScore;
        const circumference = 565;
        const offset = circumference - (percentage / 100) * circumference;
        gaugeProgress.style.strokeDashoffset = offset;

        document.getElementById('grade-title').textContent = this.i18n_t('results.session_summary', 'Session Summary');
        document.getElementById('grade-desc').textContent = this.i18n_t(
            'results.correct_count',
            '{correct} of {total} correct'
        ).replace('{correct}', this.results.score).replace('{total}', this.questions.length);

        // Update category analysis
        this.updateRadarChart();
        this.updateScoreBars();
    }

    // Update radar chart
    updateRadarChart() {
        const svg = document.getElementById('radar-chart');
        svg.innerHTML = '';

        const size = 300;
        const center = 150;
        const categories = [
            { name: 'pattern', label: 'Pattern', color: '#ff6b6b' },
            { name: 'sequence', label: 'Sequence', color: '#4ecdc4' },
            { name: 'logic', label: 'Logic', color: '#ffe66d' },
            { name: 'spatial', label: 'Spatial', color: '#95e1d3' },
            { name: 'language', label: 'Language', color: '#c7b3e5' }
        ];

        const angle = (Math.PI * 2) / categories.length;
        const radius = 80;

        // Create SVG gradient
        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
        gradient.setAttribute('id', 'gauge-gradient');
        gradient.setAttribute('x1', '0%');
        gradient.setAttribute('y1', '0%');
        gradient.setAttribute('x2', '100%');
        gradient.setAttribute('y2', '100%');

        const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
        stop1.setAttribute('offset', '0%');
        stop1.setAttribute('stop-color', '#3498db');
        gradient.appendChild(stop1);

        const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
        stop2.setAttribute('offset', '100%');
        stop2.setAttribute('stop-color', '#2980b9');
        gradient.appendChild(stop2);

        defs.appendChild(gradient);
        svg.appendChild(defs);

        // Draw background circles
        for (let i = 0; i < 5; i++) {
            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', center);
            circle.setAttribute('cy', center);
            circle.setAttribute('r', (radius / 5) * (i + 1));
            circle.setAttribute('fill', 'none');
            circle.setAttribute('stroke', 'rgba(255,255,255,0.1)');
            circle.setAttribute('stroke-width', '1');
            svg.appendChild(circle);
        }

        // Draw radar axes and data
        let dataPoints = [];

        categories.forEach((cat, i) => {
            const x = center + radius * Math.cos(i * angle - Math.PI / 2);
            const y = center + radius * Math.sin(i * angle - Math.PI / 2);

            // Draw axis line
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', center);
            line.setAttribute('y1', center);
            line.setAttribute('x2', x);
            line.setAttribute('y2', y);
            line.setAttribute('stroke', 'rgba(255,255,255,0.2)');
            line.setAttribute('stroke-width', '1');
            svg.appendChild(line);

            // Calculate score percentage
            const categoryData = this.categoryScores[cat.name];
            const percentage = categoryData.total > 0 ? categoryData.correct / categoryData.total : 0;
            const dataRadius = radius * percentage;

            const dataX = center + dataRadius * Math.cos(i * angle - Math.PI / 2);
            const dataY = center + dataRadius * Math.sin(i * angle - Math.PI / 2);

            dataPoints.push(`${dataX},${dataY}`);

            // Draw label
            const labelRadius = radius + 30;
            const labelX = center + labelRadius * Math.cos(i * angle - Math.PI / 2);
            const labelY = center + labelRadius * Math.sin(i * angle - Math.PI / 2);

            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', labelX);
            text.setAttribute('y', labelY);
            text.setAttribute('text-anchor', 'middle');
            text.setAttribute('dominant-baseline', 'middle');
            text.setAttribute('fill', 'rgba(255,255,255,0.7)');
            text.setAttribute('font-size', '12');
            text.textContent = `${Math.round(percentage * 100)}%`;
            svg.appendChild(text);
        });

        // Draw data polygon
        if (dataPoints.length > 0) {
            const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
            polygon.setAttribute('points', dataPoints.join(' '));
            polygon.setAttribute('fill', 'rgba(52,152,219,0.3)');
            polygon.setAttribute('stroke', '#3498db');
            polygon.setAttribute('stroke-width', '2');
            svg.appendChild(polygon);
        }
    }

    // Update score bars
    updateScoreBars() {
        const container = document.getElementById('score-bars');
        container.innerHTML = '';

        const categories = [
            { key: 'pattern', label: this.i18n_t('results.category_pattern', 'Pattern Recognition') },
            { key: 'sequence', label: this.i18n_t('results.category_sequence', 'Sequence Logic') },
            { key: 'logic', label: this.i18n_t('results.category_logic', 'Logical Reasoning') },
            { key: 'spatial', label: this.i18n_t('results.category_spatial', 'Spatial Awareness') },
            { key: 'language', label: this.i18n_t('results.category_language', 'Language Ability') }
        ];

        categories.forEach(cat => {
            const data = this.categoryScores[cat.key];
            const percentage = data.total > 0 ? (data.correct / data.total) * 100 : 0;

            const html = `
                <div class="score-bar">
                    <div class="score-bar-label">${cat.label}</div>
                    <div class="score-bar-track">
                        <div class="score-bar-fill" style="width: ${percentage}%; --color: var(--cat-${cat.key});"></div>
                    </div>
                    <div class="score-bar-value">${data.correct}/${data.total}</div>
                </div>
            `;

            container.innerHTML += html;
        });
    }

    // Show a transparent explanation of what this session can and cannot indicate.
    showDetailNotes() {
        const detailText = this.i18n_t(
            'results.detail_body',
            'Review the category bars to see which puzzle types felt easiest. This 20-question game score does not measure intelligence or population rank.'
        ).replace('{score}', this.results.score).replace('{total}', this.questions.length);

        document.getElementById('detail-notes-text').textContent = detailText;
        document.getElementById('detail-modal').classList.remove('hidden');

        gtag('event', 'iq_detail_notes_view', {
            'event_category': 'engagement',
            'event_label': 'session_score_context'
        });
    }

    // Close detailed score notes
    closeDetailNotes() {
        document.getElementById('detail-modal').classList.add('hidden');
    }

    // Share as Image
    shareAsImage() {
        const canvas = document.getElementById('result-canvas');
        const ctx = canvas.getContext('2d');

        // Canvas dimensions
        canvas.width = 1200;
        canvas.height = 1600;

        const puzzleScore = this.results.puzzleScore;

        // Background
        ctx.fillStyle = '#0f0f23';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Header
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 60px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(this.i18n_t('canvas.title', 'IQ-Style Puzzle Result'), canvas.width / 2, 100);

        // Puzzle score
        ctx.font = 'bold 120px Arial';
        ctx.fillStyle = '#3498db';
        ctx.fillText(puzzleScore, canvas.width / 2, 350);

        ctx.font = 'bold 40px Arial';
        ctx.fillStyle = '#b8c5d6';
        ctx.fillText(this.i18n_t('results.score_label', 'Puzzle Score'), canvas.width / 2, 420);

        ctx.font = '30px Arial';
        ctx.fillStyle = '#b8c5d6';
        ctx.fillText(
            this.i18n_t('results.correct_count', '{correct} of {total} correct')
                .replace('{correct}', this.results.score)
                .replace('{total}', this.questions.length),
            canvas.width / 2,
            550
        );

        // Category scores
        ctx.font = 'bold 30px Arial';
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'left';
        ctx.fillText(this.i18n_t('canvas.breakdown', 'Category Breakdown:'), 100, 750);

        const categories = [
            { label: this.i18n_t('canvas.pattern', 'Pattern Recognition'), key: 'pattern', y: 820 },
            { label: this.i18n_t('canvas.sequence', 'Sequence Logic'), key: 'sequence', y: 920 },
            { label: this.i18n_t('canvas.logic', 'Logical Reasoning'), key: 'logic', y: 1020 },
            { label: this.i18n_t('canvas.spatial', 'Spatial Awareness'), key: 'spatial', y: 1120 },
            { label: this.i18n_t('canvas.language', 'Language Ability'), key: 'language', y: 1220 }
        ];

        categories.forEach(cat => {
            const data = this.categoryScores[cat.key];
            const percentage = data.total > 0 ? (data.correct / data.total) * 100 : 0;

            ctx.font = '24px Arial';
            ctx.fillStyle = '#b8c5d6';
            ctx.fillText(`${cat.label}: ${data.correct}/${data.total} (${Math.round(percentage)}%)`, 120, cat.y);
        });

        // Footer
        ctx.font = '20px Arial';
        ctx.fillStyle = '#95a5a6';
        ctx.textAlign = 'center';
        ctx.fillText(this.i18n_t('canvas.footer', 'Try the puzzle quiz at dopabrain.com/iq-test'), canvas.width / 2, 1550);

        // Download image
        canvas.toBlob((blob) => {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `iq-style-puzzle-score-${puzzleScore}.png`;
            a.click();
            URL.revokeObjectURL(url);
        });

        gtag('event', 'share_image', {
            'event_category': 'engagement',
            'event_label': 'iq_result_image'
        });
    }

    // Share Web
    shareWeb() {
        const text = this.i18n_t('share.text', 'I scored {score}/100 on the IQ-style puzzle quiz. Try the same 20 questions!')
            .replace('{score}', this.results.puzzleScore);
        const url = 'https://dopabrain.com/iq-test/';

        if (navigator.share) {
            navigator.share({
                title: this.i18n_t('share.title', 'IQ-Style Puzzle Quiz'),
                text: text,
                url: url
            }).catch(err => console.log('Share failed:', err));
        } else {
            // Fallback: copy to clipboard
            const fullText = `${text}\n\n${url}`;
            navigator.clipboard.writeText(fullText).then(() => {
                alert(this.i18n_t('share.copied', 'Link copied to clipboard!'));
            });
        }

        gtag('event', 'share_web', {
            'event_category': 'engagement',
            'event_label': 'iq_result_share'
        });
    }

    // Retry test
    retryTest() {
        this.questions = getRandomQuestions(20);
        this.currentQuestion = 0;
        this.userAnswers = [];
        this.categoryScores = {
            pattern: { correct: 0, total: 0 },
            sequence: { correct: 0, total: 0 },
            logic: { correct: 0, total: 0 },
            spatial: { correct: 0, total: 0 },
            language: { correct: 0, total: 0 }
        };

        this.switchScreen('results', 'start');

        gtag('event', 'test_retry', {
            'event_category': 'engagement',
            'event_label': 'iq_test_retry'
        });
    }

    // Switch screen
    switchScreen(fromScreen, toScreen) {
        document.getElementById(`screen-${fromScreen}`).classList.remove('active');
        document.getElementById(`screen-${toScreen}`).classList.add('active');
    }

    // Helper: i18n text
    i18n_t(key, defaultValue) {
        return i18n.t(key, defaultValue);
    }
}

// Initialize app when DOM is ready
let app;
document.addEventListener('DOMContentLoaded', async () => {
    try {
        try {
            await i18n.initialize();
        } catch (e) {
            console.warn('i18n init failed:', e);
        }
        app = new IQTestApp();
        await app.init();
    } catch(e) {
        console.error('Init error:', e);
    } finally {
        const loader = document.getElementById('app-loader');
        if (loader) {
            loader.classList.add('hidden');
            setTimeout(() => loader.remove(), 300);
        }
    }

    // GA4 engagement tracking (scroll + timer)
    let scrollFired = false;
    window.addEventListener('scroll', function() {
        if (!scrollFired && window.scrollY > 100) {
            scrollFired = true;
            if (typeof gtag === 'function') gtag('event', 'scroll_engagement', { engagement_type: 'scroll' });
        }
    }, { passive: true });
    setTimeout(function() {
        if (typeof gtag === 'function') gtag('event', 'timer_engagement', { engagement_time_msec: 5000 });
    }, 5000);
});
