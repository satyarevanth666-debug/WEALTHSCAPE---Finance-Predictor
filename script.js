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
    // Diagnostic: verify module handlers are available
    const missing = [];
    modulesData.forEach(m => {
        if (typeof m.render !== 'function' || typeof m.init !== 'function') missing.push(m.id);
    });
    if (missing.length) console.warn('Modules with missing handlers:', missing);
    attachEventListeners();
});

const modulesData = [
    { id: 'life', title: 'Life Investment Simulator', icon: 'fa-chart-line', desc: 'See how age and consistent investing shape your timeline.', render: renderLifeSimulator, init: initLifeSimulator },
    { id: 'sip', title: 'SIP Growth Simulator', icon: 'fa-coins', desc: 'Calculate the power of monthly methodical investing.', render: renderSipSimulator, init: initSipSimulator },
    { id: 'compounding', title: 'Compounding Visualizer', icon: 'fa-chart-pie', desc: 'See the exponential curve of wealth creation.', render: renderCompoundingVisualizer, init: initCompoundingVisualizer },
    { id: 'inflation', title: 'Inflation Reality Check', icon: 'fa-arrow-trend-down', desc: 'Understand how inflation reduces purchasing power.', render: renderInflationSimulator, init: initInflationSimulator },
    { id: 'delay', title: 'Cost of Delay / Start Early', icon: 'fa-clock', desc: 'Visualize the massive impact of waiting to invest.', render: renderDelayImpact, init: initDelayImpact },
    { id: 'goal', title: 'Financial Goal Planner', icon: 'fa-bullseye', desc: 'Determine exactly what you need to hit your targets.', render: renderGoalPlanner, init: initGoalPlanner },
    { id: 'emi', title: 'EMI & Loan Calculator', icon: 'fa-credit-card', desc: 'Work out monthly loan payments, total interest and repayment cost.', render: renderEmiCalculator, init: initEmiCalculator },
    { id: 'retirement', title: 'Retirement Corpus Calculator', icon: 'fa-suitcase-rolling', desc: 'Estimate the retirement corpus you can build with consistent savings.', render: renderRetirementCalculator, init: initRetirementCalculator },
    { id: 'tax', title: 'Tax Savings Calculator', icon: 'fa-receipt', desc: 'See how investments under tax-saving sections reduce your taxable income.', render: renderTaxSavingsCalculator, init: initTaxSavingsCalculator },
    { id: 'emergency', title: 'Emergency Fund Planner', icon: 'fa-first-aid', desc: 'Calculate how much cash cushion you need for 6-12 months of expenses.', render: renderEmergencyFundCalculator, init: initEmergencyFundCalculator },
    { id: 'investment', title: 'Investment Return Calculator', icon: 'fa-hand-holding-dollar', desc: 'Project your long-term wealth from savings and investment returns.', render: renderInvestmentReturnCalculator, init: initInvestmentReturnCalculator },
    { id: 'sip_calc', title: 'SIP Calculator', icon: 'fa-coins', desc: 'Systematic Investment Plan calculator.', render: renderSipCalculator, init: initSipCalculator },
    { id: 'lumpsum', title: 'Lumpsum Calculator', icon: 'fa-wallet', desc: 'Lumpsum investment growth calculator.', render: renderLumpsumCalculator, init: initLumpsumCalculator },
    { id: 'compound', title: 'Compound Interest Calculator', icon: 'fa-sparkles', desc: 'Compound interest with different compounding frequencies.', render: renderCompoundInterestCalculator, init: initCompoundInterestCalculator },
    { id: 'cagr', title: 'CAGR Calculator', icon: 'fa-chart-simple', desc: 'Compound Annual Growth Rate.', render: renderCagrCalculator, init: initCagrCalculator },
    { id: 'roi_calc', title: 'ROI Calculator', icon: 'fa-percent', desc: 'Return on investment.', render: renderRoiCalculator, init: initRoiCalculator },
    { id: 'fv_pv', title: 'Future & Present Value', icon: 'fa-clock-rotate-left', desc: 'Compute FV and PV for lump sums.', render: renderFvPvCalculator, init: initFvPvCalculator },
    { id: 'inflation_calc', title: 'Inflation Calculator', icon: 'fa-temperature-arrow-up', desc: 'Price change due to inflation.', render: renderInflationCalculator, init: initInflationCalculator },
    // Investment & Wealth Building - additional
    { id: 'mutual_fund_returns', title: 'Mutual Fund Returns', icon: 'fa-chart-area', desc: 'Mutual fund historical return analyzer.', render: renderMutualFundReturns, init: initMutualFundReturns },
    { id: 'swp', title: 'SWP Calculator', icon: 'fa-hand-holding-dollar', desc: 'Systematic Withdrawal Plan calculator.', render: renderSwpCalculator, init: initSwpCalculator },
    { id: 'xirr', title: 'XIRR Calculator', icon: 'fa-chart-line', desc: 'Calculate irregular cashflow returns (XIRR).', render: renderXirrCalculator, init: initXirrCalculator },
    { id: 'dividend_yield', title: 'Dividend Yield', icon: 'fa-seedling', desc: 'Dividend yield and income estimator.', render: renderDividendYieldCalculator, init: initDividendYieldCalculator },
    { id: 'stock_avg', title: 'Stock Average Calculator', icon: 'fa-scale-balanced', desc: 'Average cost for stock purchases.', render: renderStockAverageCalculator, init: initStockAverageCalculator },
    { id: 'risk_reward', title: 'Risk-Reward Ratio', icon: 'fa-balance-scale', desc: 'Risk vs reward measure for investments.', render: renderRiskRewardCalculator, init: initRiskRewardCalculator },
    { id: 'sharpe', title: 'Sharpe Ratio', icon: 'fa-chart-simple', desc: 'Sharpe ratio for portfolio risk-adjusted returns.', render: renderSharpeRatioCalculator, init: initSharpeRatioCalculator },

    // Loan & EMI - additional entries
    { id: 'home_loan', title: 'Home Loan EMI', icon: 'fa-house', desc: 'Home loan EMI calculator.', render: renderHomeLoanCalculator, init: initHomeLoanCalculator },
    { id: 'personal_loan', title: 'Personal Loan EMI', icon: 'fa-user', desc: 'Personal loan EMI and schedule.', render: renderPersonalLoanCalculator, init: initPersonalLoanCalculator },
    { id: 'car_loan', title: 'Car Loan EMI', icon: 'fa-car', desc: 'Car loan EMI calculator.', render: renderCarLoanCalculator, init: initCarLoanCalculator },
    { id: 'education_loan', title: 'Education Loan', icon: 'fa-graduation-cap', desc: 'Education loan EMI and repayment.', render: renderEducationLoanCalculator, init: initEducationLoanCalculator },
    { id: 'business_loan', title: 'Business Loan', icon: 'fa-briefcase', desc: 'Business loan calculator.', render: renderBusinessLoanCalculator, init: initBusinessLoanCalculator },
    { id: 'loan_eligibility', title: 'Loan Eligibility', icon: 'fa-check-circle', desc: 'Estimate loan eligibility.', render: renderLoanEligibilityCalculator, init: initLoanEligibilityCalculator },
    { id: 'loan_affordability', title: 'Loan Affordability', icon: 'fa-wallet', desc: 'Determine loan affordability.', render: renderLoanAffordabilityCalculator, init: initLoanAffordabilityCalculator },
    { id: 'loan_prepay', title: 'Loan Prepayment', icon: 'fa-money-bill-wave', desc: 'Prepayment impact on loan schedule.', render: renderLoanPrepaymentCalculator, init: initLoanPrepaymentCalculator },
    { id: 'loan_balance', title: 'Loan Balance', icon: 'fa-database', desc: 'Remaining loan balance calculator.', render: renderLoanBalanceCalculator, init: initLoanBalanceCalculator },
    { id: 'dti', title: 'Debt-to-Income Ratio', icon: 'fa-percent', desc: 'Measure debt vs income.', render: renderDebtToIncomeCalculator, init: initDebtToIncomeCalculator },
    { id: 'mortgage', title: 'Mortgage Calculator', icon: 'fa-house-chimney', desc: 'Mortgage payment and amortization.', render: renderMortgageCalculator, init: initMortgageCalculator },
    { id: 'mortgage_refi', title: 'Mortgage Refinance', icon: 'fa-exchange-alt', desc: 'Refinance savings estimator.', render: renderMortgageRefinanceCalculator, init: initMortgageRefinanceCalculator },
    { id: 'interest_only', title: 'Interest-Only Mortgage', icon: 'fa-hourglass-half', desc: 'Interest-only mortgage planner.', render: renderInterestOnlyMortgageCalculator, init: initInterestOnlyMortgageCalculator },
    { id: 'debt_payoff', title: 'Debt Payoff', icon: 'fa-fire', desc: 'Plan to pay off debt faster.', render: renderDebtPayoffCalculator, init: initDebtPayoffCalculator },

    // Savings & Deposits
    { id: 'fd', title: 'Fixed Deposit (FD)', icon: 'fa-piggy-bank', desc: 'Fixed deposit interest calculator.', render: renderFDCalculator, init: initFDCalculator },
    { id: 'rd', title: 'Recurring Deposit (RD)', icon: 'fa-calendar-plus', desc: 'Recurring deposit calculator.', render: renderRDCalculator, init: initRDCalculator },
    { id: 'savings_interest', title: 'Savings Interest', icon: 'fa-coins', desc: 'Savings account interest calculator.', render: renderSavingsInterestCalculator, init: initSavingsInterestCalculator },
    { id: 'savings_goal', title: 'Savings Goal', icon: 'fa-bullseye', desc: 'Plan for a savings goal.', render: renderSavingsGoalCalculator, init: initSavingsGoalCalculator },
    { id: 'child_education', title: 'Child Education Savings', icon: 'fa-child', desc: 'Savings planner for education.', render: renderChildEducationCalculator, init: initChildEducationCalculator },
    { id: 'vacation_savings', title: 'Vacation Savings', icon: 'fa-umbrella-beach', desc: 'Save for vacations.', render: renderVacationSavingsCalculator, init: initVacationSavingsCalculator },
    { id: 'down_payment', title: 'Down Payment Savings', icon: 'fa-house-circle-check', desc: 'Plan down payment savings.', render: renderDownPaymentSavingsCalculator, init: initDownPaymentSavingsCalculator },

    // Retirement Planning (additional)
    { id: 'pension', title: 'Pension Calculator', icon: 'fa-hand-holding', desc: 'Estimate pension income.', render: renderPensionCalculator, init: initPensionCalculator },
    { id: 'fire', title: 'FIRE Calculator', icon: 'fa-bolt', desc: 'Financial independence retire early planner.', render: renderFIRECalculator, init: initFIRECalculator },
    { id: 'ret_withdrawal', title: 'Retirement Withdrawal', icon: 'fa-wallet', desc: 'Sustainable withdrawal planner.', render: renderRetWithdrawalCalculator, init: initRetWithdrawalCalculator },
    { id: '401k', title: '401(k) Calculator', icon: 'fa-briefcase-medical', desc: '401(k) projection.', render: render401kCalculator, init: init401kCalculator },
    { id: 'ret_gap', title: 'Retirement Savings Gap', icon: 'fa-gaps', desc: 'Estimate savings shortfall.', render: renderRetirementGapCalculator, init: initRetirementGapCalculator },

    // Tax
    { id: 'income_tax', title: 'Income Tax Calculator', icon: 'fa-file-invoice-dollar', desc: 'Estimate income tax payable.', render: renderIncomeTaxCalculator, init: initIncomeTaxCalculator },
    { id: 'capital_gains', title: 'Capital Gains Tax', icon: 'fa-chart-column', desc: 'Capital gains tax estimator.', render: renderCapitalGainsCalculator, init: initCapitalGainsCalculator },
    { id: 'gst', title: 'GST Calculator', icon: 'fa-receipt', desc: 'GST calculations for invoices.', render: renderGSTCalculator, init: initGSTCalculator },
    { id: 'vat', title: 'VAT Calculator', icon: 'fa-receipt', desc: 'VAT calculations.', render: renderVATCalculator, init: initVATCalculator },
    { id: 'tax_refund', title: 'Tax Refund Calculator', icon: 'fa-undo', desc: 'Estimate tax refund.', render: renderTaxRefundCalculator, init: initTaxRefundCalculator },
    { id: 'self_employment_tax', title: 'Self-Employment Tax', icon: 'fa-user-tie', desc: 'Self-employment tax estimator.', render: renderSelfEmploymentTaxCalculator, init: initSelfEmploymentTaxCalculator },

    // Personal Finance
    { id: 'net_worth', title: 'Net Worth Calculator', icon: 'fa-wallet', desc: 'Calculate your net worth.', render: renderNetWorthCalculator, init: initNetWorthCalculator },
    { id: 'budget', title: 'Budget Calculator', icon: 'fa-clipboard-list', desc: 'Monthly budgeting tool.', render: renderBudgetCalculator, init: initBudgetCalculator },
    { id: '502020', title: '50/30/20 Budget', icon: 'fa-percent', desc: '50/30/20 budgeting guideline.', render: render50_30_20Calculator, init: init50_30_20Calculator },
    { id: 'expense_ratio', title: 'Expense Ratio', icon: 'fa-percent', desc: 'Expense ratio for funds.', render: renderExpenseRatioCalculator, init: initExpenseRatioCalculator },
    { id: 'financial_independence', title: 'Financial Independence', icon: 'fa-flag-checkered', desc: 'Plan to reach FI.', render: renderFinancialIndependenceCalculator, init: initFinancialIndependenceCalculator },
    { id: 'salary', title: 'Salary Calculator', icon: 'fa-money-bill', desc: 'Gross salary computations.', render: renderSalaryCalculator, init: initSalaryCalculator },
    { id: 'take_home', title: 'Take-Home Salary', icon: 'fa-wallet', desc: 'Net salary after deductions.', render: renderTakeHomeSalaryCalculator, init: initTakeHomeSalaryCalculator },
    { id: 'salary_hike', title: 'Salary Hike Calculator', icon: 'fa-arrow-up', desc: 'Project salary increases.', render: renderSalaryHikeCalculator, init: initSalaryHikeCalculator },

    // Insurance
    { id: 'life_insurance', title: 'Life Insurance', icon: 'fa-user-shield', desc: 'Life insurance coverage calculator.', render: renderLifeInsuranceCalculator, init: initLifeInsuranceCalculator },
    { id: 'term_insurance', title: 'Term Insurance', icon: 'fa-file-medical', desc: 'Term insurance needs.', render: renderTermInsuranceCalculator, init: initTermInsuranceCalculator },
    { id: 'health_insurance', title: 'Health Insurance', icon: 'fa-heartbeat', desc: 'Health insurance premium estimator.', render: renderHealthInsuranceCalculator, init: initHealthInsuranceCalculator },
    { id: 'insurance_premium', title: 'Insurance Premium', icon: 'fa-file-invoice', desc: 'Compare insurance premiums.', render: renderInsurancePremiumCalculator, init: initInsurancePremiumCalculator },

    // Business & Advanced Finance
    { id: 'profit_margin', title: 'Profit Margin', icon: 'fa-chart-pie', desc: 'Gross and net profit margin.', render: renderProfitMarginCalculator, init: initProfitMarginCalculator },
    { id: 'break_even', title: 'Break-Even', icon: 'fa-balance-scale', desc: 'Break-even analysis.', render: renderBreakEvenCalculator, init: initBreakEvenCalculator },
    { id: 'cash_flow', title: 'Cash Flow', icon: 'fa-water', desc: 'Cash flow statements and projections.', render: renderCashFlowCalculator, init: initCashFlowCalculator },
    { id: 'npv', title: 'NPV Calculator', icon: 'fa-calculator', desc: 'Net Present Value for projects.', render: renderNPVCalculator, init: initNPVCalculator },
    { id: 'irr', title: 'IRR Calculator', icon: 'fa-percentage', desc: 'Internal Rate of Return.', render: renderIRRCalculator, init: initIRRCalculator },
    { id: 'dcf', title: 'DCF Calculator', icon: 'fa-stream', desc: 'Discounted Cash Flow analysis.', render: renderDCFCalculator, init: initDCFCalculator },
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
                <div class="nav-search-wrapper">
                    <input id="calculator-search" class="input-control nav-search-input" type="search" placeholder="Search calculators across WEALTHSCAPE...">
                    <div id="search-empty" class="search-empty muted" style="display:none;">No calculators match your search.</div>
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
    const staticPageContent = document.querySelector('.page-content');

    document.getElementById('start-simulation-btn').addEventListener('click', () => {
        // Open the first module
        openModule('life');
    });

    const searchInput = document.getElementById('calculator-search');
    const searchEmpty = document.getElementById('search-empty');

    function filterCalculators() {
        const query = searchInput.value.trim().toLowerCase();
        let visibleCount = 0;

        document.querySelectorAll('.feature-card').forEach(card => {
            const title = card.querySelector('.feature-title').textContent.toLowerCase();
            const desc = card.querySelector('.feature-desc').textContent.toLowerCase();
            const matches = !query || title.includes(query) || desc.includes(query);
            card.style.display = matches ? 'block' : 'none';
            if (matches) visibleCount += 1;
        });

        searchEmpty.style.display = visibleCount === 0 ? 'block' : 'none';
    }

    searchInput.addEventListener('input', filterCalculators);
    filterCalculators();

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
        if (staticPageContent) {
            staticPageContent.style.display = '';
        }

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
        if (staticPageContent) {
            staticPageContent.style.display = 'none';
        }

        // Destroy any existing chart before replacing module content.
        if (window.currentChart) {
            window.currentChart.destroy();
            window.currentChart = null;
        }

        // Render HTML
        moduleContainer.innerHTML = mod.render();
        moduleContainer.insertAdjacentHTML('beforeend', renderCalculatorInfo(moduleId));
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
