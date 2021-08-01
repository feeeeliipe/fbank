import { EventDriveModel } from "../../../../lib/EventDriveModel";
import { AccountCreatedHandler } from "./handlers/AccountCreatedHandler";
import { AccountUpdatedHandler } from "./handlers/AccountUpdatedHandler";

export class SQSEventHandlerFactory {

    static create(eventName: string) {
        switch (eventName) {
            case EventDriveModel.AccountEvents.ACCOUNT_CREATED_V1:
                return new AccountCreatedHandler();
            case EventDriveModel.AccountEvents.ACCOUNT_UPDATED_V1:
                return new AccountUpdatedHandler();
            default:
                throw new Error(`Handler not found for event: ${eventName}`); 
        }
    }

}