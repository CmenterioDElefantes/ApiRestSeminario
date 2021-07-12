import mongoose, { Schema, Document } from "mongoose";

export interface IOrderProduct {
  _id: string,
  cant_compra: number,
  nombre: string,
  precio: number,
  cant_stock: number,
}

export interface ISimpleOrder {
  client_id: string;
  user_id: string;
  products?: Array<IOrderProduct>;
  estado_pago: boolean;
  metodo_pago?: string;
  estado_pedido: string;
  fecha_entrega?: Date;
  fecha_pedido: Date;
  total_pedido?: number;
  motivo_no_pedido?: string;
}

export interface IOrder extends Document {
    client_id: string;
    user_id: string;
    products?: Array<IOrderProduct>;
    estado_pago: boolean;
    metodo_pago?: string;
    estado_pedido: string;
    fecha_entrega?: Date;
    fecha_pedido: Date;
    total_pedido?: number;
    motivo_no_pedido?: string;
}
export const OrderSchema: Schema = new Schema({
    client_id: {type: String, required: true},
    user_id: {type: String, required: true},
    products: {type: Array},
    estado_pago: {type: Boolean, default: false},
    metodo_pago: {type: String},
    estado_pedido: {type: String, required: true},
    fecha_entrega: {type: Date},
    fecha_pedido: {type: Date, default: new Date()},
    total_pedido: {type: Number},
    motivo_no_pedido: {type: String},
});
export default mongoose.model<IOrder>("order", OrderSchema);
