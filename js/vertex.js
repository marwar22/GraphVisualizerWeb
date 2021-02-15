class Vertex {
    constructor(position, id) {
      this.position = position;
      this.id = id;
      this.color = "white"; //tak można??? //raczej tak
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
        ctx.arc(this.position.x, this.position.y, vertexRadius, 0, 2 * Math.PI);
        ctx.fill();
    }
}