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
    constructor() {
        this.verteicesChanges  = [];
        this.edgesChanges      = [];
    }
    Clear() {
        this.verteicesChanges  = [];
        this.edgesChanges      = [];
    }
}
class StepList {    
    constructor(G) {
        this.G = G;
        this.Clear();
    }

    Clear() {
        this.currentStep = -2;
        this.maxStepEver = 0;
        this.forwardSteps = [];
        this.backwardSteps = [];
    }
    InitState() {
        if (this.currentStep >-2) throw 'Tried to InitState(step) another time';
        ++this.currentStep;
        forwardSteps.push(step);
    }
    AddState(step) {
        if (this.currentStep == -2) throw 'Tried to AddState(step), before InitState(step)';
        ++this.currentStep;
        forwardSteps.push(step);
    }
    AddBackwardsStep(step) {
        let bStep = {
            verticesChanges = {},
            edgesChanges = {}
        }
        step.verticesChanges.forEach((vertex)=>{
          verticesChanges.push(new VertexChange(G.vertices[vertex.id]));
        });

        step.edgesChanges.forEach((edge) => {
            edgesChanges.push(new EdgeChange(G.edges[edge.id]));
        });
        this.backwardSteps.push(bStep);
    }
    
    GoLeft() {
        if (this.currentStep <= 0) return;
        --this.currentStep;
        this.backwardSteps[this.currentStep].verticesChanges.forEach((vertex)=>{
            G.vertices[vertex.id].data1 = vertex.data1;
            G.vertices[vertex.id].data2 = vertex.data2;
            G.vertices[vertex.id].color = vertex.color;
        });

        this.backwardSteps[this.currentStep].edgesChanges.forEach((edge)=>{
            G.vertices[vertex.id].data1 = edge.data1;
            G.vertices[vertex.id].data2 = edge.data2;
            G.vertices[vertex.id].color = edge.color;
        });
    }

    GoRight() {
        if(this.currentStep + 1 >= this.forwardSteps.length) return; 
        ++this.currentStep;
        if (currentStep >= maxStepEver) {
            maxStepEver = currentStep;
            AddBackwardsStep(forwardSteps[currentStep]);
        }

        this.forwardSteps[this.currentStep].verticesChanges.forEach((vertex)=>{
            G.vertices[vertex.id].data1 = vertex.data1;
            G.vertices[vertex.id].data2 = vertex.data2;
            G.vertices[vertex.id].color = vertex.color;
        });

        this.forwardSteps[this.currentStep].edgesChanges.forEach((edge)=>{
            G.vertices[vertex.id].data1 = edge.data1;
            G.vertices[vertex.id].data2 = edge.data2;
            G.vertices[vertex.id].color = edge.color;
        });
    }

}