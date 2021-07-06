document.addEventListener(
  "DOMContentLoaded",
  function () {
    loadActivators();
  },
  false
);

function loadActivators() {
  var activators = document.querySelectorAll("[activates]");
  activators.forEach((el) => {
    el.addEventListener("click", () => {
      const targetElement = document.getElementById(
        el.getAttribute("activates")
      );
      const callback = el.getAttribute("callback");

      if (targetElement.classList.contains("activated")) {
        targetElement.classList.remove("activated");
      } else {
        targetElement.classList.add("activated");
      }

      if (callback) {
        window[callback]();
      }
    });
  });
}

function activatableFuntions() {
  toggleSideMenu();
}

function toggleSideMenu() {
  const root = document.querySelector(":root");
  if (document.querySelectorAll(".side-menu.activated").length > 0) {
    root.style.setProperty("--body-width", "70vw");
  } else {
    root.style.setProperty("--body-width", "100vw");
  }
}
