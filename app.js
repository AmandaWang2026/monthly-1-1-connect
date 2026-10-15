const successIndicators = [
  "Consistently demonstrate and often exceed Microsoft cultural expectations and values through behaviors aligned with respect, integrity, accountability, and growth mindset.",
  "Consistently demonstrate strong ownership and accountability for career growth, including proactive goal setting, continuous learning, and measurable contribution aligned with the Growth Mindset expectations outlined above.",
  "Consistently meet and often exceed all goals and expectations, including but not limited to the core DCT performance expectations, while delivering at a higher standard that reflects role maturity, accountability, and increasing scope of impact.",
  "Consistently demonstrate speed, urgency, thoughtful experimentation, including with AI and CI, while prioritizing security and safety, and adapting to evolving business needs",
  "Consistently receive strong, constructive, and impact-based feedback from managers, reflecting high-quality work, ownership, and effective collaboration.",
  "Consistently demonstrate clear and measurable impact in all projects participated in, including defined contributions and ownership areas, tangible outcomes and results delivered, and positive and constructive feedback from project stakeholders",
  "Consistently meet all the Org OKRs below："
];

const okrs = [
  ["Ops Assurance", ">= 98%"],
  ["IT incident drill", "100%"],
  ["IT-CE incident drill (Class A)", "100%"],
  ["APAC Call Routing Testing", "< 5 mins"],
  ["Availability", "0 incidents"],
  ["DC Library Acknowledgement ", "100%"],
  ["Containment KPI", "100%"],
  ["Lease DC Daily Health Status", "100%"],
  ["Process Defects and Human Error", "0"],
  ["TSB", "< 2 months"],
  ["Open Repair Item", "Past SLA"],
  ["Escalated DPMO", "<3.4 DPMO"],
  ["Unreconciled DBD", "0%"],
  ["DBD destruction", ">= 95%"],
  ["RMA performance", ">98%"],
  ["Receive SLA", ">= 95%"],
  ["Transfer SLA", ">98%"],
  ["Cycle Count SLA", "98%"],
  ["Cycle Count Compliance", "100%"],
  ["Cycle Count Accuracy", ">= 95%"],
  ["LCS Adoption Rate", ">= 90%"],
  ["LCS Assignment Rate", ">= 65%"],
  ["LCS Execution Rate", ">= 70%"],
  ["Mainstream Receive to Cable RtC", "< 12 hours"],
  ["Cluster Decom", ">= 95%"],
  ["DCT Utilization", ">=60%"],
  ["DCT Utilization", "<=10% var"],
  ["CEQ and DCT training", "No overdue"],
  ["Corp and safety training", "No overdue"],
  ["EHS Recordable (RIR)", "No recordable"],
  ["Unique Participation rate", ">=75%"],
  ["EHS Action Plan Completion", "100%"],
  ["NoV", "No NoV"],
  ["Env Compliance Issues (Class A)", "No overdue"],
  ["Access Violations - Production", "<= 0.02"],
  ["Access Violations - Non - Production", "<= 0.02"],
  ["DBD events", "<= 0.05"],
  ["Physical Access / Bypass Failure", "<= 0.20"]
];

const indicatorContainer = document.querySelector("#successIndicators");
const okrTable = document.querySelector("#okrTable");
const form = document.querySelector("#connectForm");
const toast = document.querySelector("#toast");

successIndicators.forEach((indicator, index) => {
  const label = document.createElement("label");
  label.innerHTML = `${index + 1}. ${indicator}<textarea name="18. Self-reflection Result ${index + 1}" required></textarea>`;
  indicatorContainer.append(label);
});

okrs.forEach(([name, target]) => {
  const row = document.createElement("div");
  row.className = "okr-row";
  row.innerHTML = `<span class="okr-name">${name}</span><span class="okr-target">${target}</span>`;
  okrTable.append(row);
});

document.querySelector("#printButton").addEventListener("click", () => {
  if (!validateRequiredFields()) {
    return;
  }

  window.print();
});

document.querySelector("#copyButton").addEventListener("click", async () => {
  if (!validateRequiredFields()) {
    return;
  }

  const formData = new FormData(form);
  const summary = Array.from(formData.entries())
    .map(([key, value]) => `${key}: ${value.trim()}`)
    .join("\n");

  try {
    await navigator.clipboard.writeText(`Monthly 1:1 Connect\n\n${summary}`);
    showToast("Summary copied.");
  } catch {
    showToast("Copy was blocked by the browser. Use Print / Save PDF instead.");
  }
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
});

form.addEventListener("input", clearValidationMessage);
form.addEventListener("change", clearValidationMessage);

function validateRequiredFields() {
  const controls = Array.from(form.querySelectorAll("input[required], select[required], textarea[required]"));
  controls.forEach((control) => control.setCustomValidity(""));

  const firstBlank = controls.find((control) => !control.value.trim());
  if (firstBlank) {
    firstBlank.setCustomValidity("Please complete this field. Enter N/A if it is not applicable.");
    firstBlank.reportValidity();
    firstBlank.focus({ preventScroll: false });
    showToast("Please complete all mandatory fields before printing, saving PDF, or copying the summary.");
    return false;
  }

  const reviewFrom = form.elements["Review Period From"];
  const reviewTo = form.elements["Review Period To"];
  if (reviewFrom.value && reviewTo.value && reviewTo.value < reviewFrom.value) {
    reviewTo.setCustomValidity("Review Period To date must be the same as or later than the From date.");
    reviewTo.reportValidity();
    reviewTo.focus({ preventScroll: false });
    showToast("Please check the Review Period date range before printing, saving PDF, or copying the summary.");
    return false;
  }

  if (!form.reportValidity()) {
    showToast("Please complete all mandatory fields before printing, saving PDF, or copying the summary.");
    return false;
  }

  return true;
}

function clearValidationMessage(event) {
  if (event.target.matches("input, select, textarea")) {
    event.target.setCustomValidity("");
  }
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 3200);
}