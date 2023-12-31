var UrlApiGetAll ='http://localhost:5008/factura/getall'
var UrlApiGetOne ='http://localhost:5008/factura/getone/:numero_factura'
var UrlApiInsert ='http://localhost:5008/factura/insertar/:numero_factura'
var UrlApiActualizar ='http://localhost:5008/factura/actualizar/:numero_factura'
var UrlApiDelete ='http://localhost:5008/factura/eliminar/:numero_factura'


$(document).ready(function(){
     CargarFacturas();
});

function CargarFacturas(){
    $.ajax({
         url:UrlApiGetAll,
         type:'GET',
         datatype:'JSON',
         success: function(response){
             var MiItems = response;
             var Valores = '';
             for(i=0; i < MiItems.length; i++){
                 Valores +=
                 '<tr>'+
                 '<td>'+ MiItems[i].numero_factura +'</td>'+
                 '<td>'+ MiItems[i].fecha_factura +'</td>'+
                 '<td>'+ MiItems[i].codigo_cliente +'</td>'+
                 '<td>'+ MiItems[i].nombre_cliente +'</td>'+
                 '<td>'+ MiItems[i].monto_factura +'</td>'+
                 '<td>'+ MiItems[i].sucursal +'</td>'+
                 '<td>'+ MiItems[i].moneda_factura +'</td>'+
                 '<td> '+
                 '<button id="btneditar" class="btn btn-primary" onclick="CargarFactura('+ MiItems[i].numero_factura +')">Editar</button>'+
                 '</td>'+
                 '<td> '+
                 '<button class="btn btn-danger" onclick="EliminarFactura(' + MiItems[i].numero_factura + ')" >Eliminar</button>' +
                 '</td>'+
                 '</tr>';
                 $('#DataFacturas').html(Valores);
               }
          }
     });
}

function AgregarFactura(){
     var datosfactura={
         numero_factura : $('#numerofactura').val(),
         fecha_factura : $('#fechafactura').val(),
         codigo_cliente : $('#codigocliente').val(),
         nombre_cliente : $('#nombrecliente').val(),
         monto_factura : $('#montofactura').val(),
         sucursal : $('#sucursal').val(),
         moneda_factura : $('#monedafactura').val()
     };

     var datosfacturajson = JSON.stringify(datosfactura);

     $.ajax({
          url:UrlApiInsert,
          type: 'POST',
          data: datosfacturajson,
          datatype: 'JSON',
          contentType: 'application/json',
          success: function(response){
               alert('Factura Ingresada de Forma Correcta');
               $('#MiFactura').submit();
          },
          error : function(textError,errorThrown){
               alert('Error : '+textError + errorThrown);
          }
     })
}

function personalizar(){
     const fechaInput = document.getElementById('fechafactura');
     
             // Obtiene el valor del campo (fecha completa en formato ISO 8601)
             const fechaCompleta = fechaInput.value;
     
             // Crea un objeto Date a partir de la fecha completa
             const fechaObjeto = new Date(fechaCompleta);
     
             // Obtiene la fecha en formato deseado (YYYY-MM-DD)
             const fechaFormateada = fechaObjeto.toISOString().split('T')[0];
     
             // Actualiza el valor del campo con la fecha formateada
             fechaInput.value = fechaFormateada;
 }

function CargarFactura(p_numero_factura){
     var datosfactura = {
          numero_factura :p_numero_factura,
     };
     
     const inputElement0 = document.getElementById('numerofactura');
     inputElement0.readOnly = true;
     const inputElement = document.getElementById('fechafactura');
     inputElement.type = 'text';
     
     var datosfacturajson = JSON.stringify(datosfactura);

     //alert(datosfacturajson);

     $.ajax({
          url : UrlApiGetOne,
          type: 'POST',
          data: datosfacturajson,
          datatype: 'JSON',
          contentType: 'application/JSON',
          success : function(reponse){
               var MiItems = reponse;
               for(i=0; i < MiItems.length; i++){
                    $('#numerofactura').val(MiItems[i].numero_factura);
                    $('#fechafactura').val(MiItems[i].fecha_factura);
                    personalizar();
                    $('#codigocliente').val(MiItems[i].codigo_cliente);
                    $('#nombrecliente').val(MiItems[i].nombre_cliente);
                    $('#montofactura').val(MiItems[i].monto_factura);
                    $('#sucursal').val(MiItems[i].sucursal);
                    $('#monedafactura').val(MiItems[i].moneda_factura);
                    var btnactualizar='<input type="button"  class="btn btn-primary" ' +
                    'id="btnagregar" onclick="ActualizarFactura('+ MiItems[i].numero_factura +')" value="Agregar Factura">';
                    $('btnagregarfactura.').html(btnactualizar);
               }
          }
     });
}

function ActualizarFactura(numero_factura){

    var numerofactura = $('#numerofactura').val();
    var fechafactura = $('#fechafactura').val();
    var codigocliente = $('#codigocliente').val();
    var nombrecliente = $('#nombrecliente').val();
    var montofactura = $('#montofactura').val();
    var sucursal = $('#sucursal').val();
    var monedafactura= $('#monedafactura').val();
    
    var datosfactura = {
        numero_factura:numerofactura,
        fecha_factura:fechafactura,
        codigo_cliente:codigocliente,
        nombre_cliente:nombrecliente ,
        monto_factura:montofactura ,
        sucursal:sucursal,
        moneda_factura:monedafactura
     }; 
    
    $.ajax({
        url: UrlApiActualizar, 
        type: 'PUT',
        data: JSON.stringify(datosfactura),
        contentType: 'application/json',
        success: function(response) { 
              alert('Factura actualizada correctamente');
              $('#Miformulario').submit();
          },

          error: function(xhr, textStatus, error) {
            
            alert('Error al actualizar la Factura: ' + error);
        }
    });
}

function EliminarFactura(numero_factura) {
     
     if (confirm("¿Estás seguro que deseas eliminar esta Factura?")) {
         var datosFactura = {
             numero_factura: numero_factura
         };
         var datosfacturajson = JSON.stringify(datosFactura);
         
         $.ajax({
             url: UrlApiDelete,
             type: 'DELETE',
             data: datosfacturajson,
             datatype: 'JSON',
             contentType: 'application/json',
               success: function (response) {  
                 
                    CargarFacturas();
               },

               error: function (xhr, textStatus, error) {
                    console.error("Error al eliminar la Factura: " + error);
               }
         });
     }
}
