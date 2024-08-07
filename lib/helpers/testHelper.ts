import { ReactNode } from "react";
import { render as rtlRender } from "@testing-library/react";
import { expect } from "vitest";

export const takeSnapshot = (ui: ReactNode) => {
  const { asFragment } = rtlRender(ui);
  expect(asFragment()).toMatchSnapshot();
};
