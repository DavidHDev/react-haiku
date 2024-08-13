import React, { ReactNode } from 'react';

interface ClassProps {
  className?: string;
  condition?: boolean;
  toggleClass?: string;
  children: ReactNode;
}

/**
 * Class component that conditionally applies a class name to a div element.
 *
 * @param className - The initial class name for the div element.
 * @param condition - The condition to determine whether to apply the toggle class or not.
 * @param toggleClass - The class name to be toggled based on the condition.
 * @param children - The content to be rendered inside the div element.
 * @returns The rendered Class component.
 */
export const Class: React.FC<ClassProps> = ({
  className = '',
  condition = false,
  toggleClass = '',
  children,
}) => {
  const computedClassName = condition
    ? `${className} ${toggleClass}`.trim()
    : className;

  return <div className={computedClassName}>{children}</div>;
};
