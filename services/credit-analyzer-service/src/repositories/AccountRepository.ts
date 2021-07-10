import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { DynamoConnector } from "../../../../lib/DynamoConnector";

export class AccountRepository {

    constructor(protected dynamo: DocumentClient = new DynamoConnector().getInstance()) {

    }

    async save(accountData: any) {
        await this.dynamo.put({
            TableName: `${process.env.STAGE}-fbank-credit-analyzer`,
            Item: {
                pk: `ACCOUNT#${accountData.id}`,
                sk: 'ACCOUNT',
                accountData
            }    
        }).promise();
    }

}