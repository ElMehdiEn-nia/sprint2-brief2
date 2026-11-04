import { getData , saveData } from "./storage.js";

const Pseudo = /^[A-Za-z0-9]{3,15}$/;

export function getPlayers(){
    return getData("players");
};


    const players = getData("players");

    const newPlayer = {
        id: "p_${Date.now()}",
        nickname,
        avatar
    };
  

const updatedPlayers = players.map(p => {
    if (p.id === "p_${Date.now()}"){
      
        return p;
    }   
    });

    saveData(players,updatedPlayers);




export function setActivePlayer(player) {
    localStorage.setItem(ActivePlayer, JSON.stringify(player));
};


export function getActivePlayer() {
    const data = localStorage.getItem(ActivePlayer);
    return data ? JSON.parse(data) : null;
};


const form = document.getElementById("profile-form");
form.addEventListener("submit",function(e){

    

    const nickname = document.getElementById("nickname").value().trim;
    const avatar = document.getElementById("avatar").value().trim;

    const player = {
        name : nickname,
        Avatar : avatar
    }

    players.push(player)

    saveData(data,players);

});