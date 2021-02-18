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
        str += _graph.vertices[i].position.x + " ";
        str += _graph.vertices[i].position.y + " ";
    }
    str += _graph.edgesNumber + " ";
    for( let i = 0; i < _graph.edgesNumber; i++ ) {
        str += _graph.edges[i].idVertexFrom + " ";
        str += _graph.edges[i].idVertexTo + " ";
        str += _graph.edges[i].data[0] + " ";
        str += _graph.edges[i].data[1] + " ";
    }
    return str;
}

function StringToGraph( _graph, str ) {
    let strarr = str.split(' ');
    if( strarr[0] === "1" ) {
        _graph.isDirected = true;
    }else
    {
        _graph.isDirected = false;
    }
    _graph.verticesNumber = parseInt( strarr[1] );
    for( let i = 0; i < _graph.verticesNumber; i++ ) {
        str += _graph.vertices[i].position.x + " ";
        str += _graph.vertices[i].position.y + " ";
        str += _graph.vertices[i].edges.length + " ";
        for( let j = 0; j < _graph.vertices[i].edges.length; j++ ) {
            str += _graph.vertices[i].edges[j] + " ";
        }
    }
    str += _graph.edgesNumber + " ";
    for( let i = 0; i < _graph.edgesNumber; i++ ) {
        str += _graph.edges[i].idVertexFrom + " ";
        str += _graph.edges[i].idVertexTo + " ";
        str += _graph.edges[i].data[0] + " ";
        str += _graph.edges[i].data[1] + " ";
    }
    return str;
}

function SaveGraph( _graph ){

    var _filename = "file.txt";
    console.log(_graph);
    //console.log(JSON.stringify(_graph));
    console.log(JSON.stringify(_graph.toJSON()));
    
    var _blob = new Blob( [ JSON.stringify(_graph.toJSON()) ], { type: "text/plain;charset=utf-8" } );
    var _download = window.document.createElement("a");
    _download.href = window.URL.createObjectURL(_blob);
    _download.download = _filename;
    document.body.appendChild(_download);
    _download.click();
    document.body.removeChild(_download);

}

function SaveGraph2( _graph ){
    var _blob = new Blob( [ GraphToString( _graph ) ], { type: "text/plain;charset=utf-8" } );
    var _download = window.document.createElement("a");
    _download.href = window.URL.createObjectURL(_blob);
    _download.download = "download";
    document.body.appendChild(_download);
    _download.click();
    document.body.removeChild(_download);
}

function LoadGraph(){
}

