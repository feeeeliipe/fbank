
import { EventDriveModel } from "../../../../../lib/EventDriveModel";
import { Logger } from "../../../../../lib/Logger";
import { AccountRepository } from "../../repositories/AccountRepository";
import { CalculateCreditHandler } from "./CalculateCreditHandler";

export class AccountCreatedHandler {

    private logger = new Logger('CreditAnalyzerService', 'AccountCreatedHandler');

    constructor(
        protected accountRepository = new AccountRepository(), 
        protected calculateCreditHandler = new CalculateCreditHandler()) {
    }

    async handle(accountData: EventDriveModel.AccountCreatedEvent) {
        try {
            this.logger.info('Account data received', { data: accountData });
            await this.saveAccountData(accountData);
            await this.calculateCreditHandler.handle(accountData.id);
        } catch (error) {
            this.logger.error('Error saving account data', {
                eventName: 'ErrorSavingAccountData',
                message: error.message,
                stack: error.stack
            });
            throw error;
        }
    }

    private async saveAccountData(accountData: EventDriveModel.AccountCreatedEvent) {
        this.logger.info('Saving account data');
        await this.accountRepository.save(accountData);
        this.logger.info('Account data saved successfully');
    }

}

