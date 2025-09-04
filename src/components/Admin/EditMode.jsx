import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { 
  CogIcon,
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
  TrashIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon 
} from '@heroicons/react/24/outline';
import Modal from '../UI/Modal';
import Button from '../UI/Button';
import DataManager from './DataManager';
import ImportExport from './ImportExport';

const EditMode = ({ portfolioData, onImport, onExport, onReset }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDataManager, setShowDataManager] = useState(false);
  const [showImportExport, setShowImportExport] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  const handleExport = () => {
    const data = onExport();
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
    const filename = `portfolio-data-${timestamp}.json`;
    
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast.success('Portfolio data exported successfully!');
  };

  const handleReset = () => {
    onReset();
    setIsResetModalOpen(false);
    toast.success('Portfolio data reset to default values');
  };

  const stats = {
    experience: portfolioData.experience?.length || 0,
    projects: portfolioData.projects?.length || 0,
    skills: portfolioData.about?.skills?.length || 0
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.div
        className="fixed bottom-6 left-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.button
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 rounded-full shadow-xl bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white border-2 border-white dark:border-gray-800 flex items-center justify-center transition-all duration-300 hover:shadow-2xl"
          whileHover={{ scale: 1.1, rotate: 180 }}
          whileTap={{ scale: 0.95 }}
          title="Admin Settings"
          style={{
            background: 'linear-gradient(135deg, #3b82f6 0%, #14b8a6 100%)',
          }}
        >
          <CogIcon className="h-8 w-8 text-white drop-shadow-sm" />
        </motion.button>
      </motion.div>

      {/* Edit Mode Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            {/* Panel */}
            <motion.div
              className="absolute right-0 top-0 h-full w-full max-w-md bg-white dark:bg-gray-800 shadow-2xl"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className="h-full flex flex-col">
                {/* Header */}
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                      Edit Mode
                    </h2>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="p-2 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg transition-colors group"
                      title="Close Admin Panel"
                    >
                      <span className="text-xl font-bold text-gray-600 dark:text-gray-300 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">×</span>
                    </button>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">
                    Manage your portfolio data and settings
                  </p>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6">
                  {/* Stats */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Portfolio Stats
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-primary-50 dark:bg-primary-900/20 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                          {stats.experience}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Experience
                        </div>
                      </div>
                      <div className="bg-secondary-50 dark:bg-secondary-900/20 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-secondary-600 dark:text-secondary-400">
                          {stats.projects}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Projects
                        </div>
                      </div>
                      <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                          {stats.skills}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Skills
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Quick Actions
                    </h3>

                    <Button
                      onClick={() => setShowImportExport(true)}
                      variant="outline"
                      className="w-full justify-start"
                      icon={<ArrowUpTrayIcon className="h-5 w-5" />}
                    >
                      Import/Export Data
                    </Button>

                    <Button
                      onClick={handleExport}
                      variant="outline"
                      className="w-full justify-start"
                      icon={<ArrowDownTrayIcon className="h-5 w-5" />}
                    >
                      Quick Export
                    </Button>

                    <Button
                      onClick={() => setShowDataManager(true)}
                      variant="outline"
                      className="w-full justify-start"
                      icon={<CogIcon className="h-5 w-5" />}
                    >
                      Data Manager
                    </Button>

                    <Button
                      onClick={() => setIsResetModalOpen(true)}
                      variant="danger"
                      className="w-full justify-start"
                      icon={<TrashIcon className="h-5 w-5" />}
                    >
                      Reset to Default
                    </Button>
                  </div>

                  {/* Instructions */}
                  <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-200 mb-2">
                      🎯 Editing Tips
                    </h4>
                    <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-1">
                      <li>• Click the edit icons on sections to modify content</li>
                      <li>• Use the + buttons to add new items</li>
                      <li>• All changes are auto-saved to localStorage</li>
                      <li>• Export your data for backup purposes</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Data Manager Modal */}
      <Modal
        isOpen={showDataManager}
        onClose={() => setShowDataManager(false)}
        title="Data Manager"
        size="large"
      >
        <DataManager 
          portfolioData={portfolioData}
          onClose={() => setShowDataManager(false)}
        />
      </Modal>

      {/* Import/Export Modal */}
      <Modal
        isOpen={showImportExport}
        onClose={() => setShowImportExport(false)}
        title="Import/Export Data"
        size="large"
      >
        <ImportExport 
          portfolioData={portfolioData}
          onImport={onImport}
          onExport={onExport}
          onClose={() => setShowImportExport(false)}
        />
      </Modal>

      {/* Reset Confirmation Modal */}
      <Modal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        title="Reset Portfolio Data"
      >
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/20 mb-4">
            <ExclamationTriangleIcon className="h-6 w-6 text-red-600 dark:text-red-400" />
          </div>
          
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Are you sure?
          </h3>
          
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            This action will permanently delete all your custom data and restore the default portfolio content. This cannot be undone.
          </p>
          
          <div className="flex justify-center space-x-3">
            <Button 
              variant="secondary" 
              onClick={() => setIsResetModalOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              variant="danger"
              onClick={handleReset}
              icon={<TrashIcon className="h-5 w-5" />}
            >
              Reset Data
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default EditMode;
