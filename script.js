const firstName = document.querySelector("#contact-form__firstname");
const lastName = document.querySelector("#contact-form__lastname");
const email = document.querySelector("#contact-form__email");
const message = document.querySelector("#contact-form__message");
const enquiry = document.querySelector("#contact-form__enquiryRadio");
const request = document.querySelector("#contact-form__requestRadio");
const consent = document.querySelector("#contact-form__checkbox");
const customCheckBox = document.querySelector(".contact-form__checkmark");
const form = document.getElementById("form");

const radioBtnWrapper = document.querySelector(".contact-form__radio-wrapper");
const radioErr = document.querySelector(".contact-form__radio--error");
const consentErr = document.querySelector(".contact-form__consent--error");

const successMessage = document.querySelector(".contact-form__success-content");

const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

radioBtnWrapper.addEventListener("change", (e) => {
  resetRadioBtn(radioBtnWrapper);
  // Check if the changed element is a radio input
  if (e.target.matches('input[type="radio"]') && e.target.checked === true) {
    // Perform actions here based on the selected radio button
    const grandParent = document.getElementById(e.target.id).parentNode
      .parentNode;
    grandParent.style.backgroundColor = "#dff1e7";
    grandParent.style.border = "1px solid #0c7d69";
  }
});

// For Accessibility //

// Event delegation for radio buttons
radioBtnWrapper.addEventListener("keydown", function (event) {
  // Handle Enter key press to select the focused radio button
  if (event.key === "Enter") {
    const focusedRadio = document.activeElement.querySelector(
      'input[type="radio"]'
    );
    if (focusedRadio) {
      focusedRadio.checked = true; // Select the focused radio button

      // Optionally, trigger the change event if needed
      const changeEvent = new Event("change", { bubbles: true });
      focusedRadio.dispatchEvent(changeEvent);
    }
  }
});

// Event delegation for focusing on radio options
radioBtnWrapper.addEventListener(
  "focus",
  function (event) {
    if (event.target.matches(".contact-form__radio")) {
      const radioInput = event.target.querySelector('input[type="radio"]');
      if (radioInput) {
        radioInput.focus(); // Focus the radio input when its container is focused
      }
    }
  },
  true
);

customCheckBox.addEventListener("keydown", function (e) {
  // Check if Enter key is pressed
  if (e.key === "Enter") {
    this.click(); // Trigger the click event
  }
});

// Email validation function
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex
  return re.test(String(email).toLowerCase());
}

// Reset Radio Button styles
function resetRadioBtn(radioBtnWrapper) {
  radioBtnWrapper.querySelectorAll(".contact-form__radio").forEach((radio) => {
    radio.style.backgroundColor = "";
    radio.style.border = "1px solid #87a3a6";
  });
}

// Form submission
form.addEventListener("submit", (e) => {
  e.preventDefault();
  // Validating the form
  validateForm();
});

function validateForm() {
  let isFormValid = true;

  // Validate First Name
  validateInput(firstName, firstName.value);
  if (!firstName.value) isFormValid = false;

  // Validate Last Name
  validateInput(lastName, lastName.value);
  if (!lastName.value) isFormValid = false;

  // Validate Email
  validateInput(email, email.value && validateEmail(email.value));
  if (!email.value || !validateEmail(email.value)) isFormValid = false;

  // Validate Query Type
  const isRadioSelected = enquiry.checked || request.checked;
  validateInput(radioErr, isRadioSelected);
  if (!isRadioSelected) isFormValid = false;

  // Validate Message
  validateInput(message, message.value !== "");
  if (!message.value) isFormValid = false;

  // Validate Consent
  validateInput(consentErr, consent.checked);
  if (!consent.checked) isFormValid = false;

  // Validating the form
  if (isFormValid) {
    successMessage.classList.remove("contact-form__success--hidden");
    successMessage.classList.add("contact-form__success--visible");
    form.reset();
    if (!enquiry.checked && !request.checked) {
      resetRadioBtn(radioBtnWrapper);
    }
  }

  // Removing the success toast after a few seconds
  setTimeout(function () {
    successMessage.classList.remove("contact-form__success--visible");
    successMessage.classList.add("contact-form__success--hidden");
  }, 5000);
}

function validateInput(input, isInputValid) {
  if (!isInputValid) {
    input.classList.contains("contact-form__radio--error") || input.classList.contains("contact-form__consent--error") 
      ? input.classList.remove("contact-form--error__hidden")
      : input.nextElementSibling.classList.remove(
          "contact-form--error__hidden"
        );
  } else {
    input.classList.contains("contact-form__radio--error") || input.classList.contains("contact-form__consent--error")
      ? input.classList.add("contact-form--error__hidden")
      : input.nextElementSibling.classList.add("contact-form--error__hidden");
    input.style.border = "1px solid #87a3a6";
  }
}
