import { useState } from 'react';
import UploadModal from './UploadModal';
import '../styles/MapView.css';

function MapView({ mode, stages, isAdmin, onBack, onPlayStage, onDeleteStage, onStagesUpdate }) {
  const [showUploadModal, setShowUploadModal] = useState(false);

  const filteredStages = stages.filter(s => s.mode === mode);

  const handleAddStage = () => {
    setShowUploadModal(true);
  };

  const handleSaveStage = (stageData) => {
    const newStages = [...stages];

    if (stageData.applyToBoth) {
      // Create both Easy and Hard stages
      const easyStage = {
        id: Date.now(),
        name: stageData.name,
        image: stageData.image,
        mode: 'easy'
      };

      const hardStage = {
        id: Date.now() + 1,
        name: stageData.name,
        image: stageData.image,
        mode: 'hard'
      };

      newStages.push(easyStage, hardStage);
    } else {
      // Create single stage
      const newStage = {
        id: Date.now(),
        name: stageData.name,
        image: stageData.image,
        mode: stageData.mode
      };
      newStages.push(newStage);
    }

    onStagesUpdate(newStages);
    setShowUploadModal(false);
  };

  return (
    <div className="map-view">
      <div className="map-header">
        <button className="back-button" onClick={onBack}>
          ← Back to Home
        </button>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '700' }}>
          {mode === 'easy' ? '🌟 Easy' : '🔥 Hard'} Stages
        </h2>
        {isAdmin && (
          <button className="add-button" onClick={handleAddStage}>
            + Add Stage
          </button>
        )}
      </div>

      <div className="map-container">
        <div className="map-path"></div>

        {filteredStages.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">🗺️</div>
            <h3>No Stages Yet</h3>
            <p>{isAdmin ? 'Click "+ Add Stage" to create one!' : 'Ask admin to add stages!'}</p>
          </div>
        ) : (
          filteredStages.map((stage) => (
            <div key={stage.id} className="stage-card">
              <img src={stage.image} alt={stage.name} className="stage-preview" />
              <div className="stage-info">
                <div className="stage-name">{stage.name}</div>
                <div className={`difficulty-badge ${stage.mode}`}>
                  {stage.mode === 'easy' ? '2×2' : '3×3'}
                </div>
              </div>
              <div className="stage-actions">
                <button className="play-button" onClick={() => onPlayStage(stage)}>
                  ▶ Play
                </button>
                {isAdmin && (
                  <button className="delete-button" onClick={() => onDeleteStage(stage.id)}>
                    🗑️
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {showUploadModal && (
        <UploadModal
          defaultMode={mode}
          onClose={() => setShowUploadModal(false)}
          onSave={handleSaveStage}
        />
      )}
    </div>
  );
}

export default MapView;
