
import { Children } from 'react';
import { If } from './If';

import {type ReactNode} from 'react';

export const Show = (props: {
    children: ReactNode & {
        props: {
            isTrue?: boolean;
        }
    }
}) => {
    let when: ReactNode | null = null;
    let otherwise: ReactNode | null = null;

    Children.forEach(props.children, (children) => {
        if (children.props.isTrue === undefined) {
            otherwise = children;
        } else if (!when && children.props.isTrue === true) {
            when = children;
        }
    });

    return (when || otherwise) as ReactNode;
};

Show.When = If;
Show.Else = ({ render, children }: {
    render?: () => ReactNode;
    children?: ReactNode;
}) => render ? render() : children;
