import { useEffect, useState } from 'react';

enum ScrollState {
  SCROLL = '',
  LOCK = 'hidden',
}

type PreventBodyScrollResult = {
  isScrollLocked: boolean;
  setIsScrollLocked: React.Dispatch<React.SetStateAction<boolean>>;
  toggleScrollLock: () => void;
};

export function usePreventBodyScroll(): PreventBodyScrollResult {
  const [isScrollLocked, setIsScrollLocked] = useState<boolean>(false);

  useEffect(() => {
    if (isScrollLocked) {
      document.body.style.overflow = ScrollState.LOCK;
    } else {
      document.body.style.overflow = ScrollState.SCROLL;
    }

    return () => {
      document.body.style.overflow = ScrollState.SCROLL;
    };
  }, [isScrollLocked]);

  const toggleScrollLock = () => setIsScrollLocked((prevState) => !prevState);

  return {
    isScrollLocked,
    setIsScrollLocked,
    toggleScrollLock,
  };
}
