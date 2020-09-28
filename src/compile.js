var Parser = require('./parser');
var CodeGenerator = require('./code_generator');
var Transform = require('./transform');
var Traverse = require('./traverser');


class Compile {
    constructor() {
        this.parser = new Parser();
        this.traverse = new Traverse();
        this.tranform = new Transform(this.traverse);
        this.codeGen = new CodeGenerator();
    }

    compile(input) {
        let tokens = this.parser.tokenizer(input);
        let ast = this.parser.buildAst(tokens);
        let newAst = this.tranform.transform(ast,this.traverse.traverse);
        return this.codeGen.generate(newAst);
    }
}

module.exports = Compile
