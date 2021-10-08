import { EventDriveModel } from "../../../../../lib/EventDriveModel";
import { CreditReservedHandler } from "./handlers/CreditReservedHandler";
import { CreditUnavailableHandler } from "./handlers/CreditUnavailableHandler";
import { EntryCreatedHandler } from "./handlers/EntryCreatedHandler";
import { NotificationErrorHandler } from "./handlers/NotificationErrorHandler";
import { NotificationSuccessHandler } from "./handlers/NotificationSuccessHandler";

export interface ISagaEventHandler {
    handle: (event: any) => Promise<void>
}

export class CreatedEntryHandlerFactory {

    static create(eventName: string): ISagaEventHandler {
        switch (eventName) {
            case EventDriveModel.EntryEvents.ENTRY_CREATED_V1:
                return new EntryCreatedHandler();
            case EventDriveModel.CreditAnalyzerEvents.CUSTOMER_CREDIT_RESERVED_V1:
                return new CreditReservedHandler();
            case EventDriveModel.CreditAnalyzerEvents.CUSTOMER_CREDIT_UNAVAILABLE_V1:
                return new CreditUnavailableHandler();
            case EventDriveModel.NotificationEvents.NOTIFICATION_SUCCESS_V1:
                return new NotificationSuccessHandler();
            case EventDriveModel.NotificationEvents.NOTIFICATION_ERROR_V1:
                return new NotificationErrorHandler();
            default:
                throw new Error("I cant handle this kind of event");
        }
    }

}