function GraphToString( _graph ) {
    let str = "";
    if( _graph.isDirected ) {
        str += "1 ";
    }else
    {
        str += "0 ";
    }
    str += _graph.verticesNumber + " ";
    for( let i = 0; i < _graph.verticesNumber; i++ ) {
        str += Math.round(_graph.vertices[i].position.x) + " ";
        str += Math.round(_graph.vertices[i].position.y) + " ";
    }
    str += _graph.edgesNumber + " ";
    for( let i = 0; i < _graph.edgesNumber; i++ ) {
        str += _graph.edges[i].idVertexFrom + " ";
        str += _graph.edges[i].idVertexTo + " ";
        str += _graph.edges[i].data1 + " ";
        str += _graph.edges[i].data2 + " ";
    }
    return str;
}

function StringToGraph( _graph, str ) {
    _graph.ClearGraph();
    let strarr = str.split(' ');
    if( strarr[0] === "1" ) {
        _graph.isDirected = true;
    }else
    {
        _graph.isDirected = false;
    }
    let a = parseInt( strarr[1] );
    for( let i = 0; i < a; i++ ) {
        _graph.AddVertex({x: parseInt(strarr[2+2*i]),y: parseInt(strarr[3+2*i])});
    }
    a = parseInt( strarr[2+2*_graph.verticesNumber] );
    for( let i = 0; i < a; i++ ) {
        _graph.AddEdge( parseInt(strarr[3+2*_graph.verticesNumber+i*4]),
                        parseInt(strarr[4+2*_graph.verticesNumber+i*4]),
                        parseInt(strarr[5+2*_graph.verticesNumber+i*4]),
                        parseInt(strarr[6+2*_graph.verticesNumber+i*4]) );
    }
}

/*
function SaveGraph2( _graph ) {
    var _blob = new Blob( [ JSON.stringify(_graph.toJSON()) ], { type: "plain;charset=utf-8" } );
    var _download = window.document.createElement("a");
    _download.href = window.URL.createObjectURL(_blob);
    _download.download = "download";
    document.body.appendChild(_download);
    _download.click();
    document.body.removeChild(_download);

}
*/

function SaveGraph( _graph ) {
    var _blob = new Blob( [ GraphToString( _graph ) ], { type: "plain;charset=utf-8" } );
    var _download = window.document.createElement("a");
    _download.href = window.URL.createObjectURL(_blob);
    _download.download = "download";
    document.body.appendChild(_download);
    _download.click();
    document.body.removeChild(_download);
}

function readFile(_graph) {
    const read = new FileReader();
    read.addEventListener('load', (event) => {
        let str = event.target.result;
        StringToGraph( _graph, str );
    });
    read.readAsText(file);
}

function LoadGraph(_graph){
    readFile(_graph);
}

