import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
  ExclamationTriangleIcon 
} from '@heroicons/react/24/outline';
import Modal from '../UI/Modal';
import Button from '../UI/Button';

const PasswordModal = ({ isOpen, onClose, onAuthenticate }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);

  const CORRECT_PASSWORD = 'alpukat88Enak';
  const MAX_ATTEMPTS = 3;
  const BLOCK_DURATION = 30000; // 30 seconds

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isBlocked) {
      setError('Too many failed attempts. Please wait 30 seconds.');
      return;
    }

    if (password === CORRECT_PASSWORD) {
      // Success
      onAuthenticate(true);
      setPassword('');
      setError('');
      setAttempts(0);
      onClose();
    } else {
      // Failed attempt
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      setPassword('');
      
      if (newAttempts >= MAX_ATTEMPTS) {
        setIsBlocked(true);
        setError(`Too many failed attempts. Please wait 30 seconds.`);
        
        // Unblock after 30 seconds
        setTimeout(() => {
          setIsBlocked(false);
          setAttempts(0);
          setError('');
        }, BLOCK_DURATION);
      } else {
        setError(`Incorrect password. ${MAX_ATTEMPTS - newAttempts} attempts remaining.`);
      }
    }
  };

  const handleClose = () => {
    setPassword('');
    setError('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title=""
      size="small"
    >
      <div className="text-center">
        {/* Lock Icon */}
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 dark:bg-red-900/20 mb-6">
          <LockClosedIcon className="h-8 w-8 text-red-600 dark:text-red-400" />
        </div>

        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Admin Access Required
        </h3>
        
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Enter the admin password to access edit mode
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Password Input */}
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              disabled={isBlocked}
              className={`w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors ${
                error 
                  ? 'border-red-300 dark:border-red-600' 
                  : 'border-gray-300 dark:border-gray-600'
              } ${isBlocked ? 'opacity-50 cursor-not-allowed' : ''}`}
              autoFocus
            />
            
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              disabled={isBlocked}
            >
              {showPassword ? (
                <EyeSlashIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center space-x-2 text-red-600 dark:text-red-400 text-sm"
            >
              <ExclamationTriangleIcon className="h-4 w-4 flex-shrink-0" />
              <span>{error}</span>
            </motion.div>
          )}

          {/* Submit Button */}
          <div className="flex justify-center space-x-3 pt-2">
            <Button 
              variant="secondary" 
              onClick={handleClose}
              disabled={isBlocked}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              disabled={!password.trim() || isBlocked}
              loading={false}
            >
              Authenticate
            </Button>
          </div>
        </form>

        {/* Security Notice */}
        <div className="mt-6 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
          <p className="text-xs text-yellow-800 dark:text-yellow-200">
            🔒 This password protects your portfolio from unauthorized edits
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default PasswordModal;
