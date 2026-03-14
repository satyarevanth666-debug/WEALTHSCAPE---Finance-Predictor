// delayImpact.js

function renderDelayImpact() {
    return `
        <div class="glass-card">
            <h2 class="mb-3">Cost of Delay Simulator</h2>
            <div class="simulator-grid">
                <!-- Column 1: Inputs -->
                <div class="col-form">
                    <div class="input-group">
                        <label for="delay-invest">Monthly Investment (₹)</label>
                        <input type="number" id="delay-invest" class="input-control" value="10000" step="1000">
                    </div>
                    <div class="input-group">
                        <label for="delay-return">Expected Annual Return: <span id="delay-return-val">12</span>%</label>
                        <input type="range" id="delay-return" min="4" max="20" value="12" step="0.5">
                    </div>
                    <div class="input-group">
                        <label for="delay-years">Total Investment Horizon: <span id="delay-years-val">25</span> years</label>
                        <input type="range" id="delay-years" min="10" max="40" value="25">
                    </div>
                    <div class="input-group">
                        <label for="delay-wait">Delay Investing By: <span id="delay-wait-val" style="color: #EF4444;">5</span> years</label>
                        <input type="range" id="delay-wait" min="1" max="15" value="5">
                    </div>
                </div>
                
                <!-- Column 2: Results -->
                <div class="col-results">
                    <div class="result-box" style="background: rgba(16, 185, 129, 0.1); border-color: rgba(16, 185, 129, 0.2);">
                        <div class="result-label" style="color: #F8FAFC;">Investor A (Starts Now)</div>
                        <div class="result-value" id="delay-wealth-a" style="color: #10B981;">₹0</div>
                    </div>
                    <div class="result-box" style="background: rgba(239, 68, 68, 0.1); border-color: rgba(239, 68, 68, 0.2);">
                        <div class="result-label" style="color: #F8FAFC;">Investor B (Starts Late)</div>
                        <div class="result-value" id="delay-wealth-b" style="color: #EF4444;">₹0</div>
                    </div>
                    
                    <div class="insight-box mt-4" style="border-left-color: #EF4444;">
                        <i class="fa-solid fa-clock insight-icon" style="color: #EF4444;"></i>
                        <div class="insight-text">
                            <strong>Insight:</strong> Waiting just <span id="insight-wait-yrs"></span> years costs you <strong id="insight-lost-wealth" style="color: #EF4444;"></strong>! Starting earlier gives compounding more time.
                        </div>
                    </div>
                </div>

                <!-- Column 3: Chart -->
                <div class="chart-col">
                    <div class="chart-container">
                        <canvas id="delayChart"></canvas>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function initDelayImpact() {
    const investEl = document.getElementById('delay-invest');
    const returnEl = document.getElementById('delay-return');
    const yearsEl = document.getElementById('delay-years');
    const waitEl = document.getElementById('delay-wait');

    const returnVal = document.getElementById('delay-return-val');
    const yearsVal = document.getElementById('delay-years-val');
    const waitVal = document.getElementById('delay-wait-val');

    const wealthAEl = document.getElementById('delay-wealth-a');
    const wealthBEl = document.getElementById('delay-wealth-b');
    
    const insightWaitYrs = document.getElementById('insight-wait-yrs');
    const insightLostWealth = document.getElementById('insight-lost-wealth');

    const ctx = document.getElementById('delayChart').getContext('2d');
    
    if (window.currentChart) {
        window.currentChart.destroy();
    }
    
    window.currentChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [
                {
                    label: 'Investor A (Starts Now)',
                    data: [],
                    borderColor: '#10B981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    fill: true,
                    tension: 0.4
                },
                {
                    label: 'Investor B (Starts Late)',
                    data: [],
                    borderColor: '#EF4444',
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
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
                        label: function(context) {
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
                        callback: function(value) { return '₹' + (value / 100000).toFixed(1) + 'L'; }
                    }, 
                    grid: { color: 'rgba(255,255,255,0.05)' } 
                }
            }
        }
    });

    function calculate() {
        const P = parseFloat(investEl.value) || 0;
        const r = parseFloat(returnEl.value) / 100 / 12; // monthly rate
        const horizon = parseInt(yearsEl.value);
        let delay = parseInt(waitEl.value);

        if (delay >= horizon) {
            delay = horizon - 1;
            waitEl.value = delay;
        }

        returnVal.textContent = returnEl.value;
        yearsVal.textContent = horizon;
        waitVal.textContent = delay;
        insightWaitYrs.textContent = delay;

        let finalWealthA = 0;
        let finalWealthB = 0;
        
        const labels = [];
        const dataA = [];
        const dataB = [];

        for (let i = 1; i <= horizon; i++) {
            labels.push('Year ' + i);
            
            // Investor A
            const monthsA = i * 12;
            const fvA = P * ((Math.pow(1 + r, monthsA) - 1) / r) * (1 + r);
            dataA.push(fvA);

            // Investor B
            let fvB = 0;
            if (i > delay) {
                const monthsB = (i - delay) * 12;
                fvB = P * ((Math.pow(1 + r, monthsB) - 1) / r) * (1 + r);
            }
            dataB.push(fvB);

            if (i === horizon) {
                finalWealthA = fvA;
                finalWealthB = fvB;
            }
        }

        wealthAEl.textContent = formatCurrency(finalWealthA);
        wealthBEl.textContent = formatCurrency(finalWealthB);
        insightLostWealth.textContent = formatCurrency(finalWealthA - finalWealthB);

        window.currentChart.data.labels = labels;
        window.currentChart.data.datasets[0].data = dataA;
        window.currentChart.data.datasets[1].data = dataB;
        window.currentChart.update();
    }

    [investEl, returnEl, yearsEl, waitEl].forEach(el => {
        el.addEventListener('input', calculate);
    });

    calculate();
}
