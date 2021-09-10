import { DynamoConnector } from "../../../../lib/DynamoConnector";

export class SagaStepRepository {

    constructor(protected dynamo = new DynamoConnector().getInstance()) {

    }

    async addStepStart(type: string, uniqueKey: string, payload: object) {
        await this.dynamo.put({
            TableName: `${process.env.STAGE}-fbank-entries`,
            Item: {
                pk: `sagaId#${type}#uniqueKey#${uniqueKey}`,
                sk: `status#initialized`,
                timestamp: new Date().getTime(),
                payload
            }
        }).promise();
    }

    async addStepFinish(type: string, uniqueKey: string, payload: object) {
        await this.dynamo.put({
            TableName: `${process.env.STAGE}-fbank-entries`,
            Item: {
                pk: `sagaId#${type}#uniqueKey#${uniqueKey}`,
                sk: `status#finished`,
                timestamp: new Date().getTime(),
                payload
            }
        }).promise();
    }

}