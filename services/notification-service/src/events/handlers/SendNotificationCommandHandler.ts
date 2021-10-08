import { EventDriveModel } from "../../../../../lib/EventDriveModel";
import { SNSPublisher } from "../../../../../lib/SNSPublisher";
import { v4 as uuid } from 'uuid';
import { Logger } from "../../../../../lib/Logger";

export class SendNotificationCommandHandler {

    async handle(event: EventDriveModel.SendNotificationCommand) {
        const snsPublisher = new SNSPublisher();
        const logger = new Logger('NotificationService', 'SendNotificationCommandHandler');
        logger.info('SendNotificationCommand received', {
            eventName: 'SendNotificationCommandPayload',
            event
        });
        if (event.amount > 50) {
            const notificationSucessEvent: EventDriveModel.NotificationSuccess = {
                entryId: event.entryId,
                notificationId: uuid(),
            }
            await snsPublisher.publish(`${process.env.NOTIFICATION_SNS}`, EventDriveModel.NotificationEvents.NOTIFICATION_SUCCESS_V1, notificationSucessEvent);
            logger.info('Notification success event published');
        } else {
            const notificationErrorEvent: EventDriveModel.NotificationError = {
                entryId: event.entryId,
                error: 'Cannot send notification'
            }
            await snsPublisher.publish(`${process.env.NOTIFICATION_SNS}`, EventDriveModel.NotificationEvents.NOTIFICATION_ERROR_V1, notificationErrorEvent);
            logger.info('Notification error event published');
        }
    }

}