{
    function OnButton1Click() {
        let div2 = document.getElementById("div2");
        div2.innerHTML = "kliknięty";
        console.log("klik1");

        const graphCanvas = document.getElementById("graphCanvas");
        const ctx = graphCanvas.getContext('2d');
        
        ctx.strokeRect(100,100,50,50);
        ctx.beginPath();
        ctx.arc(100, 100, 50, 0, 2 * Math.PI);
        ctx.fill();

    }

    function ChooseAlg() { 
        const toolbarEditGraph = document.getElementById("toolbarEditGraph");
        const toolbarChooseAlg = document.getElementById("toolbarChooseAlg");
        toolbarEditGraph.style.display = "none";
        toolbarChooseAlg.style.display = "flex";
    }

    function ReturnToEdit(){
        const toolbarEditGraph = document.getElementById("toolbarEditGraph");
        const toolbarChooseAlg = document.getElementById("toolbarChooseAlg");
        toolbarEditGraph.style.display = "flex";
        toolbarChooseAlg.style.display = "none";
        console.log(toolbarChooseAlg);
    }
}