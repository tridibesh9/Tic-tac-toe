
var x_score = 0;
var o_score = 0;
const board = []
for(var i = 0;i<3;i++){
    var temp = [];
    for(var j = 0;j<3;j++){
        temp.push(-1);
    }
    board.push(temp);
}

 var boxes = document.querySelectorAll(".box")
for(var i = 0;i<boxes.length;i++){
    boxes[i].addEventListener("click",function(){
        editBoxes(this.id)
    });
}
var new_game = document.querySelector(".button_newgame");
new_game.addEventListener("click",function(){
    clear_boxes();
});
var text = "<div class='big'>X</div>"
var text2 = "<div class='big'>O</div>"
var win = 0;
function editBoxes(ids){
     var box = document.getElementById(ids)
     if(box.classList.contains("clicked")){
        return;
     }
     if(win == 1){
        alert(text2+" already won");
        return;
     }
     box.classList.add("clicked");
     box.classList.add("clicked_animation");
     box.innerHTML = text;
     console.log(box.id);
     if(text === "<div class='big'>X</div>"){
        board[Math.floor(box.id/3)][box.id%3] = 0;
     }
     else{
        board[Math.floor(box.id/3)][box.id%3] = 1;
     }
     var temp = text;
     text = text2;
     text2 = temp;
     if(check_win()){
        alert("player "+text2+"wins");
        win = 1;
        add_history(text2);
        update_score(text2);
     }
     else if(check_draw()){
        win = 1;
        alert("Its a Draw,Try New Game");
     }
    setTimeout(function(){
         box.classList.remove("clicked_animation")
    },200);
}
function check_win(){
    var k;
    for(var i = 0;i<3;i++){
        k = 1;
        for(var j = 0;j<3;j++){
            if(board[i][j] != board[i][(j+1+3)%3] || board[i][j] == -1){
                k = 0
            }
            console.log(board[i][j]);
            console.log(board[i][j+1+3]%3);
        }
        if(k === 1){
            return true;
        }
    }
    for(var i = 0;i<3;i++){
        k = 1;
        for(var j = 0;j<3;j++){
            if(board[j][i] != board[(j+1+3)%3][i] || board[j][i] == -1){
                k = 0
            }
            console.log(board[i][j]);
            console.log(board[i][j+1+3]%3);
        }
        if(k === 1){
            return true;
        }
    }
    k = 1;
    for(var i = 0;i<3;i++){
        if(board[i][i] != board[(i+1+3)%3][(i+1+3)%3] || board[i][i] == -1){
            k = 0;
        }
    }
    if(k == 1){
        return true;
    }
    k = 1;
    for(var i = 0;i<3;i++){
        if(board[i][3-1-i] != board[(i+1)%3][3-1-(i+1)%3]|| board[i][3-1-i] == -1){
            k = 0
        }
    }
    if(k == 1){
        return true;
    }
    
    
    return false;
 }
 function check_draw(){
    var r = 1
    for(var i = 0;i<3;i++){
        for(var j = 0;j<3;j++){
            if(board[i][j] == -1){
                r = 0;
            }
        }
    }
    if(r == 1){
        return true;
    }
    else{
        return false;
    }
 }
 function add_history(winner){
    const div_new = document.createElement('div');
    div_new.className = "new_history";
    var d = winner 
    div_new.innerHTML = d;
    document.querySelector(".history").appendChild(div_new);
 }
 function clear_boxes(){
    win = 0;
    
    for(var i = 0;i<9;i++){
        var id_s = i;
        var box_ext = document.getElementById(id_s.toString());
        if(box_ext.classList.contains("clicked")){
            box_ext.classList.remove("clicked");
            box_ext.removeChild(box_ext.children[0]);
        }
    }
    for(var i = 0;i<3;i++){
        for(var j = 0;j<3;j++){
            board[i][j] = -1;
        }
    }
 }
 function update_score(winner){
    if(winner == "<div class='big'>X</div>"){
        x_score+=1;
        document.querySelector(".X_score").innerText = x_score;
    }
    else{
        o_score+=1;
        document.querySelector(".O_score").innerText = o_score;
    }
 }