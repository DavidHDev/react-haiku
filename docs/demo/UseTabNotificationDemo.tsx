import { useTabNotification } from 'react-haiku';
import React, { useState } from 'react';

export const UseTabNotificationDemo = () => {
  const [customTitle, setCustomTitle] = useState('');
  const [flashMessage, setFlashMessage] = useState('');
  const [dotColor, setDotColor] = useState('#ff0000');
  const [delay, setDelay] = useState('2');

  const {
    setTitlePrefix,
    setFlashMessage: setHookFlashMessage,
    setIsShown,
    setCustomTitle: setHookCustomTitle,
    setShowFaviconDot,
    setFaviconDotColor,
  } = useTabNotification(Number(delay));

  return (
    <div className="demo-container-center">
      <div>
        <div className="demo-control-group">
          <input
            type="text"
            placeholder="Custom title"
            className="demo-input"
            style={{ marginBottom: 0 }}
            value={customTitle}
            onChange={(e) => {
              setCustomTitle(e.target.value);
              setHookCustomTitle(e.target.value);
            }}
          />

          <input
            type="text"
            placeholder="Flash message"
            className="demo-input"
            style={{ marginBottom: 0 }}
            value={flashMessage}
            onChange={(e) => setFlashMessage(e.target.value)}
          />

          <button
            className="demo-button"
            onClick={() => setHookFlashMessage(flashMessage)}
          >
            Set Flash Message
          </button>
        </div>

        <hr />

        <div className="demo-control-group">
          <button
            className="demo-button green-button"
            onClick={() => setShowFaviconDot(true)}
          >
            Show Favicon Dot
          </button>

          <button
            className="demo-button red-button"
            onClick={() => setShowFaviconDot(false)}
          >
            Hide Favicon Dot
          </button>

          <input
            type="color"
            style={{ height: '60px', maxWidth: '120px', marginBottom: 0 }}
            value={dotColor}
            onChange={(e) => {
              setDotColor(e.target.value);
              setFaviconDotColor(e.target.value);
            }}
          />
        </div>

        <hr />

        <div className="demo-control-group">
          <input
            type="number"
            placeholder="Flash delay (seconds)"
            style={{ marginBottom: 0 }}
            className="demo-input"
            value={delay}
            onChange={(e) => setDelay(e.target.value)}
            min="1"
            max="10"
          />

          <button
            className="demo-button"
            onClick={() => setTitlePrefix('[ACTIVE] ')}
          >
            Set Title Prefix
          </button>
        </div>

        <hr />

        <div className="demo-control-group">
          <button
            className="demo-button green-button"
            onClick={() => setIsShown(true)}
          >
            Enable Notifications
          </button>

          <button className="demo-button" onClick={() => setIsShown(false)}>
            Clear Notifications
          </button>
        </div>
      </div>
    </div>
  );
};
