// enums
import { TransactionTypeEnum } from '@extension/enums';

// types
import IBaseTransaction from './IBaseTransaction';

interface IKeyRegistrationOfflineTransaction extends IBaseTransaction {
  type: TransactionTypeEnum.KeyRegistrationOffline;
}

export default IKeyRegistrationOfflineTransaction;
