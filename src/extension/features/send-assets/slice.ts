import { createSlice, Draft, PayloadAction, Reducer } from '@reduxjs/toolkit';

// enums
import { StoreNameEnum } from '@extension/enums';

// thunks
import { submitTransactionThunk } from './thunks';

// types
import { IAssetTypes, INativeCurrency } from '@extension/types';
import { IInitializeSendAssetPayload, ISendAssetsState } from './types';

// utils
import { getInitialState } from './utils';

const slice = createSlice({
  extraReducers: (builder) => {
    /** submit transaction **/
    builder.addCase(
      submitTransactionThunk.fulfilled,
      (state: ISendAssetsState) => {
        state.confirming = false;
      }
    );
    builder.addCase(
      submitTransactionThunk.pending,
      (state: ISendAssetsState) => {
        state.confirming = true;
      }
    );
    builder.addCase(
      submitTransactionThunk.rejected,
      (state: ISendAssetsState) => {
        state.confirming = false;
      }
    );
  },
  initialState: getInitialState(),
  name: StoreNameEnum.SendAssets,
  reducers: {
    initializeSendAsset: (
      state: Draft<ISendAssetsState>,
      action: PayloadAction<IInitializeSendAssetPayload>
    ) => {
      state.fromAddress = action.payload.fromAddress;
      state.selectedAsset = action.payload.selectedAsset;
    },
    reset: (state: Draft<ISendAssetsState>) => {
      state.amountInStandardUnits = '0';
      state.confirming = false;
      state.fromAddress = null;
      state.note = null;
      state.selectedAsset = null;
      state.toAddress = null;
    },
    setAmount: (
      state: Draft<ISendAssetsState>,
      action: PayloadAction<string>
    ) => {
      state.amountInStandardUnits = action.payload;
    },
    setFromAddress: (
      state: Draft<ISendAssetsState>,
      action: PayloadAction<string>
    ) => {
      state.fromAddress = action.payload;
    },
    setNote: (
      state: Draft<ISendAssetsState>,
      action: PayloadAction<string | null>
    ) => {
      state.note = action.payload;
    },
    setSelectedAsset: (
      state: Draft<ISendAssetsState>,
      action: PayloadAction<IAssetTypes | INativeCurrency>
    ) => {
      state.selectedAsset = action.payload;
    },
    setToAddress: (
      state: Draft<ISendAssetsState>,
      action: PayloadAction<string | null>
    ) => {
      state.toAddress = action.payload;
    },
  },
});

export const reducer: Reducer = slice.reducer;
export const {
  initializeSendAsset,
  reset,
  setAmount,
  setFromAddress,
  setNote,
  setSelectedAsset,
  setToAddress,
} = slice.actions;
