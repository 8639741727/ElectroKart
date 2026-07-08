import { login } from "./auth.js";
import { sendPageView } from "./target.js";

sendPageView("login");

const form = document.getElementById("loginForm");
const errorBanner = document.getElementById("errorBanner");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  errorBanner.classList.add("hidden");
  const email = form.email.value;
  const password = form.password.value;
  try {
    login({ email, password });
    window.location.href = "account.html";
  } catch (err) {
    errorBanner.textContent = err.message;
    errorBanner.classList.remove("hidden");
  }
});
