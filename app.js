function retrieveSettings() {
  let storedTheme = sessionStorage.getItem("storedColour");
  if (storedTheme) {
    document.documentElement.setAttribute("current-theme", storedTheme);
  }
  let storedSize = sessionStorage.getItem("storedFontSize");

  if (storedSize) {
    document.documentElement.style.setProperty("--font-size", storedSize);
  }
}

retrieveSettings();
