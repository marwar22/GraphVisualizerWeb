function ColorsAlg() {
    let GKopia = JSON.parse(JSON.stringify(G));
    let stepList = new StepList(G);
    console.log("wykonuję algorytm kolory",stepList);

    for (let i = 0; i < 1000; ++i) {
        let verticesChanges = [];
        let edgesChanges    = [];
        GKopia.vertices.forEach((vertex)=>{
            vertex.color = "#" + Math.floor(Math.random()*16777215).toString(16);
            verticesChanges.push(new VertexChange(vertex));
        })
        GKopia.edges.forEach((edge)=>{
            edge.color = "#" + Math.floor(Math.random()*16777215).toString(16);
            edgesChanges.push(new EdgeChange(edge));
        })
        step = new Step(verticesChanges,edgesChanges);
        if(i === 0) stepList.InitStep(step);
        else        stepList.AddStep(step);

        console.log(step);
    }
    return stepList;
}
