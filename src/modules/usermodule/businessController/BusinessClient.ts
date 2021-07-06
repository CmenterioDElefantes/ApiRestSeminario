import ClientModel, { IClient } from "../models/Clients";
class BusinessClient{
    constructor() {
    }
    /**
     * OverLoad
     * 
     * **/
    public async listClients(query?: any, skip?: number, limit?: number): Promise<Array<IClient>>{
        if (query) {
            var listClients: Array<IClient> = [];
            if( skip || limit )
                listClients = await ClientModel.find(query).skip(skip).limit(limit);
            else
                listClients = await ClientModel.find(query);
            return listClients;
        } else {
            let listClients: Array<IClient> = await ClientModel.find();
            return listClients;
        }
    }

    public async getClient(id: string ): Promise<IClient> {
        var result: IClient = await ClientModel.findOne({ _id: id });
        return result;
    }

    public async addClient(client: IClient) {
        try {
            let clientDB = new ClientModel(client);
            let result = await clientDB.save();
            return result;
        } catch (err) {
            return err;
        }
    }

    public async updateClient(id: string, client: any) {

        let result = await ClientModel.update({ _id: id }, { $set: client });
        return result;
    }
    public async deleteClient(id: string) {
        let result = await ClientModel.remove({ _id: id });
        return result;
    }
}
export default BusinessClient;