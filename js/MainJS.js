
function acomodar(jsonData) {
    var arrayPuntos = jsonData['puntos'];

    var puntoA = jsonData['puntoA'];
    var mejor_vecino = jsonData['mejor_vecino'];
    var i;

    for(i=0; i<arrayPuntos.length; i++)
        arrayPuntos[i].yValue = arrayPuntos[i].yValue * -1;

    puntoA.xValue = parseInt(puntoA.xValue);
    puntoA.yValue = parseInt(puntoA.yValue);

    mejor_vecino.xValue = parseInt(mejor_vecino.xValue);
    mejor_vecino.yValue = parseInt(mejor_vecino.yValue);


    puntoA.yValue = puntoA.yValue * -1;
    mejor_vecino.yValue = mejor_vecino.yValue * -1;

    var min=arrayPuntos[0].yValue;
    for(i=1; i<arrayPuntos.length; i++){
        if( arrayPuntos[i].yValue < min ) {
            min = arrayPuntos[i].yValue;
        }
    }

    if(min<0)
        min = min * -1;

    min += 10;

    puntoA.yValue = puntoA.yValue + min;
    mejor_vecino.yValue = mejor_vecino.yValue + min;

    for(i=0; i<arrayPuntos.length; i++)
        arrayPuntos[i].yValue = arrayPuntos[i].yValue + min;
}

function dibujar() {
    var jsonDatos = JSON.parse( localStorage.getItem('jsonDatos') );
    var paso = localStorage.getItem('paso');

    dibujarTodo(jsonDatos, paso);
}

function reiniciaBoard() {
    var board = [];
    for(i=0; i<100; i++) {
        var arrayTemp = [];
        for(j=0; j<100; j++) {
            arrayTemp.push(0);
        }
        board.push(arrayTemp);
    }
    // console.log(board);
    localStorage.setItem('board', JSON.stringify( board ));
}

function limpiarCanvas() {
    var canvas = document.getElementById('canvasHTML');
    localStorage.setItem('paso', 0);
    reiniciaBoard();

    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, 1000, 1000);
    }
}