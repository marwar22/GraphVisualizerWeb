class Edge {
    constructor( v, w, d1, d2, id, G ) {
        this.idVertexFrom = v;
        this.idVertexTo = w;
        this.data = [d1, d2];
        this.id = id;
        this.G = G;
        this.underEdit = false;
        this.midCirclePos = null;
    }

    Draw(ctx){
        ctx.beginPath();
        var v1 = this.G.vertices[this.idVertexFrom];
        var v2 = this.G.vertices[this.idVertexTo];

        ctx.moveTo(v1.position.x, v1.position.y);
        ctx.lineTo(v2.position.x, v2.position.y);
        ctx.stroke();

        if (this.underEdit){
            this.ShowMidCirlce(ctx, v1, v2);
        }
    }

    CalcMidCirlce(v1, v2){
        var y_mid = (v1.position.y + v2.position.y) / 2;
        var x_mid = (v1.position.x + v2.position.x) / 2;
        this.midCirclePos = {
                y: y_mid,
                x: x_mid
        };
    }

    ShowMidCirlce(ctx, v1, v2){
        this.CalcMidCirlce(v1, v2);
        ctx.closePath();
        ctx.fillStyle = "greenyellow";
        ctx.arc(this.midCirclePos.x, this.midCirclePos.y, middleVertexRadius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.fillStyle = "black";
        return;
    }
}
