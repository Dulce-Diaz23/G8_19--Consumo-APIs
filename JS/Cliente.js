var UrlApiGetOne = 'http://localhost:5008/cliente/getOne/:no_cliente';
var UrlApiGetAll = 'http://localhost:5008/cliente/getAll';
var UrlApiGetInsertar = 'http://localhost:5008/cliente/insertar/';
var UrlApiActualizar = 'http://localhost:5008/cliente/actualizar/';
var UrlApiEliminar = 'http://localhost:5008/cliente/eliminar/';


$(document).ready(function(){
    CargarClientes();
});

function CargarClientes (){
    $.ajax({
        url: UrlApiGetAll,
        type:'GET',
        datatype:'JSON',
        success:function(response){
            var MiItems = response;
            var Valores ='';
            for(i=0; i < MiItems.length; i++){
                Valores +=
                '<tr>'+
                '<td>'+ MiItems[i].numero_cliente +'</td>'+
                '<td>'+ MiItems[i].nombre +'</td>'+
                '<td>'+ MiItems[i].apellido +'</td>'+
                '<td>'+ MiItems[i].rtn +'</td>'+
                '<td>'+ MiItems[i].fecha_afiliacion +'</td>'+
                '<td>'+ MiItems[i].saldo_actual +'</td>'+
                '<td>'+ MiItems[i].telefono +'</td>' +
                '<td>'+
                '<button class="btn btn-secondary " onclick="CargarCliente('+ MiItems[i].numero_cliente +')" >Editar</button>'+
                '</td>'+
                '<td>' +
                '<button class="btn btn-danger" onclick="EliminarCliente(' + MiItems[i].numero_cliente + ')" >Eliminar</button>' +
                '</td>' +
                '</tr>';
                $('#DataClientes').html(Valores);
            }
        }
    });
}

function AgregarCliente(){
    var datoscliente={
        numero_cliente :$('#numerocliente').val(),
        nombre : $('#nombrecliente').val(),
        apellido :$('#apellido').val(),
        rtn : $('#rtn').val(),
        fecha_afiliacion : $('#fecha').val(),
        saldo_actual : $('#saldoactual').val(),
        telefono : $('#telefono').val(),
    };

    var datosclientejson = JSON.stringify(datoscliente);
    //alert(datosclientejson);


    $.ajax({
        url : UrlApiGetInsertar, 
        type: 'POST',
        data: datosclientejson,
        datatype : 'JSON',
        contentType: 'application/json',
        success: function(response){
            
            $('#Miformulario').submit();
        },
        error : function(textError, errorThrow){
            alert('Error:'+ textError + errorThrow);

        }
    });

    alert('Cliente Ingresado de Forma Correcta');   

}

function personalizar(){
    const fechaInput = document.getElementById('fecha');
    
            // Obtiene el valor del campo (fecha completa en formato ISO 8601)
            const fechaCompleta = fechaInput.value;
    
            // Crea un objeto Date a partir de la fecha completa
            const fechaObjeto = new Date(fechaCompleta);
    
            // Obtiene la fecha en formato deseado (YYYY-MM-DD)
            const fechaFormateada = fechaObjeto.toISOString().split('T')[0];
    
            // Actualiza el valor del campo con la fecha formateada
            fechaInput.value = fechaFormateada;
}


function CargarCliente(p_numero_cliente){
    var datoscliente={
        numero_cliente :p_numero_cliente,

    };

    const inputElement0 = document.getElementById('numerocliente');
    inputElement0.readOnly = true;
    const inputElement = document.getElementById('fecha');
    inputElement.type = 'text';


    var datosclientejson = JSON.stringify(datoscliente);
    $.ajax({
        url:  UrlApiGetOne,
        type: 'POST',
        data: datosclientejson,
        datatype : 'JSON',
        contentType: 'application/json',
        success : function(response){
            var MiItems = response; 
            for(i=0; i < MiItems.length; i++){
                $('#numerocliente').val (MiItems[i].numero_cliente );
                $('#nombrecliente').val (MiItems[i].nombre);
                $('#apellido').val (MiItems[i].apellido);
                $('#rtn').val (MiItems[i].rtn);
                $('#fecha').val (MiItems[i].fecha_afiliacion);
                personalizar();
                $('#saldoactual').val (MiItems[i].saldo_actual);
                $('#telefono').val (MiItems[i].telefono);
                var btnactualizar = '<input type="submit" class="btn btn-success" ' + 
                'id="btnagregar" onclick="ActualizarCliente('+ MiItems[i].numero_cliente +')" value="Actualizar Cliente" >';
                $('#btnagregarcliente').html(btnactualizar);
           
            }
        }
    });
    
}

function ActualizarCliente(p_numero_cliente) {
    // Obtiene los datos del cliente del formulario
    var numeroCliente = $('#numerocliente').val();
    var nombreCliente = $('#nombrecliente').val();
    var apellidoCliente = $('#apellido').val();
    var rtnCliente = $('#rtn').val();
    var fechaCliente = $('#fecha').val();
    var saldoCliente = $('#saldoactual').val();
    var telefonoCliente = $('#telefono').val();


    // Crea el objeto de datos del cliente
    var datosCliente = {
        numero_cliente: numeroCliente,
        nombre: nombreCliente,
        apellido: apellidoCliente,
        rtn:rtnCliente ,
        fecha_afiliacion:  fechaCliente ,
        saldo_actual:saldoCliente,
        telefono:telefonoCliente

    };

    // Envia una solicitud PUT al servidor para actualizar el cliente
    $.ajax({
        url: UrlApiActualizar, // Reemplaza esto con la URL de tu API para actualizar clientes
        type: 'PUT',
        data: JSON.stringify(datosCliente),
        contentType: 'application/json',
        success: function(response) {
            // Maneja la respuesta del servidor
           
            $('#Miformulario').submit();
           
        },
        error: function(xhr, textStatus, error) {
            // Maneja errores en caso de que ocurra algún problema al actualizar el cliente
            alert('Error al actualizar el cliente: ' + error);
        }
    });
    alert('Cliente actualizado correctamente');
}



function EliminarCliente(p_numero_cliente) {
    // Confirma si el usuario realmente desea eliminar al cliente
    if (confirm("¿Estás seguro que deseas eliminar este cliente?")) {
        var datoscliente = {
            numero_cliente: p_numero_cliente
        };
        var datosclientejson = JSON.stringify(datoscliente);
        
        $.ajax({
            url: UrlApiEliminar,
            type: 'DELETE',
            data: datosclientejson,
            datatype: 'JSON',
            contentType: 'application/json',
            success: function (response) {
                // Actualiza la lista de clientes después de eliminar
                CargarClientes();
            },
            error: function (xhr, textStatus, error) {
                // Maneja errores en caso de que ocurra algún problema al eliminar el cliente
                console.error("Error al eliminar el cliente: " + error);
            }
        });
        alert('Cliente eliminado correctamente');
    }
}

