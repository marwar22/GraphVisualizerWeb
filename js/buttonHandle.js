function AddVertexBtt(thisbutton) {
    state = stateEnum.ADDVERTEX;
    ClearPressedButtons();
    thisbutton.classList.add("btnPressed");
    
    G.AddVertex( {y: getRandomInt( 0, 500 ), x: getRandomInt( 0, 500 )} );
    G.GraphVerticesData();
    G.GraphEdgesData();
    
}

function RemoveVertexBtt(thisbutton) {
    state = stateEnum.REMOVEVERTEX;
    ClearPressedButtons();
    thisbutton.classList.add("btnPressed");

    G.RemoveVertex( getRandomInt( 0, G.verticesNumber-1 ) );
    G.GraphVerticesData();
    G.GraphEdgesData();
}

function AddEdgeBtt(thisbutton) {
    state = stateEnum.ADDEDGE;
    ClearPressedButtons();
    thisbutton.classList.add("btnPressed");
    
    G.AddEdge( getRandomInt( 0, G.verticesNumber - 1 ), getRandomInt( 0, G.verticesNumber - 1 ), 1, 1 );
    G.GraphVerticesData();
    G.GraphEdgesData();
    
}
function RemoveEdgeBtn(thisbutton) {
    state = stateEnum.REMOVEEdDGE;
    ClearPressedButtons();
    thisbutton.classList.add("btnPressed");
    G.GraphVerticesData();
    G.GraphEdgesData();
}
function MoveVertexBtn(thisbutton) {
    state = stateEnum.MOVEVERTEX;
    ClearPressedButtons();
    thisbutton.classList.add("btnPressed");
}
function EditEdgeBtn(thisbutton) {
    state = stateEnum.EDITEDGE;
    ClearPressedButtons();
    thisbutton.classList.add("btnPressed");    
}
function SimulateForcesBtn(thisbutton) {
    ClearPressedButtons();
    thisbutton.classList.add("btnPressed");
}
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

function ClearPressedButtons() {
    Array.from(document.getElementsByClassName("btnPressed")).forEach(
        function(button) {
            button.classList.remove("btnPressed");            
        }
    );
}