// types
import IBaseTransaction from './IBaseTransaction';

interface IBaseAssetFreezeTransaction extends IBaseTransaction {
  assetId: string;
  frozenAddress: string;
}

export default IBaseAssetFreezeTransaction;
