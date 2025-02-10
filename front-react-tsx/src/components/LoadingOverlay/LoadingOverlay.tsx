import React from 'react';
import CloudGearIcon from './CloudGearIcon';

export interface LoadingOverlayProps {
  size?: number;
  message?: string;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  size = 200,
  message = 'Loading...',
}) => {
  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center
                 bg-black bg-opacity-30 dark:bg-white dark:bg-opacity-30"
    >
      <CloudGearIcon
        size={size}
      />
      {message && (
        <p className="mt-4 text-center text-base text-primary">
          <b>{message}</b>
        </p>
      )}
    </div>
  );
};

export default LoadingOverlay;
