import { SQSEvent } from "aws-lambda";
import { Logger } from "../../../../lib/Logger";
import { SQSEventParser } from "../../../../lib/SQSEventParser";
import { SQSEventHandlerFactory } from "./SQSEventHandlerFactory";

class SQSEventManager {

    private logger = new Logger('CreditAnalyzerService', 'SQSEventManager');

    constructor() {

    }

    async handler(event: SQSEvent) {
        try {
            const messages = SQSEventParser.parse<any>(event);
            if (messages?.length) {
                const message = messages[0];
                const handler = SQSEventHandlerFactory.create(message.eventName);
                await handler.handle(message.event);
            }
        } catch (error: any) {
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