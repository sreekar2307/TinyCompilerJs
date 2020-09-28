class CodeGenerator{
    constructor() {

    }

    generate(node) {
        switch (node.type) {
            case 'Program':
                return node.body.map(node => this.generate(node))
                    .join('\n');
            case 'ExpressionStatement':
                return (
                    this.generate(node.expression) +
                    ';'
                );

            case 'CallExpression':
                return (
                    this.generate(node.callee) +
                    '(' +
                    node.arguments.map(node => this.generate(node))
                        .join(', ') +
                    ')'
                );

            case 'Identifier':
                return node.name;

            case 'NumberLiteral':
                return node.value;

            case 'StringLiteral':
                return '"' + node.value + '"';

            default:
                throw new TypeError(node.type);
        }
    }
}

module.exports = CodeGenerator

/*
const codeGen = new CodeGenerator()
console.log(codeGen.generate({
    type: 'Program',
    body: [
        {
            type: 'ExpressionStatement',
            expression: {
                type: 'CallExpression',
                callee: { type: 'Identifier', name: 'add' },
                arguments: [
                    { type: 'NumberLiteral', value: '2' },
                    {
                        type: 'CallExpression',
                        callee: { type: 'Identifier', name: 'subtract' },
                        arguments: [
                            { type: 'NumberLiteral', value: '4' },
                            { type: 'NumberLiteral', value: '1' }
                        ]
                    }
                ]
            }
        }
    ]
}))*/
