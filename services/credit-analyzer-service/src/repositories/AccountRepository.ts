import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { DynamoConnector } from "../../../../lib/DynamoConnector";
import { EventDriveModel } from "../../../../lib/EventDriveModel";

export class AccountRepository {

    constructor(protected dynamo: DocumentClient = new DynamoConnector().getInstance()) {

    }

    async get(accountId: string) {
        const queryResult = await this.dynamo.query({
            TableName: `${process.env.STAGE}-fbank-credit-analyzer`,
            KeyConditionExpression: 'pk = :pk AND sk = :sk',
            ExpressionAttributeValues: {
                ':pk': `ACCOUNT#${accountId}`,
                ':sk': 'ACCOUNT'
            }
        }).promise();
        if (!queryResult.Items?.[0]) {
            throw new Error(`Account ${accountId} not found`);
        }
        return queryResult.Items[0];
    }

    async save(accountData: EventDriveModel.AccountCreatedEvent) {
        await this.dynamo.put({
            TableName: `${process.env.STAGE}-fbank-credit-analyzer`,
            Item: {
                pk: `ACCOUNT#${accountData.id}`,
                sk: 'ACCOUNT',
                customerName: accountData.customerName,
                customerWage: accountData.customerWage
            }
        }).promise();
    }

    async update(accountId: string, params: any) {
        const keys = Object.keys(params);
        const updateExpression = `SET ${keys.map(key => `${key} = :${key}`).join(',')}`;
        let expressionAttributeValues: any = {};
        for (const key of keys) {
            expressionAttributeValues[`:${key}`] = params[key];
        }
        await this.dynamo.update({
            TableName: `${process.env.STAGE}-fbank-credit-analyzer`,
            Key: {
                pk: `ACCOUNT#${accountId}`,
                sk: 'ACCOUNT',
            },
            UpdateExpression: updateExpression,
            ExpressionAttributeValues: expressionAttributeValues,
        }).promise();
    }

}