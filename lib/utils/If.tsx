import { ReactNode } from 'react';

type Props = {
  isTrue: boolean;
  children: ReactNode;
};

export const If = ({ isTrue, children }: Props) => (isTrue ? children : null);
