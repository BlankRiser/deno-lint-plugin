import { noEmptyFunction } from "./rules/no-empty-function.ts";
import { functionCallArgsNewline } from "./rules/function-call-argument-newline.ts";

const plugin: Deno.lint.Plugin = {
  // The name of your plugin. Will be shown in error output
  name: "devhaven",
  // Object with rules. The property name is the rule name and
  // will be shown in the error output as well.
  rules: {
    'function-call-args-newline': functionCallArgsNewline,
    'no-empty-function': noEmptyFunction
    
  },
};
export default plugin;