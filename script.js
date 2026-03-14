document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');

    // Set Global Chart.js Defaults for Glassmorphism
    if (window.Chart) {
        Chart.defaults.font.family = "'Inter', sans-serif";
        Chart.defaults.color = '#94A3B8';
        Chart.defaults.plugins.tooltip.backgroundColor = 'rgba(15, 23, 42, 0.85)';
        Chart.defaults.plugins.tooltip.titleColor = '#F8FAFC';
        Chart.defaults.plugins.tooltip.bodyColor = '#F8FAFC';
        Chart.defaults.plugins.tooltip.borderColor = 'rgba(255, 255, 255, 0.1)';
        Chart.defaults.plugins.tooltip.borderWidth = 1;
        Chart.defaults.plugins.tooltip.padding = 12;
        Chart.defaults.plugins.tooltip.displayColors = true;
        Chart.defaults.plugins.tooltip.cornerRadius = 8;
    }

    // Initial Render
    renderLayout(app);
    attachEventListeners();
});

const modulesData = [
    { id: 'life', title: 'Life Investment Simulator', icon: 'fa-chart-line', desc: 'See how age and consistent investing shape your timeline.', render: renderLifeSimulator, init: initLifeSimulator },
    { id: 'sip', title: 'SIP Growth Simulator', icon: 'fa-coins', desc: 'Calculate the power of monthly methodical investing.', render: renderSipSimulator, init: initSipSimulator },
    { id: 'compounding', title: 'Compounding Visualizer', icon: 'fa-chart-pie', desc: 'See the exponential curve of wealth creation.', render: renderCompoundingVisualizer, init: initCompoundingVisualizer },
    { id: 'inflation', title: 'Inflation Reality Check', icon: 'fa-arrow-trend-down', desc: 'Understand how inflation reduces purchasing power.', render: renderInflationSimulator, init: initInflationSimulator },
    { id: 'delay', title: 'Cost of Delay / Start Early', icon: 'fa-clock', desc: 'Visualize the massive impact of waiting to invest.', render: renderDelayImpact, init: initDelayImpact },
    { id: 'goal', title: 'Financial Goal Planner', icon: 'fa-bullseye', desc: 'Determine exactly what you need to hit your targets.', render: renderGoalPlanner, init: initGoalPlanner },
];

function renderLayout(app) {
    app.innerHTML = `
        <!-- Animated Background Orbs -->
        <div class="bg-orbs">
            <div class="orb orb-1"></div>
            <div class="orb orb-2"></div>
            <div class="orb orb-3"></div>
        </div>

        <!-- Sticky Header -->
        <nav class="navbar">
            <div class="nav-container glass-card nav-glass">
                <div class="logo">
                    <i class="fa-solid fa-chart-line text-gradient"></i>
                    <span class="logo-text">WEALTH<span class="text-gradient">SCAPE</span></span>
                </div>
                <div class="nav-links">
                    <a href="#features-section" class="nav-link">Simulators</a>
                </div>
            </div>
        </nav>

        <header class="hero-section" id="hero-view">
            <div class="hero-content glass-card hero-glass">
                <div class="badge mb-2">Interactive Fintech Simulator</div>
                <h1 class="hero-title">See How Financial Decisions <br><span class="text-gradient">Shape Your Future</span></h1>
                <p class="hero-subtitle">Interactive simulations that make investing concepts easy to understand. Zero jargon. Pure visual learning.</p>
                <div class="hero-buttons">
                    <button class="btn btn-primary btn-glow" id="start-simulation-btn">
                        <i class="fa-solid fa-rocket"></i> Start Exploring
                    </button>
                    <a href="#features-section" class="btn btn-secondary" id="explore-tools-btn">
                        <i class="fa-solid fa-layer-group"></i> View All Tools
                    </a>
                </div>
            </div>
        </header>

        <main class="container main-container">
            <div class="section-title text-center" id="tools-header">
                <h2 class="text-gradient">Explore Simulators</h2>
                <p class="text-muted">Choose a tool to start your financial journey</p>
            </div>

            <section id="features-section" class="features-grid">
                ${modulesData.map((mod, index) => `
                    <div class="glass-card feature-card fade-in" data-module="${mod.id}" style="animation-delay: ${index * 0.1}s">
                        <div class="feature-icon-wrapper">
                            <i class="fa-solid ${mod.icon} feature-icon"></i>
                        </div>
                        <h3 class="feature-title">${mod.title}</h3>
                        <p class="feature-desc">${mod.desc}</p>
                    </div>
                `).join('')}
            </section>
            
            <section id="dashboard-view" class="fade-in">
                <div class="dashboard-header">
                    <button class="back-btn" id="back-to-home">
                        <i class="fa-solid fa-arrow-left"></i> <span class="back-text">Back to Tools</span>
                    </button>
                </div>
                <div class="dashboard-content" id="module-container">
                    <!-- Dynamic Module Content Will Load Here -->
                </div>
            </section>
        </main>
    `;
}

function attachEventListeners() {
    const heroView = document.getElementById('hero-view');
    const featuresSection = document.getElementById('features-section');
    const dashboardView = document.getElementById('dashboard-view');
    const moduleContainer = document.getElementById('module-container');

    document.getElementById('start-simulation-btn').addEventListener('click', () => {
        // Open the first module
        openModule('life');
    });

    document.querySelectorAll('.feature-card').forEach(card => {
        card.addEventListener('click', (e) => {
            const moduleId = e.currentTarget.getAttribute('data-module');
            openModule(moduleId);
        });
    });

    document.getElementById('back-to-home').addEventListener('click', () => {
        const toolsHeader = document.getElementById('tools-header');

        dashboardView.style.display = 'none';
        heroView.style.display = 'flex';
        toolsHeader.style.display = 'block';
        featuresSection.style.display = 'grid';

        // Destroy existing chart if any to avoid memory leaks
        if (window.currentChart) {
            window.currentChart.destroy();
            window.currentChart = null;
        }
    });

    function openModule(moduleId) {
        const mod = modulesData.find(m => m.id === moduleId);
        const toolsHeader = document.getElementById('tools-header');

        if (mod) {
            heroView.style.display = 'none';
            toolsHeader.style.display = 'none';
            featuresSection.style.display = 'none';
            dashboardView.style.display = 'block';

            // Render HTML
            moduleContainer.innerHTML = mod.render();
            // Initialize JS logic + charts
            mod.init();

            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }
}

// Global utility for formatting currency
function formatCurrency(value) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(value);
}

// Global utility for animating a number changing
function animateValue(obj, end, duration = 800) {
    let startTimestamp = null;
    const start = parseFloat(obj.dataset.currentVal) || 0;

    // Minimal threshold to avoid unnecessary animation
    if (Math.abs(end - start) < 1) {
        obj.innerHTML = formatCurrency(end);
        obj.dataset.currentVal = end;
        return;
    }

    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);

        // easeOutQuart
        const easeProgress = 1 - Math.pow(1 - progress, 4);
        const currentVal = (easeProgress * (end - start)) + start;

        obj.innerHTML = formatCurrency(Math.floor(currentVal));
        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            obj.innerHTML = formatCurrency(end);
            obj.dataset.currentVal = end;
        }
    };
    window.requestAnimationFrame(step);
}
