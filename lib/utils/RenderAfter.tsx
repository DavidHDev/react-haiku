import { type ReactNode, useEffect, useState } from 'react';

type Props = {
  delay?: number;
  children: ReactNode;
};

export const RenderAfter = ({ delay = 1000, children }: Props) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), delay);
    return () => clearTimeout(timer);
  }, [ready]);

  return ready ? children : null;
};
