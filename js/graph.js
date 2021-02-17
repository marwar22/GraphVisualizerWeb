class Graph {
    
    constructor(){
        this.edges = [];
        this.vertices = [];
        this.edgesNumber = 0;
        this.verticesNumber = 0;
        this.isDirected = false;
        this.CalculateForces = CalculateForces;
    }

    GraphVerticesData(){
        console.log("\nVertices count: ", this.vertices.length);

        console.log("Vertices: ");
        console.log(this.vertices);
	for( let i=0; i<this.verticesNumber;i++ ) {
	    console.log(this.vertices[i].edges.length);
	}
    }

    GraphEdgesData(){
        console.log("\nEdges count: ", this.edges.length);

        console.log("Edges: ");
        console.log(this.edges);
    }

    AddVertex( position ) {
        let vertex = new Vertex( position, this.verticesNumber );
        this.vertices.push( vertex );
        this.verticesNumber++;
    }

    AddEdge( v, w, d1, d2=null ) {
        let edge = new Edge( v, w, d1, d2, this.edgesNumber, this);
        this.vertices[edge.idVertexFrom].edges.push(edge.id);
        if (v !== w) {
	        this.vertices[edge.idVertexTo].edges.push(edge.id);
	    }
        this.edges.push( edge );
        this.edgesNumber++;
    }

    ChangeAll( from, to ) {

        for ( let i=0; i<this.verticesNumber; i++) {
            
            for ( let j=0; j<this.vertices[i].edges.length; j++) {

                if (this.vertices[i].edges[j] === from) {
		            console.log( " v: " + i + " e: " + this.vertices[i].edges[j] + " to: " + to );
                    this.vertices[i].edges[j] = to;
                }

            }

        }
        
    }

    RemoveEdgeFromVertex(id, v) {

        for (let i = 0; i < this.vertices[v].edges.length; i++) {

            if (this.vertices[v].edges[i] === id) {
                var lenV = this.vertices[v].edges.length-1;
		        [this.vertices[v].edges[i], this.vertices[v].edges[lenV] ] = [this.vertices[v].edges[lenV], this.vertices[v].edges[i]];
                this.vertices[v].edges.pop();
                break;

            }

        }

    }

    RemoveVertex( id ) {

	    console.log("usuwany: " + id );
	    this.GraphVerticesData();
	    this.GraphEdgesData();
        let S = [];

        for (let i = 0; i < this.vertices[id].edges.length; i++){  
            S.push(this.vertices[id].edges[i]);
	        console.log(S);
        }
    
        for (let it = 0; it < S.length; it++) {

            this.RemoveEdgeFromVertex(S[it], this.edges[S[it]].idVertexFrom);
            this.RemoveEdgeFromVertex(S[it], this.edges[S[it]].idVertexTo);
        }

        for (let it = S.length - 1; it >= 0; it-- ) {

            if( S[it] !== this.edges.length-1 ) {
                let tmpe1 = this.edges[this.edges.length-1];
                let tmpe2 = this.edges[S[it]];
                [ this.edges[this.edges.length-1], this.edges[S[it]] ] = [ this.edges[S[it]], this.edges[this.edges.length-1] ];
            }

            this.edges.pop();
            this.edgesNumber--;
        }
        this.GraphEdgesData();
        console.log("edgnum: "+this.edgesNumber);
        for (let i=0; i < this.edges.length; i++) {
            this.ChangeAll(this.edges[i].id, i); 
            this.edges[i].id = i;
        }
    
        for(let i = 0; i < this.vertices[this.vertices.length-1].edges.length; i++) {
            var edgeId = this.vertices[this.vertices.length-1].edges[i];
		    if( this.edges[edgeId].idVertexFrom === this.vertices.length - 1 ) {
			    this.edges[edgeId].idVertexFrom = id;
		    }

		    if( this.edges[edgeId].idVertexTo === this.vertices.length - 1 ) {
		    	this.edges[edgeId].idVertexTo = id;
		    }

        }
        

        [ this.vertices[id], this.vertices[this.vertices.length-1] ] = [ this.vertices[this.vertices.length-1], this.vertices[id] ];

        this.vertices[id].id = id;
        this.vertices.pop();

        for( ; S.length > 0; ) {
            S.pop();
        }

        this.verticesNumber--;

    }
    RemoveEdge(id) {

        this.RemoveEdgeFromVertex(id,this.edges[id].idVertexFrom);
        this.RemoveEdgeFromVertex(id,this.edges[id].idVertexTo);

        [ this.edges[id], this.edges[this.edges.length-1] ] = [ this.edges[this.edges.length-1], this.edges[id] ];

        this.edges.pop();

        for (let i = 0; i < this.vertices[this.edges[id].idVertexFrom].edges.length; i++) {

            if(this.vertices[this.edges[id].idVertexFrom].edges[i] === this.edges.length) {
            this.vertices[this.edges[id].idVertexFrom].edges[i] = id;
            break;
            }

        }

        for (let i = 0; i < this.vertices[this.edges[id].idVertexTo].edges.length; i++) {

            if(this.vertices[this.edges[id].idVertexTo].edges[i] === this.edges.length) {
            this.vertices[this.edges[id].idVertexTo].edges[i] = id;
            break;
            }

        }

        for(let i = 0; i<this.edges.length; i++) {
            this.edges[i].id = i;
        }
        
        /* tu dwa pierwsze fory byly powielone */

        this.edgesNumber--;

    }

    ClearGraph(){
        console.log("\nClearing graph!")
        this.edges = [];
        this.vertices = [];
        this.edgesNumber = 0;
        this.verticesNumber = 0;
        this.isDirected = false;
    }/*

    // Dfs(v) {
    //     this.vertices[v].data1 = 1;
    //     for(let i = 0; i < this.edgesNumber; i++) {
    //         if()
    //     }
    // }
    */
}

