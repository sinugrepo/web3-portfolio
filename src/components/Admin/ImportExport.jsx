import React, { useState, useRef } from 'react';
import toast from 'react-hot-toast';
import { 
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
  DocumentArrowDownIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ClipboardDocumentIcon 
} from '@heroicons/react/24/outline';
import Button from '../UI/Button';
import { handleFileUpload, formatFileSize, generateSampleData } from '../../utils/jsonHandler';
import { downloadJSON } from '../../utils/dataManager';

const ImportExport = ({ portfolioData, onImport, onExport, onClose }) => {
  const [isImporting, setIsImporting] = useState(false);
  const [importResult, setImportResult] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  // Export Functions
  const handleExport = () => {
    const data = onExport();
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
    const filename = `portfolio-data-${timestamp}.json`;
    
    downloadJSON(data, filename);
    toast.success('Portfolio data exported successfully!');
  };

  const handleExportSample = () => {
    const sampleData = generateSampleData();
    downloadJSON(sampleData, 'sample-portfolio-data.json');
    toast.success('Sample data exported!');
  };

  const handleCopyToClipboard = async () => {
    try {
      const data = onExport();
      await navigator.clipboard.writeText(JSON.stringify(data, null, 2));
      toast.success('Portfolio data copied to clipboard!');
    } catch (error) {
      toast.error('Failed to copy to clipboard');
    }
  };

  // Import Functions
  const handleFileSelect = (files) => {
    if (files && files[0]) {
      processImport(files[0]);
    }
  };

  const processImport = async (file) => {
    setIsImporting(true);
    setImportResult(null);

    try {
      const data = await handleFileUpload(file);
      const result = onImport(data);
      
      if (result.success) {
        setImportResult({
          success: true,
          message: result.message,
          filename: file.name,
          size: formatFileSize(file.size)
        });
        toast.success(result.message);
      } else {
        setImportResult({
          success: false,
          message: result.message,
          filename: file.name,
          size: formatFileSize(file.size)
        });
        toast.error(result.message);
      }
    } catch (error) {
      setImportResult({
        success: false,
        message: error.message,
        filename: file.name,
        size: formatFileSize(file.size)
      });
      toast.error(error.message);
    } finally {
      setIsImporting(false);
    }
  };

  // Drag and Drop Handlers
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files);
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-6">
      {/* Export Section */}
      <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Export Portfolio Data
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Download your portfolio data as a JSON file for backup or sharing.
        </p>
        
        <div className="flex flex-wrap gap-3">
          <Button
            onClick={handleExport}
            icon={<ArrowDownTrayIcon className="h-5 w-5" />}
          >
            Export Current Data
          </Button>
          
          <Button
            onClick={handleCopyToClipboard}
            variant="outline"
            icon={<ClipboardDocumentIcon className="h-5 w-5" />}
          >
            Copy to Clipboard
          </Button>
          
          <Button
            onClick={handleExportSample}
            variant="ghost"
            icon={<DocumentArrowDownIcon className="h-5 w-5" />}
          >
            Download Sample
          </Button>
        </div>
      </div>

      {/* Import Section */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Import Portfolio Data
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Upload a JSON file to replace your current portfolio data.
        </p>

        {/* Drag and Drop Area */}
        <div
          className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive
              ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
              : 'border-gray-300 dark:border-gray-600 hover:border-primary-400 dark:hover:border-primary-500'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={(e) => handleFileSelect(e.target.files)}
            className="hidden"
          />

          {isImporting ? (
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400">Processing file...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <ArrowUpTrayIcon className="h-12 w-12 text-gray-400 mb-4" />
              <p className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Drop your JSON file here
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                or click to select a file
              </p>
              <Button onClick={openFileDialog} variant="outline">
                Select File
              </Button>
            </div>
          )}
        </div>

        {/* Import Result */}
        {importResult && (
          <div className={`mt-4 p-4 rounded-lg ${
            importResult.success 
              ? 'bg-green-50 dark:bg-green-900/20' 
              : 'bg-red-50 dark:bg-red-900/20'
          }`}>
            <div className="flex items-start">
              <div className="flex-shrink-0">
                {importResult.success ? (
                  <CheckCircleIcon className="h-5 w-5 text-green-500" />
                ) : (
                  <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />
                )}
              </div>
              <div className="ml-3">
                <h4 className={`text-sm font-medium ${
                  importResult.success ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200'
                }`}>
                  {importResult.success ? 'Import Successful' : 'Import Failed'}
                </h4>
                <p className={`text-sm mt-1 ${
                  importResult.success ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'
                }`}>
                  {importResult.message}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  File: {importResult.filename} ({importResult.size})
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Warning */}
        <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
          <div className="flex">
            <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500 flex-shrink-0" />
            <div className="ml-3">
              <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                Important Notice
              </h4>
              <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                Importing data will replace all current portfolio content. Make sure to export your current data first if you want to keep it.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Data Format Info */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
        <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-3">
          Expected Data Format
        </h4>
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <pre className="text-xs text-gray-700 dark:text-gray-300 overflow-x-auto">
{`{
  "about": {
    "name": "Your Name",
    "title": "Your Title",
    "description": "...",
    "skills": [...],
    "expertise": [...]
  },
  "experience": [...],
  "projects": [...],
  "services": [...],
  "contact": {...}
}`}
          </pre>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          Download a sample file to see the complete structure with example data.
        </p>
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

export default ImportExport;
