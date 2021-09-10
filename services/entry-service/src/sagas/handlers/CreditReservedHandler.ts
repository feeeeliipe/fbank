import { EventDriveModel } from "../../../../../lib/EventDriveModel";
import { Logger } from "../../../../../lib/Logger";
import { SNSPublisher } from "../../../../../lib/SNSPublisher";
import { EntryRepository } from "../../repositories/EntryRepository";
import { ISagaEventHandler } from "../CreatedEntryHandlerFactory";

export class CreditReservedHandler implements ISagaEventHandler {

    constructor(
        protected logger = new Logger('CreditReservedHandler'),
        protected snsPublisher = new SNSPublisher(),
        protected entryRepo = new EntryRepository(),
    ) {

    }


    getUniqueKey(event: EventDriveModel.CustomerCreditReserved): string {
        return `${event.accountId}-${event.entryId}`;
    }

    async handle(event: EventDriveModel.EntryCreated): Promise<void> {
        await this.entryRepo.updateStatus(event.id, event.accountId, 'APPROVED');
        const entryApproved: EventDriveModel.EntryApproved = {
            accountId: event.accountId,
            id: event.id
        }
        await this.snsPublisher.publish(`${process.env.ENTRY_SNS}`, EventDriveModel.EntryEvents.ENTRY_APPROVED_V1, entryApproved);
        this.logger.info('Credit reserved handler executed. Entry Approved event published.');
    }

}