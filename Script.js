 document.getElementById(nickname);
 document.getElementById(avatar);
export function getData(key) {
    
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
};

export function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
};



const Pseudo = /^[A-Za-z0-9]{3,15}$/;
export function getPlayers(){
    return getData(players);
};


    const players = getData("players");

    const newPlayer = {
        id: "p_${Date.now()}",
        nickname,
        avatar
    };

   

const updatedPlayers = players.map(p => {
    if (p.id === "p_${Date.now()}"){
        return { ...p, nickname: newNickname, avatar: newAvatar };
    };
        return p;
    });

    saveData(players,updatedPlayers);




export function setActivePlayer(player) {
    localStorage.setItem(ActivePlayer, JSON.stringify(player));
};


export function getActivePlayer() {
    const data = localStorage.getItem(ActivePlayer);
    return data ? JSON.parse(data) : null;
};


const form = document.getElementById("profile-form")
form.addEventListener("click",function(){
    const name = document.getElementById("nickname").value;
    const avatar = document.getElementById("avatar").value;
    getPlayers(name,avatar)

});