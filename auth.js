const authDiv = document.getElementById("auth");
const mainContent = document.getElementById("mainContent");

let mode = "login"; // or 'register'

function renderForm() {
  authDiv.innerHTML = `
    <h2>${mode === "login" ? "Login" : "Register"}</h2>
    <input type="text" id="username" placeholder="Username" autocomplete="username" />
    <input type="password" id="password" placeholder="Password" autocomplete="${mode === "login" ? "current-password" : "new-password"}" />
    <button id="submitBtn">${mode === "login" ? "Login" : "Register"}</button>
    <div id="errorMsg"></div>
    <div>
      <span class="form-switch">${mode === "login" ? "No account? Register here" : "Already have an account? Login here"}</span>
    </div>
    ${mode === "login" ? `<button id="panicBtn">Panic Account Delete</button>` : ""}
  `;

  document.getElementById("submitBtn").onclick = handleSubmit;
  document.querySelector(".form-switch").onclick = toggleMode;

  if (mode === "login") {
    document.getElementById("panicBtn").onclick = panicDelete;
  }
}

function toggleMode() {
  mode = mode === "login" ? "register" : "login";
  clearError();
  renderForm();
}

function clearError() {
  document.getElementById("errorMsg").textContent = "";
}

function handleSubmit() {
  clearError();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;

  if (!username || !password) {
    showError("Please enter both username and password.");
    return;
  }

  if (mode === "register") {
    if (localStorage.getItem("userData")) {
      showError("An account already exists. Please login.");
      return;
    }
    // Save user data to localStorage
    const userData = { username, password };
    localStorage.setItem("userData", JSON.stringify(userData));
    alert("Registration successful! Please login now.");
    mode = "login";
    renderForm();
  } else {
    // Login mode
    const stored = localStorage.getItem("userData");
    if (!stored) {
      showError("No account found. Please register.");
      return;
    }

    const { username: storedUser, password: storedPass } = JSON.parse(stored);

    if (username === storedUser && password === storedPass) {
      // Login successful
      localStorage.setItem("loggedIn", "true");
      showMainContent();
    } else {
      showError("Invalid username or password.");
    }
  }
}

function showError(msg) {
  document.getElementById("errorMsg").textContent = msg;
}

function panicDelete() {
  if (confirm("Are you sure you want to delete your account? This cannot be undone.")) {
    localStorage.removeItem("userData");
    localStorage.removeItem("loggedIn");
    alert("Account deleted. You can now register a new one.");
    mode = "register";
    renderForm();
  }
}

function showMainContent() {
  authDiv.style.display = "none";
  mainContent.style.display = "block";
}

function checkLogin() {
  if (localStorage.getItem("loggedIn") === "true") {
    showMainContent();
  } else {
    renderForm();
  }
}

checkLogin();
