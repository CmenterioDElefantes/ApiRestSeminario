import BusinessOrder from "../businessController/BusinessOrder";
import { IOrder } from "../models/Orders";
import Controller from "./Controller";

export default class OrderController extends Controller<IOrder> {
    constructor(){
        super(new BusinessOrder(), 'Order');
    }
}