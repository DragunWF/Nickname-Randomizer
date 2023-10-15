class Preset {
  #title;
  #firstNames;
  #lastNames;

  constructor(title, firstNames, lastNames) {
    this.#title = title;
    this.#firstNames = firstNames;
    this.#lastNames = lastNames;
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

  addName(name, isFirstName) {
    if (isFirstName) {
      this.#firstNames.push(name);
    } else {
      this.#lastNames.push(name);
    }
  }

  deleteName(name, isFirstName) {}
}

export default Preset;
