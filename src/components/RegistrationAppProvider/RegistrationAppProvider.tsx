import { createStandaloneToast } from '@chakra-ui/react';
import React, { FC, PropsWithChildren, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NavigateFunction, useNavigate } from 'react-router-dom';

// Components
import ErrorModal from '../ErrorModal';

// Features
import { setError, setNavigate, setToast } from '../../features/application';
import { fetchSettings } from '../../features/settings';

// Theme
import { theme } from '../../theme';

// Types
import { IAppThunkDispatch } from '../../types';

const RegistrationAppProvider: FC<PropsWithChildren> = ({ children }) => {
  const dispatch: IAppThunkDispatch = useDispatch<IAppThunkDispatch>();
  const navigate: NavigateFunction = useNavigate();
  const { toast, ToastContainer } = createStandaloneToast({ theme });
  const handleErrorModalClose = () => {
    dispatch(setError(null));
  };

  useEffect(() => {
    dispatch(setNavigate(navigate));
    dispatch(setToast(toast));
    dispatch(fetchSettings());
  }, []);

  return (
    <>
      <ErrorModal onClose={handleErrorModalClose} />
      <ToastContainer />
      {children}
    </>
  );
};

export default RegistrationAppProvider;