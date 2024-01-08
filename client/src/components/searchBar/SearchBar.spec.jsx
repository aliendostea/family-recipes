import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";
import { createMemoryHistory } from "history";
import { ROUTE_RECIPES_SEARCH } from "../../const";
import SearchBar from "./SearchBar";

const ROUTE_HOME = "/";

// test utils file
const renderWithRouter = (ui, { route = "/" } = {}) => {
  window.history.pushState({}, "Test page", route);

  return {
    ...render(ui, { wrapper: BrowserRouter }),
  };
};

describe("SearchBar Comp", () => {
  test("should render SearchBar comp", async () => {
    renderWithRouter(
      <SearchBar inputName="search-bar-home" routeRecipes={ROUTE_RECIPES_SEARCH} label="Buscar receta" />,
      { ROUTE_HOME }
    );
  });

  test("should render form parent", async () => {
    const { container } = renderWithRouter(
      <SearchBar inputName="search-bar-home" routeRecipes={ROUTE_RECIPES_SEARCH} label="Buscar receta" />,
      { ROUTE_HOME }
    );

    expect(container.querySelector("form")).toBeInTheDocument();
  });

  test("should render input tag", async () => {
    renderWithRouter(
      <SearchBar inputName="search-bar-home" routeRecipes={ROUTE_RECIPES_SEARCH} label="Buscar receta" />,
      { ROUTE_HOME }
    );

    ////  expect(container.querySelector(`input[name="search-bar-home"]`)).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Intenta buscar pasta bolognese o nonna")).toBeInTheDocument();
  });

  test("should render Icon comp", async () => {
    const { container } = renderWithRouter(
      <SearchBar inputName="search-bar-home" routeRecipes={ROUTE_RECIPES_SEARCH} label="Buscar receta" />,
      { ROUTE_HOME }
    );

    const figure = container.querySelector("figure");
    const svg = figure.querySelector("svg");

    expect(figure).toBeInTheDocument();
    expect(svg).toBeInTheDocument();
  });

  test("should render button", async () => {
    renderWithRouter(
      <SearchBar inputName="search-bar-home" routeRecipes={ROUTE_RECIPES_SEARCH} label="Buscar receta" />,
      { ROUTE_HOME }
    );
    expect(screen.getByRole("button", { name: "Buscar receta" })).toBeInTheDocument();
  });

  test("On change should add value to input", async () => {
    renderWithRouter(
      <SearchBar inputName="search-bar-home" routeRecipes={ROUTE_RECIPES_SEARCH} label="Buscar receta" />,
      { ROUTE_HOME }
    );

    const input = screen.getByPlaceholderText("Intenta buscar pasta bolognese o nonna");

    fireEvent.change(input, { target: { value: "Pasta" } });
    expect(input.value).toBe("Pasta");
  });

  test("On empty", async () => {
    renderWithRouter(
      <SearchBar inputName="search-bar-home" routeRecipes={ROUTE_RECIPES_SEARCH} label="Buscar receta" />,
      { ROUTE_HOME }
    );
    const history = createMemoryHistory();
    history.push = vi.fn();
    const input = screen.getByPlaceholderText("Intenta buscar pasta bolognese o nonna");

    fireEvent.change(input, { target: { value: "Pasta" } });
    const button = screen.getByRole("button", { name: "Buscar receta2" });

    fireEvent.click(button);

    console.log(history.location);
    ///    expect(history.push).toHaveBeenCalledWith("/recipes/search=pasta");
  });
});

//// screen.getByLabelText('name-input')
//// expect(await container.findByRole("input", { name: "search-bar-home" }));
//// expect(screen.getByPlaceholderText("Intenta buscar pasta bolognese o nonna")).toBeInTheDocument();
// render(
//   <MemoryRouter initialEntries={[route]}>
//     <SearchBar inputName="search-bar-home" routeRecipes={ROUTE_RECIPES_SEARCH} label="Buscar receta" />
//   </MemoryRouter>
// );
