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
}

export default Preset;
