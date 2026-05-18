/* BuySooner roadmap data capture layer
   Purpose:
   - Capture prototype inputs into one clean roadmap data object.
   - Persist that object for roadmap.html and future roadmap pages.
*/

(function () {
  const STORAGE_KEY = "BuySoonerRoadmapData";

  function text(value) {
    return String(value == null ? "" : value).trim();
  }

  function num(value) {
    if (typeof value === "number") return Number.isFinite(value) ? value : 0;
    const parsed = Number(String(value == null ? "" : value).replace(/[^0-9.-]/g, ""));
    return Number.isFinite(parsed) ? parsed : 0;
  }

  function money(value) {
    return new Intl.NumberFormat("en-AU", {
      style: "currency",
      currency: "AUD",
      maximumFractionDigits: 0
    }).format(num(value));
  }

  function byId(id) {
    return document.getElementById(id);
  }

  function fieldValue(id) {
    const el = byId(id);
    if (!el) return "";
    if (el.type === "radio") {
      const checked = document.querySelector(`input[name="${el.name}"]:checked`);
      return checked ? text(checked.value || checked.id) : "";
    }
    if (el.type === "checkbox") return el.checked;
    return text(el.value != null ? el.value : el.textContent);
  }

  function firstExisting(ids) {
    for (const id of ids) {
      const value = fieldValue(id);
      if (value !== "" && value !== false) return value;
    }
    return "";
  }

  function firstNumber(ids) {
    for (const id of ids) {
      const value = fieldValue(id);
      if (value === "" || value === false) continue;
      const parsed = num(value);
      if (Number.isFinite(parsed)) return parsed;
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
    return "";
  }

  function collectAllInputs() {
    const values = {};
    document.querySelectorAll("input, select, textarea").forEach((el) => {
      const key = el.id || el.name;
      if (!key) return;
      if (el.type === "radio") {
        if (el.checked) values[key] = el.value || el.id || true;
        return;
      }
      if (el.type === "checkbox") {
        values[key] = !!el.checked;
        return;
      }
      values[key] = el.value;
    });
    return values;
  }

  function inferBuyerType(rawType) {
    const value = text(rawType).toLowerCase();
    if (value.includes("upgrade") || value.includes("upgrad") || value.includes("owner") || value.includes("current")) return "upgrader";
    if (value.includes("rent") || value.includes("renter") || value.includes("renting")) return "renter";
    return value || "renter";
  }

  function normaliseLvr(value) {
    const parsed = num(value);
    if (!parsed) return 0.8;
    return parsed > 1 ? parsed / 100 : parsed;
  }

  function calculateRoadmapDerived(data) {
    const price = num(data.property.targetPurchasePrice);
    const contribution = num(data.finance.customerContribution);
    let boost = num(data.finance.buySoonerBoost);
    if (!boost && price) boost = Math.max(0, price * 0.2 - contribution);
    const totalDeposit = contribution + boost;
    let estimatedBankLoan = num(data.finance.estimatedBankLoan);
    if (!estimatedBankLoan && price) estimatedBankLoan = Math.max(0, price - totalDeposit);
    const depositPercent = price ? totalDeposit / price : 0;

    return {
      buySoonerBoost: boost,
      totalDeposit,
      depositGap: boost,
      depositPercent,
      estimatedBankLoan,
      formatted: {
        targetPurchasePrice: money(price),
        customerContribution: money(contribution),
        buySoonerBoost: money(boost),
        totalDeposit: money(totalDeposit),
        depositGap: money(boost),
        estimatedBankLoan: money(estimatedBankLoan),
        currentRentMonthly: money(data.finance.currentRentMonthly),
        livingExpenses: money(data.finance.livingExpenses),
        debts: money(data.finance.debts),
        creditCardLimits: money(data.finance.creditCardLimits),
        income: money(data.customer.income),
        depositPercent: `${(depositPercent * 100).toFixed(1)}%`
      }
    };
  }

  function collectRoadmapData() {
    const rawInputs = collectAllInputs();
    const customerName = firstExisting(["customerName", "preName", "clientName", "fullName", "name", "buyerName", "applicantName"]);
    const buyerTypeRaw = checkedValue(["buyerSituation", "customerType", "buyerType", "journeyType", "ownershipStatus", "scenarioType"]) || firstExisting(["buyerSituation", "customerType", "buyerType", "journeyType", "ownershipStatus", "scenarioType"]);
    const propertyAddress = firstExisting(["address", "preAddress", "propertyAddress", "targetAddress", "targetPropertyAddress"]);
    const targetArea = firstExisting(["preSuburb", "targetSuburb", "targetArea", "suburb", "preferredSuburb", "targetLocation", "area"]);
    const timelineYears = firstNumber(["timelineSelect", "upgTimelineSelect", "refinanceStartYear", "refiStartYear"]) || 3;

    const data = {
      capturedAt: new Date().toISOString(),
      source: "BuySooner prototype",
      rawInputs,
      customer: {
        name: customerName || "Customer",
        buyerType: inferBuyerType(buyerTypeRaw),
        dependants: firstNumber(["preDependants", "preDependents", "dependants", "dependents", "numberOfDependants", "children"]) || 0,
        income: firstNumber(["preIncome", "income", "annualIncome", "grossIncome", "householdIncome", "combinedIncome"])
      },
      property: {
        suburb: targetArea || "your target area",
        address: propertyAddress,
        targetPurchasePrice: firstNumber(["purchasePrice", "prePrice", "targetPurchasePrice", "targetPrice", "propertyPrice", "homePrice"])
      },
      finance: {
        customerContribution: firstNumber(["deposit", "preSavings", "customerContribution", "cashContribution", "savings", "availableDeposit", "availableContribution"]),
        currentRentMonthly: firstNumber(["housingCost", "preRent", "currentRentMonthly", "monthlyRent", "rent", "currentRent", "monthlyHousingCost"]),
        livingExpenses: firstNumber(["preEstimatedLiving", "livingExpenses", "monthlyLivingExpenses", "expenses"]),
        debts: firstNumber(["preDebts", "debts", "monthlyDebts", "debtRepayments", "liabilities"]),
        creditCardLimits: firstNumber(["preCardLimits", "creditCardLimits", "creditCards", "cardLimits"]),
        buySoonerBoost: firstNumber(["buySoonerBoost", "boost", "depositBoost", "bsBoost"]),
        estimatedBankLoan: firstNumber(["estimatedBankLoan", "bankLoan", "seniorLoan", "seniorMortgage", "mortgageAmount"])
      },
      broker: {
        name: firstExisting(["preBrokerName", "brokerName", "broker", "brokerFullName"]) || "Alex B Broker",
        firm: firstExisting(["preBrokerFirm", "brokerFirm", "brokerCompany", "brokerBusiness"]) || "AB Broker and Associates",
        email: firstExisting(["preBrokerEmail", "brokerEmail", "brokerEmailAddress"]) || "",
        phone: firstExisting(["preBrokerPhone", "brokerPhone", "brokerMobile"]) || ""
      },
      assumptions: {
        growthRate: firstNumber(["marketGrowthSelect", "upgMarketGrowthSelect", "growthRate", "marketGrowth", "projectedGrowth"]) || 0.05,
        refinanceStartYear: timelineYears,
        refinanceEndYear: timelineYears + 2,
        refinanceTargetLvr: normaliseLvr(firstNumber(["refinanceTargetLvr", "targetLvr"]) || 0.8)
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
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "null"); } catch (_) { return null; }
  }

  function captureAndOpenRoadmap() {
    const data = saveRoadmapData();
    console.log("BuySoonerRoadmapData", data);
    window.location.href = "roadmap.html";
  }

  function captureAndPreview() {
    const data = saveRoadmapData();
    console.log("BuySoonerRoadmapData", data);
    alert("Roadmap data captured. Open the browser console or localStorage.BuySoonerRoadmapData to inspect it.");
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
