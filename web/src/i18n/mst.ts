
import formatMessage from "./formatMessage";

/**
 * Props for the mst helper, which always returns a string.
 */
type MstProps = {
  /**
   * Describes the message for translators and tooling. Not rendered.
   */
  desc: string;
  /**
   * Token replacements for the template (strings or numbers only).
   */
  values?: { [key: string]: string | number };
  /**
   * ICU-style template string, e.g. "Hello, {{name}}!".
   */
  text: string;
};

/**
 * Formats a message template with provided values and returns a string.
 *
 * This is the string-only companion to the `Msg` component.
 *
 * @example
 * mst({ desc: "Greeting message", text: "Hello, {{name}}!", values: { name: "John" } });
 * // Returns "Hello, John!"
 */
function mst(props: MstProps): string {
  const { text, desc, values } = props;
  const out = formatMessage("en-US", text, values);
  if (typeof out !== "string") {
    // This should never happen, our type system should ensure that `values`
    // only contains strings and numbers so that `formatMessage` always returns
    // a string.
    throw new Error("mst() must return a string");
  }
  return out;
}

export default mst;
