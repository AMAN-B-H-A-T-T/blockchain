const Block = require('./Block.js');
const cryptoHash = require('./crypto_hash.js');



class BlockChain
{
    constructor()
    {
        this.chain = [Block.genesis()];
    }

    // function for adding the new block
    addBlock({data})
    {
        const newBlock = Block.mineBlock({
            prvBlock : this.chain[this.chain.length - 1],
            data
        })
        this.chain.push(newBlock);
    }

    // function for validating the chain 

    static isValidChain(chain)
    {
        if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) return false;

        for(let i=1;i<chain.length;i++)
        {
            const {timeStamp , prvHash , hash , data , nounce , difficulty} = chain[i];
            const realLastHash = chain[i-1].hash;
            const prvDfficulty = chain[i-1].difficulty;   
            
            if(prvHash !== realLastHash) 
            {
                
                return false;
            }

            const validedHash = cryptoHash(timeStamp,prvHash,data,nounce , difficulty);

            if (hash !== validedHash){
                console.log("hash");
                return false}

            if (Math.abs(difficulty-prvDfficulty) > 1) return false;
        }

        return true;

    }

    replaceChain(chain)
    {
        if (chain.length <= this.chain.length)
        {
            console.log("incoming chain is not longer than current chain");
            return 
        }
        if(! BlockChain.isValidChain(chain))
        {
                console.log("the incoming chain is not valid");
                return
        }

        this.chain = chain;
        return

    }
}

module.exports = BlockChain;