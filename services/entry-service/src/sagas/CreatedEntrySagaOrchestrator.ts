import { SQSEvent } from "aws-lambda";
import { Logger } from "../../../../lib/Logger";
import { CreatedEntryHandlerFactory } from "./CreatedEntryHandlerFactory";
import { SagaStepRepository } from '../repositories/SagaStepRepository';
import { EventDriveModel } from "../../../../lib/EventDriveModel";

class CreateEntrySagaOrchestrator {


    private steps = [
        {
            Index: 0,
            Keys: [EventDriveModel.EntryEvents.ENTRY_CREATED_V1],
        },
        {
            Index: 5,
            Keys: [EventDriveModel.CreditAnalyzerEvents.CUSTOMER_CREDIT_RESERVED_V1, EventDriveModel.CreditAnalyzerEvents.CUSTOMER_CREDIT_UNAVAILABLE_V1],
        }

    ]

    constructor(
        protected logger = new Logger('CreateEntrySagaOrchestrator'),
        protected sagaStepRepo = new SagaStepRepository(),
    ) { }

    async handleSagaStep(event: SQSEvent) {
        try {
            this.logger.info('Created Entry Saga event received', {
                eventName: 'CreatedEntrySagaEventReceived',
                event
            });
            if (!event.Records.length) {
                console.log('Empty event. Bypassing...');
                return;
            }
            const record = event.Records[0];
            const body = JSON.parse(record.body);
            const eventName = record.messageAttributes.eventName.stringValue as string;
            const handler = CreatedEntryHandlerFactory.create(eventName);
            if (handler) {
                const uniqueKey = handler.getUniqueKey(event);
                this.sagaStepRepo.addStepStart(eventName, uniqueKey, event);
                await handler.handle(body);
                this.sagaStepRepo.addStepFinish(eventName, uniqueKey, event);
            }
        } catch (error) {
            console.error(error);
            throw error;
        }

    }

}

const orchestrator = new CreateEntrySagaOrchestrator();
module.exports = {
    handleSagaStep: orchestrator.handleSagaStep.bind(orchestrator)
}