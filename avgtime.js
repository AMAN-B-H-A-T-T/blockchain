const BlockChain = require('./BlockChain.js')

const blockchain = new BlockChain();
blockchain.addBlock({data : "new data"})
let prvTimeStamp , nextTimeStamp , nextBlock , timeDiff , avgTime;

const time = [];

for(let i=0;i<1000;i++)
{
    prvTimeStamp = blockchain.chain[blockchain.chain.length - 1].timeStamp;
    blockchain.addBlock({data : `block${i}`})
    nextBlock = blockchain.chain[blockchain.chain.length - 1];
    nextTimeStamp = nextBlock.timeStamp;
    timeDiff = nextTimeStamp - prvTimeStamp
    time.push(timeDiff);

    avgTime = time.reduce((total , num) => total + num) / time.length;
    console.log(`time to mineBlock :: ${timeDiff} ms difficulty :: ${nextBlock.difficulty} averageTime :: ${avgTime} ms`);
}