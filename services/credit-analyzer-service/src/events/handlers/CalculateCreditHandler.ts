
import { EventDriveModel } from "../../../../../lib/EventDriveModel";
import { Logger } from "../../../../../lib/Logger";
import { AccountRepository } from "../../repositories/AccountRepository";

export class CalculateCreditHandler {

    private logger = new Logger('CalculateCreditHandler');

    constructor(protected accountRepository = new AccountRepository()) {

    }

    async handle(accountId: string) {
        try {
            this.logger.info('Calculating account credit');
            const account = await this.accountRepository.get(accountId);
            const totalCredit = account.customerWage * 0.30;
            this.logger.info(`Account credit is ${totalCredit}`);
            await this.accountRepository.update(accountId, { totalCredit: totalCredit });
        } catch (error: any) {
            this.logger.error('Error calculating account credit', {
                eventName: 'ErroCalculatingAccountCredit',
                message: error.message,
                stack: error.stack
            });
            throw error;
        }
    }

}

