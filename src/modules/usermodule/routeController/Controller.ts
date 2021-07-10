import { Request, Response } from "express";
import Business from "../businessController/Business";

class Controller<IModel> {
  Business: Business<IModel>;
  Name: string;
  constructor(business: Business<IModel>,name: string) {
    this.Business = business;
    this.Name = name;
  }
  create = (request: Request, response: Response) => {
    var data = request.body;
    data["registerdate"] = new Date();
    this.Business.store(data).then((reg:IModel) => {
        response.status(201).json({ serverResponse: reg });   
    }).catch(err => {
        console.log(`Create ${this.Name} Error:`, err);
        response.status(403).json({ serverResponse: err });
    });
    
  }
  list = (request: Request, response: Response) => {
    this.Business.list(request.query.query,request.query.options).then((registers: Array<IModel>) => {
        response.status(200).json({ serverResponse: registers });
    }).catch( err => {
        console.log(`List ${this.Name} Error:`, err);
        response.status(403).json({ serverResponse: err });
    });
  }
  get = (request: Request, response: Response) => {
    let id: string = request.params.id;
    this.Business.get(id).then((reg: IModel) => {
        response.status(200).json({ serverResponse: reg });
    }).catch( err => {
        console.log(`Get ${this.Name} Error:`, err);
        response.status(300).json({ serverResponse: `El ${this.Name} no esta registrado`});
    });
  }
  update = (request: Request, response: Response) => {
    let id: string = request.params.id;
    var params = request.body;
    this.Business.update(id, params).then((reg: IModel) => {
        response.status(200).json({ serverResponse: reg });
    }).catch( err => {
        console.log(`Update ${this.Name} Error:`, err);
        response.status(300).json({ serverResponse: `El ${this.Name} no existe!`});
    });
  }
  remove = (request: Request, response: Response) => {
    let id: string = request.params.id;
    this.Business.delete(id).then((reg: IModel) => {
        response.status(200).json({ serverResponse: reg });
    }).catch( err => {
        console.log(`Delete ${this.Name} Error:`,err);
        response.status(300).json({ serverResponse: `El ${this.Name} no existe!`});
    });
  }
}
export default Controller;
