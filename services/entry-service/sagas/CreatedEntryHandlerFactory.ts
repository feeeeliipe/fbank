import { EventDriveModel } from "../../../lib/EventDriveModel";
import { CreditReservedHandler } from "./handlers/CreditReservedHandler";
import { CreditUnavailableHandler } from "./handlers/CreditUnavailableHandler";
import { EntryCreatedHandler } from "./handlers/EntryCreatedHandler";
import { PasswordValidationErrorHandler } from "./handlers/PasswordValidationErrorHandler";
import { PasswordValidationSuccessHandler } from "./handlers/PasswordValidationSuccessHandler";

export interface ISagaEventHandler {
    handle: (event: any) => Promise<void>
}

export class CreatedEntryHandlerFactory {

    static create(eventName: string): ISagaEventHandler {        
        switch (eventName) {
            case EventDriveModel.EntryEvents.ENTRY_CREATED:
                return new EntryCreatedHandler();
            case EventDriveModel.AccountEvents.PASSWORD_VALIDATION_SUCCESS:
                return new PasswordValidationSuccessHandler();
            case EventDriveModel.AccountEvents.PASSWORD_VALIDATION_ERROR:
                return new PasswordValidationErrorHandler();
            case EventDriveModel.AnalysisEvents.CREDIT_RESERVED:
                return new CreditReservedHandler();
            case EventDriveModel.AnalysisEvents.CREDIT_UNAVAILABLE:
                return new CreditUnavailableHandler();
            default:
                throw new Error("I cant handle this kind of event");    
        }
    }

}