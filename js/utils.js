const defaultVertexRadius = 20;
const minVertexRadius = 13;
var vertexRadius = defaultVertexRadius;

const canvasMargin = 10;
const defaultHeight = 700;
const defaultWidth = 1900;
const defaultSurfaceArea = defaultHeight * defaultWidth;


const OPT_V_DST = -1;
const OPT_ME_OME_DST = -1;
const OPT_ME_ME_DST = -1;
const OPT_E_DST = -1;
const OPT_ME_V_DST = -1;

var stateEnum = {
    ADDVERTEX: 0,
    REMOVEVERTEX: 1,
    ADDEDGE: 2,
    REMOVEEDGE: 3,
    MOVEVERTEX: 3,
    EDITEDGE: 5,
    CHOOSEALG: 6,
    RUNALG: 7,
    SAVEFILE: 8,
    LOADFILE: 9
}; 

Math.seedrandom = "testowy_graf";
function getRandomInt(minval, maxval) {
    return Math.floor(Math.random() * (maxval - minval)) + minval;
}

function swap(_t1,_t2) {
    let _t =  _t1;
    _t1 = _t2;
    _t2 = _t;
}

function pointInVertex(vertex_position, y, x){
    //console.log("y: ", y);
    //console.log("x: ", x);
    if (Math.sqrt(Math.pow(vertex_position.y - y, 2) + Math.pow(vertex_position.x - x, 2)) < vertexRadius)
        return true;
    return false;
}