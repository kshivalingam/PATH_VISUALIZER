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
            coloring(getQueueElement,"black");
            var flag = 0;
            if(EndNode == getQueueElement){
                // console.log("Found....!!!!!!!" + EndNode);
                break;
            }
            var get_List = this.AdjList.get(getQueueElement);
            for (var i in get_List) {
                var neigh = get_List[i];
                if (!visited[neigh]) {
                    visited[neigh] = true;
                    q.push(neigh);
                    coloring(neigh,"yellow");
                }
                if(EndNode == getQueueElement){
                    // console.log("Found....!!!!!!!" + EndNode);
                    flag = 1;

                    break;
                }
            }
            if(flag == 1)break;
            coloring(getQueueElement,"green");
        }
        enable_buttons();
    }
    dfs(startingNode,EndNode)
    {
    
        var visited = {};
    
        var s = this.DFSUtil(startingNode, visited,EndNode);
        enable_buttons();
    }
    DFSUtil(vert, visited,EndNode)
    {
        visited[vert] = true;
        coloring(vert,"black");
        var get_neighbours = this.AdjList.get(vert);
        if(vert == EndNode){
            // console.log("FOUND.....!!!!!");
            return true;
        }
        for (var i in get_neighbours) {
            var get_elem = get_neighbours[i];
            if (!visited[get_elem]){
                coloring(get_elem,"yellow");
                if(this.DFSUtil(get_elem, visited,EndNode)){
                    coloring(vert,"green");
                    return true;
                }

                coloring(get_elem,"green");
            }
        }
        coloring(vert,"green");
    }
    
    a_star(startNode,EndNode){
        console.log("a_star is invoked");
        var pq = new PriorityQueue();
        var visited ={};
        pq.enqueue(startNode,EndNode - startNode);
        visited[startNode] = true;
        var route = [];
        while(!pq.isEmpty()){
            var getQueueElement  = pq.front();
            pq.dequeue();
            var get_List = this.AdjList.get(getQueueElement.element);
            var flag = 0;
            coloring(getQueueElement.element,"black");
            route.push(getQueueElement.element);
            if(EndNode == getQueueElement.element){
                // console.log("Found....!!!!!!!" + EndNode);
                break;
            }
            var minimum = Number.MAX_VALUE;
            var cur_neigh = 0;
            for (var i in get_List) {
                var neigh = get_List[i];
                if (!visited[neigh]) {
                    visited[neigh] = true;
                    var x_neigh = x_mp.get(neigh);
                    var x_dest = x_mp.get(EndNode);
                    var y_neigh = y_mp.get(neigh);
                    var y_dest = y_mp.get(EndNode);
                    var distance = Math.sqrt(Math.pow((x_neigh-x_dest),2) + Math.pow((y_dest - y_neigh),2));
                    if(distance < minimum){
                        minimum = distance;
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
            coloring(route[idx],"green");
        }
        enable_buttons();
    }
}
function coloring(ith,search){
    window.setTimeout(function(){
        if(ith == initial || ith == finish  ){
            div_element[ith].style = "color: blue; background-color: blue; margin : 0px; height : 25px; width : 25px;";
        }
        else{
            div_element[ith].style = "color: "+search + "; background-color:" + search + "; margin : 0px; height : 25px; width : 25px;";
        }
    },clock += delay_time);
}
var set = new Set();
function set_utils(){
    for(var j = 0; j < div_element.length; j++){
        g.addVertex(j);
    }
    for(var edge = edge_node; edge <no_of_nodes ; edge += edge_node + 1){
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
        if(i - (edge_node + 1) >= 0){
            g.addEdge(i,i - (edge_node + 1))
        }
        if(!set.has(i + 1) && i + 1 < div_element.length){
            g.addEdge(i,i + 1);
        }
        if(i + 46 < div_element.length -1){
            g.addEdge(i,i + (edge_node + 1));
        }
        if(!set.has(i - 1) && i - 1 >= 0){
            g.addEdge(i,i - 1);
        }
    }
}

