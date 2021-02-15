class Edge {
    constructor( v, w, d1, d2, id, G ) {
        this.idVertexFrom = v;
        this.idVertexTo = w;
        this.data = [d1, d2];
        this.id = id;
        this.G = G;
    }

    Draw(ctx){
        ctx.beginPath();
        var v1 = this.G.vertices[this.idVertexFrom];
        var v2 = this.G.vertices[this.idVertexTo];

        ctx.moveTo(v1.position.x, v1.position.y);
        ctx.lineTo(v2.position.x, v2.position.y);
        ctx.stroke();
    }
}