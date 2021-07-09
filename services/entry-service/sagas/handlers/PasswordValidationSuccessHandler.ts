import { EventDriveModel } from "../../../../lib/EventDriveModel";
import { SNSPublisher } from "../../../../lib/SNSPublisher";
import { ISagaEventHandler } from "../CreatedEntryHandlerFactory";

export class PasswordValidationSuccessHandler implements ISagaEventHandler {
    
    private snsPublisher = new SNSPublisher();

    async handle(event: EventDriveModel.PasswordValidationError): Promise<void> {
        
    }

}