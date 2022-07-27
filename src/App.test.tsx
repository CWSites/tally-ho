import { render, screen } from "@testing-library/react";
import { App } from "./App";

test("renders wallet connect link", () => {
  render(<App />);
  const button = screen.getByText(/wallet connect/i);
  expect(button).toBeInTheDocument();
});
