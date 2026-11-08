import { getData, saveData } from "./storage.js";

const PLAYERS_KEY = "players";
const ACTIVE_PLAYER_KEY = "activePlayer";

const pseudoRegex = /^[A-Za-z0-9]{3,15}$/;

export function getPlayers() {
    return getData(PLAYERS_KEY);
}

export function ajouterJoueur(nickname, avatar) {
    const players = getPlayers();

    if (!pseudoRegex.test(nickname)) {
        return "Le pseudo doit contenir entre 3 et 15 lettres ou chiffres.";
    }

    const existe = players.some(
        player => player.nickname.toLowerCase() === nickname.toLowerCase()
    );

    if (existe) {
        return "Ce pseudo existe déjà.";
    }

    const newPlayer = {
        id: Date.now().toString(),
        nickname: nickname,
        avatar: avatar
    };

    players.push(newPlayer);
    saveData(PLAYERS_KEY, players);

    return newPlayer;
}

export function modifierJoueur(id, nickname, avatar) {
    const players = getPlayers();

    if (!pseudoRegex.test(nickname)) {
        return "Le pseudo doit contenir entre 3 et 15 lettres ou chiffres.";
    }

    const existe = players.some(
        player =>
            player.nickname.toLowerCase() === nickname.toLowerCase() &&
            player.id !== id
    );

    if (existe) {
        return "Ce pseudo existe déjà.";
    }

    const updatedPlayers = players.map(player => {
        if (player.id === id) {
            return { ...player, nickname, avatar };
        }

        return player;
    });

    saveData(PLAYERS_KEY, updatedPlayers);

    return true;
}

export function supprimerJoueur(id) {
    const players = getPlayers();

    const updatedPlayers = players.filter(
        player => player.id !== id
    );

    saveData(PLAYERS_KEY, updatedPlayers);

    if (getActivePlayer()?.id === id) {
        localStorage.removeItem(ACTIVE_PLAYER_KEY);
    }
}

export function setActivePlayer(player) {
    localStorage.setItem(
        ACTIVE_PLAYER_KEY,
        JSON.stringify(player)
    );
}

export function getActivePlayer() {
    const data = localStorage.getItem(ACTIVE_PLAYER_KEY);
    return data ? JSON.parse(data) : null;
}