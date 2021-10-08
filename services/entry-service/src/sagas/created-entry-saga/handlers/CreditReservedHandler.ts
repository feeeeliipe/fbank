import { EventDriveModel } from "../../../../../../lib/EventDriveModel";
import { Logger } from "../../../../../../lib/Logger";
import { SNSPublisher } from "../../../../../../lib/SNSPublisher";
import { EntryRepository } from "../../../repositories/EntryRepository";
import { ISagaEventHandler } from "../CreatedEntryHandlerFactory";

export class CreditReservedHandler implements ISagaEventHandler {

    constructor(
        protected logger = new Logger('EntryService', 'CreditReservedHandler'),
        protected snsPublisher = new SNSPublisher(),
        protected entryRepo = new EntryRepository(),
    ) {

    }

    async handle(event: EventDriveModel.CustomerCreditReserved): Promise<void> {
        await this.entryRepo.updateStatus(event.entryId, event.accountId, 'APPROVED');
        const entryApproved: EventDriveModel.EntryApproved = {
            accountId: event.accountId,
            id: event.entryId,
        };
        await this.snsPublisher.publish(`${process.env.ENTRY_SNS}`, EventDriveModel.EntryEvents.ENTRY_APPROVED_V1, entryApproved);
        this.logger.info('Credit reserved handler executed. Entry Approved event published.');

        this.logger.info('Publishing send notification command event');
        const sendNotificationCommand: EventDriveModel.SendNotificationCommand = {
            entryId: event.entryId,
            amount: event.amountReserved,
            message: 'Hey, your entry was approved',
            destination: 'bla@test.com.br',
            type: 'EMAIL'
        };
        await this.snsPublisher.publish(`${process.env.NOTIFICATION_SNS}`, EventDriveModel.NotificationEvents.SEND_ENTRY_NOTIFICATION_COMMAND_V1, sendNotificationCommand);
        this.logger.info('Send notification command dispatched');
    }

}