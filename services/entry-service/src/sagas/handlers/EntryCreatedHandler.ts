import { EventDriveModel } from "../../../../../lib/EventDriveModel";
import { SNSPublisher } from "../../../../../lib/SNSPublisher";
import { ISagaEventHandler } from "../CreatedEntryHandlerFactory";

export class EntryCreatedHandler implements ISagaEventHandler {

    private snsPublisher = new SNSPublisher();

    getUniqueKey(event: EventDriveModel.EntryCreated): string {
        return `${event.accountId}-${event.id}`;
    }

    async handle(event: EventDriveModel.EntryCreated): Promise<void> {
        console.log('Starting EntryCreatedHandler');
        console.log('Event received', event);
        const reserveCreditCommand: EventDriveModel.ReserveCustomerCreditCommand = {
            entryId: event.id,
            accountId: event.accountId,
            amount: event.amount,
        };
        await this.snsPublisher.publish(`${process.env.CREDIT_ANALYSIS_SNS}`, EventDriveModel.CreditAnalyzerEvents.RESERVE_CUSTOMER_CREDIT_COMMAND_V1, reserveCreditCommand);
        console.log('EntryCreatedHandler finished its work');
    }

}