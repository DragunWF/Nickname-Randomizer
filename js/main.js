import Preset from "./preset.js";

const outputText = document.getElementById("output");
const presets = [
  new Preset("Dragon's Castle - DragunWF", [], []),
  new Preset(
    "Dragon's Castle - Thrawn",
    ["Jewker", "CPT", "Dragun", "Faith", "Thrawn", "Mortis"],
    ["The Slut", "The Pro", "The Horny", "The Brave", "The Supergay"]
  ),
];
let currentPreset = new Preset();

function giveName() {
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
}

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

function addFirstName() {
  addName(true);
}

function addLastName() {
  lastName(false);
}

function addPreset() {}

function resetPreset() {
  let currentPreset = new Preset();
}
