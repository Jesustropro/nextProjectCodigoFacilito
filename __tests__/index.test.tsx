import { expect, it, vi, describe } from "vitest";
import { NextRouter } from "next/router";
import { render } from "@testing-library/react";
import { SessionProvider } from "next-auth/react";
import Home from "../src/pages";

import { RouterContext } from "next/dist/shared/lib/router-context";

describe("[ pages / Home (index) ]", () => {
  const props = {
    only5: [
      { author: "s", content: "4", tags: { d: "d" } },
      { author: "2", content: "5", tags: { c: "g" } },
    ],
  };
  describe("when Home is rendered", () => {
    it("should render", (): void => {
      render(
        <SessionProvider>
          <RouterContext.Provider value={<NextRouter />}>
            <Home {...props} />
          </RouterContext.Provider>
        </SessionProvider>
      );
    });
  });
});
