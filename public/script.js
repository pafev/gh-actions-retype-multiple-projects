(function () {
  var body = document.querySelector("body"),
    m = localStorage.getItem("doc_theme"),
    wm = window.matchMedia;
  if (
    m === "isLight" ||
    (!m && wm && !wm("(prefers-color-scheme: dark)").matches)
  ) {
    body.classList.toggle("light");
  }
})();

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
  if (body.classList.contains("light")) {
    localStorage.removeItem("doc_theme");
  } else {
    localStorage.setItem("doc_theme", "isLight");
  }
  body.classList.toggle("light");
  toggleTheme.classList.toggle("light");
});
