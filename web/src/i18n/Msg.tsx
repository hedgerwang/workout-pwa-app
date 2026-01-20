import * as React from "react";


import type { TranslationLocale } from "./formatMessage";
import formatMessage from "./formatMessage";
import type { TemplateValues } from "./formatMessage";

/**
 * Props for the Msg component, which formats a localized message template.
 */
type MsgProps = {
  /**
   * Describes the message for translators and tooling. Not rendered.
   */
  desc: string;
  /**
   * Optional locale override. When omitted, Msg defaults to "en-US".
   */
  locale?: TranslationLocale;
  /**
   * ICU-style template string, e.g. "Hello, {{name}}!".
   */
  text: string;
  /**
   * Token replacements for the template (strings, numbers, or React nodes).
   */
  values?: TemplateValues;
};

/**
 * Renders a message with an explicit locale.
 *
 * This is a thin wrapper around `formatMessage` to keep the component
 * interface consistent while allowing a locale override.
 */
function MsgWithLocale(props: MsgProps & { locale: TranslationLocale }): JSX.Element {
  const { text, values, locale } = props;
  return <>{formatMessage(locale, text, values)}</>;
}

/**
 * Renders a message using the default locale ("en-US").
 *
 * Note: `desc` is intentionally unused at runtime, but provides useful
 * documentation for translators and tooling.
 *
 * @example
 * <Msg desc="Greeting message" text="Hello, {{name}}!" values={{ name: "John" }} />
 * // Renders 'Hello, John!'
 *
 * @example
 * <Msg desc="Notification message" text="You have {{count}} new messages."
 *      values={{ count: 5 }} />
 * // Renders 'You have 5 new messages.'
 *
 * @example
 * <Msg desc="Instruction message" text="Click {{link}} to continue."
 *      values={{ link: <a href="#">here</a> }} />
 * // Renders 'Click here to continue.'
 */
function Msg(props: MsgProps): JSX.Element {
  const { text, desc, values } = props;
  return <MsgWithLocale desc={desc} locale="en-US" text={text} values={values} />;
}

export default Msg;
