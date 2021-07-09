import { Model } from "mongoose";
import onjectDefracment from "../../../utils/objectDefracment";
class Business<IModel>{
    MODEL: Model<any,{}>;
    constructor(Model: Model<any,{}>) {
        this.MODEL = Model;
    }
    /**
     * OverLoad
     * 
     * **/
    public async list(query?: any,options?: any): Promise<Array<IModel>>{
        if (query) {
            if( options ) {
                if(options.limit && !options.skip)
                    options.skip = 0;
                return this.MODEL.find(onjectDefracment(query),null,onjectDefracment(options));
            }
            else
                return this.MODEL.find(onjectDefracment(query));
        } else {
            return this.MODEL.find();
        }
    }

    public async get(id: string ): Promise<IModel> {
        return this.MODEL.findOne({ _id: id });
    }

    public async store(info: IModel): Promise<IModel> {
        try {
            let infoDB = new this.MODEL(info);
            return infoDB.save();
        } catch (err) {
            Promise.reject(err);
        }
    }

    public async update(id: string, info: any): Promise<IModel> {
        return this.MODEL.findByIdAndUpdate({ _id: id }, { $set: info });
    }
    public async delete(id: string): Promise<IModel> {
        return this.MODEL.remove({ _id: id });
    }
}
export default Business;