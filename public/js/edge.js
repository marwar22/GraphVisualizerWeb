class Edge {
    constructor( v, w, d1, d2, id, G ) {
        this.id = id;
        this.idVertexFrom = v;
        this.idVertexTo = w;
        this.data1 = d1;
        this.data2 = d2;
        this.color = "greenyellow";;
        this.G = G;
        this.underEdit = false;
        this.midCirclePos = null;
        this.midEdgeForce = {
            x:0,
            y:0
        };
        this.CalcMidCirlce(G.vertices[v], G.vertices[w]);

        this.lastR = -1;
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
        let fontSize = 10;
        this.data1 = this.id;
        if (parseInt(this.data1) >= 100)
            fontSize = 8;
        if (parseInt(this.data1) >= 1000)
            fontSize = 6;
        
        ctx.save();
        ctx.font = `${fontSize}px Courier`;
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.rotate(0.001);
        ctx.fillText(this.data1, this.midCirclePos.position.x, this.midCirclePos.position.y + fontSize/3);
        ctx.restore();
    }


    OtherDraw(ctx){
        ctx.beginPath();

        var x1 = this.G.vertices[this.idVertexFrom].position.x;
        var y1 = this.G.vertices[this.idVertexFrom].position.y;

        var x2 = this.midCirclePos.position.x;
        var y2 = this.midCirclePos.position.y;

        var x3 = this.G.vertices[this.idVertexTo].position.x;
        var y3 = this.G.vertices[this.idVertexTo].position.y;
        
        if (x1 == x3 && y1 == y3){
            ctx.beginPath();
            let X_mid = (x1 + x2)/2;
            let Y_mid = (y1 + y2)/2;
            
            let R = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2)) / 2;
            // R *= LOOP_SCALE;

            ctx.fillStyle = this.color;
            ctx.ellipse(X_mid, Y_mid, R, R, (y2-y1)/(x1-x2), 0, 2 * Math.PI);
            ctx.stroke();
        }

        else{
            var S1 = (x1*x1 + y1*y1);
            var S2 = (x2*x2 + y2*y2);
            var S3 = (x3*x3 + y3*y3);

            var A = (x1*(y2-y3)) - (y1*(x2-x3)) + (x2*y3) - (x3*y2);
            var B = (S1*(y3-y2)) + (S2*(y1-y3)) + (S3*(y2-y1));
            var C = (S1*(x2-x3)) + (S2*(x3-x1)) + (S3*(x1-x2));
            var D = (S1*(x3*y2-x2*y3)) + (S2*(x1*y3-x3*y1)) + (S3*(x2*y1-x1*y2));


            var X_mid = -B/(2*A);
            var Y_mid = -C/(2*A);

            var t1 = B*B + C*C - 4*A*D;
            var t2 = 4*A*A;

            // console.log("A: ", A);
            // console.log("B: ", B);
            var R = Math.sqrt(t1/t2);

        
            // console.log("x1*(y2-y3) ", x1*(y2-y3));
            // console.log("- y1*(x2-x3) ", - y1*(x2-x3));
            // console.log("x2*y3 ", x2*y3);
            // console.log("-x3*y2 ", -x3*y2);
            // console.log("x1: ", x1, "  y1: ", y1);
            // console.log("x2: ", x2, "  y2: ", y2);
            // console.log("x3: ", x3, "  y3: ", y3);
            // console.log("A: ", A, "  B: ", B, "  C: ", C, "  D: ", D);
            // console.log("R: ", R, "  x: ", X_mid, "  y: ", Y_mid);


            if (R != 'Infinity' && R < 500){
                var anticlock = false;
                ctx.beginPath();
                var mAngle = - Math.acos((x2-X_mid)/R);
                var bAngle = - Math.acos((x1-X_mid)/R);
                var eAngle = - Math.acos((x3-X_mid)/R);
                if( y2 > Y_mid ) mAngle *= -1;
                if( y1 > Y_mid ) bAngle *= -1;
                if( y3 > Y_mid ) eAngle *= -1;
                if( mAngle < 0 ) mAngle += 2 * Math.PI;
                if( bAngle < 0 ) bAngle += 2 * Math.PI;
                if( eAngle < 0 ) eAngle += 2 * Math.PI;
                if( bAngle < eAngle ) {
                    if( mAngle > bAngle && mAngle < eAngle ) { anticlock = false; }
                    else { anticlock = true; }
                }else
                {
                    if( mAngle > eAngle && mAngle < bAngle ) { anticlock = true; }
                    else { anticlock = false; }
                }

                
                ctx.strokeStyle = "red";
                ctx.arc(X_mid, Y_mid, R, bAngle, eAngle, anticlock );

                ctx.stroke();
            }

            else{
                this.BaseDraw(ctx);
            }
        }


        if (DEBUG_EDGES == true){
            this.ShowMidCirlce(ctx);
        }

        if (this.underEdit){
            this.ShowMidCirlce(ctx);
        }
    }

    Draw(ctx){
        var x1 = this.G.vertices[this.idVertexFrom].position.x;
        var y1 = this.G.vertices[this.idVertexFrom].position.y;

        var x2 = this.midCirclePos.position.x;
        var y2 = this.midCirclePos.position.y;

        var x3 = this.G.vertices[this.idVertexTo].position.x;
        var y3 = this.G.vertices[this.idVertexTo].position.y;
        
        if (x1 == x3 && y1 == y3){
            ctx.beginPath();
            let X_mid = (x1 + x2)/2;
            let Y_mid = (y1 + y2)/2;
            
            let R = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2)) / 2;
            // R *= LOOP_SCALE;

            ctx.fillStyle = this.color;
            var alpha = 50 / Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2));
            ctx.moveTo(x1, y1);
            //ctx.bezierCurveTo( 2*x2-(x1+x3)/2, 2*y2-(y1+y3)/2, x3, y3);
            ctx.bezierCurveTo( 2*x2-(x1+x3)/2-alpha*(y2-y1), 2*y2-(y1+y3)/2-alpha*(x1-x2), 2*x2-(x1+x3)/2+alpha*(y2-y1), 2*y2-(y1+y3)/2+alpha*(x1-x2), x3, y3);
            ctx.stroke();
        }

        else{
            //var alpha = 1;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            //ctx.bezierCurveTo( 2*x2-(x1+x3)/2-alpha*(x3-x1), 2*y2-(y1+y3)/2-alpha*(y3-y1), 2*x2-(x1+x3)/2+alpha*(x3-x1), 2*y2-(y1+y3)/2+alpha*(y3-y1), x3, y3);
            ctx.quadraticCurveTo( 2*x2-(x1+x3)/2, 2*y2-(y1+y3)/2, x3, y3);
            ctx.stroke();
        }

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
        console.log("mid_y: ", y_mid, "  mid_x: ", x_mid);
    }

    ShowMidCirlce(ctx){
        ctx.closePath();
        ctx.beginPath();

        ctx.fillStyle = "greenyellow";
        //console.log("mid_y: ", this.midCirclePos.position.y, "  mid_x: ", this.midCirclePos.position.x);

        ctx.arc(this.midCirclePos.position.x, this.midCirclePos.position.y, middleVertexRadius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.fillStyle = "black";
        ctx.closePath();

        var B = S1*(y3-y2) + S2*(y1-y3) + S3*(y2-y1);
        var C = S1*(x2-x3) + S2*(x3-x1) + S3*(x1-x2);
        var D = S1*(x3*y2-x2*y3) + S2*(x1*y3-x3*y1) + S3*(x2*y1-x1*y2);


        var X_mid = -B/2*A;
        var Y_mid = -C/2*A;

        var t1 = B*B + C*C - 4*A*D;
        var t2 = 4*A*A;

        // console.log("A: ", A);
        // console.log("B: ", B);
        var R = Math.sqrt(t1/t2);

        console.log("x1: ", x1, "  y1: ", y1);
        console.log("x2: ", x2, "  y2: ", y2);
        console.log("x3: ", x3, "  y3: ", y3);
        console.log("A: ", A, "  B: ", B, "  C: ", C, "  D: ", D);

        if (R != 'Infinity' && R < 3000){
            console.log("R: ", R, "  x: ", X_mid, "  y: ", Y_mid);

            ctx.beginPath();

            ctx.fillStyle = this.color;
            ctx.arc(X_mid, Y_mid, R, 0, 2 * Math.PI);
            ctx.fill();
        }

        else{
            this.BaseDraw(ctx);
        }


        if (DEBUG_EDGES == true){
            this.ShowMidCirlce(ctx);
        }

        if (this.underEdit){
            this.ShowMidCirlce(ctx);
        }
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
        //console.log("mid_y: ", this.midCirclePos.position.y, "  mid_x: ", this.midCirclePos.position.x);

        ctx.arc(this.midCirclePos.position.x, this.midCirclePos.position.y, middleVertexRadius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.fillStyle = "black";
        ctx.closePath();

        return;
    }
}
















































