import mongoose, { Schema, Document } from "mongoose";

export interface ISimpleSchedule {
  client_id: string,
  date: Date,
  time: string,
  finished: boolean,
  reason?: string,
  registerdate?: Date,
}
export interface ISchedule extends Document {
  client_id: string,
  date: Date,
  time: string,
  finished: boolean,
  reason?: string,
  registerdate?: Date,
}
const scheduleSchema: Schema = new Schema({
  client_id: {type: String, required: true},
  date: {type: Date, required: true},
  time: {type: String, required: true},
  finished: {type: Boolean, default: false},
  reason: {type: String},
  registerdate: {type: Date, required: true},
});
export default mongoose.model<ISchedule>("Schedule", scheduleSchema);
