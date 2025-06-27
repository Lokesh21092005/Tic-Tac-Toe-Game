var cur_chance = 1;
var gameOver = false;
var count = 0;
var arr = [[-1,-2,-3],[-4,-5,-6],[-7,-8,-9]];
var path = [];
var back_pos = true;

var prev = -1;
function chance(i){
    if(gameOver) return;

    let row = Math.floor((i-1) / 3);
    let column = (i-1) % 3;

    if (arr[row][column] >= 0) return;
    path.push(i);
    count++;

    if(cur_chance == 1){
        
        document.getElementById(i.toString()).firstElementChild.src = "./cross.jpg";
        
    }
    
    else document.getElementById(i.toString()).firstElementChild.src = "./circle.jpg";
    arr[row][column] = 1-cur_chance;
    let winCells = check(arr);
    
    if (winCells) {
        Array.from(document.getElementsByClassName("box")).forEach((x)=>{
            x.classList.add('disable-hover');
        });
        document.getElementsByTagName("button")[0].classList.add("button-hover-none");
        back_pos = false;
        gameOver = true;
        let winner =  arr[row][column] + 1;
        document.getElementsByClassName("result")[0].firstElementChild.innerHTML = `<b>Player ${winner} has won</b>`;
        winCells.forEach(id => {
        document.getElementById(id.toString()).classList.add("highlight");
    });
}

    cur_chance = 1 - cur_chance;
}


function check(arr) {
    for (let p = 0; p < 3; p++) {
        if (arr[p][0] === arr[p][1] && arr[p][1] === arr[p][2]) 
            return [p * 3 + 1, p * 3 + 2, p * 3 + 3];
        if (arr[0][p] === arr[1][p] && arr[1][p] === arr[2][p]) 
            return [1 + p, 4 + p, 7 + p];
    }
    if (arr[0][0] === arr[1][1] && arr[1][1] === arr[2][2]) 
        return [1, 5, 9];
    if (arr[2][0] === arr[1][1] && arr[1][1] === arr[0][2]) 
        return [7, 5, 3];

    if (count === 9) {
        document.getElementsByClassName("result")[0].firstElementChild.innerHTML = "<b>Tie - Match</b>";
        gameOver = true;
        back_pos = false;
    }

    return null;
}


function newGame(){
    Array.from(document.getElementsByClassName("box")).forEach((x)=>{
            x.classList.remove('disable-hover');
        });
         document.getElementsByTagName("button")[0].classList.remove("button-hover-none");
    back_pos = true;
    for(let clean = 1 ; clean <= 9 ; clean++){
            document.getElementById(clean.toString()).firstElementChild.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
        }
        arr = [[-1,-2,-3],[-4,-5,-6],[-7,-8,-9]]; 
        cur_chance = 1;
        document.getElementsByClassName("result")[0].firstElementChild.innerHTML = "";
        count = 0;
        gameOver=false;
        document.querySelectorAll(".box").forEach(box => {
    box.classList.remove("highlight");
});

}

function back(){
  if(path.length!=0 && back_pos){
    let prev = path[path.length-1];
    path.pop();
      document.getElementById(prev.toString()).firstElementChild.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
      count--;
      let row = Math.floor((prev-1) / 3);
      let column = (prev-1) % 3;
      arr[row][column] = -1 * prev;
      cur_chance = 1-cur_chance;
  }
}