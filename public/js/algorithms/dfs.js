function dfs(v, GKopia, stepList) {
    v.data1 = 1;//visited
    v.color = "green";
    let verticesChanges = [];
    let edgesChanges = [];
    verticesChanges.push(new VertexChange(v));
    step = new Step(verticesChanges,edgesChanges);
    stepList.AddStep(step);
    v.edges.forEach((edge)=>{  
        let a = edge.idVertexFrom, b = edge.idVertexTo;
        if(GKopia.isDirected) {
            if(v.id === b)
                return;
            if(Gkopia.vertices[b].data1 === 0)
                dfs(Gkopia.vertices[b],GKopia,stepList);
        }
        else {
            if(v.id === a) {//NO SUPER TA KONWENCJA 
                if(Gkopia.vertices[b].data1 === 0)
                dfs(Gkopia.vertices[b],GKopia,stepList);
            }
            else {
                if(Gkopia.vertices[a].data1 === 0)
                dfs(Gkopia.vertices[a],GKopia,stepList);
            }
        }
    });
}

function DfsAlg() {
    let GKopia = JSON.parse(JSON.stringify(G));
    let stepList = new StepList(G);
    let verticesChanges = [];
    let edgesChanges = [];
    verticesChanges.push(new VertexChange(GKopia.vertices[0]));
    step = new Step(verticesChanges,edgesChanges);
    stepList.InitStep(step);
    
    GKopia.vertices.forEach((vertex) => {
        if(vertex.data1 === 0)
            dfs(vertex, GKopia, stepList);
    });

    return stepList;
}
