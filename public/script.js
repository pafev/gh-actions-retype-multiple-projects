const toggleSideBarElements = document.querySelectorAll(".__toggle-sidebar"),
  containerSideBar = document.querySelector(".container-sidebar"),
  toggleTheme = document.querySelector(".__toggle-theme"),
  body = document.querySelector("body");

(function () {
  (m = localStorage.getItem("doc_theme")), (wm = window.matchMedia);
  if (
    m === "light" ||
    (!m && wm && !wm("(prefers-color-scheme: dark)").matches)
  ) {
    body.classList.add("light");
    toggleTheme.classList.add("light");
  } else {
    body.classList.remove("light");
    toggleTheme.classList.remove("light");
  }
})();

function toggleContainerSideBar() {
  containerSideBar.classList.toggle("show-container-sidebar");
}

toggleSideBarElements.forEach((element) => {
  element.addEventListener("click", toggleContainerSideBar);
});

toggleTheme.addEventListener("click", () => {
  if (body.classList.contains("light")) {
    localStorage.setItem("doc_theme", "dark");
    toggleTheme.classList.remove("light");
    body.classList.remove("light");
  } else {
    localStorage.setItem("doc_theme", "light");
    toggleTheme.classList.add("light");
    body.classList.add("light");
  }
});
