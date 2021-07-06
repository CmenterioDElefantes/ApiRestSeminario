import { Request, Response } from "express";
import isEmpty from "is-empty";
import path from "path";
import { IClient, ISimpleClient } from "../models/Clients";
import BusinessClient from "../businessController/BusinessClient";
const client = new BusinessClient();
import sha1 from "sha1";

class ClientController {
  constructor() { }
  public async createClient(request: Request, response: Response) {
    var clientData = request.body;
    clientData["registerdate"] = new Date();
    let result = await client.addClient(clientData);
    response.status(201).json({ serverResponse: result });
  }
  public async listClients(request: Request, response: Response) {
    const result: Array<IClient> = await client.listClients(request.query);
    response.status(200).json({ serverResponse: result });
  }
  public async getClient(request: Request, response: Response) {
    let id: string = request.params.id;
    var result: IClient = await client.getClient(id);
    if (!result) {
        response.status(300).json({ serverResponse: "El usuario no existe!" });
        return;
      }
    response.status(200).json({ serverResponse: result });
  }
  public async updateClient(request: Request, response: Response) {
    let id: string = request.params.id;
    var params = request.body;
    var result = await client.updateClient(id, params);
    response.status(200).json({ serverResponse: result });
  }
  public async removeClient(request: Request, response: Response) {
    let id: string = request.params.id;
    let result = await client.deleteClient(id);
    response.status(200).json({ serverResponse: result });
  }
  
  public async uploadPhoto(request: Request, response: Response) {
    var id: string = request.params.id;
    if (!id) {
      response
        .status(300)
        .json({ serverResponse: "El id es necesario para subir una foto" });
      return;
    }
    var clientToUpdate: IClient = await client.getClient(id);
    if (!clientToUpdate) {
      response.status(300).json({ serverResponse: "El usuario no existe!" });
      return;
    }
    if (isEmpty(request.files)) {
      response
        .status(300)
        .json({ serverResponse: "No existe un archivo adjunto" });
      return;
    }
    var dir = `${__dirname}/../../../../clientPlacePhoto`;
    console.log(dir);
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
      clientToUpdate.uri_photo = "/api/getclientphoto/" + id;
      clientToUpdate.path_photo = totalpath;
      var clientResult: IClient = await clientToUpdate.save();
    }
    var simpleclient: ISimpleClient = {
      first_name: clientResult.first_name,
      last_name: clientResult.last_name,
      uri_photo: clientResult.uri_photo,
      path_photo: clientResult.path_photo,
    };
    response.status(300).json({ serverResponse: simpleclient });
  }

  public async getClientPlacePhoto(request: Request, response: Response) {
    var id: string = request.params.id;
    if (!id) {
      response
        .status(300)
        .json({ serverResponse: "Identificador no encontrado" });
      return;
    }
    var clientData: IClient = await client.getClient(id);
    if (!clientData) {
      response.status(300).json({ serverResponse: "Error " });
      return;
    }
    if (clientData.path_photo == null) {
      response.status(300).json({ serverResponse: "No existe portrait " });
      return;
    }
    response.sendFile(clientData.path_photo);
  }
}
export default ClientController;
