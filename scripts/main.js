var div_element = [];
var x_mp = new Map();
var y_mp = new Map();
var cont = document.getElementById("implement");
var initial = -1;var finish = -1;
var res = document.getElementById("reset");
res.addEventListener("click",Util_reset);
var no_of_nodes = 660;
var edge_node = 43;
var speed = 10000;
var clock = 0;
var delay_time = 1000000/(Math.floor(1425/10)*speed);
var inp_aspeed = document.getElementById("a_speed")
inp_aspeed.addEventListener("click",vis_speed);

var algo_btn = document.querySelectorAll("#but_sec button");
function vis_speed(){
    var array_speed = inp_aspeed.value;
    switch(parseInt(array_speed))
    {
        case 1: speed=10;
                break;
        case 2: speed=50;
                break;
        case 3: speed=100;
                break;
        case 4: speed=500;
                break;
        case 5: speed=1000;
                break;
    }
    
    delay_time = 1000000/(Math.floor(1425/10)*speed);
}

for(let i = 0; i < algo_btn.length; i++){
    algo_btn[i].addEventListener("click",run_algo);
    console.log("added");
}

var y_cor = 0;

function create_nodes(){
    for(let i = 0; i < no_of_nodes; i++){
        div_element[i] = document.createElement("div");
        div_element[i].style = "margin : 0px; height : 25px; width : 25px;";
        cont.appendChild(div_element[i]);
        div_element[i].textContent = i;
        if(i < 44){
            x_mp.set(i,i);
        }else{
            x_mp.set(i,x_mp.get(i-44));
        }
        y_mp.set(i,Math.floor(i/44));
    }
    for(let i = 0; i < no_of_nodes; i++){
        div_element[i].addEventListener("click",get_value);        
    }
}

function Util_reset(){
    console.log("Util_reset is invoked");
    initial = -1;
    finish = -1;
    clock = 0;
    div_element = [];
    document.getElementById("implement").textContent = "";
    create_graph();
}
function get_value(){
    if(initial == -1){
        initial = parseInt(this.textContent);
        div_element[initial].style = "color:red; background-color: red;float: left; margin : 0px; height : 25px; width : 25px;";

    }
    else if(finish != initial && finish == -1){
        finish = parseInt(this.textContent);
        div_element[finish].style = "color:red; background-color: red;float: left; margin : 0px; height : 25px; width : 25px;";

    }
    console.log(initial + " " + finish);
    // if(initial != -1 && finish != -1){
    //     g.bfs(initial,finish);
    // }
}

function run_algo(){
    console.log("run_algo");
    if(initial == -1 || finish == -1){
        alert("please select src and destiny");
        // continue;
    }
    else{
        console.log("algo..");
        disable_buttons();
        this.classList.add("butt_selected");
        switch(this.textContent){
            case "bfs":g.bfs(initial,finish);
                        break;
            case "dfs":g.dfs(initial,finish);
                        break;
            case "a_star": g.a_star(initial,finish);
                        break;
        }
    }

}

function disable_buttons(){
    for(let i = 0; i < algo_btn.length; i++){
        algo_btn[i].classList=[];
        algo_btn[i].classList.add("butt_locked");
        algo_btn[i].disabled=true;
        inp_aspeed.disabled=true;
        res.disabled = true;
    }
}

function enable_buttons(){
    window.setTimeout(function(){
        for(let i = 0; i < algo_btn.length; i++){
            algo_btn[i].classList=[];
            algo_btn[i].classList.add("butt_unselected");
            algo_btn[i].disabled=false;
            inp_aspeed.disabled=false;
            res.disabled = false;
        }
    },clock += delay_time);
}
window.onload = create_graph();