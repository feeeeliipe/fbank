import { EventDriveModel } from "../../../../lib/EventDriveModel";
import { SendNotificationCommandHandler } from "./handlers/SendNotificationCommandHandler";

export class SQSEventHandlerFactory {

    static create(eventName: string) {
        switch (eventName) {
            case EventDriveModel.NotificationEvents.SEND_ENTRY_NOTIFICATION_COMMAND_V1:
                return new SendNotificationCommandHandler();
            default:
                throw new Error(`Handler not found for event: ${eventName}`);
        }
    }

}