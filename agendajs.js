$(function(){
    get_contactos();
    $("#agregar_Contacto").on("click", function(){
        $("#agregar_nuevo").modal().hover();
    });
    $('#guardar_nuevo').on('click',function(){
        let nombre = $('#nombre_nuevo').val();
        let apellido = $('#apellido_nuevo').val();
        let telefono = $('#telefono_nuevo').val();
        let email = $('#email_nuevo').val();
        let direccion = $('#direccion_nuevo').val();

        if(nombre == ""){
            $("#mensaje1").fadeIn();
        }else{
            $("#mensaje1").fadeOut();
            if(telefono.length <3){
                $("#mensaje2").fadeIn();
            }else{
                $("#mensaje2").fadeOut();         
            }    
        }
        let contenido = {
            nombre:nombre,
            apellido:apellido,
            telefono:telefono,
            email:email,
            direccion:direccion   
        }
        $.ajax({
            url:"api.php",
            type:"POST",
            data:{
                contenido :JSON.stringify(contenido),
                operacion:"crear"
            },
            success:function(msg){
                
                alert("Contacto agregado satisfactoriamente"); 
                get_contactos();
                $("#cerrar_modal_nuevo").click();
            },
        });   
    });
    function get_contactos(){
        $.ajax({
            url:"api.php",
            type:"POST",
            dataType: "json",
            data:{
                operacion:"get_contactos"
            },
            success:function(result){
                pintar(result); 
            }
        });
    }

    function pintar(result){
        let html = '';
        result.forEach(function(item) {
            html += `
                <div class="col-4" style="margin-bottom: 10px;">
                    <div class="card" id="mi_card${item.id}">
                        <img class="card-img-top" src="imagen/banner-web.jpg" alt="Card image cap">
                        <div class="text-center">
                            <img src="imagen/edipage.jpg" height="100px" width="100px" alt="" class="my-imagen rounded-circle">
                        </div>
                        <div class="card-body">
                        <h4 class="card-title" id="nombre_card">Nombre: ${item.nombre}</h4>
                        <h5 class="card-subtitle mb-2 text-muted" id="apellido_card">Apellido: ${item.apellido}</h5>
                        <p class="card-text" id="telefono_card">Telefono: ${item.telefono} </p>
                        <p class="card-text" id="direccion_card">Direccion: ${item.direccion} </p>
                        <p class="card-text" id="correo_card">Correo electronico: ${item.email} </p>
                        </div>
                        <div class= "card-footer text-center">
                            <a href="#"><i class="fa fa-facebook"></i></a>
                            <a href="#"><i class="fa fa-twitter"></i></a>
                            <a href="#"><i class="fa fa-youtube"></i></a>
                            <button id="${item.id}" class="btn btn-primary edit-card">Editar</button>
                            <button  id="eliminar_card_${item.id}" class="btn btn-primary">Eliminar</button>
                        </div>
                    </div>
                </div>
            `;
        });
        document.getElementById('card-container').innerHTML = html;
    };
    
});
// puedo agregar el evento al contenedor que contendra las card de manera que el event onclick 
//sera heredado a todas las card, luego puedo obtener con this cual boton fue precionado buscando su ID
// hay posivilidad de agregar el ultimo contacto agregado y solo anexarlo a el en el pintar,
// de manera de no re pintr todos los contactos 
// realtimre
