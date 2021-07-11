import Producto, { IProducto } from "../models/Products";
import Business from "./Business";

export default class BusinessProduct extends Business<IProducto>{
    constructor(){
        super(Producto);
    }
}