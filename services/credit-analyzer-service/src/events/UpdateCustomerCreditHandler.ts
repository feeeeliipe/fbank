import { Logger } from "../../../../lib/Logger";
import { SQSEventParser } from "../../../../lib/SQSEventParser";

export class UpdateCustomerCreditHandler {

    private logger = new Logger('UpdateCustomerCreditHandler');

    async handler(event: any) {
        try {
            const messages = SQSEventParser.parse(event);
            this.logger.info('Update customer credit requested', {
                eventName: 'UpdateCustomerCreditRequested',
                messages
            });
            // TODO: Recalculate customer credit and save into service database
        } catch (error) {
            this.logger.error('Error recalculating customer credit', {
                eventName: 'UpdateCustomerCreditHandlerError',
                message: error.message,
                stack: error.stack
            });
        }
    }
}

const updateCustomerCreditHandler = new UpdateCustomerCreditHandler();
module.exports = {
    handler: updateCustomerCreditHandler.handler.bind(updateCustomerCreditHandler)
}