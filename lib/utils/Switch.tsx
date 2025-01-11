import { ComponentType, ReactNode } from "react";

type CaseComponent = ReactNode | ComponentType;

interface SwitchProps<CaseValue extends PropertyKey = PropertyKey> {
    /** List of case components to be rendered when case matches */
    components: Record<CaseValue, CaseComponent>;
    /** Default component to be rendered if the value does not match any of the given cases */
    defaultComponent: CaseComponent;
    /** Value to check with the cases to render the corresponding component */
    value: CaseValue;
}

export type SwitchComponent = <CaseValue extends PropertyKey = PropertyKey>(props: SwitchProps<CaseValue>) => JSX.Element;

/**
 * A component that renders one of the provided case components based on the value.
 */
export const Switch: SwitchComponent = ({ components, defaultComponent, value }) => {
    let RenderedComponent = (components[value] || defaultComponent) as CaseComponent;

    if (typeof RenderedComponent === "function") {
        return <RenderedComponent />;
    }

    return <>{RenderedComponent}</>;
};