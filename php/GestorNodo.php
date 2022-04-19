<?php

class GestorNodo {

    public function __construct() {}

    // Inserta un punto de forma recursiva
    public function inertar_Rec(Nodo $root=null, Punto &$punto, $profundidad) {
        if(is_null($root)) {
            $punto->set_Num_Letter($profundidad % 2);
            return new Nodo($punto);
        }

        $cd = $profundidad % 2;

        if($cd == 0) {
            if($punto->get_X() < $root->get_Punto()->get_X()) {
                $root->set_Izq( $this->inertar_Rec($root->get_Izq(), $punto, $profundidad+1) );
            } else {
                $root->set_Der( $this->inertar_Rec($root->get_Der(), $punto, $profundidad+1) );
            }
        } elseif($cd == 1) {
            if($punto->get_Y() < $root->get_Punto()->get_Y()) {
                $root->set_Izq( $this->inertar_Rec($root->get_Izq(), $punto, $profundidad+1) );
            } else {
                $root->set_Der( $this->inertar_Rec($root->get_Der(), $punto, $profundidad+1) );
            }
        }

        return $root;
    }

    // Insertar, donde parte todo
    function insertar(Nodo $root=null, Punto $punto) {
        return $this->inertar_Rec($root, $punto, 0);
    }

    // Imprimir el arbol en orden
    function print_In_Order($nodo) {
        if(is_null($nodo)) {
            return;
        }

        $this->print_In_Order($nodo->get_Izq());

        echo '  ('.$nodo->get_Punto()->get_X().' , '.$nodo->get_Punto()->get_Y().')  <br>';

        $this->print_In_Order($nodo->get_Der());
    }

    // Calcula la distancia entre dos puntos
    function calcula_Distancia($puntoA, $puntoB) {
        return sqrt( (pow(($puntoB->get_X() - $puntoA->get_X()), 2)) + (pow(($puntoB->get_Y() - $puntoA->get_Y()), 2)));
    }

    // Busca al vecino mas cercano en el arbol
    // El mejor vecino lo deja por referencia en $punto_Vecino, con su distancia en $distancia_Mejor
    function busca_vecino_rec($root=null, $punto, &$punto_Vecino, &$distancia_Mejor, $profundidad=0) {
        if(is_null($root)) {
            return;
        }

        // var_dump($root->get_Punto());
        if( $this->calcula_Distancia($root->get_Punto(), $punto) < $distancia_Mejor ) {
            $punto_Vecino = $root->get_Punto();
            $distancia_Mejor = $this->calcula_Distancia($root->get_Punto(), $punto);
        }

        $cd = $profundidad % 2;

        if($cd == 0) {
            if($punto->get_X() < $root->get_Punto()->get_X()) {
                return $this->busca_vecino_rec($root->get_Izq(), $punto, $punto_Vecino, $distancia_Mejor, $profundidad+1);
            }
            return $this->busca_vecino_rec($root->get_Der(), $punto, $punto_Vecino, $distancia_Mejor, $profundidad+1);

        } elseif($cd == 1) {
            if($punto->get_Y() < $root->get_Punto()->get_Y()) {
                return $this->busca_vecino_rec($root->get_Izq(), $punto, $punto_Vecino, $distancia_Mejor, $profundidad+1);
            }
            return $this->busca_vecino_rec($root->get_Der(), $punto, $punto_Vecino, $distancia_Mejor, $profundidad+1);

        }

    }

}


?>