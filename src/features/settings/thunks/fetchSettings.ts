import { AsyncThunk, createAsyncThunk } from '@reduxjs/toolkit';

// Constants
import {
  SETTINGS_ADVANCED_KEY,
  SETTINGS_APPEARANCE_KEY,
  SETTINGS_NETWORK_KEY,
} from '../../../constants';

// Enums
import { SettingsThunkEnum } from '../../../enums';

// Services
import { StorageManager } from '../../../services/extension';

// Types
import {
  IAdvancedSettings,
  IAppearanceSettings,
  IMainRootState,
  INetwork,
  ISettings,
} from '../../../types';

// Utils
import { createDefaultSettings } from '../utils';

const fetchSettings: AsyncThunk<
  ISettings, // return
  undefined, // args
  Record<string, never>
> = createAsyncThunk<ISettings, undefined, { state: IMainRootState }>(
  SettingsThunkEnum.FetchSettings,
  async (_, { getState }) => {
    const networks: INetwork[] = getState().networks.items;
    const storageManager: StorageManager = new StorageManager();
    const storageItems: Record<string, unknown> =
      await storageManager.getAllItems();

    return Object.keys(storageItems).reduce<ISettings>((acc, value) => {
      switch (value) {
        case SETTINGS_ADVANCED_KEY:
          return {
            ...acc,
            advanced: {
              ...acc.advanced,
              ...(storageItems[SETTINGS_ADVANCED_KEY] as IAdvancedSettings),
            },
          };
        case SETTINGS_APPEARANCE_KEY:
          return {
            ...acc,
            appearance: {
              ...acc.appearance,
              ...(storageItems[SETTINGS_APPEARANCE_KEY] as IAppearanceSettings),
            },
          };
        case SETTINGS_NETWORK_KEY:
          return {
            ...acc,
            network: {
              ...acc.network,
              ...(storageItems[SETTINGS_NETWORK_KEY] as INetwork),
            },
          };
        default:
          return acc;
      }
    }, createDefaultSettings(networks));
  }
);

export default fetchSettings;