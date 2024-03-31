import { Children, type ReactNode } from 'react';

type RenderFn = <T>(item: T, index?: number) => ReactNode;

export const For = <T,>({ render, each }: { render: RenderFn; each: T[] }) =>
  Children.toArray(each.map((item, index) => render(item, index)));
