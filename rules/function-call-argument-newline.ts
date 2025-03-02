/**
 * A lint rule that enforces function call arguments to be on separate lines.
 * @implements {Deno.lint.Rule}
 *
 * @example
 * // Invalid:
 * someFunction(arg1, arg2)
 *
 * // Valid:
 * someFunction(
 *   arg1,
 *   arg2
 * )
 *
 * @module
 */
export const functionCallArgsNewline: Deno.lint.Rule = {
  create(context) {
    return {
      CallExpression(node) {
        const args = node.arguments;
        if (hasArgumentsOnSameLine(context, args)) {
          context.report({
            node,
            message: "Arguments should be on a new line",
          });
        }
      },
    };
  },
};

/**
 * Check if the arguments are on the same line.
 * @param {Array<Deno.lint.Expression | Deno.lint.SpreadElement>} args - The arguments of the function call.
 * @returns {boolean} True if arguments are on the same line, false otherwise.
 **/
function hasArgumentsOnSameLine(
  context: Deno.lint.RuleContext,
  args: (Deno.lint.Expression | Deno.lint.SpreadElement)[]
): boolean {
  if (args.length > 1) {
    const firstArgLoc = getLocFromIndex(context, args[0].range[0]);
    for (let i = 1; i < args.length; i++) {
      const argLoc = getLocFromIndex(context, args[i].range[0]);
      if (argLoc.line === firstArgLoc.line) {
        return true;
      }
    }
  }
  return false;
}

/**
 * Get the line and column number from the index in the source code.
 * @param {number} index - The index in the source code.
 * @returns {{ line: number, column: number }} The line and column number.
 */
function getLocFromIndex(context: Deno.lint.RuleContext, index: number) {
  const text = context.sourceCode.text;
  let line = 1;
  let column = 0;

  for (let i = 0; i < index; i++) {
    if (text[i] === "\n") {
      line++;
      column = 0;
    } else {
      column++;
    }
  }

  return { line, column };
}
