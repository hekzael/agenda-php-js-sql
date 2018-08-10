<?php
$enlace = mysql_connect('localhost', 'root', '');
if (!$enlace) {
    die('No se pudo conectar: ' . mysql_error());
}
if (!mysql_select_db('agenda')) {
    die('No se pudo seleccionar la base de datos: ' . mysql_error());
}
$operacion = (isset($_POST["operacion"]))? $_POST["operacion"] : 'fyhfh'; // isset pregunta si existe, 
$contenido = (isset($_POST["contenido"]))? $_POST["contenido"] : '';
$contenido = json_decode($contenido,true);
switch($operacion){
    case "crear":
        crear($contenido);
        break;
    case "borrar":
    break;
    case "editar":
    break;
    case "get_contactos":
        get_contactos();
        break;
}

function crear($contenido){
    $query ="INSERT INTO contactos (nombre, apellido, telefono, email, direccion) VALUES 
    ('{$contenido["nombre"]}','{$contenido["apellido"]}', '{$contenido["telefono"]}','{$contenido["email"]}','{$contenido["direccion"]}')";
    if(mysql_query($query)){
        echo "success";
    }else{
        echo "Error" .mysql_error();
    }
}
function get_contactos(){
    $result = array();
    $resultado = mysql_query("SELECT * FROM contactos");
    while($row =mysql_fetch_assoc($resultado)){ // esto devuelve un array asociativo de cada linea 
        $result[]=$row; // array de arrays asociativos !!!!
    }
    echo json_encode($result);

}

    