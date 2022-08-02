import {IdentificationData} from 'system/types/identification';
import {TnbKeyPair} from 'system/types/signing';

export interface SelfSlice extends IdentificationData, TnbKeyPair {}
