const defaultVertexRadius = 20;
const minVertexRadius = 13;
var vertexRadius = defaultVertexRadius;

const middleVertexRadius = 6;

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
    MOVEVERTEX: 4,
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

function pointInVertex(vertex_position, y, x, R=vertexRadius){
    //console.log("y: ", y);
    //console.log("x: ", x);
    console.log("dist: " + Math.sqrt(Math.pow(vertex_position.y - y, 2) + Math.pow(vertex_position.x - x, 2)));
    if (Math.sqrt(Math.pow(vertex_position.y - y, 2) + Math.pow(vertex_position.x - x, 2)) < R)
        return true;
    return false;
}


function mergeSort( T, a, b ) {
    if( b - a > 1 ) {
        let c = ( ( a + b ) - ( a + b ) % 2 ) / 2;
        mergeSort( T, a, c );
        mergeSort( T, c + 1, b );
        let W = [];
        let x = a;
        let y = c + 1;
        for( ; x <= c && y <= b; ) {
            if( T [ x ] < T [ y ] ) {
                W.push( T [ x ] );
                x++;
            }else
            {
                W.push( T [ y ] );
                y++;
            }
        }
        for( ; x <= c; ) {
            W.push( T [ x ] );
            x++;
        }
        for( ; y <= b; ) {
            W.push( T [ y ] );
            y++;
        }
        for( let i = a; i <= b; i++ ) {
            T [ i ] = W [ i - a ];
        }
    }else
    {
        if( a !== b ) {
            if( T [ a ] > T [ b ] ) {
                let g = T [ a ];
                T [ a ] = T [ b ];
                T [ b ] = g;
            }
        }
    }

}

