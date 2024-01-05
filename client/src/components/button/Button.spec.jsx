import { render, screen } from "@testing-library/react";
import Button from "./Button";

describe("Button Comp", () => {
  test("should render Button", () => {
    render(<Button label="Ir a la home" type="submit" />);
    expect(screen.getByRole("button", { name: "Ir a la home" })).toBeInTheDocument();
  });
});
