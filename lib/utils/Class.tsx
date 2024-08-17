import React, { ReactNode, ElementType } from "react";
interface ClassProps {
  className?: string;
  condition?: boolean;
  toggleClass?: string;
  children: ReactNode;
  as?: ElementType;
  [key: string]: any;
}

/**
 * Class component that conditionally applies a class name to a specified HTML element.
 *
 * @param className - The initial class name for the element.
 * @param condition - The condition to determine whether to apply the toggle class or not.
 * @param toggleClass - The class name to be toggled based on the condition.
 * @param children - The content to be rendered inside the specified HTML element.
 * @param as - The type of HTML element to render.
 * @param props - Any additional props to be passed to the element.
 * @returns The rendered Class component.
 */
export const Class: React.FC<ClassProps> = ({
  className = "",
  condition = false,
  toggleClass = "",
  children,
  as: Component = "div",
  ...props
}) => {
  const computedClassName = condition
    ? `${className} ${toggleClass}`.trim()
    : className;

  return (
    <Component className={computedClassName} {...props}>
      {children}
    </Component>
  );
};