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
        celda.classList.add("miss");
    }
}
let modelo = {
    boardSize: 7,
    numShips: 3,
    shipLenght: 3,
    shipsSunk: 0,
    ships : [
        {locations: ["06","16","26"], hits: ["", "", ""]},
        {locations: ["24","34","44"], hits: ["", "", ""]},
        {locations: ["10","11","12"], hits: ["", "", ""]}
    ],
    fire: function(guess){
        for (let i = 0; i < this.numShips; i++){
            let ship = this.ships[i];
            let index = ship.locations.indexOf(guess);
  
            if(index >= 0){
                ship.hits[index] = "hit";
                view.displayHit(guess);
                view.displayMassage("HIT!")
                if(this.isSunk(ship)){
                    view.displayMassage("you sank my battleship!");
                    this.shipsSunk++;
                }
                return true;
            }
        }
        view.displayMiss(guess);
        view.displayMassage("You missed.")
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
let controler = {
    guesses: 0,

    proccesGuess: function(guess){
       let location = parseGuess(guess);
       if(location){
           this.guesses++;
           let hit = modelo.fire(location);
           if (hit && modelo.shipsSunk === modelo.numShips){
               view.displayMassage("undiste todos mis Barcos!! in " + this.guesses + "guesses!" )
           }
       }
    }
};
function parseGuess(guess){
    let alfabeto = ["A","B","C","D","E","F","G"];

    if(guess === null || guess.length !== 2){
        alert("ingresa una letra y un número");
    } else {
        let firstChar = guess.charAt(0);
        let row = alfabeto.indexOf(firstChar);
        let column = guess.charAt(1);

        if( isNaN(row) || isNaN(column) ){
            alert("Opss, eso no esta el el tablero");
        } else if( row < 0 || row >= 7 ||  column < 0 || column >= 7){
            alert("Opss eso no esta dentro de la tabla");
        } else {
            return row + column;
        }
    }
    return null;
};
let fireButton = document.getElementById("fireButton");
fireButton.addEventListener("click", handleFireButton);

function handleFireButton(e){
    e.preventDefault();

    let guessInput = document.getElementById("guessInput");
    let guess = guessInput.value;

    controler.proccesGuess(guess);
    guessInput.value = "";

}

