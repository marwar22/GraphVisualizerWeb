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
    EDITEDGE: 4,
    CHOOSEALG: 5,
    RUNALG: 6,
    SAVEFILE: 7,
    LOADFILE: 8
};  
