import Order, { IOrder } from "../models/Orders";
import Business from "./Business";
export default class BusinessOrder extends Business<IOrder> {
    constructor(){
        super(Order);
    }
}