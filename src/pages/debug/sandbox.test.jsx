import React from "react";
import { render } from "@testing-library/react";

const Header = ({ children }) => <h1>{children}</h1>;

it("Renders correctly", () => {
  const { asFragment } = render(<Header>Hello I'm Frank!</Header>);
  expect(asFragment()).toMatchSnapshot();
});
