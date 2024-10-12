document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const inputs = form.querySelectorAll("input");

  // Include the validator library
  const script = document.createElement("script");
  script.src = "./public/assets/js/vendors/validator.min.js";
  document.head.appendChild(script);

  script.onload = () => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      let isValid = true;    

      inputs.forEach((input) => {
        // Remove previous error messages and icons
        const spanList = input.parentNode.querySelectorAll("span");
        spanList.forEach((span) => {
          if (span.classList.contains("errorIcon") || span.classList.contains("errorMessage")) {
            span.remove();
          }
        });

        // Remove error outline
        input.classList.remove("errorOutline");

        // Create error icon and message
        const errorIcon = document.createElement("span");
        errorIcon.classList.add("errorIcon");
        const icon = document.createElement("i");
        icon.classList.add("fa", "fa-exclamation-circle");
        icon.setAttribute("aria-hidden", "true");
        icon.setAttribute("aria-describedby", "Feedback validation error icon");
        errorIcon.appendChild(icon);

        const errorMessage = document.createElement("span");
        errorMessage.classList.add("errorMessage");

        if (input.value.trim() === "") {
          input.parentNode.insertBefore(errorIcon, input.nextSibling);
          errorMessage.textContent = `${input.placeholder} cannot be empty`;
          input.parentNode.insertBefore(errorMessage, input.nextSibling);
          input.classList.add("errorOutline");

          isValid = false;
        } else if (input.type === "email" && !validator.isEmail(input.value)) {
          input.parentNode.insertBefore(errorIcon, input.nextSibling);
          errorMessage.textContent = "Looks like this is not an email";
          input.parentNode.insertBefore(errorMessage, input.nextSibling);
          input.classList.add("errorOutline");

          isValid = false;
        } else {
          errorMessage.textContent = "";
        }
      });

      if (isValid) {
        form.submit();
      }
    });
  };
});
