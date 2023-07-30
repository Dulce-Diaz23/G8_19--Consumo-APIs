var UrlApiGetAll = 'http://localhost:5008/producto/getall';
var UrlApiGetOne = 'http://localhost:5008/producto/getone/:id_producto';
var UrlApiInsert = 'http://localhost:5008/producto/insertar/:id_producto';
var UrlApiUpdate = 'http://localhost:5008/producto/actualizar/:id_producto';
var UrlApiDelete = 'http://localhost:5008/producto/eliminar/:id_producto';

$(document).ready(function(){
  CargarProductos();
});

function CargarProductos(){
  $.ajax({
    url:UrlApiGetAll,
    type:'GET',
    datatype:'JSON',
    success: function(response){
      var MiItems = response;
      var Valores = '';
      for(i=0; i<MiItems.length; i++){
        Valores +=
        '<tr>'+
        '<td>'+ MiItems[i].id_producto +'</td>'+
        '<td>'+ MiItems[i].numero_factura +'</td>'+
        '<td>'+ MiItems[i].nombre_producto +'</td>'+
        '<td>'+ MiItems[i].fecha_vencimiento +'</td>'+
        '<td>'+ MiItems[i].precio +'</td>'+
        '<td>'+ MiItems[i].cantidad +'</td>'+
        '<td>'+ MiItems[i].comentario +'</td>'+
        '<td>'+'<button class="btn btn-dark" onclick="CargarProducto('+MiItems[i].id_producto+')">Editar</button></td>'+
        '<td>'+'<button class="btn btn-dark" onclick="EliminarProducto('+MiItems[i].id_producto+')">Eliminar</button></td>'+
        '</tr>'; 
        $('#DataProductos').html(Valores);
      }
    }
  });
}

function CargarProducto(p_id_producto){
  var datosProducto = {
    id_producto : p_id_producto
  };

  var datosProductojson = JSON.stringify(datosProducto);
  $.ajax({
    url : UrlApiGetOne,
    type : 'POST',
    data : datosProductojson,
    datatype : 'JSON',
    contentType : 'application/JSON',
    success : function(response){
      var MiItems = response;
        for(i=0; i < MiItems.length; i++){
          $('#IDPRODUCTO').val(MiItems[i].id_producto);
          $('#NOFACTURA').val(MiItems[i].numero_factura);
          $('#NOMBREPRODUCTO').val(MiItems[i].nombre_producto);
          $('#FECHA').val(MiItems[i].fecha_vencimiento);
          $('#PRECIO').val(MiItems[i].precio);
          $('#CANTIDAD').val(MiItems[i].cantidad);
          $('#COMENTARIO').val(MiItems[i].comentario);
          var btnactualizar = '<input class="btn btn-light" id="btnagregar" onclick="ModificarProducto('+MiItems[i].id_producto+')" value="Actualizar Producto">';
          $('#btnagregarproducto').html(btnactualizar)
          var titulo = '<h3>Actualizar Producto</h3>';
          $('#encabezado').html(titulo);
        }
    }
  });
}

function AgregarProducto(){
  var datosProducto = {
    numero_factura:$('#NOFACTURA').val(),
    id_producto:$('#IDPRODUCTO').val(),
    nombre_producto:$('#NOMBREPRODUCTO').val(),
    fecha_vencimiento:$('#FECHA').val(),
    precio:$('#PRECIO').val(),
    cantidad:$('#CANTIDAD').val(),
    comentario:$('#COMENTARIO').val(),
  };

  var datosProductojson = JSON.stringify(datosProducto);

  $.ajax({
    url : UrlApiInsert,
    type : 'POST',
    data : datosProductojson,
    datatype : 'JSON',
    contentType : 'application/JSON',
    success : function(respuesta){
      console.log(respuesta);
      AudioListener('Producto Ingresado Correctamente');
    },
    error : function(tetxError, errorThrown){
      alert('Error ' + tetxError + errorThrown);
    }
  });
  alert('Producto Ingresado Correctamente');
}

function ModificarProducto(){
  var datos = {
    numero_factura:$('#NOFACTURA').val(),
    id_producto:$('#IDPRODUCTO').val(),
    nombre_producto:$('#NOMBREPRODUCTO').val(),
    fecha_vencimiento:$('#FECHA').val(),
    precio:$('#PRECIO').val(),
    cantidad:$('#CANTIDAD').val(),
    comentario:$('#COMENTARIO').val(),
  };

  var datosjson = JSON.stringify(datos);

  $.ajax({
    url : UrlApiUpdate,
    type : 'PUT',
    data : datosjson,
    datatype : 'JSON',
    contentType : 'application/JSON',
    success : function(response){
      console.log(response);
      $('#Form1').submit();
    },
    error : function(tetxError, errorThrown){
      alert('Error ' + tetxError + errorThrown);
    }
  });
  alert('Producto Actualizado Correctamente');
}

function EliminarProducto(p_id_producto){
  var datosProducto = {
    id_producto : p_id_producto
  };

  var datosProductojson = JSON.stringify(datosProducto);
  $.ajax({
    url : UrlApiDelete,
    type : 'DELETE',
    data : datosProductojson,
    datatype : 'JSON',
    contentType : 'application/JSON',
    success : function(response){
      var eliminar = response;
      alert(eliminar);
    }
  });
  CargarProductos();
}