import { ComponentType, ReactNode } from "react";

type CaseComponent = ReactNode | ComponentType;

export type SwitchProps<T extends PropertyKey = PropertyKey> = {
    /** List of case components to be rendered when case matches */
    components: Record<T, CaseComponent>;
    /** Default component to be rendered if the value does not match any of the given cases */
    defaultComponent: CaseComponent;
    /** Value to check with the cases to render the corresponding component */
    value: T;
};

export const Switch = <T extends PropertyKey = PropertyKey>({
    components,
    defaultComponent,
    value,
}: SwitchProps<T>) => {
    const ComponentToRender = (components[value] || defaultComponent) as CaseComponent;
    return typeof ComponentToRender === "function" ? <ComponentToRender /> : ComponentToRender;
};