import { SQSEvent } from "aws-lambda";
import { Logger } from "../../../../../lib/Logger";
import { CreatedEntryHandlerFactory } from "./CreatedEntryHandlerFactory";
import { SagaStepRepository } from '../../repositories/SagaStepRepository';

class CreateEntrySagaOrchestrator {

    constructor(
        protected logger = new Logger('EntryService', 'CreateEntrySagaOrchestrator'),
        protected sagaStepRepo = new SagaStepRepository(),
    ) { }

    async handleSagaStep(event: SQSEvent) {
        try {
            if (!event.Records.length) {
                console.log('Empty event. Bypassing...');
                return;
            }
            const record = event.Records[0];
            const body = JSON.parse(record.body);
            const eventName = record.messageAttributes.eventName.stringValue as string;
            const message = JSON.parse(body.Message);
            this.logger.info('Created Entry Saga event received', {
                eventName: 'CreatedEntrySagaEventReceived',
                receviedEventName: eventName,
                message
            });
            const handler = CreatedEntryHandlerFactory.create(eventName);
            if (handler) {
                this.sagaStepRepo.addStepStart(eventName, event);
                await handler.handle(message);
                this.sagaStepRepo.addStepFinish(eventName, event);
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