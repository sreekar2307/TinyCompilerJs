// var util = require("util")

class Transform {
    constructor() {

    }

    transform(ast, traverse) {
        let modified_ast = {
            type: 'Program',
            body: []
        };
        traverse(ast, {
            Program: {
                enter: function (node, parent) {
                    node._context = modified_ast.body
                }
            },
            CallExpression: {
                enter: function (node, parent) {
                    let expression = {
                        type: 'CallExpression',
                        callee: {
                            type: 'Identifier',
                            name: node.name,
                        },
                        arguments: [],
                    }
                    node._context = expression.arguments;
                    if (parent.type !== 'CallExpression') {
                        expression = {
                            type: 'ExpressionStatement',
                            expression: expression
                        };
                    }
                    parent._context.push(expression);

                },
            },
            NumberLiteral: {
                enter: function (node, parent) {
                    parent._context.push({
                        type: 'NumberLiteral',
                        value: node.value
                    })
                }
            },
            String: {
                enter: function (node, parent) {
                    parent._context.push({
                        type: 'String',
                        value: node.value
                    })
                }
            }
        })
        return modified_ast
    }
}

/*const transformedAst = new Transform().transform({
        type: 'Program',
        body: [
            {
                type: 'CallExpression',
                name: 'add',
                params: [
                    {type: 'NumberLiteral', value: '2'},
                    {
                        type: 'CallExpression',
                        name: 'subtract',
                        params: [
                            {type: 'NumberLiteral', value: '4'},
                            {type: 'NumberLiteral', value: '1'}
                        ]
                    }
                ]
            }
        ]
    }
);*/

// console.log(util.inspect(transformedAst,false, null, true))
module.exports = Transform