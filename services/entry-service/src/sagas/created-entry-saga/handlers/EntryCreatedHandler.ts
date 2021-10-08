import { EventDriveModel } from "../../../../../../lib/EventDriveModel";
import { Logger } from "../../../../../../lib/Logger";
import { SNSPublisher } from "../../../../../../lib/SNSPublisher";
import { ISagaEventHandler } from "../CreatedEntryHandlerFactory";

export class EntryCreatedHandler implements ISagaEventHandler {

    private snsPublisher = new SNSPublisher();
    private logger = new Logger('EntryService', 'EntryCreatedHandler');

    getUniqueKey(event: EventDriveModel.EntryCreated): string {
        return `${event.accountId}-${event.id}`;
    }

    async handle(event: EventDriveModel.EntryCreated): Promise<void> {
        const reserveCreditCommand: EventDriveModel.ReserveCustomerCreditCommand = {
            entryId: event.id,
            accountId: event.accountId,
            amount: event.amount,
        };
        await this.snsPublisher.publish(`${process.env.CREDIT_ANALYSIS_SNS}`, EventDriveModel.CreditAnalyzerEvents.RESERVE_CUSTOMER_CREDIT_COMMAND_V1, reserveCreditCommand);
        this.logger.info('Entry was created and reserve credit command was dispatched', {
            eventName: 'ReserveCustomerCreditCommandDispatched',
            entryId: event.id
        });
    }

}