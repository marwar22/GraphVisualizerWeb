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
    
    G.AddEdge( getRandomInt( 0, G.verticesNumber - 1 ), getRandomInt( 0, G.verticesNumber - 1 ), 1, 1 );
    G.GraphVerticesData();
    G.GraphEdgesData();
    
}
function RemoveEdgeBtn(thisbutton) {
    if (CheckPressedBefore(thisbutton)){return;}
    state = stateEnum.REMOVEEDGE;
    ClearPressedButtons();
    thisbutton.classList.add("btnPressed");
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
    if (CheckPressedBefore(thisbutton)){return;}
    ClearPressedButtons();
    thisbutton.classList.add("btnPressed");
}
function SaveToFileBtn(thisbutton) {
    if (CheckPressedBefore(thisbutton)){return;}
    ClearPressedButtons();
    thisbutton.classList.add("btnPressed");
    SaveGraph();
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

function GoToAlgorithm() {
    const toolbarRunAlgorithm = document.getElementById("toolbarRunAlgorithm");
    const toolbarChooseAlg = document.getElementById("toolbarChooseAlg");
    toolbarRunAlgorithm.style.display = "flex";
    toolbarChooseAlg.style.display = "none";
}

function ReturntoChooseAlg() {
    const toolbarRunAlgorithm = document.getElementById("toolbarRunAlgorithm");
    const toolbarChooseAlg = document.getElementById("toolbarChooseAlg");
    toolbarChooseAlg.style.display = "flex";
    toolbarRunAlgorithm.style.display = "none";
}

function ClearPressedButtons() {
    Array.from(document.getElementsByClassName("btnPressed")).forEach(
        function(button) {
            if (!button.classList.contains("standalone"))
                button.classList.remove("btnPressed");            
        }
    );
}