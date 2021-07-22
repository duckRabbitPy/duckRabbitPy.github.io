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
console.log(
  "Note to console detectives: Syntax error on 119, 38 is internal to codepen"
);

//Flag issue
let ptags = document.getElementsByTagName("p");

document.addEventListener("keydown", (event) => {
  if (event.keyCode === 49) {
    flagForImprovement();
  }
});

function flagForImprovement() {
  let flagArray = [];
  let selectedPara = window.getSelection().focusNode.data;
  let selectedStr = window.getSelection().toString();

  flagArray.push({
    "flagged Word": selectedStr,
    "From paragraph": selectedPara,
  });

  let storedFlags = sessionStorage.getItem("flagged");

  if (storedFlags) {
    parsedFlags = JSON.parse(storedFlags);
    flagArray.push(parsedFlags);
  }

  let jsonArray = JSON.stringify(flagArray);
  sessionStorage.setItem("flagged", jsonArray);

  alert(`You have flagged **${selectedStr}**`);
}
