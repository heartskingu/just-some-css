// On Document ready
document.addEventListener(
  "DOMContentLoaded",
  function () {
    loadActivateSystem();
    loadActivateSystem(true);
  },
  false
);

function loadActivateSystem(isDeactivating = false) {
  const prefix = isDeactivating ? "de" : "";
  // Get all activators elements
  var activators = document.querySelectorAll(`[${prefix}activates]`);

  // For each element
  activators.forEach((el) => {
    // Event type
    const activatorType = el.getAttribute(`${prefix}activatorType`) ? el.getAttribute(`${prefix}activatorType`) : "click";
    let activatorElement = el.getAttribute(`${prefix}activatorElement`);

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

    // Get element which will be activated
    const targetElements = document.querySelectorAll(
      el.getAttribute(`${prefix}activates`)
    );

    // Get callback function 
    const callback = el.getAttribute("callback");

    addActivatorsListeners(activatorElement, activatorType, targetElements, callback);
  });
}

function addActivatorsListeners(activatorElement, eventListenerType, targetElements, callback) {
  // On event type
  activatorElement.addEventListener(eventListenerType, () => {
    targetElements.forEach((targetEl) => {
      // Toggle activated class
      if (targetEl.classList.contains("activated")) {
        targetEl.classList.remove("activated");
      } else {
        targetEl.classList.add("activated");
      }
    })

    // Call cllback function if any
    if (callback) {
      window[callback]();
    }
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
