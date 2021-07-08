//page agnostic Javascript

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
      "-apple-system, BlinkMacSystemFont Roboto, Oxygen, Ubuntu, Cantarell"
    );
  }
}

retrieveSettings();

const keyNavElements = document.querySelectorAll(".key-nav");
[...keyNavElements].forEach((elem) => {
  elem.addEventListener("keydown", (event) => {
    if (event.keyCode === 13) {
      let newLocation = event.target.childNodes[1].href;
      window.location.href = newLocation;
    }
  });

  //This function ensures that any user that misses the a tag link
  //and hits some of the surrounding li tag, that they will still be sent to correct place
  elem.addEventListener("click", (event) => {
    let newLocation = event.target.childNodes[1].href;
    window.location.href = newLocation;
  });
});

const aboutNav = document.querySelector(".key-nav-about");

function googleTranslateElementInit() {
  new google.translate.TranslateElement(
    { pageLanguage: "en" },
    "google_translate_element"
  );
}
