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
});

const aboutNav = document.querySelector(".key-nav-about");
