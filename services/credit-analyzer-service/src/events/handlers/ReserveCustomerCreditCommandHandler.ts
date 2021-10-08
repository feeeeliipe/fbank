import { EventDriveModel } from "../../../../../lib/EventDriveModel";
import { Logger } from "../../../../../lib/Logger";
import { SNSPublisher } from "../../../../../lib/SNSPublisher";

export class ReserveCustomerCreditCommandHandler {

    constructor(
        protected logger = new Logger('CreditAnalyzerService', 'ReserveCustomerCreditCommandHandler'),
        protected snsPublisher = new SNSPublisher(),
    ) {

    }

    async handle(event: EventDriveModel.ReserveCustomerCreditCommand) {
        this.logger.info('Reserve customer credit requested', {
            eventName: 'ReserveCustomerCreditRequested',
            event
        });
        if (event.amount > 100) {
            const creditUnavailableEvent: EventDriveModel.CustomerCreditUnavailable = {
                accountId: event.accountId,
                entryId: event.entryId,
                message: 'Insufficient balance'
            };
            await this.snsPublisher.publish(`${process.env.CREDIT_ANALYSIS_SNS}`, EventDriveModel.CreditAnalyzerEvents.CUSTOMER_CREDIT_UNAVAILABLE_V1, creditUnavailableEvent);
            this.logger.info('Costumer credit unavailable event published');
        } else {
            const reservedCreditEvent: EventDriveModel.CustomerCreditReserved = {
                accountId: event.accountId,
                amountReserved: event.amount,
                entryId: event.entryId,
                newBalance: 0,
                previousBalance: 0
            };
            await this.snsPublisher.publish(`${process.env.CREDIT_ANALYSIS_SNS}`, EventDriveModel.CreditAnalyzerEvents.CUSTOMER_CREDIT_RESERVED_V1, reservedCreditEvent);
            this.logger.info('Costumer credit reserved event published');
        }    
    }

}