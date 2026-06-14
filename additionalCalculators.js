// additionalCalculators.js

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
