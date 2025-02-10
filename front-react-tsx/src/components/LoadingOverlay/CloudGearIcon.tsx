import React from 'react';
import { FaCloud, FaCog } from 'react-icons/fa';

export interface CloudGearIconProps {
  size?: number;
}

const CloudGearIcon: React.FC<CloudGearIconProps> = ({
  size = 100,
}) => {
  const containerStyle: React.CSSProperties = {
    position: 'relative',
    display: 'inline-block',
    width: size,
    height: size * 0.5,
  };

  const cloudStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
  };

  const gearStyle: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    animation: 'spin 0.75s linear infinite',
  };

  return (
    <div style={containerStyle}>
      <FaCloud style={cloudStyle} className='fill-primary' size={size} />
      <FaCog style={gearStyle} className='fill-secondary' size={size * 0.3} />
    </div>
  );
};

export default CloudGearIcon;