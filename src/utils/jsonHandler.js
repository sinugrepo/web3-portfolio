import { validatePortfolioData } from './dataManager';

export const handleFileUpload = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error('No file selected'));
      return;
    }

    if (file.type !== 'application/json') {
      reject(new Error('Please select a valid JSON file'));
      return;
    }

    const reader = new FileReader();
    
    reader.onload = (event) => {
      try {
        const jsonData = JSON.parse(event.target.result);
        const validation = validatePortfolioData(jsonData);
        
        if (!validation.valid) {
          reject(new Error(validation.error));
          return;
        }
        
        resolve(jsonData);
      } catch (error) {
        reject(new Error('Invalid JSON format'));
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Error reading file'));
    };
    
    reader.readAsText(file);
  });
};

export const createBackup = (data) => {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
  const filename = `portfolio-backup-${timestamp}.json`;
  return { data, filename };
};

export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const generateSampleData = () => {
  return {
    about: {
      name: "Sample Web3 Specialist",
      title: "Fun Shitposter • Event Organizer • Node Operator",
      description: "Sample description for multi-role Web3 specialist portfolio.",
      skills: [
        { name: "Fun Shitposting & Meme Creation", level: 95 },
        { name: "Crypto Event Organization", level: 90 },
        { name: "Node Operations & Validation", level: 85 }
      ]
    },
    experience: [
      {
        id: "sample-1",
        company: "Sample Web3 Ecosystem",
        position: "Multi-Role Contributor",
        duration: "2023 - Present",
        description: "Sample multi-role Web3 experience"
      }
    ],
    projects: [
      {
        id: "sample-project-1",
        title: "Sample Meme Factory",
        description: "Sample shitposting project description",
        category: "Shitposting",
        techStack: ["Python", "OpenAI API", "Meme Templates"],
        featured: true
      }
    ],
    contact: {
      email: "sample@example.com",
      social: {}
    }
  };
};
