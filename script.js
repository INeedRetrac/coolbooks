// Lock screen logic
const correctCode = "uK#8rX!zP1wL$7dQ";

document.getElementById("captchaBtn").addEventListener("click", () => {
  const input = document.getElementById("captchaInput").value.trim();
  const status = document.getElementById("captchaStatus");

  if (input === correctCode) {
    document.getElementById("lockScreen").style.display = "none";
    document.getElementById("mainSite").style.display = "block";
  } else {
    status.textContent = "Incorrect code. Please try again.";
  }
});
