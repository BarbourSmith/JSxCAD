const { Type } = require('@jsxcad/typecheck');
const {
  getArgumentsForFunctionCall,
  getContainingFunctionDeclaration,
  getNameOfCalledFunction,
  resolveType,
  storeProgram,
} = require('./utils.js');
const { toStringFromNode } = require('./astring.js');

module.exports = {
  create: function (context) {
    return {
      AssignmentExpression(node) {
        const identifierType = resolveType(node.left, context);
        const assignmentType = resolveType(node.right, context);
        if (!assignmentType.isOfType(identifierType)) {
          context.report({
            message: `can't assign type ${assignmentType} to variable of type ${identifierType}`,
            node,
          });
        }
      },

      CallExpression(node) {
        const functionName = getNameOfCalledFunction(node, context);
        const functionType = resolveType(node.callee, context);
        const argumentCount = functionType.getArgumentCount();
        const callTypes = getArgumentsForFunctionCall(node, context);

        for (let index = 0; index < argumentCount; index++) {
          const argumentType = functionType.getArgument(index);
          const callType = callTypes[index];
          if (callType !== undefined && !callType.isOfType(argumentType)) {
            context.report({
              message: `type ${argumentType} expected for argument ${index} in call to ${functionName} but ${callType} provided`,
              node,
            });
          } else if (
            callType === undefined &&
            !Type.undefined.isOfType(argumentType)
          ) {
            context.report({
              message: `type ${argumentType} expected for argument ${index} in call to ${functionName} but undefined implicitly provided`,
              node,
            });
          }
        }
      },

      Program(node) {
        storeProgram(node, context);
      },

      ReturnStatement(node) {
        const containingFunction = getContainingFunctionDeclaration(
          node,
          context
        );
        if (!containingFunction) throw Error('die');
        const functionType = resolveType(containingFunction, context);
        const expectedReturnType = functionType.getReturn();

        if (!node.argument && expectedReturnType) {
          /* bare `return;` statement */

          if (!Type.undefined.isOfType(expectedReturnType)) {
            context.report({
              message: `returning an implicit undefined from a function declared to return ${expectedReturnType}`,
              node,
            });
          }

          return;
        }

        const actualReturnType = resolveType(node.argument, context);

        if (!actualReturnType.isOfType(expectedReturnType)) {
          context.report({
            message: `returning ${actualReturnType} from a function declared to return ${expectedReturnType}`,
            node,
          });
        }
      },

      VariableDeclarator(node) {
        const identifierType = resolveType(node, context);

        let initType;

        if (node.init) {
          initType = resolveType(node.init, context);
        } else if (node.parent.parent.type === 'ForOfStatement') {
          initType = resolveType(
            node.parent.parent.right,
            context
          ).getElement();
        } else {
          initType = Type.undefined;
        }

        if (!initType.isOfType(identifierType)) {
          context.report({
            message: `can't initialize variable ${toStringFromNode(
              node
            )} of type ${identifierType} with value of type ${initType}`,
            node,
          });
        }
      },
    };
  },
};
