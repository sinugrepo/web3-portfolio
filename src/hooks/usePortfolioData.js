import { useLocalStorage } from './useLocalStorage';
import { defaultPortfolioData } from '../utils/dataManager';

export const usePortfolioData = () => {
  const [portfolioData, setPortfolioData] = useLocalStorage('portfolioData', defaultPortfolioData);

  const updateSection = (section, data) => {
    setPortfolioData(prev => ({
      ...prev,
      [section]: data
    }));
  };

  const addItem = (section, item) => {
    setPortfolioData(prev => ({
      ...prev,
      [section]: Array.isArray(prev[section]) 
        ? [...prev[section], { ...item, id: Date.now().toString() }]
        : item
    }));
  };

  const updateItem = (section, itemId, updatedData) => {
    setPortfolioData(prev => ({
      ...prev,
      [section]: Array.isArray(prev[section])
        ? prev[section].map(item => 
            item.id === itemId ? { ...item, ...updatedData } : item
          )
        : { ...prev[section], ...updatedData }
    }));
  };

  const deleteItem = (section, itemId) => {
    setPortfolioData(prev => ({
      ...prev,
      [section]: Array.isArray(prev[section])
        ? prev[section].filter(item => item.id !== itemId)
        : defaultPortfolioData[section]
    }));
  };

  const reorderItems = (section, startIndex, endIndex) => {
    setPortfolioData(prev => {
      const items = Array.from(prev[section]);
      const [reorderedItem] = items.splice(startIndex, 1);
      items.splice(endIndex, 0, reorderedItem);
      
      return {
        ...prev,
        [section]: items
      };
    });
  };

  const importData = (newData) => {
    try {
      // Validate the data structure
      if (typeof newData === 'object' && newData !== null) {
        setPortfolioData(newData);
        return { success: true, message: 'Data imported successfully!' };
      } else {
        throw new Error('Invalid data format');
      }
    } catch (error) {
      return { success: false, message: `Import failed: ${error.message}` };
    }
  };

  const exportData = () => {
    return portfolioData;
  };

  const resetData = () => {
    setPortfolioData(defaultPortfolioData);
  };

  return {
    portfolioData,
    updateSection,
    addItem,
    updateItem,
    deleteItem,
    reorderItems,
    importData,
    exportData,
    resetData
  };
};

export default usePortfolioData;
