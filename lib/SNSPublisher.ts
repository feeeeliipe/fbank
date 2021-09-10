import { SNS } from "aws-sdk";
import { EventDriveModel } from './EventDriveModel';

export interface IEvent {
    eventName: string;
    data: object;
}

export class SNSPublisher {

    private sns: SNS;

    constructor() {
        let config;
        if (process.env.STAGE === 'local') {
            config = {
                endpoint: 'http://localhost:4566'
            }
        }
        this.sns = new SNS(config)
    }

    async publish(topicArn: string, eventName: string, event: object) {
        await this.sns.publish({
            TopicArn: topicArn,
            MessageAttributes: {
                eventName: {
                    DataType: 'String',
                    StringValue: eventName
                }
            },
            Message: JSON.stringify(event)
        }).promise();
    }

}