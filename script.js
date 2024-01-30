let n = 9;

let newDiv = document.createElement("div");
    for(let row = 0; row < n; row++) {
        const div = document.createElement("div")
        div.classList.add('grid-container')
        for(let col = 0; col < n; col++) {
            const newButton = document.createElement("button");
            newButton.classList.add('grid-item');
            div.appendChild(newButton);
            newButton.setAttribute('onclick', `placeMove(${col})`);

        }
        newDiv.appendChild(div);
        newDiv.classList.add('board');          
}
    let div2 = document.createElement("div");
    div2.classList.add('flex-box');
    div2.appendChild(newDiv);
    document.body.appendChild(div2);

    let buttons = document.querySelectorAll('.grid-item');
    n  = buttons.length ** (1/2)
    let array = [];
    for(let row = 0; row < n; row++) {
        let rowList = []
        for (let col = 0; col < n; col++) {
            rowList.push(buttons[n * row + col]);
        }
        array.push(rowList);
    }

    let currentPlayer = "greenPiece"

function placeMove(c) {
    for(let row = 0; row < array.length; row++) {
        if(array[row][c].classList.contains("greenPiece") || 
        array[row][c].classList.contains("redPiece")) {
            return;
        }


        if(row + 1 >= array.length ||
            array[row+1][c].classList.contains("greenPiece") || 
        array[row+1][c].classList.contains("redPiece")) {
            array[row][c].classList.add(currentPlayer);
            if(checkWin(row, c)) {
                let player = currentPlayer == "greenPiece" ? "Green" : "Red";
                window.alert(`${player} has won!`)
            }
            currentPlayer = currentPlayer == "greenPiece" ? "redPiece" : 'greenPiece';

            return;
        }
    }
   
    
}
    
function checkWin(r, c) {
    let dirs = [[1, 1], [1, 0], [0, 1], [-1, 1]]
    for(let i = 0; i < dirs.length; i++) {
        if(numPiecesInDir(dirs[i][0], dirs[i][1], r, c) 
        + numPiecesInDir(-dirs[i][0], -dirs[i][1], r, c) - 1 >= 4) {
            return true;
        }
    }
    return false
}

function numPiecesInDir(dr, dc, r, c) {
    let piecesInADir = 1
    r += dr;
    c += dc; 
    while( r < array.length && r >= 0 
         && c < array.length && c >= 0) {
            if (array[r][c].classList.contains(currentPlayer)) {
                piecesInADir++;
            }
            else {
                return piecesInADir;
            }
            r += dr;
            c += dc; 
         }
    return piecesInADir;
}
