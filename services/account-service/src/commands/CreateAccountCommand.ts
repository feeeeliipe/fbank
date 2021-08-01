import { Account } from "../entities/Account";
import { AccountRepository } from "../repositories/AccountRepository";
import { v4 as uuid } from 'uuid';
import { SNSPublisher } from "../../../../lib/SNSPublisher";
import { EventDriveModel } from "../../../../lib/EventDriveModel";

interface ICreatedAccountCommandParams {
    customerName: string;
    customerWage: number;
    password: string;
}

export class CreateAccountCommand {

    constructor(
        protected accountRepository: AccountRepository = new AccountRepository(),
        protected snsPublisher = new SNSPublisher()
    ) {

    }

    async execute(params: ICreatedAccountCommandParams) {
        const account = new Account(uuid(), params.customerName, params.customerWage, params.password);
        await this.accountRepository.create(account);
        const event: EventDriveModel.AccountCreatedEvent = {
            id: account.id,
            customerName: account.customerName,
            customerWage: account.customerWage
        }
        await this.snsPublisher.publish(`${process.env.ACCOUNT_SNS}`, EventDriveModel.AccountEvents.ACCOUNT_CREATED_V1, event);
        return { 
            id: account.id,
            customerName: account.customerName,
            customerWage: account.customerWage
        };
    }

}