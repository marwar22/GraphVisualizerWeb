function ColorsAlg() {
    let GKopia =  G.GetGraphCopy(); 

    console.log("==: ", GKopia == G);
    console.log("===: ", GKopia === G);
    console.log("G: ", G);
    console.log("GKopia: ", GKopia);
    // let GKopia = R.clone(G);
    let stepList = new StepList(G);
    console.log("wykonuję algorytm kolory",stepList);

    let verticesChanges = [];
    let edgesChanges    = [];
    // step = new Step(verticesChanges,edgesChanges);
    // stepList.InitStep(step);
    for (let i = 0; i < 1000; ++i) {
        verticesChanges = [];
        edgesChanges    = [];
        GKopia.vertices.forEach((vertex)=>{
            vertex.color = GetRandColor();
            verticesChanges.push(new VertexChange(vertex));
        })
        GKopia.edges.forEach((edge)=>{
            edge.color = GetRandColor();
            edgesChanges.push(new EdgeChange(edge));
        })
        step = new Step(verticesChanges,edgesChanges);
        //if(i === 0) stepList.InitStep(step);
        /*else*/         stepList.AddStep(step);

    }
    return stepList;
}

function GetRandColor(){
    var rndNum16 = Math.floor(Math.random()*16777215).toString(16);
    while(rndNum16.length < 6){
        rndNum16 = "0" + rndNum16;
    }

    return "#" + rndNum16;
}