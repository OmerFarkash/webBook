import React from "react";
import { render } from "@testing-library/react";
import App from "../App.js";
import { Toggle } from "../Components/Toggle/Toggle";

test("renders with dark mode toggle", () => {
  const { container } = render(<App />);
  const onChange = jest.fn();
  const { getByRole } = render(<Toggle onChange={onChange} />);
  expect(getByRole.tobeinthedocument);
});
