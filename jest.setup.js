import "@testing-library/jest-dom";

// Mock the ViewportHeight component since it relies on browser APIs
jest.mock("@/components/ViewportHeight", () => ({
  ViewportHeight: () => null,
}));
