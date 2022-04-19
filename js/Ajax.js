
$(document).ready(function() {
    $('#puntosform').submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: 'php/MainPHP.php',
            data: $(this).serialize(),
            success: function(response)
            {
                var jsonData = JSON.parse(response);

                if(jsonData.success == 1) {
                    limpiarCanvas();
                    console.log(jsonData);
                    acomodar(jsonData);
                    localStorage.setItem('jsonDatos', JSON.stringify( jsonData ) );
                    localStorage.setItem('paso', 0);
                    // window.alert("Ejecucion realizada correctamente. Ya se puede dibujar...");
                } else {
                    console.log(jsonData);
                    window.alert("Error con el Punto A ingresado!");
                }

            }
        });
    });
});
