import pino from 'pino';

export class Logger {

    private pinoInstance;

    constructor(protected className: string) {
        this.pinoInstance = pino();
    }

    info(msg: string, data?: object) {
        if (data) {
            this.pinoInstance.info(data, msg);
        } else {
            this.pinoInstance.info(msg);
        }
    }

    warn(msg: string, data?: object) {
        if (data) {
            this.pinoInstance.warn(data, msg);
        } else {
            this.pinoInstance.warn(msg);
        }
    }

    error(msg: string, data?: object) {
        if (data) {
            this.pinoInstance.error(data, msg);
        } else {
            this.pinoInstance.error(msg);
        }
    }

}