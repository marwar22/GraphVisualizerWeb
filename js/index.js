const G = new Graph();

{
    window.onload = Init;
    var state = stateEnum.ADDVERTEX;
    function Init() {        
        let canvas = document.getElementById("graphCanvas");
        console.log(canvas);
        canvas.addEventListener("click", function (evt) {
            var mousePos = getMousePos(canvas, evt);
            if (state == stateEnum.REMOVEVERTEX) {
                
            }
            alert(mousePos.x + ',' + mousePos.y);
        }, false);
        
        //Get Mouse Position
        function getMousePos(canvas, evt) {
            var rect = canvas.getBoundingClientRect();
            return {
                x: evt.clientX - rect.left,
                y: evt.clientY - rect.top
            };
        }
    
    }


    // function printMousePos(event) {
    //     document.body.textContent =
    //       "clientX: " + event.clientX +
    //       " - clientY: " + event.clientY;
    //   }
      
    // document.addEventListener("click", printMousePos);


    position = {y: 0, x:0};
    G.AddVertex(position);
    position = {y: 100, x:100};
    G.AddVertex(position);
    G.AddEdge(v=0 ,w=1 ,d1=10);
    G.AddEdge(v=0 ,w=1 ,d1=20);

    function DebugRect(ctx){
        ctx.beginPath();
        ctx.rect(0, 0, graphCanvas.width, graphCanvas.height);
        ctx.strokeStyle = "greenyellow";
        ctx.stroke();
        //console.log("draw debug rect");
    }

    function RenderGraph() {
        const graphCanvas = document.getElementById("graphCanvas");
        const ctx = graphCanvas.getContext('2d');
        
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
        
        G.CalculateForces();
        G.vertices.forEach(KeepInGraphArea);
        
        
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

        vertex.position.x += 1;
        vertex.position.y += 1;
        // vertex.position.x += getRandomInt(0,5)-2.5;
        // vertex.position.y += getRandomInt(0,5)-2.5;
        // console.log(vertex.position.x)
    }

    function RandomGraph(){
        G.ClearGraph();
        var numVertices = getRandomInt(5,12);
        var numEdges = getRandomInt(15 , Math.max(15,parseInt(numVertices*numVertices/5)));
        
        for(i=0; i<numVertices; i++){
            var position = {
                x: getRandomInt(0, graphCanvas.clientWidth),
                y: getRandomInt(0, graphCanvas.clientHeight) 
            }
            G.AddVertex(position);
            console.log("vertex added");
        }
        console.log("numEdges")
        var edgeCandidates = [];
        for(i=0; i<numVertices; i++)
            for(j=i+1; j<numVertices; j++){
                var distance = getLength(G.vertices[i], G.vertices[j]);
                edgeCandidates.push([distance, i, j])
            }
        
        edgeCandidates.sort();
        console.log(edgeCandidates[0], edgeCandidates[1]);
        for(i=0; i<numEdges; i++){
            G.AddEdge(edgeCandidates[i][1], edgeCandidates[i][2], i, 100);
        }
    }

    function MainLoop() {
        RenderGraph();
    }

    setInterval(MainLoop,1000);
}