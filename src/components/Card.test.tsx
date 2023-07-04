import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import Card from "./Card";

describe("[ component / Card ]", () => {
  describe("when Card is rendered", () => {
    it("should render", () => {
      const props = {
        quotes: [],
        categoryId: "love",
        likedPost: true,
      };
      const { asFragment } = render(<Card {...props} />);
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
