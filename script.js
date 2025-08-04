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

// Download button logic
document.getElementById("downloadBtn").addEventListener("click", function () {
  const status = document.getElementById("statusMsg");

  status.textContent = "Checking for updates...";

  setTimeout(() => {
    status.textContent = "Update found. Preparing download...";

    setTimeout(() => {
      status.textContent = "Downloading latest injector...";

      const link = document.createElement("a");
      link.href = "injector.zip"; // Replace with real file
      link.download = "injector.zip";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      status.textContent = "Download started!";
    }, 1500);
  }, 1200);
});
