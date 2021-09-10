import { EventDriveModel } from "../../../../../lib/EventDriveModel";
import { Logger } from "../../../../../lib/Logger";
import { SNSPublisher } from "../../../../../lib/SNSPublisher";
import { EntryRepository } from "../../repositories/EntryRepository";
import { ISagaEventHandler } from "../CreatedEntryHandlerFactory";

export class CreditUnavailableHandler implements ISagaEventHandler {

    constructor(
        protected logger = new Logger('CreditUnavailableHandler'),
        protected snsPublisher = new SNSPublisher(),
        protected entryRepo = new EntryRepository()) {

    }

    getUniqueKey(event: EventDriveModel.CustomerCreditUnavailable): string {
        return `${event.accountId}-${event.entryId}`;
    }

    async handle(event: EventDriveModel.EntryCreated): Promise<void> {
        await this.entryRepo.updateStatus(event.id, event.accountId, 'REPROVED');
        const entryReproved: EventDriveModel.EntryReproved = {
            accountId: event.accountId,
            id: event.id,
            detail: 'Entry Reproved =('
        }
        await this.snsPublisher.publish(`${process.env.ENTRY_SNS}`, EventDriveModel.EntryEvents.ENTRY_APPROVED_V1, entryReproved);
        this.logger.info('Credit unavailable handler executed. Entry Reproved event published.');
    }

}