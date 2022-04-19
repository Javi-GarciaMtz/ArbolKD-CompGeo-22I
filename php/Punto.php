<?php

class Punto {

    private $x;
    private $y;
    private $num_letter;

    public function __construct($x, $y) {
        $this->x = $x;
        $this->y = $y;
        $this->num_letter = null;
    }

    public function get_X() {
        return $this->x;
    }

    public function set_X($x) {
        $this->x = $x;
    }

    public function get_Y() {
        return $this->y;
    }

    public function setY($y) {
        $this->y = $y;
    }

    public function get_Num_Letter() {
        return $this->num_letter;
    }

    public function set_Num_Letter($num_letter) {
        $this->num_letter = $num_letter;
    }

    public function get_Json_Array() {
        $point_json = array(
            'xValue' => $this->x,
            'yValue' => $this->y,
            'num_Letter' => $this->num_letter
        );
        return $point_json;
    }

}

?>