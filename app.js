function retrieveTheme() {
  let storedTheme = sessionStorage.getItem("storedColour");
  if (storedTheme) {
    document.documentElement.setAttribute("current-theme", storedTheme);
  }
}

retrieveTheme();
