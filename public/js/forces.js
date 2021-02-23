function GetAngleByCoordinates(x, y) {
    angle = Math.atan2(-y,-x);
    if (angle < 0) 
        angle += 2*Math.PI;

    return angle;
}

function GetAngleByPoints(vertex1, vertex2) {
    //console.log("v1v2:",vertex1, vertex2);
    x = vertex1.position.x - vertex2.position.x;
    y = vertex1.position.y - vertex2.position.y;
    //console.log("v1v2:",vertex1, vertex2,x,y);
    return GetAngleByCoordinates(x, y);
            
}

// float getLength(sf::Vector2f p1, sf::Vector2f p2) {//odległość między dwoma punktami w przestrzeni
// 	return sqrtf(pow(p1.x - p2.x, 2) + pow(p1.y - p2.y, 2));
// }

function getLength(vertex1, vertex2) {
	return Math.sqrt(Math.pow(vertex1.position.x - vertex2.position.x, 2) + Math.pow(vertex1.position.y - vertex2.position.y, 2));
}

function CenterGravityForce(distance) {
    // return 0;
	return Math.pow(distance,1.5) / 10000;
}

function VertexRepulsionForce(distance) {
    if (distance >= OPT_V_DST) {return 0;}
    force = distance - OPT_V_DST;
    return force*force / (-3000);
}


function EdgeAttractionForce(distance) {
    force = distance - OPT_E_DST;
    force = force * force / 5000;
    if (distance < OPT_E_DST) {force *= -1; }
    return Math.min(distance / 100, force);
}

function MidEdgeVertexAttractionForce(distance, optDst = 50, minDist = 25) {
    force = distance - optDst;
    force = force * force / 600;
    if (distance < optDst) force *= -1 
    return Math.min(distance / 100, force);
}

// float Graph::MidEdgeVertexAttractionForce(float distance,float optDst = OPT_ME_V_DST) {
//     float force = distance - optDst;
//     force  *= force;
//     force /= 1000.f;
//     if (distance < optDst) force *= -1.f; 
//     return std::min(distance / 100.f, force);
// }

function MidEdgeOtherMidEdgeRepulsionForce(distance) {
    if (distance >= OPT_ME_OME_DST) {return 0;}
    force = distance - OPT_ME_OME_DST;
    return force * force / (-100000);
}

// function MidEdges1EdgeAttractionForce(distance, optDst = OPT_ME_ME_DST) {
//     return 0;
//     force = distance - optDst;
//     force  = force * force / 1000;
//     if (distance < optDst) {force *= -1;}
//     return Math.min(distance / 100, force);
// }

function _CalculateForces(){
    for ( let i=0; i<this.verticesNumber; i++) 
        G.vertices[i].force = {
            y: 0,
            x: 0
        };
    if(this.simulateForces) {
        let scrCenterPos = {
            position: {
                x:graphCanvas.width/2,//700,
                y:graphCanvas.height/2
            } 
        };

        for ( let i=0; i<this.verticesNumber; i++) {//GRAWITACJA NEWTONOWSKA
            let dist = getLength(scrCenterPos,G.vertices[i]);
            let forceValue = CenterGravityForce(dist);
            let angle = GetAngleByPoints(scrCenterPos, G.vertices[i]);
            let Vector2f = {x: forceValue * Math.cos(angle), y: forceValue * Math.sin(angle)};
            G.vertices[i].force.x -= Vector2f.x;
            G.vertices[i].force.y -= Vector2f.y;
        }       

        // console.log("this: ", this);
        // console.log("this.edgesNumber: ", this.edgesNumber);
        for ( let i=0; i<this.edgesNumber; i++) {//PRZYCIAGANIE NA KRAWDZIACH
            let v = G.edges[i].idVertexFrom;
            let u = G.edges[i].idVertexTo;
            let dist = getLength(G.vertices[v],G.vertices[u]);
            let forceValue = EdgeAttractionForce(dist);
            let angle = GetAngleByPoints(G.vertices[v], G.vertices[u]);
            let Vector2f = {x: forceValue * Math.cos(angle), y: forceValue * Math.sin(angle)};
            G.vertices[v].force.x += Vector2f.x;
            G.vertices[v].force.y += Vector2f.y;
            G.vertices[u].force.x -= Vector2f.x;
            G.vertices[u].force.y -= Vector2f.y;
        }
        for (let v=0; v<this.verticesNumber; v++) {//ODPYCHANIE SIE WSZYSTKICH WSZYSTKICH V
            for ( let u = v + 1; u<this.verticesNumber; u++) {
                let dist = getLength(G.vertices[v],G.vertices[u]);
                let forceValue = VertexRepulsionForce(dist);
                let angle = GetAngleByPoints(G.vertices[v], G.vertices[u]);
                let Vector2f = {x: forceValue * Math.cos(angle), y: forceValue * Math.sin(angle)};
                G.vertices[v].force.x += Vector2f.x;
                G.vertices[v].force.y += Vector2f.y;
                G.vertices[u].force.x -= Vector2f.x;
                G.vertices[u].force.y -= Vector2f.y;
            }
        }
    }

    for (let i=0; i<this.edgesNumber; i++){ // PRZYCIĄGANIE V <-> MIDEDGE <-> U
        let v = G.edges[i].idVertexFrom;
        let u = G.edges[i].idVertexTo;
        let dist1 = getLength(G.vertices[v], G.edges[i].midCirclePos);
        let dist2 = getLength(G.edges[i].midCirclePos, G.vertices[u]);
        let forceValue1 = MidEdgeVertexAttractionForce(dist1);
        let forceValue2 = MidEdgeVertexAttractionForce(dist2);
        
        let angle1 = GetAngleByPoints(G.vertices[v], G.edges[i].midCirclePos);
        let angle2 = GetAngleByPoints(G.edges[i].midCirclePos, G.vertices[u]);

        let Vector2f1 = {x: forceValue1 * Math.cos(angle1), y: forceValue1 * Math.sin(angle1)};
        let Vector2f2 = {x: forceValue2 * Math.cos(angle2), y: forceValue2 * Math.sin(angle2)};
        
        G.edges[i].midEdgeForce.x -= Vector2f1.x - Vector2f2.x;
        G.edges[i].midEdgeForce.y -= Vector2f1.y - Vector2f2.y;
    }

    for (let i=0; i<this.edgesNumber; i++){ // ODPYCHANIE MIĘDZY MIDEDGE'AMI
        for (let j=i+1; j<this.edgesNumber; j++){
            let e1 = G.edges[i];
            let e2 = G.edges[j];

            let dist = getLength(e1.midCirclePos, e2.midCirclePos);
            let forceValue = MidEdgeOtherMidEdgeRepulsionForce(dist);
            let angle = GetAngleByPoints(e1.midCirclePos, e2.midCirclePos);
            let Vector2f = {x: forceValue * Math.cos(angle), y: forceValue * Math.sin(angle)};
            // console.log("Vector2f.x: ", Vector2f.x);
            // console.log("Vector2f.y: ", Vector2f.y);
            G.edges[i].midEdgeForce.x += Vector2f.x;
            G.edges[i].midEdgeForce.y += Vector2f.y;

            G.edges[j].midEdgeForce.x -= Vector2f.x;
            G.edges[j].midEdgeForce.y -= Vector2f.y;
        }
    }
}

function _ApplyForces() {
    if(this.simulateForces) {
        for ( let i=0; i<this.verticesNumber; i++) {
            G.vertices[i].position.x += G.vertices[i].force.x;
            G.vertices[i].position.y += G.vertices[i].force.y;
        }      
    }

    for ( let i=0; i<this.edgesNumber; i++) {
        u = G.vertices[G.edges[i].idVertexFrom];
        v = G.vertices[G.edges[i].idVertexTo];           

        G.edges[i].midCirclePos.position.x += G.edges[i].midEdgeForce.x;
        G.edges[i].midCirclePos.position.y += G.edges[i].midEdgeForce.y;

        G.edges[i].midEdgeForce.x = 0;
        G.edges[i].midEdgeForce.y = 0;
    }
}
