import { render, screen } from "@testing-library/react";
import Header from "./Header";

import { ThemeProvider } from "styled-components";

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });
const customRender = (ui, { providerProps, ...renderOptions }) => {
  return render(
    <ThemeProvider {...providerProps}>{ui}</ThemeProvider>,
    renderOptions
  );
};

const theme = {
  color: {
    primary: "#88d19d",
  },
  padding: {
    m: "0 20px",
  },
};

describe("Header", () => {
  test("renders Header Componenent", () => {
    customRender(<Header />, { providerProps: {theme} });

    screen.debug();
  });
});
