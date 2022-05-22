import { Children } from 'react';

export const For = ({render, each}) => Children.toArray(each.map((item, index) => render(item, index)));

