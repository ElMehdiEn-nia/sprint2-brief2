
import {
    creerMain,
    choisirCarteAleatoire,
    duel,
    retirerCarte,
    calculerPoints
} from "../src/game.js";

let joueur = creerMain("empereur");
let ordinateur = creerMain("esclave");
let scoreJoueur = 0;
let scoreOrdinateur = 0;

const playerChoice = document.getElementById("playerChoice");
const computerChoice = document.getElementById("computerChoice");
const result = document.getElementById("result");
const playerScore = document.getElementById("playerScore");
const computerScore = document.getElementById("computerScore");
const cards = document.querySelectorAll("[data-card]");
const button = document.getElementById("jouer");

function afficherScores() {
    playerScore.textContent = scoreJoueur;
    computerScore.textContent = scoreOrdinateur;
}

function afficherCartes() {
    cards.forEach(card => {
        const type = card.dataset.card;

        card.disabled = !joueur.includes(type) || joueur.length === 0;
        card.classList.toggle("opacity-40", card.disabled);
    });
}

function jouer(carteJoueur) {
    if (!joueur.includes(carteJoueur)) return;

    const carteOrdinateur = choisirCarteAleatoire(ordinateur);

    const resultat = duel(carteJoueur, carteOrdinateur);

    playerChoice.textContent = carteJoueur;
    computerChoice.textContent = carteOrdinateur;

    if (resultat === "victoire") {
        scoreJoueur += calculerPoints(carteJoueur);
        result.textContent = "Bravo ! Tu as gagné !";
    } else if (resultat === "défaite") {
        scoreOrdinateur += calculerPoints(carteOrdinateur);
        result.textContent = "L'ordinateur a gagné !";
    } else {
        result.textContent = "Égalité !";
    }

    joueur = retirerCarte(joueur, carteJoueur);
    ordinateur = retirerCarte(ordinateur, carteOrdinateur);

    afficherScores();
    afficherCartes();

    if (joueur.length === 0) {
        result.textContent += " Partie terminée !";
    }
}

cards.forEach(card => {
    card.addEventListener("click", () => {
        jouer(card.dataset.card);
    });
});

button.addEventListener("click", () => {
    joueur = creerMain("empereur");
    ordinateur = creerMain("esclave");

    scoreJoueur = 0;
    scoreOrdinateur = 0;

    playerChoice.textContent = "En attente...";
    computerChoice.textContent = "En attente...";
    result.textContent = "Nouvelle partie !";

    afficherScores();
    afficherCartes();
});

afficherCartes();
afficherScores();
