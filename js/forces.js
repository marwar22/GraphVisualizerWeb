function GetAngleByCoordinates(x, y) {
    angle = Math.atan2(-y,-x);
    if (angle < 0) 
        angle += 2*Math.PI;

    return angle;
}

function GetAngleByPoints(vertex1, vertex2) {
    console.log("v1v2:",vertex1, vertex2);
    x = vertex1.position.x - vertex2.position.x;
    y = vertex1.position.y - vertex2.position.y;
    console.log("v1v2:",vertex1, vertex2,x,y);
    return GetAngleByCoordinates(x, y);
            
}

// float getLength(sf::Vector2f p1, sf::Vector2f p2) {//odległość między dwoma punktami w przestrzeni
// 	return sqrtf(pow(p1.x - p2.x, 2) + pow(p1.y - p2.y, 2));
// }

function getLength(vertex1, vertex2) {
	return Math.sqrt(Math.pow(vertex1.position.x - vertex2.position.x, 2) + Math.pow(vertex1.position.y - vertex2.position.y, 2));
}

function CenterGravityForce(distance) {
	return distance * distance / 5000000;
}

function VertexRepulsionForce(distance) {
    if (distance >= OPT_V_DST) {return 0;}
    force = distance - OPT_V_DST;
    return force*force / (-3000);
}

function MidEdgeOtherMidEdgeRepulsionForce(distance) {
    if (distance >= OPT_ME_OME_DST) {return 0;}
    force = distance - OPT_ME_OME_DST;
    return force * force / (-1000);
}

function MidEdges1EdgeAttractionForce(distance, optDst = OPT_ME_ME_DST) {
    force = distance - optDst;
    force  = force * force / 1000;
    if (distance < optDst) {force *= -1;}
    return Math.min(distance / 100, force);
}

function EdgeAttractionForce(distance) {
    force = distance - OPT_E_DST;
    force = force * force / 5000;
    if (distance < OPT_E_DST) {force *= -1; }
    return Math.min(distance / 100, force);
}

function MidEdgeVertexAttractionForce(distance,optDst = OPT_ME_V_DST) {
    force = distance - optDst;
    force = force * force / 1000;
    if (distance < optDst) {force *= -1; }
    return Math.min(distance / 100, force);
}

function _CalculateForces(){
    for ( let i=0; i<this.verticesNumber; i++) 
        G.vertices[i].force = {
            y: 0,
            x: 0
        };
    if(this.simulateForces) {
        let syf = {
            position: {
                x:graphCanvas.width/2,//700,
                y:graphCanvas.height/2
            } 
        };

        for ( let i=0; i<this.verticesNumber; i++) {
            let dist = getLength(syf,G.vertices[i]);
            let forceValue = CenterGravityForce(dist)*100;
            let angle = GetAngleByPoints(syf, G.vertices[i]);
            let Vector2f = {x: forceValue * Math.cos(angle), y: forceValue * Math.sin(angle)};
            G.vertices[i].force.x -= Vector2f.x;
            G.vertices[i].force.y -= Vector2f.y;
        }        
    }
}

function _ApplyForces() {
    if(this.simulateForces) {
        for ( let i=0; i<this.verticesNumber; i++) {
            G.vertices[i].position.x += G.vertices[i].force.x;
            G.vertices[i].position.y += G.vertices[i].force.y;
        }
        G.vertices.forEach(KeepInGraphArea);
    }
}
