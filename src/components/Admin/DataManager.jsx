import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  EyeIcon,
  PencilIcon,
  TrashIcon,
  PlusIcon,
  ChevronDownIcon,
  ChevronRightIcon 
} from '@heroicons/react/24/outline';
import Button from '../UI/Button';

const DataManager = ({ portfolioData, onClose }) => {
  const [expandedSections, setExpandedSections] = useState({
    about: false,
    experience: false,
    projects: false,
    services: false,
    contact: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const getSectionStats = () => {
    return {
      about: {
        skills: portfolioData.about?.skills?.length || 0,
        expertise: portfolioData.about?.expertise?.length || 0
      },
      experience: portfolioData.experience?.length || 0,
      projects: portfolioData.projects?.length || 0,
      contact: {
        social: Object.keys(portfolioData.contact?.social || {}).filter(key => 
          portfolioData.contact.social[key]
        ).length
      }
    };
  };

  const stats = getSectionStats();

  const renderAboutSection = () => (
    <div className="space-y-3">
      <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <div>
          <p className="font-medium text-gray-900 dark:text-white">Personal Info</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {portfolioData.about?.name} - {portfolioData.about?.title}
          </p>
        </div>
        <Button size="small" variant="outline" icon={<PencilIcon className="h-4 w-4" />}>
          Edit
        </Button>
      </div>

      <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <div>
          <p className="font-medium text-gray-900 dark:text-white">Skills</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {stats.about.skills} skills defined
          </p>
        </div>
        <Button size="small" variant="outline" icon={<EyeIcon className="h-4 w-4" />}>
          View
        </Button>
      </div>

      <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <div>
          <p className="font-medium text-gray-900 dark:text-white">Expertise Areas</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {stats.about.expertise} areas defined
          </p>
        </div>
        <Button size="small" variant="outline" icon={<EyeIcon className="h-4 w-4" />}>
          View
        </Button>
      </div>
    </div>
  );

  const renderArraySection = (items, sectionName) => (
    <div className="space-y-3">
      {items?.map((item, index) => (
        <div key={item.id || index} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="flex-1 min-w-0">
            <p className="font-medium text-gray-900 dark:text-white truncate">
              {item.title || item.company || item.name || `Item ${index + 1}`}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
              {item.position || item.category || item.description?.substring(0, 50) || 'No description'}
              {item.description?.length > 50 && '...'}
            </p>
          </div>
          <div className="flex space-x-2 ml-3">
            <Button size="small" variant="outline" icon={<PencilIcon className="h-4 w-4" />}>
              Edit
            </Button>
            <Button size="small" variant="danger" icon={<TrashIcon className="h-4 w-4" />}>
              Delete
            </Button>
          </div>
        </div>
      )) || (
        <div className="text-center py-6 text-gray-500 dark:text-gray-400">
          No {sectionName} items found
        </div>
      )}
      
      <Button 
        variant="outline" 
        className="w-full" 
        icon={<PlusIcon className="h-5 w-5" />}
      >
        Add New {sectionName.slice(0, -1)}
      </Button>
    </div>
  );

  const renderContactSection = () => (
    <div className="space-y-3">
      <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <div>
          <p className="font-medium text-gray-900 dark:text-white">Contact Info</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {portfolioData.contact?.email} - {portfolioData.contact?.location}
          </p>
        </div>
        <Button size="small" variant="outline" icon={<PencilIcon className="h-4 w-4" />}>
          Edit
        </Button>
      </div>

      <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <div>
          <p className="font-medium text-gray-900 dark:text-white">Social Links</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {stats.contact.social} social links configured
          </p>
        </div>
        <Button size="small" variant="outline" icon={<EyeIcon className="h-4 w-4" />}>
          View
        </Button>
      </div>
    </div>
  );

  const sections = [
    {
      name: 'about',
      title: 'About Section',
      description: `Personal information, skills, and expertise`,
      icon: '👤',
      content: renderAboutSection()
    },
    {
      name: 'experience',
      title: 'Experience',
      description: `${stats.experience} work experience entries`,
      icon: '💼',
      content: renderArraySection(portfolioData.experience, 'experience')
    },
    {
      name: 'projects',
      title: 'Projects',
      description: `${stats.projects} project entries`,
      icon: '🚀',
      content: renderArraySection(portfolioData.projects, 'projects')
    },
    {
      name: 'contact',
      title: 'Contact',
      description: 'Contact information and social links',
      icon: '📧',
      content: renderContactSection()
    }
  ];

  return (
    <div className="space-y-4 max-h-96 overflow-y-auto">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Portfolio Data Overview
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Manage all sections of your portfolio data
        </p>
      </div>

      {sections.map((section) => (
        <div key={section.name} className="border border-gray-200 dark:border-gray-600 rounded-lg">
          <button
            onClick={() => toggleSection(section.name)}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{section.icon}</span>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">
                  {section.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {section.description}
                </p>
              </div>
            </div>
            <motion.div
              animate={{ rotate: expandedSections[section.name] ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronRightIcon className="h-5 w-5 text-gray-400" />
            </motion.div>
          </button>

          <motion.div
            initial={false}
            animate={{
              height: expandedSections[section.name] ? 'auto' : 0,
              opacity: expandedSections[section.name] ? 1 : 0
            }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-4 border-t border-gray-200 dark:border-gray-600">
              {section.content}
            </div>
          </motion.div>
        </div>
      ))}

      {/* Summary Stats */}
      <div className="mt-6 p-4 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-lg">
        <h4 className="font-medium text-gray-900 dark:text-white mb-2">
          Portfolio Summary
        </h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600 dark:text-gray-400">Total Items:</span>
            <span className="ml-2 font-medium text-gray-900 dark:text-white">
              {stats.experience + stats.projects + stats.about.skills}
            </span>
          </div>
          <div>
            <span className="text-gray-600 dark:text-gray-400">Last Updated:</span>
            <span className="ml-2 font-medium text-gray-900 dark:text-white">
              {new Date().toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
  );
};

export default DataManager;
