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

function addFirstName() {
  addName(true);
}

function addLastName() {
  lastName(false);
}

function addName(isFirstName) {
  const name = document.getElementById(isFirstName ? "firstName" : "lastName");
  // add logic
}

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
