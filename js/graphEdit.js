function AddVertexToGraph (mousePos){
    console.log(mousePos);
    if (state == stateEnum.ADDVERTEX) {
        G.AddVertex({y: mousePos.y, x: mousePos.x});
    }
}

function RemoveVertexFromGraph (mousePos){
    if (state == stateEnum.REMOVEVERTEX) {
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
}