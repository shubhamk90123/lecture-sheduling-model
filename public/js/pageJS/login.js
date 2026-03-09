const container = document.getElementById("container");
const registerBtn = document.getElementById("register");
const loginBtn = document.getElementById("login");

if (registerBtn && container) {
  registerBtn.addEventListener("click", (event) => {
    event.preventDefault();
    container.classList.add("active");
  });
}

if (loginBtn && container) {
  loginBtn.addEventListener("click", (event) => {
    event.preventDefault();
    container.classList.remove("active");
  });
}
