import { EventDriveModel } from "../../../../lib/EventDriveModel";
import { SNSPublisher } from "../../../../lib/SNSPublisher";
import { ISagaEventHandler } from "../CreatedEntryHandlerFactory";

export class EntryCreatedHandler implements ISagaEventHandler {
    
    private snsPublisher = new SNSPublisher();

    async handle(event: EventDriveModel.EntryCreated): Promise<void> {
        console.log('Starting EntryCreatedHandler');
        console.log('Event received', event);
        const passwordValidationEvent: EventDriveModel.PasswordValidationRequested = {
            accountId: event.accountId,
            password: ''
        };
        await this.snsPublisher.publish(`${process.env.ACCOUNT_SNS}`, EventDriveModel.AccountEvents.PASSWORD_VALIDATION_REQUESTED, passwordValidationEvent);
        console.log('EntryCreatedHandler finished its work');
    }

}