import "@testing-library/jest-dom";
import { vi } from "vitest";

vi.mock("react-router-dom", async () => {
  const original = await vi.importActual<typeof import("react-router-dom")>("react-router-dom");
  return {
    ...original,
    useNavigate: () => vi.fn(),
  };
});
