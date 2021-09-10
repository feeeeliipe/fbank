import { EventDriveModel } from "../../../../../lib/EventDriveModel";
import { Logger } from "../../../../../lib/Logger";
import { SNSPublisher } from "../../../../../lib/SNSPublisher";

export class ReserveCustomerCreditCommandHandler {

    constructor(
        protected logger = new Logger('ReserveCustomerCreditCommandHandler'),
        protected snsPublisher = new SNSPublisher(),
    ) {

    }

    async handle(event: EventDriveModel.ReserveCustomerCreditCommand) {
        this.logger.info('Ok, one day i will reserve credit for this customer');
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