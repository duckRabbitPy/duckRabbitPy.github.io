//all JavaScript merged for convienience

//page agnostic JavaScript - needed for all pages
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

//index page specific JS
//if current theme is darkTheme set dark theme landing page svg
const landingSvg = document.querySelector(".landing-img");
function retrieveSvgTheme() {
  let storedTheme = sessionStorage.getItem("storedColour");
  if (storedTheme === "dark-theme") {
    landingSvg.src = "/images/everyoneDarkTheme.svg";
  } else {
    landingSvg.src = "/images/everyone.svg";
  }
}
//retrieve theme
retrieveSvgTheme();

//about page specific JavaScript, allows key navigation to profile links
const profileListItems = document.querySelectorAll(".profile-li");
profileListItems.forEach((elem) => {
  elem.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      //user must have pop ups enabled for this approach to work
      let newLocation = event.target.childNodes[1].firstElementChild.href;
      window.open(newLocation, "_blank");
    }
  });
});

// feedback page specific JavaScript
const feedback = document.getElementById("feedback");
const emailBtn = document.getElementById("email");
const suggestionTxt = document.getElementById("suggestion");

// get array of flagged objects
let flagged = JSON.parse(sessionStorage.getItem("flagged"));
let feedbackHTML = "";
let emailFlagged = "";

// iterate through array, replace flaggecContent double spaces with single spaces, replace mark tags with asterisks,
// add to emailFlagged variable and also display text as list item
if (flagged) {
  flagged.forEach((elem) => {
    emailFlagged +=
      elem.flaggedContent
        .replace(/\s\s+/g, " ")
        .replace(`<mark>`, `***`)
        .replace(`</mark>`, `***`) + "%0D%0A%0D%0A";

    feedbackHTML += `<li>${elem.flaggedContent}</li>`;
  });
  feedback.innerHTML = feedbackHTML;
}

//When clicked open a new email window with template text and populate with contents of emailFlagged string
emailBtn.addEventListener("click", () => {
  let suggestion = suggestionTxt.value;
  let body =
    "Dear Oli" +
    "%0D%0A%0D%0A" +
    `Please take a look at: ${emailFlagged}` +
    "%0D%0A" +
    "%0D%0A" +
    `${suggestion}`;
  window.open(
    `mailto:duckrabbitpython@gmail.com?subject=website suggestion&body=${body}`
  );
});

//inclusive page specific JavaScript
const neuroSvg = document.getElementById("neuro_icon");
const handSvg = document.getElementById("hand_icon");
const languageSvg = document.getElementById("language_icon");
const diversitySvg = document.getElementById("diversity_icon");
const visualSvg = document.getElementById("visual_icon");
const digitalSvg = document.getElementById("digi_icon");

const randomUserBtn = document.getElementById("random_user_btn");
const userProperties = document.getElementById("user_properties");

const diceNumber = document.getElementById("dice");
const options = document.querySelectorAll(".inclusive-link");

const hiddenSections = document.querySelectorAll(".hidden");
const showCodeBtn = document.querySelectorAll(".show-code");
const asides = document.querySelectorAll(".example-aside");

const filterBtns = document.querySelectorAll(".filter-btn");
const multiCImg = document.querySelectorAll(".multi_coloured");
const getImgBtn = document.getElementById("get_ImageUrl");
const customUrl = document.getElementById("customUrl");
const customImg = document.getElementById("cutomisable_Img");

const customUpload = document.getElementById("custom_upload");

const analyseForm = document.getElementById("analysis_form");
const textInput = document.getElementById("text_input");
const complexResult = document.getElementById("complexity_result");

retrieveIconSvgTheme();

//controls hiding and showing of inclusive sections, utilises array methods for efficient code
options.forEach((option) => {
  option.addEventListener("click", (event) => {
    //key event also emits a click event if element is in focus,
    //so need to check if 'true' mouse click
    //key event has co-ordinates 0,0 so !x && !y evaluates to true and returns early
    var x = event.x || event.clientX;
    var y = event.y || event.clientY;
    if (!x && !y) {
      return;
    } else {
      //get selected topic name
      //event.currentTarget refers to element that eventListener is on
      //the event will bubble up if clicked on by children
      let topic = event.currentTarget.id;

      //iterate through all sections, if the selected id matches the topic remove 'hidden' and add 'onShow' class
      //else add hidden class
      hiddenSections.forEach((elem) => {
        if (elem.id.includes(topic)) {
          elem.classList.remove("hidden");
          elem.classList.add("onShow");
        } else {
          elem.classList.remove("onShow");
          elem.classList.add("hidden");
        }
      });
    }
  });
});

//for keyboard users
options.forEach((option) => {
  option.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      //get topic
      let topic = event.target.id;
      hiddenSections.forEach((elem) => {
        //iterate through all sections, if the selected id matches the topic remove 'hidden' and add 'onShow' class
        //else add hidden class
        if (elem.id.includes(topic)) {
          elem.classList.remove("hidden");
          elem.classList.add("onShow");
        } else if (!elem.id.includes(topic)) {
          elem.classList.remove("onShow");
          elem.classList.add("hidden");
        }
      });
    }
  });
});

//theming with icons
function retrieveIconSvgTheme() {
  //get teh stored theme from session storage if it exists
  let storedTheme = sessionStorage.getItem("storedColour");

  //if dark-theme set to dark svg image set
  if (storedTheme === "dark-theme") {
    neuroSvg.src = "/images/neuroDarkTheme.svg";
    handSvg.src = "/images/handDarkTheme.svg";
    languageSvg.src = "/images/languageDarkTheme.svg";
    diversitySvg.src = "/images/diversityDarkTheme.svg";
    visualSvg.src = "/images/visualDarkTheme.svg";
    digitalSvg.src = "/images/digiDarkTheme.svg";
  }
  //if light-theme or easy-read-theme set to default svg image set
  else {
    neuroSvg.src = "/images/neuro.svg";
    handSvg.src = "/images/hand.svg";
    languageSvg.src = "/images/language.svg";
    diversitySvg.src = "/images/diversity.svg";
    visualSvg.src = "/images/visual.svg";
    digitalSvg.src = "/images/digi.svg";
  }
}

//visual impairment section,
filterBtns.forEach((elem) => {
  elem.addEventListener("click", (event) => {
    //each button has a data-filter attribute
    //get the filter attribute
    let filter = event.target.dataset.filter;
    if (filter === "sightLoss") {
      //if attribute is sightLoss, add sightLoss class to multi-coloured image
      multiCImg.forEach((elem) => elem.classList.add("sightLoss"));
    } else {
      //otherwise, set --vision-filter css variable to the data-filter attribute e.g. "hue-rotate(25deg) saturate(50%) sepia(5%)"
      document.documentElement.style.setProperty("--vision-filter", filter);
      multiCImg.forEach((elem) => elem.classList.remove("sightLoss"));
    }
  });
});

//visual impairment section
//sets image that user chooses via local file upload or web URL path
getImgBtn.addEventListener("submit", (event) => {
  event.preventDefault();
  //gets value from custom upload input
  if (customUpload.value) {
    //create a local file src from customUpload.files, this is a path to the local file
    //set the custom image src to the local file src
    let localFileSrc = window.URL.createObjectURL(customUpload.files[0]);
    customImg.src = localFileSrc;
    //clear the custom upload field to allow new entry
    customUpload.value = "";
  }
  //if there is no custom upload, check to see if user as input a url instead
  //if so set the custom image src to the url
  else if (customUrl.value) {
    let newSrc = customUrl.value;
    customImg.src = newSrc;
    //clear the custom URL field to allow new entry
    customUrl.value = "";
  }
});

//dice roll 'animation' using nested setTimeouts
randomUserBtn.addEventListener("click", () => {
  setTimeout(() => {
    rollDice();
    setTimeout(() => {
      rollDice();
      setTimeout(() => {
        rollDice();
        //finally call createUser function and set properties on user object
        createUser();
      }, 300);
    }, 300);
  }, 300);
});

function rollDice() {
  let num = Math.floor(Math.random() * 6 + 1);
  diceNumber.src = `../images/${num}.svg`;
}

//random user generator
//user object starts off with 'not set' for all properties
//when createUser() is called, the data is fetched from data files and random properties are set
//fun foray into object oriented programming!

let user = {
  Name: "not set",
  Age: "not set",
  MainDevice: "not set",
  InternetSpeed: "not set",
  PreferredLanguage: "not set",
  CurrentlyLivingIn: "not set",
  AccessibilityConsideration: "not set",

  async randName() {
    let nameData = await fetchData("names");
    return nameData[Math.floor(Math.random() * nameData.length)].first_name;
  },

  async randLanguage() {
    if (Math.random() > 0.3) {
      let languageData = await fetchData("language");
      return languageData[Math.floor(Math.random() * languageData.length)];
    } else {
      return "English";
    }
  },

  async randCountry() {
    let countryData = await fetchData("countries");
    return countryData[Math.floor(Math.random() * countryData.length)].name;
  },

  randAge() {
    this.Age = Math.floor(gaussianRand() * (100 - 12) + 12);
  },

  randInternetSpeed() {
    this.InternetSpeed = `${Math.floor(gaussianRand() * 90)} mb/s`;
  },

  randDevice() {
    const devices = [
      "cheap laptop",
      "high spec laptop",
      "macbook",
      "iphone",
      "android phone",
      "gaming PC",
      "old desktop computer",
      "android tablet",
      "ipad",
      "library computer",
    ];
    this.MainDevice = devices[Math.floor(Math.random() * devices.length)];
  },

  randAccessibility() {
    const considerations = [
      "partially sighted and uses screen reader to navigate",
      "dislikes flashing images",
      "struggles with font smaller than 16pt",
      "finds precise tasks with the mouse difficult",
      "has total hearing loss",
      "primarily uses keyboard to navigate",
      "appeciates high contrast when reading",
      "does not like bright screens",
      "needs more time when typing",
      "finds it hard to concentrate on large blocks of text",
    ];
    this.AccessibilityConsideration =
      considerations[Math.floor(Math.random() * considerations.length)];
  },
};

//create an aproximately normal distribution betwen 0 and 1
function gaussianRand() {
  let rand = 0;
  for (var i = 0; i < 6; i += 1) {
    rand += Math.random();
  }
  return rand / 6;
}

async function fetchData(dataField) {
  let data = await fetch(`../data/${dataField}.json`)
    .then((res) => res.json())
    .catch((err) => {
      throw err;
    });
  return data;
}

async function createUser() {
  //create new user object
  let newUser = Object.create(user);

  //call methods that need to collect json for their properties
  let name = await newUser.randName();
  let language = await newUser.randLanguage();
  let country = await newUser.randCountry();

  ////fire synchronous methods to set other properties
  newUser.randAge();
  newUser.randInternetSpeed();
  newUser.randDevice();
  newUser.randAccessibility();

  //once async data has been collected, set properties on user object
  newUser.Name = name;
  newUser.PreferredLanguage = language;
  newUser.CurrentlyLivingIn = country;

  userProperties.innerHTML = `<b>Name</b>: ${newUser.Name}
    <br> <b>Age</b>: ${newUser.Age}
    <br> <b>Currently in </b>: ${newUser.CurrentlyLivingIn}
    <br> <b>Internet Speed </b> ${newUser.InternetSpeed}
    <br> <b>Preferred language </b>: ${newUser.PreferredLanguage} <br> <b>Main device</b>: ${newUser.MainDevice}
    <br> <b> Accessibility consideration </b>: ${newUser.AccessibilityConsideration}`;
}

//language section readability analysis
//based on a readability formula found on wikipedia https://en.wikipedia.org/wiki/Dale%E2%80%93Chall_readability_formula
//asynchronous because fetching list of 3000 words from data folder
analyseForm.addEventListener("submit", async function analyse(event) {
  event.preventDefault();
  //get user input words
  let inputWords = textInput.value;
  //collect easy words from data folder
  let easyWordData = await fetchData("dale-chall");
  //feed input words and easy words into daleChall function
  daleChall(inputWords, easyWordData);
});

function daleChall(text, easyWords) {
  let textData = text;
  let numSentences = 1;
  //count sentences by splitting on full stops and counting array length
  text.includes(".")
    ? (numSentences = text.split(".").length)
    : (textData += ".");

  //remove anything that isn't a letter or a space and set measurement variables
  let sanitised = text.replace(/[^a-zA-Z\s]/g, "");
  let hardWords = 0;
  let numWords = 0;
  let adjustment = 0;
  let longWords = [];

  //iterate through words, if word is isn't in easy words list increment hardWords
  //if word is over 10 characters in length and isn't already in array, push to long words array
  sanitised.split(" ").forEach((word) => {
    numWords++;
    if (!easyWords.includes(word.toLowerCase())) {
      hardWords++;
    }
    if (word.length > 10) {
      //only push if unique
      if (!longWords.includes(word.toLowerCase())) {
        longWords.push(word);
      }
    }
  });

  //dale chall adjustment formula
  if (hardWords / numWords > 0.05) {
    adjustment = 3.6365;
  }

  //dale chall formula
  let score = (
    0.1579 * ((hardWords / numWords) * 100) +
    0.0496 * (numWords / numSentences) +
    adjustment
  ).toFixed(1);

  //calculate percentage easy words
  let percentageHard = Math.floor((hardWords / numWords) * 100);
  let percentageEasy = 100 - percentageHard;

  //secondary test to ensure unique
  let uniqueLongWords = longWords.filter((word) => word.upp);

  //set comprehension variable and change according to score
  let comprehension = "not calculated";

  if (score < 4) {
    comprehension = "Nursery level English";
  } else if (score < 8) {
    comprehension = "Primary School level English";
  } else if (score < 12) {
    comprehension = "High school level English";
  } else if (score < 16) {
    comprehension = "College level English";
  } else if (score > 16) {
    comprehension = "Graduate or specialised field level English";
  }

  //set innerHTML message with results
  complexResult.innerHTML = `
  <b>Overall score: ${score}</b> (Requires at least ${comprehension}) <br><br>
  <b> Number of words:</b> ${numWords} <br><br>
  <b> Long words:</b> ${longWords} <br><br>
  <b> Number of sentences:</b> ${numSentences} <br><br>
  <b> Number of more difficult words:</b> ${hardWords} <br><br>
  <b> Percentage 'easy' words:</b> ${percentageEasy}%<br><br>
   `;
}

//settings page specific JavaScript
const themeToggle = document.querySelector(".toggle-dark");
const easyToggle = document.querySelector(".toggle-easy");
const fontButtons = document.querySelectorAll(".size-btn");
const animationBtn = document.getElementById("animation_btn");
const resetBtn = document.getElementById("reset_btn");

const translateElem = document.getElementById("google_translate_element");

//font size buttons
fontButtons.forEach((elem) => {
  elem.addEventListener("click", (event) => {
    let targetSize = event.target.id;

    //if user has used google translate it messes up the event target
    //so if the id is not retrieved, get the parent parent id which should be correct
    if (!event.target.id) {
      targetSize = event.target.parentElement.parentElement.id;
    }

    document.documentElement.style.setProperty("--font-size", targetSize);
    sessionStorage.setItem("storedFontSize", targetSize);
    setOnState(event);
  });
});

//font-family buttons
const sansButton = document.getElementById("sans");
const serifButton = document.getElementById("serif");
const openDButton = document.getElementById("openDyslexic");
const fontFamilyBtns = [sansButton, serifButton, openDButton];

//dark theme toggle button
//if current theme is light or easy read or null, set dark theme
//by default teh fallback target theme is light
themeToggle.addEventListener("click", () => {
  let currentTheme = document.documentElement.getAttribute("current-theme");
  let targetTheme = "light-theme";

  if (
    currentTheme === "light-theme" ||
    currentTheme === "easy-read-theme" ||
    currentTheme === null
  ) {
    targetTheme = "dark-theme";
  }

  document.documentElement.setAttribute("current-theme", targetTheme);
  //set storedColour to target Theme in session storage
  sessionStorage.setItem("storedColour", targetTheme);
});

//easy read (pastel mode) toggle button
//if current theme is light or dark or null, set easy read theme
//by default teh fallback target theme is light
easyToggle.addEventListener("click", () => {
  let currentTheme = document.documentElement.getAttribute("current-theme");
  let targetTheme = "light-theme";

  if (
    currentTheme === "light-theme" ||
    currentTheme === "dark-theme" ||
    currentTheme === null
  ) {
    targetTheme = "easy-read-theme";
  }

  document.documentElement.setAttribute("current-theme", targetTheme);
  sessionStorage.setItem("storedColour", targetTheme);
});

//font family buttons
//store chosen font in session storage as a string
serifButton.addEventListener("click", () => {
  document.documentElement.style.setProperty(
    "--font-family",
    "'serif', 'Georgia', 'Lucida'"
  );
  sessionStorage.setItem("storedFontFamily", "serif");
  //reconfigure on state of all buttons
  setOnState();
});

sansButton.addEventListener("click", () => {
  document.documentElement.style.setProperty(
    "--font-family",
    "'-apple-system', 'BlinkMacSystemFont', 'Arial', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell'"
  );
  sessionStorage.setItem("storedFontFamily", "sans");
  //reconfigure on state of all buttons
  setOnState();
});

openDButton.addEventListener("click", () => {
  document.documentElement.style.setProperty("--font-family", "openDyslexic");
  sessionStorage.setItem("storedFontFamily", "openDyslexic");
  //reconfigure on state of all buttons
  setOnState();
});

//disable animation
//store animation state as 'off' (this button doesn't toggle but can be reset)
animationBtn.addEventListener("click", (event) => {
  sessionStorage.setItem("animationState", "off");
  alert("animations switched off");
  //reconfigure on state of all buttons
  setOnState();
});

//sets styling of button based on whether the button has been selected
function setOnState(event) {
  let storedSize = sessionStorage.getItem("storedFontSize");
  let storedFamily = sessionStorage.getItem("storedFontFamily");
  let animationState = sessionStorage.getItem("animationState");
  fontButtons.forEach((btn) => {
    if (storedSize === null) {
      return;
    }
    //if button id matches that which is stored in session storage, add active class, else remove
    if (btn.id === storedSize) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  fontFamilyBtns.forEach((btn) => {
    if (storedFamily === null) {
      return;
    }
    //if button id matches that which is stored in session storage, add active class, else remove
    if (btn.id === storedFamily) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  //if animationState is 'off' add active class, else remove
  animationState === "off"
    ? animationBtn.classList.add("active")
    : animationBtn.classList.remove("active");
}

resetBtn.addEventListener("click", () => {
  //clear all from session storage
  sessionStorage.clear();
  //set google translate cookie expiration date to a date that has passed
  //as the cookie is expired the language selected will reset on refresh
  document.cookie =
    "googtrans" + "=;Path=/;Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  //reload page
  location.reload();
});

//setOnState called first time page is loaded
setOnState();

//digital health page specific JavaScript
const domainBtns = document.querySelectorAll(".domain-btn");
const digiLanding = document.querySelector(".digi-health-landing");

const currentMood = document.getElementById("mood_slider");
const displayMood = document.getElementById("display_mood");

const currentSleep = document.getElementById("sleep_slider");
const displaySleep = document.getElementById("display_sleep");

const currentNutrition = document.getElementById("nutrition_slider");
const displayNutrition = document.getElementById("display_nutrition");

const currentSocial = document.getElementById("social_slider");
const displaySocial = document.getElementById("display_social");

const currentExercise = document.getElementById("exercise_slider");
const displayExercise = document.getElementById("display_exercise");
const containers = document.querySelectorAll(".domain");
const sliders = document.querySelectorAll(".slider");
const sliderDisplay = document.querySelectorAll(".slider-display");

const startBtn = document.getElementById("start_quiz");
const nextBtns = document.querySelectorAll(".next-btn");

const dashBoard = document.querySelector(".dashboard-container");
const resultContainer = document.querySelector(".result-container");
const suggestions = document.querySelector(".suggestions");

const moodResult = document.getElementById("mood_result");
const sleepResult = document.getElementById("sleep_result");
const nutritionResult = document.getElementById("nutrition_result");
const socialResult = document.getElementById("social_result");
const exerciseResult = document.getElementById("exercise_result");

const lowScoringAlert = document.getElementById("low_scoring");
const highScoringAlert = document.getElementById("high_scoring");
const moodSuggestions = document.getElementById("mood_suggestions");
const sleepSuggestions = document.getElementById("sleep_suggestions");
const nutritionSuggestions = document.getElementById("nutrition_suggestions");
const socialSuggestions = document.getElementById("social_suggestions");
const exerciseSuggestions = document.getElementById("exercise_suggestions");

const moodIcon = document.getElementById("mood_icon");
const sleepIcon = document.getElementById("sleep_icon");
const nutritionIcon = document.getElementById("nutrition_icon");
const socialIcon = document.getElementById("social_icon");
const exerciseIcon = document.getElementById("exercise_icon");

//create object to hold scores and arrays to store high and low scores
let scoresObject = {};
let lowScoring = [];
let highScoring = [];

//display first slider container and hide landing container when 'lets get started is clicked'
startBtn.addEventListener("click", () => {
  [...containers][0].classList.remove("hidden");
  digiLanding.style.display = "none";
});

//next button
//this function controls the flow through the mood sliders and sets the results and suggestions
nextBtns.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    //chosen value is the resting slider value coupled with the current next button
    //sliderType is the domain that the slider coupled with the current next button
    let chosenValue = event.target.parentNode.firstElementChild.value;
    let sliderType = event.target.parentNode.firstElementChild.name;

    //add the sliderType and chosenValue to the scoresObject
    scoresObject[sliderType] = chosenValue;

    //reveals next container in sequence and hides all others
    containers.forEach((container, index) => {
      //iterate through the array of containers and get the class of each container
      let containerClass = container.classList[0];
      //if the class name of the container is included in the class string coupled with the current next button
      //AND the index in the iteration of containers is less than 4 (i.e is not the final container in array)
      //remove hidden from the 'next' container in the array, thereby revealing the next health domain container
      //for all other containers, add hidden
      if (
        containerClass.includes(btn.parentElement.parentNode.classList[0]) &&
        index < 4
      ) {
        [...containers][index + 1].classList.remove("hidden");
        [...containers][index].classList.add("hidden");
      }
      //when index is 4 all sliders have been completed, so reveal dashboard and results
      if (
        containerClass.includes(btn.parentElement.parentNode.classList[0]) &&
        index === 4
      ) {
        //hide slider containers
        [...containers][index].classList.add("hidden");

        //reveal results dashboard and suggestions
        //set score inner HTML utilising the scoresObject to get values
        dashBoard.classList.remove("hidden");
        resultContainer.classList.remove("hidden");
        suggestions.classList.remove("hidden");
        moodResult.innerHTML = `Mood score: ${scoresObject.mood_slider}`;
        sleepResult.innerHTML = `Sleep score: ${scoresObject.sleep_slider}`;
        nutritionResult.innerHTML = `Nutrition score: ${scoresObject.nutrition_slider}`;
        socialResult.innerHTML = `Social score: ${scoresObject.social_slider}`;
        exerciseResult.innerHTML = `Exercise score: ${scoresObject.exercise_slider}`;

        //show positive icons for those domains with scores > 5
        showPositiveIcon(scoresObject.mood_slider, moodIcon);
        showPositiveIcon(scoresObject.sleep_slider, sleepIcon);
        showPositiveIcon(scoresObject.nutrition_slider, nutritionIcon);
        showPositiveIcon(scoresObject.social_slider, socialIcon);
        showPositiveIcon(scoresObject.exercise_slider, exerciseIcon);

        //iterate through scoreObject using object.entries()
        //parse the first part of the entry key name to get the domain
        //if score is less than 5 push domain into low scoring array and reveal suggestion for that domain
        //if score is greater than 5 push domain into high scoring array and reveal suggestion for that domain
        let scoreEntries = Object.entries(scoresObject);
        scoreEntries.forEach((entry) => {
          let breakIndex = entry[0].indexOf("_");
          let domain = entry[0].slice(0, breakIndex);
          if (entry[1] < 5) {
            lowScoring.push(domain);
            revealSuggestion(domain);
          }
          if (entry[1] > 5) {
            highScoring.push(domain);
            welldoneMsg(domain);
          }
        });

        //If all scores are 5's
        if (lowScoring.length === 0 && highScoring.length === 0) {
          highScoringAlert.innerHTML =
            "All 5's! Straight down the middle is a good the place to be, so no suggestions this week!";
        }

        //generate suggestion text based on score values
        generateSuggestionText();

        //set percentage width of score bars based on respective scores
        document.documentElement.style.setProperty(
          "--moodbar-width",
          `${scoresObject.mood_slider * 10}%`
        );
        document.documentElement.style.setProperty(
          "--sleepbar-width",
          `${scoresObject.sleep_slider * 10}%`
        );
        document.documentElement.style.setProperty(
          "--nutritionbar-width",
          `${scoresObject.nutrition_slider * 10}%`
        );
        document.documentElement.style.setProperty(
          "--socialbar-width",
          `${scoresObject.social_slider * 10}%`
        );
        document.documentElement.style.setProperty(
          "--exercisebar-width",
          `${scoresObject.exercise_slider * 10}%`
        );
      }
    });
  });
});

//Generate suggestion text based on scores provided
function generateSuggestionText() {
  //if plural set to domains, if singular set to domain
  let area = lowScoring.length > 1 ? "domains" : "domain";
  //join multiple low domains with a + sign
  let lowDomains = lowScoring.join("+");

  //if there are scores lower than 5 set suggestion message for domains to work on
  if (lowDomains) {
    lowScoringAlert.innerHTML = `It looks like next week you could do with working on the ${[
      lowDomains,
    ]} ${area} of health!
  Follow the links for some great resources that can help boost your health
  and wellbeing`;
  }
}

function welldoneMsg(domain) {
  //if plural set to domains, if singular set to domain
  let area = highScoring.length > 1 ? "domains" : "domain";
  //if plural set to have, if singular set to has
  let pastTense = highScoring.length > 1 ? "have" : "has";
  //join multiple high domains with a + sign
  let highDomains = highScoring.join("+");

  //if there are scores higher than 5 set well done message
  if (highDomains) {
    highScoringAlert.innerHTML = `It's great to see that your ${highDomains} ${area} of health ${pastTense} been good this week, keep it going!!`;
  }
}

//takes in a domain as an argument and reveals corresponding suggestion
function revealSuggestion(domain) {
  if (domain === "mood") {
    moodSuggestions.classList.remove("hidden");
  } else if (domain === "sleep") {
    sleepSuggestions.classList.remove("hidden");
  } else if (domain === "nutrition") {
    nutritionSuggestions.classList.remove("hidden");
  } else if (domain === "social") {
    socialSuggestions.classList.remove("hidden");
  } else if (domain === "exercise") {
    exerciseSuggestions.classList.remove("hidden");
  }
}

function showPositiveIcon(sliderScore, iconType) {
  if (sliderScore > 5) {
    iconType.classList.remove("hidden");
  }
}

//for keyboard users wanting to use 'Enter' instead of tabbing to button
document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    let currBtn = [...nextBtns].filter((btn) => btn.offsetParent !== null)[0];
    currBtn.click();
  }
});

//allows keyboard users to use sliders
document.addEventListener("keydown", (event) => {
  sliders.forEach((slider) => {
    //get the current container class by accessing the slider parent's parent element
    let containerClass = slider.parentElement.parentElement.classList[0];
    if (!containerClass.includes("hidden")) {
      //if the container class is not currently hidded, i.e it is the active container
      // get the event.key value and set the slider value to that value (a number between 1 and 9)
      slider.value = event.key;
      sliderDisplay.forEach((score) => {
        //if the container class matches the id of the display score p tag
        //set the display score p tag inner text to the numeric value on the slider
        if (containerClass.includes(score.id.slice(8))) {
          score.innerHTML = scoreAndWord(slider.value);
        }
      });
    }
  });
});

//updates the score displayed in realtime when score is changed
//on change to the slider position call the scoreAndWord function on the current value
//this generates an english word 'translation' of the score
currentMood.addEventListener("input", () => {
  displayMood.innerHTML = scoreAndWord(currentMood.value);
});

currentSleep.addEventListener("input", () => {
  displaySleep.innerHTML = scoreAndWord(currentSleep.value);
});

currentNutrition.addEventListener("input", () => {
  displayNutrition.innerHTML = scoreAndWord(currentNutrition.value);
});

currentSocial.addEventListener("input", () => {
  displaySocial.innerHTML = scoreAndWord(currentSocial.value);
});

currentExercise.addEventListener("input", () => {
  displayExercise.innerHTML = scoreAndWord(currentExercise.value);
});

//generate word equivalent of score by using score to get index of equivalent word
function scoreAndWord(score) {
  wordEquiv = [
    "",
    "the worst it could be",
    "extremely bad",
    "very bad",
    "bad",
    "Ok",
    "good",
    "very good",
    "excellent",
    "the best it could be",
  ];
  return `Score: <b>${score}</b> (${wordEquiv[score]})`;
}
