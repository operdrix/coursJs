"use strict"

const Tirage = {
  numeros: new Set(),
  numComplementaire: 0
}

function nouveauTirage() {
  Tirage.numeros.clear();
  while (Tirage.numeros.size < 5) {
    Tirage.numeros.add(Math.floor(Math.random() * 49) + 1);
  }
  Tirage.numComplementaire = Math.floor(Math.random() * 10) + 1;
  console.log(Tirage);
}
nouveauTirage(); /* Appel de la fonction pour lancer le tirage */

const btnValider = document.getElementById("btnValider");
const inputs = document.querySelectorAll("input.nombres");
const Grille = {
  numeros: new Set(),
  numComplementaire: 0
}

function verifGrille() {
  Grille.numeros.clear();
  Grille.numComplementaire = Number(document.querySelector("#complementaire").value)
  for (const input of inputs) {
    switch (true) {
      case input.value === "":
      case input.value <= 0:
      case input.value > 49:
      case Grille.numeros.has(Number(input.value)):
        input.classList.add("warning")
        break;
      default:
        input.classList.remove("warning")
        Grille.numeros.add(Number(input.value));
    }
  }
  return (Grille.numeros.size === 5);
}

function gains() {
  const spanWin = document.querySelectorAll("#result .generate .win");
  let gains = 0;
  switch (spanWin.length) {
    case 2:
      gains = 1000
      break
    case 3:
      gains = 5000
      break
    case 4:
      gains = 10000
      break
    case 5:
      gains = 100000
      break
    default:
      gains = 0
  }
  if (Grille.numComplementaire === Tirage.numComplementaire) {
    gains += 2000
  }
  return gains;
}

function compare() {
  // Vérifier que les inputs sont corrects
  if (!verifGrille()) return;

  document.querySelector("#choix").classList.add("hide")
  document.querySelector("#result").classList.remove("hide")

  const divGenerate = document.querySelector("#result .generate")

  Tirage.numeros.forEach((num) => {
    // Créer un span avec le numéro
    const newSpan = document.createElement("span");
    newSpan.innerText = num
    // Ajouter la classe win si le numéro est dans le Tirage
    if (Grille.numeros.has(num)) {
      newSpan.classList.add("win")
    }
    divGenerate.appendChild(newSpan);
  });

  // Créer un span avec le numéro complémentaire
  const newSpan = document.createElement("span");
  newSpan.innerText = Tirage.numComplementaire
  // Ajouter la classe win si le numéro est dans le Tirage
  if (Grille.numComplementaire === Tirage.numComplementaire) {
    newSpan.classList.add("win")
  }
  divGenerate.appendChild(newSpan);

  const saisie = Array.from(Tirage.numeros).join(", ") + " + " + Grille.numComplementaire;
  document.querySelector(".saisi").innerText = `Votre grille : ${saisie}`;
  document.querySelector("#result h3 span").innerText = gains();
}

btnValider.addEventListener("click", compare);
