const authDiv = document.getElementById("auth");
const mainContent = document.getElementById("mainContent");

function createRegisterForm() {
  authDiv.style.display = "block";
  mainContent.style.display = "none";

  authDiv.innerHTML = `
    <h2>Register</h2>
    <label for="regUser">Username:</label>
    <input type="text" id="regUser" placeholder="Enter username" autocomplete="off" />
    <label for="regPass">Password:</label>
    <input type="password" id="regPass" placeholder="Enter password" autocomplete="off" />
    <div id="errorMsg"></div>
    <button id="registerBtn">Register</button>
  `;

  document.getElementById("registerBtn").onclick = () => {
    const username = document.getElementById("regUser").value.trim();
    const password = document.getElementById("regPass").value;

    if (username.length < 3) {
      showError("Username must be at least 3 characters.");
      return;
    }
    if (password.length < 4) {
      showError("Password must be at least 4 characters.");
      return;
    }

    localStorage.setItem("username", username);
    localStorage.setItem("password", password);

    showLoginForm();
  };
}

function showLoginForm() {
  authDiv.style.display = "block";
  mainContent.style.display = "none";

  authDiv.innerHTML = `
    <h2>Login</h2>
    <input type="text" id="loginUser" placeholder="Username" autocomplete="off" />
    <input type="password" id="loginPass" placeholder="Password" autocomplete="off" />
    <div id="errorMsg"></div>
    <button id="loginBtn">Login</button>
    <button id="panicBtn" style="margin-top: 10px; background: #ff4d4d; color: white;">Panic Account Delete</button>
  `;

  document.getElementById("loginBtn").onclick = () => {
    const user = document.getElementById("loginUser").value.trim();
    const pass = document.getElementById("loginPass").value;

    const savedUser = localStorage.getItem("username");
    const savedPass = localStorage.getItem("password");

    if (user === savedUser && pass === savedPass) {
      authDiv.style.display = "none";
      mainContent.style.display = "block";
      clearError();
    } else {
      showError("Invalid username or password.");
    }
  };

  document.getElementById("panicBtn").onclick = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    createRegisterForm();
  };
}

function showError(msg) {
  const err = document.getElementById("errorMsg");
  if (err) {
    err.textContent = msg;
  }
}

function clearError() {
  const err = document.getElementById("errorMsg");
  if (err) {
    err.textContent = "";
  }
}

window.onload = () => {
  const user = localStorage.getItem("username");
  const pass = localStorage.getItem("password");

  if (user && pass) {
    showLoginForm();
  } else {
    createRegisterForm();
  }

  mainContent.style.display = "none";
};
