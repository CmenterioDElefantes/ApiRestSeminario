import BusinessSchedule from "../businessController/BusinessSchedule";
import { ISchedule, ISimpleSchedule } from "../models/Schedules";
import Controller from "./Controller";

export default class ScheduleController extends Controller<ISchedule>{
    constructor(){
        super(new BusinessSchedule(),'Schedule');
    }
}