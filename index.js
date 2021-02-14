{

    window.onload = Init;
    var state = stateEnum.ADDVERTEX;
    function Init() {        
        let canvas = document.getElementById("graphCanvas");
        console.log(canvas);
        canvas.addEventListener("click", function (evt) {
            var mousePos = getMousePos(canvas, evt);
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

    let G = new Graph();
    let addvx = 30;
    let addvy = 30;

    function ChooseAlg() { 
        const toolbarEditGraph = document.getElementById("toolbarEditGraph");
        const toolbarChooseAlg = document.getElementById("toolbarChooseAlg");
        toolbarEditGraph.style.display = "none";
        toolbarChooseAlg.style.display = "flex";
    }

    function ReturnToEdit(){
        const toolbarEditGraph = document.getElementById("toolbarEditGraph");
        const toolbarChooseAlg = document.getElementById("toolbarChooseAlg");
        toolbarEditGraph.style.display = "flex";
        toolbarChooseAlg.style.display = "none";
        console.log(toolbarChooseAlg);
    }

    function AddVertexButton(){
        state = stateEnum.ADDVERTEX;
        G.AddVertex( {y: addvy, x: addvx} );
        console.log( "dodano vertex" + addvx + " " + addvy );
        addvx += 70;
        addvy += 70;
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
        ctx.strokeStyle = "red";
        ctx.stroke();    
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
        G.GraphEdgesData();

        G.vertices.forEach(KeepInGraphArea);
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
        // console.log(vertex.position.x)
    }

    

    function MainLoop() {
        RenderGraph();
    }

    setInterval(MainLoop,100);
}