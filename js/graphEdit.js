function AddVertexToGraph (mousePos){
    //console.log(mousePos);
    if (state == stateEnum.ADDVERTEX) {
        G.AddVertex({y: mousePos.y, x: mousePos.x});
    }
}

function RemoveVertexFromGraph (mousePos){
    for (i=0; i<G.vertices.length; i++){
        if(pointInVertex(G.vertices[i].position, mousePos.y, mousePos.x)){
            console.log("do usunięcia: " + i);
            console.log(G);
            G.RemoveVertex(i);
            console.log(G);
            break;
        }
    }
}

function AddEdgeToGraph(mousePos){
    var count_selected = 0;
    var first_selected = -1;
    for (i=0; i<G.vertices.length; i++){
        if(G.vertices[i].isBeingChosen){
            count_selected += 1;
            first_selected = i;
        }
    }
    
    if (count_selected > 1) throw "More than 1 selected";
    
    for (i=0; i<G.vertices.length; i++){
        if(pointInVertex(G.vertices[i].position, mousePos.y, mousePos.x)){
            if (count_selected == 1){
                G.AddEdge(first_selected, i, 0);
                G.vertices[first_selected].isBeingChosen = false;
                G.vertices[i].isBeingChosen = false;
            }
            else
                G.vertices[i].isBeingChosen = true;
            break;
        }
    }
}

function RemoveEdgeFromGraph(mousePos){
    // console.log("begin for");
    for (i=0; i<G.edges.length; i++){
        // console.log("in for");
        var v1 = G.vertices[G.edges[i].idVertexFrom];
        var v2 = G.vertices[G.edges[i].idVertexTo];
        G.edges[i].CalcMidCirlce(v1, v2);
        if(pointInVertex(G.edges[i].midCirclePos, mousePos.y, mousePos.x, middleVertexRadius)){
            // console.log("remove edge");
            G.RemoveEdge(i);
            break;
        }
    }
}

function SelectEdge(mousePos){
    for (i=0; i<G.edges.length; i++){
        // console.log("in for");
        var v1 = G.vertices[G.edges[i].idVertexFrom];
        var v2 = G.vertices[G.edges[i].idVertexTo];
        G.edges[i].CalcMidCirlce(v1, v2);
        if(pointInVertex(G.edges[i].midCirclePos, mousePos.y, mousePos.x, middleVertexRadius)){
            // console.log("remove edge");
            G.edges.forEach(function(edge){edge.underEdit = false;});
            G.edges[i].underEdit = true;
            G.edges[i].data[0] = 0;
            G.chosenEdgeId = i;

            console.log("chosenEdgeId: ", i);
            break;
        }
    }

}

function MoveVertexInGraph(mousePos){
    // jeżeli nie wybrany żaden wierzchołek lub poza obrębem aktualnie wybranego -> wybierz jakiś
    if (G.chosenVertexId == null){
        G.chosenVertexId = null;
        for (i=0; i<G.vertices.length; i++){
            if (pointInVertex(G.vertices[i].position, mousePos.y, mousePos.x)){
                G.chosenVertexId = i;
                break;
            }
        }
    }

    if (G.chosenVertexId != null){
        G.vertices[G.chosenVertexId].position.x = mousePos.x;
        G.vertices[G.chosenVertexId].position.y = mousePos.y;
    }
}

