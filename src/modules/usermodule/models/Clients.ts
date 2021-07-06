import mongoose, { Schema, Document } from "mongoose";

export interface ISimpleClient {
  first_name: string;
  last_name: string;
  telf?: string;
  uri_photo: string;
  path_photo: string;
  in_route?: boolean;
  registerdate?: Date;
  email?: string;
  probability_client?: number;
  loc_lat?: number;
  loc_long?: number;
  regularclient?: boolean;
  zona?: string;
  calle?: string;
  tipocliente?: string;
}
export interface IClient extends Document {
  first_name: string,
  last_name: string,
  telf?: string,
  uri_photo: string,
  path_photo: string,
  in_route?: boolean,
  registerdate?: Date,
  email?: string,
  probability_client?: number,
  loc_lat?: number,
  loc_long?: number,
  regularclient?: boolean,
  zona?: string,
  calle?: string,
  tipocliente?: string,
}
const clientSchema: Schema = new Schema({
  first_name: { type: String , required: true },
  last_name: { type: String , required: true },
  telf: { type: String },
  uri_photo: { type: String },
  path_photo: { type: String },
  in_route: { type: Boolean,default: false,required: true },
  registerdate: { type: Date, required: true },
  email: { type: String },
  probability_client: { type: Number, default: 0},
  loc_lat: { type: Number},
  loc_long: { type: Number},
  regularclient: {type: Boolean, default: false },
  zona: { type: String },
  calle: { type: String },
  tipocliente: { type: String,default: 'off'},
});
export default mongoose.model<IClient>("Client", clientSchema);
