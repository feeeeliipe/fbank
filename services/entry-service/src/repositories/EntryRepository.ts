import { DynamoConnector } from "../../../../lib/DynamoConnector";

export class EntryRepository {

    constructor(protected dynamo = new DynamoConnector().getInstance()) {

    }

    async create(input: { id: string; accountId: string, amount: number, type: string }) {
        const entry = {
            ...input,
            status: 'PENDING'
        };
        await this.dynamo.put({
            TableName: `${process.env.STAGE}-fbank-entries`,
            Item: {
                pk: `entry#${entry.id}`,
                sk: `account#${entry.accountId}`,
                type: entry.type,
                amount: entry.amount,
                status: entry.status
            }
        }).promise();
        return entry;
    }

    async updateStatus(id: string, accountId: string, newStatus: string) {
        await this.dynamo.update({
            TableName: `${process.env.STAGE}-fbank-entries`,
            Key: {
                pk: `entry#${id}`,
                sk: `account#${accountId}`,
            },
            UpdateExpression: `SET #status = :status`,
            ExpressionAttributeNames: {
                '#status': 'status',
            },
            ExpressionAttributeValues: {
                ':status': newStatus
            }
        }).promise();
    }

}