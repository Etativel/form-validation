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

email.addEventListener("input", () => {
  if (email.validity.valid) {
    emailError.textContent = "";
    emailError.className = "error";
    email.className = "email-input";
  } else {
    showEmailError();
  }
});

country.addEventListener("input", (e) => {
  if (country.validity.valid) {
    countryError.textContent = "";
    countryError.className = "error";
    country.classList = "country-input";
  } else {
    showCountryError();
  }
});

zipCode.addEventListener("input", (e) => {
  if (zipCode.validity.valid) {
    zipError.textContent = "";
    zipError.className = "error";
    zipError.classList = "zip-input";
  } else {
    showZipError();
  }
});

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
    emailError.textContent = "Entered value needs to be and email address.";
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
  countryError.classList = "error active";
  country.className = "country-input input-error";
}

form.addEventListener("submit", (e) => {
  // showError();
  e.preventDefault();
  form.reset();
});
