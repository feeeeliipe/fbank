import { EventDriveModel } from "../../../../lib/EventDriveModel";
import { SNSPublisher } from "../../../../lib/SNSPublisher";
import { AccountRepository } from "../repositories/AccountRepository";

export interface UpdateAccountWageCommandParams {
    id: string;
    customerWage: number;
}


export class UpdateAccountWageCommand {


    constructor(
        protected accountRepo = new AccountRepository(),
        protected snsPublisher = new SNSPublisher()
    ) {

    }

    async execute(params: UpdateAccountWageCommandParams) {
        await this.accountRepo.update(params);
        const event: EventDriveModel.UpdatedAccountWage = {
            id: params.id,
            customerWage: params.customerWage
        }
        await this.snsPublisher.publish(`${process.env.ACCOUNT_SNS}`, EventDriveModel.AccountEvents.ACCOUNT_UPDATED, event);
        const account = await this.accountRepo.getAccount(params.id);
        return { 
            id: account?.id,
            customerName: account?.customerName,
            customerWage: account?.customerWage,
        }
    }

}

