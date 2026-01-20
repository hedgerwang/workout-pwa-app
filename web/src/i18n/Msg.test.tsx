import * as React from "react";
import { render, screen } from "@testing-library/react";

import Msg from "./Msg";

describe("Msg", () => {
  it("renders formatted text with default locale", () => {
    render(
      <Msg
        desc="Greeting message"
        text="Hello, {{name}}! You have {{count}} new messages."
        values={{ name: "Alex", count: 1234 }}
      />
    );

    expect(
      screen.getByText("Hello, Alex! You have 1,234 new messages.")
    ).toBeInTheDocument();
  });

  it("renders React node values inline", () => {
    const { container } = render(
      <Msg
        desc="Link prompt"
        text="Click {{link}} to continue."
        values={{ link: <a href="/next">here</a> }}
      />
    );

    expect(screen.getByRole("link", { name: "here" })).toBeInTheDocument();
    expect(container).toHaveTextContent("Click here to continue.");
  });

  it("does not render the description prop", () => {
    render(<Msg desc="Internal description" text="Hello world" />);

    expect(screen.queryByText("Internal description")).not.toBeInTheDocument();
    expect(screen.getByText("Hello world")).toBeInTheDocument();
  });
});

