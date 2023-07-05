import { expect, it, vi, describe } from "vitest";
import { NextRouter } from "next/router";
import { render } from "@testing-library/react";
import { SessionProvider } from "next-auth/react";

import { RouterContext } from "next/dist/shared/lib/router-context";
import NavBar from "@/components/NavBar";

describe("[ NavBar) ]", () => {
  describe("when NavBar is rendered", () => {
    it("should render", (): void => {
      render(
        <SessionProvider>
          <RouterContext.Provider value={<NextRouter />}>
            <NavBar />
          </RouterContext.Provider>
        </SessionProvider>
      );
    });
  });
});
