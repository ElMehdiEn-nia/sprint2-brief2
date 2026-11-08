import { getPlayers, ajouterJoueur, modifierJoueur, supprimerJoueur, setActivePlayer, getActivePlayer } from "./player.js";

const form = document.getElementById("profile-form");
const nicknameInput = document.getElementById("nickname");
const avatarInput = document.getElementById("avatar");
const errorMessage = document.getElementById("error-message");

const profileList = document.getElementById("profile-list");
const currentPlayer = document.getElementById("current-player");

const submitButton = document.getElementById("submit-button");
const cancelButton = document.getElementById("cancel-edit");

let editingId = null;

function afficherMessage(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove("hidden");
}

function afficherProfils() {
    const players = getPlayers();

    profileList.innerHTML = "";

    if (players.length === 0) {
        profileList.textContent = "Aucun profil créé.";
        return;
    }

    players.forEach(player => {
        const card = document.createElement("div");

        card.className =
            "bg-slate-800 p-4 rounded-lg flex flex-wrap items-center justify-between gap-3";

        const info = document.createElement("div");

        info.className = "flex items-center gap-3";

        const avatar = document.createElement("span");
        avatar.textContent = player.avatar;
        avatar.className = "text-3xl";

        const nickname = document.createElement("span");
        nickname.textContent = player.nickname;
        nickname.className = "font-bold text-white";

        info.append(avatar, nickname);

        const buttons = document.createElement("div");
        buttons.className = "flex flex-wrap gap-2";

        const selectButton = document.createElement("button");
        selectButton.textContent = "Choisir";
        selectButton.className =
            "bg-green-600 px-3 py-1 rounded text-white";

        selectButton.addEventListener("click", () => {
            setActivePlayer(player);
            afficherJoueurActif();
        });

        const editButton = document.createElement("button");
        editButton.textContent = "Modifier";
        editButton.className =
            "bg-blue-600 px-3 py-1 rounded text-white";

        editButton.addEventListener("click", () => {
            nicknameInput.value = player.nickname;
            avatarInput.value = player.avatar;

            editingId = player.id;

            submitButton.textContent = "Modifier le profil";
            cancelButton.classList.remove("hidden");

            errorMessage.classList.add("hidden");
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Supprimer";
        deleteButton.className =
            "bg-red-600 px-3 py-1 rounded text-white";

        deleteButton.addEventListener("click", () => {
            if (confirm("Voulez-vous supprimer ce profil ?")) {
                supprimerJoueur(player.id);
                afficherProfils();
                afficherJoueurActif();
            }
        });

        buttons.append(selectButton, editButton, deleteButton);
        card.append(info, buttons);

        profileList.appendChild(card);
    });
}

function afficherJoueurActif() {
    const player = getActivePlayer();

    if (player) {
        currentPlayer.textContent =
            `Joueur sélectionné : ${player.avatar} ${player.nickname}`;
    } else {
        currentPlayer.textContent = "Aucun joueur sélectionné.";
    }
}


form.addEventListener("submit", function (event) {
    event.preventDefault();

    const nickname = nicknameInput.value.trim();
    const avatar = avatarInput.value;

    let result;

    if (editingId) {
        result = modifierJoueur(editingId, nickname, avatar);
    } else {
        result = ajouterJoueur(nickname, avatar);
    }

    if (result !== true && typeof result === "string") {
        if (result !== "") {
            afficherMessage(result);
            return;
        }
    }

    if (result === null || (typeof result === "string")) {
        afficherMessage(result);
        return;
    }

    form.reset();
    editingId = null;

    submitButton.textContent = "Enregistrer le profil";
    cancelButton.classList.add("hidden");
    errorMessage.classList.add("hidden");

    afficherProfils();
    afficherJoueurActif();
});

cancelButton.addEventListener("click", () => {
    form.reset();

    editingId = null;
    submitButton.textContent = "Enregistrer le profil";

    cancelButton.classList.add("hidden");
    errorMessage.classList.add("hidden");
});

afficherProfils();
afficherJoueurActif();