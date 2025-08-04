const authDiv = document.getElementById("auth");
const mainContent = document.getElementById("mainContent");

function createAuthForm() {
  authDiv.innerHTML = `
    <h2>Register</h2>
    <p>Create your account (default user: <strong>user</strong>, password: <strong>1111</strong>)</p>
    <button id="registerBtn">Register</button>
  `;

  document.getElementById("registerBtn").onclick = () => {
    // Save default credentials
    localStorage.setItem("username", "user");
    localStorage.setItem("password", "1111");
    showLoginForm();
  };
}

function showLoginForm() {
  authDiv.innerHTML = `
    <h2>Login</h2>
    <input type="text" id="loginUser" placeholder="Username" autocomplete="off" />
    <input type="password" id="loginPass" placeholder="Password" autocomplete="off" />
    <div id="errorMsg"></div>
    <button id="loginBtn">Login</button>
    <button id="panicBtn" style="margin-top:10px; background:#ff4d4d; color:white;">Panic Account Delete</button>
  `;

  document.getElementById("loginBtn").onclick = () => {
    const user = document.getElementById("loginUser").value.trim();
    const pass = document.getElementById("loginPass").value;

    const savedUser = localStorage.getItem("username");
    const savedPass = localStorage.getItem("password");

    if (user === savedUser && pass === savedPass) {
      authDiv.style.display = "none";
      mainContent.style.display = "block";
    } else {
      document.getElementById("errorMsg").textContent = "Invalid username or password.";
    }
  };

  document.getElementById("panicBtn").onclick = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    // Return to register form
    createAuthForm();
  };
}

// On page load:
window.onload = () => {
  const user = localStorage.getItem("username");
  const pass = localStorage.getItem("password");

  if (user && pass) {
    showLoginForm();
  } else {
    createAuthForm();
  }
  mainContent.style.display = "none";
};
