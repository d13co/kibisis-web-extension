// Types
import { ISessionsState } from '../types';

export default function getInitialState(): ISessionsState {
  return {
    fetching: false,
    items: [],
    request: null,
    saving: false,
  };
}
