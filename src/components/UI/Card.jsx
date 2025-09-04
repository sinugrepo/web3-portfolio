import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ 
  children, 
  className = '', 
  hover = true, 
  padding = true,
  gradient = false,
  glassmorphism = false,
  ...props 
}) => {
  const baseClasses = `
    rounded-xl border transition-all duration-300
    ${gradient 
      ? 'bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900' 
      : 'bg-white dark:bg-gray-800'
    }
    ${glassmorphism 
      ? 'glassmorphism' 
      : 'border-gray-200 dark:border-gray-700'
    }
    ${padding ? 'p-6' : ''}
    ${hover ? 'hover:shadow-lg hover:shadow-primary-500/10 hover:-translate-y-1' : ''}
    ${className}
  `;

  return (
    <motion.div
      className={baseClasses}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;
