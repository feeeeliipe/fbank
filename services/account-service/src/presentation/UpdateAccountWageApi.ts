import { APIGatewayProxyEventV2 } from "aws-lambda"
import { UpdateAccountWageCommand } from "../commands/UpdateAccountWageCommand";

export const handler = async (event: APIGatewayProxyEventV2) => {
    try {
        if (!event.body) {
            return {
                statusCode: 422,
                body: JSON.stringify({ messsage: 'Body must be provided'})
            }
        }
        if (!event.pathParameters?.id) {
            return {
                statusCode: 422,
                body: JSON.stringify({ messsage: 'Account id must be provided'})
            }
        }
        
        const { customerWage } = JSON.parse(event.body);
        const id = event.pathParameters?.id;
        
        const command = new UpdateAccountWageCommand();
        const account = await command.execute({ id, customerWage });

        return {
            statusCode: 200,
            body: JSON.stringify(account)
        }
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({message: error.message})
        }
    }

}