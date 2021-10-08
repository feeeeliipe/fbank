
import { EventDriveModel } from "../../../../../lib/EventDriveModel";
import { Logger } from "../../../../../lib/Logger";
import { AccountRepository } from "../../repositories/AccountRepository";
import { CalculateCreditHandler } from "./CalculateCreditHandler";

export class AccountUpdatedHandler {

    private logger = new Logger('CreditAnalyzerService', 'AccountUpdatedHandler');

    constructor(
        protected accountRepository = new AccountRepository(), 
        protected calculateCreditHandler = new CalculateCreditHandler()
        ) {
    }

    async handle(accountData: EventDriveModel.AccountUpdatedWage) {
        try {
            this.logger.info('Account data received', { data: accountData });
            await this.updateAccountWage(accountData);
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

    private async updateAccountWage(accountData: EventDriveModel.AccountUpdatedWage) {
        this.logger.info('Updating account wage');
        await this.accountRepository.update(accountData.id, { customerWage: accountData.customerWage });
        this.logger.info('Wage updated');
    }

}

