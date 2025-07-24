function handleSelfieUpload(input) {
  if (input.files && input.files[0]) {
    alert("Selfie uploaded: " + input.files[0].name);
  }
}

function nextStep() {
  document.getElementById("intro-container").style.display = "none";
  document.getElementById("instructions-container").style.display = "block";
}

function prevStep() {
  document.getElementById("instructions-container").style.display = "none";
  document.getElementById("intro-container").style.display = "block";
}

function finishOnboarding() {
  document.getElementById("instructions-container").style.display = "none";
  document.getElementById("upload-container").style.display = "block";
}

function openModal() {
  document.getElementById("authModal").style.display = "flex";
  switchTab("login");
}

function closeModal() {
  document.getElementById("authModal").style.display = "none";
}

function switchTab(tab) {
  const loginTab = document.getElementById("loginTab");
  const registerTab = document.getElementById("registerTab");
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");

  if (tab === "login") {
    loginTab.classList.add("active");
    registerTab.classList.remove("active");
    loginForm.style.display = "block";
    registerForm.style.display = "none";
  } else {
    loginTab.classList.remove("active");
    registerTab.classList.add("active");
    loginForm.style.display = "none";
    registerForm.style.display = "block";
  }
}

function togglePassword(fieldId) {
  const field = document.getElementById(fieldId);
  field.type = field.type === "password" ? "text" : "password";
}

function handleLogin(event) {
  event.preventDefault();
  const email = document.getElementById("loginEmail").value.trim();

  if (!email) return;

  localStorage.setItem("loggedInEmail", email);
  showNotification(`Hello ${email}, welcome back!`);
  updateUIAfterAuth(email);
  closeModal();
}

function handleRegister(event) {
  event.preventDefault();
  const email = document.getElementById("registerEmail").value.trim();

  if (!email) return;

  localStorage.setItem("loggedInEmail", email);
  showNotification(`Welcome, ${email}! Your account has been created.`);
  updateUIAfterAuth(email);
  closeModal();
}

function showNotification(message) {
  const notification = document.getElementById("notification");
  notification.textContent = message;
  notification.style.display = "block";

  setTimeout(() => {
    notification.style.display = "none";
  }, 4000);
}

function updateUIAfterAuth(email) {
  const loginLink = document.getElementById("loginLink");
  const logoutBtn = document.getElementById("logoutBtn");

  loginLink.style.display = "none";
  logoutBtn.style.display = "inline-block";

  const userInfo = document.getElementById("userInfo");
  const userEmail = document.getElementById("userEmail");

  userInfo.style.display = "block";
  userEmail.textContent = email;
}

function logout() {
  localStorage.removeItem("loggedInEmail");
  showNotification("You have been logged out.");
  checkAuth();
}

function checkAuth() {
  const email = localStorage.getItem("loggedInEmail");
  const loginLink = document.getElementById("loginLink");
  const logoutBtn = document.getElementById("logoutBtn");
  const userInfo = document.getElementById("userInfo");

  if (email) {
    loginLink.style.display = "none";
    logoutBtn.style.display = "inline-block";
    userInfo.style.display = "block";
    document.getElementById("userEmail").textContent = email;
  } else {
    loginLink.style.display = "inline-block";
    logoutBtn.style.display = "none";
    userInfo.style.display = "none";
  }
}

// Initialize on page load
window.onload = () => {
  checkAuth();
};
