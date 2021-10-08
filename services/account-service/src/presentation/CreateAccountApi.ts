import { HttpResponses } from "../../../../lib/HttpResponses";
import { Logger } from "../../../../lib/Logger";
import { CreateAccountCommand } from "../commands/CreateAccountCommand";

export const handler = async (event: any) => {  
    const logger = new Logger('AccountService', 'CreateAccountApi');
    try {
        logger.info('Creating new account');
        const createAccountParams = JSON.parse(event.body);
        logger.info('Payload received', { eventName: 'ReceivedPayload', payload: createAccountParams });
        const command = new CreateAccountCommand();
        const result = await command.execute(createAccountParams);
        return HttpResponses.success(result);
    } catch (error) {
        logger.error('Error creating account', { 
            eventName: 'CreateAccountApiError', 
            message: error.message, 
            stack: error.stack,
        });
        return HttpResponses.internalError();
    }

}