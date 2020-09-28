var Compile = require('./src/compile')

console.log(new Compile().compile("(add 2 subtract(4 2))"))