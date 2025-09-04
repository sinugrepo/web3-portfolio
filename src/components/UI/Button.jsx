import React from 'react';
import { motion } from 'framer-motion';

const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  icon,
  className = '',
  onClick,
  type = 'button',
  ...props
}) => {
  const variants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    outline: 'px-6 py-3 border-2 border-primary-600 text-primary-600 rounded-lg font-medium transition-all duration-300 hover:bg-primary-600 hover:text-white disabled:opacity-50',
    ghost: 'px-6 py-3 text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50',
    danger: 'px-6 py-3 bg-red-600 text-white rounded-lg font-medium transition-all duration-300 hover:bg-red-700 disabled:opacity-50'
  };

  const sizes = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-6 py-3',
    large: 'px-8 py-4 text-lg'
  };

  const baseClasses = `
    inline-flex items-center justify-center space-x-2 font-medium transition-all duration-300 disabled:cursor-not-allowed
    ${variants[variant]}
    ${size !== 'medium' ? sizes[size] : ''}
    ${className}
  `;

  return (
    <motion.button
      className={baseClasses}
      disabled={disabled || loading}
      onClick={onClick}
      type={type}
      whileHover={!disabled && !loading ? { scale: 1.05 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.95 } : {}}
      {...props}
    >
      {loading && (
        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      
      {!loading && icon && icon}
      
      {typeof children === 'string' ? (
        <span>{children}</span>
      ) : (
        children
      )}
    </motion.button>
  );
};

export default Button;
