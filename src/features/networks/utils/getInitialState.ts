// Config
import { networks } from '../../../config';

// Types
import { INetworksState } from '../types';

export default function getInitialState(): INetworksState {
  return {
    items: networks,
  };
}