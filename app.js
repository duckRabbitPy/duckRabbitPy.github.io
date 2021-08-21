//page agnostic Javascript
const scrollButton = document.querySelectorAll(".scroll-top");

console.log(
  "Note to console detectives: Syntax error on 119, 38 is internal to codepen"
);

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
keyNavElements.forEach((elem) => {
  elem.addEventListener("keydown", (event) => {
    if (event.keyCode === 13) {
      let newLocation = event.target.childNodes[1].href;
      if (newLocation) {
        window.location.href = newLocation;
      }
    }
  });
});

function googleTranslateElementInit() {
  new google.translate.TranslateElement(
    { pageLanguage: "en" },
    "google_translate_element"
  );
}

document.addEventListener("keydown", (event) => {
  console.log(event.key);
  if (event.key === "8" && event.ctrlKey) {
    flagForImprovement();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "9" && event.ctrlKey) {
    window.location = "/pages/feedback.html";
  }
});

function flagForImprovement() {
  let flagArray = [];
  let selectedPara = window.getSelection().focusNode.data;
  let selectedStr = window.getSelection().toString();

  let selectedIndex = selectedPara.indexOf(selectedStr);
  let head = selectedPara.substring(0, selectedIndex);
  let middle = `<mark>${selectedStr}</mark>`;
  let tail = selectedPara.substring(
    selectedIndex + selectedStr.length,
    selectedPara.length
  );

  let markedContent = head + middle + tail;

  flagArray.push({
    flaggedContent: markedContent,
  });

  let storedFlags = sessionStorage.getItem("flagged");

  if (storedFlags) {
    parsedFlags = JSON.parse(storedFlags);

    parsedFlags.forEach((flag) => {
      flagArray.push(flag);
    });
  }

  let jsonArray = JSON.stringify(flagArray);
  sessionStorage.setItem("flagged", jsonArray);

  alert(`You have flagged **${selectedStr}**`);
}
