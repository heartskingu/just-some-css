// On Document ready
document.addEventListener(
  "DOMContentLoaded",
  function () {
    loadActivateSystem();
  },
  false
);

function loadActivateSystem() {
  _autoIncludeDeactivations();
  _loadActivateSystem();
  _loadActivateSystem(true);
}

function _loadActivateSystem(isDeactivating = false) {
  const prefix = isDeactivating ? "de" : "";

  // Get all elements with the property
  const activators = document.querySelectorAll(`[${prefix}activates]`);

  // For each element
  activators.forEach((el) => {
    // Get event type, default = click event
    const activatorType = el.getAttribute(`${prefix}activatorType`) ? el.getAttribute(`${prefix}activatorType`) : "click";

    // Get final (de)activator element, default = self element
    let activatorElement = _autoIncludeActivatorElement(el, prefix, activatorType);    

    // Get element that will be (de)activated
    const targetElements = document.querySelectorAll(
      el.getAttribute(`${prefix}activates`)
    );

    // Get callback function 
    const callback = el.getAttribute("activatedCallback");

    _addActivatorsListeners(el, activatorElement, activatorType, targetElements, callback);
  });
}

function _addActivatorsListeners(element, activatorElement, eventListenerType, targetElements, callback) {
  // On event of type
  activatorElement.addEventListener(eventListenerType, () => {
    targetElements.forEach((targetElement) => {
      // Toggle activated class
      if (targetElement.classList.contains("activated")) {
        targetElement.classList.remove("activated");
      } else {
        targetElement.classList.add("activated");
      }
    })

    // Call cllback function if any
    if (callback) {
      window[callback](element);
    }
  });
}

function _autoIncludeActivatorElement(element, prefix, activatorType) {
  const windowEvents = ["online", "offline"];
  const documentEvents = [];

  let activatorElement = element.getAttribute(`${prefix}activatorElement`)

  // If has a pre-defined activatorElement
  if (activatorElement && activatorElement !== "null" && activatorElement !== "undefined" ) {
    if (activatorElement == "window") {
      activatorElement = window;
    } else if (activatorElement == "document") {
      activatorElement = document;
    } else {
      activatorElement = document.querySelector(activatorElement);
    }
  } else {
    // Check if is an window or document event
    if (windowEvents.includes(activatorType)) {
      activatorElement = window;
    } else if (documentEvents.includes(activatorType)) {
      activatorElement = document;
    } else {
      activatorElement = element;
    }
  }

  return activatorElement;
}

function _autoIncludeDeactivations() {
  // Get all activator elements without deactivators, but that need them
  const queryString = `
    [activates][activatorType="mouseover"]:not([deactivates]),
    [activates][activatorType="mouseout"]:not([deactivates]),
    [activates][activatorType="offline"]:not([deactivates]),
    [activates][activatorType="online"]:not([deactivates])
  `
  const activators = document.querySelectorAll(queryString);
  
  activators.forEach((el) => {
    const activatorType = el.getAttribute("activatorType");
    const activatorElement = el.getAttribute("activatorElement");
    let deactivatorType = "";

    // Get opposing deactivatorType
    switch (activatorType) {
      case "mouseover":
        deactivatorType = "mouseout"
        break;
      case "mouseoout":
        deactivatorType = "mouseover"
        break;
      case "offline":
        deactivatorType = "online"
        break;
      case "online":
        deactivatorType = "offline"
        break;
    }

    el.setAttribute("deactivatorType", deactivatorType);
    el.setAttribute("deactivates", el.getAttribute("activates"));

    if (activatorElement) {
      el.setAttribute("deactivatorElement", el.getAttribute("activatorElement"));
    }
  });
}

// Side menu activator callback function
function toggleSideMenu() {
  const root = document.querySelector(":root");
  if (document.querySelector(".side-menu.activated")) {
    root.style.setProperty("--body-width", "70vw");
  } else {
    root.style.setProperty("--body-width", "100vw");
  }
}
