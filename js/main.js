const outputText = document.getElementById("output");

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

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
