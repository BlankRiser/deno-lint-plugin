/**
 * A lint rule that reports empty function bodies.
 * This rule checks for functions that have no statements in their body and reports them as errors,
 * unless they contain comments.
 * 
 * @remarks
 * - Ignores getter and setter functions
 * - Applies to FunctionDeclaration, FunctionExpression, and ArrowFunctionExpression
 * - Empty functions with comments are allowed
 * 
 * @example
 * ```ts
 * // Invalid:
 * function empty() {}
 * const myFunc = () => {}
 * 
 * // Valid:
 * function notEmpty() { return true; }
 * function withComment() { // TODO: implement }
 * get prop() {}  // getters are ignored
 * ```
 * 
 * @module 
 */
export const noEmptyFunction: Deno.lint.Rule = {
  create(context) {
    
    return {
      ":not([kind=get], [kind=set]) > :not(:not(FunctionDeclaration, FunctionExpression, ArrowFunctionExpression)) > BlockStatement[body.length=0]"(
        node
      ) {
        if (containsComment(context, node)) return;
        context.report({
          node,
          message: "Empty function body",
          hint: "Add code or comment to the empty function body",
        });
      },
    };
  },
};

/**
 * Check if the node contains comments.
 * @param {Deno.lint.RuleContext} context - The rule context.
 * @param {Deno.lint.BlockStatement} node - The block statement node.
 * @returns {boolean} True if the node contains comments, false otherwise.
 */
function containsComment(context: Deno.lint.RuleContext, node: Deno.lint.BlockStatement): boolean {
  const text = context.sourceCode.getText(node);
  return text.includes("/*") || text.includes("//");
}
