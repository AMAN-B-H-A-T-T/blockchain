const crypto = require('crypto');


//creating the funcution that return the hash of the block 

const cryptoHash = (...inputs)=>{
    const hash = crypto.createHash('sha256');
    hash.update(inputs.sort().join(''))
    return hash.digest('hex');
}


module.exports = cryptoHash;