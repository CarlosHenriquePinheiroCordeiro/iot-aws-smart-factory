import { createContext, useState, useContext, ReactNode } from 'react';
import NanoLoadingAnimation from '../components/animations/NanoLoadingAnimation';

interface LoadingContextProps {
  isGlobalLoading: boolean;
  loadingComponent: any;
  setLoadingComponent: (component: any) => void;
  setGlobalLoading: (loading: boolean, component?: any) => void;
}

const LoadingContext = createContext<LoadingContextProps | undefined>(undefined);

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [isGlobalLoading, setIsGlobalLoading] = useState(false);
  const [loadingComponent, setLoadComponent] = useState(<NanoLoadingAnimation />)

  const setGlobalLoading = (loading: boolean) => {
    setIsGlobalLoading(loading);
  };

  const setLoadingComponent = (component?: any) => {
    if (component !== undefined) {
      setLoadComponent(component);
    }
  };

  return (
    <LoadingContext.Provider value={{ isGlobalLoading, loadingComponent, setLoadingComponent, setGlobalLoading }}>
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
