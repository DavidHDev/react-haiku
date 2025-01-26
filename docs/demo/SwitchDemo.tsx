import { Switch } from 'react-haiku';
import React from 'react';
import './styling/demo.css';

enum Reaction {
  LIKE = 'like',
  FIRE = 'fire',
  LOVE = 'love',
}

const CaseReactionLike = () => <h1 className="bounceIn" style={{ '--animate-duration': '1s' } as React.CSSProperties}>👍</h1>
const CaseReactionFire = () => <h1 className="bounceIn" style={{ '--animate-duration': '1s' } as React.CSSProperties}>🔥</h1>
const CaseReactionLove = () => <h1 className="bounceIn" style={{ '--animate-duration': '1s' } as React.CSSProperties}>❤️</h1>
const CaseDefault      = () => <h1 className="bounceIn" style={{ '--animate-duration': '1s' } as React.CSSProperties}>🚀</h1>

export const SwitchDemo = () => {
  const [reaction, setReaction] = React.useState<Reaction | undefined>();

  const handleReact = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const reactionSelected = e.target.value as Reaction;
    setReaction({
      [Reaction.LIKE]: Reaction.LIKE,
      [Reaction.FIRE]: Reaction.FIRE,
      [Reaction.LOVE]: Reaction.LOVE
    }[reactionSelected]);
  }

  return (
    <div className="demo-container-center">
      <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', gap: '12px', marginBottom: '1em' }}>
        <label>React to this component:</label>
        <div className="demo-dropdown">
          <select value={reaction} onChange={handleReact}>
            <option>Default</option>
            <option value={Reaction.LIKE}>👍 Like</option>
            <option value={Reaction.FIRE}>🔥 Fire</option>
            <option value={Reaction.LOVE}>❤️ Love</option>
          </select>
        </div>
      </div>

      <Switch
        value={reaction!}
        components={{
          [Reaction.LIKE]: CaseReactionLike,
          [Reaction.FIRE]: CaseReactionFire,
          [Reaction.LOVE]: CaseReactionLove,
        }}
        defaultComponent={CaseDefault}
      />
    </div>
  );
};