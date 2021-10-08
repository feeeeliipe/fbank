import { DynamoConnector } from "../../../../lib/DynamoConnector";

export class SagaStepRepository {

    constructor() {

    }

    async addStepStart(type: string, payload: object) {
        // SAVE THAT STEP WAS INITIALIZED
    }

    async addStepFinish(type: string, payload: object) {
        // SAVE THAT STEP WAS FINISHED AND CURRENT STATE
    }

}