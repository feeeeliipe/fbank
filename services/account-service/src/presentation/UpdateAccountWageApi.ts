import { APIGatewayProxyEventV2 } from "aws-lambda"
import { HttpResponses } from "../../../../lib/HttpResponses";
import { UpdateAccountWageCommand } from "../commands/UpdateAccountWageCommand";

export const handler = async (event: APIGatewayProxyEventV2) => {
    try {
        if (!event.body) {
            return HttpResponses.unprocessableEntity('Body must be provided');
        }
        if (!event.pathParameters?.id) {
            return HttpResponses.unprocessableEntity('Account id must be provided');
        }
        const { customerWage } = JSON.parse(event.body);
        const id = event.pathParameters?.id;
        const command = new UpdateAccountWageCommand();
        const account = await command.execute({ id, customerWage });
        return HttpResponses.success(account);
    } catch (error) {
        return HttpResponses.internalError();
    }

}