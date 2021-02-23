class VertexChange {
    constructor(vertex) {
        this.id = vertex.id;
        this.data1 = vertex.data1;
        this.data2 = vertex.data2;
        this.color = vertex.color;
    }
}
class EdgeChange {
    constructor(edge) {
        this.id = edge.id
        this.data1 = edge.data1;
        this.data2 = edge.data2;
        this.color = edge.color;
    }
}
class Step {
    constructor(_verticesChanges,_edgesChanges) {
        this.verticesChanges  = _verticesChanges;
        this.edgesChanges      = _edgesChanges;
    }
    Clear() {
        this.verticesChanges  = [];
        this.edgesChanges     = [];
    }
}
class StepList {    
    constructor(G) {
        this.G = G;
        this.Clear();
    }

    Clear() {
        this.forceFirstGoRight = null;
        this.currentStep = 0;
        this.maxStepEver = 0;
        this.forwardSteps = [{}];
        this.backwardSteps = [];
    }

    AddStep(step) {
        this.forwardSteps.push(step);
    }
    AddBackwardStep(step) {
        let bStep = {
            verticesChanges: [],
            edgesChanges: []
        }
        step.verticesChanges.forEach((vertex)=>{
            bStep.verticesChanges.push(new VertexChange(this.G.vertices[vertex.id]));
        });

        step.edgesChanges.forEach((edge) => {
            bStep.edgesChanges.push(new EdgeChange(this.G.edges[edge.id]));
        });
        this.backwardSteps.push(bStep);
    }
    
    GoLeft() {
        if (this.currentStep <= this.forceFirstGoRight ? 1 : 0) return;
        --this.currentStep;
        this.backwardSteps[this.currentStep].verticesChanges.forEach((vertex)=>{
            this.G.vertices[vertex.id].data1 = vertex.data1;
            this.G.vertices[vertex.id].data2 = vertex.data2;
            this.G.vertices[vertex.id].color = vertex.color;
        });

        this.backwardSteps[this.currentStep].edgesChanges.forEach((edge)=>{
            this.G.edges[edge.id].data1 = edge.data1;
            this.G.edges[edge.id].data2 = edge.data2;
            this.G.edges[edge.id].color = edge.color;
        });
    }

    GoRight() {
        if(this.currentStep + 1 >= this.forwardSteps.length) return; 
        ++this.currentStep;
        if (this.currentStep > this.maxStepEver) {
            this.maxStepEver = this.currentStep;
            this.AddBackwardStep(this.forwardSteps[this.currentStep]);
        }

        this.forwardSteps[this.currentStep].verticesChanges.forEach((vertex)=>{
            this.G.vertices[vertex.id].data1 = vertex.data1;
            this.G.vertices[vertex.id].data2 = vertex.data2;
            this.G.vertices[vertex.id].color = vertex.color;
        });

        this.forwardSteps[this.currentStep].edgesChanges.forEach((edge)=>{
            this.G.edges[edge.id].data1 = edge.data1;
            this.G.edges[edge.id].data2 = edge.data2;
            this.G.edges[edge.id].color = edge.color;
        });
    }

}