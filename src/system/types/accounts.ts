import {AccountNumber} from 'shared/types/signing';
import {IdentificationData} from 'system/types/identification';
import {Dict} from 'system/types/generic';

export interface Account extends AccountNumber, IdentificationData {}

export type Accounts = Dict<Account>;
