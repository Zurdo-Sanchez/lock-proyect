document.addEventListener("DOMContentLoaded", function () {
  const lockContainer = document.getElementById("js-lock-container");
  const lockTitleElement = document.getElementById("js-lock-title");
  const lockCombinationInput = document.getElementById(
    "js-lock-combination-input"
  );
  const checkCombinationBtn = document.getElementById("js-unlock-button");
  const checkClearCodeBtn = document.getElementById("js-clear-code");
  const lockHintImage = document.getElementById("js-lock-image");
  const lockHintText = document.getElementById("js-lock-hint-text");
  let lockMaxTries = null;

  // Obtener el parámetro URL base64 codificado
  const encodedConfig = new URLSearchParams(window.location.search).get(
    "config"
  );

  if (!encodedConfig) {
    Swal.fire({
      icon: "error",
      title: "Configuration not found",
      text: "incorrect configuration data.",
    });
    return;
  }

  // convert to JSON
  const decodedConfig = JSON.parse(atob(decodeURIComponent(encodedConfig)));
  
  // check expiration Date
  const expirationDate = new Date(decodedConfig.expirationDate);
  const currentDate = new Date();

  if (currentDate > expirationDate) {
    Swal.fire({
      icon: "error",
      title: "The lock has expired",
      text: "Sorry, this lock is no longer available.",
    });
    return;
  }

  lockTitleElement.textContent = decodedConfig.title;
  lockHintImage.src = decodedConfig.image;
  lockHintText.textContent = decodedConfig.text;
  lockContainer.style.backgroundImage = `url("${decodedConfig.backgroundImage}")`;
  checkCombinationBtn.textContent = decodedConfig.buttonText;
  lockMaxTries = decodedConfig.maxTries;

  // lock opening code check
  checkCombinationBtn.addEventListener("click", function () {
    const enteredCombination = lockCombinationInput.value;
    const correctCombination = decodedConfig.combination;
    if (enteredCombination === "") {
      Swal.fire({
        position: "top",
        icon: "warning",
        text: "No code entered",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      if (enteredCombination === correctCombination) {
        //correct
        Swal.fire({
          icon: "success",
          title: "Congratulations!!!",
          text: decodedConfig.okMessage,
        }).then(() => {
          window.location.href = decodedConfig.okRedirect;
        });
      } else {
        if (lockMaxTries <= 0) {
          Swal.fire({
            icon: "error",
            title: "max",
            text: decodedConfig.maxTriesMessage,
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = decodedConfig.failRedirect;
            }
          });
        } else {
          // incorrect
          Swal.fire({
            icon: "error",
            title: "Wrong!!!",
            text: decodedConfig.failMessage,
          });
        }
      }
    }
    lockMaxTries--;
  });
  checkClearCodeBtn.addEventListener("click", function () {
    if (lockCombinationInput.value !== "") {
      lockCombinationInput.value = "";
      Swal.fire({
        position: "bottom",
        icon: "info",
        text: "Code deleted",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  });
});
