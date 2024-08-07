import { Children, type ReactNode } from 'react';

type RenderFn<T> = (item: T, index?: number) => ReactNode;

type Props<T> = {
  render: RenderFn<T>;
  each: T[];
};

export const For = <T,>({ render, each }: Props<T>) =>
  Children.toArray(each.map((item, index) => render(item, index)));
