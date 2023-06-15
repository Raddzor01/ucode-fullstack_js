const myNumber = Number();
const myBigInt = BigInt(0);
const myString = String();
const myBoolean = Boolean();
const myNull = null;
const myUndefined = undefined;
const myObject = {};
const mySymbol = Symbol();
const myFunction = function() {};

alert(`
    myNumber is ${typeof myNumber}\n
    myBigint is ${typeof myBigInt}\n
    myString is ${typeof myString}\n
    myBoolean is ${typeof myBoolean}\n
    myNull is ${typeof myNull}\n
    myUndefined is ${typeof myUndefined}\n
    myObject is ${typeof myObject}\n
    mySymbol is ${typeof mySymbol}\n
    myFunction is ${typeof myFunction}\n
`);