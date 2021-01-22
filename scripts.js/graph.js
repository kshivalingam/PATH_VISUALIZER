var g,c;
class QElement{
    constructor(element,priority){
        this.element = element;
        this.priority = priority;
    }
}

class PriorityQueue{
    constructor(){
        this.items = [];
    }
    enqueue(element, priority) 
    { 
        var qElement = new QElement(element, priority); 
        var contain = false; 
        for (var i = 0; i < this.items.length; i++) { 
            if (this.items[i].priority > qElement.priority) { 
                this.items.splice(i, 0, qElement); 
                contain = true; 
                break; 
            } 
        } 
        if (!contain) { 
            this.items.push(qElement); 
        } 
    }
    dequeue() 
    { 
        if (this.isEmpty()) 
            return "Underflow"; 
        return this.items.shift(); 
    }
    front() 
    { 
        if (this.isEmpty()) 
            return "No elements in Queue"; 
        return this.items[0]; 
    }
    rear() 
    {
        if (this.isEmpty()) 
            return "No elements in Queue"; 
        return this.items[this.items.length - 1]; 
    }
    isEmpty() 
    { 
        return this.items.length == 0; 
    } 
}

class Graph {
    constructor(noOfVertices)
    {
        this.noOfVertices = noOfVertices;
        this.AdjList = new Map();
        c = 0;
    }
    addVertex(v)
    {
        this.AdjList.set(v, []);
    }
    addEdge(v, w)
    {
        this.AdjList.get(v).push(w);
        this.AdjList.get(w).push(v);
    }
    printGraph()
    {
        var get_keys = this.AdjList.keys();
        for (var i of get_keys) 
        {
                var get_values = this.AdjList.get(i);
                console.log(get_values);
                var conc = "";
                if(get_values >= 50)continue;
                for (var j of get_values)
                    conc += j + " ";
                console.log(i + " -> " + conc);
        }
    }
    bfs(startingNode,EndNode)
    {
        console.log("BFS is invoked ..");
        var visited = {};
        var q = [];
        visited[startingNode] = true;
        q.push(startingNode);
        while (q.length > 0) {
            var getQueueElement = q.shift();
            coloring(getQueueElement,1);
            let flag = 0;
            if(EndNode == getQueueElement){
                console.log("Found....!!!!!!!" + EndNode);
                break;
            }
            var get_List = this.AdjList.get(getQueueElement);
            for (var i in get_List) {
                var neigh = get_List[i];
                if (!visited[neigh]) {
                    visited[neigh] = true;
                    q.push(neigh);
                    coloring(neigh,2);
                }
                if(EndNode == getQueueElement){
                    console.log("Found....!!!!!!!" + EndNode);
                    flag = 1;

                    break;
                }
            }
            if(flag == 1)break;
            coloring(getQueueElement,3);
        }
        enable_buttons();
    }
    dfs(startingNode,EndNode)
    {
    
        var visited = {};
    
        var s = this.DFSUtil(startingNode, visited,EndNode);
        console.log(s);
        enable_buttons();
    }
    DFSUtil(vert, visited,EndNode)
    {
        visited[vert] = true;
        coloring(vert,1);
        var get_neighbours = this.AdjList.get(vert);
        if(vert == EndNode){
            console.log("FOUND.....!!!!!");
            return true;
        }
        for (var i in get_neighbours) {
            var get_elem = get_neighbours[i];
            if (!visited[get_elem]){
                coloring(get_elem,2);
                if(this.DFSUtil(get_elem, visited,EndNode)){
                    coloring(vert,3);
                    return true;
                }

                coloring(get_elem,3);
            }
        }
        coloring(vert,3);
    }
    
    a_star(startNode,EndNode){
        console.log("a_star is invoked");
        var pq = new PriorityQueue();
        var visited ={};
        pq.enqueue(startNode,EndNode - startNode);
        visited[startNode] = true;
        console.log()
        console.log(startNode);
        console.log(EndNode - startNode);
        var route = [];
        while(!pq.isEmpty()){
            var getQueueElement  = pq.front();
            pq.dequeue();
            var get_List = this.AdjList.get(getQueueElement.element);
            var flag = 0;
            coloring(getQueueElement.element,1);
            route.push(getQueueElement.element);
            if(EndNode == getQueueElement.element){
                console.log("Found....!!!!!!!" + EndNode);
                break;
            }
            var minimum = Number.MAX_VALUE;
            var cur_neigh = 0;
            for (var i in get_List) {
                var neigh = get_List[i];
                if (!visited[neigh]) {
                    visited[neigh] = true;
                    if(Math.pow((EndNode-neigh),2) < minimum){
                        minimum = Math.pow((EndNode - neigh),2);
                        cur_neigh = neigh;
                        flag = 1;
                    }
                    // coloring(neigh,2);
                }

            }
            if(flag == 1)pq.enqueue(cur_neigh,minimum);
            // coloring(neigh,3);
        }
        // console.log("Out of Loop");
        // while(!pq.isEmpty()){
        //     console.log(pq.front().element +" and " + pq.front().priority);
        //     pq.dequeue();
        // }
        for(let idx = 0; idx < route.length; idx++){
            coloring(route[idx],3);
        }
        enable_buttons();
    }
}
function coloring(ith,search){
    window.setTimeout(function(){
        if(ith == initial || ith == finish  ){
            div_element[ith].style = "color: blue; background-color: blue;float: left; margin : 1px; height : 25px; width : 25px;";
        }
        else if(search == 1){
            div_element[ith].style = "color: black; background-color: black;float: left; margin : 1px; height : 25px; width : 25px;";
        }
        else if(search == 2){
            div_element[ith].style = "color: yellow; background-color: yellow;float: left; margin : 1px; height : 25px; width : 25px;";
        }
        else if(search == 3){
            div_element[ith].style = "color: green; background-color: green;float: left; margin : 1px; height : 25px; width : 25px;";
        }
        else{
            div_element[ith].style = "color: red; background-color: red;float: left; margin : 1px; height : 25px; width : 25px;";
        }
    },clock += delay_time);
}
var set = new Set();
function set_utils(){
    for(var j = 0; j < div_element.length; j++){
        g.addVertex(j);
    }
    for(var edge = 45; edge <1425 ; edge += 46){
        set.add(edge + 1);
        set.add(edge);
    }
}
function create_graph(){
    clock = 0;
    create_nodes();
    g = new Graph(div_element.length);
    set_utils();
    console.log(set);
    for(var i = 0; i < div_element.length; i++){
        if(i - 46 >= 0){
            g.addEdge(i,i - 46)
        }
        if(!set.has(i + 1) && i + 1 < div_element.length){
            g.addEdge(i,i + 1);
        }
        if(i + 46 < div_element.length -1){
            g.addEdge(i,i + 46);
        }
        if(!set.has(i - 1) && i - 1 >= 0){
            g.addEdge(i,i - 1);
        }
    }
}

