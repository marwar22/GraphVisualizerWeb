var socket = io();
socket.emit('login',"użytkownik","mojehaslo");
socket.on('login-result', WypiszResult);

function WypiszResult(wynik){
    console.log(wynik);
}

const G = new Graph();
let file;

{
    
    window.onload = Init;
    var state = stateEnum.ADDVERTEX;
    var lastMousePosition = null;
    var mouseIsDown = false;

    var graphCanvas;
    var ctx;


    function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }

    function Init() {        
        let canvas = document.getElementById("graphCanvas");
        graphCanvas = canvas;
        ctx = graphCanvas.getContext('2d');
        console.log(canvas);
        canvas.addEventListener("click", function (evt) {
            var mousePos = getMousePos(canvas, evt);

                 if (state === stateEnum.ADDVERTEX)      AddVertexToGraph(mousePos);
            else if (state === stateEnum.REMOVEVERTEX)   RemoveVertexFromGraph(mousePos);
            else if (state === stateEnum.ADDEDGE)        AddEdgeToGraph(mousePos);
            else if (state === stateEnum.REMOVEEDGE)     RemoveEdgeFromGraph(mousePos);
            else if (state === stateEnum.EDITEDGE)       SelectEdge(mousePos);
        }, false);

        document.addEventListener("mousedown", function (evt) {
            mouseIsDown = true;
        }, false);

        document.addEventListener("mouseup", function (evt) {
            mouseIsDown = false;
            if (state === stateEnum.MOVEVERTEX) G.chosenVertexId = null;
        }, false);

        document.addEventListener("mousemove", function (evt) {
            lastMousePosition = getMousePos(canvas, evt);
        });        

        document.addEventListener('keydown', function(evt) {
            console.log(evt.key + typeof(evt.key));

            if (state === stateEnum.EDITEDGE){
                if (G.chosenEdgeId != null){
                    G.edges[G.chosenEdgeId].data[0] = parseInt(G.edges[G.chosenEdgeId].data[0]);
                    console.log("id != null");
                   
                    if ('0' <= evt.key && evt.key <= '9'){
                        G.edges[G.chosenEdgeId].data[0] *= 10;

                        if (G.edges[G.chosenEdgeId].data[0] >= 0)
                            G.edges[G.chosenEdgeId].data[0] += parseInt(evt.key);
                        
                        else
                            G.edges[G.chosenEdgeId].data[0] -= parseInt(evt.key);
                    }

                    switch(evt.key){
                        case "-":
                            G.edges[G.chosenEdgeId].data[0] *= -1;
                            break;
                        case "Backspace":
                            G.edges[G.chosenEdgeId].data[0] = parseInt(G.edges[G.chosenEdgeId].data[0] / 10);
                            break;
                        case "Delete":
                            G.edges[G.chosenEdgeId].data[0] = parseInt(G.edges[G.chosenEdgeId].data[0] / 10);
                            break;
                        
                        case "Enter":
                            state = stateEnum.NONE;
                            G.chosenVertexId = null;
                            G.chosenEdgeId = null;
                            G.edges.forEach(function(edge){edge.underEdit = false;});

                            var editButton = document.getElementById("editEdgeBtn");
                            editButton.classList.remove("btnPressed");
                            break;
                    }
                    if (G.chosenEdgeId != null)
                        console.log("weight: ", G.edges[G.chosenEdgeId].data[0]);
                
                }
            }

        }, false);

        toolbarEditGraph    = document.getElementById("toolbarEditGraph");
        toolbarRunAlgorithm = document.getElementById("toolbarRunAlgorithm");
        toolbarChooseAlg    = document.getElementById("toolbarChooseAlg");
        setInterval(MainLoop,1000/100); 
    }


    position = {y: 0, x:0};
    G.AddVertex(position);
    position = {y: 100, x:100};
    G.AddVertex(position);
    G.AddEdge(v=0 ,w=1 ,d1=10);
    // G.AddEdge(v=0 ,w=1 ,d1=20);

    function DebugRect(ctx){
        ctx.beginPath();
        ctx.rect(0, 0, graphCanvas.width, graphCanvas.height);
        ctx.strokeStyle = "greenyellow";
        ctx.stroke();
        //console.log("draw debug rect");
    }

    function RenderGraph() {
        const graphCanvas = document.getElementById("graphCanvas");
        let ctx = graphCanvas.getContext('2d');
        
        // const cWidth = graphCanvas.getBoundingClientRect().width;
        // const cHeight = graphCanvas.getBoundingClientRect().height;
      
        graphCanvas.height = graphCanvas.clientHeight; 
        graphCanvas.width = graphCanvas.clientWidth; 

        var surfaceArea = graphCanvas.clientHeight*graphCanvas.clientWidth;
        vertexRadius = Math.sqrt(surfaceArea / defaultSurfaceArea) * defaultVertexRadius;
        vertexRadius = Math.max(vertexRadius, minVertexRadius);
        // graphCanvas.width  = graphCanvas.height * (graphCanvas.clientWidth / graphCanvas.clientHeight);
        
        DebugRect(ctx);
        //G.GraphVerticesData();
        //G.GraphEdgesData();
        
        
        
        ctx.strokeStyle = "greenyellow"; // gdybyśmy chcieli zmienić kolor krawędzi to tutaj
        G.edges.forEach(function(edge){
            edge.Draw(ctx);
        });
        
        G.vertices.forEach(function(vertex){
            vertex.Draw(ctx);
        });
    
    }

    function KeepInGraphArea(vertex){
        vertex.position.x = Math.max(vertex.position.x, vertexRadius + canvasMargin);
        vertex.position.x = Math.min(vertex.position.x, graphCanvas.width-vertexRadius-canvasMargin);

        vertex.position.y = Math.max(vertex.position.y, vertexRadius + canvasMargin);
        vertex.position.y = Math.min(vertex.position.y, graphCanvas.height-vertexRadius-canvasMargin);

        // vertex.position.x += 1;
        // vertex.position.y += 1;
        // vertex.position.x += getRandomInt(0,5)-2.5;
        // vertex.position.y += getRandomInt(0,5)-2.5;
        // console.log(vertex.position.x)
    }

    function RandomGraph(thisbutton) {
        state = stateEnum.NONE;
        ClearPressedButtons();

        G.ClearGraph();

        // var numVertices = 6;
        // var numEdges = 9;
        // for(i=0; i<numVertices; i++){
        //     var position = {
        //         x: getRandomInt(0, graphCanvas.clientWidth),
        //         y: getRandomInt(0, graphCanvas.clientHeight) 
        //     }
        //     G.AddVertex(position);
        //     console.log("vertex added");
        // }

        // G.AddEdge(0,1, 0, 100);
        // G.AddEdge(0,2, 1, 100);
        // G.AddEdge(0,3, 2, 100);
        // G.AddEdge(0,4, 3, 100);
        // G.AddEdge(0,5, 4, 100);
        // G.AddEdge(1,2, 1, 100);
        // G.AddEdge(1,3, 2, 100);
        // G.AddEdge(1,4, 3, 100);
        // G.AddEdge(1,5, 4, 100);
        // G.AddEdge(2,3, 2, 100);
        // G.AddEdge(2,4, 3, 100);
        // G.AddEdge(2,5, 4, 100);
        // G.AddEdge(3,4, 3, 100);
        // G.AddEdge(3,5, 4, 100);
        // G.AddEdge(4,5, 4, 100);
        // return;


        var numVertices = getRandomInt(7,50);
        var numEdges = getRandomInt(parseInt(numVertices*numVertices/12) , parseInt(numVertices*numVertices/5));
        // if( numEdges > 1000 ) numEdges = 1000;
        
        for(i=0; i<numVertices; i++){
            var position = {
                x: getRandomInt(0, graphCanvas.clientWidth),
                y: getRandomInt(0, graphCanvas.clientHeight) 
            }
            G.AddVertex(position);
            console.log("vertex added");
        }
        console.log("numVertices: " + numVertices);
        console.log("numEdges" + numEdges);
        var edgeCandidates = [];
        for(i=0; i<numVertices; i++)
            for(j=i+1; j<numVertices; j++){
                var distance = getLength(G.vertices[i], G.vertices[j]);
                edgeCandidates.push([distance, i, j]);
            }
        
        edgeCandidates.sort(function(a, b){return a[0]-b[0];});
        for(i=0; i<numEdges; i++){
            console.log(edgeCandidates[i]);
            G.AddEdge(edgeCandidates[i][1], edgeCandidates[i][2], i, 100);
        }
    }

    function MainLoop() {
        if (mouseIsDown === true && state === stateEnum.MOVEVERTEX){
            MoveVertexInGraph(lastMousePosition);
        }       

        let preCalclulate = new Date();
        G.CalculateForces();
        let postCalculate = new Date();
        G.ApplyForces();        
        G.vertices.forEach(KeepInGraphArea);
        let preRender = new Date();
        RenderGraph();
        let postRender = new Date();
        
        document.getElementById("renderTime").innerHTML = "Render: " + (postRender - preRender).toString()+" ";
        document.getElementById("calculateTime").innerHTML = " ForcesC: " + (postCalculate - preCalclulate).toString();
        //let applyForces = new Date();
        

    }
}
