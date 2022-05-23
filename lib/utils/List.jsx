import React from 'react';

const getRenderValue = (item) => typeof item === 'object' ? JSON.stringify(item) : item;

export const List = ({ from, fallback }) => {
    if (Array.isArray(from) && from.length) {
        return <ul>{React.Children.toArray(from.map(item => <li>{getRenderValue(item)}</li>))}</ul>
    } else return fallback;
}