const express = require('express');
const BlockChain = require('./BlockChain');
const BodyParse = require('body-parser');
const pubSub = require('./publishSubscribe.js');
const request = require('request')
const DEFAULT_PORT = 3000;

const blockchain = new BlockChain();

const pubsub = new pubSub({blockchain});

const ROOT_NODE_ADDRESS = `http://localhost:${DEFAULT_PORT}`
setTimeout(()=> pubsub.broadcastChain(), 1000);

const app = express();
app.use(BodyParse.json());

app.get("/api/default",(req,res)=>{
    res.send({"data" : "message"})
})
app.get("/api/read",(req,res)=>{
    try{
        console.log("api is called");
        res.send(blockchain.chain)

    }
    catch{
        console.log(error);
    }
    
})

app.post("/api/mine",(req,res)=>{
    const {data} = req.body
    blockchain.addBlock({data})
    pubsub.broadcastChain();
    res.send("block is mine succssfully");
    
})

const syncChain = ()=>{
    request({url : `${ROOT_NODE_ADDRESS}/api/read`},(error,response,body)=>{
        if(!error && response.statusCode == 200){
            const rootchain = JSON.parse(body);
            blockchain.replaceChain(rootchain)
        }
    })
}
let PEER_PORT;
if (process.env.GENERATE_PEER_PORT === "true")
{
    PEER_PORT = DEFAULT_PORT + Math.ceil(Math.random()*1000);
}
const PORT = PEER_PORT || DEFAULT_PORT;
app.listen(PORT,()=>{
    try{
        syncChain()
        console.log(`http://localhost:${PORT} is live`);

    }
    catch{
        console.log(error);
    }
})

