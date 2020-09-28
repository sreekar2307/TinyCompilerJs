//
// So now we have our AST, and we want to be able to visit different nodes with
// a visitor. We need to be able to call the methods on the visitor whenever we
// encounter a node with a matching type.
class Traverser {
    constructor() {
    }

    traverse(ast, visitor) {

        function traverseNode(node, parent) {
            if (node && visitor[node.type]) {
                if(visitor[node.type].enter)
                    visitor[node.type].enter(node, parent);
                if (node.type === 'Program') {
                    for (var _i = 0; _i < node.body.length; _i++)
                        traverseNode(node.body[_i], node)
                } else if (node.type === 'CallExpression') {
                    for (_i = 0; _i < node.params.length; _i++) 
                        traverseNode(node.params[_i], node)
                }
                if(visitor[node.type].exit)
                    visitor[node.type].exit(node, parent);
            }
        }

        traverseNode(ast, visitor, null);
    }
}

module.exports = Traverser
/*const visitor = {
    Program: {
        enter(node, parent) {
             console.log(`Entering ${node.type}  ${node.value}`)
        },
        exit(node, parent) {
             console.log(`Exiting ${node.type}  ${node.value}`)
        },
    },

    CallExpression: {
        enter(node, parent) {
             console.log(`Entering ${node.type}  ${node.value} ${parent.type} ${parent.value}`)
        },
        exit(node, parent) {
             console.log(`Exiting ${node.type}  ${node.value} ${parent.type} ${parent.value}`)
        },
    },

    NumberLiteral: {
        enter(node, parent) {
             console.log(`Entering ${node.type}  ${node.value} ${parent.type} ${parent.value}`)
        },
        exit(node, parent) {
             console.log(`Exiting ${node.type}  ${node.value} ${parent.type} ${parent.value}`)
        },
    },
}
const ast = {
    type: 'Program',
    body: [
        {
            type: 'CallExpression',
            name: 'add',
            params: [
                { type: 'NumberLiteral', value: '2' },
                {
                    type: 'CallExpression',
                    name: 'subtract',
                    params: [
                        { type: 'NumberLiteral', value: '4' },
                        { type: 'NumberLiteral', value: '1' }
                    ]
                }
            ]
        }
    ]
}
const traverser = new Traverser()
traverser.traverse(ast,visitor)*/
