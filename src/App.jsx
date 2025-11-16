import { useState, useEffect } from 'react';
import HomePage from './components/HomePage';
import MapView from './components/MapView';
import GameView from './components/GameView';
import { defaultStages } from './data/preloadStages';
import { LanguageProvider } from './contexts/LanguageContext';
import './styles/App.css';

function App() {
  const [screen, setScreen] = useState('home');
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedMode, setSelectedMode] = useState(null);
  const [stages, setStages] = useState([]);
  const [currentStage, setCurrentStage] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('stages');
    if (saved) {
      setStages(JSON.parse(saved));
    } else {
      // Load default stages if nothing is saved
      setStages(defaultStages);
      localStorage.setItem('stages', JSON.stringify(defaultStages));
    }
  }, []);

  const saveStages = (newStages) => {
    setStages(newStages);
    localStorage.setItem('stages', JSON.stringify(newStages));
  };

  const handleModeSelect = (mode) => {
    setSelectedMode(mode);
    setScreen('map');
  };

  const handleModeChange = (mode) => {
    setSelectedMode(mode);
  };

  const handlePlayStage = (stage) => {
    setCurrentStage(stage);
    setScreen('game');
  };

  const handleDeleteStage = (stageId) => {
    if (confirm('Delete this stage?')) {
      const newStages = stages.filter(s => s.id !== stageId);
      saveStages(newStages);
    }
  };

  const handleGameComplete = () => {
    setScreen('map');
    setCurrentStage(null);
  };

  return (
    <LanguageProvider>
      <div className="app">
        {screen === 'home' && (
          <HomePage
            isAdmin={isAdmin}
            setIsAdmin={setIsAdmin}
            onModeSelect={handleModeSelect}
          />
        )}

        {screen === 'map' && (
          <MapView
            mode={selectedMode}
            stages={stages}
            isAdmin={isAdmin}
            onBack={() => setScreen('home')}
            onPlayStage={handlePlayStage}
            onDeleteStage={handleDeleteStage}
            onStagesUpdate={saveStages}
            onModeChange={handleModeChange}
          />
        )}

        {screen === 'game' && currentStage && (
          <GameView
            stage={currentStage}
            onComplete={handleGameComplete}
          />
        )}
      </div>
    </LanguageProvider>
  );
}

export default App;
