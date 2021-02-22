class Vertex {
    constructor(position, id) {
      this.position = position;
      this.id = id;
      this.color = "black"; //tak można??? //raczej tak
      this.text = id.toString();
      this.data1 = 0;
      this.data2 = 0;
      this.isBeingChosen = false;
      this.force = {
          y: 0,
          x: 0
      };
      this.edges = [];
    }

    SetColor(color){
        this.color = color;
    }

    Draw(ctx){
        ctx.beginPath();
        
        ctx.fillStyle = this.color;
        ctx.arc(this.position.x, this.position.y, vertexRadius, 0, 2 * Math.PI);
        ctx.fill();

        ctx.fillStyle = "greenyellow";
        // console.log("id!" + this.id + "   chosen: " + this.isBeingChosen)

        if (this.isBeingChosen == true){
            console.log("chosen!" + this.id)
            ctx.arc(this.position.x, this.position.y, vertexRadius*0.9, 0, 2 * Math.PI);
            ctx.stroke();
        }
        let fontSize = 20;
        if (parseInt(this.id) >= 100)
            fontSize = 15;
        if (parseInt(this.id) >= 1000)
            fontSize = 12;
        
        ctx.save();
        ctx.font = `${fontSize}px Courier`;
        //ctx.fillStyle = "greenyellow";
        ctx.textAlign = "center";
        ctx.rotate(0.001);
        ctx.fillText(this.id, this.position.x, this.position.y + fontSize/3);
        ctx.restore();

    }
}
