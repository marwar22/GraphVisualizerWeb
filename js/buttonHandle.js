var toolbarEditGraph;
var toolbarRunAlgorithm;
var toolbarChooseAlg;  

function CheckPressedBefore(thisbutton){
    if (thisbutton.classList.contains("btnPressed")){
        thisbutton.classList.remove("btnPressed");
        state = stateEnum.NONE;
        return true;
    }
    return false;
}

function AddVertexBtt(thisbutton) {
    if (CheckPressedBefore(thisbutton)){return;}
    state = stateEnum.ADDVERTEX;
    ClearPressedButtons();
    thisbutton.classList.add("btnPressed");
    
    // G.AddVertex( {y: getRandomInt( 0, 500 ), x: getRandomInt( 0, 500 )} );
    G.GraphVerticesData();
    G.GraphEdgesData(); 
}

function RemoveVertexBtt(thisbutton) {
    if (CheckPressedBefore(thisbutton)){return;}
    state = stateEnum.REMOVEVERTEX;
    ClearPressedButtons();
    thisbutton.classList.add("btnPressed");

    G.GraphVerticesData();
    G.GraphEdgesData();
}

function AddEdgeBtt(thisbutton) {
    if (CheckPressedBefore(thisbutton)){return;}
    state = stateEnum.ADDEDGE;
    ClearPressedButtons();
    thisbutton.classList.add("btnPressed");
    
    // G.AddEdge( getRandomInt( 0, G.verticesNumber - 1 ), getRandomInt( 0, G.verticesNumber - 1 ), 1, 1 );
    G.GraphVerticesData();
    G.GraphEdgesData();
    
}
function RemoveEdgeBtn(thisbutton) {
    if (CheckPressedBefore(thisbutton)){
        G.edges.forEach(function(edge){edge.underEdit = false;});
        return;
    }
    state = stateEnum.REMOVEEDGE;
    ClearPressedButtons();
    thisbutton.classList.add("btnPressed");
    G.edges.forEach(function(edge){edge.underEdit = true;});
    G.GraphVerticesData();
    G.GraphEdgesData();
}
function MoveVertexBtn(thisbutton) {
    if (CheckPressedBefore(thisbutton)){return;}
    state = stateEnum.MOVEVERTEX;
    ClearPressedButtons();
    thisbutton.classList.add("btnPressed");
}
function EditEdgeBtn(thisbutton) {
    if (CheckPressedBefore(thisbutton)){return;}
    state = stateEnum.EDITEDGE;
    ClearPressedButtons();
    thisbutton.classList.add("btnPressed");    
}
function SimulateForcesBtn(thisbutton) {
    if (thisbutton.classList.contains("btnPressed")){
        thisbutton.classList.remove("btnPressed");
        G.simulateForces = false;
    }

    else{
        G.simulateForces = true;
        thisbutton.classList.add("btnPressed");
    }
}
function SaveToFileBtn(thisbutton) {
    if (CheckPressedBefore(thisbutton)){return;}
    ClearPressedButtons();
    thisbutton.classList.add("btnPressed");
    SaveGraph( G );
    SaveGraph2( G );
    thisbutton.classList.remove("btnPressed");
}
function ReadFromFileBtn(thisbutton) {
    if (CheckPressedBefore(thisbutton)){return;}
    ClearPressedButtons();
    thisbutton.classList.add("btnPressed");
    LoadGraph();
    thisbutton.classList.remove("btnPressed");
}

function ChooseAlg() { 
    toolbarEditGraph.style.display = "none";
    toolbarChooseAlg.style.display = "flex";
}

function ReturnToEdit(){

    toolbarEditGraph.style.display = "flex";
    toolbarChooseAlg.style.display = "none";
    

    console.log(toolbarChooseAlg);
}

function GoToAlgorithm() {
    toolbarRunAlgorithm.style.display = "flex";
    toolbarChooseAlg.style.display = "none";
}

function ReturntoChooseAlg() {
    toolbarChooseAlg.style.display = "flex";
    toolbarRunAlgorithm.style.display = "none";
}

function ClearPressedButtons() {
    G.chosenVertexId = null;
    Array.from(document.getElementsByClassName("btnPressed")).forEach(
        function(button) {
            if (!button.classList.contains("standalone"))
                button.classList.remove("btnPressed");            
        }
    );
}