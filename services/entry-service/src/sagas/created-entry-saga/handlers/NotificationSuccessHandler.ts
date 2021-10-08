import { EventDriveModel } from "../../../../../../lib/EventDriveModel";
import { Logger } from "../../../../../../lib/Logger";
import { SNSPublisher } from "../../../../../../lib/SNSPublisher";
import { EntryRepository } from "../../../repositories/EntryRepository";
import { ISagaEventHandler } from "../CreatedEntryHandlerFactory";

export class NotificationSuccessHandler implements ISagaEventHandler {

    private logger = new Logger('EntryService', 'NotificationSuccessHandler');

    async handle(event: EventDriveModel.NotificationSuccess): Promise<void> {
        this.logger.info('Created entry saga finished successfully!');
        this.logger.info('Here you can emit an event to credit analyzer service notifying that reserved credit was consumed');
    }

}