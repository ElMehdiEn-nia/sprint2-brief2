 document.getElementById(nickname);
 document.getElementById(avatar);
export function getData(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
};

export function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
};


const PlayersKey = 'cardGamePlayers';
const ActivePlayerKey = 'cardGameActivePlayer';
const Pseudo = /^[A-Za-z0-9]{3,15}$/;


export function getPlayers() {
    return getData(PlayersKey);
};


    const players = getData("players");

    const newPlayer = {
        id: `p_${Date.now()}`,
        nickname,
        avatar
    };

   

const updatedPlayers = players.map(p => {
    if (p.id === id) {
        return { ...p, nickname: newNickname, avatar: newAvatar };
    };
        return p;
    });

    saveData(PlayersKey, updatedPlayers);


export function deletePlayer(id) {
    let players = getPlayers();
    players = players.filter(p => p.id !== id);
    saveData(PlayersKey, players);
};


export function setActivePlayer(player) {
    localStorage.setItem(ActivePlayerKey, JSON.stringify(player));
};


export function getActivePlayer() {
    const data = localStorage.getItem(ActivePlayerKey);
    return data ? JSON.parse(data) : null;
};


const form = document.getElementById("profile-form")
form.addEventListener("click",function(){
    const name = document.getElementById("nickname").value;
    const avatar = document.getElementById("avatar").value;
    addPlayer(name,avatar)

});