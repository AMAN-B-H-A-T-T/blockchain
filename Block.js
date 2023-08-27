const {GENESIS_DATA , MINE_TIME} = require('./config.js');
const cryptoHash = require('./crypto_hash.js');
const hexToBinary = require('hex-to-binary');
class Block
{
    constructor({timeStamp,prvHash,hash,data,nounce , difficulty})
    {
        this.timeStamp = timeStamp;
        this.prvHash = prvHash;
        this.hash = hash;
        this.nounce = nounce;
        this.difficulty = difficulty;
        this.data = data;
    }
    static genesis()
    {
        return new this(GENESIS_DATA);
    }

    static mineBlock({prvBlock,data})
    {
        let hash, timeStamp;
        const prvHash = prvBlock.hash;
        let {difficulty} = prvBlock;

        let nounce = 0;
        do{
            nounce ++;
            timeStamp = Date.now();
            difficulty = Block.adjustDifficulty({originalBlock : prvBlock , timeStamp})
            hash = cryptoHash(timeStamp,prvHash,data,nounce,difficulty);
        }while(hexToBinary(hash).substring(0,difficulty) !== "0".repeat(difficulty));

        return new this({
            timeStamp,
            prvHash,
            data,
            nounce,
            difficulty,
            hash
        });
    }

    static adjustDifficulty({originalBlock , timeStamp})
    {
        const {difficulty} = originalBlock
        const diffrence = timeStamp - originalBlock.timeStamp;
        if (difficulty < 1) return 1;
        if(diffrence > MINE_TIME)
        {
            return difficulty -1;
        }
        else{
            return difficulty+1;
        }
    }

}


module.exports = Block;
