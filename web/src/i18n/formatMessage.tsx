import type { ReactNode } from "react";
import * as React from "react";


export type TranslationLocale =
  | "en-US"
  | "zh-TW"

export type TemplateValues = { [key: string]: ReactNode };

// Regular expression to match template parts in the format {{part}}
const TEMPLATE_PARTS_PATTERN = /({{[^{}]*}})/g;

/**
 * Formats a string template with provided values.
 *
 * @param locale - The locale to use for formatting the template.
 * @param template - The string template to format.
 * @param values - The values to replace in the template.
 * @returns The formatted template as a ReactNode.
 */
function formatMessage(
  locale: TranslationLocale,
  template: string,
  values?: TemplateValues | null | undefined,
): ReactNode {
  // If values is null or undefined, return the original template
  if (values === null || values === undefined) {
    return template;
  }

  // Split the template into parts based on the TEMPLATE_PARTS_PATTERN
  const parts = template.split(TEMPLATE_PARTS_PATTERN);

  // Flag to check if any part of the template is a React element
  let hasReactElement = false;

  // Map over the parts and replace placeholders with corresponding values
  const formattedParts: ReactNode[] = parts.map((part, index) => {
    // If part is a placeholder
    if (part.startsWith("{{") && part.endsWith("}}")) {
      // Extract the key from the placeholder
      const key = part.slice(2, -2).trim();
      // Get the value corresponding to the key from the values object
      const value = values[key];

      // Check the type of the value
      switch (typeof value) {
        case "string":
          return value;

        // If the value is a number, convert it to a string and return
        case "number":
          return value.toLocaleString(locale);

        // If the value is a React element, set the hasReactElement flag to true
        // and return the element
        case "object":
          if (React.isValidElement(value)) {
            hasReactElement = true;
            return <React.Fragment key={`k${index}}`}>{value}</React.Fragment>;
          } else {
            console.error(`Unsupported value type for key: ${key}, got ${String(value)}}`, { key, value });
          }
          break;

        default:
          const type = Object.prototype.toString.call(value);
          console.error(`Unsupported value type for key: ${key}, got ${type}}`, { key, value });
          break;
      }
    }

    // If part is not a placeholder, return it as is.
    return part;
  });

  // If any part of the template is a React element, return the formatted parts
  // as an array, otherwise join them into a string
  return hasReactElement ? formattedParts : formattedParts.join("");
}

export default formatMessage;
