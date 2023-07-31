var UrlApiGetOne = 'http://localhost:5008/empresa/getone/:id_empresa';
var UrlApiGetAll = 'http://localhost:5008/empresa/getall';
var UrlApiGetInsertar = 'http://localhost:5008/empresa/insertar/:id_empresa';
var UrlApiActualizar = 'http://localhost:5008/empresa/actualizar/:id_empresa';
var UrlApiEliminar = 'http://localhost:5008/empresa/eliminar/:id_empresa';


$(document).ready(function(){
    CargarEmpresas();
});

function CargarEmpresas (){
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
                '<td>'+ MiItems[i].id_empresa +'</td>'+
                '<td>'+ MiItems[i].nombre_de_empresa +'</td>'+
                '<td>'+ MiItems[i].direccion_oficina_principal +'</td>'+
                '<td>'+ MiItems[i].email +'</td>'+
                '<td>'+ MiItems[i].fecha_fundacion +'</td>'+
                '<td>'+ MiItems[i].pais +'</td>' +
                '<td>'+ MiItems[i].rtn +'</td>' +
                '<td>'+
                '<button class="btn btn-warning " onclick="CargarEmpresa('+ MiItems[i].id_empresa +')" >Editar</button>'+
                '</td>'+
                '<td>' +
                '<button class="btn btn-danger" onclick="EliminarEmpresa(' + MiItems[i].id_empresa + ')" >Eliminar</button>' +
                '</td>' +
                '</tr>';
                $('#DataEmpresa').html(Valores);
            }
        }
    });
}

function AgregarEmpresa(){
    var datosempresa={
        id_empresa :$('#idempresa').val(),
        nombre_de_empresa : $('#nombredeempresa').val(),
        direccion_oficina_principal :$('#direccionoficinaprincipal').val(),
        email : $('#email').val(),
        fecha_fundacion : $('#fecha').val(),
        pais : $('#pais').val(),
        rtn : $('#rtn').val(),
    };

    var datosempresajson = JSON.stringify(datosempresa);
    


    $.ajax({
        url : UrlApiGetInsertar, 
        type: 'POST',
        data: datosempresajson,
        datatype : 'JSON',
        contentType: 'application/json',
        success: function(response){
            alert('Empresa Ingresado de Forma Correcta');
            $('#Miformulario').submit();
        },
        error : function(textError, errorThrow){
            alert('Error:'+ textError + errorThrow);

        }
    });

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


function CargarEmpresa(p_id_empresa){
    var datosempresa={
        id_empresa :p_id_empresa,

    };

    const inputElement0 = document.getElementById('idempresa');
    inputElement0.readOnly = true;
    const inputElement = document.getElementById('fecha');
    inputElement.type = 'text';


    var datosempresajson = JSON.stringify(datosempresa);
    $.ajax({
        url:  UrlApiGetOne,
        type: 'POST',
        data: datosempresajson,
        datatype : 'JSON',
        contentType: 'application/json',
        success : function(response){
            var MiItems = response; 
            for(i=0; i < MiItems.length; i++){
                $('#idempresa').val (MiItems[i].id_empresa );
                $('#nombredeempresa').val (MiItems[i].nombre_de_empresa);
                $('#direccionoficinaprincipal').val (MiItems[i].direccion_oficina_principal);
                $('#email').val (MiItems[i].email);
                $('#fecha').val (MiItems[i].fecha_fundacion);
                personalizar();
                $('#pais').val (MiItems[i].pais);
                $('#rtn').val (MiItems[i].rtn);
                var btnactualizar = '<input type="submit" class="btn btn-success" ' + 
                'id="btnagregar" onclick="ActualizarEmpresa('+ MiItems[i].id_empresa +')" value="Actualizar empresa" >';
                $('#btnagregarempresa').html(btnactualizar);
           
            }
        }
    });
    
}
//////////////////////////////////////////////////////////////////////
function ActualizarEmpresa(p_id_empresa) {
    
    var idEmpresa = $('#idempresa').val();
    var nombredeEmpresa = $('#nombredeempresa').val();
    var direccion_oficina_principal = $('#direccionoficinaprincipal').val();
    var email = $('#email').val();
    var fecha_fundacion = $('#fecha').val();
    var pais = $('#pais').val();
    var rtn = $('#rtn').val();


    // Crea el objeto de datos de la empresa
    var datosEmpresa = {
        id_empresa: idEmpresa,
        nombre_de_empresa: nombredeEmpresa,
        direccionoficinaprincipal: direccion_oficina_principal,
        email:email ,
        fechafundacion:  fecha_fundacion ,
        pais: pais,
        rtn:rtn

    };

    // Envia una solicitud PUT al servidor para actualizar la empresa
    $.ajax({
        url: UrlApiActualizar, // Reemplaza esto con la URL de tu API para actualizar Empresa
        type: 'PUT',
        data: JSON.stringify(datosEmpresa),
        contentType: 'application/json',
        success: function(response) {
            // Maneja la respuesta del servidor
            alert('Empresa actualizado correctamente');
            $('#Miformulario').submit();
           
        },
        error: function(xhr, textStatus, error) {
            // Maneja errores en caso de que ocurra algún problema al actualizar la empresa
            alert('Error al actualizar la empresa: ' + error);
        }
    });
}



function EliminarEmpresa(p_id_empresa) {
    // Confirma si el usuario realmente desea eliminar al empresa
    if (confirm("¿Estás seguro que deseas eliminar esta empresa?")) {
        var datosempresa = {
            id_empresa: p_id_empresa
        };
        var datosempresajson = JSON.stringify(datosempresa);
        
        $.ajax({
            url: UrlApiEliminar,
            type: 'DELETE',
            data: datosempresajson,
            datatype: 'JSON',
            contentType: 'application/json',
            success: function (response) {
                // Actualiza la lista de empresa después de eliminar
                CargarEmpresa();
            },
            error: function (xhr, textStatus, error) {
                // Maneja errores en caso de que ocurra algún problema al eliminar el empresa
                console.error("Error al eliminar al eliminar empresa: " + error);
            }
        });
    }
}

