class Graph {
    
    constructor(){
        this.edges = [];
        this.vertices = [];
        this.edgesNumber = 0;
        this.verticesNumber = 0;
        this.isDirected = false;
        this.isDirected = false;
    }

    AddVertex( position ) {
        let vertex = new Vertex( position, this.verticesNumber );
        this.vertices.push( vertex );
        this.verticesNumber++;
    }

    AddEdge( v, w, d1, d2=null ) {
        let edge = new Edge( v, w, d1, d2, this.edgesNumber );
        this.vertices[edge.idVertexFrom].edges.push(edge.id);
        if (v !== w) this.vertices[edge.idVertexTo].edges.push(edge.id);
        this.edges.push( edge );
        this.edgesNumber++;
    }

    ChangeAll( from, to ) {

        for ( let i=0; i<this.verticesNumber; i++) {
            
            for ( let j=0; j<this.vertices[i].edgesIdTo.size(); j++) {
                if (this.vertices[i].edgesIdTo[i] === from) {
                    this.vertices[i].edgesIdTo[i] = to;
                }
            }
    
            for ( let j=0; j<this.vertices[i].edgesIdFrom.size(); j++) {
                if (this.vertices[i].edgesIdFrom[i] === from) {
                    this.vertices[i].edgesIdFrom[i] = to;
                }
             }

        }
        
    }

    RemoveVertex( id ) {
        let S = [];

        for (let i = 0; i < this.vertices[id].edges.size(); i++){  
            let edgeId = this.vertices[id].edges[i];
            S.push(edgeId);
        }
    
        for ( let it = 0; it < S.length; it++) {
            RemoveEdgeFromVertex(it, this.edges[it].idVertexFrom);
            RemoveEdgeFromVertex(it, this.edges[it].idVertexTo);
        }

        // for ( let it = S.length - 1; it >= 0; it-- ) {
        //     edges.erase( allEdges.begin()+ *it );
        // }
           
        //     if (it == 0) {break;
        // }
        // for (int i=0; i < allEdges.size(); i++) {
        //     ChangeAll(allEdges[i].id, i); 
        //     allEdges[i].id = i;
        // }
    
        // for (int e: vertices.back().edgesIdFrom) allEdges[e].idVertexTo   = id;
        // for (int e: vertices.back().edgesIdTo  ) allEdges[e].idVertexFrom = id;
        
        // std::swap(vertices[id],vertices.back());
        // vertices[id].id = id;
        // vertices.pop_back();
    }

    GraphVerticesData(){
        console.log("\nVertices count: ", this.vertices.length);

        console.log("Vertices: ");
        this.vertices.forEach(console.log);
    }

    GraphEdgesData(){
        console.log("\nEdges count: ", this.edges.length);

        console.log("Edges: ");
        this.edges.forEach(console.log);
    }
}