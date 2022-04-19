<?php

class Nodo {

    private $punto;
    private $nodo_Izq;
    private $nodo_Der;

    public function __construct(Punto $p) {
        $this->punto = $p;
        $this->nodoIzq = null;
        $this->nodoDer = null;
        $this->mejorDistancia = 9999;
    }

    public function get_Punto() {
        return $this->punto;
    }

    public function get_Izq() {
        return $this->nodo_Izq;
    }

    public function get_Der() {
        return $this->nodo_Der;
    }

    public function set_Izq(Nodo $n) {
        $this->nodo_Izq = $n;
    }

    public function set_Der(Nodo $n) {
        $this->nodo_Der = $n;
    }

}

?>