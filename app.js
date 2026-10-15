const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const compactCurrency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", notation: "compact", maximumFractionDigits: 2 });

const defaultPurchaseOrders = [
  { id: 1, poNumber: "PO-2026-1842", item: "Critical UPS maintenance", description: "Annual preventive maintenance and 24×7 emergency response for UPS systems.", classification: "OPEX", type: "Service", value: 1250000, supplier: "Schneider Electric", campus: "SGP01", term: "3 years", startDate: "2024-12-01", endDate: "2026-11-30", submitter: "Mei Lin", status: "Expiring" },
  { id: 2, poNumber: "PO-2026-1789", item: "High-density server racks", description: "Supply and installation of 180 high-density racks for capacity expansion.", classification: "CAPEX", type: "Hardware", value: 2840000, supplier: "Vertiv", campus: "TYO04", term: "One-time", startDate: "2026-03-14", endDate: "2026-12-20", submitter: "Kenji Sato", status: "Active" },
  { id: 3, poNumber: "PO-2026-1654", item: "DCIM enterprise licenses", description: "Regional DCIM platform subscription and premium support.", classification: "OPEX", type: "Software", value: 890000, supplier: "Sunbird Software", campus: "Regional", term: "3 years", startDate: "2025-07-01", endDate: "2028-06-30", submitter: "Arjun Rao", status: "Active" },
  { id: 4, poNumber: "PO-2026-1541", item: "Cooling tower refurbishment", description: "Mechanical refurbishment to improve cooling efficiency and reliability.", classification: "CAPEX", type: "Service", value: 1720000, supplier: "Johnson Controls", campus: "SYD03", term: "2 years", startDate: "2026-01-15", endDate: "2027-12-31", submitter: "Olivia Chen", status: "Active" },
  { id: 5, poNumber: "PO-2026-1398", item: "Network spares program", description: "Strategic router, switch and optical module spares pool.", classification: "CAPEX", type: "Hardware", value: 640000, supplier: "Cisco Systems", campus: "HYD01", term: "One-time", startDate: "2026-02-01", endDate: "2026-10-31", submitter: "Ravi Kumar", status: "Pending" },
  { id: 6, poNumber: "PO-2025-2987", item: "Security guarding services", description: "On-site physical security services and control room coverage.", classification: "OPEX", type: "Service", value: 3960000, supplier: "Securitas", campus: "SGP02", term: "3 years", startDate: "2024-11-01", endDate: "2027-10-31", submitter: "Mei Lin", status: "Active" },
  { id: 7, poNumber: "PO-2025-2651", item: "Generator control upgrade", description: "Control panel modernization for six standby generator sets.", classification: "CAPEX", type: "Hardware", value: 1180000, supplier: "Cummins", campus: "OSA02", term: "1 year", startDate: "2025-08-01", endDate: "2026-10-28", submitter: "Kenji Sato", status: "Expiring" },
  { id: 8, poNumber: "PO-2025-2214", item: "BMS support agreement", description: "Building management system support and software assurance.", classification: "OPEX", type: "Software", value: 540000, supplier: "Honeywell", campus: "MEL01", term: "2 years", startDate: "2025-01-01", endDate: "2026-12-31", submitter: "Olivia Chen", status: "Expiring" },
  { id: 9, poNumber: "PO-2024-1882", item: "Electrical testing services", description: "Regional arc flash and protection relay testing program.", classification: "OPEX", type: "Service", value: 775000, supplier: "ABB", campus: "Regional", term: "2 years", startDate: "2024-02-01", endDate: "2025-12-31", submitter: "Daniel Koh", status: "Completed" },
  { id: 10, poNumber: "PO-2023-1431", item: "Lithium-ion battery strings", description: "Replacement battery strings for UPS blocks A and B.", classification: "CAPEX", type: "Hardware", value: 2150000, supplier: "Eaton", campus: "PNQ02", term: "One-time", startDate: "2023-04-10", endDate: "2024-02-28", submitter: "Arjun Rao", status: "Completed" },
  { id: 11, poNumber: "PO-2022-0917", item: "Asset management platform", description: "Five-year regional enterprise asset management license.", classification: "CAPEX", type: "Software", value: 1320000, supplier: "IBM", campus: "Regional", term: "5 years", startDate: "2022-07-01", endDate: "2027-06-30", submitter: "Daniel Koh", status: "Active" },
  { id: 12, poNumber: "PO-2022-0744", item: "Chiller replacement", description: "Replacement and commissioning of two high-efficiency chillers.", classification: "CAPEX", type: "Hardware", value: 4480000, supplier: "Trane", campus: "SGP01", term: "One-time", startDate: "2022-01-15", endDate: "2023-03-30", submitter: "Mei Lin", status: "Completed" }
];

const defaultBudgetLines = [
  { id: 1, costCenter: "APAC-4102", description: "Server & network hardware refresh", campus: "Regional", classification: "CAPEX", category: "Hardware", owner: "Daniel Koh", priorActual: 6250000, budget: 6840000, actual: 6480000, notes: "Planned lifecycle refresh for EOL assets across eight campuses." },
  { id: 2, costCenter: "SG-4210", description: "Critical environment maintenance", campus: "SGP01", classification: "OPEX", category: "Services", owner: "Mei Lin", priorActual: 3180000, budget: 3370000, actual: 3520000, notes: "Includes inflation index and expanded UPS maintenance scope." },
  { id: 3, costCenter: "JP-4312", description: "Cooling plant modernization", campus: "TYO04", classification: "CAPEX", category: "Facilities", owner: "Kenji Sato", priorActual: 4250000, budget: 5100000, actual: 5240000, notes: "Phase two of energy-efficiency improvement program." },
  { id: 4, costCenter: "AU-4408", description: "Physical security services", campus: "SYD03", classification: "OPEX", category: "Services", owner: "Olivia Chen", priorActual: 1640000, budget: 1720000, actual: 1695000, notes: "Renewal assumes 3.2% labour indexation." },
  { id: 5, costCenter: "IN-4514", description: "Network spares & critical inventory", campus: "HYD01", classification: "CAPEX", category: "Hardware", owner: "Ravi Kumar", priorActual: 2150000, budget: 2380000, actual: 2210000, notes: "Rebalance regional pool after capacity expansion." },
  { id: 6, costCenter: "APAC-4601", description: "DCIM platform & analytics", campus: "Regional", classification: "OPEX", category: "Software", owner: "Arjun Rao", priorActual: 1120000, budget: 1250000, actual: 1190000, notes: "Enterprise license, support and energy analytics add-on." },
  { id: 7, costCenter: "SG-4204", description: "Electrical capacity expansion", campus: "SGP02", classification: "CAPEX", category: "Facilities", owner: "Mei Lin", priorActual: 4850000, budget: 5600000, actual: 5420000, notes: "New distribution boards and busway for Hall 4." },
  { id: 8, costCenter: "JP-4331", description: "Utilities & purchased energy", campus: "OSA02", classification: "OPEX", category: "Facilities", owner: "Kenji Sato", priorActual: 5800000, budget: 6220000, actual: 6710000, notes: "Tariff uplift risk under review; excludes renewable credits." },
  { id: 9, costCenter: "AU-4422", description: "Generator control upgrade", campus: "MEL01", classification: "CAPEX", category: "Hardware", owner: "Olivia Chen", priorActual: 950000, budget: 1180000, actual: 1180000, notes: "Control obsolescence remediation for four generators." },
  { id: 10, costCenter: "IN-4540", description: "Technical operations support", campus: "PNQ02", classification: "OPEX", category: "Services", owner: "Ravi Kumar", priorActual: 2860000, budget: 3040000, actual: 2970000, notes: "Managed operations contract including on-call coverage." },
  { id: 11, costCenter: "APAC-4688", description: "EAM software renewal", campus: "Regional", classification: "OPEX", category: "Software", owner: "Daniel Koh", priorActual: 780000, budget: 825000, actual: 810000, notes: "Renewal due June; consolidation opportunity under assessment." },
  { id: 12, costCenter: "APAC-4190", description: "Strategic growth reserve", campus: "Regional", classification: "CAPEX", category: "Hardware", owner: "Amanda Wang", priorActual: 1750000, budget: 2815000, actual: 0, notes: "Capacity and resilience investments pending business approval." }
];

const opportunities = [
  { title: "Network support consolidation", description: "Combine five campus support agreements under one regional master contract.", value: "$420K", timing: "Q1 FY2027", status: "Validated", confidence: 5, owner: "Daniel Koh" },
  { title: "Cooling optimization controls", description: "Deploy AI-assisted chilled water optimization across Singapore campuses.", value: "$360K", timing: "8-month payback", status: "In execution", confidence: 4, owner: "Mei Lin" },
  { title: "Software license harvesting", description: "Recover dormant DCIM, EAM and monitoring licenses across the region.", value: "$215K", timing: "Q4 FY2026", status: "Validated", confidence: 5, owner: "Arjun Rao" },
  { title: "UPS maintenance rebid", description: "Competitively rebid expiring Singapore and Japan maintenance scopes.", value: "$310K", timing: "Q2 FY2027", status: "Assessment", confidence: 3, owner: "Kenji Sato" },
  { title: "Critical spares pooling", description: "Centralize slow-moving critical inventory across Australia and India.", value: "$285K", timing: "Q3 FY2027", status: "Assessment", confidence: 3, owner: "Olivia Chen" },
  { title: "Renewable tariff restructure", description: "Align India power contracts with demand profile and green-energy targets.", value: "$250K", timing: "Q2 FY2027", status: "Discovery", confidence: 2, owner: "Ravi Kumar" }
];

let purchaseOrders = loadData("finops-purchase-orders", defaultPurchaseOrders);
let budgetLines = loadData("finops-budget-lines", defaultBudgetLines);
let budgetScope = "all";

const viewNames = { dashboard: "Executive overview", inventory: "PO & contract inventory", budget: "Budget planning & actuals", opportunities: "Cost optimization" };
const els = {
  breadcrumb: document.querySelector("#breadcrumbName"),
  headerAction: document.querySelector("#headerAction"),
  poTableBody: document.querySelector("#poTableBody"),
  budgetTableBody: document.querySelector("#budgetTableBody"),
  budgetTableFoot: document.querySelector("#budgetTableFoot"),
  toast: document.querySelector("#toast"),
  drawer: document.querySelector("#detailDrawer"),
  scrim: document.querySelector("#scrim")
};

initialize();

function initialize() {
  renderChart();
  populateFilters();
  renderPurchaseOrders();
  renderBudget();
  renderOpportunities();
  bindNavigation();
  bindActions();
}

function bindNavigation() {
  document.addEventListener("click", (event) => {
    const viewTrigger = event.target.closest("[data-view]");
    if (viewTrigger) {
      navigateTo(viewTrigger.dataset.view);
      if (window.innerWidth <= 820) closeOverlays();
    }
  });
  document.querySelector("#menuButton").addEventListener("click", () => {
    document.querySelector("#sidebar").classList.add("open");
    els.scrim.classList.add("show");
  });
  window.addEventListener("hashchange", () => navigateTo(location.hash.slice(1) || "dashboard", false));
  navigateTo(location.hash.slice(1) || "dashboard", false);
}

function navigateTo(view, updateHash = true) {
  if (!viewNames[view]) return;
  document.querySelectorAll("[data-view-panel]").forEach((panel) => panel.classList.toggle("active", panel.dataset.viewPanel === view));
  document.querySelectorAll(".nav-item").forEach((item) => item.classList.toggle("active", item.dataset.view === view));
  els.breadcrumb.textContent = viewNames[view];
  els.headerAction.style.display = view === "inventory" ? "" : "none";
  if (updateHash) history.pushState(null, "", `#${view}`);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function bindActions() {
  document.addEventListener("click", (event) => {
    const action = event.target.closest("[data-action]")?.dataset.action;
    if (action === "add-po") document.querySelector("#poDialog").showModal();
    if (action === "add-budget") document.querySelector("#budgetDialog").showModal();
    if (action === "export-pos") exportPurchaseOrders();
    if (action === "export-budget") exportBudget();
    if (action === "export-summary") exportSummary();
  });

  ["poSearch", "poYearFilter", "poTypeFilter", "poCampusFilter", "poStatusFilter"].forEach((id) => {
    document.querySelector(`#${id}`).addEventListener(id === "poSearch" ? "input" : "change", renderPurchaseOrders);
  });
  document.querySelector("#resetPoFilters").addEventListener("click", () => {
    ["poSearch", "poYearFilter", "poTypeFilter", "poCampusFilter", "poStatusFilter"].forEach((id) => document.querySelector(`#${id}`).value = "");
    renderPurchaseOrders();
  });
  document.querySelector("#budgetSearch").addEventListener("input", renderBudget);
  document.querySelectorAll("[data-budget-scope]").forEach((button) => button.addEventListener("click", () => {
    budgetScope = button.dataset.budgetScope;
    document.querySelectorAll("[data-budget-scope]").forEach((item) => item.classList.toggle("active", item === button));
    renderBudget();
  }));
  document.querySelector("#budgetYear").addEventListener("change", (event) => {
    if (event.target.value !== "FY2027") {
      showToast(`${event.target.value} loaded as a read-only historical comparison.`);
    } else {
      showToast("FY2027 planning workspace loaded.");
    }
  });
  document.querySelector("#globalSearch").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      document.querySelector("#poSearch").value = event.target.value;
      navigateTo("inventory");
      renderPurchaseOrders();
    }
  });
  document.querySelector("#poTableBody").addEventListener("click", (event) => {
    const row = event.target.closest("tr[data-id]");
    if (row) showPurchaseOrderDetail(Number(row.dataset.id));
  });
  document.querySelector("#budgetTableBody").addEventListener("change", (event) => {
    if (!event.target.matches("[data-actual-id]")) return;
    const line = budgetLines.find((item) => item.id === Number(event.target.dataset.actualId));
    const value = Number(event.target.value);
    if (!line || !Number.isFinite(value) || value < 0) {
      showToast("Enter a valid non-negative actual or forecast amount.");
      renderBudget();
      return;
    }
    line.actual = value;
    saveData("finops-budget-lines", budgetLines);
    renderBudget();
    showToast("Actual / forecast updated.");
  });
  document.querySelector("#poForm").addEventListener("submit", addPurchaseOrder);
  document.querySelector("#budgetForm").addEventListener("submit", addBudgetLine);
  document.querySelector("#closeDrawer").addEventListener("click", closeOverlays);
  els.scrim.addEventListener("click", closeOverlays);
  document.querySelector("#addOpportunityButton").addEventListener("click", () => showToast("Opportunity intake is ready for the next workflow integration."));
  document.addEventListener("keydown", (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      document.querySelector("#globalSearch").focus();
    }
    if (event.key === "Escape") closeOverlays();
  });
}

function renderChart() {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const planned = [3.6, 3.8, 3.7, 4.1, 3.9, 4.2, 4.0, 4.3, 4.1, 4.4, 4.2, 4.3];
  const actual = [3.4, 3.7, 3.9, 4.0, 3.7, 4.4, 4.2, 4.6, 4.3, 3.9, 0, 0];
  document.querySelector("#spendChart").innerHTML = months.map((month, index) => `
    <div class="chart-month">
      <div class="bar-pair">
        <i class="bar planned" style="height:${planned[index] / 5 * 100}%" data-value="$${planned[index]}M"></i>
        <i class="bar actual" style="height:${actual[index] / 5 * 100}%;opacity:${actual[index] ? 1 : .12}" data-value="${actual[index] ? `$${actual[index]}M` : "Forecast"}"></i>
      </div>
      <span>${month}</span>
    </div>`).join("");
}

function populateFilters() {
  const years = [...new Set(purchaseOrders.map((po) => po.startDate.slice(0, 4)))].sort().reverse();
  const campuses = [...new Set(purchaseOrders.map((po) => po.campus))].sort();
  document.querySelector("#poYearFilter").innerHTML = `<option value="">All years</option>${years.map((year) => `<option>${escapeHtml(year)}</option>`).join("")}`;
  document.querySelector("#poCampusFilter").innerHTML = `<option value="">All campuses</option>${campuses.map((campus) => `<option>${escapeHtml(campus)}</option>`).join("")}`;
  document.querySelector("#poNavCount").textContent = purchaseOrders.length;
}

function getFilteredPurchaseOrders() {
  const search = document.querySelector("#poSearch").value.trim().toLowerCase();
  const year = document.querySelector("#poYearFilter").value;
  const type = document.querySelector("#poTypeFilter").value;
  const campus = document.querySelector("#poCampusFilter").value;
  const status = document.querySelector("#poStatusFilter").value;
  return purchaseOrders.filter((po) => {
    const searchable = [po.poNumber, po.item, po.description, po.supplier, po.submitter].join(" ").toLowerCase();
    return (!search || searchable.includes(search)) && (!year || po.startDate.startsWith(year)) &&
      (!type || po.type === type) && (!campus || po.campus === campus) && (!status || po.status === status);
  });
}

function renderPurchaseOrders() {
  const rows = getFilteredPurchaseOrders();
  const totalValue = purchaseOrders.reduce((sum, item) => sum + item.value, 0);
  const active = purchaseOrders.filter((item) => item.status === "Active").length;
  const expiring = purchaseOrders.filter((item) => item.status === "Expiring").length;
  const suppliers = new Set(purchaseOrders.map((item) => item.supplier)).size;
  document.querySelector("#inventorySummary").innerHTML = [
    ["▦", "Total commitments", compactCurrency.format(totalValue)],
    ["✓", "Active contracts", active],
    ["!", "Expiring in 90 days", expiring],
    ["⌂", "Strategic suppliers", suppliers]
  ].map(([icon, label, value]) => `<div class="summary-item"><span>${icon}</span><div><small>${label}</small><strong>${value}</strong></div></div>`).join("");

  els.poTableBody.innerHTML = rows.length ? rows.map((po) => `
    <tr data-id="${po.id}" tabindex="0">
      <td><span class="cell-primary"><strong>${escapeHtml(po.item)}</strong><small>${escapeHtml(po.poNumber)} · ${escapeHtml(po.submitter)}</small></span></td>
      <td><span class="tag ${po.type.toLowerCase()}">${escapeHtml(po.type)}</span></td>
      <td>${escapeHtml(po.campus)}</td>
      <td>${escapeHtml(po.supplier)}</td>
      <td>${escapeHtml(po.classification)}</td>
      <td><span class="cell-primary"><strong>${escapeHtml(po.term)}</strong><small>Ends ${formatDate(po.endDate)}</small></span></td>
      <td><strong>${compactCurrency.format(po.value)}</strong></td>
      <td><span class="badge ${po.status.toLowerCase()}">${escapeHtml(po.status)}</span></td>
      <td><button class="icon-button row-action" aria-label="View ${escapeHtml(po.poNumber)}">···</button></td>
    </tr>`).join("") : `<tr><td colspan="9"><div class="empty-state">No commitments match the selected filters.</div></td></tr>`;
  document.querySelector("#poTableCount").textContent = `Showing ${rows.length} of ${purchaseOrders.length} commitments`;
}

function renderBudget() {
  const search = document.querySelector("#budgetSearch").value.trim().toLowerCase();
  const lines = budgetLines.filter((line) => {
    const scopeMatches = budgetScope === "all" || line.classification.toLowerCase() === budgetScope;
    const searchMatches = !search || [line.costCenter, line.description, line.campus, line.owner, line.category].join(" ").toLowerCase().includes(search);
    return scopeMatches && searchMatches;
  });
  els.budgetTableBody.innerHTML = lines.map((line) => {
    const variance = line.budget - line.actual;
    const varianceClass = variance >= 0 ? "positive" : "negative";
    return `<tr>
      <td><span class="cell-primary"><strong>${escapeHtml(line.description)}</strong><small>${escapeHtml(line.costCenter)} · ${escapeHtml(line.classification)}</small></span></td>
      <td>${escapeHtml(line.campus)}</td>
      <td><span class="tag ${line.category === "Services" ? "service" : line.category.toLowerCase()}">${escapeHtml(line.category)}</span></td>
      <td>${escapeHtml(line.owner)}</td>
      <td>${compactCurrency.format(line.priorActual)}</td>
      <td><strong>${compactCurrency.format(line.budget)}</strong></td>
      <td><input type="number" min="0" step="1000" value="${line.actual}" data-actual-id="${line.id}" aria-label="Actual or forecast for ${escapeHtml(line.description)}"></td>
      <td class="variance ${varianceClass}">${variance >= 0 ? "+" : "−"}${compactCurrency.format(Math.abs(variance))}</td>
      <td class="notes-cell" title="${escapeHtml(line.notes)}">${escapeHtml(line.notes)}</td>
    </tr>`;
  }).join("");
  const totals = lines.reduce((sum, line) => ({ prior: sum.prior + line.priorActual, budget: sum.budget + line.budget, actual: sum.actual + line.actual }), { prior: 0, budget: 0, actual: 0 });
  const totalVariance = totals.budget - totals.actual;
  els.budgetTableFoot.innerHTML = `<tr><td colspan="4">Filtered total · ${lines.length} lines</td><td>${compactCurrency.format(totals.prior)}</td><td>${compactCurrency.format(totals.budget)}</td><td>${compactCurrency.format(totals.actual)}</td><td class="variance ${totalVariance >= 0 ? "positive" : "negative"}">${totalVariance >= 0 ? "+" : "−"}${compactCurrency.format(Math.abs(totalVariance))}</td><td></td></tr>`;

  const allBudget = budgetLines.reduce((sum, line) => sum + line.budget, 0);
  const capex = budgetLines.filter((line) => line.classification === "CAPEX").reduce((sum, line) => sum + line.budget, 0);
  document.querySelector("#proposedBudget").textContent = compactCurrency.format(allBudget);
  document.querySelector("#capexBudget").textContent = compactCurrency.format(capex);
  document.querySelector("#opexBudget").textContent = compactCurrency.format(allBudget - capex);
}

function renderOpportunities() {
  document.querySelector("#opportunityGrid").innerHTML = opportunities.map((item) => `
    <article class="opportunity-card">
      <header><span><svg viewBox="0 0 24 24"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg></span><span class="badge ${item.status === "Validated" ? "active" : item.status === "In execution" ? "pending" : "expiring"}">${escapeHtml(item.status)}</span></header>
      <h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.description)}</p>
      <div class="opportunity-value"><div><small>Annual value</small><strong>${item.value}</strong></div><div><small>Realization</small><strong>${escapeHtml(item.timing)}</strong></div></div>
      <div class="opportunity-footer"><span>Owner · ${escapeHtml(item.owner)}</span><span class="confidence" title="${item.confidence} of 5 confidence">${[1,2,3,4,5].map((n) => `<i class="${n <= item.confidence ? "filled" : ""}"></i>`).join("")}</span></div>
    </article>`).join("");
}

function addPurchaseOrder(event) {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const data = Object.fromEntries(new FormData(form));
  if (data.endDate < data.startDate) {
    showToast("Contract end date must be on or after the start date.");
    return;
  }
  purchaseOrders.unshift({ ...data, id: Date.now(), value: Number(data.value), status: "Active" });
  saveData("finops-purchase-orders", purchaseOrders);
  form.reset();
  document.querySelector("#poDialog").close();
  populateFilters();
  renderPurchaseOrders();
  showToast(`${data.poNumber} was added to the inventory.`);
}

function addBudgetLine(event) {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const data = Object.fromEntries(new FormData(form));
  budgetLines.push({ ...data, id: Date.now(), priorActual: Number(data.priorActual), budget: Number(data.budget), actual: 0 });
  saveData("finops-budget-lines", budgetLines);
  form.reset();
  document.querySelector("#budgetDialog").close();
  renderBudget();
  showToast(`${data.costCenter} was added to the FY2027 plan.`);
}

function showPurchaseOrderDetail(id) {
  const po = purchaseOrders.find((item) => item.id === id);
  if (!po) return;
  document.querySelector("#drawerTitle").textContent = po.poNumber;
  document.querySelector("#drawerContent").innerHTML = `
    <div class="detail-hero"><span class="badge ${po.status.toLowerCase()}">${escapeHtml(po.status)}</span><h2>${escapeHtml(po.item)}</h2><p>${escapeHtml(po.description)}</p></div>
    <div class="detail-grid">
      <div><small>Total value</small><strong>${currency.format(po.value)}</strong></div>
      <div><small>Classification</small><strong>${escapeHtml(po.classification)} · ${escapeHtml(po.type)}</strong></div>
      <div><small>Supplier</small><strong>${escapeHtml(po.supplier)}</strong></div>
      <div><small>Campus</small><strong>${escapeHtml(po.campus)}</strong></div>
      <div><small>Contract term</small><strong>${escapeHtml(po.term)}</strong></div>
      <div><small>Submitted by</small><strong>${escapeHtml(po.submitter)}</strong></div>
      <div><small>Start date</small><strong>${formatDate(po.startDate)}</strong></div>
      <div><small>End date</small><strong>${formatDate(po.endDate)}</strong></div>
    </div>
    <div class="drawer-section"><h3>Commitment timeline</h3><div class="timeline"><div><strong>Contract commenced</strong><small>${formatDate(po.startDate)}</small></div><div><strong>Current status · ${escapeHtml(po.status)}</strong><small>Last reviewed 15 October 2026</small></div><div><strong>Contract end / renewal</strong><small>${formatDate(po.endDate)}</small></div></div></div>`;
  els.drawer.classList.add("open");
  els.drawer.setAttribute("aria-hidden", "false");
  els.scrim.classList.add("show");
}

function closeOverlays() {
  document.querySelector("#sidebar").classList.remove("open");
  els.drawer.classList.remove("open");
  els.drawer.setAttribute("aria-hidden", "true");
  els.scrim.classList.remove("show");
}

function exportPurchaseOrders() {
  const columns = ["PO Number", "Item", "Description", "CAPEX/OPEX", "Type", "Total Value USD", "Supplier", "Campus", "Contract Term", "Start Date", "End Date", "Submitter", "Status"];
  const rows = getFilteredPurchaseOrders().map((po) => [po.poNumber, po.item, po.description, po.classification, po.type, po.value, po.supplier, po.campus, po.term, po.startDate, po.endDate, po.submitter, po.status]);
  downloadCsv("APAC-PO-Contract-Inventory.csv", columns, rows);
}

function exportBudget() {
  const columns = ["Cost Center", "Description", "Campus", "CAPEX/OPEX", "Category", "Owner", "FY2026 Actual USD", "FY2027 Budget USD", "Actual or Forecast USD", "Variance USD", "Business Justification"];
  const rows = budgetLines.map((line) => [line.costCenter, line.description, line.campus, line.classification, line.category, line.owner, line.priorActual, line.budget, line.actual, line.budget - line.actual, line.notes]);
  downloadCsv("APAC-FY2027-Budget-Actuals.csv", columns, rows);
}

function exportSummary() {
  const totalBudget = budgetLines.reduce((sum, line) => sum + line.budget, 0);
  const totalForecast = budgetLines.reduce((sum, line) => sum + line.actual, 0);
  const columns = ["Metric", "Value USD", "Comment"];
  const rows = [
    ["FY2027 proposed budget", totalBudget, "Current country submissions"],
    ["Actual / forecast", totalForecast, "Editable working forecast"],
    ["Forecast variance", totalBudget - totalForecast, totalBudget >= totalForecast ? "Under plan" : "Over plan"],
    ["Active PO value", purchaseOrders.filter((po) => po.status === "Active").reduce((sum, po) => sum + po.value, 0), "Active commitments"],
    ["Identified savings", 1840000, "Seven active opportunities"]
  ];
  downloadCsv("APAC-FinOps-Executive-Brief.csv", columns, rows);
}

function downloadCsv(filename, columns, rows) {
  const csv = [columns, ...rows].map((row) => row.map(csvCell).join(",")).join("\r\n");
  const blob = new Blob(["\ufeff", csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
  showToast(`${filename} exported successfully.`);
}

function csvCell(value) {
  const text = String(value ?? "");
  return `"${text.replaceAll('"', '""')}"`;
}

function loadData(key, fallback) {
  try {
    const data = JSON.parse(localStorage.getItem(key));
    return Array.isArray(data) ? data : structuredClone(fallback);
  } catch (error) {
    console.error(`Failed to load ${key}`, error);
    return structuredClone(fallback);
  }
}

function saveData(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Failed to save ${key}`, error);
    showToast("This change could not be saved in the browser.");
  }
}

function formatDate(value) {
  return new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric", timeZone: "UTC" }).format(new Date(`${value}T00:00:00Z`));
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[character]);
}

let toastTimer;
function showToast(message) {
  clearTimeout(toastTimer);
  els.toast.textContent = message;
  els.toast.classList.add("show");
  toastTimer = setTimeout(() => els.toast.classList.remove("show"), 3000);
}
