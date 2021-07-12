import { Request, Response } from "express";
import BusinessProduct from "../businessController/BusinessProduct";
import { IProducto, ISimpleProducto } from "../models/Products";
import Controller from "./Controller";
import isEmpty from "is-empty";
import path from "path";
import sha1 from "sha1";

export default class ProductController extends Controller<IProducto> {
  constructor(){
    super(new BusinessProduct(), 'Product');
  }
  public async uploadPhoto(request: Request, response: Response) {
    var id: string = request.params.id;
    if (!id) {
      response
        .status(300)
        .json({ serverResponse: "El id es necesario para subir una foto" });
      return;
    }
    var productToUpdate: IProducto | undefined = await this.Business.get(id).then( product => {
        return product;
    }).catch(err => {
        console.log('update product error', err);
        return undefined;
    });
    if (!productToUpdate) {
      response.status(300).json({ serverResponse: "El producto no existe!" });
      return;
    }
    if (isEmpty(request.files)) {
      response
        .status(300)
        .json({ serverResponse: "No existe un archivo adjunto" });
      return;
    }
    var dir = `${__dirname}/../../../../productPhoto`;
    var absolutepath = path.resolve(dir);
    var files: any = request.files;
    var key: Array<string> = Object.keys(files);
    var copyDirectory = (totalpath: string, file: any) => {
      return new Promise((resolve, reject) => {
        file.mv(totalpath, (err: any, success: any) => {
          if (err) {
            resolve(false);
            return;
          }
          resolve(true);
          return;
        });
      });
    };
    for (var i = 0; i < key.length; i++) {
      var file: any = files[key[i]];
      var filehash: string = sha1(new Date().toString()).substr(0, 7);
      var newname: string = `${filehash}_${file.name}`;
      var totalpath = `${absolutepath}/${newname}`;
      await copyDirectory(totalpath, file);
      productToUpdate.uri_photo = "/api/getproductphoto/" + id;
      productToUpdate.path_photo = totalpath;
      var productResult: IProducto = await productToUpdate.save();
    }
    var simpleProduct: ISimpleProducto = {
      nombre: productResult.nombre,
      precio: productResult.precio,
      cantidad: productResult.cantidad,
      uri_photo: productResult.uri_photo,
    };
    response.status(300).json({ serverResponse: simpleProduct });
  }

  public getProductPhoto = async (request: Request, response: Response) => {
    var id: string = request.params.id;
    if (!id) {
      response
        .status(300)
        .json({ serverResponse: "Identificador no encontrado" });
      return;
    }
    var productData: IProducto | undefined = await this.Business.get(id).then( product => {
        return product;
    }).catch(err => {
        console.log('product find photo', err);
        return undefined;
    });
    if (!productData) {
      response.status(300).json({ serverResponse: "Error " });
      return;
    }
    if (productData.path_photo == null) {
      response.status(300).json({ serverResponse: "No existe portrait " });
      return;
    }
    response.sendFile(productData.path_photo);
  }
}