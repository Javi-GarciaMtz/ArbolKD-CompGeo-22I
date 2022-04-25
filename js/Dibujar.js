function dibujarPuntos(ctx, puntos, puntoA, mejor_vecino) {
    var trasladar = 0;
    var agrandar = 10;

    // Dibujamos todos los puntos
    var pointSize = 6; // Cambia el tamaño del punto
    for(i=0; i<puntos.length; i++) {

        ctx.font="12pt Verdana";
        ctx.fillStyle = "black";
        ctx.fillText(i.toString(), ((puntos[i].xValue + trasladar) * agrandar)+7 , ((puntos[i].yValue + trasladar) * agrandar)+7 );

        ctx.fillStyle = "#0085FF"; // Color
        ctx.beginPath(); // Iniciar trazo
        ctx.arc( (puntos[i].xValue + trasladar) * agrandar , (puntos[i].yValue + trasladar) * agrandar, pointSize, 0, Math.PI * 2, true); // Dibujar un punto usando la funcion arc
        ctx.fill(); // Terminar trazo
    }

    // Dibujamos el puntoA
    var pointSize = 6; // Cambia el tamaño del punto
    ctx.fillStyle = "#910D25"; // Color
    ctx.beginPath(); // Iniciar trazo
    ctx.arc( (puntoA.xValue + trasladar) * agrandar , (puntoA.yValue + trasladar) * agrandar, pointSize, 0, Math.PI * 2, true); // Dibujar un punto usando la funcion arc
    ctx.fill(); // Terminar trazo

    // Dibujamos el mejor vecino
    var pointSize = 6; // Cambia el tamaño del punto

    ctx.font="12pt Verdana";
    ctx.fillStyle = "black";
    ctx.fillText("Mejor vecino", ((mejor_vecino.xValue + trasladar) * agrandar)-5 , ((mejor_vecino.yValue + trasladar) * agrandar)+25 );

    ctx.fillStyle = "#0D916C"; // Color
    ctx.beginPath(); // Iniciar trazo
    ctx.arc( (mejor_vecino.xValue + trasladar) * agrandar , (mejor_vecino.yValue + trasladar) * agrandar, pointSize, 0, Math.PI * 2, true); // Dibujar un punto usando la funcion arc
    ctx.fill(); // Terminar trazo
}

function buscaLimitesY(punto) {
    var board = localStorage.getItem('board');
    board = JSON.parse(board);

    // console.log("---------------");
    // console.log(board);

    var min = 0;
    var max = 99;

    for(i=punto.yValue; i>=0; i--) {
        if(board[punto.xValue][i] == 1){
            min = i-1;
            break;
        }
    }

    for(i=punto.yValue; i<100; i++) {
        if(board[punto.xValue][i] == 1){
            max = i-1;
            break;
        }
    }

    for(i=min; i<=max; i++) {
        board[punto.xValue][i] = 1;
    }

    localStorage.setItem('board', JSON.stringify( board ));

    return [min, max];

}

function buscaLimitesX(punto) {
    var board = localStorage.getItem('board');
    board = JSON.parse(board);

    // console.log("---------------");
    // console.log(board);

    var min = 0;
    var max = 99;

    for(i=punto.xValue; i>=0; i--) {
        if(board[i][punto.yValue] == 1){
            min = i-1;
            break;
        }
    }

    for(i=punto.xValue; i<100; i++) {
        if(board[i][punto.yValue] == 1){
            max = i-1;
            break;
        }
    }

    for(i=min; i<=max; i++) {
        board[i][punto.yValue] = 1;
    }

    localStorage.setItem('board', JSON.stringify( board ));

    return [min, max];

}

function diujaLinea(ctx, puntos, paso, jsonData) {

    var trasladar = 0;
    var agrandar = 10;

    ctx.strokeStyle = "#A81015";
    ctx.lineWidth = 1;

    if(puntos[paso].num_Letter == 0) {
        // Se dibuja una linea vertical
        var arrayLim = buscaLimitesY(puntos[paso]);
        console.log(arrayLim);

        ctx.beginPath();
        ctx.moveTo( (puntos[paso].xValue + trasladar) * agrandar, (arrayLim[0]+1 + trasladar) * agrandar );
        ctx.lineTo( (puntos[paso].xValue + trasladar) * agrandar, (arrayLim[1]+1 + trasladar) * agrandar );
        ctx.stroke();

    } else {
        // Se dibuja una linea horizontal'
        var arrayLim = buscaLimitesX(puntos[paso]);
        console.log(arrayLim);

        ctx.beginPath();
        ctx.moveTo( (arrayLim[0]+1 + trasladar) * agrandar, (puntos[paso].yValue + trasladar) * agrandar );
        ctx.lineTo( (arrayLim[1]+1 + trasladar) * agrandar, (puntos[paso].yValue + trasladar) * agrandar );
        ctx.stroke();
    }

    paso++;
    localStorage.setItem('paso', paso);

}

function dibujarTodo(jsonData, paso) {

    var canvas = document.getElementById('canvasHTML');
    var puntos = jsonData['puntos'];
    var puntoA = jsonData['puntoA'];
    var mejor_vecino = jsonData['mejor_vecino'];

    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        // ctx.clearRect(0, 0, 1000, 1000);

        if(paso < puntos.length)
            diujaLinea(ctx, puntos, paso, jsonData);

    	if(paso < 1 || paso>=puntos.length)
            dibujarPuntos(ctx, puntos, puntoA, mejor_vecino);

    }

}