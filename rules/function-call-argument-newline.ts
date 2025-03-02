export const functionCallArgsNewline: Deno.lint.Rule = {
  create(context) {
    function getLocFromIndex(index: number) {
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

    function hasArgumentsOnSameLine(args: (Deno.lint.Expression | Deno.lint.SpreadElement)[]): boolean {
      if (args.length > 1) {
        const firstArgLoc = getLocFromIndex(args[0].range[0]);
        for (let i = 1; i < args.length; i++) {
          const argLoc = getLocFromIndex(args[i].range[0]);
          if (argLoc.line === firstArgLoc.line) {
            return true;
          }
        }
      }
      return false;
    }

    return {
      CallExpression(node) {
        const args = node.arguments;
        if (hasArgumentsOnSameLine(args)) {
          context.report({
            node,
            message: "Arguments should be on a new line",
          });
        }
      },
    };
  },
};