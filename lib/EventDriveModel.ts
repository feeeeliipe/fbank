export namespace EventDriveModel {

    export enum AccountEvents {
        ACCOUNT_CREATED_V1 = 'account.created.v1',
        ACCOUNT_UPDATED_V1 = 'account.updated.v1'
    }

    export interface AccountCreatedEvent {
        id: string;
        customerName: string;
        customerWage: number;
    }

    export interface AccountUpdatedWage {
        id: string;
        customerWage: number;
    }

    export enum EntryEvents {
        ENTRY_CREATED_V1 = 'entry.created.v1',
        ENTRY_APPROVED_V1 = 'entry.approved.v1',
        ENTRY_REPROVED_V1 = 'entry.reproved.v1'
    }

    export interface EntryCreated {
        accountId: string;
        type: 'DEBIT' | 'CREDIT';
        amount: number;
        password: string;
    }


}