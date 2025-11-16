import '../styles/VideoModal.css';

function VideoModal({ isOpen, onClose, videoUrl }) {
  if (!isOpen) return null;

  // Extract video ID from YouTube URL
  const getYouTubeId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoId = getYouTubeId(videoUrl);
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;

  const handleBackdropClick = (e) => {
    if (e.target.className === 'video-modal-backdrop') {
      onClose();
    }
  };

  return (
    <div className="video-modal-backdrop" onClick={handleBackdropClick}>
      <div className="video-modal-content">
        <button className="video-modal-close" onClick={onClose}>
          ✕
        </button>
        <div className="video-container">
          <iframe
            width="100%"
            height="100%"
            src={embedUrl}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default VideoModal;
