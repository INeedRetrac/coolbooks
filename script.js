document.getElementById("downloadBtn").addEventListener("click", function () {
  const status = document.getElementById("statusMsg");

  status.textContent = "Checking for updates...";
  
  // Simulate checking time
  setTimeout(() => {
    status.textContent = "Update found. Preparing download...";
    
    setTimeout(() => {
      status.textContent = "Downloading latest injector...";

      // Create hidden download link
      const link = document.createElement("a");
      link.href = "injector.zip"; // Local file in the repo
      link.download = "injector.zip";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      status.textContent = "Download started!";
    }, 1500);

  }, 1200);
});
