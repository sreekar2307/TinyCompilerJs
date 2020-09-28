// const util = require('util')
class Parser {
    constructor() {
    }

    tokenizer(input) {
        var _i = 0;
        var tokens = [];
        while (_i < input.length) {
            var _currChar = input[_i];
            var value = ""
            var type = ""
            if (_currChar === ' ') {
                _i++;
                continue;
            } else if (_currChar === '(' || _currChar === ')') {
                _i++;
                value = _currChar
                type = 'paren'

            } else if (_currChar === '"') {
                _i++;
                value = "";
                while (_i < input.length && input[_i] !== '"') {
                    value += input[_i];
                    _i++;
                }
                _i++;
                type = 'string';
            } else if (/[a-zA-Z]/.test(_currChar)) {
                value = _currChar;
                _i++;
                while (_i < input.length && /\w/.test(input[_i])) {
                    value += input[_i];
                    _i++;
                }
                type = 'name';
            } else if (/\d/.test(_currChar)) {
                value = _currChar;
                _i++;
                while (_i < input.length && /\d/.test(input[_i])) {
                    value += input[_i]
                    _i++;
                }
                type = 'number';
            } else {
                throw new TypeError('I dont know what this character is: ' + _currChar)
            }
            tokens.push({
                type: type,
                value: value
            })
        }
        return tokens
    }

    buildAst(tokens) {
        var ast = {
            type: 'Program',
            body: []
        }
        var _i =0;

        function walk() {
            var nodes = [];
            while(_i < tokens.length) {
                if (tokens[_i].type === 'paren' && tokens[_i].value === '(')
                    _i++;
                else if (tokens[_i].type === 'paren' && tokens[_i].value === ')')
                    break;
                else if (tokens[_i].type === 'number') {
                    nodes.push({
                        type: 'NumberLiteral',
                        value: tokens[_i++].value
                    })
                } else if (tokens[_i].type === 'string') {
                    nodes.push({
                        type: 'StringLiteral',
                        value: tokens[_i++].value
                    })
                } else if (tokens[_i].type === 'name') {
                    nodes.push({
                        type: 'CallExpression',
                        name: tokens[_i++].value,
                        params: walk()
                    })
                }
            }
            return nodes;
        }

        ast.body = walk()
        return ast;
    }

}

// const ast  = new Parser("add 2 (subtract (4 1))").ast
//
// console.log(util.inspect(ast,false, null, true))
module.exports = Parser

