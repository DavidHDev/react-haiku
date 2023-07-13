import { Children, type ReactNode } from 'react';

export const For = <T,>({render, each}: {
    render: (item: T, index?: number) => ReactNode;
    each: T[];
}) => Children.toArray(each.map((item, index) => render(item, index)));
