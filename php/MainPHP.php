<?php

include_once 'Nodo.php';
include_once 'Punto.php';
include_once 'GestorNodo.php';

function get_Puntos_Json($puntos) {
    $arrayJson = array();
    foreach ($puntos as $punto) {
        array_push($arrayJson, $punto->get_Json_Array());
    }
    return $arrayJson;
}

if (
    isset($_POST['x1']) && is_numeric($_POST['x1']) &&
    isset($_POST['y1']) && is_numeric($_POST['y1'])
) {


    $puntoA = new Punto($_POST['x1'], $_POST['y1']);

    // $point1 = new Punto(31, 40);
    // $point2 = new Punto(42, 35);
    // $point3 = new Punto(19, 50);
    // $point4 = new Punto(10, 6);
    // $point5 = new Punto(25, 55);
    // $point6 = new Punto(57, 53);
    // $point7 = new Punto(50, 18);
    // $point8 = new Punto(17, 22);
    // $point9 = new Punto(45, 52);
    // $point10 = new Punto(6, 31);
    // $arrayPuntos = array($point1, $point2, $point3, $point4, $point5, $point6, $point7, $point8, $point9, $point10);

    $puntosAGenerar = 50;
    $minDec = 0;
    $maxDec = 9;
    $min = 0;
    $max = 50;
    $arrayPuntos = array();
    for($i=0; $i<$puntosAGenerar; $i++) {
        $randomDec = random_int( $minDec, $maxDec ) * .01;
        $random = random_int( $min, $max );
        $x = $random + $randomDec;

        $randomDec = random_int( $minDec, $maxDec ) * .01;
        $random = random_int( $min, $max );
        $y = $random + $randomDec;

        array_push($arrayPuntos, new Punto($x,  $y));
    }

    $raiz = null;
    $gestor_nodos = new GestorNodo();

    for($i=0; $i<count($arrayPuntos); $i++) {
        $raiz = $gestor_nodos->insertar($raiz, $arrayPuntos[$i]);
    }


    $mejor_vecino = new Punto(0, 0);
    $distancia = 9999;

    $gestor_nodos->busca_vecino_rec($raiz, $puntoA, $mejor_vecino, $distancia);


    $data = array(
        'success' => 1,
        'code' => 200,
        'status' => 'success',
        'puntos' => get_Puntos_Json($arrayPuntos),
        'mejor_vecino' => $mejor_vecino->get_Json_Array(),
        'distancia' => $distancia,
        'puntoA' => $puntoA->get_Json_Array()
    );

    echo json_encode( $data );

} else {
    echo json_encode(array('success' => 0));
}

?>