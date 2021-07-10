import { DynamoConnector } from "../../../../lib/DynamoConnector";
import { Account } from "../entities/Account";


export class AccountRepository {

    constructor(protected dynamo = new DynamoConnector().getInstance()) {
    
    }

    async create(account: Account) {
        await this.dynamo.put({
            TableName: `${process.env.STAGE}-fbank-accounts`,
            Item: {
                pk: `ACCOUNT#${account.id}`,
                sk: 'ACCOUNT',
                id: account.id,
                customerName: account.customerName, 
                customerWage: account.customerWage,
                password: account.password
            }       
        }).promise();
    }

    async update(params: { id: string, customerWage: number }) {
        await this.dynamo.update({
            TableName: `${process.env.STAGE}-fbank-accounts`,
            Key: {
                pk: `ACCOUNT#${params.id}`,
                sk: 'ACCOUNT'
            },
            UpdateExpression: "set customerWage = :customerWage",
            ExpressionAttributeValues: {
                ":customerWage": params.customerWage,
            }
        }).promise();
    }

    async getAccount(id: string) {
        const query = await this.dynamo.query({
            TableName: `${process.env.STAGE}-fbank-accounts`,
            KeyConditionExpression: 'pk = :pk and sk = :sk',
            ExpressionAttributeValues: {
                ':pk': `ACCOUNT#${id}`,
                ':sk': 'ACCOUNT'
            }
        }).promise();
        return query.Items?.[0];
    }

}