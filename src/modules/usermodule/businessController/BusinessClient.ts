import onjectDefracment from "../../../utils/objectDefracment";
import ClientModel, { IClient } from "../models/Clients";
class BusinessClient{
    constructor() {
    }
    /**
     * OverLoad
     * 
     * **/
    public async listClients(query?: any,options?: any): Promise<Array<IClient>>{
        if (query) {
            if( options ) {
                if(options.limit && !options.skip)
                    options.skip = 0;
                return ClientModel.find(onjectDefracment(query),null,onjectDefracment(options));
            }
            else
                return ClientModel.find(onjectDefracment(query));
        } else {
            let listClients: Array<IClient> = await ClientModel.find();
            return listClients;
        }
    }

    public async getClient(id: string ): Promise<IClient> {
        return ClientModel.findOne({ _id: id });
    }

    public async addClient(client: IClient): Promise<IClient> {
        try {
            let clientDB = new ClientModel(client);
            return clientDB.save();
        } catch (err) {
            Promise.reject(err);
        }
    }

    public async updateClient(id: string, client: any): Promise<IClient> {
        return ClientModel.findByIdAndUpdate({ _id: id }, { $set: client });
    }
    public async deleteClient(id: string): Promise<IClient> {
        return ClientModel.remove({ _id: id });
    }
}
export default BusinessClient;