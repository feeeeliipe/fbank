import { EventDriveModel } from "../../../../lib/EventDriveModel";
import { SNSPublisher } from "../../../../lib/SNSPublisher";
import { ISagaEventHandler } from "../CreatedEntryHandlerFactory";

export class CreditReservedHandler implements ISagaEventHandler {
    
    private snsPublisher = new SNSPublisher();

    async handle(event: EventDriveModel.EntryCreated): Promise<void> {
        
    }

}