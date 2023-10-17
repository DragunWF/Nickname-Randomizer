class Preset {
  #title;
  #firstNames;
  #lastNames;

  constructor(title, firstNames, lastNames) {
    this.#title = title ? title : "No Title";
    this.#firstNames = firstNames ? firstNames : [];
    this.#lastNames = lastNames ? lastNames : [];
  }

  getTitle() {
    return this.#title;
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

  #addName(name, isFirstName) {
    if (isFirstName) {
      this.#firstNames.push(name);
    } else {
      this.#lastNames.push(name);
    }
  }

  deleteName(name, isFirstName) {}
}

console.log("preset.js has been loaded!");

export default Preset;
