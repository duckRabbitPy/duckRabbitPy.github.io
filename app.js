//page agnostic JavaScript - needed for all pages
//see different HTML files for page specific JavaScript
//I took this approach as more managable for me to keep JS in same place as HTML
const scrollButton = document.querySelectorAll(".scroll-top");

scrollButton.forEach((elem) => {
  //take to main_content if using keyboard, not top of page
  elem.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      window.location.href = "#main_content";
    }
  });

  //if using mouse, fire smoothscroll function
  elem.addEventListener("click", () => {
    smoothscroll();
  });
});

//uses recursion (kinda)
//see explaination of how it works here: https://codepen.io/duckrabbitpy/pen/VwbPjvP
function smoothscroll() {
  var currentScroll =
    document.documentElement.scrollTop || document.body.scrollTop;
  if (currentScroll > 0) {
    window.requestAnimationFrame(smoothscroll);
    window.scrollTo(0, currentScroll - currentScroll / 10);
  }
}

//initialises google translate element
function googleTranslateElementInit() {
  new google.translate.TranslateElement(
    { pageLanguage: "en" },
    "google_translate_element"
  );
}

//listens for control + 8
//calls flagForImprovement function
document.addEventListener("keydown", (event) => {
  if (event.key === "8" && event.ctrlKey) {
    flagForImprovement();
  }
});

//listens for control + 9
//redirects to feedback page
document.addEventListener("keydown", (event) => {
  if (event.key === "9" && event.ctrlKey) {
    window.location = "/pages/feedback.html";
  }
});

//takes selected text and stores flagged texted in a JSON array in session storage
function flagForImprovement() {
  let flagArray = [];
  //gets selected paragraph
  let selectedPara = window.getSelection().focusNode.data;
  //gets selected string
  let selectedStr = window.getSelection().toString();

  //insert <mark> tags around selected string
  let markedContent = selectedPara.replace(
    selectedStr,
    `<mark>${selectedStr}</mark>`
  );

  //push marked text into flag array
  flagArray.push({
    flaggedContent: markedContent,
  });

  //get any existing flags from session storage
  let storedFlags = sessionStorage.getItem("flagged");

  if (storedFlags) {
    //parse the JSON into normal array
    parsedFlags = JSON.parse(storedFlags);
    //push the existing flags into the flag array containing the new flag
    parsedFlags.forEach((flag) => {
      flagArray.push(flag);
    });
  }

  //stringify the flagArray to prepare for storage
  let jsonArray = JSON.stringify(flagArray);
  //store jsonArray in session storage
  sessionStorage.setItem("flagged", jsonArray);
  //let user know what they have flagged
  alert(`You have flagged **${selectedStr}**`);
}
