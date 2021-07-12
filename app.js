//page agnostic Javascript
const scrollButton = document.querySelectorAll(".scroll-top");

scrollButton.forEach((elem) => {
  //want to take to main_content if using keyboard, not top of page
  elem.addEventListener("keydown", (event) => {
    if (event.keyCode === 13) {
      window.location.href = "#main_content";
    }
  });

  elem.addEventListener("click", () => {
    smoothscroll();
  });
});

function smoothscroll() {
  //currentScroll is the number of pixels being scrolled
  var currentScroll =
    document.documentElement.scrollTop || document.body.scrollTop;
  if (currentScroll > 0) {
    //if the page is currently scrolling (1 or more pixels)
    //ask the browser to fire the smoothscroll function (again) before the next repaint
    window.requestAnimationFrame(smoothscroll);
    //In the current call of the smoothscroll function,
    //scroll towards the top a fraction of the number of pixels currently being scrolled
    //this is a recursive function so will continue to be called until at the top
    //this has the effect of 'slowing down' towards the top
    window.scrollTo(0, currentScroll - currentScroll / 10);
  }
}

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
z;
function googleTranslateElementInit() {
  new google.translate.TranslateElement(
    { pageLanguage: "en" },
    "google_translate_element"
  );
}
