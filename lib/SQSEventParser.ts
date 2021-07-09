import { SQSEvent } from "aws-lambda";
import { Logger } from "./Logger";

export class SQSEventParser {

    private static logger = new Logger('SQSEventParser');

    static parse<T>(event: SQSEvent): T[] {
        try {
            if (!event.Records.length) {
                this.logger.info('Empty event. Bypassing...');
            }
            const messages: T[] = [];
            event.Records.forEach(record => {
                const body = JSON.parse(record.body);
                const message = body.Message ? JSON.parse(body.Message) : body;
                messages.push(message);
            });
            return messages;    
        } catch (error) {
            this.logger.error('Error parsing SQS event', { 
                eventName: 'ErrorParsingSqsEvent', 
                message: error.message,
                stack: error.stack
            });
            throw error;
        }
        
    }

}