// inflationSimulator.js

function renderInflationSimulator() {
    return `
        <div class="glass-card">
            <h2 class="mb-3">Inflation Reality Simulator</h2>
            <div class="simulator-grid">
                <!-- Column 1: Inputs -->
                <div class="col-form">
                    <div class="input-group">
                        <label for="inf-item">Current Cost of an Item (₹)</label>
                        <input type="number" id="inf-item" class="input-control" value="80000" step="1000">
                    </div>
                    <div class="input-group">
                        <label for="inf-rate">Estimated Annual Inflation: <span id="inf-rate-val">6</span>%</label>
                        <input type="range" id="inf-rate" min="1" max="15" value="6" step="0.5">
                    </div>
                </div>
                
                <!-- Column 2: Results -->
                <div class="col-results">
                    <div class="result-box" style="background: rgba(139, 92, 246, 0.1); border-color: rgba(139, 92, 246, 0.2);">
                        <div class="result-label" style="color: #F8FAFC;">Future Cost in 10 Years</div>
                        <div class="result-value" id="inf-future-10" style="color: var(--secondary-start);">₹0</div>
                    </div>
                    <div class="result-box" style="background: rgba(239, 68, 68, 0.1); border-color: rgba(239, 68, 68, 0.2);">
                        <div class="result-label" style="color: #F8FAFC;">Future Cost in 20 Years</div>
                        <div class="result-value" id="inf-future-20" style="color: #EF4444;">₹0</div>
                    </div>
                    
                    <div class="insight-box mt-4" style="border-left-color: #EF4444;">
                        <i class="fa-solid fa-money-bill-trend-up insight-icon" style="color: #EF4444;"></i>
                        <div class="insight-text">
                            <strong>Insight:</strong> Inflation silently reduces purchasing power. If your wealth doesn't grow faster than inflation, you are losing money.
                        </div>
                    </div>
                </div>

                <!-- Column 3: Chart -->
                <div class="chart-col">
                    <div class="chart-container">
                        <canvas id="inflationChart"></canvas>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function initInflationSimulator() {
    const itemEl = document.getElementById('inf-item');
    const rateEl = document.getElementById('inf-rate');
    const rateVal = document.getElementById('inf-rate-val');

    const future10El = document.getElementById('inf-future-10');
    const future20El = document.getElementById('inf-future-20');

    const ctx = document.getElementById('inflationChart').getContext('2d');

    if (window.currentChart) {
        window.currentChart.destroy();
    }

    window.currentChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Today', '5 Years', '10 Years', '15 Years', '20 Years'],
            datasets: [
                {
                    label: 'Projected Cost',
                    data: [],
                    borderColor: '#EF4444',
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    fill: true,
                    tension: 0.1,
                    pointBackgroundColor: '#EF4444',
                    pointRadius: 6
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
                        callback: function (value) { return '₹' + (value / 1000).toFixed(0) + 'K'; }
                    },
                    grid: { color: 'rgba(255,255,255,0.05)' }
                }
            }
        }
    });

    function calculate() {
        const PV = parseFloat(itemEl.value) || 0;
        const inflation = parseFloat(rateEl.value) / 100;

        rateVal.textContent = rateEl.value;

        const yearsArr = [0, 5, 10, 15, 20];
        const costData = [];

        yearsArr.forEach(year => {
            const fv = PV * Math.pow(1 + inflation, year);
            costData.push(fv);

            if (year === 10) {
                future10El.textContent = formatCurrency(fv);
            }
            if (year === 20) {
                future20El.textContent = formatCurrency(fv);
            }
        });

        window.currentChart.data.datasets[0].data = costData;
        window.currentChart.update();
    }

    [itemEl, rateEl].forEach(el => {
        el.addEventListener('input', calculate);
    });

    calculate();
}
