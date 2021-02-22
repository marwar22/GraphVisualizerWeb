const algorithmList = [];
var currentAlg;
function InitAlgorithmToolbar() {    
    algorithmList.push(new Algorithm(ColorsAlg,"Kolory"));
    algorithmList.push(new Algorithm(DfsAlg,"DFSIK"));

    returnToEditBtn = document.createElement("a");
    returnToEditBtn.classList.add("btn");
    returnToEditBtn.onclick = ReturnToEdit;
    returnToEditBtn.innerHTML = "Powrót";
    toolbarChooseAlg.appendChild(returnToEditBtn);
}

class Algorithm {
    constructor (alg,name) {
        this.stepList = {};
        this.alg = alg;
        let algButton = document.createElement("a");
        algButton.classList.add("btn");
        algButton.onclick = () => {
            GoToAlgorithm();
            this.stepList = this.alg();
            this.stepList.GoRight();
            state = stateEnum.RUNALG;
            currentAlg = this;
        };
        console.log(algButton);
        algButton.innerHTML = name;
        toolbarChooseAlg.appendChild(algButton);
    }

}