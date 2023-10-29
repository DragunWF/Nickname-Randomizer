class Preset {
  #title;
  #firstNames;
  #lastNames;

  constructor(title, firstNames, lastNames) {
    this.#title = title ? title : "Default_Title";
    this.#firstNames = firstNames ? firstNames : [];
    this.#lastNames = lastNames ? lastNames : [];
  }

  getTitle() {
    return this.#title;
  }

  setTitle(value) {
    this.#title = value;
  }

  getNames() {
    return {
      firstNames: this.#firstNames,
      lastNames: this.#lastNames,
    };
  }

  addFirstName(name) {
    this.#addName(name, true);
  }

  addLastName(name) {
    this.#addName(name, false);
  }

  deleteFirstName(index) {
    this.#deleteName(index, true);
  }

  deleteLastName(index) {
    this.#deleteName(index, false);
  }

  #addName(name, isFirstName) {
    if (isFirstName) {
      this.#firstNames.push(name);
    } else {
      this.#lastNames.push(name);
    }
  }

  #deleteName(index, isFirstName) {
    if (isFirstName) {
      this.#firstNames.splice(index, 1);
    } else {
      this.#lastNames.splice(index, 1);
    }
  }
}

console.log("preset.js has been loaded!");

export default Preset;
