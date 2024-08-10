import { Children, isValidElement, ReactNode } from 'react';
import { If } from './If';

type Props = {
  children: ReactNode;
};

type ElseProps = {
  render?: () => ReactNode;
  children?: ReactNode;
};

export const Show = ({ children }: Props) => {
  let when: ReactNode | null = null;
  let otherwise: ReactNode | null = null;

  Children.forEach(children, (child) => {
    if (isValidElement(child)) {
      if ('isTrue' in child.props) {
        if (!when && child.props.isTrue) when = child;
      } else otherwise = child;
    }
  });

  return when || otherwise;
};

Show.When = If;
Show.Else = ({ render, children }: ElseProps) => (render ? render() : children);
