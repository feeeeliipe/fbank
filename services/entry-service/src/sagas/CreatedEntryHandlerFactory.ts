import { EventDriveModel } from "../../../../lib/EventDriveModel";
import { CreditReservedHandler } from "./handlers/CreditReservedHandler";
import { CreditUnavailableHandler } from "./handlers/CreditUnavailableHandler";
import { EntryCreatedHandler } from "./handlers/EntryCreatedHandler";

export interface ISagaEventHandler {
    getUniqueKey: (event: any) => string;
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
            default:
                throw new Error("I cant handle this kind of event");
        }
    }

}