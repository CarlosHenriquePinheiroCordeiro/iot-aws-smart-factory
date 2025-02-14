import React from 'react';

export interface LoadingOverlayProps {
  loadingComponent?: any;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  loadingComponent,
}) => {
  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center
                 bg-black bg-opacity-30 dark:bg-white dark:bg-opacity-30"
    >
      {loadingComponent}
      
    </div>
  );
};

export default LoadingOverlay;
