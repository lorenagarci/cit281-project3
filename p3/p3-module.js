function valueFromArray(arr) {
    return arr.reduce(
        (acc,val) =>
        Array.isArray(val) ? valueFromArray(val) : acc + valueFromCoinObject(val),
        0
    );
}


function ValidDenom(coin){
    return[1,5,10,25,50,100].indexOf(coin) !== -1;
}

function valueFromCoinObject(obj) {
    const { denom = 0, count = 0 } = obj;
    return validDenom(denom) ? denom * count : 0;
}
// ? is saying if its true or false; waiting to see when its getting result from function
//trying to be executed. 
//extra credit
//console.log("[{}]", coinCount(coins));

function coinCount(...coinage) {
    return valueFromArray(...coinage);
}

console.log("{}", coinCount({ denom: 5, count: 3 }));
console.log("{}", coinCount({ denom: 5, count: 3 }, { denom: 10, count: 2 }));
const coins = [{ denom: 25, count: 2 }, { denom: 1, count: 7 }];
console.log("...[{}]", coinCount(...coins));
console.log("[{}]", coinCount(coins));

