// sipSimulator.js

function renderSipSimulator() {
    return `
        <div class="glass-card">
            <h2 class="mb-3">SIP Growth Simulator</h2>
            <div class="simulator-grid">
                <!-- Column 1: Inputs -->
                <div class="col-form">
                    <div class="input-group">
                        <label for="sip-invest">Monthly Investment (₹)</label>
                        <input type="number" id="sip-invest" class="input-control" value="5000" step="500">
                    </div>
                    <div class="input-group">
                        <label for="sip-return">Expected Annual Return: <span id="sip-return-val">12</span>%</label>
                        <input type="range" id="sip-return" min="4" max="30" value="12" step="0.5">
                    </div>
                    <div class="input-group">
                        <label for="sip-years">Investment Duration: <span id="sip-years-val">10</span> years</label>
                        <input type="range" id="sip-years" min="1" max="40" value="10">
                    </div>
                </div>
                
                <!-- Column 2: Results & Insights -->
                <div class="col-results">
                    <div class="result-box">
                        <div class="result-label">Total Invested</div>
                        <div class="result-value" id="sip-total-invested">₹0</div>
                    </div>
                    <div class="result-box">
                        <div class="result-label">Estimated Wealth</div>
                        <div class="result-value" id="sip-estimated-wealth">₹0</div>
                    </div>
                    
                    <div class="insight-box mt-4">
                        <i class="fa-solid fa-arrow-trend-up insight-icon"></i>
                        <div class="insight-text">
                            <strong>Insight:</strong> Most long-term wealth is created during later years of compounding.
                        </div>
                    </div>
                </div>

                <!-- Column 3: Chart -->
                <div class="chart-col">
                    <div class="chart-container">
                        <canvas id="sipChart"></canvas>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function initSipSimulator() {
    const investEl = document.getElementById('sip-invest');
    const returnEl = document.getElementById('sip-return');
    const yearsEl = document.getElementById('sip-years');
    
    const returnVal = document.getElementById('sip-return-val');
    const yearsVal = document.getElementById('sip-years-val');

    const totalInvestedEl = document.getElementById('sip-total-invested');
    const estimatedWealthEl = document.getElementById('sip-estimated-wealth');

    const ctx = document.getElementById('sipChart').getContext('2d');
    
    if (window.currentChart) {
        window.currentChart.destroy();
    }
    
    window.currentChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [
                {
                    label: 'Invested Amount',
                    data: [],
                    backgroundColor: 'rgba(139, 92, 246, 0.8)',
                    stack: 'Stack 0',
                },
                {
                    label: 'Wealth Gained',
                    data: [],
                    backgroundColor: 'rgba(16, 185, 129, 0.8)',
                    stack: 'Stack 0',
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
                        label: function(context) {
                            return context.dataset.label + ': ' + formatCurrency(context.raw);
                        }
                    }
                }
            },
            scales: {
                x: { stacked: true, ticks: { color: '#94A3B8' }, grid: { display: false } },
                y: { 
                    stacked: true, 
                    ticks: { 
                        color: '#94A3B8',
                        callback: function(value) { return '₹' + (value / 100000).toFixed(1) + 'L'; }
                    }, 
                    grid: { color: 'rgba(255,255,255,0.05)' } 
                }
            }
        }
    });

    function calculate() {
        const P = parseFloat(investEl.value) || 0;
        const r = parseFloat(returnEl.value) / 100 / 12;
        const years = parseInt(yearsEl.value);

        returnVal.textContent = returnEl.value;
        yearsVal.textContent = years;

        let totalInvested = 0;
        let estimatedWealth = 0;
        
        const labels = [];
        const investedData = [];
        const gainedData = [];

        for (let i = 1; i <= years; i++) {
            const months = i * 12;
            const currentInvested = P * months;
            const fv = P * ((Math.pow(1 + r, months) - 1) / r) * (1 + r);
            const gained = fv - currentInvested;
            
            labels.push('Year ' + i);
            investedData.push(currentInvested);
            gainedData.push(gained);

            if (i === years) {
                totalInvested = currentInvested;
                estimatedWealth = fv;
            }
        }

        totalInvestedEl.textContent = formatCurrency(totalInvested);
        estimatedWealthEl.textContent = formatCurrency(estimatedWealth);

        window.currentChart.data.labels = labels;
        window.currentChart.data.datasets[0].data = investedData;
        window.currentChart.data.datasets[1].data = gainedData;
        window.currentChart.update();
    }

    [investEl, returnEl, yearsEl].forEach(el => {
        el.addEventListener('input', calculate);
    });

    calculate();
}
