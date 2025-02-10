import { createContext, useState, useContext, ReactNode } from 'react';

interface LoadingContextProps {
  isGlobalLoading: boolean;
  loadingMessage: string;
  setGlobalLoading: (loading: boolean, message?: string) => void;
}

const LoadingContext = createContext<LoadingContextProps | undefined>(undefined);

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [isGlobalLoading, setIsGlobalLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState('Loading...');

  const setGlobalLoading = (loading: boolean, message?: string) => {
    setIsGlobalLoading(loading);
    if (message !== undefined) {
      setLoadingMessage(message);
    }
  };

  return (
    <LoadingContext.Provider value={{ isGlobalLoading, loadingMessage, setGlobalLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = (): LoadingContextProps => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};
