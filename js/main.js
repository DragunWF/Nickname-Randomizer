import Preset from "./preset.js";

const outputText = document.getElementById("output");
const presetDropdownButton = document.getElementById("presetDropdownButton");
const presetsDropdown = document.getElementById("presetsDropdown");
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
let selectedPreset = presets[1];
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
  const firstNameArr = selectedPreset.getNames().firstNames;
  const lastNameArr = selectedPreset.getNames().lastNames;
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
    // Last element will always be "hide"
    presetUIClasses.pop();
    mainUIClasses.push("hide");
  } else {
    // Same concept applies, as stated in the previous code block
    mainUIClasses.pop();
    presetUIClasses.push("hide");
  }

  interfaces.presetUI.setAttribute("class", presetUIClasses.join(" "));
  interfaces.mainUI.setAttribute("class", mainUIClasses.join(" "));
};

document.addEventListener("DOMContentLoaded", () => {
  for (let i = 0; i < presets.length; i++) {
    presetsDropdown.innerHTML += `<span>${presets[i].getTitle()}</span>`;
  }
  presetsDropdown.innerHTML += "<span>Custom</span>";
});

console.log("main.js has been loaded!");
