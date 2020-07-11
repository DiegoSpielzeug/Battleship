let view = {
    displayMassage: function(smg){
        let messsageArea = document.getElementById("messageArea");
        messsageArea.innerHTML = smg;
    },
    displayHit: function(location){
        let celda = document.getElementById(location);
        celda.classList.add("hit");

    },
    displayMiss: function(location){
        let celda = document.getElementById(location);
        celda.classList.add("miss")
    }
}
let modelo = {
    boardSize: 7,
    numShips: 3,
    shipLenght: 3,
    shipsSunk: 0,
    ships : [
        {locations: ["06","16","26"],hits:["", "", ""]},
        {locations: ["24","34","44"],hits:["", "", ""]},
        {locations: ["10","11","12"],hits:["", "", ""]}
    ],
    fire: function(guess){
        for (let i = 0; i < this.numShips; i++){
            let ship = this.ships[i];
            let locations = ship.locations;
            let index = locations.indexOf(guess)
            if(index >= 0){
                ship.locations.hits[index] = "hit";
                if(this.isSunk(ship)){
                    this.shipsSunk++;
                }
                return true;
            }
        }
        return false;
    },
    isSunk: function(ship){
        for(let i = 0; i < this.shipLenght; i++){
            if(ship.hits[i] !== "hit"){
                return false;
            }
        }
        return true;
    }
};