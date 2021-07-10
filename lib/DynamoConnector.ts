import { DocumentClient } from "aws-sdk/clients/dynamodb";

export class DynamoConnector {

    private dynamo: DocumentClient;

    constructor() {
        let config;
        if (process.env.IS_OFFLINE === 'true') {
            config = {
                region: 'localhost',
                endpoint: 'http://localhost:8000'
            }
        }
        if (process.env.STAGE === 'local') {
            config = {
                endpoint: 'http://localhost:4566'
            }
        }
        this.dynamo = new DocumentClient(config);
    }

    getInstance() {
        return this.dynamo;
    }


}

