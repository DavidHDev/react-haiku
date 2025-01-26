import { Image } from 'react-haiku';
import React, { useState } from 'react';
import './styling/demo.css';

export const UseImageDemo = () => {
  const [customSrc, setCustomSrc] = useState('');
  const [showBroken, setShowBroken] = useState(false);

  return (
    <div className="demo-container-center">
      <div className="demo-control-group">
        <input
          type="text"
          placeholder="Enter image URL"
          style={{ marginBottom: 0 }}
          className="demo-input"
          value={customSrc}
          onChange={(e) => setCustomSrc(e.target.value)}
        />
        <button
          className="demo-button green-button"
          onClick={() => setShowBroken(false)}
        >
          Load Custom Image
        </button>
        <button
          className="demo-button red-button"
          onClick={() => setShowBroken(true)}
        >
          Load Broken Image
        </button>
      </div>

      <div className="image-demo-grid">
        <div className="image-demo-item">
          <h4>Original Image</h4>
          <Image
            src={
              showBroken
                ? 'https://invalid.url/broken.jpg'
                : customSrc || 'https://picsum.photos/200'
            }
            alt="Demo image"
            fallback="https://www.mangobeds.com/images/image-fallback.jpg"
            className="demo-image"
          />
        </div>

        <div className="image-demo-item">
          <h4>Fallback Shown</h4>
          <img
            src="https://www.mangobeds.com/images/image-fallback.jpg"
            alt="Fallback preview"
            className="demo-image"
          />
        </div>
      </div>

      <p
        style={{
          marginTop: '2em',
          fontSize: '0.85em',
          color: '#888',
          textAlign: 'center',
        }}
      >
        Try invalid URLs or click "Load Broken Image" to test fallback
      </p>
    </div>
  );
};
