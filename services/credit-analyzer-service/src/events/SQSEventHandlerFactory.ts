import { EventDriveModel } from "../../../../lib/EventDriveModel";
import { AccountCreatedHandler } from "./handlers/AccountCreatedHandler";
import { AccountUpdatedHandler } from "./handlers/AccountUpdatedHandler";
import { ReserveCustomerCreditCommandHandler } from "./handlers/ReserveCustomerCreditCommandHandler";

export class SQSEventHandlerFactory {

    static create(eventName: string) {
        switch (eventName) {
            case EventDriveModel.AccountEvents.ACCOUNT_CREATED_V1:
                return new AccountCreatedHandler();
            case EventDriveModel.AccountEvents.ACCOUNT_UPDATED_V1:
                return new AccountUpdatedHandler();
            case EventDriveModel.CreditAnalyzerEvents.RESERVE_CUSTOMER_CREDIT_COMMAND_V1:
                return new ReserveCustomerCreditCommandHandler()
            default:
                throw new Error(`Handler not found for event: ${eventName}`);
        }
    }

}