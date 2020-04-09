var Producto = require('../models/producto');
var path = require('path');


function registrar(req, res){
    
    var data = req.body;

    if(req.files){
        var imagen_path = req.files.imagen.path;
        var name = imagen_path.split('\\');
        var imagen_name = name[2];

        var producto = new Producto();
        producto.titulo = data.titulo;
        producto.descripcion = data.descripcion;
        producto.imagen = imagen_name;
        producto.precio_compra = data.precio_compra;
        producto.precio_venta = data.precio_venta;
        producto.stock = data.stock;
        producto.idcategoria = data.idcategoria;

        producto.save((err,producto_save)=>{
            if(err){
                res.status(500).send({message: 'Error en el servidor'});
            }else{
                if(producto_save){
                    res.status(200).send({producto: producto_save});
                }else{
                    res.status(403).send({message: 'No se registro el producto'}); 
                }
            }
        });
    }else{
        var producto = new Producto();
        producto.titulo = data.titulo;
        producto.descripcion = data.descripcion;
        producto.imagen = null;
        producto.precio_compra = data.precio_compra;
        producto.precio_venta = data.precio_venta;
        producto.stock = data.stock;
        producto.idcategoria = data.idcategoria;

        producto.save((err,producto_save)=>{
            if(err){
                res.status(500).send({message: 'Error en el servidor'});
            }else{
                if(producto_save){
                    res.status(200).send({producto: producto_save});
                }else{
                    res.status(403).send({message: 'No se registro el producto'}); 
                }
            }
        });
    }
    
}

function listar(req, res){
    var titulo = req.params['titulo'];

    Producto.find({ titulo: new RegExp(titulo, 'i')}, (err, productos_listado)=>{
        if(err){
            req.status(500).send({message: 'Error en el servidor'});
        }else{
            if(productos_listado){
                res.status(200).send({productos: productos_listado});
            }else{
                res.status(403).send({message: 'No existe algun registro con ese titulo'});
            }
        }
    });
}

function editar(req, res){
    var data = req.body;
    var id = req.params['id'];

    if(req.files){

        var imagen_path = req.files.imagen.path;
        var name = imagen_path.split('\\');
        var imagen_name = name[2];


        Producto.findByIdAndUpdate({_id: id},{ titulo: data.titulo,descripcion: data.descripcion,imagen: imagen_name, precio_compra: data.precio_compra,precio_venta: data.precio_venta,stock: data.stock,idcategoria: data.idcategoria }, (err, producto_edit)=>{
            if(err){
                res.status(500).send({message: 'Error en el servidor'});
            }else{
                if(producto_edit){
                    res.status(200).send({producto: producto_edit});
                }else{
                    res.status(403).send({message: 'No se pudo editar el producto'});
                }
            }
        });
    }else{
        Producto.findByIdAndUpdate({_id: id},{ titulo: data.titulo,descripcion: data.descripcion, precio_compra: data.precio_compra,precio_venta: data.precio_venta,stock: data.stock,idcategoria: data.idcategoria }, (err, producto_edit)=>{
            if(err){
                res.status(500).send({message: 'Error en el servidor'});
            }else{
                if(producto_edit){
                    res.status(200).send({producto: producto_edit});
                }else{
                    res.status(403).send({message: 'No se pudo editar el producto'});
                }
            }
        });
    }

}

function obtener_producto(req, res){
    var id = req.params['id'];

    Producto.findOne({_id: id}, (err, producto_data)=>{
        if(err){
            res.status(500).send({message:'Error en el servidor'});
        }else{
            if(producto_data){
                res.status(200).send({producto: producto_data});
            }else{
                res.status(403).send({message: 'No existe ningun registro con ese titulo'});
            }
        }
    });
}

module.exports = {
    registrar,
    listar,
    editar,
    obtener_producto,
}