import Preset from "./preset.js";

// TODO: Consider making a utility class to divide and simplify code...

const outputText = document.getElementById("output");
const presetDropdownButton = document.getElementById("presetDropdownButton");
const presetsDropdown = document.getElementById("presetsDropdown");
const loadFileInput = document.getElementById("loadFileInput");
const resetModalDescription = document.getElementById("resetModalDescription");

/* They both serve different functionalities depending on the header text */
// Multi-Purpose Header
const createModalHeader = document.getElementById("createModalHeader"); // Create/Save Header
const resetModalHeader = document.getElementById("resetModalHeader"); // Reset/Delete Header

// Multi-Purpose buttons
const createPresetButton = document.getElementById("createPresetButton"); // Save/Create
const resetPresetButton = document.getElementById("resetPresetButton"); // Reset/Delete

const presets = [
  new Preset(
    "DragunWF (Default)",
    [
      "Jewker",
      "CPT",
      "Dragun",
      "Faith",
      "Thrawn",
      "Mortis",
      "Larry",
      "SeaGong",
      "Momo",
    ],
    [
      "The Terrible",
      "The Programmer",
      "The Horrible",
      "The Pro Gamer",
      "The Nerd",
      "The Genius",
      "The Brave",
      "The Not So Bright",
      "The Bright",
      "The Goblin",
      "The Knight",
      "The Geek",
    ]
  ),
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
let selectedPreset = presets[0]; // default preset
let presetUIVisible = true; // Always set to false unless testing

function isNameTypeValidated(type) {
  return !(type !== "first" && type !== "last");
}

function addName(isFirstName) {
  const content = isFirstName
    ? presetFields.firstName.value
    : presetFields.lastName.value;
  if (!content) {
    alert(`${isFirstName ? "First" : "Last"} name cannot be empty!`);
    return;
  }

  if (isFirstName) {
    addNameUI(content, "first");
    presetFields.firstName.value = ""; // Empty first name text box
    currentPreset.addFirstName(content);
  } else {
    addNameUI(content, "last");
    presetFields.lastName.value = ""; // Empty last name text box
    currentPreset.addLastName(content);
  }
}

function addNameUI(name, type) {
  if (!name.length) {
    throw new Error("Name cannot be empty!");
  }
  const index =
    type === "last"
      ? currentPreset.getNames().firstNames.length
      : currentPreset.getNames().lastNames.length;
  switch (type) {
    case "first":
      presetDropdowns.firstNames.innerHTML += `
        <span onclick="deleteName(${index}, 'first')">${name}</span>
      `;
      break;
    case "last":
      presetDropdowns.lastNames.innerHTML += `
        <span onclick="deleteName(${index}, 'last')">${name}</span>
      `;
      break;
    default:
      throw new Error("Unknown type!");
  }
}

function deleteName(index, type) {
  switch (type) {
    case "first":
      currentPreset.deleteFirstName(index);
      presetDropdowns.firstNames.innerHTML = "";
      for (let name of currentPreset.getNames().firstNames) {
        addNameUI(name, "first");
      }
      break;
    case "last":
      currentPreset.deleteLastName(index);
      presetDropdowns.lastNames.innerHTML = "";
      for (let name of currentPreset.getNames().lastNames) {
        addNameUI(name, "last");
      }
      break;
    default:
      throw new Error("deleteName(): Type is not recognized!");
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

  currentPreset.setTitle(isValid ? title : "Default_Title");
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

loadFileInput.addEventListener("change", () => {
  try {
    const selectedFile = loadFileInput.files[0];

    const tempSplit = selectedFile.name.split(".");
    const fileExtension = tempSplit[tempSplit.length - 1];
    if (fileExtension !== "json") {
      alert("File must be in JSON format");
      return;
    }

    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const data = JSON.parse(event.target.result); // parsing file contents
        currentPreset = new Preset(data.title, data.firstNames, data.lastNames);

        // Apply new data to UI elements
        presetDropdowns.firstNames.innerHTML = "";
        presetDropdowns.lastNames.innerHTML = "";
        for (let name of currentPreset.getNames().firstNames) {
          addNameUI(name, "first");
        }
        for (let name of currentPreset.getNames().lastNames) {
          addNameUI(name, "last");
        }
      };
      reader.readAsText(selectedFile);
      presets.push(currentPreset);
    } else {
      alert("No file has been selected!");
    }
  } catch (error) {
    console.error(error);
    alert("Invalid save file!");
  }
});

document.getElementById("loadPresetButton").addEventListener("click", () => {
  loadFileInput.click();
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
    createModalHeader.innerText = "Create Preset";
    createPresetButton.innerText = "Create";
    openModal("create");
  });

document.getElementById("savePresetButton").addEventListener("click", () => {
  createModalHeader.innerText = "Save Preset";
  createPresetButton.innerText = "Save";
  openModal("create");
});

document
  .getElementById("openResetModalButton")
  .addEventListener("click", () => {
    resetModalDescription.innerText = `
      Are you sure you want to reset your current preset? This will remove all first names 
      and last names previously added.
    `;
    openModal("reset");
  });

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

window.deleteName = (index, type) => {
  if (!isNameTypeValidated(type)) {
    throw new Error(
      `Unknown type "${type}"! Types can either only be "first" or "last"!`
    );
  }
  if (
    index < 0 ||
    (type === "first" && index >= currentPreset.getNames().firstNames.length) ||
    (type === "last" && index >= currentPreset.getNames().lastNames.length)
  ) {
    throw new Error(`Index "${index}" is out of range!`);
  }
  const names =
    type === "last"
      ? currentPreset.getNames().firstNames
      : currentPreset.getNames().lastNames;
  resetModalHeader.innerText = `Are you sure? - Delete ${type} name`;
  resetModalDescription.innerText = `
    Are you sure you want to delete the first name "${names[index]}". This action cannot be undone!
  `;
  openModal("reset");
};

console.log("main.js has been loaded!");
