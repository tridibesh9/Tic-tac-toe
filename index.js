
var x_score = 0;
var o_score = 0;
var board = [];
var n = 3;
check_click();
for(var i = 0;i<n;i++){
    var temp = [];
    for(var j = 0;j<n;j++){
        temp.push(-1);
    }
    board.push(temp);
}






var new_game = document.querySelectorAll(".button_newgame");
for(var i = 0;i<new_game.length;i++){
    new_game[i].addEventListener("click",function(){
        check_user();
    });
}
var new_value = document.querySelector("#options");
new_value.addEventListener("click",function(){
    n = getValue();
    set_grid(n);
})

var text = "<div class='big'>X</div>"
var text2 = "<div class='big'>O</div>"
var text3 = "<div class='big'>Its a Draw</div>" 
var win = 0;






function check_click(){
    var boxes = document.querySelectorAll(".box")
    for(var i = 0;i<boxes.length;i++){
        boxes[i].addEventListener("click",function(){
            editBoxes(this.id)
        });
    }
}




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
        board[Math.floor(box.id/n)][box.id%n] = 0;
     }
     else{
        board[Math.floor(box.id/n)][box.id%n] = 1;
     }
     var temp = text;
     text = text2;
     text2 = temp;
     if(check_win()){
        win = 1;
        add_history(text2);
        update_score(text2);
        add_winner_text();
        display_modal(text2);
     }
     else if(check_draw()){
        win = 1;
        display_modal(text3);
     }
    setTimeout(function(){
         box.classList.remove("clicked_animation")
    },200);
    editTurn(text);
}





function check_win(){
    var k;
    for(var i = 0;i<n;i++){
        k = 1;
        for(var j = 0;j<n;j++){
            if(board[i][j] != board[i][(j+1+n)%n] || board[i][j] == -1){
                k = 0
            }
            console.log(board[i][j]);
            console.log(board[i][j+1+3]%3);
        }
        if(k === 1){
            return true;
        }
    }
    for(var i = 0;i<n;i++){
        k = 1;
        for(var j = 0;j<n;j++){
            if(board[j][i] != board[(j+1+n)%n][i] || board[j][i] == -1){
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
    for(var i = 0;i<n;i++){
        if(board[i][i] != board[(i+1+n)%n][(i+1+n)%n] || board[i][i] == -1){
            k = 0;
        }
    }
    if(k == 1){
        return true;
    }
    k = 1;
    for(var i = 0;i<3;i++){
        if(board[i][n-1-i] != board[(i+1)%n][n-1-(i+1)%n]|| board[i][n-1-i] == -1){
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
    for(var i = 0;i<n;i++){
        for(var j = 0;j<n;j++){
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
    
    for(var i = 0;i<n*n;i++){
        var id_s = i;
        var box_ext = document.getElementById(id_s.toString());
        if(box_ext.classList.contains("clicked")){
            box_ext.classList.remove("clicked");
            box_ext.removeChild(box_ext.children[0]);
        }
    }
    for(var i = 0;i<n;i++){
        for(var j = 0;j<n;j++){
            board[i][j] = -1;
        }
    }
    var modal = document.querySelector(".modal");
    if(modal.classList.contains("show")){
        modal.classList.remove("show");
        modal.classList.add("hide");
    }
    var winner_temp = document.querySelector(".winner_text");
    winner_temp.parentNode.removeChild(winner_temp);
    var winner_text =  document.querySelector(".modal_content>div");
    winner_text.parentNode.removeChild(winner_text);
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




 function display_modal(winner){
    var modalContent = document.querySelector(".modal_content");
    var new_div = document.createElement("div");
    new_div.innerHTML = winner;
    new_div.classList.add("winner_text");
    modalContent.appendChild(new_div);
    
    var modal = document.querySelector(".modal");
    modal.classList.remove("hide");
    modal.classList.add("show");
 }






 function editTurn(turns){
    var turn = document.querySelector(".turn .big");
    turn.parentNode.removeChild(turn);
    var g = document.createElement("div");
    var turn_box = document.querySelector(".turn");
    g.innerHTML = turns;
    turn_box.appendChild(g);

 }






 function check_user(){
    var modal2 = document.querySelector(".modal2");
    modal2.classList.remove("hide");
    modal2.classList.add("show");
 }




 var yes = document.querySelector(".yes");
 yes.addEventListener("click",function(){
    
    clearModal2();
    clear_boxes();
 })
 var no = document.querySelector(".no");
 no.addEventListener("click",function(){
    clearModal2();
 })







 function clearModal2(){
    var modal2 = document.querySelector(".modal2");
    modal2.classList.remove("show");
    modal2.classList.add("hide");
 }






 function add_winner_text(){
    var d = document.querySelector(".modal_content");
    var winnerText = document.createElement("div");
    winnerText.classList.add("big");
    winnerText.innerText = "Wineer : ";
    d.appendChild(winnerText);
 }

 

 function getValue(){
    var getValue = document.querySelector("#options");
    var value = getValue.value;
    return value;
 }







function set_grid(k){
    n = k;
    console.log("Suhana");
    var container2 = document.querySelector(".container");
    container2.parentNode.removeChild(container2);
    var mother_container = document.querySelector(".mother_container");
    var newContainer = document.createElement("div");
    for(var i = 0;i<n*n;i++){
        var new_div = document.createElement("div");
        new_div.classList.add("box");
        new_div.id = i.toString();
        newContainer.appendChild(new_div);
    }
    newContainer.classList.add("container");
    var new_size = " 1fr";
    console.log(n);
    for(var i = 0;i<(n-1);i++){
        new_size+=" 1fr";
    }
    console.log(new_size);
    newContainer.style.gridTemplateColumns = new_size;
    newContainer.style.gridTemplateRows = new_size;
    mother_container.appendChild(newContainer);
    board = []
    for(var i = 0;i<n;i++){
        var temp = [];
        for(var j = 0;j<n;j++){
            temp.push(-1);
        }
        board.push(temp);
    }
    check_click();
}
