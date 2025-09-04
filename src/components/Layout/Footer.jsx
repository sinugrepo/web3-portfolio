import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <motion.div 
            className="flex items-center space-x-3 mb-4 md:mb-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-primary-600 to-secondary-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">W3</span>
            </div>
            <span className="text-lg font-semibold text-gray-900 dark:text-white">
              Web3 Portfolio
            </span>
          </motion.div>

          <motion.div 
            className="text-center md:text-right"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              Built with React, Tailwind CSS & Framer Motion
            </p>
            <p className="text-gray-500 dark:text-gray-500 text-sm">
              © {currentYear} Web3 Portfolio. All rights reserved.
            </p>
          </motion.div>
        </div>

        <motion.div 
          className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-xs text-gray-500 dark:text-gray-500">
            This portfolio supports CRUD operations with localStorage persistence and JSON import/export functionality.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
