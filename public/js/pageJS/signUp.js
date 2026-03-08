const roleSelect = document.getElementById("roleSelect");
const specializationGroup = document.getElementById("specializationGroup");
const specializationSelect = document.getElementById("specializationSelect");
const form = document.querySelector("form");
const password = document.querySelector('input[name="password"]');
const confirmPassword = document.querySelector('input[name="confirmPassword"]');
const contactInput = document.querySelector('input[name="contact"]');

// Role change handler
roleSelect.addEventListener("change", function () {
  if (this.value === "instructor") {
    specializationGroup.style.display = "block";
    specializationSelect.setAttribute("required", "required");
  } else {
    specializationGroup.style.display = "none";
    specializationSelect.removeAttribute("required");
    specializationSelect.value = "";
  }
});

// Real-time password validation
confirmPassword.addEventListener("input", function () {
  if (password.value !== confirmPassword.value) {
    confirmPassword.setCustomValidity("Passwords do not match");
  } else {
    confirmPassword.setCustomValidity("");
  }
});

// Contact number validation - only allow numbers
contactInput.addEventListener("input", function (e) {

  this.value = this.value.replace(/\D/g, "");

  if (this.value.length > 10) {
    this.value = this.value.slice(0, 10);
  }
});


form.addEventListener("submit", function (e) {
  if (password.value !== confirmPassword.value) {
    e.preventDefault();
    alert("Passwords do not match! Please try again.");
    confirmPassword.focus();
    return;
  }

  // Contact number validation
  if (contactInput.value.length !== 10) {
    e.preventDefault();
    alert("Contact number must be exactly 10 digits!");
    contactInput.focus();
    return;
  }
});
