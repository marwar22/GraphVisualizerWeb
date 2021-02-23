const algorithmList = [];
var currentAlg;
function InitAlgorithmToolbar() {    
    algorithmList.push(new Algorithm(ColorsAlg,"Kolory"));
    algorithmList.push(new Algorithm(DfsAlg,"DFSIK",false));
    algorithmList.push(new Algorithm(DfsAlg,"DFSIK_ALT",true));

    returnToEditBtn = document.createElement("a");
    returnToEditBtn.classList.add("btn");
    returnToEditBtn.onclick = ReturnToEdit;
    returnToEditBtn.innerHTML = "Powrót";
    toolbarChooseAlg.appendChild(returnToEditBtn);
}

class Algorithm {
    constructor (alg,name, forceFirstGoRight=false) {
        this.stepList = {};
        this.alg = alg;
        this.forceFirstGoRight = forceFirstGoRight;
        let algButton = document.createElement("a");
        algButton.classList.add("btn");
        algButton.onclick = () => {
            this.GBeforeAlgorithm = G.GetGraphCopy();
            GoToAlgorithm();
            this.stepList = this.alg();
            this.stepList.forceFirstGoRight = forceFirstGoRight;
            if (forceFirstGoRight){
                this.stepList.GoRight();
            }
            state = stateEnum.RUNALG;
            currentAlg = this;
        };

        console.log(algButton);
        algButton.innerHTML = name;
        toolbarChooseAlg.appendChild(algButton);
    }
    Clear() {
        this.stepList.forceFirstGoRight = false;
        while(this.stepList.currentStep > 0){
            this.stepList.GoLeft();
        }    
    }

}