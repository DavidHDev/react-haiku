
import { Children } from 'react';
import { If } from './If';

export const Show = props => {
    let when = null;
    let otherwise = null;

    Children.forEach(props.children, children => {
        if (children.props.isTrue === undefined) {
            otherwise = children;
        } else if (!when && children.props.isTrue === true) {
            when = children;
        }
    });

    return when || otherwise;
};

Show.When = If;
Show.Else = ({ render, children }) => render ? render() : children;