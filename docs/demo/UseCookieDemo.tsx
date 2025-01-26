import { useCookie } from 'react-haiku';
import React, { useState } from 'react';

export const UseCookieDemo = () => {
  const [newValue, setNewValue] = useState('');

  const [cookieValue, setCookie, deleteCookie] = useCookie<string>(
    'demo_cookie',
    'default',
    7,
  ) as [string, (value: string) => void, () => void];

  return (
    <div className="demo-container-center">
      <h3 style={{ marginBottom: '1em' }}>Cookie Value:</h3>
      <div className="demo-button green-button bounceIn">{cookieValue}</div>

      <div className="demo-control-group" style={{ marginTop: '2em' }}>
        <input
          type="text"
          placeholder="New cookie value"
          style={{ marginBottom: 0 }}
          className="demo-input"
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
        />

        <button
          className="demo-button green-button"
          onClick={() => setCookie(newValue)}
        >
          Set Custom Value
        </button>
      </div>

      <div className="demo-control-group">
        <button
          className="demo-button orange-button"
          onClick={() => setCookie(Date.now().toString())}
        >
          Set Timestamp
        </button>

        <button className="demo-button red-button" onClick={deleteCookie}>
          Delete Cookie
        </button>
      </div>

      <p
        style={{
          marginTop: '2em',
          fontSize: '0.85em',
          color: '#888',
          textAlign: 'center',
        }}
      >
        Open DevTools → Application → Cookies to see persistence
      </p>
    </div>
  );
};
