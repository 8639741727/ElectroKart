import { signup } from "./auth.js";
import { sendPageView } from "./target.js";

sendPageView("signup");

const form = document.getElementById("signupForm");
const errorBanner = document.getElementById("errorBanner");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  errorBanner.classList.add("hidden");
  const name = form.name.value;
  const email = form.email.value;
  const password = form.password.value;

  if (password.length < 6) {
    errorBanner.textContent = "Password should be at least 6 characters.";
    errorBanner.classList.remove("hidden");
    return;
  }

  try {
    signup({ name, email, password });
    window.location.href = "account.html";
  } catch (err) {
    errorBanner.textContent = err.message;
    errorBanner.classList.remove("hidden");
  }
});
