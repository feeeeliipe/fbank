import { SQSEvent } from "aws-lambda";
import { EventDriveModel } from "../../../../lib/EventDriveModel";
import { Logger } from "../../../../lib/Logger";
import { SQSEventParser } from "../../../../lib/SQSEventParser";
import { AccountRepository } from "../repositories/AccountRepository";

class SaveAccountDataHandler {

    private logger = new Logger('SaveAccountDataHandler');

    constructor(protected accountRepository = new AccountRepository()) {

    }

    async handler(event: SQSEvent) {
        try {
            const messages = SQSEventParser.parse<EventDriveModel.CreatedAccountEvent | EventDriveModel.UpdatedAccountWage>(event);
            if (messages?.length) {
                const accountData = messages[0];
                this.logger.info('Account data received', { message: accountData });
                await this.saveAccountData(accountData);
            }    
        } catch (error) {
            this.logger.error('Error saving account data', {
                eventName: 'ErrorSavingAccountData',
                message: error.message,
                stack: error.stack
            });
            throw error;
        }
    }

    private async saveAccountData(accountData: EventDriveModel.CreatedAccountEvent | EventDriveModel.UpdatedAccountWage) {
        this.logger.info('Saving account data');
        await this.accountRepository.save(accountData);
        this.logger.info('Account data saved successfully');
    }

}

const saveAccountDataHandler = new SaveAccountDataHandler();
module.exports = {
    handler: saveAccountDataHandler.handler.bind(saveAccountDataHandler)
}