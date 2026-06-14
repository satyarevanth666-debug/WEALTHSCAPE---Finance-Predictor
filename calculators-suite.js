// calculators-suite.js

// Core Investment Calculators: SIP, Lumpsum, Compound, CAGR, ROI, FV, PV, Inflation

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
    window[name] = function() {
        return `\n        <div class="glass-card">\n            <h2 class=\"mb-3\">${name.replace(/render|Calculator|Alt/g, ' ').trim()}</h2>\n            <p class=\"muted\">Placeholder - will implement detailed inputs and formulas on request.</p>\n        </div>\n        `;
    };
    window['init' + name.replace('render', '')] = function() {
        // no-op placeholder init
    };
});
