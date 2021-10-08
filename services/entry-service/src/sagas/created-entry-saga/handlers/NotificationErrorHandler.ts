import { EventDriveModel } from "../../../../../../lib/EventDriveModel";
import { Logger } from "../../../../../../lib/Logger";
import { ISagaEventHandler } from "../CreatedEntryHandlerFactory";

export class NotificationErrorHandler implements ISagaEventHandler {

    private logger = new Logger('EntryService', 'NotificationErrorHandler');

    async handle(event: EventDriveModel.NotificationError): Promise<void> {
        this.logger.error('Created entry saga finished with error!');

        this.logger.info('Here you can emit an event to credit analyzer service requesting credit release');
    }

}