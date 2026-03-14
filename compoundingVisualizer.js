// compoundingVisualizer.js

function renderCompoundingVisualizer() {
    return `
        <div class="glass-card">
            <h2 class="mb-3">Compounding Visualizer</h2>
            <div class="simulator-grid">
                <!-- Column 1: Inputs -->
                <div class="col-form">
                    <div class="input-group">
                        <label for="comp-initial">Initial Investment (₹)</label>
                        <input type="number" id="comp-initial" class="input-control" value="100000" step="10000">
                    </div>
                    <div class="input-group">
                        <label for="comp-monthly">Monthly Addition (₹)</label>
                        <input type="number" id="comp-monthly" class="input-control" value="5000" step="1000">
                    </div>
                    <div class="input-group">
                        <label for="comp-return">Annual Interest Rate: <span id="comp-return-val">10</span>%</label>
                        <input type="range" id="comp-return" min="1" max="25" value="10" step="0.5">
                    </div>
                    <div class="input-group">
                        <label for="comp-years">Years to Grow: <span id="comp-years-val">30</span> years</label>
                        <input type="range" id="comp-years" min="5" max="50" value="30">
                    </div>
                </div>
                
                <!-- Column 2: Results -->
                <div class="col-results">
                    <div class="result-box" style="background: rgba(16, 185, 129, 0.1); border-color: rgba(16, 185, 129, 0.2);">
                        <div class="result-label" style="color: #F8FAFC;">Total Invested</div>
                        <div class="result-value" id="comp-invested">₹0</div>
                    </div>
                    <div class="result-box" style="background: rgba(139, 92, 246, 0.1); border-color: rgba(139, 92, 246, 0.2);">
                        <div class="result-label" style="color: #F8FAFC;">Final Wealth (Exponential Growth)</div>
                        <div class="result-value" id="comp-wealth" style="color: var(--secondary-start);">₹0</div>
                    </div>
                    
                    <div class="insight-box mt-4" style="border-left-color: var(--secondary-start);">
                        <i class="fa-solid fa-rocket insight-icon"></i>
                        <div class="insight-text">
                            <strong>Insight:</strong> Look at the curve! The magic of compounding means the money your money makes, starts making more money.
                        </div>
                    </div>
                </div>

                <!-- Column 3: Chart -->
                <div class="chart-col">
                    <div class="chart-container">
                        <canvas id="compChart"></canvas>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function initCompoundingVisualizer() {
    const initialEl = document.getElementById('comp-initial');
    const monthlyEl = document.getElementById('comp-monthly');
    const returnEl = document.getElementById('comp-return');
    const yearsEl = document.getElementById('comp-years');

    const returnVal = document.getElementById('comp-return-val');
    const yearsVal = document.getElementById('comp-years-val');

    const investedEl = document.getElementById('comp-invested');
    const wealthEl = document.getElementById('comp-wealth');

    const ctx = document.getElementById('compChart').getContext('2d');
    
    if (window.currentChart) {
        window.currentChart.destroy();
    }
    
    window.currentChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [
                {
                    label: 'Total Principal',
                    data: [],
                    borderColor: '#94A3B8',
                    backgroundColor: 'rgba(148, 163, 184, 0.1)',
                    fill: 'origin',
                    tension: 0.4,
                    pointRadius: 0
                },
                {
                    label: 'Wealth from Compounding',
                    data: [],
                    borderColor: '#8B5CF6',
                    backgroundColor: 'rgba(139, 92, 246, 0.2)',
                    fill: '-1',
                    tension: 0.4,
                    pointRadius: 0
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { labels: { color: '#F8FAFC' } },
                tooltip: {
                    mode: 'index',
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + formatCurrency(context.raw);
                        }
                    }
                }
            },
            scales: {
                x: { ticks: { color: '#94A3B8', maxTicksLimit: 10 }, grid: { display: false } },
                y: { 
                    ticks: { 
                        color: '#94A3B8',
                        callback: function(value) { return '₹' + (value / 100000).toFixed(0) + 'L'; }
                    }, 
                    grid: { color: 'rgba(255,255,255,0.05)' } 
                }
            }
        }
    });

    function calculate() {
        const initP = parseFloat(initialEl.value) || 0;
        const monthlyP = parseFloat(monthlyEl.value) || 0;
        const r = parseFloat(returnEl.value) / 100 / 12; // monthly rate
        const years = parseInt(yearsEl.value);

        returnVal.textContent = returnEl.value;
        yearsVal.textContent = years;

        let totalInvested = 0;
        let futureWealth = 0;
        
        const labels = [];
        const investedData = [];
        const wealthData = [];

        for (let i = 0; i <= years; i++) {
            labels.push('Year ' + i);
            
            if (i === 0) {
                investedData.push(initP);
                wealthData.push(initP);
            } else {
                const months = i * 12;
                const currentInvested = initP + (monthlyP * months);
                
                // FV = P(1+r/n)^nt + PMT * [((1+r/n)^nt - 1) / (r/n)] * (1+r/n)(optional)
                // For simplicity, regular compound formula:
                const fvLump = initP * Math.pow(1 + r, months);
                const fvSip = monthlyP * ((Math.pow(1 + r, months) - 1) / r) * (1 + r);
                const fvTotal = fvLump + fvSip;

                investedData.push(currentInvested);
                wealthData.push(fvTotal);

                if (i === years) {
                    totalInvested = currentInvested;
                    futureWealth = fvTotal;
                }
            }
        }

        investedEl.textContent = formatCurrency(totalInvested);
        wealthEl.textContent = formatCurrency(futureWealth);

        window.currentChart.data.labels = labels;
        window.currentChart.data.datasets[0].data = investedData;
        window.currentChart.data.datasets[1].data = wealthData;
        window.currentChart.update();
    }

    [initialEl, monthlyEl, returnEl, yearsEl].forEach(el => {
        el.addEventListener('input', calculate);
    });

    calculate();
}
