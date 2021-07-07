// On Document ready
document.addEventListener(
  "DOMContentLoaded",
  function () {
    loadActivators();
  },
  false
);

function loadActivators() {
  // Get all activators elements
  var activators = document.querySelectorAll("[activates]");

  // For each element
  activators.forEach((el) => {
    // Event type
    const activatorType = el.getAttribute("activatorType");
    const eventListenerType = activatorType ? activatorType : "click";
    let activatorElement = el.getAttribute("activatorElement");

    if (activatorElement) {
      if (activatorElement == "window") {
        activatorElement = window;
      } else if (activatorElement == "document") {
        activatorElement = document;
      } else {
        activatorElement = document.querySelector(activatorElement);
      }
    } else {
      activatorElement = el;
    }

    // On event type
    activatorElement.addEventListener(eventListenerType, () => {

      // Get element which will be activated
      const targetElement = document.querySelector(
        el.getAttribute("activates")
      );

      // Get callback function 
      const callback = el.getAttribute("callback");

      // Toggle activated class
      if (targetElement.classList.contains("activated")) {
        targetElement.classList.remove("activated");
      } else {
        targetElement.classList.add("activated");
      }

      // Call cllback function if any
      if (callback) {
        window[callback]();
      }
    });
  });
}

// Side menu activator callback function
function toggleSideMenu() {
  const root = document.querySelector(":root");
  if (document.querySelectorAll(".side-menu.activated").length > 0) {
    root.style.setProperty("--body-width", "70vw");
  } else {
    root.style.setProperty("--body-width", "100vw");
  }
}
