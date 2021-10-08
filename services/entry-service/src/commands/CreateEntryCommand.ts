import { EventDriveModel } from "../../../../lib/EventDriveModel";
import { SNSPublisher } from "../../../../lib/SNSPublisher";
import { v4 as uuid } from 'uuid';
import { Logger } from "../../../../lib/Logger";
import { EntryRepository } from "../repositories/EntryRepository";

export interface CreateEntryCommandInput {
    accountId: string;
    amount: number;
    password: string;
    type: 'CREDIT' | 'DEBIT'
}


export class CreateEntryCommand {

    constructor(
        protected logger = new Logger('EntryService', 'CreateEntryCommand'),
        protected entryRepo = new EntryRepository(),
        protected snsPublisher: SNSPublisher = new SNSPublisher()
    ) {

    }

    async execute(input: CreateEntryCommandInput) {
        const id = uuid();
        const entryToCreate = {
            id,
            accountId: input.accountId,
            amount: input.amount,
            type: input.type,
        };
        const created = await this.entryRepo.create(entryToCreate);
        const createdEntryEvent: EventDriveModel.EntryCreated = {
            id,
            accountId: input.accountId,
            amount: input.amount,
            password: input.password,
            type: input.type,
        }
        await this.snsPublisher.publish(`${process.env.ENTRY_SNS}`, EventDriveModel.EntryEvents.ENTRY_CREATED_V1, createdEntryEvent);
        this.logger.info('Created Entry event emitted');
        return created;
    }

}