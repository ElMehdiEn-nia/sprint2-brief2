function startGame() {
    const score = 0;
    return score
}
function selectCart(card) {
    playerCard = card;
}

export function choisirCarteAleatoire(main) {

    const index = Math.floor(Math.random() * main.length);

    return {
        carte: main[index],
        index: index
    };
}


export function creerMain(camp) {

    if (camp === "empereur") {
        return ["empereur", "citoyen", "citoyen", "citoyen", "citoyen"];
    }
    else {

        return ["esclave", "citoyen", "citoyen", "citoyen", "citoyen"]
    }
}



export function duel(carteJoueur, carteOrdinateur) {

    if (carteJoueur === carteOrdinateur) {
        return "égalité";
    }

    else if (
        (carteJoueur === "empereur" && carteOrdinateur === "citoyen")
            (carteJoueur === "citoyen" && carteOrdinateur === "esclave")
            (carteJoueur === "esclave" && carteOrdinateur === "empereur")
    ) {
        return "victoire";
    }
    else {
        return "défaite";
    }

    console.log("Player:", carteJoueur);
    console.log("Computer:", carteOrdinateur);
}
duel("citoyen", "empereur", "esclave")

export function retirerCarte(main, index) {

    return main.filter((carte, i) => i !== index);

}

export function calculerPoints(camp) {

    if (camp === "empereur") {
        return 1;
    }
    else if (camp === "esclave") {
        return 5;
    }

}

export function obtenirCamp(manche) {

    const groupe = Math.floor((manche - 1) / 3);

    if (groupe % 2 === 0) {
        return "empereur";
    }

    return "esclave";
}

export function obtenirPremierJoueur(numeroDuel) {

    if (numeroDuel % 2 === 1) {
        return "empereur";
    }

    return "esclave";
}

console.log(startGame());
