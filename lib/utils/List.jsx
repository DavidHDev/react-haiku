import { Children } from 'react';

const getRenderValue = (item) => typeof item === 'object' ? JSON.stringify(item) : item;


export const List = ({ from, fallback, showEmptyMessage = false, emptyMessage = 'List Is Empty' }) => {
    if (Array.isArray(from)) {
        if (showEmptyMessage && !from.length) return emptyMessage;
        if (!from.length) return;
        return <ul>{Children.toArray(from.map(item => <li>{getRenderValue(item)}</li>))}</ul>
    } else return fallback;
}