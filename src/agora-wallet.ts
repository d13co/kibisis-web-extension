import { AlgorandProvider } from '@agoralabs-sh/algorand-provider';

// Services
import { AgoraWalletManager } from './services/page';

// Types
import { ILogger, IWindow } from './types';

// Utils
import { createLogger } from './utils';

(() => {
  const logger: ILogger = createLogger(
    __ENV__ === 'development' ? 'debug' : 'error'
  );
  const script: string = 'agora-wallet';
  let walletManager: AgoraWalletManager;

  // check for the algorand provider, if it doesn't exist, overwrite it
  if (
    !(window as IWindow).algorand ||
    !(window as IWindow).algorand?.addWallet
  ) {
    logger.debug(`${script}: no algorand provider found, creating a new one`);

    (window as IWindow).algorand = new AlgorandProvider();
  }

  walletManager = new AgoraWalletManager({
    extensionId: __AGORA_WALLET_EXTENSION_ID__,
    logger,
  });

  // add the wallet manager
  (window as IWindow).algorand?.addWallet(walletManager, {
    replace: true,
  });
})();
