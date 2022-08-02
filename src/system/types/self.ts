import {IdentificationData} from 'system/types/identification';
import {TnbKeyPair} from 'shared/types/signing';

export interface SelfSlice extends IdentificationData, TnbKeyPair {}
