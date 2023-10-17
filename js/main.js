import Preset from "./preset.js";

const outputText = document.getElementById("output");
const presetDropdownButton = document.getElementById("presetDropdownButton");
const presetsDropdown = document.getElementById("presetsDropdown");
const presets = [
  new Preset("DragunWF (Default)", [], []),
  new Preset(
    "Thrawn",
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
const modals = {
  create: document.getElementById("createModal"),
  reset: document.getElementById("resetModal"),
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

document.getElementById("selectPresetButton").addEventListener("click", () => {
  if (index < 0 || index >= presets.length) {
    throw new Error("Invalid Index!");
  }
  selectedPreset = presets[index];
  presetDropdownButton.innerText = selectedPreset.getTitle();
});

document.getElementById("resetPresetButton").addEventListener("click", () => {
  // TODO: Implement preset reset
  for (let key in presetFields) {
    presetFields[key].value = "";
  }
  for (let key in presetDropdowns) {
    presetDropdowns[key].innerHTML = "";
  }
  currentPreset = new Preset();
  window.closeResetModal();
});

document.getElementById("savePresetButton").addEventListener("click", () => {
  // TODO: Implement preset saving
});

document.getElementById("loadPresetButton").addEventListener("click", () => {
  // TODO: Implement preset loading
});

document.getElementById("createPresetButton").addEventListener("click", () => {
  // TODO: Implement preset creation
  modals.create.style.display = "block";
});

document.getElementById("randomizeButton").addEventListener("click", () => {
  const firstNameArr = selectedPreset.getNames().firstNames;
  const lastNameArr = selectedPreset.getNames().lastNames;
  outputText.innerText = `${getRandomItem(firstNameArr)} ${getRandomItem(
    lastNameArr
  )}`;
});

// TODO: Replace with event listeners
// One line arrow functions
window.openCreateModal = () => (modals.create.style.display = "block");
window.openResetModal = () => (modals.reset.style.display = "block");
window.closeCreateModal = () => closeModal("create");
window.closeResetModal = () => closeModal("reset");
window.addFirstName = () => addName(true);
window.addLastName = () => addName(false);
// End of one line arrow functions

document.getElementById("closeResetModal").onclick = () => {
  window.closeResetModal();
};

document.getElementById("closeCreateModal").onclick = () => {
  window.closeCreateModal();
};

document.addEventListener("DOMContentLoaded", () => {
  for (let i = 0; i < presets.length; i++) {
    presetsDropdown.innerHTML += `
      <span onclick="selectPreset(${i})">${presets[i].getTitle()}</span>
    `;
  }
  presetsDropdown.innerHTML += "<span>Custom</span>";

  // Add event listeners to all toggle buttons
  const toggleButtons = document.getElementsByClassName("preset-toggle-ui");
  for (let i = 0; i < toggleButtons.length; i++) {
    toggleButtons[i].addEventListener("click", () => {
      const presetUIClasses = interfaces.presetUI
        .getAttribute("class")
        .split(" ");
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
    });
  }
});

console.log("main.js has been loaded!");
