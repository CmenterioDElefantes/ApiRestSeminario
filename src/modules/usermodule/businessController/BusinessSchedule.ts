import Schedules, { ISchedule } from "../models/Schedules";
import Business from "./Business";

export default class BusinessSchedule extends Business<ISchedule>{
  constructor(){
    super(Schedules);
  }
}