import * as React from "react";

import formatMessage from "./formatMessage";

describe("formatMessage", () => {
  it("returns the template when values is null or undefined", () => {
    expect(formatMessage("en-US", "Hello {{name}}")).toBe("Hello {{name}}");
    expect(formatMessage("en-US", "Hello {{name}}", null)).toBe("Hello {{name}}");
  });

  it("replaces string and number placeholders", () => {
    const result = formatMessage("en-US", "Hi {{name}}, you have {{count}} messages", {
      name: "Alex",
      count: 1234
    });

    expect(result).toBe("Hi Alex, you have 1,234 messages");
  });

  it("returns an array when a React element is included", () => {
    const result = formatMessage("en-US", "Hello {{name}}!", {
      name: <strong>World</strong>
    });

    expect(Array.isArray(result)).toBe(true);
    const nodes = result as React.ReactNode[];
    expect(nodes.some((node) => React.isValidElement(node))).toBe(true);
  });

  it("logs when a value cannot be formatted and keeps the placeholder", () => {
    const errorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    const result = formatMessage("en-US", "Value: {{bad}}", {
      bad: { foo: "bar" } as unknown as React.ReactNode
    });

    expect(result).toBe("Value: {{bad}}");
    expect(errorSpy).toHaveBeenCalled();
    errorSpy.mockRestore();
  });
});

