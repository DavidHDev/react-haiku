import { useCookieListener } from 'react-haiku';
import React, { useState } from 'react';
import './styling/demo.css';

export const UseCookieListenerDemo = () => {
  const [changes, setChanges] = useState<string[]>([]);
  const [cookieName, setCookieName] = useState('demo_cookie');
  const [cookieValue, setCookieValue] = useState('');

  useCookieListener(
    (value, key) => {
      setChanges((prev) => [
        `[${new Date().toLocaleTimeString()}] ${key}=${value}`,
        ...prev,
      ]);
    },
    [cookieName],
  );

  return (
    <div className="demo-container-center">
      <div className="demo-control-group">
        <input
          type="text"
          placeholder="Cookie name"
          className="demo-input"
          style={{ marginBottom: 0 }}
          value={cookieName}
          onChange={(e) => setCookieName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Cookie value"
          className="demo-input"
          style={{ marginBottom: 0 }}
          value={cookieValue}
          onChange={(e) => setCookieValue(e.target.value)}
        />
        <button
          className="demo-button green-button"
          onClick={() => {
            document.cookie = `${cookieName}=${cookieValue}; path=/`;
            setCookieValue('');
          }}
        >
          Set Cookie
        </button>
      </div>

      <div className="demo-log-container">
        <h4>Change Log (last 5):</h4>
        {changes.slice(0, 5).map((change, i) => (
          <div key={i} className="demo-log-entry">
            {change}
          </div>
        ))}
      </div>

      <p
        style={{
          marginTop: '2em',
          fontSize: '0.85em',
          color: '#888',
          textAlign: 'center',
        }}
      >
        Try changing cookies in another tab or DevTools
      </p>
    </div>
  );
};
