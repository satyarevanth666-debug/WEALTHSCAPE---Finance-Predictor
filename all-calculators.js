// all-calculators.js
// Combined calculators from additionalCalculators.js and calculators-suite.js

// --- From additionalCalculators.js (EMI, Retirement, Tax, Emergency, Investment Return) ---

const calculatorDetails = {
    mutual_fund_returns: {
        title: 'Mutual Fund Returns',
        description: 'Estimate how a mutual fund investment grows over time by compounding returns each year.',
        formula: 'Future Value = Invested Amount × (1 + Annual Return)^Years',
        explanation: `This calculator assumes that the expected annual return is reinvested in the fund each year. The value grows by the same percentage every year, so the final corpus is the invested amount multiplied by the compound factor. Use this formula to plan long-term mutual fund goals and compare expected portfolios.`,
        example: `If you invest ₹100,000 and expect 12% annual return for 10 years, the corpus becomes ₹100,000 × (1.12)^10 = ₹310,584. Your gain is ₹210,584 on the original investment.`,
        faq: [`What happens if returns change year to year? This calculator uses a fixed expected return, so for variable returns use a more detailed SIP or historical return model.`, `Can I use this for equity mutual funds? Yes; equities are typically modeled with expected annual return assumptions, though actual returns can be higher or lower.`, `Is the gain after tax? No; the output is pre-tax. Adjust for capital gains tax if you plan holdings under 1 year or 3 years for equity.`, `Does this include fees? No; it does not include management fees or expense ratio, so use a slightly lower return assumption if you want a conservative estimate.`],
        useCases: `Use this to forecast retirement savings, long-term corpus targets, or compare two mutual funds with different expected annual return rates. It helps when you want quick visibility into how a fund performs over a decade based on assumed growth.`
    },
    swp: {
        title: 'SWP Calculator',
        description: 'Calculate how much you can withdraw each year or month from a portfolio while keeping the capital intact based on an expected return.',
        formula: 'Annual Withdrawal = Portfolio Value × Expected Return',
        explanation: `This calculator assumes a constant return on the portfolio and that you withdraw only the expected return portion. If the portfolio returns the forecasted percentage each year, the original capital stays invested. Use this for safe withdrawal planning from a retirement corpus or dividend-style income.`,
        example: `A corpus of ₹50,00,000 earning 8% per year yields a withdrawal amount of ₹4,00,000 annually or roughly ₹33,333 per month.`,
        faq: [`Is this a safe withdrawal rate? It assumes the portfolio returns at least the expected rate. Use conservative estimates and update the return if you want a margin of safety.`, `Does it include inflation? No; inflation is not included. To maintain purchasing power, add inflation above the expected return or increase the corpus.`, `What if I withdraw more than the annual return? The capital can shrink, so only withdraw the expected return if you want to preserve principal.`, `Can I use this for retirement income? Yes, as an estimate for income from a base portfolio, assuming returns stay stable.`],
        useCases: `Ideal for investors planning annual income from a large corpus, retired individuals using the portfolio to fund living expenses, or advisors estimating a withdrawal budget without selling capital.`
    },
    xirr: {
        title: 'XIRR Calculator',
        description: 'Estimate the annualized return for a series of uneven cashflows spread over multiple years.',
        formula: 'Find rate r such that NPV = Σ(Cashflow_t / (1 + r)^t) = 0',
        explanation: `XIRR solves for the internal rate of return when investments and withdrawals happen at different times. Instead of using equal periods, it computes the single annual rate that makes the present value of all cashflows zero. Use this for real-world projects, equity investments, and portfolios with multiple cash injections or redemptions.`,
        example: `If you invest ₹100,000 today and receive ₹20,000, ₹25,000, ₹30,000 and ₹35,000 over the next four years, XIRR finds the effective return that equates the series of cashflows. In this case, it is roughly 9.76%.`,
        faq: [`What is the difference between IRR and XIRR? IRR assumes equal periods; XIRR handles irregular cashflows and varying dates.`, `Does this require dates? In this tool, we assume one-year intervals for simplicity, but a full XIRR model would use exact dates.`, `What if cashflows are all negative? XIRR cannot be computed meaningfully unless you have at least one positive and one negative cashflow.`, `Can XIRR be greater than simple average? Yes, because it accounts for timing and compounding of cashflows.`],
        useCases: `Finance professionals use XIRR for portfolio performance measurement, private equity, project evaluation, and any investment where cashflows are not uniform.`
    },
    dividend_yield: {
        title: 'Dividend Yield Calculator',
        description: 'Calculate the income yield generated by a stock relative to its market price.',
        formula: 'Dividend Yield (%) = (Dividend Per Share / Share Price) × 100',
        explanation: `Dividend yield helps investors compare income performance between dividend-paying stocks and fixed-income investments. It shows the percentage of the current share price returned to shareholders through dividends each year. Use it to screen stocks for income generation or benchmark against bank deposits.`,
        example: `If a company pays ₹12.50 per share annually and the share trades at ₹250, the dividend yield is 5%.`,
        faq: [`Does a high yield mean a good investment? Not always. A very high yield can signal risk or a falling share price.`, `Does this account for dividend frequency? This calculator assumes the annual dividend total per share. For quarterly dividends, sum the four payouts.`, `Can dividend yield change? Yes, it changes when the share price moves or when the company changes its dividend.`, `Is dividend yield the same as return? No, it only measures income, not capital gains or total return.`],
        useCases: `Best for income-focused investors comparing dividend-paying equities, retirees seeking cash flow, and anyone evaluating whether dividends justify the current stock price.`
    },
    stock_avg: {
        title: 'Stock Average Calculator',
        description: 'Determine the average cost per share for multiple stock purchases at different prices.',
        formula: 'Average Cost = Total Cost / Total Shares',
        explanation: `This calculator helps you recompute your average purchase price after buying a stock in different lots. It is essential for tracking break-even levels and managing positions during market volatility.`,
        example: `Buying 100 shares at ₹150 and another 50 shares at ₹180 gives a total cost of ₹25,500. The weighted average cost is ₹170 per share.`,
        faq: [`What if I buy more than two lots? Add the additional quantities and costs to the totals, then divide.`, `Does it include brokerage? No; add brokerage to each lot cost if you want the true invested amount.`, `Should I average down? Averaging down only lowers average cost, but it does not guarantee profit. Use it with risk management.`, `Is this the same as portfolio return? No, this is a cost basis measure only.`],
        useCases: `Useful for tracking stock positions across multiple purchases, calculating break-even price, and comparing purchase strategies.`
    },
    risk_reward: {
        title: 'Risk-Reward Ratio Calculator',
        description: 'Measure the relative reward compared to risk for a trade or investment entry point.',
        formula: 'Reward/Risk = (Target Price - Entry Price) / (Entry Price - Stop Loss)',
        explanation: `This ratio shows how much upside you are chasing for every rupee you risk. A higher ratio means the potential profit is larger relative to the loss, which is a key factor in disciplined trading and portfolio risk management.`,
        example: `If you enter at ₹100, target ₹130 and place stop loss at ₹90, the reward is ₹30 and the risk is ₹10. The ratio is 3.0, meaning you seek three times the reward for each unit of risk.`,
        faq: [`Should every trade have a high ratio? A ratio above 2:1 is often preferred, but success also depends on win rate and position sizing.`, `Does this guarantee profit? No, it only defines risk tolerance and reward potential.`, `What if stop loss is above entry? Then the calculation is invalid because the position would not be a long trade.`, `Can this be used for both long and short trades? Yes, apply the formula to the appropriate target and stop levels for each direction.`],
        useCases: `Traders use this to screen trade setups, choose better entries, and combine risk-reward with win probability to build robust strategies.`
    },
    sharpe: {
        title: 'Sharpe Ratio Calculator',
        description: 'Assess risk-adjusted return by comparing excess return to volatility.',
        formula: 'Sharpe Ratio = (Portfolio Return - Risk-free Rate) / Volatility',
        explanation: `The Sharpe ratio shows how much return you earn for each unit of risk taken. It is useful for comparing investment options with different return profiles and volatilities. A higher ratio indicates more efficient return per unit of risk.`,
        example: `A portfolio returning 12% with 4% risk-free rate and 15% volatility yields a Sharpe ratio of (12 - 4) / 15 = 0.53.`,
        faq: [`What is a good Sharpe ratio? Generally, above 1.0 is considered good, while below 0 may indicate poor risk-adjusted performance.`, `Does it work for negative returns? Yes, but the interpretation changes: a negative Sharpe means poor risk-adjusted compensation.`, `Is volatility always measured annually? Yes, standard Sharpe uses annualized volatility.`, `Can Sharpe compare different asset classes? It can, but only if returns and volatility are measured consistently.`],
        useCases: `Ideal for evaluating mutual funds, portfolios, and strategies, or comparing the risk-adjusted performance of different investment choices.`
    },
    fd: {
        title: 'Fixed Deposit Calculator',
        description: 'Compute the maturity amount of a fixed deposit using compound interest.',
        formula: 'Maturity Value = Principal × (1 + Rate)^Years',
        explanation: `Fixed deposits grow at a fixed annual interest rate. This calculator compounds the interest each year and gives the amount you receive at maturity. Use it to plan savings for fixed-income goals and compare bank offer rates.`,
        example: `A ₹2,00,000 deposit at 7% compound interest for 5 years gives ₹2,80,710 at maturity.`,
        faq: [`Is this based on annual compounding? Yes; if the bank compounds quarterly or monthly, the actual value may differ slightly.`, `Does it include taxes? No; this is pre-tax. Deduct tax on interest earned if applicable.`, `Can I withdraw before maturity? Early withdrawal may reduce interest or invoke penalties.`, `Does the rate remain the same? Most FDs have a fixed rate, but interest may vary if you choose a fluctuating scheme.`],
        useCases: `Use this for planning safe savings goals, comparing FD tenures, and estimating the corpus needed for short- to medium-term objectives.`
    }
};

function renderCalculatorInfo(calculatorId) {
    const details = calculatorDetails[calculatorId];
    if (!details) {
        return `<div class="glass-card calculator-details-card">
            <h3 class="mb-2">Calculator Notes</h3>
            <p class="muted">Detailed content for this calculator is coming soon.</p>
        </div>`;
    }
    return `
    <div class="glass-card calculator-details-card">
        <h3 class="mb-3">What this calculator does</h3>
        <p>${details.description}</p>

        <h3 class="mb-3">Formula used</h3>
        <p><code>${details.formula}</code></p>

        <h3 class="mb-3">Step-by-step explanation</h3>
        <p>${details.explanation}</p>

        <h3 class="mb-3">Worked example</h3>
        <p>${details.example}</p>

        <h3 class="mb-3">Frequently Asked Questions</h3>
        <ul class="faq-list">
            ${details.faq.map(item => `<li>${item}</li>`).join('')}
        </ul>

        <h3 class="mb-3">Use cases</h3>
        <p>${details.useCases}</p>
    </div>
    `;
}

function renderEmiCalculator() {
    return `
        <div class="glass-card">
            <h2 class="mb-3">EMI & Loan Calculator</h2>
            <div class="simulator-grid">
                <div class="col-form">
                    <div class="input-group">
                        <label for="emi-principal">Loan Amount (₹)</label>
                        <input type="number" id="emi-principal" class="input-control" value="2500000" step="50000">
                    </div>
                    <div class="input-group">
                        <label for="emi-rate">Interest Rate: <span id="emi-rate-val">8.5</span>%</label>
                        <input type="range" id="emi-rate" min="5" max="18" value="8.5" step="0.1">
                    </div>
                    <div class="input-group">
                        <label for="emi-tenure">Tenure: <span id="emi-tenure-val">20</span> years</label>
                        <input type="range" id="emi-tenure" min="1" max="30" value="20">
                    </div>
                </div>
                <div class="col-results">
                    <div class="result-box">
                        <div class="result-label">Monthly EMI</div>
                        <div class="result-value" id="emi-monthly">₹0</div>
                    </div>
                    <div class="result-box">
                        <div class="result-label">Total Interest</div>
                        <div class="result-value" id="emi-total-interest">₹0</div>
                    </div>
                    <div class="result-box">
                        <div class="result-label">Total Payment</div>
                        <div class="result-value" id="emi-total-payment">₹0</div>
                    </div>
                </div>
                <div class="chart-col">
                    <div class="chart-container">
                        <canvas id="emiChart"></canvas>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function initEmiCalculator() {
    const principalEl = document.getElementById('emi-principal');
    const rateEl = document.getElementById('emi-rate');
    const tenureEl = document.getElementById('emi-tenure');
    const rateVal = document.getElementById('emi-rate-val');
    const tenureVal = document.getElementById('emi-tenure-val');
    const emiMonthlyEl = document.getElementById('emi-monthly');
    const emiTotalInterestEl = document.getElementById('emi-total-interest');
    const emiTotalPaymentEl = document.getElementById('emi-total-payment');

    const ctx = document.getElementById('emiChart').getContext('2d');
    if (window.currentChart) window.currentChart.destroy();

    window.currentChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Principal', 'Interest'],
            datasets: [{
                data: [0, 0],
                backgroundColor: ['rgba(139, 92, 246, 0.8)', 'rgba(16, 185, 129, 0.8)']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { labels: { color: '#F8FAFC' } },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + formatCurrency(context.raw);
                        }
                    }
                }
            }
        }
    });

    function calculate() {
        const principal = parseFloat(principalEl.value) || 0;
        const annualRate = parseFloat(rateEl.value) / 100;
        const tenureYears = parseInt(tenureEl.value);
        const monthlyRate = annualRate / 12;
        const months = tenureYears * 12;

        rateVal.textContent = rateEl.value;
        tenureVal.textContent = tenureYears;

        let emi = 0;
        if (monthlyRate > 0) {
            emi = principal * monthlyRate * Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1);
        } else {
            emi = principal / months;
        }

        const totalPayment = emi * months;
        const totalInterest = totalPayment - principal;

        emiMonthlyEl.textContent = formatCurrency(Math.round(emi));
        emiTotalInterestEl.textContent = formatCurrency(Math.round(totalInterest));
        emiTotalPaymentEl.textContent = formatCurrency(Math.round(totalPayment));

        window.currentChart.data.datasets[0].data = [principal, totalInterest];
        window.currentChart.update();
    }

    [principalEl, rateEl, tenureEl].forEach(el => el.addEventListener('input', calculate));
    calculate();
}

function renderRetirementCalculator() {
    return `
        <div class="glass-card">
            <h2 class="mb-3">Retirement Corpus Calculator</h2>
            <div class="simulator-grid">
                <div class="col-form">
                    <div class="input-group">
                        <label for="ret-current-age">Current Age</label>
                        <input type="number" id="ret-current-age" class="input-control" value="30" min="18">
                    </div>
                    <div class="input-group">
                        <label for="ret-retirement-age">Retirement Age</label>
                        <input type="number" id="ret-retirement-age" class="input-control" value="60" min="30">
                    </div>
                    <div class="input-group">
                        <label for="ret-monthly-expense">Current Monthly Expenses (₹)</label>
                        <input type="number" id="ret-monthly-expense" class="input-control" value="50000" step="1000">
                    </div>
                    <div class="input-group">
                        <label for="ret-inflation">Expected Inflation: <span id="ret-inflation-val">6</span>%</label>
                        <input type="range" id="ret-inflation" min="2" max="10" value="6" step="0.5">
                    </div>
                    <div class="input-group">
                        <label for="ret-return">Expected Return: <span id="ret-return-val">10</span>%</label>
                        <input type="range" id="ret-return" min="4" max="15" value="10" step="0.5">
                    </div>
                </div>
                <div class="col-results">
                    <div class="result-box">
                        <div class="result-label">Required Retirement Corpus</div>
                        <div class="result-value" id="ret-corpus">₹0</div>
                    </div>
                    <div class="result-box">
                        <div class="result-label">Monthly Savings Needed</div>
                        <div class="result-value" id="ret-monthly-savings">₹0</div>
                    </div>
                </div>
                <div class="chart-col">
                    <div class="chart-container">
                        <canvas id="retChart"></canvas>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function initRetirementCalculator() {
    const ageEl = document.getElementById('ret-current-age');
    const retireEl = document.getElementById('ret-retirement-age');
    const expenseEl = document.getElementById('ret-monthly-expense');
    const inflationEl = document.getElementById('ret-inflation');
    const returnEl = document.getElementById('ret-return');

    const inflationVal = document.getElementById('ret-inflation-val');
    const returnVal = document.getElementById('ret-return-val');
    const corpusEl = document.getElementById('ret-corpus');
    const savingEl = document.getElementById('ret-monthly-savings');

    const ctx = document.getElementById('retChart').getContext('2d');
    if (window.currentChart) window.currentChart.destroy();

    window.currentChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Required Corpus', 'Monthly Savings'],
            datasets: [{
                label: 'Retirement Plan',
                data: [0, 0],
                backgroundColor: ['rgba(139, 92, 246, 0.8)', 'rgba(16, 185, 129, 0.8)']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return formatCurrency(context.raw);
                        }
                    }
                }
            },
            scales: {
                y: { ticks: { color: '#94A3B8', callback: value => '₹' + (value / 100000).toFixed(1) + 'L' } },
                x: { ticks: { color: '#94A3B8' } }
            }
        }
    });

    function calculate() {
        const age = parseInt(ageEl.value);
        const retireAge = parseInt(retireEl.value);
        const monthlyExpense = parseFloat(expenseEl.value) || 0;
        const inflation = parseFloat(inflationEl.value) / 100;
        const retReturn = parseFloat(returnEl.value) / 100;

        inflationVal.textContent = inflationEl.value;
        returnVal.textContent = returnEl.value;

        const yearsToRetire = Math.max(0, retireAge - age);
        const expenseAtRetirement = monthlyExpense * Math.pow(1 + inflation, yearsToRetire);
        const annualExpenseAfterRetire = expenseAtRetirement * 12;
        const desiredCorpus = annualExpenseAfterRetire / (retReturn - inflation);

        let monthlySavings = 0;
        if (yearsToRetire > 0) {
            const n = yearsToRetire * 12;
            const r = retReturn / 12;
            monthlySavings = (desiredCorpus * r) / (Math.pow(1 + r, n) - 1);
        }

        corpusEl.textContent = formatCurrency(Math.round(desiredCorpus));
        savingEl.textContent = formatCurrency(Math.round(monthlySavings));
        window.currentChart.data.datasets[0].data = [desiredCorpus, monthlySavings * 12];
        window.currentChart.update();
    }

    [ageEl, retireEl, expenseEl, inflationEl, returnEl].forEach(el => el.addEventListener('input', calculate));
    calculate();
}

function renderTaxSavingsCalculator() {
    return `
        <div class="glass-card">
            <h2 class="mb-3">Tax Savings Calculator</h2>
            <div class="simulator-grid">
                <div class="col-form">
                    <div class="input-group">
                        <label for="tax-income">Annual Income (₹)</label>
                        <input type="number" id="tax-income" class="input-control" value="1200000" step="50000">
                    </div>
                    <div class="input-group">
                        <label for="tax-80c">80C Investment (₹)</label>
                        <input type="number" id="tax-80c" class="input-control" value="150000" step="5000">
                    </div>
                    <div class="input-group">
                        <label for="tax-hra">HRA Exemption (₹)</label>
                        <input type="number" id="tax-hra" class="input-control" value="200000" step="5000">
                    </div>
                </div>
                <div class="col-results">
                    <div class="result-box">
                        <div class="result-label">Taxable Income</div>
                        <div class="result-value" id="tax-taxable">₹0</div>
                    </div>
                    <div class="result-box">
                        <div class="result-label">Estimated Tax</div>
                        <div class="result-value" id="tax-estimated">₹0</div>
                    </div>
                </div>
                <div class="chart-col">
                    <div class="chart-container">
                        <canvas id="taxChart"></canvas>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function initTaxSavingsCalculator() {
    const incomeEl = document.getElementById('tax-income');
    const c80cEl = document.getElementById('tax-80c');
    const hraEl = document.getElementById('tax-hra');
    const taxableEl = document.getElementById('tax-taxable');
    const estimatedEl = document.getElementById('tax-estimated');
    const ctx = document.getElementById('taxChart').getContext('2d');

    if (window.currentChart) window.currentChart.destroy();

    window.currentChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Gross Income', 'Taxable Income'],
            datasets: [{
                label: 'Income',
                data: [0, 0],
                backgroundColor: ['rgba(139, 92, 246, 0.8)', 'rgba(16, 185, 129, 0.8)']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false }, tooltip: { callbacks: { label: ctx => formatCurrency(ctx.raw) } } },
            scales: { y: { ticks: { color: '#94A3B8' } }, x: { ticks: { color: '#94A3B8' } } }
        }
    });

    function calculate() {
        const income = parseFloat(incomeEl.value) || 0;
        const c80c = Math.min(parseFloat(c80cEl.value) || 0, 150000);
        const hra = parseFloat(hraEl.value) || 0;
        const taxable = Math.max(0, income - c80c - hra - 50000);

        taxableEl.textContent = formatCurrency(taxable);
        const tax = computeTax(taxable);
        estimatedEl.textContent = formatCurrency(tax);

        window.currentChart.data.datasets[0].data = [income, taxable];
        window.currentChart.update();
    }

    function computeTax(amount) {
        let remaining = amount;
        let tax = 0;

        const brackets = [
            { cap: 250000, rate: 0 },
            { cap: 500000, rate: 0.05 },
            { cap: 750000, rate: 0.1 },
            { cap: 1000000, rate: 0.15 },
            { cap: 1250000, rate: 0.2 },
            { cap: 1500000, rate: 0.25 },
            { cap: Infinity, rate: 0.30 }
        ];

        let lastCap = 0;
        for (const bracket of brackets) {
            const slab = Math.min(remaining, bracket.cap - lastCap);
            if (slab <= 0) break;
            tax += slab * bracket.rate;
            remaining -= slab;
            lastCap = bracket.cap;
        }
        return tax;
    }

    [incomeEl, c80cEl, hraEl].forEach(el => el.addEventListener('input', calculate));
    calculate();
}

function renderEmergencyFundCalculator() {
    return `
        <div class="glass-card">
            <h2 class="mb-3">Emergency Fund Planner</h2>
            <div class="simulator-grid">
                <div class="col-form">
                    <div class="input-group">
                        <label for="emergency-monthly-expense">Monthly Expense (₹)</label>
                        <input type="number" id="emergency-monthly-expense" class="input-control" value="60000" step="1000">
                    </div>
                    <div class="input-group">
                        <label for="emergency-months">Coverage Months: <span id="emergency-months-val">6</span></label>
                        <input type="range" id="emergency-months" min="3" max="12" value="6">
                    </div>
                </div>
                <div class="col-results">
                    <div class="result-box">
                        <div class="result-label">Recommended Emergency Fund</div>
                        <div class="result-value" id="emergency-total">₹0</div>
                    </div>
                </div>
                <div class="chart-col">
                    <div class="chart-container">
                        <canvas id="emergencyChart"></canvas>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function initEmergencyFundCalculator() {
    const expenseEl = document.getElementById('emergency-monthly-expense');
    const monthsEl = document.getElementById('emergency-months');
    const monthsVal = document.getElementById('emergency-months-val');
    const totalEl = document.getElementById('emergency-total');

    const ctx = document.getElementById('emergencyChart').getContext('2d');
    if (window.currentChart) window.currentChart.destroy();

    window.currentChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Required Fund'],
            datasets: [{
                label: 'Emergency Fund',
                data: [0],
                backgroundColor: ['rgba(16, 185, 129, 0.8)']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false }, tooltip: { callbacks: { label: ctx => formatCurrency(ctx.raw) } } },
            scales: { y: { ticks: { color: '#94A3B8' } }, x: { ticks: { color: '#94A3B8' } } }
        }
    });

    function calculate() {
        const expense = parseFloat(expenseEl.value) || 0;
        const months = parseInt(monthsEl.value);
        monthsVal.textContent = months;

        const total = expense * months;
        totalEl.textContent = formatCurrency(total);

        window.currentChart.data.datasets[0].data = [total];
        window.currentChart.update();
    }

    [expenseEl, monthsEl].forEach(el => el.addEventListener('input', calculate));
    calculate();
}

function renderInvestmentReturnCalculator() {
    return `
        <div class="glass-card">
            <h2 class="mb-3">Investment Return Calculator</h2>
            <div class="simulator-grid">
                <div class="col-form">
                    <div class="input-group">
                        <label for="inv-principal">Investment Amount (₹)</label>
                        <input type="number" id="inv-principal" class="input-control" value="200000" step="10000">
                    </div>
                    <div class="input-group">
                        <label for="inv-return">Expected Annual Return: <span id="inv-return-val">12</span>%</label>
                        <input type="range" id="inv-return" min="1" max="25" value="12" step="0.5">
                    </div>
                    <div class="input-group">
                        <label for="inv-years">Years Invested: <span id="inv-years-val">15</span></label>
                        <input type="range" id="inv-years" min="1" max="40" value="15">
                    </div>
                </div>
                <div class="col-results">
                    <div class="result-box">
                        <div class="result-label">Final Value</div>
                        <div class="result-value" id="inv-final-value">₹0</div>
                    </div>
                    <div class="result-box">
                        <div class="result-label">Total Gain</div>
                        <div class="result-value" id="inv-total-gain">₹0</div>
                    </div>
                </div>
                <div class="chart-col">
                    <div class="chart-container">
                        <canvas id="invChart"></canvas>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function initInvestmentReturnCalculator() {
    const principalEl = document.getElementById('inv-principal');
    const returnEl = document.getElementById('inv-return');
    const yearsEl = document.getElementById('inv-years');
    const returnVal = document.getElementById('inv-return-val');
    const yearsVal = document.getElementById('inv-years-val');
    const finalValueEl = document.getElementById('inv-final-value');
    const gainEl = document.getElementById('inv-total-gain');

    const ctx = document.getElementById('invChart').getContext('2d');
    if (window.currentChart) window.currentChart.destroy();

    window.currentChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Portfolio Value',
                data: [],
                borderColor: '#10B981',
                backgroundColor: 'rgba(16, 185, 129, 0.2)',
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { labels: { color: '#F8FAFC' } }, tooltip: { callbacks: { label: ctx => formatCurrency(ctx.raw) } } },
            scales: { x: { ticks: { color: '#94A3B8' } }, y: { ticks: { color: '#94A3B8' } } }
        }
    });

    function calculate() {
        const principal = parseFloat(principalEl.value) || 0;
        const annualReturn = parseFloat(returnEl.value) / 100;
        const years = parseInt(yearsEl.value);

        returnVal.textContent = returnEl.value;
        yearsVal.textContent = years;

        const labels = [];
        const values = [];
        for (let i = 0; i <= years; i++) {
            const value = principal * Math.pow(1 + annualReturn, i);
            labels.push('Year ' + i);
            values.push(value);
        }

        const finalValue = values[values.length - 1];
        finalValueEl.textContent = formatCurrency(finalValue);
        gainEl.textContent = formatCurrency(finalValue - principal);

        window.currentChart.data.labels = labels;
        window.currentChart.data.datasets[0].data = values;
        window.currentChart.update();
    }

    [principalEl, returnEl, yearsEl].forEach(el => el.addEventListener('input', calculate));
    calculate();
}

// --- From calculators-suite.js (SIP, Lumpsum, Compound, CAGR, ROI, FV/PV, Inflation) ---

function renderSipCalculator() {
    return `
    <div class="glass-card">
        <h2 class="mb-3">SIP Calculator</h2>
        <div class="simulator-grid">
            <div class="col-form">
                <div class="input-group">
                    <label for="sip-amount">Monthly SIP (₹)</label>
                    <input type="number" id="sip-amount" class="input-control" value="10000">
                </div>
                <div class="input-group">
                    <label for="sip-rate">Expected Annual Return: <span id="sip-rate-val">12</span>%</label>
                    <input type="range" id="sip-rate" min="1" max="30" value="12" step="0.1">
                </div>
                <div class="input-group">
                    <label for="sip-years">Years</label>
                    <input type="number" id="sip-years" class="input-control" value="10">
                </div>
            </div>
            <div class="col-results">
                <div class="result-box">
                    <div class="result-label">Estimated Corpus</div>
                    <div class="result-value" id="sip-corpus">₹0</div>
                </div>
                <div class="result-box">
                    <div class="result-label">Total Invested</div>
                    <div class="result-value" id="sip-invested">₹0</div>
                </div>
                <div class="result-box">
                    <div class="result-label">Total Gain</div>
                    <div class="result-value" id="sip-gain">₹0</div>
                </div>
            </div>
        </div>
    </div>
    `;
}

function initSipCalculator() {
    const amountEl = document.getElementById('sip-amount');
    const rateEl = document.getElementById('sip-rate');
    const yearsEl = document.getElementById('sip-years');
    const rateVal = document.getElementById('sip-rate-val');
    const corpusEl = document.getElementById('sip-corpus');
    const investedEl = document.getElementById('sip-invested');
    const gainEl = document.getElementById('sip-gain');

    function calculate() {
        const p = parseFloat(amountEl.value) || 0;
        const annual = parseFloat(rateEl.value) / 100;
        const years = parseFloat(yearsEl.value) || 0;
        rateVal.textContent = rateEl.value;

        const r = annual / 12;
        const n = years * 12;
        let fv = 0;
        if (r === 0) fv = p * n;
        else fv = p * (Math.pow(1 + r, n) - 1) / r; // end of period

        const invested = p * n;
        const gain = fv - invested;

        corpusEl.textContent = formatCurrency(Math.round(fv));
        investedEl.textContent = formatCurrency(Math.round(invested));
        gainEl.textContent = formatCurrency(Math.round(gain));
    }

    [amountEl, rateEl, yearsEl].forEach(el => el.addEventListener('input', calculate));
    calculate();
}

function renderLumpsumCalculator() {
    return `
    <div class="glass-card">
        <h2 class="mb-3">Lumpsum Investment Calculator</h2>
        <div class="simulator-grid">
            <div class="col-form">
                <div class="input-group">
                    <label for="ls-principal">Principal (₹)</label>
                    <input type="number" id="ls-principal" class="input-control" value="1000000">
                </div>
                <div class="input-group">
                    <label for="ls-rate">Annual Return: <span id="ls-rate-val">10</span>%</label>
                    <input type="range" id="ls-rate" min="0" max="30" value="10" step="0.1">
                </div>
                <div class="input-group">
                    <label for="ls-years">Years</label>
                    <input type="number" id="ls-years" class="input-control" value="10">
                </div>
            </div>
            <div class="col-results">
                <div class="result-box">
                    <div class="result-label">Future Value</div>
                    <div class="result-value" id="ls-fv">₹0</div>
                </div>
                <div class="result-box">
                    <div class="result-label">Total Gain</div>
                    <div class="result-value" id="ls-gain">₹0</div>
                </div>
            </div>
        </div>
    </div>
    `;
}

function initLumpsumCalculator() {
    const principalEl = document.getElementById('ls-principal');
    const rateEl = document.getElementById('ls-rate');
    const yearsEl = document.getElementById('ls-years');
    const rateVal = document.getElementById('ls-rate-val');
    const fvEl = document.getElementById('ls-fv');
    const gainEl = document.getElementById('ls-gain');

    function calculate() {
        const p = parseFloat(principalEl.value) || 0;
        const annual = parseFloat(rateEl.value) / 100;
        const years = parseFloat(yearsEl.value) || 0;
        rateVal.textContent = rateEl.value;

        const fv = p * Math.pow(1 + annual, years);
        fvEl.textContent = formatCurrency(Math.round(fv));
        gainEl.textContent = formatCurrency(Math.round(fv - p));
    }

    [principalEl, rateEl, yearsEl].forEach(el => el.addEventListener('input', calculate));
    calculate();
}

function renderCompoundInterestCalculator() {
    return `
    <div class="glass-card">
        <h2 class="mb-3">Compound Interest Calculator</h2>
        <div class="simulator-grid">
            <div class="col-form">
                <div class="input-group">
                    <label for="ci-principal">Principal (₹)</label>
                    <input type="number" id="ci-principal" class="input-control" value="500000">
                </div>
                <div class="input-group">
                    <label for="ci-rate">Annual Rate: <span id="ci-rate-val">8</span>%</label>
                    <input type="range" id="ci-rate" min="0" max="25" value="8" step="0.1">
                </div>
                <div class="input-group">
                    <label for="ci-times">Compounds per Year</label>
                    <input type="number" id="ci-times" class="input-control" value="4">
                </div>
                <div class="input-group">
                    <label for="ci-years">Years</label>
                    <input type="number" id="ci-years" class="input-control" value="10">
                </div>
            </div>
            <div class="col-results">
                <div class="result-box">
                    <div class="result-label">Future Value</div>
                    <div class="result-value" id="ci-fv">₹0</div>
                </div>
            </div>
        </div>
    </div>
    `;
}

function initCompoundInterestCalculator() {
    const pEl = document.getElementById('ci-principal');
    const rateEl = document.getElementById('ci-rate');
    const timesEl = document.getElementById('ci-times');
    const yearsEl = document.getElementById('ci-years');
    const rateVal = document.getElementById('ci-rate-val');
    const fvEl = document.getElementById('ci-fv');

    function calculate() {
        const p = parseFloat(pEl.value) || 0;
        const r = parseFloat(rateEl.value) / 100;
        const m = parseInt(timesEl.value) || 1;
        const t = parseFloat(yearsEl.value) || 0;
        rateVal.textContent = rateEl.value;

        const fv = p * Math.pow(1 + r / m, m * t);
        fvEl.textContent = formatCurrency(Math.round(fv));
    }

    [pEl, rateEl, timesEl, yearsEl].forEach(el => el.addEventListener('input', calculate));
    calculate();
}

function renderCagrCalculator() {
    return `
    <div class="glass-card">
        <h2 class="mb-3">CAGR Calculator</h2>
        <div class="simulator-grid">
            <div class="col-form">
                <div class="input-group">
                    <label for="cagr-begin">Beginning Value (₹)</label>
                    <input type="number" id="cagr-begin" class="input-control" value="100000">
                </div>
                <div class="input-group">
                    <label for="cagr-end">Ending Value (₹)</label>
                    <input type="number" id="cagr-end" class="input-control" value="200000">
                </div>
                <div class="input-group">
                    <label for="cagr-years">Years</label>
                    <input type="number" id="cagr-years" class="input-control" value="5">
                </div>
            </div>
            <div class="col-results">
                <div class="result-box">
                    <div class="result-label">CAGR</div>
                    <div class="result-value" id="cagr-val">0%</div>
                </div>
            </div>
        </div>
    </div>
    `;
}

function initCagrCalculator() {
    const beginEl = document.getElementById('cagr-begin');
    const endEl = document.getElementById('cagr-end');
    const yearsEl = document.getElementById('cagr-years');
    const outEl = document.getElementById('cagr-val');

    function calculate() {
        const b = parseFloat(beginEl.value) || 0;
        const e = parseFloat(endEl.value) || 0;
        const y = parseFloat(yearsEl.value) || 0;
        let cagr = 0;
        if (b > 0 && y > 0) cagr = Math.pow(e / b, 1 / y) - 1;
        outEl.textContent = (cagr * 100).toFixed(2) + '%';
    }

    [beginEl, endEl, yearsEl].forEach(el => el.addEventListener('input', calculate));
    calculate();
}

function renderRoiCalculator() {
    return `
    <div class="glass-card">
        <h2 class="mb-3">ROI Calculator</h2>
        <div class="simulator-grid">
            <div class="col-form">
                <div class="input-group">
                    <label for="roi-initial">Initial Investment (₹)</label>
                    <input type="number" id="roi-initial" class="input-control" value="100000">
                </div>
                <div class="input-group">
                    <label for="roi-final">Final Value (₹)</label>
                    <input type="number" id="roi-final" class="input-control" value="150000">
                </div>
            </div>
            <div class="col-results">
                <div class="result-box">
                    <div class="result-label">ROI</div>
                    <div class="result-value" id="roi-val">0%</div>
                </div>
            </div>
        </div>
    </div>
    `;
}

function initRoiCalculator() {
    const initEl = document.getElementById('roi-initial');
    const finalEl = document.getElementById('roi-final');
    const outEl = document.getElementById('roi-val');

    function calculate() {
        const a = parseFloat(initEl.value) || 0;
        const b = parseFloat(finalEl.value) || 0;
        let roi = 0;
        if (a > 0) roi = (b - a) / a;
        outEl.textContent = (roi * 100).toFixed(2) + '%';
    }

    [initEl, finalEl].forEach(el => el.addEventListener('input', calculate));
    calculate();
}

function renderFvPvCalculator() {
    return `
    <div class="glass-card">
        <h2 class="mb-3">Future & Present Value Calculator</h2>
        <div class="simulator-grid">
            <div class="col-form">
                <div class="input-group">
                    <label for="fvpv-pv">Present Value (₹)</label>
                    <input type="number" id="fvpv-pv" class="input-control" value="100000">
                </div>
                <div class="input-group">
                    <label for="fvpv-rate">Annual Rate: <span id="fvpv-rate-val">8</span>%</label>
                    <input type="range" id="fvpv-rate" min="0" max="30" value="8" step="0.1">
                </div>
                <div class="input-group">
                    <label for="fvpv-years">Years</label>
                    <input type="number" id="fvpv-years" class="input-control" value="5">
                </div>
            </div>
            <div class="col-results">
                <div class="result-box">
                    <div class="result-label">Future Value</div>
                    <div class="result-value" id="fvpv-fv">₹0</div>
                </div>
                <div class="result-box">
                    <div class="result-label">Present Value (from FV)</div>
                    <div class="result-value" id="fvpv-pv-out">₹0</div>
                </div>
            </div>
        </div>
    </div>
    `;
}

function initFvPvCalculator() {
    const pvEl = document.getElementById('fvpv-pv');
    const rateEl = document.getElementById('fvpv-rate');
    const yearsEl = document.getElementById('fvpv-years');
    const rateVal = document.getElementById('fvpv-rate-val');
    const fvEl = document.getElementById('fvpv-fv');
    const pvOutEl = document.getElementById('fvpv-pv-out');

    function calculate() {
        const pv = parseFloat(pvEl.value) || 0;
        const r = parseFloat(rateEl.value) / 100;
        const t = parseFloat(yearsEl.value) || 0;
        rateVal.textContent = rateEl.value;

        const fv = pv * Math.pow(1 + r, t);
        const pvFromFv = fv / Math.pow(1 + r, t);

        fvEl.textContent = formatCurrency(Math.round(fv));
        pvOutEl.textContent = formatCurrency(Math.round(pvFromFv));
    }

    [pvEl, rateEl, yearsEl].forEach(el => el.addEventListener('input', calculate));
    calculate();
}

function renderInflationCalculator() {
    return `
    <div class="glass-card">
        <h2 class="mb-3">Inflation Calculator</h2>
        <div class="simulator-grid">
            <div class="col-form">
                <div class="input-group">
                    <label for="inflation-amount">Current Price (₹)</label>
                    <input type="number" id="inflation-amount" class="input-control" value="1000">
                </div>
                <div class="input-group">
                    <label for="inflation-rate">Inflation Rate: <span id="inflation-rate-val">5</span>%</label>
                    <input type="range" id="inflation-rate" min="0" max="20" value="5" step="0.1">
                </div>
                <div class="input-group">
                    <label for="inflation-years">Years</label>
                    <input type="number" id="inflation-years" class="input-control" value="10">
                </div>
            </div>
            <div class="col-results">
                <div class="result-box">
                    <div class="result-label">Price After Inflation</div>
                    <div class="result-value" id="inflation-fv">₹0</div>
                </div>
            </div>
        </div>
    </div>
    `;
}

function initInflationCalculator() {
    const amtEl = document.getElementById('inflation-amount');
    const rateEl = document.getElementById('inflation-rate');
    const yearsEl = document.getElementById('inflation-years');
    const rateVal = document.getElementById('inflation-rate-val');
    const fvEl = document.getElementById('inflation-fv');

    function calculate() {
        const amt = parseFloat(amtEl.value) || 0;
        const r = parseFloat(rateEl.value) / 100;
        const t = parseFloat(yearsEl.value) || 0;
        rateVal.textContent = rateEl.value;

        const fv = amt * Math.pow(1 + r, t);
        fvEl.textContent = formatCurrency(Math.round(fv));
    }

    [amtEl, rateEl, yearsEl].forEach(el => el.addEventListener('input', calculate));
    calculate();
}

function parseValue(id) {
    const element = document.getElementById(id);
    return element ? parseFloat(element.value) || 0 : 0;
}

function formatPercent(value) {
    return `${value.toFixed(2)}%`;
}

function computeTaxForAmount(amount) {
    let remaining = amount;
    let tax = 0;
    const brackets = [
        { cap: 250000, rate: 0 },
        { cap: 500000, rate: 0.05 },
        { cap: 750000, rate: 0.1 },
        { cap: 1000000, rate: 0.15 },
        { cap: 1250000, rate: 0.2 },
        { cap: 1500000, rate: 0.25 },
        { cap: Infinity, rate: 0.3 }
    ];
    let lastCap = 0;
    for (const bracket of brackets) {
        const slab = Math.min(remaining, bracket.cap - lastCap);
        if (slab <= 0) break;
        tax += slab * bracket.rate;
        remaining -= slab;
        lastCap = bracket.cap;
    }
    return tax;
}

function computeXirr(cashflows) {
    function npv(rate) {
        return cashflows.reduce((sum, amount, index) => sum + amount / Math.pow(1 + rate, index), 0);
    }
    let rate = 0.1;
    for (let i = 0; i < 100; i++) {
        const value = npv(rate);
        const derivative = cashflows.reduce((sum, amount, index) => {
            if (index === 0) return sum;
            return sum - index * amount / Math.pow(1 + rate, index + 1);
        }, 0);
        if (Math.abs(derivative) < 1e-9) break;
        const next = rate - value / derivative;
        if (!isFinite(next)) break;
        if (Math.abs(next - rate) < 1e-7) return next;
        rate = next;
    }
    return rate;
}

function computeDiscountedCashFlow(cashflows, rate) {
    return cashflows.reduce((sum, amount, index) => sum + amount / Math.pow(1 + rate, index + 1), 0);
}

function renderMutualFundReturns() {
    return `
    <div class="glass-card">
        <h2 class="mb-3">Mutual Fund Returns</h2>
        <div class="simulator-grid">
            <div class="col-form">
                <div class="input-group"><label for="mfr-invested">Invested Amount (₹)</label><input id="mfr-invested" class="input-control" type="number" value="100000"></div>
                <div class="input-group"><label for="mfr-return">Expected Annual Return (%)</label><input id="mfr-return" class="input-control" type="number" value="12" step="0.1"></div>
                <div class="input-group"><label for="mfr-years">Investment Period (years)</label><input id="mfr-years" class="input-control" type="number" value="10"></div>
            </div>
            <div class="col-results">
                <div class="result-box"><div class="result-label">Estimated Corpus</div><div class="result-value" id="mfr-final">₹0</div></div>
                <div class="result-box"><div class="result-label">Total Gain</div><div class="result-value" id="mfr-gain">₹0</div></div>
            </div>
        </div>
    </div>
    `;
}

function initMutualFundReturns() {
    function calculate() {
        const invested = parseValue('mfr-invested');
        const rate = parseValue('mfr-return') / 100;
        const years = parseValue('mfr-years');
        const finalValue = invested * Math.pow(1 + rate, years);
        document.getElementById('mfr-final').textContent = formatCurrency(Math.round(finalValue));
        document.getElementById('mfr-gain').textContent = formatCurrency(Math.round(finalValue - invested));
    }
    ['mfr-invested', 'mfr-return', 'mfr-years'].forEach(id => document.getElementById(id).addEventListener('input', calculate));
    calculate();
}

function renderSwpCalculator() {
    return `
    <div class="glass-card">
        <h2 class="mb-3">SWP Calculator</h2>
        <div class="simulator-grid">
            <div class="col-form">
                <div class="input-group"><label for="swp-portfolio">Portfolio Value (₹)</label><input id="swp-portfolio" class="input-control" type="number" value="5000000"></div>
                <div class="input-group"><label for="swp-return">Expected Annual Return (%)</label><input id="swp-return" class="input-control" type="number" value="8" step="0.1"></div>
            </div>
            <div class="col-results">
                <div class="result-box"><div class="result-label">Annual Withdrawal</div><div class="result-value" id="swp-annual">₹0</div></div>
                <div class="result-box"><div class="result-label">Monthly Withdrawal</div><div class="result-value" id="swp-monthly">₹0</div></div>
            </div>
        </div>
    </div>
    `;
}

function initSwpCalculator() {
    function calculate() {
        const portfolio = parseValue('swp-portfolio');
        const rate = parseValue('swp-return') / 100;
        const annual = portfolio * rate;
        document.getElementById('swp-annual').textContent = formatCurrency(Math.round(annual));
        document.getElementById('swp-monthly').textContent = formatCurrency(Math.round(annual / 12));
    }
    ['swp-portfolio', 'swp-return'].forEach(id => document.getElementById(id).addEventListener('input', calculate));
    calculate();
}

function renderXirrCalculator() {
    return `
    <div class="glass-card">
        <h2 class="mb-3">XIRR Calculator</h2>
        <div class="simulator-grid">
            <div class="col-form">
                <div class="input-group"><label for="xirr-investment">Initial Investment (₹)</label><input id="xirr-investment" class="input-control" type="number" value="-100000"></div>
                <div class="input-group"><label for="xirr-year1">Year 1 Cashflow (₹)</label><input id="xirr-year1" class="input-control" type="number" value="20000"></div>
                <div class="input-group"><label for="xirr-year2">Year 2 Cashflow (₹)</label><input id="xirr-year2" class="input-control" type="number" value="25000"></div>
                <div class="input-group"><label for="xirr-year3">Year 3 Cashflow (₹)</label><input id="xirr-year3" class="input-control" type="number" value="30000"></div>
                <div class="input-group"><label for="xirr-year4">Year 4 Cashflow (₹)</label><input id="xirr-year4" class="input-control" type="number" value="35000"></div>
            </div>
            <div class="col-results">
                <div class="result-box"><div class="result-label">Estimated XIRR</div><div class="result-value" id="xirr-rate">0%</div></div>
            </div>
        </div>
    </div>
    `;
}

function initXirrCalculator() {
    function calculate() {
        const cashflows = [
            parseValue('xirr-investment'),
            parseValue('xirr-year1'),
            parseValue('xirr-year2'),
            parseValue('xirr-year3'),
            parseValue('xirr-year4')
        ];
        document.getElementById('xirr-rate').textContent = formatPercent(computeXirr(cashflows) * 100);
    }
    ['xirr-investment', 'xirr-year1', 'xirr-year2', 'xirr-year3', 'xirr-year4'].forEach(id => document.getElementById(id).addEventListener('input', calculate));
    calculate();
}

function renderDividendYieldCalculator() {
    return `
    <div class="glass-card">
        <h2 class="mb-3">Dividend Yield Calculator</h2>
        <div class="simulator-grid">
            <div class="col-form">
                <div class="input-group"><label for="dy-dividend">Dividend Per Share (₹)</label><input id="dy-dividend" class="input-control" type="number" value="12.5" step="0.1"></div>
                <div class="input-group"><label for="dy-price">Share Price (₹)</label><input id="dy-price" class="input-control" type="number" value="250" step="0.1"></div>
            </div>
            <div class="col-results">
                <div class="result-box"><div class="result-label">Dividend Yield</div><div class="result-value" id="dy-yield">0%</div></div>
            </div>
        </div>
    </div>
    `;
}

function initDividendYieldCalculator() {
    function calculate() {
        const dividend = parseValue('dy-dividend');
        const price = parseValue('dy-price');
        const yieldPct = price > 0 ? (dividend / price) * 100 : 0;
        document.getElementById('dy-yield').textContent = formatPercent(yieldPct);
    }
    ['dy-dividend', 'dy-price'].forEach(id => document.getElementById(id).addEventListener('input', calculate));
    calculate();
}

function renderStockAverageCalculator() {
    return `
    <div class="glass-card">
        <h2 class="mb-3">Stock Average Calculator</h2>
        <div class="simulator-grid">
            <div class="col-form">
                <div class="input-group"><label for="sa-q1">Quantity Lot 1</label><input id="sa-q1" class="input-control" type="number" value="100"></div>
                <div class="input-group"><label for="sa-p1">Price Lot 1 (₹)</label><input id="sa-p1" class="input-control" type="number" value="150" step="0.1"></div>
                <div class="input-group"><label for="sa-q2">Quantity Lot 2</label><input id="sa-q2" class="input-control" type="number" value="50"></div>
                <div class="input-group"><label for="sa-p2">Price Lot 2 (₹)</label><input id="sa-p2" class="input-control" type="number" value="180" step="0.1"></div>
            </div>
            <div class="col-results">
                <div class="result-box"><div class="result-label">Average Cost</div><div class="result-value" id="sa-average">₹0</div></div>
                <div class="result-box"><div class="result-label">Total Cost</div><div class="result-value" id="sa-total">₹0</div></div>
            </div>
        </div>
    </div>
    `;
}

function initStockAverageCalculator() {
    function calculate() {
        const q1 = parseValue('sa-q1');
        const p1 = parseValue('sa-p1');
        const q2 = parseValue('sa-q2');
        const p2 = parseValue('sa-p2');
        const totalQty = q1 + q2;
        const totalCost = q1 * p1 + q2 * p2;
        const average = totalQty > 0 ? totalCost / totalQty : 0;
        document.getElementById('sa-average').textContent = formatCurrency(Math.round(average));
        document.getElementById('sa-total').textContent = formatCurrency(Math.round(totalCost));
    }
    ['sa-q1', 'sa-p1', 'sa-q2', 'sa-p2'].forEach(id => document.getElementById(id).addEventListener('input', calculate));
    calculate();
}

function renderRiskRewardCalculator() {
    return `
    <div class="glass-card">
        <h2 class="mb-3">Risk-Reward Ratio Calculator</h2>
        <div class="simulator-grid">
            <div class="col-form">
                <div class="input-group"><label for="rr-entry">Entry Price (₹)</label><input id="rr-entry" class="input-control" type="number" value="100"></div>
                <div class="input-group"><label for="rr-target">Target Price (₹)</label><input id="rr-target" class="input-control" type="number" value="130"></div>
                <div class="input-group"><label for="rr-stop">Stop Loss (₹)</label><input id="rr-stop" class="input-control" type="number" value="90"></div>
            </div>
            <div class="col-results">
                <div class="result-box"><div class="result-label">Risk</div><div class="result-value" id="rr-risk">₹0</div></div>
                <div class="result-box"><div class="result-label">Reward</div><div class="result-value" id="rr-reward">₹0</div></div>
                <div class="result-box"><div class="result-label">Reward/Risk</div><div class="result-value" id="rr-ratio">0.00</div></div>
            </div>
        </div>
    </div>
    `;
}

function initRiskRewardCalculator() {
    function calculate() {
        const entry = parseValue('rr-entry');
        const target = parseValue('rr-target');
        const stop = parseValue('rr-stop');
        const risk = Math.max(0, entry - stop);
        const reward = Math.max(0, target - entry);
        const ratio = risk > 0 ? reward / risk : 0;
        document.getElementById('rr-risk').textContent = formatCurrency(Math.round(risk));
        document.getElementById('rr-reward').textContent = formatCurrency(Math.round(reward));
        document.getElementById('rr-ratio').textContent = ratio.toFixed(2);
    }
    ['rr-entry', 'rr-target', 'rr-stop'].forEach(id => document.getElementById(id).addEventListener('input', calculate));
    calculate();
}

function renderSharpeRatioCalculator() {
    return `
    <div class="glass-card">
        <h2 class="mb-3">Sharpe Ratio Calculator</h2>
        <div class="simulator-grid">
            <div class="col-form">
                <div class="input-group"><label for="sr-return">Portfolio Return (%)</label><input id="sr-return" class="input-control" type="number" value="12" step="0.1"></div>
                <div class="input-group"><label for="sr-riskfree">Risk-free Rate (%)</label><input id="sr-riskfree" class="input-control" type="number" value="4" step="0.1"></div>
                <div class="input-group"><label for="sr-volatility">Volatility (%)</label><input id="sr-volatility" class="input-control" type="number" value="15" step="0.1"></div>
            </div>
            <div class="col-results">
                <div class="result-box"><div class="result-label">Sharpe Ratio</div><div class="result-value" id="sr-value">0.00</div></div>
            </div>
        </div>
    </div>
    `;
}

function initSharpeRatioCalculator() {
    function calculate() {
        const portReturn = parseValue('sr-return');
        const riskFree = parseValue('sr-riskfree');
        const volatility = parseValue('sr-volatility');
        const ratio = volatility > 0 ? (portReturn - riskFree) / volatility : 0;
        document.getElementById('sr-value').textContent = ratio.toFixed(2);
    }
    ['sr-return', 'sr-riskfree', 'sr-volatility'].forEach(id => document.getElementById(id).addEventListener('input', calculate));
    calculate();
}

function renderFDCalculator() {
    return `
    <div class="glass-card">
        <h2 class="mb-3">Fixed Deposit Calculator</h2>
        <div class="simulator-grid">
            <div class="col-form">
                <div class="input-group"><label for="fd-principal">Principal (₹)</label><input id="fd-principal" class="input-control" type="number" value="200000"></div>
                <div class="input-group"><label for="fd-rate">Annual Interest Rate (%)</label><input id="fd-rate" class="input-control" type="number" value="7" step="0.1"></div>
                <div class="input-group"><label for="fd-years">Tenure (years)</label><input id="fd-years" class="input-control" type="number" value="5"></div>
            </div>
            <div class="col-results">
                <div class="result-box"><div class="result-label">Maturity Value</div><div class="result-value" id="fd-maturity">₹0</div></div>
            </div>
        </div>
    </div>
    `;
}

function initFDCalculator() {
    function calculate() {
        const principal = parseValue('fd-principal');
        const rate = parseValue('fd-rate') / 100;
        const years = parseValue('fd-years');
        const maturity = principal * Math.pow(1 + rate, years);
        document.getElementById('fd-maturity').textContent = formatCurrency(Math.round(maturity));
    }
    ['fd-principal', 'fd-rate', 'fd-years'].forEach(id => document.getElementById(id).addEventListener('input', calculate));
    calculate();
}

function renderRDCalculator() {
    return `
    <div class="glass-card">
        <h2 class="mb-3">Recurring Deposit Calculator</h2>
        <div class="simulator-grid">
            <div class="col-form">
                <div class="input-group"><label for="rd-monthly">Monthly Deposit (₹)</label><input id="rd-monthly" class="input-control" type="number" value="10000"></div>
                <div class="input-group"><label for="rd-rate">Annual Interest Rate (%)</label><input id="rd-rate" class="input-control" type="number" value="6.5" step="0.1"></div>
                <div class="input-group"><label for="rd-years">Tenure (years)</label><input id="rd-years" class="input-control" type="number" value="5"></div>
            </div>
            <div class="col-results">
                <div class="result-box"><div class="result-label">Maturity Value</div><div class="result-value" id="rd-maturity">₹0</div></div>
            </div>
        </div>
    </div>
    `;
}

function initRDCalculator() {
    function calculate() {
        const monthly = parseValue('rd-monthly');
        const rate = parseValue('rd-rate') / 100;
        const years = parseValue('rd-years');
        const months = years * 12;
        const monthlyRate = rate / 12;
        const maturity = monthlyRate === 0 ? monthly * months : monthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
        document.getElementById('rd-maturity').textContent = formatCurrency(Math.round(maturity));
    }
    ['rd-monthly', 'rd-rate', 'rd-years'].forEach(id => document.getElementById(id).addEventListener('input', calculate));
    calculate();
}

function renderSavingsInterestCalculator() {
    return `
    <div class="glass-card">
        <h2 class="mb-3">Savings Interest Calculator</h2>
        <div class="simulator-grid">
            <div class="col-form">
                <div class="input-group"><label for="si-principal">Principal (₹)</label><input id="si-principal" class="input-control" type="number" value="50000"></div>
                <div class="input-group"><label for="si-rate">Annual Interest Rate (%)</label><input id="si-rate" class="input-control" type="number" value="3.5" step="0.1"></div>
                <div class="input-group"><label for="si-years">Years</label><input id="si-years" class="input-control" type="number" value="3"></div>
            </div>
            <div class="col-results">
                <div class="result-box"><div class="result-label">Maturity Value</div><div class="result-value" id="si-maturity">₹0</div></div>
            </div>
        </div>
    </div>
    `;
}

function initSavingsInterestCalculator() {
    function calculate() {
        const principal = parseValue('si-principal');
        const rate = parseValue('si-rate') / 100;
        const years = parseValue('si-years');
        const maturity = principal * Math.pow(1 + rate, years);
        document.getElementById('si-maturity').textContent = formatCurrency(Math.round(maturity));
    }
    ['si-principal', 'si-rate', 'si-years'].forEach(id => document.getElementById(id).addEventListener('input', calculate));
    calculate();
}

function renderSavingsGoalCalculator() {
    return `
    <div class="glass-card">
        <h2 class="mb-3">Savings Goal Calculator</h2>
        <div class="simulator-grid">
            <div class="col-form">
                <div class="input-group"><label for="sg-goal">Goal Amount (₹)</label><input id="sg-goal" class="input-control" type="number" value="1000000"></div>
                <div class="input-group"><label for="sg-rate">Expected Return (%)</label><input id="sg-rate" class="input-control" type="number" value="8" step="0.1"></div>
                <div class="input-group"><label for="sg-years">Years</label><input id="sg-years" class="input-control" type="number" value="10"></div>
            </div>
            <div class="col-results">
                <div class="result-box"><div class="result-label">Required Monthly Savings</div><div class="result-value" id="sg-monthly">₹0</div></div>
            </div>
        </div>
    </div>
    `;
}

function initSavingsGoalCalculator() {
    function calculate() {
        const goal = parseValue('sg-goal');
        const rate = parseValue('sg-rate') / 100;
        const years = parseValue('sg-years');
        const months = years * 12;
        const monthlyRate = rate / 12;
        const factor = monthlyRate === 0 ? months : ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
        const monthly = factor === 0 ? 0 : goal / factor;
        document.getElementById('sg-monthly').textContent = formatCurrency(Math.round(monthly));
    }
    ['sg-goal', 'sg-rate', 'sg-years'].forEach(id => document.getElementById(id).addEventListener('input', calculate));
    calculate();
}

function renderChildEducationCalculator() {
    return `
    <div class="glass-card">
        <h2 class="mb-3">Child Education Savings Calculator</h2>
        <div class="simulator-grid">
            <div class="col-form">
                <div class="input-group"><label for="ce-current">Current Education Cost (₹)</label><input id="ce-current" class="input-control" type="number" value="500000"></div>
                <div class="input-group"><label for="ce-inflation">Expected Inflation (%)</label><input id="ce-inflation" class="input-control" type="number" value="6" step="0.1"></div>
                <div class="input-group"><label for="ce-years">Years Until Education</label><input id="ce-years" class="input-control" type="number" value="12"></div>
                <div class="input-group"><label for="ce-return">Expected Return (%)</label><input id="ce-return" class="input-control" type="number" value="10" step="0.1"></div>
            </div>
            <div class="col-results">
                <div class="result-box"><div class="result-label">Target Corpus</div><div class="result-value" id="ce-target">₹0</div></div>
                <div class="result-box"><div class="result-label">Monthly Savings</div><div class="result-value" id="ce-monthly">₹0</div></div>
            </div>
        </div>
    </div>
    `;
}

function initChildEducationCalculator() {
    function calculate() {
        const current = parseValue('ce-current');
        const inflation = parseValue('ce-inflation') / 100;
        const years = parseValue('ce-years');
        const rate = parseValue('ce-return') / 100;
        const target = current * Math.pow(1 + inflation, years);
        const months = years * 12;
        const monthlyRate = rate / 12;
        const factor = monthlyRate === 0 ? months : ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
        const monthly = factor === 0 ? 0 : target / factor;
        document.getElementById('ce-target').textContent = formatCurrency(Math.round(target));
        document.getElementById('ce-monthly').textContent = formatCurrency(Math.round(monthly));
    }
    ['ce-current', 'ce-inflation', 'ce-years', 'ce-return'].forEach(id => document.getElementById(id).addEventListener('input', calculate));
    calculate();
}

function renderVacationSavingsCalculator() {
    return `
    <div class="glass-card">
        <h2 class="mb-3">Vacation Savings Calculator</h2>
        <div class="simulator-grid">
            <div class="col-form">
                <div class="input-group"><label for="vs-goal">Vacation Cost (₹)</label><input id="vs-goal" class="input-control" type="number" value="200000"></div>
                <div class="input-group"><label for="vs-years">Years to Save</label><input id="vs-years" class="input-control" type="number" value="2"></div>
            </div>
            <div class="col-results">
                <div class="result-box"><div class="result-label">Monthly Savings Needed</div><div class="result-value" id="vs-monthly">₹0</div></div>
            </div>
        </div>
    </div>
    `;
}

function initVacationSavingsCalculator() {
    function calculate() {
        const goal = parseValue('vs-goal');
        const years = parseValue('vs-years');
        const monthly = years > 0 ? goal / (years * 12) : 0;
        document.getElementById('vs-monthly').textContent = formatCurrency(Math.round(monthly));
    }
    ['vs-goal', 'vs-years'].forEach(id => document.getElementById(id).addEventListener('input', calculate));
    calculate();
}

function renderDownPaymentSavingsCalculator() {
    return `
    <div class="glass-card">
        <h2 class="mb-3">Down Payment Savings Calculator</h2>
        <div class="simulator-grid">
            <div class="col-form">
                <div class="input-group"><label for="dp-home">Home Price (₹)</label><input id="dp-home" class="input-control" type="number" value="8000000"></div>
                <div class="input-group"><label for="dp-percent">Down Payment (%)</label><input id="dp-percent" class="input-control" type="number" value="20" step="0.1"></div>
                <div class="input-group"><label for="dp-years">Years to Save</label><input id="dp-years" class="input-control" type="number" value="3"></div>
            </div>
            <div class="col-results">
                <div class="result-box"><div class="result-label">Down Payment Needed</div><div class="result-value" id="dp-needed">₹0</div></div>
                <div class="result-box"><div class="result-label">Monthly Savings</div><div class="result-value" id="dp-monthly">₹0</div></div>
            </div>
        </div>
    </div>
    `;
}

function initDownPaymentSavingsCalculator() {
    function calculate() {
        const homePrice = parseValue('dp-home');
        const percent = parseValue('dp-percent') / 100;
        const years = parseValue('dp-years');
        const needed = homePrice * percent;
        const monthly = years > 0 ? needed / (years * 12) : 0;
        document.getElementById('dp-needed').textContent = formatCurrency(Math.round(needed));
        document.getElementById('dp-monthly').textContent = formatCurrency(Math.round(monthly));
    }
    ['dp-home', 'dp-percent', 'dp-years'].forEach(id => document.getElementById(id).addEventListener('input', calculate));
    calculate();
}

function renderPensionCalculator() {
    return `
    <div class="glass-card">
        <h2 class="mb-3">Pension Calculator</h2>
        <div class="simulator-grid">
            <div class="col-form">
                <div class="input-group"><label for="pension-income">Monthly Retirement Expense (₹)</label><input id="pension-income" class="input-control" type="number" value="60000"></div>
                <div class="input-group"><label for="pension-withdrawal">Withdrawal Rate (%)</label><input id="pension-withdrawal" class="input-control" type="number" value="4" step="0.1"></div>
            </div>
            <div class="col-results">
                <div class="result-box"><div class="result-label">Required Corpus</div><div class="result-value" id="pension-corpus">₹0</div></div>
            </div>
        </div>
    </div>
    `;
}

function initPensionCalculator() {
    function calculate() {
        const monthlyExpense = parseValue('pension-income');
        const rate = parseValue('pension-withdrawal') / 100;
        const annualExpense = monthlyExpense * 12;
        const corpus = rate === 0 ? 0 : annualExpense / rate;
        document.getElementById('pension-corpus').textContent = formatCurrency(Math.round(corpus));
    }
    ['pension-income', 'pension-withdrawal'].forEach(id => document.getElementById(id).addEventListener('input', calculate));
    calculate();
}

function renderFIRECalculator() {
    return `
    <div class="glass-card">
        <h2 class="mb-3">FIRE Calculator</h2>
        <div class="simulator-grid">
            <div class="col-form">
                <div class="input-group"><label for="fire-expense">Annual Expense (₹)</label><input id="fire-expense" class="input-control" type="number" value="600000"></div>
                <div class="input-group"><label for="fire-rate">Withdrawal Rate (%)</label><input id="fire-rate" class="input-control" type="number" value="4" step="0.1"></div>
            </div>
            <div class="col-results">
                <div class="result-box"><div class="result-label">FIRE Corpus</div><div class="result-value" id="fire-corpus">₹0</div></div>
            </div>
        </div>
    </div>
    `;
}

function initFIRECalculator() {
    function calculate() {
        const expense = parseValue('fire-expense');
        const rate = parseValue('fire-rate') / 100;
        const corpus = rate === 0 ? 0 : expense / rate;
        document.getElementById('fire-corpus').textContent = formatCurrency(Math.round(corpus));
    }
    ['fire-expense', 'fire-rate'].forEach(id => document.getElementById(id).addEventListener('input', calculate));
    calculate();
}

function renderRetWithdrawalCalculator() {
    return `
    <div class="glass-card">
        <h2 class="mb-3">Retirement Withdrawal Calculator</h2>
        <div class="simulator-grid">
            <div class="col-form">
                <div class="input-group"><label for="rw-corpus">Retirement Corpus (₹)</label><input id="rw-corpus" class="input-control" type="number" value="20000000"></div>
                <div class="input-group"><label for="rw-rate">Withdrawal Rate (%)</label><input id="rw-rate" class="input-control" type="number" value="4" step="0.1"></div>
            </div>
            <div class="col-results">
                <div class="result-box"><div class="result-label">Annual Withdrawal Income</div><div class="result-value" id="rw-income">₹0</div></div>
            </div>
        </div>
    </div>
    `;
}

function initRetWithdrawalCalculator() {
    function calculate() {
        const corpus = parseValue('rw-corpus');
        const rate = parseValue('rw-rate') / 100;
        const income = corpus * rate;
        document.getElementById('rw-income').textContent = formatCurrency(Math.round(income));
    }
    ['rw-corpus', 'rw-rate'].forEach(id => document.getElementById(id).addEventListener('input', calculate));
    calculate();
}

function render401kCalculator() {
    return `
    <div class="glass-card">
        <h2 class="mb-3">401(k) Calculator</h2>
        <div class="simulator-grid">
            <div class="col-form">
                <div class="input-group"><label for="401k-contribution">Monthly Contribution (₹)</label><input id="401k-contribution" class="input-control" type="number" value="20000"></div>
                <div class="input-group"><label for="401k-match">Employer Match (%)</label><input id="401k-match" class="input-control" type="number" value="50" step="0.1"></div>
                <div class="input-group"><label for="401k-return">Annual Return (%)</label><input id="401k-return" class="input-control" type="number" value="8" step="0.1"></div>
                <div class="input-group"><label for="401k-years">Years</label><input id="401k-years" class="input-control" type="number" value="20"></div>
            </div>
            <div class="col-results">
                <div class="result-box"><div class="result-label">Future Value</div><div class="result-value" id="401k-corpus">₹0</div></div>
            </div>
        </div>
    </div>
    `;
}

function init401kCalculator() {
    function calculate() {
        const monthly = parseValue('401k-contribution');
        const matchPct = parseValue('401k-match') / 100;
        const rate = parseValue('401k-return') / 100;
        const years = parseValue('401k-years');
        const n = years * 12;
        const monthlyRate = rate / 12;
        const totalMonthly = monthly * (1 + matchPct);
        const corpus = monthlyRate === 0 ? totalMonthly * n : totalMonthly * ((Math.pow(1 + monthlyRate, n) - 1) / monthlyRate) * (1 + monthlyRate);
        document.getElementById('401k-corpus').textContent = formatCurrency(Math.round(corpus));
    }
    ['401k-contribution', '401k-match', '401k-return', '401k-years'].forEach(id => document.getElementById(id).addEventListener('input', calculate));
    calculate();
}

function renderRetirementGapCalculator() {
    return `
    <div class="glass-card">
        <h2 class="mb-3">Retirement Savings Gap Calculator</h2>
        <div class="simulator-grid">
            <div class="col-form">
                <div class="input-group"><label for="rg-current">Current Corpus (₹)</label><input id="rg-current" class="input-control" type="number" value="5000000"></div>
                <div class="input-group"><label for="rg-target">Target Corpus (₹)</label><input id="rg-target" class="input-control" type="number" value="20000000"></div>
                <div class="input-group"><label for="rg-years">Years to Retire</label><input id="rg-years" class="input-control" type="number" value="15"></div>
                <div class="input-group"><label for="rg-return">Expected Return (%)</label><input id="rg-return" class="input-control" type="number" value="8" step="0.1"></div>
            </div>
            <div class="col-results">
                <div class="result-box"><div class="result-label">Required Monthly Savings</div><div class="result-value" id="rg-monthly">₹0</div></div>
            </div>
        </div>
    </div>
    `;
}

function initRetirementGapCalculator() {
    function calculate() {
        const current = parseValue('rg-current');
        const target = parseValue('rg-target');
        const years = parseValue('rg-years');
        const rate = parseValue('rg-return') / 100;
        const n = years * 12;
        const monthlyRate = rate / 12;
        const futureCurrent = current * Math.pow(1 + rate, years);
        const needed = Math.max(0, target - futureCurrent);
        const factor = monthlyRate === 0 ? n : ((Math.pow(1 + monthlyRate, n) - 1) / monthlyRate) * (1 + monthlyRate);
        const monthly = factor === 0 ? 0 : needed / factor;
        document.getElementById('rg-monthly').textContent = formatCurrency(Math.round(monthly));
    }
    ['rg-current', 'rg-target', 'rg-years', 'rg-return'].forEach(id => document.getElementById(id).addEventListener('input', calculate));
    calculate();
}

function renderIncomeTaxCalculator() {
    return `
    <div class="glass-card">
        <h2 class="mb-3">Income Tax Calculator</h2>
        <div class="simulator-grid">
            <div class="col-form">
                <div class="input-group"><label for="it-income">Annual Income (₹)</label><input id="it-income" class="input-control" type="number" value="1200000"></div>
                <div class="input-group"><label for="it-80c">80C Deductions (₹)</label><input id="it-80c" class="input-control" type="number" value="150000"></div>
                <div class="input-group"><label for="it-hra">HRA/Other Deductions (₹)</label><input id="it-hra" class="input-control" type="number" value="100000"></div>
            </div>
            <div class="col-results">
                <div class="result-box"><div class="result-label">Taxable Income</div><div class="result-value" id="it-taxable">₹0</div></div>
                <div class="result-box"><div class="result-label">Estimated Tax</div><div class="result-value" id="it-tax">₹0</div></div>
            </div>
        </div>
    </div>
    `;
}

function initIncomeTaxCalculator() {
    function calculate() {
        const income = parseValue('it-income');
        const deductions = Math.min(parseValue('it-80c'), 150000) + parseValue('it-hra');
        const taxable = Math.max(0, income - deductions - 50000);
        document.getElementById('it-taxable').textContent = formatCurrency(Math.round(taxable));
        document.getElementById('it-tax').textContent = formatCurrency(Math.round(computeTaxForAmount(taxable)));
    }
    ['it-income', 'it-80c', 'it-hra'].forEach(id => document.getElementById(id).addEventListener('input', calculate));
    calculate();
}

function renderCapitalGainsCalculator() {
    return `
    <div class="glass-card">
        <h2 class="mb-3">Capital Gains Calculator</h2>
        <div class="simulator-grid">
            <div class="col-form">
                <div class="input-group"><label for="cg-cost">Cost Price (₹)</label><input id="cg-cost" class="input-control" type="number" value="500000"></div>
                <div class="input-group"><label for="cg-sale">Sale Price (₹)</label><input id="cg-sale" class="input-control" type="number" value="700000"></div>
                <div class="input-group"><label for="cg-rate">Tax Rate (%)</label><input id="cg-rate" class="input-control" type="number" value="15" step="0.1"></div>
            </div>
            <div class="col-results">
                <div class="result-box"><div class="result-label">Capital Gain</div><div class="result-value" id="cg-gain">₹0</div></div>
                <div class="result-box"><div class="result-label">Tax Payable</div><div class="result-value" id="cg-tax">₹0</div></div>
            </div>
        </div>
    </div>
    `;
}

function initCapitalGainsCalculator() {
    function calculate() {
        const cost = parseValue('cg-cost');
        const sale = parseValue('cg-sale');
        const rate = parseValue('cg-rate') / 100;
        const gain = Math.max(0, sale - cost);
        document.getElementById('cg-gain').textContent = formatCurrency(Math.round(gain));
        document.getElementById('cg-tax').textContent = formatCurrency(Math.round(gain * rate));
    }
    ['cg-cost', 'cg-sale', 'cg-rate'].forEach(id => document.getElementById(id).addEventListener('input', calculate));
    calculate();
}

function renderGSTCalculator() {
    return `
    <div class="glass-card">
        <h2 class="mb-3">GST Calculator</h2>
        <div class="simulator-grid">
            <div class="col-form">
                <div class="input-group"><label for="gst-amount">Amount (₹)</label><input id="gst-amount" class="input-control" type="number" value="100000"></div>
                <div class="input-group"><label for="gst-rate">GST Rate (%)</label><input id="gst-rate" class="input-control" type="number" value="18" step="0.1"></div>
            </div>
            <div class="col-results">
                <div class="result-box"><div class="result-label">GST Amount</div><div class="result-value" id="gst-tax">₹0</div></div>
                <div class="result-box"><div class="result-label">Total Amount</div><div class="result-value" id="gst-total">₹0</div></div>
            </div>
        </div>
    </div>
    `;
}

function initGSTCalculator() {
    function calculate() {
        const amount = parseValue('gst-amount');
        const rate = parseValue('gst-rate') / 100;
        const tax = amount * rate;
        document.getElementById('gst-tax').textContent = formatCurrency(Math.round(tax));
        document.getElementById('gst-total').textContent = formatCurrency(Math.round(amount + tax));
    }
    ['gst-amount', 'gst-rate'].forEach(id => document.getElementById(id).addEventListener('input', calculate));
    calculate();
}

function renderVATCalculator() {
    return `
    <div class="glass-card">
        <h2 class="mb-3">VAT Calculator</h2>
        <div class="simulator-grid">
            <div class="col-form">
                <div class="input-group"><label for="vat-amount">Amount (₹)</label><input id="vat-amount" class="input-control" type="number" value="100000"></div>
                <div class="input-group"><label for="vat-rate">VAT Rate (%)</label><input id="vat-rate" class="input-control" type="number" value="12" step="0.1"></div>
            </div>
            <div class="col-results">
                <div class="result-box"><div class="result-label">VAT Amount</div><div class="result-value" id="vat-tax">₹0</div></div>
                <div class="result-box"><div class="result-label">Total Amount</div><div class="result-value" id="vat-total">₹0</div></div>
            </div>
        </div>
    </div>
    `;
}

function initVATCalculator() {
    function calculate() {
        const amount = parseValue('vat-amount');
        const rate = parseValue('vat-rate') / 100;
        const tax = amount * rate;
        document.getElementById('vat-tax').textContent = formatCurrency(Math.round(tax));
        document.getElementById('vat-total').textContent = formatCurrency(Math.round(amount + tax));
    }
    ['vat-amount', 'vat-rate'].forEach(id => document.getElementById(id).addEventListener('input', calculate));
    calculate();
}

function renderTaxRefundCalculator() {
    return `
    <div class="glass-card">
        <h2 class="mb-3">Tax Refund Calculator</h2>
        <div class="simulator-grid">
            <div class="col-form">
                <div class="input-group"><label for="tr-paid">Tax Paid (₹)</label><input id="tr-paid" class="input-control" type="number" value="100000"></div>
                <div class="input-group"><label for="tr-income">Taxable Income (₹)</label><input id="tr-income" class="input-control" type="number" value="1200000"></div>
                <div class="input-group"><label for="tr-deductions">Other Deductions (₹)</label><input id="tr-deductions" class="input-control" type="number" value="100000"></div>
            </div>
            <div class="col-results">
                <div class="result-box"><div class="result-label">Tax Liability</div><div class="result-value" id="tr-liability">₹0</div></div>
                <div class="result-box"><div class="result-label">Estimated Refund</div><div class="result-value" id="tr-refund">₹0</div></div>
            </div>
        </div>
    </div>
    `;
}

function initTaxRefundCalculator() {
    function calculate() {
        const paid = parseValue('tr-paid');
        const income = parseValue('tr-income');
        const deductions = parseValue('tr-deductions');
        const taxable = Math.max(0, income - deductions - 50000);
        const liability = computeTaxForAmount(taxable);
        document.getElementById('tr-liability').textContent = formatCurrency(Math.round(liability));
        document.getElementById('tr-refund').textContent = formatCurrency(Math.max(0, Math.round(paid - liability)));
    }
    ['tr-paid', 'tr-income', 'tr-deductions'].forEach(id => document.getElementById(id).addEventListener('input', calculate));
    calculate();
}

function renderSelfEmploymentTaxCalculator() {
    return `
    <div class="glass-card">
        <h2 class="mb-3">Self-Employment Tax Calculator</h2>
        <div class="simulator-grid">
            <div class="col-form">
                <div class="input-group"><label for="set-profit">Net Profit (₹)</label><input id="set-profit" class="input-control" type="number" value="1000000"></div>
                <div class="input-group"><label for="set-rate">Tax Rate (%)</label><input id="set-rate" class="input-control" type="number" value="15.3" step="0.1"></div>
            </div>
            <div class="col-results">
                <div class="result-box"><div class="result-label">Estimated Tax</div><div class="result-value" id="set-tax">₹0</div></div>
            </div>
        </div>
    </div>
    `;
}

function initSelfEmploymentTaxCalculator() {
    function calculate() {
        const profit = parseValue('set-profit');
        const rate = parseValue('set-rate') / 100;
        document.getElementById('set-tax').textContent = formatCurrency(Math.round(profit * rate));
    }
    ['set-profit', 'set-rate'].forEach(id => document.getElementById(id).addEventListener('input', calculate));
    calculate();
}

function renderNetWorthCalculator() {
    return `
    <div class="glass-card">
        <h2 class="mb-3">Net Worth Calculator</h2>
        <div class="simulator-grid">
            <div class="col-form">
                <div class="input-group"><label for="nw-assets">Total Assets (₹)</label><input id="nw-assets" class="input-control" type="number" value="1500000"></div>
                <div class="input-group"><label for="nw-liabilities">Total Liabilities (₹)</label><input id="nw-liabilities" class="input-control" type="number" value="500000"></div>
            </div>
            <div class="col-results">
                <div class="result-box"><div class="result-label">Net Worth</div><div class="result-value" id="nw-net">₹0</div></div>
            </div>
        </div>
    </div>
    `;
}

function initNetWorthCalculator() {
    function calculate() {
        const assets = parseValue('nw-assets');
        const liabilities = parseValue('nw-liabilities');
        document.getElementById('nw-net').textContent = formatCurrency(Math.round(assets - liabilities));
    }
    ['nw-assets', 'nw-liabilities'].forEach(id => document.getElementById(id).addEventListener('input', calculate));
    calculate();
}

function renderBudgetCalculator() {
    return `
    <div class="glass-card">
        <h2 class="mb-3">Budget Calculator</h2>
        <div class="simulator-grid">
            <div class="col-form">
                <div class="input-group"><label for="bg-income">Monthly Income (₹)</label><input id="bg-income" class="input-control" type="number" value="100000"></div>
                <div class="input-group"><label for="bg-expenses">Monthly Expenses (₹)</label><input id="bg-expenses" class="input-control" type="number" value="60000"></div>
            </div>
            <div class="col-results">
                <div class="result-box"><div class="result-label">Savings</div><div class="result-value" id="bg-savings">₹0</div></div>
            </div>
        </div>
    </div>
    `;
}

function initBudgetCalculator() {
    function calculate() {
        const income = parseValue('bg-income');
        const expenses = parseValue('bg-expenses');
        document.getElementById('bg-savings').textContent = formatCurrency(Math.round(Math.max(0, income - expenses)));
    }
    ['bg-income', 'bg-expenses'].forEach(id => document.getElementById(id).addEventListener('input', calculate));
    calculate();
}

function render50_30_20Calculator() {
    return `
    <div class="glass-card">
        <h2 class="mb-3">50/30/20 Budget Calculator</h2>
        <div class="simulator-grid">
            <div class="col-form">
                <div class="input-group"><label for="bt-income">Monthly Income (₹)</label><input id="bt-income" class="input-control" type="number" value="100000"></div>
            </div>
            <div class="col-results">
                <div class="result-box"><div class="result-label">Needs (50%)</div><div class="result-value" id="bt-necessities">₹0</div></div>
                <div class="result-box"><div class="result-label">Wants (30%)</div><div class="result-value" id="bt-wants">₹0</div></div>
                <div class="result-box"><div class="result-label">Savings (20%)</div><div class="result-value" id="bt-savings">₹0</div></div>
            </div>
        </div>
    </div>
    `;
}

function init50_30_20Calculator() {
    function calculate() {
        const income = parseValue('bt-income');
        document.getElementById('bt-necessities').textContent = formatCurrency(Math.round(income * 0.5));
        document.getElementById('bt-wants').textContent = formatCurrency(Math.round(income * 0.3));
        document.getElementById('bt-savings').textContent = formatCurrency(Math.round(income * 0.2));
    }
    ['bt-income'].forEach(id => document.getElementById(id).addEventListener('input', calculate));
    calculate();
}

function renderExpenseRatioCalculator() {
    return `
    <div class="glass-card">
        <h2 class="mb-3">Expense Ratio Calculator</h2>
        <div class="simulator-grid">
            <div class="col-form">
                <div class="input-group"><label for="er-aum">Fund AUM (₹)</label><input id="er-aum" class="input-control" type="number" value="100000000"></div>
                <div class="input-group"><label for="er-rate">Expense Ratio (%)</label><input id="er-rate" class="input-control" type="number" value="1" step="0.01"></div>
            </div>
            <div class="col-results">
                <div class="result-box"><div class="result-label">Annual Cost</div><div class="result-value" id="er-cost">₹0</div></div>
            </div>
        </div>
    </div>
    `;
}

function initExpenseRatioCalculator() {
    function calculate() {
        const aum = parseValue('er-aum');
        const rate = parseValue('er-rate') / 100;
        document.getElementById('er-cost').textContent = formatCurrency(Math.round(aum * rate));
    }
    ['er-aum', 'er-rate'].forEach(id => document.getElementById(id).addEventListener('input', calculate));
    calculate();
}

function renderFinancialIndependenceCalculator() {
    return `
    <div class="glass-card">
        <h2 class="mb-3">Financial Independence Calculator</h2>
        <div class="simulator-grid">
            <div class="col-form">
                <div class="input-group"><label for="fi-monthly">Monthly Expenses (₹)</label><input id="fi-monthly" class="input-control" type="number" value="60000"></div>
                <div class="input-group"><label for="fi-rate">Withdrawal Rate (%)</label><input id="fi-rate" class="input-control" type="number" value="4" step="0.1"></div>
            </div>
            <div class="col-results">
                <div class="result-box"><div class="result-label">FI Corpus Needed</div><div class="result-value" id="fi-corpus">₹0</div></div>
            </div>
        </div>
    </div>
    `;
}

function initFinancialIndependenceCalculator() {
    function calculate() {
        const monthly = parseValue('fi-monthly');
        const rate = parseValue('fi-rate') / 100;
        document.getElementById('fi-corpus').textContent = formatCurrency(Math.round(rate === 0 ? 0 : monthly * 12 / rate));
    }
    ['fi-monthly', 'fi-rate'].forEach(id => document.getElementById(id).addEventListener('input', calculate));
    calculate();
}

function renderSalaryCalculator() {
    return `
    <div class="glass-card">
        <h2 class="mb-3">Salary Calculator</h2>
        <div class="simulator-grid">
            <div class="col-form"><div class="input-group"><label for="sal-annual">Annual Salary (₹)</label><input id="sal-annual" class="input-control" type="number" value="1200000"></div></div>
            <div class="col-results">
                <div class="result-box"><div class="result-label">Monthly Salary</div><div class="result-value" id="sal-monthly">₹0</div></div>
                <div class="result-box"><div class="result-label">Daily Salary</div><div class="result-value" id="sal-daily">₹0</div></div>
                <div class="result-box"><div class="result-label">Hourly Salary</div><div class="result-value" id="sal-hourly">₹0</div></div>
            </div>
        </div>
    </div>
    `;
}

function initSalaryCalculator() {
    function calculate() {
        const annual = parseValue('sal-annual');
        document.getElementById('sal-monthly').textContent = formatCurrency(Math.round(annual / 12));
        document.getElementById('sal-daily').textContent = formatCurrency(Math.round(annual / 260));
        document.getElementById('sal-hourly').textContent = formatCurrency(Math.round(annual / 2080));
    }
    ['sal-annual'].forEach(id => document.getElementById(id).addEventListener('input', calculate));
    calculate();
}

function renderTakeHomeSalaryCalculator() {
    return `
    <div class="glass-card">
        <h2 class="mb-3">Take-Home Salary Calculator</h2>
        <div class="simulator-grid">
            <div class="col-form">
                <div class="input-group"><label for="th-gross">Gross Monthly Salary (₹)</label><input id="th-gross" class="input-control" type="number" value="100000"></div>
                <div class="input-group"><label for="th-deductions">Deductions (₹)</label><input id="th-deductions" class="input-control" type="number" value="20000"></div>
            </div>
            <div class="col-results">
                <div class="result-box"><div class="result-label">Take Home Salary</div><div class="result-value" id="th-net">₹0</div></div>
            </div>
        </div>
    </div>
    `;
}

function initTakeHomeSalaryCalculator() {
    function calculate() {
        const gross = parseValue('th-gross');
        const deductions = parseValue('th-deductions');
        document.getElementById('th-net').textContent = formatCurrency(Math.round(Math.max(0, gross - deductions)));
    }
    ['th-gross', 'th-deductions'].forEach(id => document.getElementById(id).addEventListener('input', calculate));
    calculate();
}

function renderSalaryHikeCalculator() {
    return `
    <div class="glass-card">
        <h2 class="mb-3">Salary Hike Calculator</h2>
        <div class="simulator-grid">
            <div class="col-form">
                <div class="input-group"><label for="sh-current">Current Salary (₹)</label><input id="sh-current" class="input-control" type="number" value="1200000"></div>
                <div class="input-group"><label for="sh-hike">Hike (%)</label><input id="sh-hike" class="input-control" type="number" value="10" step="0.1"></div>
            </div>
            <div class="col-results">
                <div class="result-box"><div class="result-label">New Salary</div><div class="result-value" id="sh-new">₹0</div></div>
                <div class="result-box"><div class="result-label">Increase Amount</div><div class="result-value" id="sh-increase">₹0</div></div>
            </div>
        </div>
    </div>
    `;
}

function initSalaryHikeCalculator() {
    function calculate() {
        const current = parseValue('sh-current');
        const hike = parseValue('sh-hike') / 100;
        const increase = current * hike;
        document.getElementById('sh-new').textContent = formatCurrency(Math.round(current + increase));
        document.getElementById('sh-increase').textContent = formatCurrency(Math.round(increase));
    }
    ['sh-current', 'sh-hike'].forEach(id => document.getElementById(id).addEventListener('input', calculate));
    calculate();
}

function renderLifeInsuranceCalculator() {
    return `
    <div class="glass-card">
        <h2 class="mb-3">Life Insurance Calculator</h2>
        <div class="simulator-grid">
            <div class="col-form">
                <div class="input-group"><label for="li-income">Annual Income (₹)</label><input id="li-income" class="input-control" type="number" value="1200000"></div>
                <div class="input-group"><label for="li-liabilities">Outstanding Liabilities (₹)</label><input id="li-liabilities" class="input-control" type="number" value="500000"></div>
                <div class="input-group"><label for="li-years">Years to Cover</label><input id="li-years" class="input-control" type="number" value="20"></div>
            </div>
            <div class="col-results">
                <div class="result-box"><div class="result-label">Recommended Coverage</div><div class="result-value" id="li-cover">₹0</div></div>
            </div>
        </div>
    </div>
    `;
}

function initLifeInsuranceCalculator() {
    function calculate() {
        const income = parseValue('li-income');
        const liabilities = parseValue('li-liabilities');
        const years = parseValue('li-years');
        document.getElementById('li-cover').textContent = formatCurrency(Math.round(income * years + liabilities));
    }
    ['li-income', 'li-liabilities', 'li-years'].forEach(id => document.getElementById(id).addEventListener('input', calculate));
    calculate();
}

function renderTermInsuranceCalculator() {
    return `
    <div class="glass-card">
        <h2 class="mb-3">Term Insurance Calculator</h2>
        <div class="simulator-grid">
            <div class="col-form">
                <div class="input-group"><label for="ti-sum">Sum Assured (₹)</label><input id="ti-sum" class="input-control" type="number" value="10000000"></div>
                <div class="input-group"><label for="ti-age">Applicant Age</label><input id="ti-age" class="input-control" type="number" value="30" step="1"></div>
                <div class="input-group"><label for="ti-term">Policy Term (years)</label><input id="ti-term" class="input-control" type="number" value="30"></div>
            </div>
            <div class="col-results">
                <div class="result-box"><div class="result-label">Estimated Annual Premium</div><div class="result-value" id="ti-premium">₹0</div></div>
            </div>
        </div>
    </div>
    `;
}

function initTermInsuranceCalculator() {
    function calculate() {
        const sum = parseValue('ti-sum');
        const age = parseValue('ti-age');
        const term = parseValue('ti-term');
        const baseRate = age < 40 ? 0.007 : 0.01;
        document.getElementById('ti-premium').textContent = formatCurrency(Math.round(sum * baseRate * (term / 20)));
    }
    ['ti-sum', 'ti-age', 'ti-term'].forEach(id => document.getElementById(id).addEventListener('input', calculate));
    calculate();
}

function renderHealthInsuranceCalculator() {
    return `
    <div class="glass-card">
        <h2 class="mb-3">Health Insurance Calculator</h2>
        <div class="simulator-grid">
            <div class="col-form">
                <div class="input-group"><label for="hi-age">Age</label><input id="hi-age" class="input-control" type="number" value="35"></div>
                <div class="input-group"><label for="hi-members">Family Members</label><input id="hi-members" class="input-control" type="number" value="3"></div>
            </div>
            <div class="col-results">
                <div class="result-box"><div class="result-label">Estimated Annual Premium</div><div class="result-value" id="hi-premium">₹0</div></div>
            </div>
        </div>
    </div>
    `;
}

function initHealthInsuranceCalculator() {
    function calculate() {
        const age = parseValue('hi-age');
        const members = parseValue('hi-members');
        document.getElementById('hi-premium').textContent = formatCurrency(Math.round(10000 + members * 2500 + Math.max(0, age - 30) * 200));
    }
    ['hi-age', 'hi-members'].forEach(id => document.getElementById(id).addEventListener('input', calculate));
    calculate();
}

function renderInsurancePremiumCalculator() {
    return `
    <div class="glass-card">
        <h2 class="mb-3">Insurance Premium Calculator</h2>
        <div class="simulator-grid">
            <div class="col-form">
                <div class="input-group"><label for="ip-coverage">Coverage Amount (₹)</label><input id="ip-coverage" class="input-control" type="number" value="5000000"></div>
                <div class="input-group"><label for="ip-rate">Premium Rate (%)</label><input id="ip-rate" class="input-control" type="number" value="1.2" step="0.1"></div>
            </div>
            <div class="col-results">
                <div class="result-box"><div class="result-label">Annual Premium</div><div class="result-value" id="ip-annual">₹0</div></div>
            </div>
        </div>
    </div>
    `;
}

function initInsurancePremiumCalculator() {
    function calculate() {
        const coverage = parseValue('ip-coverage');
        const rate = parseValue('ip-rate') / 100;
        document.getElementById('ip-annual').textContent = formatCurrency(Math.round(coverage * rate));
    }
    ['ip-coverage', 'ip-rate'].forEach(id => document.getElementById(id).addEventListener('input', calculate));
    calculate();
}

function renderProfitMarginCalculator() {
    return `
    <div class="glass-card">
        <h2 class="mb-3">Profit Margin Calculator</h2>
        <div class="simulator-grid">
            <div class="col-form">
                <div class="input-group"><label for="pm-revenue">Revenue (₹)</label><input id="pm-revenue" class="input-control" type="number" value="500000"></div>
                <div class="input-group"><label for="pm-cost">Cost (₹)</label><input id="pm-cost" class="input-control" type="number" value="350000"></div>
            </div>
            <div class="col-results">
                <div class="result-box"><div class="result-label">Profit</div><div class="result-value" id="pm-profit">₹0</div></div>
                <div class="result-box"><div class="result-label">Profit Margin</div><div class="result-value" id="pm-margin">0%</div></div>
            </div>
        </div>
    </div>
    `;
}

function initProfitMarginCalculator() {
    function calculate() {
        const revenue = parseValue('pm-revenue');
        const cost = parseValue('pm-cost');
        const profit = Math.max(0, revenue - cost);
        const margin = revenue > 0 ? (profit / revenue) * 100 : 0;
        document.getElementById('pm-profit').textContent = formatCurrency(Math.round(profit));
        document.getElementById('pm-margin').textContent = formatPercent(margin);
    }
    ['pm-revenue', 'pm-cost'].forEach(id => document.getElementById(id).addEventListener('input', calculate));
    calculate();
}

function renderBreakEvenCalculator() {
    return `
    <div class="glass-card">
        <h2 class="mb-3">Break-Even Calculator</h2>
        <div class="simulator-grid">
            <div class="col-form">
                <div class="input-group"><label for="be-fixed">Fixed Costs (₹)</label><input id="be-fixed" class="input-control" type="number" value="200000"></div>
                <div class="input-group"><label for="be-variable">Variable Cost per Unit (₹)</label><input id="be-variable" class="input-control" type="number" value="150"></div>
                <div class="input-group"><label for="be-price">Price per Unit (₹)</label><input id="be-price" class="input-control" type="number" value="250"></div>
            </div>
            <div class="col-results">
                <div class="result-box"><div class="result-label">Break-Even Units</div><div class="result-value" id="be-unit">0</div></div>
                <div class="result-box"><div class="result-label">Contribution per Unit</div><div class="result-value" id="be-contribution">₹0</div></div>
            </div>
        </div>
    </div>
    `;
}

function initBreakEvenCalculator() {
    function calculate() {
        const fixed = parseValue('be-fixed');
        const variable = parseValue('be-variable');
        const price = parseValue('be-price');
        const contribution = Math.max(0, price - variable);
        const units = contribution > 0 ? Math.ceil(fixed / contribution) : 0;
        document.getElementById('be-unit').textContent = units;
        document.getElementById('be-contribution').textContent = formatCurrency(Math.round(contribution));
    }
    ['be-fixed', 'be-variable', 'be-price'].forEach(id => document.getElementById(id).addEventListener('input', calculate));
    calculate();
}

function renderCashFlowCalculator() {
    return `
    <div class="glass-card">
        <h2 class="mb-3">Cash Flow Calculator</h2>
        <div class="simulator-grid">
            <div class="col-form">
                <div class="input-group"><label for="cf-inflow">Monthly Inflow (₹)</label><input id="cf-inflow" class="input-control" type="number" value="150000"></div>
                <div class="input-group"><label for="cf-outflow">Monthly Outflow (₹)</label><input id="cf-outflow" class="input-control" type="number" value="90000"></div>
            </div>
            <div class="col-results">
                <div class="result-box"><div class="result-label">Net Cash Flow</div><div class="result-value" id="cf-net">₹0</div></div>
            </div>
        </div>
    </div>
    `;
}

function initCashFlowCalculator() {
    function calculate() {
        const inflow = parseValue('cf-inflow');
        const outflow = parseValue('cf-outflow');
        document.getElementById('cf-net').textContent = formatCurrency(Math.round(inflow - outflow));
    }
    ['cf-inflow', 'cf-outflow'].forEach(id => document.getElementById(id).addEventListener('input', calculate));
    calculate();
}

function renderNPVCalculator() {
    return `
    <div class="glass-card">
        <h2 class="mb-3">NPV Calculator</h2>
        <div class="simulator-grid">
            <div class="col-form">
                <div class="input-group"><label for="npv-invest">Initial Investment (₹)</label><input id="npv-invest" class="input-control" type="number" value="1000000"></div>
                <div class="input-group"><label for="npv-rate">Discount Rate (%)</label><input id="npv-rate" class="input-control" type="number" value="10" step="0.1"></div>
                <div class="input-group"><label for="npv-cf1">Cashflow Year 1 (₹)</label><input id="npv-cf1" class="input-control" type="number" value="250000"></div>
                <div class="input-group"><label for="npv-cf2">Cashflow Year 2 (₹)</label><input id="npv-cf2" class="input-control" type="number" value="300000"></div>
                <div class="input-group"><label for="npv-cf3">Cashflow Year 3 (₹)</label><input id="npv-cf3" class="input-control" type="number" value="350000"></div>
                <div class="input-group"><label for="npv-cf4">Cashflow Year 4 (₹)</label><input id="npv-cf4" class="input-control" type="number" value="400000"></div>
            </div>
            <div class="col-results">
                <div class="result-box"><div class="result-label">Net Present Value</div><div class="result-value" id="npv-value">₹0</div></div>
            </div>
        </div>
    </div>
    `;
}

function initNPVCalculator() {
    function calculate() {
        const investment = parseValue('npv-invest');
        const rate = parseValue('npv-rate') / 100;
        const cashflows = [parseValue('npv-cf1'), parseValue('npv-cf2'), parseValue('npv-cf3'), parseValue('npv-cf4')];
        const npv = cashflows.reduce((sum, cf, index) => sum + cf / Math.pow(1 + rate, index + 1), -investment);
        document.getElementById('npv-value').textContent = formatCurrency(Math.round(npv));
    }
    ['npv-invest', 'npv-rate', 'npv-cf1', 'npv-cf2', 'npv-cf3', 'npv-cf4'].forEach(id => document.getElementById(id).addEventListener('input', calculate));
    calculate();
}

function renderIRRCalculator() {
    return `
    <div class="glass-card">
        <h2 class="mb-3">IRR Calculator</h2>
        <div class="simulator-grid">
            <div class="col-form">
                <div class="input-group"><label for="irr-invest">Initial Investment (₹)</label><input id="irr-invest" class="input-control" type="number" value="-1000000"></div>
                <div class="input-group"><label for="irr-cf1">Cashflow Year 1 (₹)</label><input id="irr-cf1" class="input-control" type="number" value="300000"></div>
                <div class="input-group"><label for="irr-cf2">Cashflow Year 2 (₹)</label><input id="irr-cf2" class="input-control" type="number" value="350000"></div>
                <div class="input-group"><label for="irr-cf3">Cashflow Year 3 (₹)</label><input id="irr-cf3" class="input-control" type="number" value="400000"></div>
                <div class="input-group"><label for="irr-cf4">Cashflow Year 4 (₹)</label><input id="irr-cf4" class="input-control" type="number" value="450000"></div>
            </div>
            <div class="col-results">
                <div class="result-box"><div class="result-label">Estimated IRR</div><div class="result-value" id="irr-value">0%</div></div>
            </div>
        </div>
    </div>
    `;
}

function initIRRCalculator() {
    function calculate() {
        const cashflows = [
            parseValue('irr-invest'),
            parseValue('irr-cf1'),
            parseValue('irr-cf2'),
            parseValue('irr-cf3'),
            parseValue('irr-cf4')
        ];
        document.getElementById('irr-value').textContent = formatPercent(computeXirr(cashflows) * 100);
    }
    ['irr-invest', 'irr-cf1', 'irr-cf2', 'irr-cf3', 'irr-cf4'].forEach(id => document.getElementById(id).addEventListener('input', calculate));
    calculate();
}

function renderDCFCalculator() {
    return `
    <div class="glass-card">
        <h2 class="mb-3">DCF Calculator</h2>
        <div class="simulator-grid">
            <div class="col-form">
                <div class="input-group"><label for="dcf-rate">Discount Rate (%)</label><input id="dcf-rate" class="input-control" type="number" value="10" step="0.1"></div>
                <div class="input-group"><label for="dcf-growth">Terminal Growth Rate (%)</label><input id="dcf-growth" class="input-control" type="number" value="3" step="0.1"></div>
                <div class="input-group"><label for="dcf-cf1">Cashflow Year 1 (₹)</label><input id="dcf-cf1" class="input-control" type="number" value="250000"></div>
                <div class="input-group"><label for="dcf-cf2">Cashflow Year 2 (₹)</label><input id="dcf-cf2" class="input-control" type="number" value="300000"></div>
                <div class="input-group"><label for="dcf-cf3">Cashflow Year 3 (₹)</label><input id="dcf-cf3" class="input-control" type="number" value="360000"></div>
                <div class="input-group"><label for="dcf-cf4">Cashflow Year 4 (₹)</label><input id="dcf-cf4" class="input-control" type="number" value="420000"></div>
            </div>
            <div class="col-results">
                <div class="result-box"><div class="result-label">DCF Value</div><div class="result-value" id="dcf-value">₹0</div></div>
            </div>
        </div>
    </div>
    `;
}

function initDCFCalculator() {
    function calculate() {
        const rate = parseValue('dcf-rate') / 100;
        const growth = parseValue('dcf-growth') / 100;
        const cashflows = [parseValue('dcf-cf1'), parseValue('dcf-cf2'), parseValue('dcf-cf3'), parseValue('dcf-cf4')];
        const pvCashflows = computeDiscountedCashFlow(cashflows, rate);
        const terminal = cashflows[cashflows.length - 1] * (1 + growth) / Math.max(1e-9, rate - growth);
        const discountedTerminal = terminal / Math.pow(1 + rate, cashflows.length);
        document.getElementById('dcf-value').textContent = formatCurrency(Math.round(pvCashflows + discountedTerminal));
    }
    ['dcf-rate', 'dcf-growth', 'dcf-cf1', 'dcf-cf2', 'dcf-cf3', 'dcf-cf4'].forEach(id => document.getElementById(id).addEventListener('input', calculate));
    calculate();
}

// Placeholder render/init for many requested calculators
const placeholderList = [
    'renderMutualFundReturns', 'renderSwpCalculator', 'renderXirrCalculator', 'renderDividendYieldCalculator', 'renderStockAverageCalculator',
    'renderRiskRewardCalculator', 'renderSharpeRatioCalculator', 'renderHomeLoanCalculator', 'renderPersonalLoanCalculator', 'renderCarLoanCalculator',
    'renderEducationLoanCalculator', 'renderBusinessLoanCalculator', 'renderLoanEligibilityCalculator', 'renderLoanAffordabilityCalculator',
    'renderLoanPrepaymentCalculator', 'renderLoanBalanceCalculator', 'renderDebtToIncomeCalculator', 'renderMortgageCalculator',
    'renderMortgageRefinanceCalculator', 'renderInterestOnlyMortgageCalculator', 'renderDebtPayoffCalculator', 'renderFDCalculator', 'renderRDCalculator',
    'renderSavingsInterestCalculator', 'renderSavingsGoalCalculator', 'renderChildEducationCalculator', 'renderVacationSavingsCalculator',
    'renderDownPaymentSavingsCalculator', 'renderRetirementCalculator_alt', 'renderPensionCalculator', 'renderFIRECalculator', 'renderRetWithdrawalCalculator',
    'render401kCalculator', 'renderRetirementGapCalculator', 'renderIncomeTaxCalculator', 'renderCapitalGainsCalculator', 'renderGSTCalculator', 'renderVATCalculator',
    'renderTaxRefundCalculator', 'renderSelfEmploymentTaxCalculator', 'renderNetWorthCalculator', 'renderBudgetCalculator', 'render50_30_20Calculator',
    'renderExpenseRatioCalculator', 'renderFinancialIndependenceCalculator', 'renderSalaryCalculator', 'renderTakeHomeSalaryCalculator', 'renderSalaryHikeCalculator',
    'renderLifeInsuranceCalculator', 'renderTermInsuranceCalculator', 'renderHealthInsuranceCalculator', 'renderInsurancePremiumCalculator', 'renderProfitMarginCalculator',
    'renderBreakEvenCalculator', 'renderCashFlowCalculator', 'renderNPVCalculator', 'renderIRRCalculator', 'renderDCFCalculator'
];

placeholderList.forEach(name => {
    if (typeof window[name] !== 'function') {
        window[name] = function() {
            return `\n        <div class="glass-card">\n            <h2 class=\"mb-3\">${name.replace(/render|Calculator|Alt/g, ' ').trim()}</h2>\n            <p class=\"muted\">Placeholder - will implement detailed inputs and formulas on request.</p>\n        </div>\n        `;
        };
    }
    const initName = 'init' + name.replace('render', '');
    if (typeof window[initName] !== 'function') {
        window[initName] = function() {
            // no-op placeholder init
        };
    }
});

// --- Loan & EMI implementations (replace placeholders) ---

function renderHomeLoanCalculator() {
    return `
    <div class="glass-card">
        <h2 class="mb-3">Home Loan EMI Calculator</h2>
        <div class="simulator-grid">
            <div class="col-form">
                <div class="input-group">
                    <label for="home-price">Property Price (₹)</label>
                    <input type="number" id="home-price" class="input-control" value="5000000">
                </div>
                <div class="input-group">
                    <label for="home-down">Down Payment (₹)</label>
                    <input type="number" id="home-down" class="input-control" value="1000000">
                </div>
                <div class="input-group">
                    <label for="home-rate">Interest Rate (%)</label>
                    <input type="number" id="home-rate" class="input-control" value="8.5" step="0.01">
                </div>
                <div class="input-group">
                    <label for="home-tenure">Tenure (years)</label>
                    <input type="number" id="home-tenure" class="input-control" value="20">
                </div>
            </div>
            <div class="col-results">
                <div class="result-box"><div class="result-label">Loan Amount</div><div class="result-value" id="home-loan-amount">₹0</div></div>
                <div class="result-box"><div class="result-label">Monthly EMI</div><div class="result-value" id="home-emi">₹0</div></div>
                <div class="result-box"><div class="result-label">Total Interest</div><div class="result-value" id="home-total-interest">₹0</div></div>
            </div>
        </div>
    </div>
    `;
}

function initHomeLoanCalculator() {
    const price = document.getElementById('home-price');
    const down = document.getElementById('home-down');
    const rate = document.getElementById('home-rate');
    const tenure = document.getElementById('home-tenure');
    const outLoan = document.getElementById('home-loan-amount');
    const outEmi = document.getElementById('home-emi');
    const outInterest = document.getElementById('home-total-interest');

    function calc() {
        const p = parseFloat(price.value) || 0;
        const d = parseFloat(down.value) || 0;
        const principal = Math.max(0, p - d);
        const annual = parseFloat(rate.value) / 100;
        const n = parseInt(tenure.value) * 12 || 1;
        const r = annual / 12;

        const emi = r === 0 ? principal / n : principal * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
        const totalPayment = emi * n;
        const totalInterest = totalPayment - principal;

        outLoan.textContent = formatCurrency(Math.round(principal));
        outEmi.textContent = formatCurrency(Math.round(emi));
        outInterest.textContent = formatCurrency(Math.round(totalInterest));
    }

    [price, down, rate, tenure].forEach(el => el.addEventListener('input', calc));
    calc();
}

// Generic EMI render helper
function renderGenericEmi(idPrefix, title, defaultPrincipal) {
    return `
    <div class="glass-card">
        <h2 class="mb-3">${title}</h2>
        <div class="simulator-grid">
            <div class="col-form">
                <div class="input-group">
                    <label for="${idPrefix}-principal">Loan Amount (₹)</label>
                    <input type="number" id="${idPrefix}-principal" class="input-control" value="${defaultPrincipal}">
                </div>
                <div class="input-group">
                    <label for="${idPrefix}-rate">Interest Rate (%)</label>
                    <input type="number" id="${idPrefix}-rate" class="input-control" value="10" step="0.01">
                </div>
                <div class="input-group">
                    <label for="${idPrefix}-tenure">Tenure (years)</label>
                    <input type="number" id="${idPrefix}-tenure" class="input-control" value="5">
                </div>
            </div>
            <div class="col-results">
                <div class="result-box"><div class="result-label">Monthly EMI</div><div class="result-value" id="${idPrefix}-emi">₹0</div></div>
                <div class="result-box"><div class="result-label">Total Interest</div><div class="result-value" id="${idPrefix}-total-interest">₹0</div></div>
                <div class="result-box"><div class="result-label">Total Payment</div><div class="result-value" id="${idPrefix}-total-payment">₹0</div></div>
            </div>
        </div>
    </div>
    `;
}

function initGenericEmi(idPrefix) {
    const principalEl = document.getElementById(`${idPrefix}-principal`);
    const rateEl = document.getElementById(`${idPrefix}-rate`);
    const tenureEl = document.getElementById(`${idPrefix}-tenure`);
    const emiEl = document.getElementById(`${idPrefix}-emi`);
    const totalInterestEl = document.getElementById(`${idPrefix}-total-interest`);
    const totalPaymentEl = document.getElementById(`${idPrefix}-total-payment`);

    function calc() {
        const principal = parseFloat(principalEl.value) || 0;
        const annual = parseFloat(rateEl.value) / 100;
        const n = parseInt(tenureEl.value) * 12 || 1;
        const r = annual / 12;
        const emi = r === 0 ? principal / n : principal * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
        const totalPayment = emi * n;
        const totalInterest = totalPayment - principal;

        emiEl.textContent = formatCurrency(Math.round(emi));
        totalInterestEl.textContent = formatCurrency(Math.round(totalInterest));
        totalPaymentEl.textContent = formatCurrency(Math.round(totalPayment));
    }

    [principalEl, rateEl, tenureEl].forEach(el => el.addEventListener('input', calc));
    calc();
}

function renderPersonalLoanCalculator() { return renderGenericEmi('personal', 'Personal Loan EMI Calculator', 500000); }
function initPersonalLoanCalculator() { initGenericEmi('personal'); }
function renderCarLoanCalculator() { return renderGenericEmi('car', 'Car Loan EMI Calculator', 800000); }
function initCarLoanCalculator() { initGenericEmi('car'); }
function renderEducationLoanCalculator() { return renderGenericEmi('education', 'Education Loan Calculator', 300000); }
function initEducationLoanCalculator() { initGenericEmi('education'); }
function renderBusinessLoanCalculator() { return renderGenericEmi('business', 'Business Loan Calculator', 1000000); }
function initBusinessLoanCalculator() { initGenericEmi('business'); }

function renderLoanEligibilityCalculator() {
    return `
    <div class="glass-card">
        <h2 class="mb-3">Loan Eligibility Calculator</h2>
        <div class="simulator-grid">
            <div class="col-form">
                <div class="input-group"><label for="elig-gross">Gross Monthly Income (₹)</label><input id="elig-gross" class="input-control" type="number" value="100000"></div>
                <div class="input-group"><label for="elig-other">Existing Monthly Debts (₹)</label><input id="elig-other" class="input-control" type="number" value="10000"></div>
                <div class="input-group"><label for="elig-rate">Interest Rate (%)</label><input id="elig-rate" class="input-control" type="number" value="10" step="0.01"></div>
                <div class="input-group"><label for="elig-tenure">Tenure (years)</label><input id="elig-tenure" class="input-control" type="number" value="20"></div>
            </div>
            <div class="col-results">
                <div class="result-box"><div class="result-label">Max Loan Amount</div><div class="result-value" id="elig-max">₹0</div></div>
                <div class="result-box"><div class="result-label">Assumed EMI (50% of income)</div><div class="result-value" id="elig-emi">₹0</div></div>
            </div>
        </div>
    </div>
    `;
}

function initLoanEligibilityCalculator() {
    const gross = document.getElementById('elig-gross');
    const other = document.getElementById('elig-other');
    const rate = document.getElementById('elig-rate');
    const tenure = document.getElementById('elig-tenure');
    const outMax = document.getElementById('elig-max');
    const outEmi = document.getElementById('elig-emi');

    function calc() {
        const grossMonthly = parseFloat(gross.value) || 0;
        const otherDebts = parseFloat(other.value) || 0;
        const monthlyAffordable = Math.max(0, grossMonthly * 0.5 - otherDebts);
        const annual = parseFloat(rate.value) / 100;
        const n = parseInt(tenure.value) * 12 || 1;
        const r = annual / 12;
        const maxLoan = r === 0 ? monthlyAffordable * n : monthlyAffordable * (1 - Math.pow(1 + r, -n)) / r;

        outEmi.textContent = formatCurrency(Math.round(monthlyAffordable));
        outMax.textContent = formatCurrency(Math.round(maxLoan));
    }

    [gross, other, rate, tenure].forEach(el => el.addEventListener('input', calc));
    calc();
}

function renderLoanAffordabilityCalculator() {
    return `
    <div class="glass-card">
        <h2 class="mb-3">Loan Affordability Calculator</h2>
        <div class="simulator-grid">
            <div class="col-form">
                <div class="input-group"><label for="aff-gross">Gross Monthly Income (₹)</label><input id="aff-gross" class="input-control" type="number" value="80000"></div>
                <div class="input-group"><label for="aff-expenses">Monthly Expenses (₹)</label><input id="aff-expenses" class="input-control" type="number" value="30000"></div>
                <div class="input-group"><label for="aff-rate">Interest Rate (%)</label><input id="aff-rate" class="input-control" type="number" value="9" step="0.01"></div>
                <div class="input-group"><label for="aff-tenure">Tenure (years)</label><input id="aff-tenure" class="input-control" type="number" value="15"></div>
            </div>
            <div class="col-results">
                <div class="result-box"><div class="result-label">Max EMI Available</div><div class="result-value" id="aff-emi">₹0</div></div>
                <div class="result-box"><div class="result-label">Max Loan Amount</div><div class="result-value" id="aff-max">₹0</div></div>
            </div>
        </div>
    </div>
    `;
}

function initLoanAffordabilityCalculator() {
    const gross = document.getElementById('aff-gross');
    const expenses = document.getElementById('aff-expenses');
    const rate = document.getElementById('aff-rate');
    const tenure = document.getElementById('aff-tenure');
    const outEmi = document.getElementById('aff-emi');
    const outMax = document.getElementById('aff-max');

    function calc() {
        const grossMonthly = parseFloat(gross.value) || 0;
        const expensesMonthly = parseFloat(expenses.value) || 0;
        const monthlyAffordable = Math.max(0, grossMonthly - expensesMonthly) * 0.6; // conservative 60% of discretionary
        const annual = parseFloat(rate.value) / 100;
        const n = parseInt(tenure.value) * 12 || 1;
        const r = annual / 12;
        const maxLoan = r === 0 ? monthlyAffordable * n : monthlyAffordable * (1 - Math.pow(1 + r, -n)) / r;

        outEmi.textContent = formatCurrency(Math.round(monthlyAffordable));
        outMax.textContent = formatCurrency(Math.round(maxLoan));
    }

    [gross, expenses, rate, tenure].forEach(el => el.addEventListener('input', calc));
    calc();
}

function renderLoanPrepaymentCalculator() {
    return `
    <div class="glass-card">
        <h2 class="mb-3">Loan Prepayment Calculator</h2>
        <div class="simulator-grid">
            <div class="col-form">
                <div class="input-group"><label for="pre-current">Current Balance (₹)</label><input id="pre-current" class="input-control" type="number" value="1000000"></div>
                <div class="input-group"><label for="pre-lump">Lump Sum Prepayment (₹)</label><input id="pre-lump" class="input-control" type="number" value="100000"></div>
                <div class="input-group"><label for="pre-rate">Interest Rate (%)</label><input id="pre-rate" class="input-control" type="number" value="9" step="0.01"></div>
                <div class="input-group"><label for="pre-remaining">Remaining Tenure (months)</label><input id="pre-remaining" class="input-control" type="number" value="240"></div>
            </div>
            <div class="col-results">
                <div class="result-box"><div class="result-label">New Balance</div><div class="result-value" id="pre-new-balance">₹0</div></div>
                <div class="result-box"><div class="result-label">New EMI (same tenure)</div><div class="result-value" id="pre-new-emi">₹0</div></div>
            </div>
        </div>
    </div>
    `;
}

function initLoanPrepaymentCalculator() {
    const currentEl = document.getElementById('pre-current');
    const lumpEl = document.getElementById('pre-lump');
    const rateEl = document.getElementById('pre-rate');
    const remainingEl = document.getElementById('pre-remaining');
    const outBalance = document.getElementById('pre-new-balance');
    const outEmi = document.getElementById('pre-new-emi');

    function calc() {
        const current = parseFloat(currentEl.value) || 0;
        const lump = parseFloat(lumpEl.value) || 0;
        const annual = parseFloat(rateEl.value) / 100;
        const n = parseInt(remainingEl.value) || 1;
        const r = annual / 12;

        const newBalance = Math.max(0, current - lump);
        const newEmi = r === 0 ? newBalance / n : newBalance * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);

        outBalance.textContent = formatCurrency(Math.round(newBalance));
        outEmi.textContent = formatCurrency(Math.round(newEmi));
    }

    [currentEl, lumpEl, rateEl, remainingEl].forEach(el => el.addEventListener('input', calc));
    calc();
}

function renderLoanBalanceCalculator() {
    return `
    <div class="glass-card">
        <h2 class="mb-3">Loan Balance Calculator</h2>
        <div class="simulator-grid">
            <div class="col-form">
                <div class="input-group"><label for="bal-principal">Original Principal (₹)</label><input id="bal-principal" class="input-control" type="number" value="1000000"></div>
                <div class="input-group"><label for="bal-rate">Annual Rate (%)</label><input id="bal-rate" class="input-control" type="number" value="9" step="0.01"></div>
                <div class="input-group"><label for="bal-tenure">Original Tenure (years)</label><input id="bal-tenure" class="input-control" type="number" value="20"></div>
                <div class="input-group"><label for="bal-paid">Payments Made (months)</label><input id="bal-paid" class="input-control" type="number" value="24"></div>
            </div>
            <div class="col-results">
                <div class="result-box"><div class="result-label">Remaining Balance</div><div class="result-value" id="bal-remaining">₹0</div></div>
            </div>
        </div>
    </div>
    `;
}

function initLoanBalanceCalculator() {
    const pEl = document.getElementById('bal-principal');
    const rateEl = document.getElementById('bal-rate');
    const tenureEl = document.getElementById('bal-tenure');
    const paidEl = document.getElementById('bal-paid');
    const outEl = document.getElementById('bal-remaining');

    function calc() {
        const P = parseFloat(pEl.value) || 0;
        const annual = parseFloat(rateEl.value) / 100;
        const N = (parseInt(tenureEl.value) || 0) * 12;
        const k = parseInt(paidEl.value) || 0;
        const r = annual / 12;
        if (N === 0) { outEl.textContent = formatCurrency(0); return; }
        const EMI = r === 0 ? P / N : P * r * Math.pow(1 + r, N) / (Math.pow(1 + r, N) - 1);
        const remaining = r === 0 ? Math.max(0, P - EMI * k) : P * Math.pow(1 + r, k) - EMI * ( (Math.pow(1 + r, k) - 1) / r );
        outEl.textContent = formatCurrency(Math.max(0, Math.round(remaining)));
    }

    [pEl, rateEl, tenureEl, paidEl].forEach(el => el.addEventListener('input', calc));
    calc();
}

function renderDebtToIncomeCalculator() {
    return `
    <div class="glass-card">
        <h2 class="mb-3">Debt-to-Income Ratio</h2>
        <div class="simulator-grid">
            <div class="col-form">
                <div class="input-group"><label for="dti-debt">Total Monthly Debt Payments (₹)</label><input id="dti-debt" class="input-control" type="number" value="20000"></div>
                <div class="input-group"><label for="dti-income">Gross Monthly Income (₹)</label><input id="dti-income" class="input-control" type="number" value="100000"></div>
            </div>
            <div class="col-results">
                <div class="result-box"><div class="result-label">DTI Ratio</div><div class="result-value" id="dti-ratio">0%</div></div>
            </div>
        </div>
    </div>
    `;
}

function initDebtToIncomeCalculator() {
    const debtEl = document.getElementById('dti-debt');
    const incomeEl = document.getElementById('dti-income');
    const outEl = document.getElementById('dti-ratio');

    function calc() {
        const debt = parseFloat(debtEl.value) || 0;
        const income = parseFloat(incomeEl.value) || 1;
        const ratio = (debt / income) * 100;
        outEl.textContent = ratio.toFixed(1) + '%';
    }

    [debtEl, incomeEl].forEach(el => el.addEventListener('input', calc));
    calc();
}

function renderMortgageCalculator() { return renderHomeLoanCalculator(); }
function initMortgageCalculator() { initHomeLoanCalculator(); }

function renderMortgageRefinanceCalculator() {
    return `
    <div class="glass-card">
        <h2 class="mb-3">Mortgage Refinance Calculator</h2>
        <div class="simulator-grid">
            <div class="col-form">
                <div class="input-group"><label for="refi-balance">Current Balance (₹)</label><input id="refi-balance" class="input-control" type="number" value="3000000"></div>
                <div class="input-group"><label for="refi-current-rate">Current Rate (%)</label><input id="refi-current-rate" class="input-control" type="number" value="8.5" step="0.01"></div>
                <div class="input-group"><label for="refi-new-rate">New Rate (%)</label><input id="refi-new-rate" class="input-control" type="number" value="7" step="0.01"></div>
                <div class="input-group"><label for="refi-remaining-years">Remaining Years</label><input id="refi-remaining-years" class="input-control" type="number" value="15"></div>
                <div class="input-group"><label for="refi-costs">Refinance Costs (₹)</label><input id="refi-costs" class="input-control" type="number" value="50000"></div>
            </div>
            <div class="col-results">
                <div class="result-box"><div class="result-label">Current EMI</div><div class="result-value" id="refi-current-emi">₹0</div></div>
                <div class="result-box"><div class="result-label">New EMI</div><div class="result-value" id="refi-new-emi">₹0</div></div>
                <div class="result-box"><div class="result-label">Monthly Savings</div><div class="result-value" id="refi-savings">₹0</div></div>
                <div class="result-box"><div class="result-label">Break-even (months)</div><div class="result-value" id="refi-break">0</div></div>
            </div>
        </div>
    </div>
    `;
}

function initMortgageRefinanceCalculator() {
    const bal = document.getElementById('refi-balance');
    const curRate = document.getElementById('refi-current-rate');
    const newRate = document.getElementById('refi-new-rate');
    const years = document.getElementById('refi-remaining-years');
    const costs = document.getElementById('refi-costs');
    const outCur = document.getElementById('refi-current-emi');
    const outNew = document.getElementById('refi-new-emi');
    const outSav = document.getElementById('refi-savings');
    const outBreak = document.getElementById('refi-break');

    function calc() {
        const P = parseFloat(bal.value) || 0;
        const cr = parseFloat(curRate.value) / 100;
        const nr = parseFloat(newRate.value) / 100;
        const n = (parseInt(years.value) || 0) * 12;
        const c = parseFloat(costs.value) || 0;
        const r1 = cr / 12;
        const r2 = nr / 12;
        const emi1 = r1 === 0 ? P / n : P * r1 * Math.pow(1 + r1, n) / (Math.pow(1 + r1, n) - 1);
        const emi2 = r2 === 0 ? P / n : P * r2 * Math.pow(1 + r2, n) / (Math.pow(1 + r2, n) - 1);
        const savings = Math.max(0, emi1 - emi2);
        const breakEven = savings > 0 ? Math.ceil(c / savings) : Infinity;

        outCur.textContent = formatCurrency(Math.round(emi1));
        outNew.textContent = formatCurrency(Math.round(emi2));
        outSav.textContent = formatCurrency(Math.round(savings));
        outBreak.textContent = isFinite(breakEven) ? breakEven : '—';
    }

    [bal, curRate, newRate, years, costs].forEach(el => el.addEventListener('input', calc));
    calc();
}

function renderInterestOnlyMortgageCalculator() {
    return `
    <div class="glass-card">
        <h2 class="mb-3">Interest-Only Mortgage</h2>
        <div class="simulator-grid">
            <div class="col-form">
                <div class="input-group"><label for="io-principal">Principal (₹)</label><input id="io-principal" class="input-control" type="number" value="2000000"></div>
                <div class="input-group"><label for="io-rate">Interest Rate (%)</label><input id="io-rate" class="input-control" type="number" value="7" step="0.01"></div>
            </div>
            <div class="col-results">
                <div class="result-box"><div class="result-label">Interest-Only Payment (monthly)</div><div class="result-value" id="io-payment">₹0</div></div>
            </div>
        </div>
    </div>
    `;
}

function initInterestOnlyMortgageCalculator() {
    const p = document.getElementById('io-principal');
    const rate = document.getElementById('io-rate');
    const out = document.getElementById('io-payment');
    function calc() {
        const principal = parseFloat(p.value) || 0;
        const annual = parseFloat(rate.value) / 100;
        const monthly = principal * (annual / 12);
        out.textContent = formatCurrency(Math.round(monthly));
    }
    [p, rate].forEach(el => el.addEventListener('input', calc));
    calc();
}

function renderDebtPayoffCalculator() {
    return `
    <div class="glass-card">
        <h2 class="mb-3">Debt Payoff Calculator</h2>
        <div class="simulator-grid">
            <div class="col-form">
                <div class="input-group"><label for="dp-principal">Current Balance (₹)</label><input id="dp-principal" class="input-control" type="number" value="500000"></div>
                <div class="input-group"><label for="dp-rate">Annual Rate (%)</label><input id="dp-rate" class="input-control" type="number" value="12" step="0.01"></div>
                <div class="input-group"><label for="dp-payment">Monthly Payment (₹)</label><input id="dp-payment" class="input-control" type="number" value="10000"></div>
                <div class="input-group"><label for="dp-extra">Extra Monthly Payment (₹)</label><input id="dp-extra" class="input-control" type="number" value="0"></div>
            </div>
            <div class="col-results">
                <div class="result-box"><div class="result-label">Months to Payoff</div><div class="result-value" id="dp-months">0</div></div>
                <div class="result-box"><div class="result-label">Total Interest Paid</div><div class="result-value" id="dp-interest">₹0</div></div>
            </div>
        </div>
    </div>
    `;
}

function initDebtPayoffCalculator() {
    const principalEl = document.getElementById('dp-principal');
    const rateEl = document.getElementById('dp-rate');
    const paymentEl = document.getElementById('dp-payment');
    const extraEl = document.getElementById('dp-extra');
    const outMonths = document.getElementById('dp-months');
    const outInterest = document.getElementById('dp-interest');

    function calc() {
        let balance = parseFloat(principalEl.value) || 0;
        const annual = parseFloat(rateEl.value) / 100;
        const monthlyRate = annual / 12;
        const basePayment = parseFloat(paymentEl.value) || 0;
        const extra = parseFloat(extraEl.value) || 0;
        const payment = basePayment + extra;
        let months = 0;
        let totalInterest = 0;

        if (payment <= balance * monthlyRate) {
            outMonths.textContent = 'Never (payment too small)';
            outInterest.textContent = '—';
            return;
        }

        while (balance > 0 && months < 1000) {
            const interest = balance * monthlyRate;
            const principalPaid = Math.min(balance, payment - interest);
            balance = Math.max(0, balance - principalPaid);
            totalInterest += interest;
            months++;
        }

        outMonths.textContent = months;
        outInterest.textContent = formatCurrency(Math.round(totalInterest));
    }

    [principalEl, rateEl, paymentEl, extraEl].forEach(el => el.addEventListener('input', calc));
    calc();
}
