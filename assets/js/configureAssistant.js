document.addEventListener("DOMContentLoaded", function () {
  const lockConfigForm = document.getElementById("lockConfigForm");
  const previewButton = document.getElementById("js-preview-button");

  previewButton.addEventListener("click", function () {
    const lockContainer = document.getElementById("js-lock-container");
    const lockTitleElement = document.getElementById("js-lock-title");
    const checkCombinationBtn = document.getElementById("js-unlock-button");
    const lockHintImage = document.getElementById("js-lock-image");
    const lockHintText = document.getElementById("js-lock-hint-text");

    const lockBackgroundImage = document.getElementById(
      "lockBackgroundImage"
    ).value;
    const lockImage = document.getElementById("lockImage").value;
    const lockTitle = document.getElementById("lockTitle").value;
    const lockButtonText = document.getElementById("lockButtonText").value;
    const lockText = document.getElementById("lockText").value;
    if (
      lockBackgroundImage === "" ||
      lockImage === "" ||
      lockTitle === "" ||
      lockButtonText === "" ||
      lockText === ""
    ) {
      Swal.fire({
        icon: "error",
        title: "Incomplete fields",
        text: "Complete the minimum fields required for the preview (fields marked with *).",
      });
    } else {
      lockContainer.style.backgroundImage = `url("${lockBackgroundImage}")`;
      lockTitleElement.textContent = lockTitle;
      checkCombinationBtn.textContent = lockButtonText;
      lockHintImage.src = lockImage;
      lockHintText.textContent = lockText;
    }
  });

  lockConfigForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Obtener datos del formulario
    const lockCombination = document.getElementById("lockCombination").value;
    const lockTitle = document.getElementById("lockTitle").value;
    const lockText = document.getElementById("lockText").value;
    const lockImage = document.getElementById("lockImage").value;
    const lockImageSize = document.getElementById("lockImageSize").value;
    const lockButtonText = document.getElementById("lockButtonText").value;
    const lockOkMessage = document.getElementById("lockOKText").value;
    const lockOkRedirect = document.getElementById("lockOkRedirect").value;
    const lockFailMessage = document.getElementById("lockFailText").value;
    const lockMaxTries = document.getElementById("lockMaxTries").value;
    const lockMaxTriesMessage =
      document.getElementById("lockMaxTriesText").value;
    const lockFailRedirect = document.getElementById("lockFailRedirect").value;
    const lockBackgroundImage = document.getElementById(
      "lockBackgroundImage"
    ).value;
    const lockExpirationDate =
      document.getElementById("lockExpirationDate").value;

    // Validar fecha
    const currentDate = new Date();
    const expirationDate = new Date(lockExpirationDate);

    if (expirationDate <= currentDate) {
      Swal.fire({
        icon: "error",
        title: "Fecha de caducidad inválida",
        text: "La fecha de caducidad debe ser en el futuro.",
      });
      return;
    }

    // Crear objeto JSON
    const lockConfig = {
      combination: lockCombination,
      title: lockTitle,
      text: lockText,
      image: lockImage,
      imageSize: lockImageSize,
      buttonText: lockButtonText,
      okMessage: lockOkMessage,
      okRedirect: lockOkRedirect,
      failMessage: lockFailMessage,
      maxTries: lockMaxTries,
      maxTriesMessage: lockMaxTriesMessage,
      failRedirect: lockFailRedirect,
      backgroundImage: lockBackgroundImage,
      expirationDate: lockExpirationDate,
    };

    // Codificar el objeto JSON en base64
    const encodedConfig = btoa(JSON.stringify(lockConfig));

    Swal.fire({
      template: "#my-template",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href =
          "http://localhost:5500/PROYECTO-LOCK/pages/lock.html?config=" +
          encodedConfig;
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.close();
      }
    });
  });
});
