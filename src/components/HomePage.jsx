import '../styles/HomePage.css';

function HomePage({ isAdmin, onModeSelect }) {
  return (
    <div className="map-home">
      <div className="clouds">
        <div className="cloud cloud-1"></div>
        <div className="cloud cloud-2"></div>
        <div className="cloud cloud-3"></div>
      </div>

      <div className="game-title">
        <h1>PUZZLE QUEST</h1>
        <p>Choose Your Adventure</p>
      </div>

      <div className="mode-selector">
        <div className="mode-node" onClick={() => onModeSelect('easy')}>
          <div className="node-circle">🌟</div>
          <div className="mode-label">Easy Mode</div>
        </div>

        <div className="mode-node" onClick={() => onModeSelect('hard')}>
          <div className="node-circle">🔥</div>
          <div className="mode-label">Hard Mode</div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
