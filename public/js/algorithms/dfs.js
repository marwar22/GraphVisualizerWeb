function dfs(v, prevEdgeId, GKopia, stepList) {
    v.data1 = 1;//visited
    v.color = "green";
    GKopia.edges[prevEdgeId]
    let verticesChanges = [];
    let edgesChanges = [];
    verticesChanges.push(new VertexChange(v));
    if(prevEdgeId !== -1) {
        console.log("kolorki");
        GKopia.edges[prevEdgeId].color = "red";
        edgesChanges.push(new EdgeChange(GKopia.edges[prevEdgeId]));
    }
    step = new Step(verticesChanges,edgesChanges);
    stepList.AddStep(step);
    v.edges.forEach((edgeId)=>{  
        let a = GKopia.edges[edgeId].idVertexFrom, b = GKopia.edges[edgeId].idVertexTo;
        if(GKopia.isDirected) {
            if(v.id === b)
                return;
            if(GKopia.vertices[b].data1 === 0)
                dfs(GKopia.vertices[b], edgeId,GKopia,stepList);
        }
        else {
            if(v.id === a) {//NO SUPER TA KONWENCJA 
                if(GKopia.vertices[b].data1 === 0)
                dfs(GKopia.vertices[b], edgeId,GKopia,stepList);
            }
            else {
                if(GKopia.vertices[a].data1 === 0)
                dfs(GKopia.vertices[a], edgeId,GKopia,stepList);
            }
        }
    });
}

function DfsAlg() {
    let GKopia = G.GetGraphCopy();
    console.log("G: ", G);
    console.log("gkopia: ", GKopia);
    let stepList = new StepList(G);
    let verticesChanges = [];
    let edgesChanges = [];
    console.log("dfs");
    GKopia.vertices[0].color = "blue";
    verticesChanges.push(new VertexChange(GKopia.vertices[0]));
    step = new Step(verticesChanges,edgesChanges);
    stepList.AddStep(step);
    
    GKopia.vertices.forEach((vertex) => {
        if(vertex.data1 === 0)
            dfs(vertex, -1, GKopia, stepList);
    });

    return stepList;
}
