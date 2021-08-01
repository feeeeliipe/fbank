import { SQSEvent } from "aws-lambda";
import { Logger } from "../../../../lib/Logger";
import { SQSEventParser } from "../../../../lib/SQSEventParser";
import { SQSEventHandlerFactory } from "./SQSEventHandlerFactory";

class SQSEventManager {

    private logger = new Logger('SQSEventManager');

    constructor() {

    }

    async handler(event: SQSEvent) {
        try {
            this.logger.info('Event received', event);
            const messages = SQSEventParser.parse<any>(event);
            if (messages?.length) {
                const message = messages[0];
                const handler = SQSEventHandlerFactory.create(message.eventName);
                await handler.handle(message.event);
            }
        } catch (error) {
            this.logger.error('Error handling sqs event', {
                eventName: 'ErrorHandlingSqsEvent',
                message: error.message,
                stack: error.stack
            });
            throw error;
        }
    }

}

const sqsEventManager = new SQSEventManager();
module.exports = {
    handler: sqsEventManager.handler.bind(sqsEventManager)
}