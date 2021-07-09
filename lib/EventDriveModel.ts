export namespace EventDriveModel {

    export enum AccountEvents {
        ACCOUNT_CREATED = 'account.created',
        ACCOUNT_UPDATED = 'account.updated',
        PASSWORD_VALIDATION_REQUESTED = 'password.validation.requested',
        PASSWORD_VALIDATION_SUCCESS = 'password.validation.success',
        PASSWORD_VALIDATION_ERROR = 'password.validation.error'
    }

    export interface CreatedAccountEvent {
        id: string;
        customerName: string;
        customerWage: number;
    }

    export interface UpdatedAccountWage {
        id: string;
        customerWage: number;
    }

    export interface PasswordValidationRequested {
        accountId: string;
        password: string;
    }

    export interface PasswordValidationSuccess {
        requestId: string;
    }

    export interface PasswordValidationError {
        requestId: string;
        error: string;
    }

    export enum EntryEvents {
        ENTRY_CREATED = 'entry.created',
        ENTRY_APPROVED = 'entry.approved',
        ENTRY_REPROVED = 'entry.reproved'
    }

    export interface EntryCreated {
        accountId: string;
        type: 'DEBIT' | 'CREDIT';
        amount: number;
        password: string;
    }

    export enum AnalysisEvents {
        CREDIT_ANALYSIS_REQUESTED = 'credit.analysis.requested',
        CREDIT_RESERVED = 'credit.reserved',
        CREDIT_UNAVAILABLE = 'credit.unavailable'
    }

}