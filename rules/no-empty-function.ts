export const noEmptyFunction: Deno.lint.Rule = {
  create(context) {
    function containsComment(node: Deno.lint.BlockStatement): boolean {
      const text = context.sourceCode.getText(node);
      return text.includes("/*") || text.includes("//");
    }
    return {
      ":not([kind=get], [kind=set]) > :not(:not(FunctionDeclaration, FunctionExpression, ArrowFunctionExpression)) > BlockStatement[body.length=0]"(
        node
      ) {
        if (containsComment(node)) return;
        context.report({
          node,
          message: "Empty function body",
          hint: "Add code or comment to the empty function body",
        });
      },
    };
  },
};
