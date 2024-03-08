const toggleSideBarElements = document.querySelectorAll(".__toggle-sidebar"),
  containerSideBar = document.querySelector(".container-sidebar"),
  toggleTheme = document.querySelector(".__toggle-theme"),
  body = document.querySelector("body");

function toggleContainerSideBar() {
  containerSideBar.classList.toggle("show-container-sidebar");
}

toggleSideBarElements.forEach((element) => {
  element.addEventListener("click", toggleContainerSideBar);
});

toggleTheme.addEventListener("click", () => {
  body.classList.toggle("light");
  toggleTheme.classList.toggle("light");
});
