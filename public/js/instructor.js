// Button click interaction

document.querySelectorAll(".details").forEach((button) => {
  button.addEventListener("click", function () {
    let course = this.parentElement.parentElement.children[0].innerText;

    alert("Showing details for: " + course);
  });
});

document.getElementById("viewLectures").addEventListener("click", () => {
  alert("Redirecting to all lectures page");
});
