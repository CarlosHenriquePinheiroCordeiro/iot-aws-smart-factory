import React from 'react';
import ThemeSwitch from '../../components/ThemeSwitch';
import { useTheme } from '../../context/ThemeContext';
import { motion } from 'framer-motion';
import { organizationsMock } from './organizationsMock';
import { FaPlusCircle } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";

export interface Organization {
  id: number;
  name: string;
  logo: string;
  number: string | undefined;
  street: string;
  city: string;
  state: string;
  country: string;
}

const organizations: Organization[] = organizationsMock;

export interface OrganizationCardProps {
  organization: Organization;
  delay?: number;
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const OrganizationCard: React.FC<OrganizationCardProps> = ({ organization, delay = 0 }) => {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/home');
  };

  return (
    <motion.div
      onClick={handleClick}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      transition={{ delay: delay, duration: 0.5, ease: 'easeOut' }}
    >
    <div className='card bg-base-200 shadow-xl m-4 cursor-pointer transition-transform transform hover:scale-105 h-96'>
        <div className="card-body flex flex-col text-center items-center">
            <h2 className="card-title" style={{ fontSize: '1.5rem' }}>{organization.name}</h2>
            <div className="my-4">
            <img
                src={organization.logo}
                alt={`${organization.name} logo`}
                className="w-full h-48 object-contain"
            />
            </div>
            <p className="text-lg text-gray-500">{[organization.number, organization.street, organization.city, organization.state, organization.country].join(', ')}</p>
        </div>
    </div>
    </motion.div>
  );
};

interface InsertOrganizationCardProps {
  delay?: number;
}

const InsertOrganizationCard: React.FC<InsertOrganizationCardProps> = ({ delay = 0 }) => {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/organizations/insert')
  };

  return (
    <motion.div
      onClick={handleClick}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      transition={{ delay: delay, duration: 0.5, ease: 'easeOut' }}>
      <div className="card bg-base-200 shadow-xl m-4 cursor-pointer flex items-center justify-center transition-transform transform hover:scale-105 h-96">
        <FaPlusCircle size={'10rem'} />
        <span className="text-3xl font-bold mt-10">Insert Organization</span>
      </div>
    </motion.div>
  );
};

const Organizations: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div
      className={`relative min-h-screen ${theme === 'light' ? 'bg-base-100' : ''}`}
      style={theme === 'dark' ? { backgroundColor: '#040404' } : {}}
    >
      <div className="container mx-auto p-4">
        <div className="absolute top-0 right-0 p-4">
          <ThemeSwitch />
        </div>
        <h1 className="text-5xl font-bold mb-4 text-center text-primary">Organizations</h1>
        <div className="overflow-y-auto w-full" style={{ height: '90vh', width: '100%'}}>
          <div className="grid grid-cols-1 sm:grid-cols-2 w-full lg:grid-cols-3 gap-4">
            {organizations.map((org, index) => (
              <OrganizationCard key={org.id} organization={org} delay={index * 0.2} />
            ))}
            <InsertOrganizationCard delay={organizations.length * 0.2} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Organizations;
