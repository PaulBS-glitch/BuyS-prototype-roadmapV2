/* BuySooner roadmap data capture layer
   Purpose: keep the large prototype index.html stable and expose one clean data object for roadmap rendering.
   Usage from the final prototype action:
   BSRoadmap.captureAndOpenRoadmap();
*/
(function () {
  const STORAGE_KEY = 'BuySoonerRoadmapData';

  function text(value) {
    return String(value == null ? '' : value).trim();
  }

  function num(value) {
    if (typeof value === 'number') return Number.isFinite(value) ? value : 0;
    const cleaned = String(value == null ? '' : value).replace(/[^0-9.-]/g, '');
    const parsed = Number(cleaned);
    return Number.isFinite(parsed) ? parsed : 0;
  }

  function money(value) {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      maximumFractionDigits: 0
    }).format(num(value));
  }

  function byId(id) {
    return document.getElementById(id);
  }

  function fieldValue(id) {
    const el = byId(id);
    if (!el) return '';
    if (el.type === 'radio') {
      const checked = document.querySelector(`input[name="${el.name}"]:checked`);
      return checked ? checked.value : '';
    }
    if (el.type === 'checkbox') return el.checked;
    return text(el.value != null ? el.value : el.textContent);
  }

  function firstExisting(ids) {
    for (const id of ids) {
      const value = fieldValue(id);
      if (value !== '' && value !== false) return value;
    }
    return '';
  }

  function firstNumber(ids) {
    for (const id of ids) {
      const value = fieldValue(id);
      const parsed = num(value);
      if (parsed) return parsed;
    }
    return 0;
  }

  function checkedValue(namesOrIds) {
    for (const key of namesOrIds) {
      const checkedByName = document.querySelector(`input[name="${key}"]:checked`);
      if (checkedByName) return text(checkedByName.value || checkedByName.id);
      const checkedById = byId(key);
      if (checkedById && checkedById.checked) return text(checkedById.value || checkedById.id);
    }
    return '';
  }

  function collectAllInputs() {
    const values = {};
    document.querySelectorAll('input, select, textarea').forEach((el) => {
      const key = el.id || el.name;
      if (!key) return;
      if (el.type === 'radio') {
        if (el.checked) values[key] = el.value || el.id || true;
        return;
      }
      if (el.type === 'checkbox') {
        values[key] = !!el.checked;
        return;
      }
      values[key] = el.value;
    });
    return values;
  }

  function inferBuyerType(rawType) {
    const value = text(rawType).toLowerCase();
    if (value.includes('upgrade') || value.includes('owner') || value.includes('current')) return 'upgrader';
    if (value.includes('rent')) return 'renter';
    return value || 'renter';
  }

  function calculateRoadmapDerived(data) {
    const price = num(data.property.targetPurchasePrice);
    const contribution = num(data.finance.customerContribution);
    let boost = num(data.finance.buySoonerBoost);

    if (!boost && price) {
      boost = Math.max(0, price * 0.2 - contribution);
    }

    const totalDeposit = contribution + boost;
    let estimatedBankLoan = num(data.finance.estimatedBankLoan);
    if (!estimatedBankLoan && price) {
      estimatedBankLoan = Math.max(0, price - totalDeposit);
    }

    const depositPercent = price ? totalDeposit / price : 0;
    const depositGap = boost;

    return {
      buySoonerBoost: boost,
      totalDeposit,
      depositGap,
      depositPercent,
      estimatedBankLoan,
      formatted: {
        targetPurchasePrice: money(price),
        customerContribution: money(contribution),
        buySoonerBoost: money(boost),
        totalDeposit: money(totalDeposit),
        depositGap: money(depositGap),
        estimatedBankLoan: money(estimatedBankLoan),
        currentRentMonthly: money(data.finance.currentRentMonthly),
        depositPercent: `${(depositPercent * 100).toFixed(1)}%`
      }
    };
  }

  function collectRoadmapData() {
    const rawInputs = collectAllInputs();

    const customerName = firstExisting([
      'customerName', 'clientName', 'fullName', 'name', 'buyerName', 'applicantName'
    ]) || rawInputs.customerName || rawInputs.clientName || '';

    const buyerTypeRaw = checkedValue([
      'customerType', 'buyerType', 'journeyType', 'ownershipStatus', 'scenarioType'
    ]) || firstExisting(['customerType', 'buyerType', 'journeyType', 'ownershipStatus', 'scenarioType']);

    const buyerType = inferBuyerType(buyerTypeRaw);

    const targetArea = firstExisting([
      'targetSuburb', 'targetArea', 'suburb', 'preferredSuburb', 'targetLocation', 'area'
    ]);

    const propertyAddress = firstExisting([
      'propertyAddress', 'targetAddress', 'address', 'targetPropertyAddress'
    ]);

    const targetPurchasePrice = firstNumber([
      'targetPurchasePrice', 'purchasePrice', 'targetPrice', 'propertyPrice', 'homePrice'
    ]);

    const customerContribution = firstNumber([
      'customerContribution', 'cashContribution', 'deposit', 'savings', 'availableDeposit', 'availableContribution'
    ]);

    const buySoonerBoost = firstNumber([
      'buySoonerBoost', 'boost', 'depositBoost', 'bsBoost'
    ]);

    const estimatedBankLoan = firstNumber([
      'estimatedBankLoan', 'bankLoan', 'seniorLoan', 'seniorMortgage', 'mortgageAmount'
    ]);

    const currentRentMonthly = firstNumber([
      'currentRentMonthly', 'monthlyRent', 'rent', 'currentRent', 'housingCost', 'monthlyHousingCost'
    ]);

    const income = firstNumber([
      'income', 'annualIncome', 'grossIncome', 'householdIncome', 'combinedIncome'
    ]);

    const dependants = firstNumber([
      'dependants', 'dependents', 'numberOfDependants', 'children'
    ]);

    const livingExpenses = firstNumber([
      'livingExpenses', 'monthlyLivingExpenses', 'expenses'
    ]);

    const debts = firstNumber([
      'debts', 'monthlyDebts', 'debtRepayments', 'liabilities'
    ]);

    const creditCardLimits = firstNumber([
      'creditCardLimits', 'creditCards', 'cardLimits'
    ]);

    const data = {
      capturedAt: new Date().toISOString(),
      source: 'BuySooner prototype',
      rawInputs,
      customer: {
        name: customerName || 'Customer',
        buyerType,
        dependants,
        income
      },
      property: {
        suburb: targetArea || 'your target area',
        address: propertyAddress,
        targetPurchasePrice
      },
      finance: {
        customerContribution,
        currentRentMonthly,
        livingExpenses,
        debts,
        creditCardLimits,
        buySoonerBoost,
        estimatedBankLoan
      },
      broker: {
        name: firstExisting(['brokerName', 'broker', 'brokerFullName']) || 'Your broker',
        firm: firstExisting(['brokerFirm', 'brokerCompany', 'brokerBusiness']) || '',
        email: firstExisting(['brokerEmail', 'brokerEmailAddress']) || '',
        phone: firstExisting(['brokerPhone', 'brokerMobile']) || ''
      },
      assumptions: {
        growthRate: firstNumber(['growthRate', 'marketGrowth', 'projectedGrowth']) || 0.05,
        refinanceStartYear: firstNumber(['refinanceStartYear', 'refiStartYear']) || 3,
        refinanceEndYear: firstNumber(['refinanceEndYear', 'refiEndYear']) || 5,
        refinanceTargetLvr: firstNumber(['refinanceTargetLvr', 'targetLvr']) || 0.8
      },
      derived: {}
    };

    data.derived = calculateRoadmapDerived(data);
    data.finance.buySoonerBoost = data.derived.buySoonerBoost;
    data.finance.estimatedBankLoan = data.derived.estimatedBankLoan;

    return data;
  }

  function saveRoadmapData(data) {
    const finalData = data || collectRoadmapData();
    window.BuySoonerRoadmapData = finalData;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(finalData));
    return finalData;
  }

  function loadRoadmapData() {
    if (window.BuySoonerRoadmapData) return window.BuySoonerRoadmapData;
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
    } catch (_) {
      return null;
    }
  }

  function captureAndOpenRoadmap() {
    const data = saveRoadmapData();
    console.log('BuySoonerRoadmapData', data);
    window.location.href = 'roadmap.html';
  }

  function captureAndPreview() {
    const data = saveRoadmapData();
    console.log('BuySoonerRoadmapData', data);
    alert('Roadmap data captured. Open the browser console or localStorage.BuySoonerRoadmapData to inspect it.');
    return data;
  }

  window.BSRoadmap = {
    collect: collectRoadmapData,
    derive: calculateRoadmapDerived,
    save: saveRoadmapData,
    load: loadRoadmapData,
    captureAndOpenRoadmap,
    captureAndPreview,
    money
  };
})();
