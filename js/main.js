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
const presetDropdowns = {
  firstNames: document.getElementById("firstNames"),
  lastNames: document.getElementById("lastNames"),
};
const presetFields = {
  firstName: document.getElementById("firstNameField"),
  lastName: document.getElementById("lastNameField"),
};

let currentPreset = new Preset();
let selectedPreset = presets[1]; // default preset
let presetUIVisible = true; // Always set to false unless testing

function addName(isFirstName) {
  const content = isFirstName
    ? presetFields.firstName.value
    : presetFields.lastName.value;
  if (!content) {
    alert(`${isFirstName ? "First name" : "Last name"} cannot be empty!`);
    return;
  }

  if (isFirstName) {
    presetDropdowns.firstNames.innerHTML += `
      <span>${content}</span>
    `;
    presetFields.firstName.value = "";
    currentPreset.addFirstName(content);
  } else {
    presetDropdowns.lastNames.innerHTML += `
      <span>${content}</span>
    `;
    presetFields.lastName.value = "";
    currentPreset.addLastName(content);
  }
}

function closeModal(modalName) {
  let modalID = null;
  switch (modalName) {
    case "create":
      modalID = "createModal";
      break;
    case "reset":
      modalID = "resetModal";
      break;
    default:
      throw new Error(`Unknown modal name: ${modalName}`);
  }
  document.getElementById(modalID).style.display = "none";
}

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

window.selectPreset = (index) => {
  if (index < 0 || index >= presets.length) {
    throw new Error("Invalid Index!");
  }
  selectedPreset = presets[index];
  presetDropdownButton.innerText = selectedPreset.getTitle();
};
window.resetPreset = () => {
  // TODO: Implement preset reset
  for (let key in presetFields) {
    presetFields[key].value = "";
  }
  for (let key in presetDropdowns) {
    presetDropdowns[key].innerHTML = "";
  }
  currentPreset = new Preset();
};
window.savePreset = () => {
  // TODO: Implement preset saving
};
window.loadPreset = () => {
  // TODO: Implement preset loading
};
window.createPreset = () => {
  // TODO: Implement preset creation
  const modal = document.getElementById("createModal");
  modal.style.display = "block";
};
window.giveName = () => {
  const firstNameArr = selectedPreset.getNames().firstNames;
  const lastNameArr = selectedPreset.getNames().lastNames;
  outputText.innerText = `${getRandomItem(firstNameArr)} ${getRandomItem(
    lastNameArr
  )}`;
};
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

// One line arrow functions
document.getElementById("closeResetModal").onclick = () => {
  closeModal("reset");
};
document.getElementById("closeCreateModal").onclick = () => {
  closeModal("create");
};
window.addFirstName = () => addName(true);
window.addLastName = () => addName(false);
// End of one line arrow functions

document.addEventListener("DOMContentLoaded", () => {
  for (let i = 0; i < presets.length; i++) {
    presetsDropdown.innerHTML += `
      <span onclick="selectPreset(${i})">${presets[i].getTitle()}</span>
    `;
  }
  presetsDropdown.innerHTML += "<span>Custom</span>";
});

console.log("main.js has been loaded!");
