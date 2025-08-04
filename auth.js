const authDiv = document.getElementById("auth");
const mainContent = document.getElementById("mainContent");

// Keys for localStorage
const STORAGE_USER = "mySiteUser";
const STORAGE_PASS = "mySitePass";

// Utility: show main page
function showMainPage() {
  authDiv.style.display = "none";
  mainContent.style.display = "block";
}

// Utility: show form (register or login)
function showForm(isRegister) {
  authDiv.innerHTML = ""; // clear

  const formTitle = isRegister ? "Register" : "Login";
  const btnText = isRegister ? "Register" : "Login";

  const form = document.createElement("form");
  form.innerHTML = `
    <h2>${formTitle}</h2>
    <label>Username: <input type="text" id="username" required></label><br><br>
    <label>Password: <input type="password" id="password" required></label><br><br>
    <button type="submit">${btnText}</button>
    <p id="errorMsg" style="color: #ff6666; margin-top: 10px;"></p>
  `;

  form.addEventListener("submit", function(e) {
    e.preventDefault();
    const username = form.querySelector("#username").value.trim();
    const password = form.querySelector("#password").value.trim();

    if (isRegister) {
      // Save credentials
      localStorage.setItem(STORAGE_USER, username);
      localStorage.setItem(STORAGE_PASS, password);
      alert("Registration successful! Please login.");
      showForm(false); // show login after register
    } else {
      // Login logic:
      const storedUser = localStorage.getItem(STORAGE_USER);
      const storedPass = localStorage.getItem(STORAGE_PASS);

      if (!storedUser || !storedPass) {
        // Should not happen, fallback to register
        alert("No registered user found, please register first.");
        showForm(true);
        return;
      }

      const errorMsg = form.querySelector("#errorMsg");

      if (username !== storedUser && password !== storedPass) {
        errorMsg.textContent = "Wrong password and user";
      } else if (username === storedUser && password !== storedPass) {
        errorMsg.textContent = "Password incorrect";
      } else if (username !== storedUser && password === storedPass) {
        errorMsg.textContent = "Wrong login";
      } else {
        // Successful login
        showMainPage();
      }
    }
  });

  authDiv.appendChild(form);
}

// On page load, decide what to show
window.addEventListener("DOMContentLoaded", () => {
  const registeredUser = localStorage.getItem(STORAGE_USER);
  const registeredPass = localStorage.getItem(STORAGE_PASS);

  if (!registeredUser || !registeredPass) {
    // Not registered yet
    showForm(true);
  } else {
    // Registered, show login
    showForm(false);
  }
});
