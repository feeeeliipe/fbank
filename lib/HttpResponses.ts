export class HttpResponses {

    private static buildResponse(statusCode: number, body: object) {
        return {    
            statusCode, 
            body: JSON.stringify(body)
        }
    }

    static success(body: object) {
        return this.buildResponse(200, body);
    }

    static accepted(body: object) {
        return this.buildResponse(202, body);
    }

    static badRequest (message: string) {
        return this.buildResponse(400, { message });
    }

    static unprocessableEntity (message: string) {
        return this.buildResponse(422, { message });
    }

    static internalError(error?: string) {
        return this.buildResponse(500, { message: 'Something went wrong processing request', error: error });
    }
}