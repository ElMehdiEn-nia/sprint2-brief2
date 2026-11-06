export function creerMain(camp) {
    if (camp === "empereur") {
        return ["empereur", "citoyen", "citoyen", "citoyen", "citoyen"];
    }

    if (camp === "esclave") {
        return ["esclave", "citoyen", "citoyen", "citoyen", "citoyen"];
    }

    return [];
}

export function choisirCarteAleatoire(main) {
    if (main.length === 0) {
        return null;
    }

    const index = Math.floor(Math.random() * main.length);

    return main[index];
}

export function duel(carteJoueur, carteOrdinateur) {
    if (carteJoueur === carteOrdinateur) {
        return "égalité";
    }

    if (
        (carteJoueur === "empereur" && carteOrdinateur === "citoyen") ||
        (carteJoueur === "citoyen" && carteOrdinateur === "esclave") ||
        (carteJoueur === "esclave" && carteOrdinateur === "empereur")
    ) {
        return "victoire";
    }

    return "défaite";
}

export function retirerCarte(main, carte) {
    const index = main.indexOf(carte);

    if (index === -1) {
        return [...main];
    }

    const nouvelleMain = [...main];
    nouvelleMain.splice(index, 1);

    return nouvelleMain;
}

export function calculerPoints(camp) {
    if (camp === "empereur") {
        return 1;
    }

    if (camp === "esclave") {
        return 5;
    }

    return 0;
}

export function obtenirCamp(manche) {
    const groupe = Math.floor((manche - 1) / 3);

    return groupe % 2 === 0 ? "empereur" : "esclave";
}

export function obtenirPremierJoueur(numeroDuel) {
    return numeroDuel % 2 === 1 ? "empereur" : "esclave";
}