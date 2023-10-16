import Preset from "./preset.js";

const outputText = document.getElementById("output");
const presetDropdownButton = document.getElementById("presetDropdownButton");
const presets = [
  new Preset("Dragon's Castle - DragunWF", [], []),
  new Preset(
    "Dragon's Castle - Thrawn",
    ["Jewker", "CPT", "Dragun", "Faith", "Thrawn", "Mortis"],
    ["The Slut", "The Pro", "The Horny", "The Brave", "The Supergay"]
  ),
];
const interfaces = {
  presetUI: document.getElementById("presetUI"),
  mainUI: document.getElementById("mainUI"),
};

let currentPreset = new Preset();
let presetUIVisible = true; // Always set to false unless testing

function addName(isFirstName) {
  const name = document.getElementById(
    isFirstName ? "firstName" : "lastName"
  ).innerText;
  if (!name.length) {
    alert(`${isFirstName ? "First name" : "Last name"} cannot be empty!`);
    return;
  }
  // add logic
}

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function addPreset() {}

function resetPreset() {
  let currentPreset = new Preset();
}

window.giveName = () => {
  const firstNameArr = ["Jewker", "CPT", "Dragun", "Faith", "Thrawn", "Mortis"];
  const lastNameArr = [
    "The Slut",
    "The Pro",
    "The Horny",
    "The Brave",
    "The Supergay",
  ];
  outputText.innerText = `${getRandomItem(firstNameArr)} ${getRandomItem(
    lastNameArr
  )}`;
};
window.addFirstName = () => addName(true);
window.addLastName = () => addName(false);
window.togglePresetUI = () => {
  const presetUIClasses = interfaces.presetUI.getAttribute("class").split(" ");
  const mainUIClasses = interfaces.mainUI.getAttribute("class").split(" ");

  presetUIVisible = !presetUIVisible;
  if (presetUIVisible) {
    presetUIClasses.pop(); // last element will always be "hide"
    mainUIClasses.push("hide");
  } else {
    mainUIClasses.pop();
    presetUIClasses.push("hide");
  }

  interfaces.presetUI.setAttribute("class", presetUIClasses.join(" "));
  interfaces.mainUI.setAttribute("class", mainUIClasses.join(" "));
};

console.log("main.js has been loaded!");
