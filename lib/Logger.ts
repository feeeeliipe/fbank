import pino from 'pino';

export class Logger {

    private pinoInstance;

    constructor(protected serviceName: string, protected className: string) {
        this.pinoInstance = pino();
    }

    info(msg: string, data?: object) {
        if (data) {
            this.pinoInstance.info({
                serviceName: this.serviceName, 
                className: this.className, 
                ...data 
            }, msg);
        } else {
            this.pinoInstance.info(msg);
        }
    }

    warn(msg: string, data?: object) {
        if (data) {
            this.pinoInstance.warn({
                serviceName: this.serviceName, 
                className: this.className, 
                ...data 
            }, msg);
        } else {
            this.pinoInstance.warn(msg);
        }
    }

    error(msg: string, data?: object) {
        if (data) {
            this.pinoInstance.error({
                serviceName: this.serviceName, 
                className: this.className, 
                ...data 
            }, msg);
        } else {
            this.pinoInstance.error(msg);
        }
    }

}