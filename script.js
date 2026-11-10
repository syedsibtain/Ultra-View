// EDIT THESE SETTINGS BEFORE PUBLISHING
const WHATSAPP_NUMBER = "447862180399"; // Ultra View WhatsApp number, international format, digits only.
const BUSINESS_EMAIL = "hello@example.com"; // Replace with your business email if you have one.

document.getElementById("year").textContent = new Date().getFullYear();
document.querySelectorAll(".email-link").forEach(link => {
  link.href = `mailto:${BUSINESS_EMAIL}`;
  link.textContent = BUSINESS_EMAIL;
});

const nav = document.getElementById("nav");
const menuToggle = document.querySelector(".menu-toggle");
menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));

let selectedPeriod = "monthly";
document.querySelectorAll(".billing-btn").forEach(button => {
  button.addEventListener("click", () => {
    selectedPeriod = button.dataset.period;
    document.querySelectorAll(".billing-btn").forEach(item => item.classList.toggle("active", item === button));
    document.querySelectorAll(".price strong").forEach(price => price.textContent = price.dataset[selectedPeriod]);
    document.querySelectorAll(".period").forEach(period => period.textContent = period.dataset[selectedPeriod]);
  });
});

function orderUrl(plan) {
  const periodLabel = { monthly: "Monthly", quarterly: "3 Months", yearly: "Yearly" }[selectedPeriod];
  const message = plan === "Free Trial" ? "Hello Ultra View! I would like to ask about your free IPTV trial. Please share the details." : `Hello Ultra View! I am interested in the ${plan} subscription (${periodLabel}). Please share availability and details.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
document.querySelectorAll(".order-link").forEach(link => {
  link.addEventListener("click", event => {
    event.preventDefault();
    if (!WHATSAPP_NUMBER) {
      alert("WhatsApp contact is not configured yet. Please contact the website owner.");
      return;
    }
    window.open(orderUrl(link.dataset.plan), "_blank", "noopener");
  });
});
document.querySelector(".whatsapp-link").addEventListener("click", event => {
  event.preventDefault();
  if (!WHATSAPP_NUMBER) {
    alert("WhatsApp contact is not configured yet. Please contact the website owner.");
    return;
  }
  window.open(orderUrl("Free Trial"), "_blank", "noopener");
});
