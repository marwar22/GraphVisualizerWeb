const DEBUG_EDGES = true;

const defaultVertexRadius = 20;
const minVertexRadius = 13;
var vertexRadius = defaultVertexRadius;

const defaultMiddleVertexRadius = 9;
const minMiddleVertexRadius = 6;
var middleVertexRadius = defaultMiddleVertexRadius;


const canvasMargin = 10;
const defaultHeight = 700;
const defaultWidth = 1900;
const defaultSurfaceArea = defaultHeight * defaultWidth;


const OPT_V_DST = 150;
const OPT_ME_OME_DST = 200;
const OPT_ME_ME_DST = -1;
const OPT_E_DST = 150;
const OPT_ME_V_DST = -1;

const LOOP_SCALE = 4;

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

function pointInVertex(vertex_position, y, x, R=vertexRadius){
    console.log("dist: " + Math.sqrt(Math.pow(vertex_position.y - y, 2) + Math.pow(vertex_position.x - x, 2)));
    if (Math.sqrt(Math.pow(vertex_position.y - y, 2) + Math.pow(vertex_position.x - x, 2)) < R)
        return true;
    return false;
}

function SegmentL( a, b ) {
    return Math.sqrt((a.x-b.x)*(a.x-b.x)+(a.y-b.y)*(a.y-b.y));
}

function SegmentAngle( a, b ) {
    if( b.y > a.y )
        return 2*Math.PI-Math.acos((b.x-a.x)/SegmentL(a, b));
    return Math.acos((b.x-a.x)/SegmentL(a, b));
}

function PercPoint( a, b, r ) {
    let c = { x: a.x+(b.x-a.x)*r, y: a.y+(b.y-a.y)*r };
    return c;
}

function CurvePoint(points, n, r) {
    let pointscp = [];
    for( let i = 0; i < n; i++ ) {
        pointscp.push( points[i] );
    }
    for( ; n > 1; n-- ) {
        for( let i = 0; i < n - 1; i++ ) {
            pointscp[i] = PercPoint( pointscp[i], pointscp[i+1], r );
        }
    }
    return pointscp[0];
}

function LineDraw(ctx, a, b, e) {
    ctx.beginPath();

    ctx.strokeStyle = e.color;

    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();
    ctx.closePath();
}

function CurveDraw(ctx, points, n, q, e) {
    for( let i = 0; i < q; i++ ) {
        LineDraw(ctx, CurvePoint(points, n, i/q), CurvePoint(points, n, (i+1)/q), e);
    }
}

function SearchAngleForArrow( points, n ) {
    let r = 0.5;
    let dr = 0.5;
    var pc;
    for( ; dr > 0.0005; dr /= 2 ) {
        pc = CurvePoint(points, n, r);
        if( SegmentL( pc, points[n-1] ) > vertexRadius )
            r += dr;
        else
            r -= dr;
    }
    let angle = SegmentAngle(points[n-1],pc);
    let aAngle = SegmentAngle(CurvePoint(points, n, r-0.05), CurvePoint(points, n, r-0.1));
    let angleO = { a: angle, b: aAngle };
    return angleO;
}

function DrawEdge( ctx, e ) {
    var x1 = e.G.vertices[e.idVertexFrom].position.x;
    var y1 = e.G.vertices[e.idVertexFrom].position.y;

    var x2 = e.midCirclePos.position.x;
    var y2 = e.midCirclePos.position.y;

    var x3 = e.G.vertices[e.idVertexTo].position.x;
    var y3 = e.G.vertices[e.idVertexTo].position.y;
    let points=[];
    if( x1 === x3 && y1 === y3 ) {
        var alpha2 = 2/3;
        var alpha = 50 / SegmentL( e.G.vertices[e.idVertexFrom].position, e.midCirclePos.position );
        points.push( {x: x1, y: y1} );
        points.push( {x: x1+2*alpha2*(x2-x1)-alpha*(y2-y1), 
                        y: y1+2*alpha2*(y2-y1)-alpha*(x1-x2)} );
        points.push( {x: x1+2*alpha2*(x2-x1)+alpha*(y2-y1),
                        y: y1+2*alpha2*(y2-y1)+alpha*(x1-x2)} );
        points.push( {x: x1, y: y1} );
        CurveDraw(ctx, points, 4, 50, e);
    }
    else{
        points.push( {x: x1, y: y1} );
        points.push( {x: 2*x2-(x1+x3)/2, 
                      y: 2*y2-(y1+y3)/2} );
        points.push( {x: x3, y: y3} );
        CurveDraw(ctx, points, 3, 50, e);
    }
    if( /*e.G.isDirected*/true ) {
        let angleO;
        if( x1 === x3 && y1 === y3 )
            angleO = SearchAngleForArrow( points, 4 );
        else
            angleO = SearchAngleForArrow( points, 3 );
        var angle = angleO.a;
        var aAngle = angleO.b;
        var dAngle = 0.4;
        var arrR = 1;
        a1 = { x: x3+Math.cos(angle)*vertexRadius, y: y3-Math.sin(angle)*vertexRadius };
        //a2 = { x: x3+Math.cos(angle+dAngle)*vertexRadius*arrR, y: y3-Math.sin(angle+dAngle)*vertexRadius*arrR };
        //a3 = { x: x3+Math.cos(angle-dAngle)*vertexRadius*arrR, y: y3-Math.sin(angle-dAngle)*vertexRadius*arrR };
        a2 = { x: a1.x+Math.cos(aAngle+dAngle)*vertexRadius*arrR, y: a1.y-Math.sin(aAngle+dAngle)*vertexRadius*arrR };
        a3 = { x: a1.x+Math.cos(aAngle-dAngle)*vertexRadius*arrR, y: a1.y-Math.sin(aAngle-dAngle)*vertexRadius*arrR };
        ctx.beginPath();
        ctx.fillStyle = e.color;
        console.log(e.color);
        ctx.moveTo(a1.x, a1.y);
        ctx.lineTo(a2.x, a2.y);
        ctx.lineTo(a3.x, a3.y);
        ctx.lineTo(a1.x, a1.y);
        ctx.fill();
        ctx.closePath();
    }
}