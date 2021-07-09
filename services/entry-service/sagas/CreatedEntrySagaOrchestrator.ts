import { SQSEvent } from "aws-lambda";
import { CreatedEntryHandlerFactory } from "./CreatedEntryHandlerFactory";

export class CreateEntrySagaOrchestrator {

    constructor(protected entryId: string) { }

    async handleSagaStep(event: SQSEvent) {
        try {
            if (!event.Records.length) {
                console.log('Empty event. Bypassing...');
                return;
            }
            const record = event.Records[0];
            const body = JSON.parse(record.body);
            const eventName = record.messageAttributes.eventName.stringValue as string;
            const handler = CreatedEntryHandlerFactory.create(eventName);
            await handler.handle(body);    
        } catch (error) {
            console.error(error);
            throw error;
        }
        
    }

}