import Preset from "./preset.js";

const outputText = document.getElementById("output");
const presetDropdownButton = document.getElementById("presetDropdownButton");
const presetsDropdown = document.getElementById("presetsDropdown");
const createPresetHeader = document.getElementById("createPresetHeader");

// This button also serves as a saving button for presets and not just creation
const createPresetButton = document.getElementById("createPresetButton");

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

let currentPreset = new Preset(); // Preset that you can change in the preset creator
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

function toggleModal(modalName, operation) {
  if (operation !== "open" && operation !== "close") {
    throw new Error("Unknown operation!");
  }
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
  const attribute = operation === "open" ? "block" : "none";
  document.getElementById(modalID).style.display = attribute;
}

function openModal(modalName) {
  toggleModal(modalName, "open");
}

function closeModal(modalName) {
  toggleModal(modalName, "close");
}

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function isCurrentPresetValidated() {
  const firstNames = currentPreset.getNames().firstNames;
  const lastNames = currentPreset.getNames().lastNames;
  const title = document.getElementById("titleField").value;
  let isValid = true;

  if (!title.length) {
    alert("Please fill in a title for this preset!");
    isValid = false;
  } else {
    const takenTitles = presets.map((preset) => preset.title);
    if (takenTitles.includes(title)) {
      alert(
        "There is a preset that already uses the same title. Please make a unique title!"
      );
      isValid = false;
    }
  }

  if (!firstNames.length && !lastNames.length) {
    alert(
      "Your first name and last name lists are empty! Please fill them in."
    );
    isValid = false;
  } else if (!firstNames.length) {
    alert("Your first name list is empty! Please fill them in.");
    isValid = false;
  } else if (!lastNames.length) {
    alert("Your last name list is empty! Please fill them in.");
    isValid = false;
  }

  currentPreset.setTitle(isValid ? title : "No_Title");
  return isValid;
}

function createPreset() {
  if (isCurrentPresetValidated()) {
    presets.push(currentPreset);
    closeModal("create");
    alert("Your preset has been created!");
  }
}

function savePreset() {
  if (isCurrentPresetValidated()) {
    const jsonStr = JSON.stringify({
      title: currentPreset.getTitle(),
      firstNames: currentPreset.getNames().firstNames,
      lastNames: currentPreset.getNames().lastNames,
    });
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.download = `${currentPreset.getTitle()}.json`; // file name

    // Add the link to the DOM, trigger a click event, and remove it
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

    // Cleanup: Revoke the Blob URL after use to free up memory
    URL.revokeObjectURL(url);

    closeModal("create");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  for (let i = 0; i < presets.length; i++) {
    presetsDropdown.innerHTML += `
      <span onclick="selectPreset(${i})">${presets[i].getTitle()}</span>
    `;
  }
  presetsDropdown.innerHTML += "<span>Custom</span>";

  // Add event listeners to all toggle buttons
  const toggleButtons = document.getElementsByClassName("toggle-preset-ui");
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

document.getElementById("resetPresetButton").addEventListener("click", () => {
  // TODO: Implement preset reset
  for (let key in presetFields) {
    presetFields[key].value = "";
  }
  for (let key in presetDropdowns) {
    presetDropdowns[key].innerHTML = "";
  }
  currentPreset = new Preset();
  closeModal("reset");
});

document.getElementById("loadPresetButton").addEventListener("click", () => {
  // TODO: Implement preset loading
});

createPresetButton.addEventListener("click", () => {
  const isSaving = createPresetButton.innerHTML === "Save";
  isSaving ? savePreset() : createPreset();
});

document.getElementById("randomizeButton").addEventListener("click", () => {
  const firstNameArr = selectedPreset.getNames().firstNames;
  const lastNameArr = selectedPreset.getNames().lastNames;
  outputText.innerText = `${getRandomItem(firstNameArr)} ${getRandomItem(
    lastNameArr
  )}`;
});

/* One line callbacks */
document
  .getElementById("openCreateModalButton")
  .addEventListener("click", () => {
    createPresetHeader.innerText = "Create Preset";
    createPresetButton.innerText = "Create";
    openModal("create");
  });

document.getElementById("savePresetButton").addEventListener("click", () => {
  createPresetHeader.innerText = "Save Preset";
  createPresetButton.innerText = "Save";
  openModal("create");
});

document
  .getElementById("openResetModalButton")
  .addEventListener("click", () => openModal("reset"));

document
  .getElementById("closeResetModal")
  .addEventListener("click", () => closeModal("reset"));

document
  .getElementById("closeResetModalButton")
  .addEventListener("click", () => closeModal("reset"));

document
  .getElementById("closeCreateModal")
  .addEventListener("click", () => closeModal("create"));

document
  .getElementById("closeCreateModalButton")
  .addEventListener("click", () => closeModal("create"));

document
  .getElementById("addFirstNameButton")
  .addEventListener("click", () => addName(true));

document
  .getElementById("addLastNameButton")
  .addEventListener("click", () => addName(false));
/* End of one line callbacks */

window.selectPreset = (index) => {
  if (index < 0 || index >= presets.length) {
    throw new Error("Invalid Index!");
  }
  selectedPreset = presets[index];
  presetDropdownButton.innerText = selectedPreset.getTitle();
};

console.log("main.js has been loaded!");
