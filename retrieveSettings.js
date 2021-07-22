function retrieveSettings() {
  let storedTheme = sessionStorage.getItem("storedColour");
  if (storedTheme) {
    document.documentElement.setAttribute("current-theme", storedTheme);
  }

  let storedSize = sessionStorage.getItem("storedFontSize");
  if (storedSize) {
    document.documentElement.style.setProperty("--font-size", storedSize);
  }

  let storedFontFamily = sessionStorage.getItem("storedFontFamily");
  if (storedFontFamily === "serif") {
    document.documentElement.style.setProperty(
      "--font-family",
      "'serif', 'Georgia', 'Lucida'"
    );
  } else if (storedFontFamily === "sans") {
    document.documentElement.style.setProperty(
      "--font-family",
      "'-apple-system', 'BlinkMacSystemFont', 'Arial', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell'"
    );
  } else if (storedFontFamily === "openD") {
    document.documentElement.style.setProperty("--font-family", "openDyslexic");
  }

  let animationState = sessionStorage.getItem("animationState");
  if (animationState === "off") {
    document.documentElement.setAttribute("animation-state", "off");
  } else {
    animationState = "on";
    document.documentElement.setAttribute("animation-state", "on");
  }
}

retrieveSettings();
