// goalPlanner.js

function renderGoalPlanner() {
    return `
        <div class="glass-card">
            <h2 class="mb-3">Financial Goal Planner</h2>
            <div class="simulator-grid">
                <!-- Column 1: Inputs -->
                <div class="col-form">
                    <div class="input-group">
                        <label for="goal-type">Select Your Goal</label>
                        <select id="goal-type" class="input-control" style="background: rgba(15, 23, 42, 0.9);">
                            <option value="house">Buy a House</option>
                            <option value="education">Higher Education</option>
                            <option value="retirement">Retirement Corpus</option>
                            <option value="custom">Custom Goal</option>
                        </select>
                    </div>
                    <div class="input-group">
                        <label for="goal-target">Target Amount (₹)</label>
                        <input type="number" id="goal-target" class="input-control" value="10000000" step="100000">
                    </div>
                    <div class="input-group">
                        <label for="goal-years">Years to Achieve: <span id="goal-years-val">15</span> years</label>
                        <input type="range" id="goal-years" min="1" max="40" value="15">
                    </div>
                    <div class="input-group">
                        <label for="goal-return">Expected Annual Return: <span id="goal-return-val">12</span>%</label>
                        <input type="range" id="goal-return" min="4" max="25" value="12" step="0.5">
                    </div>
                </div>
                
                <!-- Column 2: Results -->
                <div class="col-results" style="display: flex; flex-direction: column; justify-content: flex-start;">
                    <div class="result-box" style="background: rgba(109, 40, 217, 0.15); border-color: rgba(109, 40, 217, 0.3);">
                        <div class="result-label" style="color: #F8FAFC;">Required Monthly Investment</div>
                        <div class="result-value" id="goal-monthly-required" style="color: #A78BFA; font-size: 2.2rem;">₹0</div>
                    </div>
                    
                    <div class="insight-box mt-4" style="border-left-color: #A78BFA;">
                        <i class="fa-solid fa-bullseye insight-icon" style="color: #A78BFA;"></i>
                        <div class="insight-text">
                            <strong>Insight:</strong> To reach <strong id="insight-goal-target"></strong> in <span id="insight-goal-years"></span> years, you need to invest methodically.
                        </div>
                    </div>
                </div>

                <!-- Column 3: Chart -->
                <div class="chart-col">
                    <div class="chart-container">
                        <canvas id="goalChart"></canvas>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function initGoalPlanner() {
    const typeEl = document.getElementById('goal-type');
    const targetEl = document.getElementById('goal-target');
    const yearsEl = document.getElementById('goal-years');
    const returnEl = document.getElementById('goal-return');

    const yearsVal = document.getElementById('goal-years-val');
    const returnVal = document.getElementById('goal-return-val');

    const requiredEl = document.getElementById('goal-monthly-required');
    const insightTarget = document.getElementById('insight-goal-target');
    const insightYears = document.getElementById('insight-goal-years');

    const ctx = document.getElementById('goalChart').getContext('2d');
    
    if (window.currentChart) {
        window.currentChart.destroy();
    }
    
    window.currentChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Principal Invested', 'Estimated Returns (Wealth Gained)'],
            datasets: [
                {
                    data: [0, 0],
                    backgroundColor: ['rgba(139, 92, 246, 0.8)', 'rgba(16, 185, 129, 0.8)'],
                    borderWidth: 0,
                    hoverOffset: 4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom', labels: { color: '#F8FAFC', padding: 20 } },
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

    typeEl.addEventListener('change', (e) => {
        const val = e.target.value;
        if(val === 'house') targetEl.value = 15000000;
        else if(val === 'education') targetEl.value = 5000000;
        else if(val === 'retirement') targetEl.value = 50000000;
        calculate();
    });

    function calculate() {
        const target = parseFloat(targetEl.value) || 0;
        const years = parseInt(yearsEl.value);
        const r = parseFloat(returnEl.value) / 100 / 12;

        yearsVal.textContent = years;
        returnVal.textContent = returnEl.value;
        
        insightTarget.textContent = formatCurrency(target);
        insightYears.textContent = years;

        const months = years * 12;
        
        // FV = P * [(1+r)^n - 1] / r * (1+r)
        // P = FV / ( [(1+r)^n - 1] / r * (1+r) )
        let P = 0;
        if (r > 0) {
            P = target / ( ((Math.pow(1 + r, months) - 1) / r) * (1 + r) );
        } else {
            P = target / months;
        }

        requiredEl.textContent = formatCurrency(P);

        const totalInvested = P * months;
        const totalReturns = target - totalInvested;

        window.currentChart.data.datasets[0].data = [totalInvested, totalReturns > 0 ? totalReturns : 0];
        window.currentChart.update();
    }

    [targetEl, yearsEl, returnEl].forEach(el => {
        el.addEventListener('input', calculate);
    });

    calculate();
}
