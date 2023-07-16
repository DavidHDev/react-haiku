import { ReactNode } from "react";

export const If = ({isTrue, children}: {
    isTrue: boolean;
    children: ReactNode;  
}) => isTrue ? children : null;
