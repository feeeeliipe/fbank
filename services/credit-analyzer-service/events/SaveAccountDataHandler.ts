import { SQSEvent } from "aws-lambda";
import { EventDriveModel } from "../../../lib/EventDriveModel";
import { Logger } from "../../../lib/Logger";
import { SQSEventParser } from "../../../lib/SQSEventParser";

class SaveAccountDataHandler {

    private logger = new Logger('SaveAccountDataHandler');

    async handler(event: SQSEvent) {
        this.logger.info('Event received', { payload: event });
        const messages = SQSEventParser.parse<EventDriveModel.CreatedAccountEvent>(event);
        if (messages?.length) {
            const createdAccountEvent = messages[0];
            this.logger.info('Parsed message', { message: createdAccountEvent });
        }
    }

}

const saveAccountDataHandler = new SaveAccountDataHandler();
module.exports = {
    handler: saveAccountDataHandler.handler.bind(saveAccountDataHandler)
}