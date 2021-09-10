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
        id: string;
        accountId: string;
        type: 'DEBIT' | 'CREDIT';
        amount: number;
        password: string;
    }

    export interface EntryApproved {
        id: string;
        accountId: string;
    }

    export interface EntryReproved {
        id: string;
        accountId: string;
        detail: string;
    }

    export enum CreditAnalyzerEvents {
        RESERVE_CUSTOMER_CREDIT_COMMAND_V1 = 'reserve.customer.credit.command.v1',
        CUSTOMER_CREDIT_RESERVED_V1 = 'customer.credit.reserved.v1',
        CUSTOMER_CREDIT_UNAVAILABLE_V1 = 'customer.credit.unavailable.v1',
    }

    export interface ReserveCustomerCreditCommand {
        entryId: string;
        accountId: string;
        amount: number;
    }

    export interface CustomerCreditReserved {
        entryId: string;
        accountId: string;
        amountReserved: number;
        previousBalance: number;
        newBalance: number;
    }

    export interface CustomerCreditUnavailable {
        entryId: string;
        accountId: string;
        message: string;
    }

}