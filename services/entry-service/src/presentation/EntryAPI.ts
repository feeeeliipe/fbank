import { APIGatewayEvent } from "aws-lambda";
import { HttpResponses } from "../../../../lib/HttpResponses";
import { Logger } from "../../../../lib/Logger";
import { CreateEntryCommand, CreateEntryCommandInput } from "../commands/CreateEntryCommand";

class EntryAPI {

    private logger = new Logger('EntryAPI');

    constructor() {

    }

    async createEntry(event: APIGatewayEvent) {
        try {
            const command = new CreateEntryCommand();
            const body = JSON.parse(event.body as string);
            const input: CreateEntryCommandInput = {
                accountId: body.accountId,
                amount: body.amount,
                password: body.password,
                type: body.type
            }
            const created = await command.execute(input);
            return HttpResponses.success(created);
        } catch (error: any) {
            this.logger.error('Error creating entry', {
                event,
                message: error.message,
                stack: error.stack,
            });
            return HttpResponses.internalError(error);
        }
    }

}

const entryApi = new EntryAPI();
module.exports = {
    createEntry: entryApi.createEntry.bind(entryApi),
}