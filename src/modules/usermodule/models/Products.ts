import mongoose, { Schema, Document } from "mongoose";

export interface ISimpleProducto {
  nombre: string;
  cantidad: number;
  precio: number;
  uri_photo?: string;
  path_photo?: string;
}
export interface IProducto extends Document {
  nombre: string;
  cantidad: number;
  precio: number;
  uri_photo?: string;
  path_photo?: string;
}
export const ProductoSchema: Schema = new Schema({
  nombre: {type: String, require: true},
  cantidad: {type: Number, required: true},
  precio: {type: Number, required: true},
  uri_photo: {type: String},
  path_photo: {type: String},
});
export default mongoose.model<IProducto>("Producto", ProductoSchema);
