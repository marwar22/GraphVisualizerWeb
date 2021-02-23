class Edge {
    constructor( v, w, d1, d2, id, G ) {
        this.id = id;
        this.idVertexFrom = v;
        this.idVertexTo = w;
        this.data1 = d1;
        this.data2 = d2;
        this.color = "greenyellow";
        this.G = G;
        this.underEdit = false;
        this.midCirclePos = null;
        this.midEdgeForce = {
            x:0,
            y:0
        };
        this.CalcMidCirlce(G.vertices[v], G.vertices[w]);
    }

    BaseDraw(ctx){
        ctx.beginPath();
        var v1 = this.G.vertices[this.idVertexFrom];
        var v2 = this.G.vertices[this.idVertexTo];

        ctx.strokeStyle = this.color;

        ctx.moveTo(v1.position.x, v1.position.y);
        ctx.lineTo(v2.position.x, v2.position.y);
        ctx.stroke();
    }

    ShowWeight(ctx){
        let fontSize = 12;
        if (parseInt(this.data1) >= 100)
            fontSize = 10;
        if (parseInt(this.data1) >= 1000)
            fontSize = 8;
        
        ctx.save();
        ctx.font = `${fontSize}px Courier`;
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.rotate(0.001);
        ctx.fillText(this.data1, this.midCirclePos.position.x, this.midCirclePos.position.y + fontSize/3);
        ctx.restore();
    }
    
    Draw(ctx){
        DrawEdge( ctx, this );

        if (DEBUG_EDGES == true){
            this.ShowMidCirlce(ctx);
        }

        if (this.underEdit){
            this.ShowMidCirlce(ctx);
        }

        this.ShowWeight(ctx);

    }

    CalcMidCirlce(v1, v2){
        var y_mid = (v1.position.y + v2.position.y) / 2;
        var x_mid = (v1.position.x + v2.position.x) / 2;
        this.midCirclePos = {
            position: {
                y: y_mid,
                x: x_mid
            }
        };
    }

    ShowMidCirlce(ctx){
        ctx.closePath();
        ctx.beginPath();

        ctx.fillStyle = "greenyellow";
        ctx.arc(this.midCirclePos.position.x, this.midCirclePos.position.y, middleVertexRadius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.fillStyle = "black";
        ctx.closePath();

        return;
    }
}
















































