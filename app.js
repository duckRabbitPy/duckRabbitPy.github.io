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
  var currentScroll =
    document.documentElement.scrollTop || document.body.scrollTop;
  if (currentScroll > 0) {
    window.requestAnimationFrame(smoothscroll);
    window.scrollTo(0, currentScroll - currentScroll / 10);
  }
}

//Real life use recursive function
//currentScroll is the current distance that the page has been scrolled down the page. If the page is not at the top (currentScroll = 1 or more pixels) ask the browser to call the smoothscroll function (again) before the next repaint by passing it to window.requestAnimationFrame().

//In the current call of the smoothscroll function, scroll towards the top a fraction of the distance from the top of the page. The scrollTo function takes two arguments, new X co-ordinate and new Y co-ordinate. We are setting the new Y co-ordinate (vertical co-ordinate) to be reduced by a tenth of the remaining distance from top of page in the current smoothscroll execution.

//Although there is no return value, this is a recursive function in that it will effectively call itself through requestAnimation frame until the viewer is at the top (currentScroll = 0). currentScroll === 0 is the limit condition for the function, but it could in theory scroll billions of pixels if there was an extremlely long web page.
//As you are scrolling up by an amount determined by currentScroll, and currentScroll is an ever decreasing value, this has the effect of 'slowing down' towards the top and therefore creating the smooth scroll effect.

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
      "-apple-system, BlinkMacSystemFont, Roboto, Oxygen, Ubuntu, Cantarell"
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

function googleTranslateElementInit() {
  new google.translate.TranslateElement(
    { pageLanguage: "en" },
    "google_translate_element"
  );
}
console.log("Note: Syntax error on 120, 38 is internal to codepen");
