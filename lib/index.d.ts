import {
  MutableRefObject,
  MouseEventHandler,
  EffectCallback,
  DependencyList,
  ReactNode,
  FC,
} from "react";

// hooks

export declare const useClickOutside: (
  ref?: MutableRefObject<Element | null>,
  handler?: Function,
  event?: string | string[]
) => void;

export declare const useClipboard: (options?: { timeout?: number }) => {
  copy: (text: string) => void;
  reset: () => void;
  error: string | Error;
  copied: boolean;
};

export declare const useConfirmExit: (
  enabled: boolean | Function,
  message?: string
) => void;

export declare const useCookie: <T extends string | {}>(
  key: string,
  initialValue?: T,
  expireDays?: number
) => [value: T, setValue: (value: T) => void, deleteCookie: () => void];

export declare const useCookieListener: <T extends string | {}>(
  effect: (cookieValue: T, key: string) => void,
  cookieDeps?: string[],
) => void;

export declare const useDebounce: <T>(value: T, delay?: number) => T;

export declare const useEventListener: (
  eventName: string,
  handler: Function,
  element?: MutableRefObject<Element | null>
) => void;

export declare const useFavicon: (href?: string) => {
  setFavicon: (href: string) => void;
};

export declare const useFirstRender: () => boolean;

export declare const useHold: (
  callback: Function,
  options?: {
    doPreventDefault?: boolean;
    delay?: number;
  }
) => {
  onMouseDown: () => MouseEventHandler;
  onTouchStart: () => MouseEventHandler;
  onMouseUp: () => MouseEventHandler;
  onMouseLeave: () => MouseEventHandler;
  onTouchEnd: () => MouseEventHandler;
};

export declare const useHover: <T>() => {
  ref: MutableRefObject<T | null>;
  hovered: boolean;
};

export declare const useIdle: (
  timeout: number,
  options?: {
    events?: string[];
    initialState?: boolean;
  }
) => boolean;

export declare const useInputValue: <T>(
  initialState: T
) => [value: T, setValue: (value: any) => void];

export declare const useInterval: (
  callback: () => void,
  initialDelay: number
) => {
  start: (delay?: number) => void;
  stop: () => void;
};

export declare const useIsomorphicLayoutEffect: (
  effect: EffectCallback,
  deps?: DependencyList
) => void;

export declare const useLeaveDetection: (
  onLeave: (e?: MouseEvent) => void
) => void;

export declare const useLocalStorage: <T extends string | {}>(
  key: string,
  initialValue?: T
) => [value: T, setValue: (value: T) => void];

export declare const useMediaQuery: (
  query: string,
  initialValue?: boolean
) => boolean;

export declare const useMousePosition: <T>() => {
  target: MutableRefObject<T | null>;
  x: number;
  y: number;
};

export declare const usePrefersTheme: (
  initialValue?: string
) => "dark" | "light";

export declare const useScript: (src: string) => string;

export declare const useScrollPosition: () => [
  scroll: {
    x: number;
    y: number;
  },
  setPosition: (scroll: { x?: number; y?: number }) => void
];

export declare const useSingleEffect: (effect: () => void) => void;

export declare const useTitle: (title: string) => void;

export declare const useToggle: <T>(
  initialValue: T,
  options: [T, T]
) => [T, (value?: T) => void];

export declare const useBoolToggle: (
  initialValue?: false
) => [boolean, (value?: boolean) => void];

export declare const useUpdateEffect: (
  effect: EffectCallback,
  deps?: DependencyList
) => void;

export declare const useUrgentUpdate: () => () => void;

// utils

export declare const For: FC<{
  each: any[];
  render: (item: any, index: number) => ReactNode;
}>;

export declare const If: FC<{
  children: ReactNode;
  isTrue: boolean;
}>;

export declare const RenderAfter: FC<{
  children: ReactNode;
  delay?: number;
}>;

export declare const Show: FC<{
  children: ReactNode;
}> & {
  When: FC<{
    children: ReactNode;
    isTrue: boolean;
  }>;
  Else: FC<{
    children?: ReactNode;
    render?: () => ReactNode;
  }>;
};
