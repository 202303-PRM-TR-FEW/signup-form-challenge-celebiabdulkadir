const signUpForm = document.getElementById("sign-up-form");

const validations = {
  firstname: (value) => value.trim().length > 0,
  lastname: (value) => value.trim().length > 0,
  email: (value) => /\S+@\S+\.\S+/.test(value),
  password: (value) => value.length >= 8,
};

function showErrorMessage(inputName, errorMessage) {
  const errorElement = document.getElementById(`${inputName}-error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.remove("hidden");
}

function hideErrorMessage(inputName) {
  const errorElement = document.getElementById(`${inputName}-error`);
  errorElement.classList.add("hidden");
}

function validateInput(input) {
  const isValid = validations[input.name](input.value);
  if (!isValid) {
    showErrorMessage(input.name, `${input.name.charAt(0).toUpperCase() + input.name.slice(1)} is invalid.`);
  } else {
    hideErrorMessage(input.name);
  }
  return isValid;
}

signUpForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const inputs = event.target.elements;
  let allInputsValid = true;

  for (const input of inputs) {
    if (input.name in validations) {
      const isValid = validateInput(input);
      allInputsValid = allInputsValid && isValid;
    }
  }

  if (allInputsValid) {
    const formData = new FormData(event.target);
    const formValues = Object.fromEntries(formData.entries());
    alert(JSON.stringify(formValues, null, 2));
  }
});

for (const inputName in validations) {
  const inputElement = document.getElementById(inputName);
  inputElement.addEventListener("input", (event) => {
    validateInput(event.target);
  });
}
