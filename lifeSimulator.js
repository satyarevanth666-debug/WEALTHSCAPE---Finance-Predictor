// lifeSimulator.js

function renderLifeSimulator() {
    return `
        <div class="glass-card">
            <h2 class="mb-3">Life Investment Simulator</h2>
            <div class="simulator-grid">
                <!-- Column 1: Inputs -->
                <div class="col-form">
                    <div class="input-group">
                        <label for="life-age">Current Age: <span id="life-age-val">25</span> years</label>
                        <input type="range" id="life-age" min="18" max="60" value="25">
                    </div>
                    <div class="input-group">
                        <label for="life-income">Monthly Income (₹)</label>
                        <input type="number" id="life-income" class="input-control" value="50000" step="5000">
                    </div>
                    <div class="input-group">
                        <label for="life-invest">Monthly Investment (₹)</label>
                        <input type="number" id="life-invest" class="input-control" value="10000" step="1000">
                    </div>
                    <div class="input-group">
                        <label for="life-return">Expected Annual Return: <span id="life-return-val">12</span>%</label>
                        <input type="range" id="life-return" min="4" max="25" value="12" step="0.5">
                    </div>
                    <div class="input-group">
                        <label for="life-years">Years Investing: <span id="life-years-val">20</span> years</label>
                        <input type="range" id="life-years" min="5" max="40" value="20">
                    </div>
                </div>
                
                <!-- Column 2: Results & Insights -->
                <div class="col-results">
                    <div class="result-box">
                        <div class="result-label">Total Invested</div>
                        <div class="result-value" id="life-total-invested">₹0</div>
                    </div>
                    <div class="result-box">
                        <div class="result-label">Future Wealth</div>
                        <div class="result-value" id="life-future-wealth">₹0</div>
                    </div>
                    <div class="insight-box mt-4">
                        <i class="fa-solid fa-lightbulb insight-icon"></i>
                        <div class="insight-text">
                            <strong>Insight:</strong> Consistent investing over time can significantly grow wealth due to compounding.
                        </div>
                    </div>
                </div>

                <!-- Column 3: Chart -->
                <div class="chart-col">
                    <div class="chart-container">
                        <canvas id="lifeChart"></canvas>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function initLifeSimulator() {
    const ageEl = document.getElementById('life-age');
    const incomeEl = document.getElementById('life-income');
    const investEl = document.getElementById('life-invest');
    const returnEl = document.getElementById('life-return');
    const yearsEl = document.getElementById('life-years');

    const ageVal = document.getElementById('life-age-val');
    const returnVal = document.getElementById('life-return-val');
    const yearsVal = document.getElementById('life-years-val');

    const totalInvestedEl = document.getElementById('life-total-invested');
    const futureWealthEl = document.getElementById('life-future-wealth');

    const ctx = document.getElementById('lifeChart').getContext('2d');

    if (window.currentChart) {
        window.currentChart.destroy();
    }

    window.currentChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [
                {
                    label: 'Total Invested',
                    data: [],
                    borderColor: '#8B5CF6',
                    backgroundColor: 'rgba(139, 92, 246, 0.1)',
                    fill: true,
                    tension: 0.4
                },
                {
                    label: 'Future Wealth',
                    data: [],
                    borderColor: '#10B981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    fill: true,
                    tension: 0.4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { labels: { color: '#F8FAFC' } },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            return context.dataset.label + ': ' + formatCurrency(context.raw);
                        }
                    }
                }
            },
            scales: {
                x: { ticks: { color: '#94A3B8' }, grid: { color: 'rgba(255,255,255,0.05)' } },
                y: {
                    ticks: {
                        color: '#94A3B8',
                        callback: function (value) { return '₹' + (value / 100000).toFixed(1) + 'L'; }
                    },
                    grid: { color: 'rgba(255,255,255,0.05)' }
                }
            }
        }
    });

    function calculate() {
        const age = parseInt(ageEl.value);
        const P = parseFloat(investEl.value);
        const r = parseFloat(returnEl.value) / 100 / 12; // monthly rate
        const years = parseInt(yearsEl.value);
        const nTotal = years * 12;

        ageVal.textContent = age;
        returnVal.textContent = returnEl.value;
        yearsVal.textContent = years;

        let totalInvested = 0;
        let futureWealth = 0;

        const labels = [];
        const investedData = [];
        const wealthData = [];

        for (let i = 1; i <= years; i++) {
            const months = i * 12;
            const currentInvested = P * months;
            const fv = P * ((Math.pow(1 + r, months) - 1) / r) * (1 + r);

            labels.push('Age ' + (age + i));
            investedData.push(currentInvested);
            wealthData.push(fv);

            if (i === years) {
                totalInvested = currentInvested;
                futureWealth = fv;
            }
        }

        totalInvestedEl.textContent = formatCurrency(totalInvested);
        futureWealthEl.textContent = formatCurrency(futureWealth);

        window.currentChart.data.labels = labels;
        window.currentChart.data.datasets[0].data = investedData;
        window.currentChart.data.datasets[1].data = wealthData;
        window.currentChart.update();
    }

    [ageEl, incomeEl, investEl, returnEl, yearsEl].forEach(el => {
        el.addEventListener('input', calculate);
    });

    // Initial calculation
    calculate();
}
