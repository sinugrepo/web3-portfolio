import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Hero from './components/Sections/Hero';
import About from './components/Sections/About';
import Experience from './components/Sections/Experience';
import Projects from './components/Sections/Projects';
import Contact from './components/Sections/Contact';
import EditMode from './components/Admin/EditMode';
import { usePortfolioData } from './hooks/usePortfolioData';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const portfolioDataHook = usePortfolioData();

  // Initialize dark mode from localStorage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
    if (savedDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Toggle edit mode
  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? 'dark bg-gray-900' : 'bg-white'
    }`}>
      {/* Background Pattern */}
      <div className="fixed inset-0 bg-blockchain-pattern opacity-5 pointer-events-none"></div>
      
      {/* Header */}
      <Header 
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        editMode={editMode}
        toggleEditMode={toggleEditMode}
      />

      {/* Main Content */}
      <main className="relative z-10">
        <Hero 
          data={portfolioDataHook.portfolioData.about}
          editMode={editMode}
          onUpdate={(data) => portfolioDataHook.updateSection('about', data)}
        />
        
        <About 
          data={portfolioDataHook.portfolioData.about}
          editMode={editMode}
          onUpdate={(data) => portfolioDataHook.updateSection('about', data)}
        />
        
        <Experience 
          data={portfolioDataHook.portfolioData.experience}
          editMode={editMode}
          onAdd={(item) => portfolioDataHook.addItem('experience', item)}
          onUpdate={(id, data) => portfolioDataHook.updateItem('experience', id, data)}
          onDelete={(id) => portfolioDataHook.deleteItem('experience', id)}
          onReorder={(startIndex, endIndex) => portfolioDataHook.reorderItems('experience', startIndex, endIndex)}
        />
        
        <Projects 
          data={portfolioDataHook.portfolioData.projects}
          editMode={editMode}
          onAdd={(item) => portfolioDataHook.addItem('projects', item)}
          onUpdate={(id, data) => portfolioDataHook.updateItem('projects', id, data)}
          onDelete={(id) => portfolioDataHook.deleteItem('projects', id)}
          onReorder={(startIndex, endIndex) => portfolioDataHook.reorderItems('projects', startIndex, endIndex)}
        />
        
        
        <Contact 
          data={portfolioDataHook.portfolioData.contact}
          editMode={editMode}
          onUpdate={(data) => portfolioDataHook.updateSection('contact', data)}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Edit Mode Controls */}
      {editMode && (
        <EditMode 
          portfolioData={portfolioDataHook.portfolioData}
          onImport={portfolioDataHook.importData}
          onExport={portfolioDataHook.exportData}
          onReset={portfolioDataHook.resetData}
        />
      )}

      {/* Toast Notifications */}
      <Toaster 
        position="bottom-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: darkMode ? '#374151' : '#ffffff',
            color: darkMode ? '#f3f4f6' : '#111827',
            border: `1px solid ${darkMode ? '#4b5563' : '#e5e7eb'}`,
          },
        }}
      />
    </div>
  );
}

export default App;
