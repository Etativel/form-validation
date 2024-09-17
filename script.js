const form = document.querySelector(".form");
const email = document.querySelector(".email-input");
const country = document.querySelector(".country-input");
const zipCode = document.querySelector(".zip-input");
const password = document.querySelector(".pass-input");
const passConfirm = document.querySelector(".pass-confirm");

const emailError = document.querySelector(".email.error");
const countryError = document.querySelector(".country.error");
const zipError = document.querySelector(".zip.error");
const passwordError = document.querySelector(".password.error");
const confirmError = document.querySelector(".confirm.error");

function clearErrors() {
  emailError.textContent = "";
  countryError.textContent = "";
  zipError.textContent = "";
  passwordError.textContent = "";
  confirmError.textContent = "";

  emailError.className = "error";
  countryError.className = "error";
  zipError.className = "error";
  passwordError.className = "error";
  confirmError.className = "error";

  email.className = "email-input";
  country.className = "country-input";
  zipCode.className = "zip-input";
  password.className = "pass-input";
  passConfirm.className = "pass-confirm";
}

email.addEventListener("input", () => {
  if (email.validity.valid) {
    clearErrors();
  } else {
    showEmailError();
  }
});

country.addEventListener("input", () => {
  if (country.validity.valid) {
    clearErrors();
  } else {
    showCountryError();
  }
});

zipCode.addEventListener("input", () => {
  if (zipCode.validity.valid) {
    clearErrors();
  } else {
    showZipError();
  }
});

password.addEventListener("input", () => {
  if (validatePassword()) {
    passwordError.textContent = "";
    passwordError.className = "error";
    password.className = "pass-input";
  } else {
    showPasswordError();
  }
});

passConfirm.addEventListener("input", () => {
  if (passConfirm.value === password.value) {
    confirmError.textContent = "";
    confirmError.className = "error";
    passConfirm.className = "pass-confirm";
  } else {
    showPasswordConfirmationError();
  }
});

function showPasswordConfirmationError() {
  confirmError.textContent = "Your password didn't match";
  confirmError.className = "error active";
  passConfirm.className = "pass-confirm input-error";
}

function validatePassword() {
  let lowerCaseLetters = /[a-z]/g;
  let upperCaseLetters = /[A-Z]/g;
  let numbers = /[0-9]/g;
  let symbols = /[!@#$%^&*(),.?":{}|<>]/g;

  return (
    password.value.match(lowerCaseLetters) &&
    password.value.match(upperCaseLetters) &&
    password.value.match(numbers) &&
    password.value.match(symbols) &&
    password.value.length >= 8
  );
}

function showPasswordError() {
  let errorMessages = [];

  if (!password.value.match(/[a-z]/g)) {
    errorMessages.push("Your password needs a lowercase character.");
  }
  if (!password.value.match(/[A-Z]/g)) {
    errorMessages.push("Your password needs an uppercase character.");
  }
  if (!password.value.match(/[0-9]/g)) {
    errorMessages.push("Your password needs a number.");
  }
  if (!password.value.match(/[!@#$%^&*(),.?":{}|<>]/g)) {
    errorMessages.push("Your password needs a symbol.");
  }
  if (password.value.length < 8) {
    errorMessages.push("Your password needs to be at least 8 characters long.");
  }

  if (errorMessages.length > 0) {
    passwordError.textContent = errorMessages.join(" ");
    passwordError.className = "error active";
    password.className = "pass-input input-error";
  }
}

function showZipError() {
  if (zipCode.validity.valueMissing) {
    zipError.textContent = "You need to enter your zip code";
  } else if (!zipCode.validity.valid) {
    zipError.textContent = "Entered value needs to be a 5-digit number";
  } else if (zipCode.validity.tooShort || zipCode.validity.tooLong) {
    zipError.textContent = "Entered value needs to be exactly 5 characters";
  }
  zipError.className = "error active";
  zipCode.className = "zip-input input-error";
}

function showEmailError() {
  if (email.validity.valueMissing) {
    emailError.textContent = "You need to enter your email address.";
  } else if (email.validity.typeMismatch) {
    emailError.textContent = "Entered value needs to be an email address.";
  } else if (email.validity.tooShort) {
    emailError.textContent = `Email should be at least ${email.minLength} characters; you entered ${email.value.length}`;
  }
  emailError.className = "error active";
  email.className = "email-input input-error";
}

function showCountryError() {
  if (country.validity.valueMissing) {
    countryError.textContent = "You need to enter your country.";
  }
  countryError.className = "error active";
  country.className = "country-input input-error";
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (
    email.validity.valid &&
    country.validity.valid &&
    zipCode.validity.valid &&
    validatePassword() &&
    passConfirm.value === password.value
  ) {
    form.reset();
  } else {
    showEmailError();
    showCountryError();
    showZipError();
    showPasswordError();
    showPasswordConfirmationError();
  }
});
